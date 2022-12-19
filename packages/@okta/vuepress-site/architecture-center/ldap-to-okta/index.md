---
layout: Landing
title: Migrate from LDAP directory to Okta
---

# Migrate from LDAP directory to Okta

This article shows how to migrate user data over to Okta from a sample web application that first authenticates directly with an on-premise [OpenLDAP Directory Server](https://www.openldap.org/doc/admin24/intro.html). The tutorial includes adding an Okta LDAP Agent and Okta LDAP Interface to mirror users from the on-premise LDAP directory server into a cloud-based [Okta Universal Directory](https://www.okta.com/products/universal-directory/) so they can access other applications using delegated authentication with the LDAP directory server. It also shows you how to replace the [Okta LDAP Interface](https://help.okta.com/en-us/Content/Topics/Directory/LDAP-interface-main.htm) with [OpenID Connect](/docs/concepts/oauth-openid/#openid-connect) authentication.

## Introduction

This example uses three [Docker](https://www.docker.com/) containers that run a sample web application, OpenLDAP directory server, and on-premise Okta LDAP Agent. The example also configures a cloud-based Okta LDAP Interface. Refer to [Manage your LDAP integration](https://help.okta.com/en-us/Content/Topics/Directory/ldap-agent-manage-integration.htm) for information on integrating your LDAP instance with Okta.

The Okta LDAP Agent is installed in an on-premise server. The Okta LDAP Interface is cloud-based. In this example, the Okta LDAP Agent provides delegated authentication. This allows users to authenticate with Okta using their local LDAP directory credentials, and migrate on-premise applications to the cloud.

This example performs the following tasks, in order:

1. [Setup OpenLDAP Directory Server](#setup-openldap-directory-server): Here you are not logged into Okta. You use a username and password to authenticate directly with the LDAP directory server.
2. [Connect Okta LDAP Agent and Import Users](#connect-okta-ldap-agent-and-import-users): Here an Okta LDAP Agent is connected to the OpenLDAP directory server and to Okta. The example takes you through the steps to import your LDAP users into your Okta Universal Directory. Once you have imported your LDAP users into Okta, you can assign them to any application that you have registered with your Okta Organization. Access to those assigned applications can be via any protocol, such as LDAP Interface, OpenID Connect, SAML, and so on.

   However, authentication of the LDAP user is delegated to the LDAP server through the Okta LDAP Agent so that users can authenticate with Okta using their LDAP directory server credentials.
3. [Update application to point to Okta LDAP interface](#update-application-to-point-to-the-okta-ldap-interface): Here an Okta LDAP Interface is configured. In this example, the okta-ldap-migration application connects to the Okta service through the Okta LDAP Interface. The Okta service then delegates authentication back to the on-premise LDAP directory server.
4. [Update application to use OAuth 2.0 and OpenID Connect](#update-the-application-to-use-oauth-2-0-openid-connect): Here an OpenID Connect web application is registered with Okta to replace the Okta LDAP Interface. The [Okta Password Import Inline Hook](/docs/guides/password-import-inline-hook/nodejs/main) is also discussed.
5. [Migrate users from LDAP to Okta](#migrate-users-from-ldap-to-okta): This section includes instructions on how to disable delegated authentication back to the LDAP server and make your applications authenticate only with Okta.

## Setup OpenLDAP Directory Server

In this part of the example, you use a username and password to authenticate directly with the OpenLDAP directory server running on-premise in a Docker container. The OpenLDAP directory contains three users, as defined in the `okta-ldap-migration\ldifs\users.ldif` file.

1. Change to your project directory and clone the `ldap-users` branch of the `okta-ldap-migration` repository:
   
   ```bash
   cd ${your project directory}
   git clone https://github.com/oktadev/okta-ldap-migration -b ldap-users
   ```

2. Change to the `okta-ldap-migration` directory:

   ```bash
   cd okta-ldap-migration
   ```

3. Start up the application. The `docker compose up` command uses the `okta-ldap-migration/docker-compose.yml` file to start up two containers. One runs the web app and one runs the OpenLDAP Directory Server.

   ```bash
   docker compose up
   ```

   If the `docker compose up` command is successful, you  should see the `okta-ldap-migration-webapp-1` as started in your command window, similar to:

   ```
   okta-ldap-migration-webapp-1  | 2022-09-01 20:51:24.536  INFO 1 --- [           main] o.s.l.c.support.AbstractContextSource    : Property 'userDn' not set - anonymous context will be used for read-write operations
   okta-ldap-migration-webapp-1  | 2022-09-01 20:51:24.857  INFO 1 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8080 (http) with context path ''
   okta-ldap-migration-webapp-1  | 2022-09-01 20:51:24.867  INFO 1 --- [           main] com.okta.example.ra.Application          : Started Application in 2.033 seconds (JVM running for 2.371)
   ```

4. Open a private/incognito browser window and navigate to `http://localhost:8080` to display the LDAP directory sign-in dialog.

   <div class="half border">

   ![Sign-in dialog including username and password fields](/img/ra/directory-coexistence/ldap-to-okta-signin-dialog.png)

   </div>

5. Sign in with username `user01` and password `password1`. A successful sign in displays the following dialog:

   <div class="three-quarter border">

   ![sign-in response for spring boot example](/img/ra/directory-coexistence/ldap-to-okta-signin-response.png)

   </div>

## Connect Okta LDAP Agent and Import Users

In this part of the lab, an Okta LDAP Agent is configured to connect to both your Okta account and the LDAP directory server. In addition, the user accounts and attributes are imported into Okta Universal Directory.

### Stop Running Containers and Sign in to your Okta account

The first step is to stop the current running containers and sign in to your Okta account that you created in the [Prerequisites](/architecture-center/directory-coexistence/#prerequisites) section.

1. In the `okta-ldap-migration` directory, stop the current running containers with <kbd>Ctrl</kbd> + <kbd>C</kbd>.

2. Run `okta login`

   **Note**:  If you are already logged into Okta using `okta login`, a prompt similar to the following is returned. The current sign in configuration is based on the Okta Org URL and API token you provided previously. If you want to use the existing configuration, answer N and skip steps 3 and 4. Otherwise, answer Y and continue to steps 3 and 4.

   ```
   An existing Okta Organization (https://dev-133337.okta.com)
   was found in C:\mydirectory\.okta\okta.yaml
   Overwrite configuration file? [Y/n]
   ```

3. Enter your **Okta Org URL**. If you do not know your Okta Org URL, refer to [Find your Okta domain](https://developer.okta.com/docs/guides/find-your-domain/main/).

4. Follow the instructions in [Create an API token](https://developer.okta.com/docs/guides/create-an-api-token/main/) to create a token. Once you have the token enter it at the **Okta API token** prompt.

### Connect the Okta LDAP Agent

The next step is to connect an Okta LDAP Agent to the LDAP directory server and Okta. The Okta LDAP Agent provides delegated authentication to the on-premise LDAP server so that your users can authenticate to Okta using their local LDAP credentials.

You can also set up Just-In-Time (JIT) provisioning in the Okta LDAP agent. JIT provisioning automatically creates a new user profile in Okta when a user first authenticates with the LDAP server. A new user account is only created in Okta if the user does not have an existing user profile in Okta Universal Directory. You can continue to have your users sign into their applications through Okta and Okta can delegate authentication to your on-premise LDAP server. Or, once your users are mirrored in Okta you can stop delegating authentication to the LDAP server and have Okta be solely responsible for authentication, as described in [Migrate users from LDAP to Okta](#migrate-users-from-ldap-to-okta).

1. In the `okta-ldap-migration` directory, check out the `agent` branch from the `okta-ldap-migration` repository. This branch contains a Docker container that runs an Okta LDAP Agent. For more information on other installation options, see [Okta's LDAP Agent documentation](https://help.okta.com/en/prod/Content/Topics/Directory/ldap-agent-manage-integration.htm).

   ```bash
   git checkout agent
   ```

   A successful checkout will result in creation of the `okta-ldap-agent` subdirectory in your `okta-ldap-migration` directory.

2. Rebuild the containers:

   ```bash
   docker compose build
   ```

3. Edit the `okta-ldap-migration/.env` file, which stores Okta-related configurations. Edit the `OKTA_URL` line so it points to your free Okta account:

   ```
   OKTA_URL="https://${yourOktaOrg}"
   ```

   For example, `OKTA_URL="https://dev-133337.okta.com"`

4. In the console, start the application:

   ```
   docker compose up
   ```

   The first time the **ldap-agent** container starts, an authentication link is provided in the console output.

   <div class="full">

   ![message instructing user to visit a URL to authenticate and continue user agent registration](/img/ra/directory-coexistence/ldap-to-okta-agent-configuration-link.png)

   </div>

   > **Troubleshooting**: If you do not see a link for the `ldap-agent` in the console output, or you see `ldap-agent` exited with code 3, first type <kbd>Ctrl</kbd> + <kbd>C</kbd> in the console to stop the application. Next, in the `okta-ldap-migration/.env` file verify that you have straight quotes and that your free Okta account name is spelled correctly. Correct any errors and save the file. Finally, in the console, run `docker compose up`.

5. Open a browser and navigate to the URL provided in the console to link the Okta LDAP Agent with your free Okta account. For example, for the sample console output shown in Step 4, you would navigate to `https://dev-133337.okta.com/oauth2/auth?code=mzsggy7t`.

   > **Important**: You must complete this step within 10 minutes of executing `docker compose up`.

   If a "token is expired" message is output to the console or displayed when attempting to go to the URL in the browser, perform the following steps:

   1. Type <kbd>Ctrl</kbd> + <kbd>C</kbd> in the console to stop the container.
   2. Type `docker compose down` to stop and delete the container.
   3. Open Docker Desktop and delete the `okta-ldap-migration` container, if present.
   4. Go to your Okta Administration Console, and delete any LDAP agents, interfaces,and users that you’ve imported or added in this exercise.
   5. Type `docker compose up` to start the container.

   <div class="half">

   ![message in browser showing token expired message](/img/ra/directory-coexistence/ldap-to-okta-agent-token-expired-dialog.png)

   </div>

6. If requested, sign into your Okta account.

7. Click **Allow Access** to allow the Okta LDAP Agent access to the Okta API.

   <div class="three-quarter">

   ![dialog, okta ldap agent requesting permission to access okta api](/img/ra/directory-coexistence/ldap-to-okta-allow-access-to-okta-api.png)

   </div>

8. Click **Continue**.

   <div class="full">

   ![dialog, okta ldap agent successful access to okta api](/img/ra/directory-coexistence/ldap-to-okta-successful-access-to-okta.png)

   </div>

### Configure the LDAP Agent

The Okta LDAP Agent is now connected to the LDAP server and Okta, but it still needs to be configured using the Okta Administrator Dashboard. This configuration provides the mappings between users and groups in the Universal Directory, and the users and groups in your LDAP directory.

1. You should already have your Okta Administrator Dashboard open from allowing the Okta LDAP Agent access to the Okta API. If not, navigate to the following URL:

   ```
   https://${yourOktaOrgName}-admin.okta.com
   ```

   For example, if your Okta Org was `https://dev-133337.okta.com`, you would open `https://dev-133337-admin.okta.com`.

2. In the Okta Administrator Dashboard, navigate to **Dashboard > Dashboard**. In the **Status** section, click **Agents** to see the agents associated with your free Okta account:

   <div class="full">

   ![okta dashboard showing agents link](/img/ra/directory-coexistence/ldap-to-okta-dashboard-agents-link.png)

   </div>

   The **ldap-agent Status** should be green and **Operational** as shown:

   <div class="full border">

   ![okta dashboard showing ldap agent status green and operational](/img/ra/directory-coexistence/ldap-to-okta-agent-green-and-operational.png)

   </div>

3. In the Okta Administrator Console, navigate to **Directory > Directory Integrations**:

   <div class="full border">

   ![okta dashboard showing directory integrations](/img/ra/directory-coexistence/ldap-to-okta-directory-integrations.png)

   </div>

   Click **LDAP** to display the **Set Up LDAP** screen where you configure the details of the LDAP integration. Okta provides defaults, but if you are using a different LDAP configuration, you may need to modify the configuration. See [Configure LDAP integration settings](https://help.okta.com/en-us/Content/Topics/Directory/ldap-configure-integration-settings.htm) for more information on each setting.

4. For this exercise, select **OpenLDAP** for **LDAP Version**:

   <div class="full border">

   ![okta dashboard showing LDAP version selection with Open LDAP selected](/img/ra/directory-coexistence/ldap-to-okta-select-ldap-version.png)

   </div>

   For additional information on which LDAP directories can be integrated with Okta see [Supported LDAP directories](https://help.okta.com/en-us/Content/Topics/Directory/ldap-agent-supported-directories.htm).

5. Scroll down and set **User Search Base** to `ou=users,dc=example,dc=org`.

6. Scroll down and update the following **Group** values for this exercise as follows.

| Property               | Value            | Description             |
| ---------------------- | ---------------- | ----------------------- |
| Group Search Base      | `ou=groups,dc=example,dc=org` | The Distinguished Name (DN) of the container for group searches (that is, root of the group subtree) that holds all groups that will be imported into your Okta org.The full search path for your groups. |
| Group Object Class     | `posixgroup`     | The object class for your groups. Okta uses this in its query when importing groups. |
| Group Object Filter    | `(objectclass=posixgroup)` | The group search filter. |
| Member Attribute       | `memberuid`      | The attribute that contains the Distinguished Name of the user. |

7. Scroll to the **Validate Configuration** section and select **Email address** for the **Okta username format** field.

8. Enter **user01@example.com** in the **Example username** field of the **Validate Configuration** section.

   <div class="full border">

   ![okta dashboard showing username configuration with email address format selected](/img/ra/directory-coexistence/ldap-to-okta-test-configuration-username.png)

   </div>

9. Click **Test Configuration**. You will see the following results, where the **Unique ID** is a generated ID:

   <div class="full">

   ![okta dashboard showing validation successful message](/img/ra/directory-coexistence/ldap-to-okta-successful-validation.png)

   </div>

10. Click **Next** and then click **Done**.

This example does not change any of the **To Okta** attribute mappings — it only modifies the **Integration** attribute mappings as validated in the previous steps. However, you can see the mappings of the user and group attributes from LDAP to Okta in the **Directory > Directory Integrations > LDAP > Provisioning > To Okta** screen. JIT provisioning is set on this screen, as well as various other import settings. For this example, do not make any changes on the **To Okta** screen.

Scrolling further down the **To Okta** screen displays the mapping of the individual LDAP to Okta attribute mappings — **First name**, **Last name**, and so on. For this example, do not make any changes. For more information on the LDAP to Okta integration settings, see [Configure LDAP to Okta provisioning settings](https://help.okta.com/en-us/Content/Topics/Directory/ldap-agent-configure-LDAP-import-settings.htm). 

You are now ready to synchronize your LDAP users with Okta.

### Import Users and Groups

After the Okta LDAP Agent is configured, you can import users and groups from the LDAP directory to the Okta Universal Directory. 

1. Select **Directory > Directory Integrations**.

2. Click **LDAP**.

3. Select **Import**.

4. In the **Import Results** section, click **Import Now**.

5. Select **Import** to see all the users available to import:

   <div class="three-quarter border">

   ![Import from LDAP choose incremental report](/img/ra/directory-coexistence/ldap-to-okta-import-from-ldap-import-button.png)

   </div>

6. Click **OK** on the dialog that shows the statistics summary.

   <div class="half border">

   ![statistics summary showing three users and one group imported](/img/ra/directory-coexistence/ldap-to-okta-import-statistics.png)

   </div>

7. On this screen you can see how each LDAP directory user is mapped into an user in the Okta Universal Directory.

   Select all available users and click **Confirm Assignments**.

   <div class="full border">

   ![okta user assignments](/img/ra/directory-coexistence/ldap-to-okta-confirm-assignments.png)

   </div>

8. Select **Auto-activate users after confirmation** on the **Confirm Imported User Assignments** dialog.

   <div class="three-quarter border">

   ![okta user assignments](/img/ra/directory-coexistence/ldap-to-okta-confirm-imported-user-assignments.png)

   </div>

9.  Click **Confirm**. All of the users and groups have been imported from the LDAP directory to Okta Universal Directory!

10. You can view the imported users by going to **Directory > People** in your Okta Administration Dashboard.

   <div class="three-quarter border">

   ![okta user assignments](/img/ra/directory-coexistence/ldap-to-okta-directory-3-users-imported-from-ldap.png)

   </div>

At this point, the selected LDAP users and groups have been imported. Once you have imported your LDAP users into Okta, you can assign them to any application that you have registered with your Okta Organization. Access to those assigned applications can be via any protocol, such as LDAP Interface, OpenID Connect, SAML, etc.

However, authentication of the LDAP user is delegated to the LDAP server through the Okta LDAP Agent. Delegated authentication is used when that user signs into an assigned application in your Okta Organization.

For this example there is only one on-premise LDAP directory server, but if you had LDAP directories running on other servers, you could install an Okta LDAP Agent for each LDAP server and then import those LDAP users into Okta, as well.

[Migrate users from LDAP to Okta](#migrate-users-from-ldap-to-okta) describes how to remove delegated authentication with LDAP.  You can minimize the changes needed for migrating your applications to authenticate against Okta Universal Directory instead of the LDAP directory by [pointing your application to an Okta LDAP Interface](#update-application-to-point-to-the-okta-ldap-interface) or [updating your application to use OAuth 2.0 and OpenID Connect (OIDC)](#update-the-application-to-use-oauth-2-0-openid-connect). This tutorial will go through the steps for each, starting with the Okta LDAP Interface. However, we recommend updating your application to use OpenID Connect (see [Update the application to use OAuth 2.0/OIDC](#update-the-application-to-use-oauth-2-0-openid-connect)) instead of using the Okta LDAP Interface because OpenID Connect is more secure.

## Update application to point to the Okta LDAP Interface

You can expose your Okta users and groups through Okta's LDAP Interface — it exposes Okta's users and groups through the LDAP protocol. In this example, the `okta-ldap-migration` application connects to the Okta service through the Okta LDAP Interface. The Okta service then delegates authentication back to the on-premise LDAP directory server.  See [Set up and manage the LDAP Interface](https://help.okta.com/en-us/Content/Topics/Directory/LDAP-interface-main.htm) for more information.

> **Note**: For this example, the application will need to change the LDAP configuration.

### Enable the Okta LDAP Interface

1. In your console, stop the applications running in the `okta-ldap-migration` directory with <kbd>Ctrl</kbd> + <kbd>C</kbd>.

2. Check out the `okta-ldap` branch:

   ```bash
   git checkout okta-ldap
   ```

3. In the Okta Administrator Dashboard, select **Directory > Directory Integrations**, and select **Add Directory > Add LDAP** Interface.

4. Edit this directory's configuration by clicking **Edit** in the **LDAP Interface screen**.

5. Change **Configuration** in the **Groups section** to **Okta groups and app groups**.

   > **Note**: See the [LDAP Groups settings](https://help.okta.com/en-us/Content/Topics/Directory/ldap-interface-expose-groups.htm) for additional information.

6. Click **Save**.

7. In the Okta Administration Console, go to **Directory > Directory Integrations > LDAP**. Make a note of the text after `/instance/` at the end of the browser URL. The text is your Okta LDAP ID.

   <div class="full border">

   ![okta user assignments](/img/ra/directory-coexistence/ldap-to-okta-ldap-id-in-browser-url.png)

   </div>

8. For this application, the `okta-ldap-migration/.env` file is used to set the values in the `okta-ldap-migration/src/main/resources/application.properties` file. Update the `okta-ldap-migration/.env` file with the following values, and then save the file.

You can also review [additional changes in the application](https://github.com/oktadev/okta-ldap-migration/commit/577f7b8df0e0c1b52272bdd38269784c814c67cf) that allow it to access the Okta LDAP Interface for authentication.

| Key               | Value (example)       | Description             |
| ---------------------- | ---------------- | ----------------------- |
| `OKTA_LDAP_HOST`      | `dev-133337.ldap.okta.com` | LDAP Host name<br><br>Replace `dev-133337` with your Okta Org name. See [Prerequisites](/architecture-center/directory-coexistence/#prerequisites) for how to determine your Okta Org name. |
| `OKTA_LDAP_BASE`     | `dc=dev-133337, dc=okta, dc=com`     | Base Distinguished Name<br><br>Replace `dev-133337` with your Okta Org name. |
| `OKTA_LDAP_ID`    | `<yourOktaLdapId>` | The ID of the directory integration, found in the URL of integration named LDAP.<br><br>The URL is similar to `/admin/app/ldap_sun_one/instance/{ID}`.<br><br>The ID is similar to `0oa6qvmxznVl4KFXe5d7`. |
| `OKTA_LDAP_USERNAME`       | `ldap-user`      | A static user that has access to read user group information; see the following section on how to create a user with restricted access. |
| `OKTA_LDAP_PASSWORD` | `<change-me>` | Password for the above user.<br>Enter an actual value for the password and make note of it. |

### Create a user to access the Okta LDAP Interface

In this section, you will create a user in the Okta Universal Directory. You'll create a new `admin` role, and then assign it to your user. This user will connect the application to the Okta LDAP interface.

1. In the Okta Administrator Dashboard, select **Directory > People > Add Person**.

2. Enter the following values, and then press **Save**.

| Field name               | Value        |
| ---------------------- | ---------------- |
| First name      | `LDAP` |
| Last name      | `User` |
| Username      | `ldap-user@example.com` |
| Primary email      | `ldap-user@example.com` |
| I will set password      | Click **I will set password** and then enter the password that you set for the `OKTA_LDAP_PASSWORD` variable in the `.env` file. |
| User must change password on first login | `false`<br><br>Click **User must change password on first login** to uncheck the field. |

3. Create an admin role:

   1. Select **Security > Administrators > Resources > Create new resource set**.
   2. Enter the **Resource set name** as **Users & Groups**. This will automatically set the **Resource set description** to the same value.
   3. Select **Users** for the **Resource type**.
   4. Select **Constrain to all Users**.
   5. Click **Add another resource type**.
   6. Select **Groups** as the second **Resource type**.
   7. Select **Constrain to all Groups**.

      <div class="three-quarter border">

      ![create new resource set settings](/img/ra/directory-coexistence/ldap-to-okta-create-resource-sets-for-admin-user.png)

      </div>

   8. Click **Save resource set**.
   9. Select **Roles > Create new role**.
   10. Enter the values in the folllowing table.

   | Field name               | Value        |
   | ---------------------- | ---------------- |
   | Role name      | `groups-user-reader` |
   | Role description      | `Groups Users Reader` |

   11. Scroll down and, in the **User permissions** section, select **View users and their details**.
   12. Scroll down and, in the **Group permissions** section, select **View groups and their details**.
   13. Click **Save role**.

4. Assign the admin role to your new user:

   1. Select **Admins > Add administrator**.
   2. In the **Admin** field of the **Administrator assignment by admin** screen, start typing `ldap-user@example.com` until the **LDAP User (ldap-user@example.com)** is shown — select it.
   3. Select **groups-user-reader** for the **Role** field.
   4. Select **Users and Groups** for the **Resource set** field.
   5. Click **Save Changes**.

      <div class="full border">

      ![assign admin role settings](/img/ra/directory-coexistence/ldap-to-okta-assign-admin-role-to-ldap-user.png)

      </div>

   6. Refresh the **Administrator** page and you will see your new administrator, **LDAP User**.

You can test the user's access using the `ldapsearch` command in the console. In the following command, update `dev-133337` with your Okta Org name and `<change-me>` with the password that you set for the `OKTA_LDAP_PASSWORD` variable in the `okta-ldap-migration/.env` file, and then run the command.

```
docker run bitnami/openldap:2 ldapsearch -x -b "ou=groups,dc=dev-133337,dc=okta,dc=com" -H ldaps://dev-133337.ldap.okta.com:636 -D uid=ldap-user,dc=dev-133337,dc=okta,dc=com -w '<change-me>'
```

The result will be a list of groups with uniqueMember attributes, including your admin user and the three users you imported from the LDAP server into Okta. A portion of the listing will be similar to the following:

```
uniqueMember: uid=ldap-user@example.com,ou=users,dc=dev-133337,dc=okta,dc=com
uniqueMember: uid=user01@example.com,ou=users,dc=dev-133337,dc=okta,dc=com
uniqueMember: uid=user02@example.com,ou=users,dc=dev-133337,dc=okta,dc=com
uniqueMember: uid=user03@example.com,ou=users,dc=dev-133337,dc=okta,dc=com
```

### Rebuild the application to incorporate your changes

1. Rebuild the application:

   ```bash
   docker compose build
   ```

2. Start the application:

   ```bash
   docker compose up
   ```

3. Open a private/incognito window and navigate to the same URL as before: `http://localhost:8080`.

4. Sign in with the imported user's email address and password: `user01@example.com` and `password1`.

   <div class="half border">

   ![please sign in dialog with filled in username and password](/img/ra/directory-coexistence/ldap-to-okta-signin-dialog-with-okta-ldap.png)

   </div>

   A successful sign-in returns the following dialog:

   <div class="full border">

   ![Successful sign-in dialog saying Welcome home user01](/img/ra/directory-coexistence/ldap-to-okta-signin-to-ldap-directory.png)

   </div>

#### Troubleshooting

If you see an error message similar to the following when you sign in:

<div class="half border">

![Sign-in nested exception root exception error](/img/ra/directory-coexistence/ldap-to-okta-error-didnt-update-okta-domain.png)

</div>

perform the following steps:

1. Press <kbd>Ctrl</kbd> + <kbd>C</kbd> in the console to stop the containers.

2. Enter `docker compose down` to stop and delete the containers.

3. Edit the `okta-ldap-migration/.env` file and replace any incorrect Okta Org names, such as `dev-133337`, with your Okta Org name. Verify the values for `OKTA_LDAP_HOST`, `OKTA_LDAP_BASE`, `OKTA_LDAP_ID`, `OKTA_LDAP_USERNAME`, and `OKTA_LDAP_PASSWORD`.

4. Save the `okta-ldap-migration/.env` file.

5. In the console, start the application with `docker compose up`.

6. Repeat steps 3 and 4 from the previous section to sign-in to the application.

### Update the application to use OAuth 2.0 OpenID Connect

You can replace the Okta LDAP Interface by updating the application to use OAuth 2.0 and OpenID Connect.

1. In the `okta-ldap-migration` directory, stop the current running containers with <kbd>Ctrl</kbd> + <kbd>C</kbd>.

2. Check out the main branch which [updates the code](https://github.com/oktadev/okta-ldap-migration/commit/047f1891c9675f79fe59c562a219ec0c9de5cb1d) in the project to replace the LDAP authentication with OpenID Connect (OIDC):

   ```bash
   git checkout main
   ```

3. Create an Okta OpenID Connect Application and register the application with Okta:

   ```bash
   okta start
   ```

   The `okta start` CLI command creates and registers an OAuth 2.0/OpenID Connect client with Okta. Okta considers this an OpenID Connect application. When this OpenID Connect application is registered, the `ISSUER`, `CLIENT_ID` and `CLIENT_SECRET` variables in the `okta-ldap-migration/.env` file are updated for authentication with Okta, similar to:

   ```
   # These properties will be set in the "Update the application to use OAuth 2.0/OIDC" section of this guide
   ISSUER=https://dev-133337.okta.com/oauth2/default
   CLIENT_ID=0oa6iartjn5iuoKzr5d7
   CLIENT_SECRET=fF4BMQ0OhGp3D63s71BBTZoztIWqICdrCXBdkCtn
   ```

   The sample web application in the Docker container uses the client ID and client secret to communicate with the Okta OpenID Connect application to use Okta as the identity provider.

4. Rebuild the application:

   ```bash
   docker compose build
   ```

5. Start the application:

   ```bash
   docker compose up
   ```

6. Open a private/incognito window and navigate to the same URL as before, `http://localhost:8080`. This time you are redirected to Okta to sign-in. Sign in with the user's email address and password: `user01@example.com` and `password1`. Okta connects back to the LDAP server for authentication to sign into the `okta-ldap-migration` application.

   <div class="half border">

   ![Sign-in form to sign in to Okta LDAP example, with username and password field](/img/ra/directory-coexistence/ldap-to-okta-signin-dialog-with-ldap-openid.png)

   </div>

   A successful sign in displays the following dialog:

   <div class="three-quarter border">

   ![Successful sign-in response](/img/ra/directory-coexistence/ldap-to-okta-signin-response.png)

   </div>

### Stop the example

Once you have completed the example, you can stop the application and remove the running Docker containers.

1. In the `okta-ldap-migration` directory, stop the current running containers with <kbd>Ctrl</kbd> + <kbd>C</kbd>.

2. Remove the containers:

   ```bash
   docker compose down
   ```

> **Note**: The initial version of this application used simple usernames such as `user01`. Okta defaults to using email addresses for usernames, for example `user01@example.com`. You can configure Okta to use simple usernames if needed. Refer to [How can I remove the format restriction for Okta Username from using an email address format](https://support.okta.com/help/s/article/How-can-I-remove-the-format-restriction-for-Okta-Username-from-using-an-email-address-format?language=en_US) for additional information.

## Migrate users from LDAP to Okta

The LDAP users are already stored in Okta, but the passwords are managed by the LDAP server. Users can be completely migrated to Okta. Refer to [Migrating users from LDAP to Okta Universal Directory](https://support.okta.com/help/s/question/0D50Z00008Vr0MLSAZ/migrating-users-from-ldap-to-okta-universal-directory?language=en_US) for more information.

> **Note**: The instructions in the article linked above require resetting the users’ passwords. If you do not want to reset all user passwords, you can use an Okta Password Import Hook. Refer to [Password import hook](https://docs.google.com/document/d/1ni1heZzFBsOUfw7MM_ssjghiss6IYDQ6sHk6Z4-wFdk/edit#heading=h.qugd9ksfqsxo) for an equivalent example.