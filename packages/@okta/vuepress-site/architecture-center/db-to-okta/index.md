---
layout: Landing
title: Migrate from generic database to Okta
---

# Migrate from generic database to Okta

This article shows how to import users from a generic database into Okta. This example has a sample application that uses a generic database to authenticate. User account information is exported from the database to Okta using a script that queries it for user information. The Okta API is then used to import the users into Okta. The sample application is then updated so it supports OpenID Connect.

## Introduction

This example shows how to import users from a generic database into Okta.  There are Docker containers running a database and a web application. The Spring Boot web application initially authenticates directly with the generic database server. 

In the first part of the example, you start a generic database and web application. When a user signs into the application, their credentials are validated against the database. 

In the second part of the example, you run a script that queries the database for user information and then uses the Okta API to import the users into Okta. Okta can import the hashed passwords for users if the hash is one that [Okta supports](/docs/reference/api/users/#hashed-password-object). An OpenID Connect application is registered with Okta so that all subsequent sign in requests are redirected to Okta for authentication.

In the last part of the example, you sign in with a user record that utilizes a hash type that Okta does not support. This user was imported into Okta by the script, but their password was not. The Okta Password Inline Import Hook can be used to import user records that use an unsupported hash type, without requiring the user to reset their password.

## Authenticate with generic database directory

This example uses a Docker container that contains a web application. A second Docker container contains the generic database server.

1. Change to your project directory and clone the `db-users` branch of the `okta-db-auth-migration-example` repository.

   ```bash
   cd ${your project directory}
   git clone https://github.com/bdemers/okta-db-auth-migration-example -b db-users
   ```

2. Change to the `okta-db-auth-migration-example` directory.

   ```bash
   cd okta-db-auth-migration-example
   ```

   The code for the sample web application is in the `db_users` branch file, `okta-db-auth-migration-example/web-app/src/main/java/com/okta/example/ra/Application.java`. The `okta-db-auth-migration-example/web-app/src/main/resources/application.properties` file defines the variables for the application so it uses the generic database for authentication.

   ```
   spring.datasource.url=jdbc\:postgresql\://${DB_HOST:localhost}\:5432/${POSTGRES_DB:example_db}
   spring.datasource.username=${POSTGRES_USER:db_user}
   spring.datasource.password=${POSTGRES_PASSWORD:super_secret}
   ```

3. Start up the generic database and the web application:

   ```bash
   docker compose up
   ```

4. Open a private/incognito browser window and navigate to `http://localhost:8080`. A sign-in dialog is displayed:

  [INSERT SCREENSHOT]

  > **Troubleshooting**: If you do not see the dialog, go to your Docker desktop. Select **Containers** and open the **okta-db-auth-migration-example** container. If the **webapp-1** container has exited, click the arrow to start the web application and retry ?Step 4.

5. Sign in with the database username `user1@example.com`, and the password equal to `password`:

   [INSERT SCREENSHOT]

   A successful sign in displays the following:

   [INSERT SCREENSHOT]

## Import users into Okta

1. In the `okta-db-auth-migration-example` directory, stop the running containers with <kbd>Ctrl</kbd> + <kbd>C</kbd>.

2. Sign in to your Okta account that you created in the [Prerequisites](/architecture-center/directory-coexistence/#prerequisites) section.

   1. Run the `okta login` command.
 
      **Note**: If you are already logged into Okta using `okta login`, a prompt similar to the following is returned. The current sign in configuration is based on the Okta Org URL and API token you provided at your previous `okta login` command. If you want to use the existing configuration, answer `N` and skip steps b and c. Otherwise, answer `Y` and continue to steps b and c.

      ```
      An existing Okta Organization (https://trial123456.okta.com) was found in C:\mydirectory\.okta\okta.yaml
      Overwrite configuration file? [Y/n]
      ```

   2. Enter your Okta Org URL. If you do not know your Okta Org URL, refer to [Find your Okta domain](/docs/guides/find-your-domain/main/).

   3. Follow the instructions in [Create an API token](/docs/guides/create-an-api-token/main/) to create a token. Once you have the token enter it at the Okta API token prompt.

3. Check out the main branch of the `https://github.com/bdemers/okta-db-auth-migration-example` repository. The main branch contains a migration script and updates to code in the project to replace the database authentication with OpenID Connect (OIDC).

   ```bash
   git checkout main
   ```

   After a successful checkout, the `okta-db-auth-migration-example` directory contains the `pw-import-hook` subdirectory, the `migrate-user.sh` file, as well as other files and code changes.

4. Restart the containers:

   ```bash
   docker compose start
   ```

5. Run the `okta-db-auth-migration-example/migrate-users.sh` script. This script uses a database query to the database server to get the user profiles, and the [Okta Users API](/docs/reference/api/users/) to import those users into Okta. For this example, three users are defined in `okta-db-auth-migration-example/blob/main/sql/03-users.sql`.

   The script imports the two users whose passwords are hashed with a hash that Okta supports: `Admin Istrator` and `User One`. The first time the users sign in, their passwords are rehashed and the hashed passwords are git-bstored in Okta Universal Directory using the `POST https://${yourOktaDomain}/api/v1/user`s` Okta API request.

   There is one more user in the generic database whose password is hashed with a hash that Okta does not support: `User2 Two`. This user is also imported into Universal Directory, but their password is not saved. In order to save a rehashed password the first time they sign in, an additional step is required (see the [Password Import Hook](https://github.com/bdemers/okta-db-auth-migration-example/tree/db-users#password-import-hook) section for more details).

   **Note**: For Windows users only, use `git-bash` to open a git-bash command window and then run `./migrate-users.sh` in the git-bash window. Type `exit` in the git-bash window to close it. The remainder of the example is performed in the original command window, not the git-bash command window.

   ```bash
   ./migrate-users.sh
   ```

   You can see these three users in your Okta Universal Directory. To do so:

   1. In a browser window, sign in to `https://${yourOktaOrgName}-admin.okta.com`. For example, `https://dev-133337-admin.okta.com`. See [Prerequisites](/architecture-center/directory-coexistence/#prerequisites) for a definition of your Okta Org name.

   2. Select **Directory > People**. You will see three users, in addition to the users created in [Migrate from LDAP directory to Okta](/architecture-center/ldap-to-okta/):  **Admin Istrator**, **User One**, and **User2 Two**.

   [INSERT SCREENSHOT]

   **Note**: If you do not see the three users, refresh the screen.

   In the script, the user is imported and activated. [Activating a user account](https://help.okta.com/oie/en-us/Content/Topics/users-groups-profiles/usgp-activate-user-account.htm) sends an email to the user informing them that their account is active and instructing them how to set up their account in your Okta Org.

   3. Select **User One** and you can see the applications to which they are assigned:

   [INSERT SCREENSHOT]

   **Note**: Okta automatically manages a group called **Everyone** which includes all users. The **Everyone** group also includes all applications. You may see a different application or more applications assigned to each user if you have completed other examples in this tutorial.

   You can select other tabs for additional information about each user.

   4. Select an application to display information about it.

   [INSERT SCREENSHOT]

## Redirect authentication to Okta

At this point, three users have been mirrored in Universal Directory, but the application is still authenticating with the database server. You configure the application to use Okta as the identity provider by setting the following variables used for authentication.

* The application (client) ID that Okta assigns when it registers the application.
* A client secret that was generated when the application was registered with Okta. This secret is used by the OAuth 2.0 client to authenticate with the authorization server.
* An issuer URI, which is the authentication endpoint for a cloud environment. 
* A redirect URI, which is the endpoint to which the authorization server will send the response after the user has been successfully authorized and granted an authorization code or token.  In this example, the redirect URI is `http://localhost:8080/login/oauth2/code/okta`.

1. Register the Okta OpenID Connect application with Okta:
   
   ```bash
   okta start
   ```

   The Okta CLI command, `okta start`, creates and registers an OAuth 2.0/OpenID Connect client with Okta. Okta considers this OAuth 2.0/OpenID Connect client an OpenID Connect application.  When this OpenID Connect application is registered, the `ISSUER`, `CLIENT_ID` and `CLIENT_SECRET` variables in the `okta-db-auth-migration-example/.env` file are updated for authentication with Okta.

   The `okta-db-auth-migration-example/.env` file before running `okta start` is as follows:

   ```
   ISSUER=${CLI_OKTA_ISSUER}
   CLIENT_ID=${CLI_OKTA_CLIENT_ID}
   CLIENT_SECRET=${CLI_OKTA_CLIENT_SECRET}
   ```

   After running the `okta start` command, the `okta-db-auth-migration-example/.env` file is similar to the following, where the `ISSUER` references your Okta domain, and the `CLIENT_ID` and `CLIENT_SECRET` are set to authenticate with your Okta domain.

   ```
   ISSUER=https://${yourOktaDomain}/oauth2/default
   CLIENT_ID= 0oa1jnble6BnOyerj697
   CLIENT_SECRET= vShMAaUlsOvX8WwuouZfHjOBE3FmM4UOVISz5w4K
   ```

2. Stop the Docker compose process by typing:
   
   ```bash
   docker compose stop
   ```

3. Rebuild the application:

   ```bash
   docker compose build
   ```

4. Start the application:

   ```bash
   docker compose up
   ```

5. Open a private/incognito browser window and navigate to `http://localhost:8080`.

   This time you are redirected to Okta to sign in.

6. Sign in with the same username and password as before (username = `user1@example.com` and password = `password`).

   [INSERT IMAGE]

   When the user is authenticated by Okta, you will see the following displayed:

   [INSERT IMAGE]

## Password import inline hook

+++MORE CONTENT TO BE ADDED HERE+++


