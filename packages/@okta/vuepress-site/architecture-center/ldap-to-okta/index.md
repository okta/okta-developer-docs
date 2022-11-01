---
layout: Landing
title: Migrate from LDAP directory to Okta
---

# Migrate from LDAP directory to Okta

This article shows how to migrate user data from a sample web application that first authenticates directly with an on-premise OpenLDAP Directory Server over to Okta. The tutorial includes adding an Okta LDAP Agent and Okta LDAP Interface to mirror users from the on-premise LDAP directory server into the cloud-based Okta Universal Directory so they can access other applications using delegated authentication with the LDAP directory server. It also shows you how to replace the Okta LDAP Interface with OpenID Connect authentication.

## Introduction

This example uses three Docker containers that run a sample web application, OpenLDAP directory server, and on-premise Okta LDAP Agent. The example also configures a cloud-based Okta LDAP Interface. Refer to [Manage your LDAP integration](https://help.okta.com/en-us/Content/Topics/Directory/ldap-agent-manage-integration.htm) for information on integrating your LDAP instance with Okta.

The Okta LDAP Agent is installed in an on-premise server. The Okta LDAP Interface is cloud-based. In this example, the Okta LDAP Agent provides delegated authentication. This allows users to authenticate with Okta using their local LDAP directory credentials, and migrate on-premise applications to the cloud.

This example performs the following tasks, in order:

1. [Setup OpenLDAP Directory Server](#setup-openldap-directory-server): Here you are not logged into Okta. You use a username and password to authenticate directly with the LDAP directory server.
2. [Connect Okta LDAP Agent and Import Users](#connect-okta-ldap-agent-and-import-users): Here an Okta LDAP Agent is connected to the OpenLDAP directory server and to Okta. The example takes you through the steps to import your LDAP users into your Okta Universal Directory. Once you have imported your LDAP users into Okta, you can assign them to any application that you have registered with your Okta Organization. Access to those assigned applications can be via any protocol, such as LDAP Interface, OpenID Connect, SAML, and so on.

   However, authentication of the LDAP user is delegated to the LDAP server through the Okta LDAP Agent so that users can authenticate with Okta using their LDAP directory server credentials.
3. [Update application to point to Okta LDAP interface](#update-application-to-point-to-the-okta-ldap-interface): Here an Okta LDAP Interface is configured. In this example, the okta-ldap-migration application connects to the Okta service through the Okta LDAP Interface. The Okta service then delegates authentication back to the on-premise LDAP directory server.
4. [Update application to use OAuth 2.0 and OpenID Connect](#): Here an OpenID Connect web application is registered with Okta to replace the Okta LDAP Interface. The [Okta Password Import Inline Hook](/docs/guides/password-import-inline-hook/nodejs/main) is also discussed.
5. [Migrate users from LDAP to Okta](#): This section includes instructions on how to disable delegated authentication back to the LDAP server and make your applications authenticate only with Okta.

## Setup OpenLDAP Directory Server

In this part of the example, you use a username and password to authenticate directly with the OpenLDAP directory server running on-premise in a Docker container. The OpenLDAP directory contains three users, as defined in the `okta-ldap-migration\ldifs\users.ldif` file.

1. Change to your project directory and clone the `ldap-users` branch of the `okta-ldap-migration` repository:
   
   ```bash
   cd ${your project directory}
   git clone https://github.com/bdemers/okta-ldap-migration -b ldap-users
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

   [INSERT IMAGE]

5. Sign in with username `user01` and password `password1`. A successful sign in displays the following dialog:

   [INSERT IMAGE]

## Connect Okta LDAP Agent and Import Users

In this part of the lab, an Okta LDAP Agent is configured to connect to both your Okta account and the LDAP directory server. In addition, the user accounts and attributes are imported into Okta Universal Directory.

### Stop Running Containers and Sign in to your Okta account

The first step is to stop the current running containers and sign in to your Okta account that you created in the [Prerequisites](/architecture-center/directory-coexistence/#prerequisites) section.

1. In the `okta-ldap-migration` directory, stop the current running containers with <kbd>CTRL</kbd> + <kbd>C</kbd>.

2. Run `okta login`

   **Note**:  If you are already logged into Okta using `okta login`, a prompt similar to the following is returned. The current sign in configuration is based on the Okta Org URL and API token you provided previously. If you want to use the existing configuration, answer N and skip steps 3 and 4. Otherwise, answer Y and continue to steps 3 and 4.

   ```
   An existing Okta Organization (https://dev-133337.okta.com) was found in C:\mydirectory\.okta\okta.yaml
   Overwrite configuration file? [Y/n]
   ```

3. Enter your **Okta Org URL**. If you do not know your Okta Org URL, refer to [Find your Okta domain](https://developer.okta.com/docs/guides/find-your-domain/main/).

4. Follow the instructions in [Create an API token](https://developer.okta.com/docs/guides/create-an-api-token/main/) to create a token. Once you have the token enter it at the **Okta API token** prompt.

### Connect the Okta LDAP Agent

The next step is to connect an Okta LDAP Agent to the LDAP directory server and Okta. The Okta LDAP Agent provides delegated authentication to the on-premise LDAP server so that your users can authenticate to Okta using their local LDAP credentials.

You can also set up Just-In-Time (JIT) provisioning in the Okta LDAP agent. JIT provisioning automatically creates a new user profile in Okta when a user first authenticates with the LDAP server. A new user account is only created in Okta if the user does not have an existing user profile in Okta Universal Directory. You can continue to have your users sign into their applications through Okta and Okta can delegate authentication to your on-premise LDAP server. Or once your users are mirrored in Okta you can stop delegating authentication to the LDAP server and have Okta be solely responsible for authentication, as described in [Migrate users from LDAP to Okta](#).

1. In the `okta-ldap-migration` directory, check out the `agent` branch from the `okta-ldap-migration` repository. This branch contains a Docker container that runs an Okta LDAP Agent. For more information on other installation options, see [Okta's LDAP Agent documentation](https://help.okta.com/en/prod/Content/Topics/Directory/ldap-agent-manage-integration.htm).

   ```bash
   git checkout agent
   ```

   A successful checkout will result in creation of the `okta-ldap-agent` subdirectory in your `okta-ldap-migration` directory.

2. Rebuild the containers.

   ```bash
   docker compose build
   ```

3. Edit the `okta-ldap-migration/.env` file, which stores Okta related configurations. Edit the `OKTA_URL` line so it points to your free Okta account.

   ```
   OKTA_URL="https://${yourOktaOrg}"
   ```

   For example, `OKTA_URL="https://dev-133337.okta.com"`

4. In the console, start the application.

   ```
   docker compose up
   ```

   The first time the **ldap-agent** container starts, an authentication link is provided in the console output, similar to:

   [INSERT IMAGE]

   > **Troubleshooting**: If you do not see a link for the `ldap-agent` in the console output, or you see `ldap-agent` exited with code 3, first type <kbd>Ctrl</kbd> + <kbd>C</kbd> in the console to stop the application. Next, in the `okta-ldap-migration/.env` file verify that you have straight quotes and that your free Okta account name is spelled correctly. Correct any errors and save the file. Finally, in the console, run `docker compose up`.

5. Open a browser and navigate to the URL provided in the console to link the Okta LDAP Agent with your free Okta account. For example, for the sample console output shown in step 4, you would navigate to `https://dev-133337.okta.com/oauth2/auth?code=mzsggy7t`.

   > **Important**: You must complete this step within 10 minutes of executing `docker compose up`.
 
   If a "token is expired" message is output to the console or the following dialog is displayed when attempting to go to the URL in the browser:
   
   [INSERT IMAGE]
   
   perform the following steps:

   1. Type <kbd>Ctrl</kbd> + <kbd>C</kbd> in the console to stop the container.
   2. Type `docker compose down` to stop and delete the container.
   3. Open Docker Desktop and delete the `okta-ldap-migration` container, if present.
   4. Go to your Okta Administration Console, and delete any LDAP agents, interfaces,and users that you’ve imported or added in this exercise.
   5. Type `docker compose up` to start the container.

6. If requested, sign into your Okta account.

7. Click **Allow Access** to allow the Okta LDAP Agent access to the Okta API.

   [INSERT IMAGE]

8. Click **Continue**.

   [INSERT IMAGE]

### Configure the LDAP Agent

The Okta LDAP Agent is now connected to the LDAP server and Okta, but it still needs to be configured using the Okta Administrator Dashboard. This configuration provides the mappings between users and groups in the Okta Universal Directory, and the users and groups in your LDAP directory.

1. You should already have your Okta Administrator Dashboard open from allowing the Okta LDAP Agent access to the Okta API. If not, navigate to the following URL:

   ```
   https://${yourOktaOrgName}-admin.okta.com
   ```

   For example, if your Okta Org was `https://dev-133337.okta.com`, you would open `https://dev-133337-admin.okta.com`.

2. In the Okta Administrator Dashboard, navigate to **Dashboard > Dashboard**. In the **Status** section, click **Agents** to see the agents associated with your free Okta account:

   [INSERT SCREENSHOT]

   The **ldap-agent Status** should be green and **Operational** as shown"

   [INSERT SCREENSHOT]

3. In the Okta Administrator Console, navigate to **Directory > Directory Integrations**:

   [INSERT SCREENSHOT]

   Click **LDAP** to display the **Set Up LDAP** screen where you configure the details of the LDAP integration. Okta provides defaults, but if you are using a different LDAP configuration, you may need to modify the configuration. See [Configure LDAP integration settings](https://help.okta.com/en-us/Content/Topics/Directory/ldap-configure-integration-settings.htm) for more information on each setting.

4. For this exercise, select **OpenLDAP** for **LDAP Version**:

   [INSERT SCREENSHOT]

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

   [INSERT SCREENSHOT]

9. Click **Test Configuration**. You will see the following results, where the **Unique ID** is a generated ID:

   [INSERT SCREENSHOT]

10. Click **Next** and then click **Done**.

This example does not change any of the **To Okta** attribute mappings, it only modifies the **Integration** attribute mappings, as validated in the previous steps. However, you can see the mappings of the user and group attributes from LDAP to Okta on the **Directory > Directory Integrations > LDAP > Provisioning > To Okta** screen. JIT provisioning is set on this screen, as well as various other import settings. For this example, do not make any changes on the **To Okta** screen. 

Scrolling further down the **To Okta** screen displays the mapping of the individual LDAP to Okta attribute mappings, such as **First name**, **Last name**, and so on. For this example, do not make any changes. For more information on the LDAP to Okta integration settings, see [Configure LDAP to Okta provisioning settings](https://help.okta.com/en-us/Content/Topics/Directory/ldap-agent-configure-LDAP-import-settings.htm). 

You are now ready to synchronize your LDAP users with Okta.

### Import Users and Groups

After the Okta LDAP Agent is configured, you can import users and groups from the LDAP directory to the Okta Universal Directory. 

1. Select **Directory > Directory Integrations**.

2. Click **LDAP**.

3. Select **Import**.

4. In the **Import Results** section, click **Import Now**.

5. Select **Import** to see all the users available to import:

   [INSERT SCREENSHOT]

6. Click **OK** on the dialog that shows the statistics summary.

   [INSERT SCREENSHOT]

7. On this screen you can see how each LDAP directory user is mapped into an user in the Okta Universal Directory.

   Select all available users and click **Confirm Assignments**.

   [INSERT SCREENSHOT]

8. Select **Auto-activate users after confirmation** on the **Confirm Imported User Assignments** dialog.

   [INSERT SCREENSHOT]

9.  Click **Confirm**. All of the users and groups have been imported from the LDAP directory to Okta Universal Directory!

10. You can view the imported users by going to **Directory > People** in your Okta Administration Dashboard.

   [INSERT SCREENSHOT]

At this point, the selected LDAP users and groups have been imported. Once you have imported your LDAP users into Okta, you can assign them to any application that you have registered with your Okta Organization. Access to those assigned applications can be via any protocol, such as LDAP Interface, OpenID Connect, SAML, and so on. 

However, authentication of the LDAP user is delegated to the LDAP server through the Okta LDAP Agent. Delegated authentication is used when that user signs into an assigned application in your Okta Organization.

For this example there is only one on-premise LDAP directory server, but if you had LDAP directories running on other servers, you could install an Okta LDAP Agent for each LDAP server and then import those LDAP users into Okta, as well.

[Migrate users from LDAP to Okta](#) describes how to remove delegated authentication with LDAP.  You can minimize the changes needed for migrating your applications to authenticate against Okta Universal Directory instead of the LDAP directory by [pointing your application to an Okta LDAP Interface](#update-application-to-point-to-the-okta-ldap-interface) or [updating your application to use OAuth 2.0 and OpenID Connect (OIDC)](#). This tutorial will go through the steps for each, starting with the Okta LDAP Interface. However, we recommend updating your application to use OpenID Connect (see [Update the application to use OAuth 2.0/OIDC](#)) instead of using the Okta LDAP Interface because OpenID Connect is more secure.

## Update application to point to the Okta LDAP Interface

+++MORE CONTENT TO BE ADDED HERE+++