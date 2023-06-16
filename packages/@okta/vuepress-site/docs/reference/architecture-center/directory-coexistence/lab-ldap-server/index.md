---
title: Migrate users from an on-premises LDAP directory
---

# Migrate users from an on-premises LDAP directory

Suppose you already handle authentication through an on-premises LDAP directory but want to replace it with Okta. You can install an on-premises Okta LDAP Agent to mirror those users to Universal Directory and then redirect your applications to Okta for authentication. In this scenario, Universal Directory serves as a single source of truth for user data and lets administrators centrally manage policies and profiles. You can assign them to any application registered with your Okta org. Access to those assigned applications can be through any protocol, such as LDAP Interface, OpenID Connect (OIDC), SAML, and so on.

However, authentication of the LDAP user is delegated to the LDAP server through the Okta LDAP Interface so that users can authenticate with Okta using their LDAP directory server credentials. This directory coexistence can stay in place until you migrate all your user information to Universal Directory and no longer require the LDAP directory.

In this tutorial, you create a sample web application that authenticates directly with an on-premises OpenLDAP Directory Server. Then, you migrate all the users in that directory to Universal Directory with the Okta LDAP Agent. Finally, you update the application to authenticate its users with Universal Directory through the Okta LDAP Interface. Specifically:

1. [Set up the start scenario](#set-up-the-start-scenario). Spin up a simple OIDC-based web application in a Docker container that authenticates its user against an OpenLDAP Directory server you've started in a second Docker container. At this point, Okta isn't involved in the authentication flow. Use a username and password to authenticate directly with the LDAP directory server.
1. [Connect Okta LDAP Agent and Import Users](#connect-okta-ldap-agent-and-import-users). Spin up an Okta LDAP Agent instance in a Docker container. Connect it to the OpenLDAP directory server and Okta, and then import your LDAP users and groups into Universal Directory.
1. [Update the application to point to the Okta LDAP Interface](#update-the-application-to-point-to-the-okta-ldap-interface). Your application still expects to use LDAP to authenticate users. Initialize and configure an Okta LDAP Interface and configure your application to query that instead of the on-premises LDAP directory. The Okta service then delegates authentication back to the on-premises LDAP directory server.
1. [Update application to use OIDC instead of LDAP](#update-the-application-to-use-oidc). Build and register an OIDC web application with Okta to replace the Okta LDAP Interface.
1. (Optional) [Complete the migration of users from LDAP to Universal Directory](#migrate-users-from-ldap-to-okta). Disable delegated authentication back to the LDAP server and make your applications authenticate only with Okta.

At the end of step 4, when a user attempts to sign in to the application, their authorization request is redirected to Okta and then delegated to the LDAP directory. At the end of step 5, their authorization request is handled entirely by Okta.

<div class="full">

  ![An architecture diagram showing the authorization flow from user to Okta to an OpenLDAP Directory server and back again.](/img/architecture/directory-coexistence/ldap-to-okta-flow-diagram.png)

  <!--
    Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?type=design&node-id=3714%3A41148&t=U52HeyImgt4pt3M2-1 ldap-to-okta-flow-diagram
  -->
</div>

> **Note:** This tutorial uses three [Docker](https://www.docker.com) containers that run a sample web application, an OpenLDAP directory server, and an on-premises Okta LDAP Agent. The tutorial also configures a cloud-based Okta LDAP Interface. For information on integrating your LDAP instance with Okta, see [Manage your LDAP integration](https://help.okta.com/okta_help.htm?type=oie&id=ext_LDAP_Provisioning)

## Set up the start scenario

Create the initial environment for the tutorial where an application authenticates directly with an OpenLDAP directory server running on-premises in a Docker container.

1. Change to your project directory and clone the `ldap-users` branch of the `okta-reference-coexistence-ldap-example` repository:

   ```bash
   cd ${your project directory}
   git clone https://github.com/oktadev/okta-reference-coexistence-ldap-example -b ldap-users
   ```

1. Change to the `okta-reference-coexistence-ldap-example` directory:

   ```bash
   cd okta-reference-coexistence-ldap-example
   ```

1. Start the application. The `docker compose up` command uses the `okta-reference-coexistence-ldap-example/docker-compose.yml` file to start the two containers. One runs the web app, and one runs the OpenLDAP directory server.

   ```bash
   docker compose up
   ```

   If successful, you should see the `okta-reference-coexistence-ldap-example-webapp-1` started in your terminal, similar to:

   ```txt
   okta-reference-coexistence-ldap-example-webapp-1  | 2022-09-01 20:51:24.536  INFO 1 --- [           main] o.s.l.c.support.AbstractContextSource    : Property 'userDn' not set - anonymous context will be used for read-write operations
   okta-reference-coexistence-ldap-example-webapp-1  | 2022-09-01 20:51:24.857  INFO 1 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8080 (http) with context path ''
   okta-reference-coexistence-ldap-example-webapp-1  | 2022-09-01 20:51:24.867  INFO 1 --- [           main] com.okta.example.ra.Application          : Started Application in 2.033 seconds (JVM running for 2.371)
   ```

1. Open a private/incognito browser window and go to `http://localhost:8080` to display the LDAP directory sign-in dialog.

   <div class="half wireframe-border">

   ![A sign-in form with fields for username and password and a next button](/img/wireframes/sign-in-form-username-password.png)

   <!--
   Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3398%3A36678&t=wzNwSZkdctajVush-1 sign-in-form-username-password
   -->

   </div>

   The OpenLDAP directory contains three users defined in the `ldifs\users.ldif` file. At the prompt, sign in with username **user01** and password **password1**. The following dialog appears after successful authentication:

   <div class="three-quarters border">

   ![Sign-in response with welcome home successful authentication response](/img/architecture/directory-coexistence/ldap-to-okta-signin-response.png)

   </div>

## Connect Okta LDAP Agent and import users

With the basic environment set up, connect the OpenLDAP directory server to your Okta org with an instance of Okta LDAP Agent. Then, import the LDAP users into Universal Directory.

> **Note:** Okta LDAP Agent is installed on-premises in the same network as the LDAP server that it's connecting to Okta. For this lab, you use an Okta LDAP Agent instance in a Docker container.

### Sign in to your Okta account

Stop the currently running containers and sign in to your Okta account.

1. In the `okta-reference-coexistence-ldap-example` directory, stop the currently running containers with <kbd>Ctrl</kbd> + <kbd>C</kbd>.
1. Run `okta login`.

   ```bash
   okta login
   ```

   If you’re already signed in to Okta, a prompt similar to the following is returned. The current sign-in configuration is based on the Okta org URL and API token that you provided at your previous `okta login` command. If you want to use the existing configuration, answer **N** and skip steps a and b. Otherwise, answer **Y** and continue to steps a and b.

   ```txt
   An existing Okta Organization (https://dev-133337.okta.com) was found in C:\mydirectory\.okta\okta.yaml
   Overwrite configuration file? [Y/n]
   ```

   If Okta CLI returns an error "Your Okta Org is missing a feature required to use the Okta CLI: API Access Management," you aren’t using an Okta developer account. To resolve this error, see [Okta developer account](/docs/reference/architecture-center/directory-coexistence/lab/#okta-developer-account).

   {style="list-style-type:lower-alpha"}
   1. Enter your `${OKTA_DOMAIN}`. If you don't know your `${OKTA_DOMAIN}`, see [Values and variables](/docs/reference/architecture-center/directory-coexistence/lab/#values-and-variables).
   1. Follow the instructions in [Create an API token](/docs/guides/create-an-api-token) to create a token. After you have the token, enter it at the Okta API token prompt.

### Set up the Okta LDAP Agent

Connect the LDAP directory server to Okta with an Okta LDAP Agent. The Okta LDAP Agent provides delegated authentication to the on-premises LDAP server so your users can authenticate to Okta using their local LDAP credentials.

> **Note:** Set up Just-In-Time (JIT) provisioning in the Okta LDAP agent at this point if you want to use a [JIT migration strategy](/docs/reference/architecture-center/directory-coexistence/#just-in-time-migration). Remember that this allows LDAP server and Universal Directory profiles to coexist. It also provides a seamless experience because users don't have to create a new username or password in Universal Directory. After your users are mirrored in Okta, you can stop delegating authentication to the LDAP server and have Okta be solely responsible for authentication, as described in [Migrate users from LDAP to Okta](#migrate-users-from-ldap-to-okta).

1. In the `okta-reference-coexistence-ldap-example` directory, check out the `agent` branch from the `okta-reference-coexistence-ldap-example` repository. This branch contains a Docker container that runs an Okta LDAP Agent.

   ```bash
   git checkout agent
   ```

   A successful checkout creates an `okta-reference-coexistence-ldap-example\okta-ldap-agent` directory.

   > **Note:** For installation options, see [Manage your LDAP integration](https://help.okta.com/okta_help.htm?type=oie&id=ext_LDAP_Provisioning).

1. Rebuild the containers:

   ```bash
   docker compose build
   ```

1. Edit the `okta-reference-coexistence-ldap-example/.env` file, which stores Okta-related configurations. Edit the **OKTA_URL** line so it points to your free Okta account:

   ```js
   OKTA_URL="https://${OKTA_DOMAIN}"
   ```

   For example, `OKTA_URL="https://dev-133337.okta.com"`

1. In the terminal, start the application:

   ```bash
   docker compose up
   ```

1. The first time the **ldap-agent** container starts, an authentication link is provided in the terminal output.

   ```txt
   ldap-agent      Please visit the URL: https://dev-133337.okta.com/oauth2/auth?code=mzsggy7t before Fri Feb 03 20:00:00 UTC 2023 to authenticate and continue agent reistration.
   ```

   > **Tip:** If you don't see a link for the `ldap-agent` in the terminal output, or you see `ldap-agent` exited with code 3, type <kbd>Ctrl</kbd> + <kbd>C</kbd> in the terminal to stop the application. Next, in the `okta-reference-coexistence-ldap-example/.env` file, verify that you have straight quotes and that your Okta account name is spelled correctly. Correct any errors and save the file. Finally, in the terminal, run `docker compose up`.

1. Open a browser and go to the URL provided in the terminal to link the Okta LDAP Agent with your free Okta account. For example, for the sample terminal output shown in the previous step go to `https://dev-133337.okta.com/oauth2/auth?code=mzsggy7t`.

   > **Caution:** You must complete this step within 10 minutes of executing `docker compose up`.

   A **token is expired** message may be output to the terminal or displayed when attempting to go to the URL in the browser.

   <div class="half">

   ![Message in browser showing token expired message](/img/architecture/directory-coexistence/ldap-to-okta-agent-token-expired-dialog.png)

   </div>

   If it appears, perform the following steps:

   1. Type <kbd>Ctrl</kbd> + <kbd>C</kbd> in the terminal to stop the container.
   2. Type `docker compose down` to stop and delete the container.
   3. Open Docker Desktop and delete the `okta-reference-coexistence-ldap-example` container, if present.
   4. Open the Admin Console for your org and delete any LDAP agents, interfaces, and users that you've imported or added in this exercise.
   5. Type `docker compose up` to start the container.

1. If requested, sign in to your Okta account.
1. Click or tap **Allow Access** to allow the Okta LDAP Agent access to the Okta API.

   <div class="three-quarter">

   ![dialog, Okta LDAP agent requesting permission to access Okta api](/img/architecture/directory-coexistence/ldap-to-okta-allow-access-to-okta-api.png)

   </div>

1. Click or tap **Continue** to complete the connection. A dialog appears to confirm the connection.

   <div class="three-quarter">

   ![dialog, Okta LDAP agent successful access to Okta api](/img/architecture/directory-coexistence/ldap-to-okta-successful-access-to-okta.png)

   </div>

### Configure the LDAP Agent

The Okta LDAP Agent is now connected to the LDAP server and Okta. However, you still need to configure it using the Admin Console. This configuration provides the mappings between users and groups in the Universal Directory and the users and groups in your LDAP directory.

First, make sure that the LDAP Agent is operational:

1. Open the Admin Console for your Okta org.

   `https://${OKTA_DOMAIN_NAME}-admin.okta.com`

   For example, if `${OKTA_DOMAIN_NAME}` is `dev-133337`, you access your Admin Console at `https://dev-133337-admin.okta.com`.

1. Choose **Dashboard** > **Dashboard** to see the status of your org.
1. Locate the **Status** section, and click **Agents** to see the agents associated with your free Okta account:

   <div class="full">

   ![Okta dashboard showing agents link](/img/architecture/directory-coexistence/ldap-to-okta-dashboard-agents-link.png)

   </div>

   The ldap-agent's **Status** should be **Operational** with a green dot:

   <div class="full border">

   ![Okta dashboard showing LDAP agent status green and operational](/img/architecture/directory-coexistence/ldap-to-okta-agent-green-and-operational.png)

   </div>

Now you can configure the details of the LDAP integration. Okta provides defaults, but if you’re using a different LDAP configuration, you may need to modify the configuration. For information on each setting, see [Configure LDAP integration settings](https://help.okta.com/en-us/Content/Topics/Directory/ldap-configure-integration-settings.htm).

1. Choose **Directory** > **Directory Integrations** to see the current directory integrations.
1. Click **LDAP** to configure the user mappings.

   <div class="full border">

   ![Okta dashboard showing directory integrations](/img/architecture/directory-coexistence/ldap-to-okta-directory-integrations.png)

   </div>

1. Set **LDAP Version** to **OpenLDAP**.

   > **Note:** For additional information on which LDAP directories you can integrate with Okta, see [Supported LDAP directories](https://help.okta.com/en-us/Content/Topics/Directory/ldap-agent-supported-directories.htm).

1. Set **User Search Base** to **ou=users,dc=example,dc=org**.
1. Update the following **Group** values:

   | Property               | Value            | Description             |
   | ---------------------- | ---------------- | ----------------------- |
   | Group Search Base      | `ou=groups,dc=example,dc=org` | The Distinguished Name (DN) of the container for group searches (that is, the root of the group subtree) that holds all groups to be imported into your Okta org. The full search path for your groups. |
   | Group Object Class     | `posixgroup`     | The object class for your groups. Okta uses this in its query when importing groups. |
   | Group Object Filter    | `(objectclass=posixgroup)` | The group search filter. |
   | Member Attribute       | `memberuid`      | The attribute that contains the Distinguished Name of the user. |

1. Locate the **Validate Configuration** section and set **Okta username format** to **Email address**.
1. Set **Example username** to **`user01@example.com`**.
1. Click **Test Configuration**. Results similar to the following appear:

   <div class="full">

   ![Okta dashboard showing validation successful message](/img/architecture/directory-coexistence/ldap-to-okta-successful-validation.png)

   </div>

1. Click **Next** and then click **Done**.

Choose **Directory** > **Directory Integrations** > **LDAP** > **Provisioning** > **To Okta** to see the mappings of the user and group attributes from LDAP to Okta. On this page, you can create individual LDAP to Okta attribute mappings, configure JIT provisioning, and various other settings. For this example, leave this page as is.

> **Note:** For more information on the LDAP to Okta integration settings, see [Configure LDAP to Okta provisioning settings](https://help.okta.com/okta_help.htm?topic=oie&id=ext_cofigure_ldap_okta_settings).

You’re now ready to synchronize your LDAP users with Okta.

### Import users and groups

The Okta LDAP Agent now connects the LDAP Server to Okta so you can import users and groups from the LDAP directory to the Okta Universal Directory.

1. Choose **Directory** > **Directory Integrations**.
1. Click **LDAP** to access your LDAP connection.
1. Select **Import**.
1. In the **Import Results** section, click **Import Now**.
1. Select **Import** to see all the users available to import:

   <div class="three-quarter border">

   ![Import from LDAP incremental report](/img/architecture/directory-coexistence/ldap-to-okta-import-from-ldap-import-button.png)

   </div>

1. Click **OK** on the dialog that shows the statistics summary.

   <div class="half border">

   ![Statistics summary showing three users and one group imported](/img/architecture/directory-coexistence/ldap-to-okta-import-statistics.png)

   </div>

1. In the report, you can see how each LDAP directory user is mapped to a user in Universal Directory.

   Select all available users and click **Confirm Assignments**.

   <div class="full border">

   ![Okta user assignments](/img/architecture/directory-coexistence/ldap-to-okta-confirm-assignments.png)

   </div>

1. Select **Auto-activate users after confirmation** in the **Confirm Imported User Assignments** dialog.
1. Click **Confirm**. All users and groups are now imported from the LDAP directory to Universal Directory.
1. Choose **Directory** > **People** to view the imported users.

   <div class="three-quarter border">

   ![Okta user assignments](/img/architecture/directory-coexistence/ldap-to-okta-directory-3-users-imported-from-ldap.png)

   </div>

The selected LDAP users and groups are now imported, and you can assign them to any application that you’ve registered with your Okta org. Users can access those assigned applications through any protocol, such as LDAP Interface, OIDC, SAML, and so on.

However, authentication of the LDAP user is delegated to the LDAP server through the Okta LDAP Agent. Delegated authentication is used when that user signs in to an assigned application in your Okta org.

For this tutorial, there’s only one on-premises LDAP directory server. If you had LDAP directories running on other servers, you could install an Okta LDAP Agent for each LDAP server and import those LDAP users into Okta as well.

To update an application to authenticate against Okta Universal Directory instead of the LDAP directory, you can either

* [Update your application to point to an Okta LDAP Interface](#update-the-application-to-point-to-the-okta-ldap-interface).
* [Update your application to use OIDC](#update-the-application-to-use-oidc).

This tutorial goes through the steps for each, starting with the Okta LDAP Interface. However, we recommend updating your application to use OIDC instead of the Okta LDAP Interface because OIDC is more secure.

## Update the application to point to the Okta LDAP Interface

The [Okta LDAP Interface](https://help.okta.com/okta_help.htm?topic=oie&id=ext_LDAP_Using_the_LDAP_Interface) exposes Okta's users and groups to applications using the LDAP protocol. In this section, you connect the `okta-reference-coexistence-ldap-example` application to Universal Directory through the Okta LDAP Interface. Universal Directory delegates authentication back to the on-premises LDAP directory server through the LDAP Agent.

> **Note:** For this example, the application needs to change the LDAP configuration.

### Enable the Okta LDAP Interface

1. In your terminal, stop the applications running in the `okta-reference-coexistence-ldap-example` directory with <kbd>Ctrl</kbd> + <kbd>C</kbd>.
1. Check out the `okta-ldap` branch:

   ```bash
   git checkout okta-ldap
   ```

1. Open the Admin Console for your org.
1. Choose **Directory** > **Directory Integrations** to see the current directory integrations.
1. Choose **Add Directory** > **Add LDAP** Interface.
1. Click **Edit** in the **LDAP Interface page** to edit this directory's configuration.
1. Locate the **Groups section** and set **Configuration** to **Okta groups and app groups**.

   > **Note**: See the [LDAP Groups settings](https://help.okta.com/en-us/Content/Topics/Directory/ldap-interface-expose-groups.htm).

1. Click **Save**.
1. Choose **Directory** > **Directory Integrations > LDAP**. Make a note of the text after `/instance/` at the end of the browser URL. The text is your `${OKTA_LDAP_ID}`.

   <div class="full border">

   ![Okta user assignments](/img/architecture/directory-coexistence/ldap-to-okta-ldap-id-in-browser-url.png)

   </div>

1. Update the `okta-reference-coexistence-ldap-example/.env` file with the following values, and then save the file.

You can also review [additional changes in the application](https://github.com/oktadev/okta-reference-coexistence-ldap-example/commit/577f7b8df0e0c1b52272bdd38269784c814c67cf) that allow it to access the Okta LDAP Interface for authentication.

| Key               | Value (example)       | Description             |
| ---------------------- | ---------------- | ----------------------- |
| `OKTA_LDAP_HOST`      | `dev-133337.ldap.okta.com` | LDAP Host name<br><br>Replace `dev-133337` with ${OKTA_DOMAIN_NAME}. See [Values and variables](/docs/reference/architecture-center/directory-coexistence/lab/#values-and-variables). |
| `OKTA_LDAP_BASE`     | `dc=dev-133337, dc=okta, dc=com`     | Base Distinguished Name<br><br>Replace `dev-133337` with ${OKTA_DOMAIN_NAME}. |
| `OKTA_LDAP_ID`    | `<yourOktaLdapId>` | The ID of the directory integration, found in the URL of integration named LDAP.<br><br>The URL is similar to `/admin/app/ldap_sun_one/instance/{ID}`.<br><br>The ID is similar to `0oa6qvmxznVl4KFXe5d7`. |
| `OKTA_LDAP_USERNAME`       | `ldap-user`      | A static user that has access to read user group information. See the following section on how to create a user with restricted access. |
| `OKTA_LDAP_PASSWORD` | `<change-me>` | Password for the user.<br>Enter an actual value for the password and make note of it. |

### Create a user to access the Okta LDAP Interface

In this section, you create a new user with a new admin role in Universal Directory. This user connects the application to the Okta LDAP Interface.

1. Open the Admin Console for your org.
1. Choose **Directory** > **People** > **Add Person**.
1. Enter the following values, and then press **Save**.

   | Field name               | Value        |
   | ---------------------- | ---------------- |
   | First name      | `LDAP` |
   | Last name      | `User` |
   | Username      | `ldap-user@example.com` |
   | Primary email      | `ldap-user@example.com` |
   | I will set password      | Click **I will set password** and then enter the password that you set for the `OKTA_LDAP_PASSWORD` variable in the `.env` file. |
   | User must change password on first login | `false`<br><br>Click **User must change password on first login** to clear the field. |

1. Create an admin role:

   1. Choose **Security** > **Administrators** > **Resources** > **Create new resource set**.
   1. Set **Resource set name** to **Users & Groups**. This sets **Resource set description** to the same value.
   1. Set**Resource type** to **Users**.
   1. Verify that **Constrain to all Users** is selected.
   1. Click **Add another resource type**.
   1. Set the second **Resource type** to **Groups**.
   1. Verify the second **Constrain to all Users** is selected.
   1. Click **Save resource set**.
   1. Choose **Roles** > **Create new role**.
   1. Set **Role name** to **groups-user-reader**.
   1. Set **Role description** to **Groups Users Reader**.
   1. Locate the **User permissions** section and verify **View users and their details** is selected.
   1. Locate the **Group permissions** section and verify **View groups and their details** is selected.
   1. Click **Save role**.

1. Assign the admin role to your new user:

   1. Select **Admins** > **Add administrator**.
   1. Locate the **Administrator assignment by admin** page and set **Admin** to **LDAP User (`ldap-user@example.com`)**.
   1. Set **Role** to **groups-user-reader**.
   1. Set **Resource set** to **Users and Groups**.
   1. Click **Save Changes**.
   1. Refresh the **Administrator** page to see your new administrator, **LDAP User**.

You can test the user's access using the following `ldapsearch` command in the terminal. Remember to first replace `${OKTA_DOMAIN_NAME}` with your Okta org name and `${OKTA_LDAP_PASSWORD}` with the password that you set for the `OKTA_LDAP_PASSWORD` variable in the `okta-reference-coexistence-ldap-example/.env` file first.

```bash
docker run bitnami/openldap:2 ldapsearch -x -b "ou=groups,dc=dev-133337,dc=okta,dc=com" -H ldaps://${OKTA_DOMAIN_NAME}.ldap.okta.com:636 -D uid=ldap-user,dc=dev-133337,dc=okta,dc=com -w '${OKTA_LDAP_PASSWORD}'
```

The result is a list of groups with `uniqueMember` attributes, including your admin user and the three users that you imported from the LDAP server into Okta. A portion of the listing is similar to the following:

```txt
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

3. Open a private/incognito window and go to the same URL as before: `http://localhost:8080`.

4. Sign in with the imported user's email address and password: `user01@example.com` and `password1`.

   A successful sign-in flow returns the following dialog:

   <div class="half border">

   ![Successful sign-in dialog saying Welcome home user01](/img/architecture/directory-coexistence/ldap-to-okta-signin-to-ldap-directory.png)

   </div>

### Troubleshooting

If you see an error message similar to the following when you sign in:

<div class="half border">

![Sign-in nested exception](/img/architecture/directory-coexistence/ldap-to-okta-error-didnt-update-okta-domain.png)

</div>

Perform the following steps:

1. Enter <kbd>Ctrl</kbd> + <kbd>C</kbd> in the terminal to stop the containers.

2. Enter `docker compose down` to stop and delete the containers.

3. Edit the `okta-reference-coexistence-ldap-example/.env` file and replace any incorrect Okta org names, such as `dev-133337`, with your Okta org name. Verify the values for `OKTA_LDAP_HOST`, `OKTA_LDAP_BASE`, `OKTA_LDAP_ID`, `OKTA_LDAP_USERNAME`, and `OKTA_LDAP_PASSWORD`.

4. Save the `okta-reference-coexistence-ldap-example/.env` file.

5. In the terminal, start the application with `docker compose up`.

6. Repeat steps 3 and 4 from the previous section to sign in to the application.

## Update the application to use OIDC

You can replace the Okta LDAP Interface by updating the application to use OIDC.

1. In the `okta-reference-coexistence-ldap-example` directory, stop the current running containers with <kbd>Ctrl</kbd> + <kbd>C</kbd>.

1. Remove the containers:

   ```bash
   docker compose down
   ```

1. Check out the main branch of `okta-reference-coexistence-ldap-example`. This updates the code in the project to replace the LDAP authentication with OIDC:

   ```bash
   git checkout main
   ```

1. Create an Okta OIDC application and register the application with Okta:

   ```bash
   okta start
   ```

   The `okta start` CLI command creates and registers an OIDC client with Okta. Okta considers this an OIDC application. When this OIDC application is registered, the `ISSUER`, `CLIENT_ID`, and `CLIENT_SECRET` variables in the `okta-reference-coexistence-ldap-example/.env` file are updated for authentication with Okta, similar to:

   ```txt
   ISSUER=https://dev-133337.okta.com/oauth2/default
   CLIENT_ID=0oa6iartjn5iuoKzr5d7
   CLIENT_SECRET=fF4BMQ0OhGp3D63s71BBTZoztIWqICdrCXBdkCtn
   ```

   The sample web application in the Docker container uses the client ID and client secret to communicate with the Okta OIDC application to use Okta as the Identity Provider. See [Values and variables](/docs/reference/architecture-center/directory-coexistence/lab/#values-and-variables).

1. Rebuild the application:

   ```bash
   docker compose build
   ```

1. Start the application:

   ```bash
   docker compose up
   ```

1. Open a private/incognito window and go to the same URL as before: `http://localhost:8080`. This time you’re redirected to Okta to sign in. Sign in with the user's email address and password: `user01@example.com` and `password1`. Okta connects back to the LDAP server for authentication to sign in to the `okta-reference-coexistence-ldap-example` application.

   A successful sign in flow displays the following dialog:

   <div class="half border">

   ![Successful sign-in response](/img/architecture/directory-coexistence/ldap-to-okta-signin-response.png)

   </div>

### Stop the application

After you complete this tutorial, stop the application and remove the Docker containers.

1. In the `okta-reference-coexistence-ldap-example` directory, stop the current running containers with <kbd>Ctrl</kbd> + <kbd>C</kbd>.

2. Remove the containers:

   ```bash
   docker compose down
   ```

> **Note**: The initial version of this application used simple usernames such as `user01`. Okta defaults to using email addresses for usernames, for example `user01@example.com`. You can configure Okta to use simple usernames if needed. See [How can I remove the format restriction for Okta Username from using an email address format](https://support.okta.com/help/s/article/How-can-I-remove-the-format-restriction-for-Okta-Username-from-using-an-email-address-format?language=en_US).

## Migrate users from LDAP to Okta

The LDAP users are already stored in Okta, but the passwords are managed by the LDAP server. If you want Okta to take over the authentication part instead of Delegated Authentication to LDAP, disable delegated Authentication for LDAP by going to **Security** > **Delegated Authentication** > **LDAP**. This requires you to reset passwords for the all the LDAP users so that users can set an Okta password to sign in. This will still retain the user's profile to be sourced by LDAP but authentication will be handled by Okta. If you want user profiles to be sourced by Okta, turn off Profile Master setting under **Directories** > **LDAP** > **Settings** > **Import Settings** and **Disable Profile Master**. This converts all LDAP user profiles to be sourced by Okta.

> **Note**: This requires resetting the users' passwords. If you don't want to reset all user passwords, you can use an Okta password import hook. See [Account for hash types Okta doesn't support](/docs/reference/architecture-center/directory-coexistence/lab-generic-database/#account-for-hash-types-okta-doesn-t-support).
