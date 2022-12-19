---
layout: Landing
title: Migrate from generic database to Okta
---

# Migrate from generic database to Okta

This article shows how to import users from a generic database into Okta. This example has a sample application that uses a generic database to authenticate. User account information is exported from the database to Okta using a script that queries it for user information. The Okta API is then used to import the users into Okta. The sample application is then updated so it supports OpenID Connect.

## Introduction

This example uses Docker containers running a database and a web application. The Spring Boot web application initially authenticates directly with the generic database server.

In the first part of the example, you start a generic database and web application. When a user signs into the application, their credentials are validated against the database.

In the second part of the example, you run a script that queries the database for user information and then uses the Okta API to import the users into Okta. Okta can import the hashed passwords for users if the hash is one that [Okta supports](/docs/reference/api/users/#hashed-password-object). An OpenID Connect application is registered with Okta so that all subsequent sign in requests are redirected to Okta for authentication.

In the last part of the example, you sign in with a user record that utilizes a hash type that Okta does not support. This user was imported into Okta by the script, but their password was not. The Okta Password Inline Import Hook can be used to import user records that use an unsupported hash type, without requiring the user to reset their password.

## Authenticate with generic database directory

This example uses a Docker container that contains a web application. A second Docker container contains the generic database server.

1. Change to your project directory and clone the `db-users` branch of the `okta-db-auth-migration-example` repository.

   ```bash
   cd ${your project directory}
   git clone https://github.com/oktadev/okta-reference-coexistence-db-example -b db-users
   ```

2. Change to the `okta-db-auth-migration-example` directory.

   ```bash
   cd okta-db-auth-migration-example
   ```

   The code for the sample web application is in the `db_users` branch — see the `okta-db-auth-migration-example/web-app/` directory. The configuration for the web application and database are defined in the `docker-compose.yml` file:

3. Start up the generic database and the web application:

   ```bash
   docker compose up
   ```

4. Open a private/incognito browser window and navigate to `http://localhost:8080`. A sign-in dialog is displayed:

5. Sign in with the database username `user1@example.com`, and a password equal to `password`:

   <div class="half border">

   ![Sign-in dialog including username and password fields](/img/ra/directory-coexistence/db-to-okta-signin-dialog.png)

   </div>

   A successful sign in displays the following:

   <div class="three-quarter border">

   ![DB to okta successful sign in](/img/ra/directory-coexistence/db-to-okta-successful-signin.png)

   </div>

## Import users into Okta

1. In the `okta-db-auth-migration-example` directory, stop the running containers with <kbd>Ctrl</kbd> + <kbd>C</kbd>.

2. Sign in to your Okta account that you created in the [Prerequisites](/architecture-center/directory-coexistence/#prerequisites) section.

   1. Run the `okta login` command.
 
      **Note**: If you are already logged into Okta using `okta login`, a prompt similar to the following is returned. The current sign in configuration is based on the Okta Org URL and API token you provided at your previous `okta login` command. If you want to use the existing configuration, answer `N` and skip steps b and c. Otherwise, answer `Y` and continue to steps b and c.

      ```
      An existing Okta Organization (https://dev-133337.okta.com)
      was found in C:\mydirectory\.okta\okta.yaml
      Overwrite configuration file? [Y/n]

      ```

   2. Enter your Okta Org URL. If you do not know your Okta Org URL, refer to [Find your Okta domain](/docs/guides/find-your-domain/main/).

   3. Follow the instructions in [Create an API token](/docs/guides/create-an-api-token/main/) to create a token. Once you have the token enter it at the Okta API token prompt.

3. Check out the main branch of the `https://github.com/oktadev/okta-db-auth-migration-example` repository. The main branch contains a migration script and updates to code in the project to replace the database authentication with OpenID Connect (OIDC).

   ```bash
   git checkout main
   ```

   After a successful checkout, the `okta-db-auth-migration-example` directory contains the `pw-import-hook` subdirectory, the `migrate-user.sh` file, and other files and code changes.

4. Restart the containers:

   ```bash
   docker compose start
   ```

5. Run the `okta-db-auth-migration-example/migrate-users.sh` script. This script uses a database query to the database server to get the user profiles, and the [Okta Users API](/docs/reference/api/users/) to import those users into Okta. For this example, three users are defined in `okta-db-auth-migration-example/blob/main/sql/03-users.sql`.

   The script imports the two users whose passwords are hashed with a hash that Okta supports: `Admin Istrator` and `User One`. The first time the users sign in, their passwords are rehashed and the hashed passwords are git-bstored in Okta Universal Directory using the `POST https://${yourOktaDomain}/api/v1/user`s` Okta API request.

   There is one more user in the generic database whose password is hashed with a hash that Okta does not support: `User2 Two`. This user is also imported into Universal Directory, but their password is not saved. In order to save a rehashed password the first time they sign in, an additional step is required (see the [Password Import Hook](https://github.com/oktadev/okta-db-auth-migration-example/tree/db-users#password-import-hook) section for more details).

   **Note**: If you are using Windows, use `git-bash` to open a git-bash command window and then run `./migrate-users.sh` in the this window. Type `exit` to close it. The remainder of the example is performed in the original command window, not the git-bash command window.

   ```bash
   ./migrate-users.sh
   ```

   You can see these three users in your Okta Universal Directory. To do so:

   1. In a browser window, sign in to `https://${yourOktaOrgName}-admin.okta.com`. For example, `https://dev-133337-admin.okta.com`. See [Prerequisites](/architecture-center/directory-coexistence/#prerequisites) for a definition of your Okta Org name.

   2. Select **Directory > People**. You will see three users in addition to the users created in [Migrate from LDAP directory to Okta](/architecture-center/ldap-to-okta/):  **Admin Istrator**, **User One**, and **User2 Two**.

   <div class="full border">

   ![Okta people directory with three users listed](/img/ra/directory-coexistence/db-to-okta-auth-migration-user1-user2-admin-createdbyscript.png)

   </div>

   **Note**: If you do not see the three users, refresh the screen.

   In the script, the user is imported and activated. [Activating a user account](https://help.okta.com/oie/en-us/Content/Topics/users-groups-profiles/usgp-activate-user-account.htm) sends an email to the user, informing them that their account is active, and instructing them how to set up their account in your Okta Org.

   3. Select **User One** to see the applications they are assigned to:

   <div class="three-quarter border">

   ![User 1 details, showing they are assigned to the okta-db-auth-migration-example application](/img/ra/directory-coexistence/db-to-okta-user1-details.png)

   </div>

   **Note**: Okta automatically manages a group called **Everyone**, which includes all users. The **Everyone** group also includes all applications. You may see a different application or more applications assigned to each user if you have completed other examples in this tutorial.

   You can select other tabs for additional information about each user.

## Redirect authentication to Okta

At this point, three users have been mirrored in Universal Directory, but the application is still authenticating with the database server. You configure the application to use Okta as the identity provider by setting the following variables used for authentication.

* The application (client) ID that Okta assigns when it registers the application.
* A client secret that was generated when the application was registered with Okta. This secret is used by the OAuth 2.0 client to authenticate with the authorization server.
* An issuer URI, which is the authentication endpoint for a cloud environment.
* A redirect URI, which is the endpoint to which the authorization server will send the response after the user has been successfully authorized and granted an authorization code or token. In this example, the redirect URI is `http://localhost:8080/login/oauth2/code/okta`.

1. Register the Okta OpenID Connect application with Okta:
   
   ```bash
   okta start
   ```

   The `okta start` command creates and registers an OAuth 2.0/OpenID Connect client with Okta. Okta considers this to be an OpenID Connect application.  When this OpenID Connect application is registered, the `ISSUER`, `CLIENT_ID` and `CLIENT_SECRET` variables in the `okta-db-auth-migration-example/.env` file are updated for authentication with Okta.

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

5. Open a private/incognito browser window and navigate to `http://localhost:8080`. This time you are redirected to Okta to sign in.

6. Sign in with the same username and password as before (username = `user1@example.com` and password = `password`).

   <div class="half border">

   ![Sign-in dialog including username and password fields](/img/ra/directory-coexistence/db-to-okta-sign-in-to-db-example.png)

   </div>

   When the user is authenticated by Okta, you will see the following displayed:

   <div class="three-quarter border">

   ![Successful sign-in response](/img/ra/directory-coexistence/db-to-okta-successful-signin.png)

   </div>

## Password import inline hook

In order to import user records that do NOT have a supported password hash type and without needing to reset the user's password, you can use the Okta Password Import Inline Hook. The first time the user tries to log in to your application, this hook will make a REST API request to your application. The application will validate the password and respond to Okta. Okta will then hash and store the **hashed** password (no further calls will be made to the application for this user).

> **Note**: See [Okta's User API docs](https://developer.okta.com/docs/reference/api/users/#hashed-password-object) for details on what hash types are supported.

In this example, the application is already running on port `8000`, but it is not exposed to the Internet (it needs to be exposed externally so Okta can access it.)

For this example, you will use `ngrok` to get a public URL for the locally running service.

1. Open a new command/terminal window and run:

   ```
   ngrok http 8000
   ```

   Make note of your public URL. The public URL is the `https` **Forwarding** URL. In the following screenshot, the Forwarding URL is shown as `https://5d13-208-115-147-143.ngrok.io`.

   <div class="full border">

   ![ngrok CLI detail output](/img/ra/directory-coexistence/db-to-okta-ngrok-url-for-generic-db.png)

   </div>

### Register the application with Okta

For this example, the `pwimporthook-1` Docker container contains a Java application in the `okta-db-auth-migration-example/blob/main/pw-import-hook/` directory. This application contains the password hook REST API call (`Post /pwhook`) and logic to validate the passwords.

The password import inline hook must be set up and activated within your Okta Admin Console.

To set up and activate the password import inline hook:

1. In the Okta Administration Console, go to **Workflow > Inline Hooks**.

2. Click **Add Inline Hook** and select **Password Import** from the dropdown menu.

3. Add a name for the hook (in this example, "Password Import Hook").

4. Add your external service **URL**. For this example, use the following syntax so that the **/pwhook** REST API is called on the external URL that ngrok generated.

   ```
   ${your-ngrok-url}/pwhook
   ```

   For example, `https://5d13-288-115-147-143.ngrok.io/pwhook`.

5. Include the authentication field and secret. For this example:
   * **Authentication field** = `Authorization`
   * **Authentication secret** = `Basic dXNlcjp1c2UtYS1zdHJvbmctcGFzc3dvcmQ=`

6. Click **Save**. You should end up with password import hook details as shown:

<div class="full">

![password import hook overview page](/img/ra/directory-coexistence/db-to-okta-password-import-inline-hook-config.png)

</div>

Note: The `POST /pwhook` REST API request uses basic authentication and a static username/password that is hard-coded for this example. You can calculate the authentication secret value for your own username and password combinations using the command:

```bash
echo ${username}:${password} | base64.
```

Don't forget the `Basic` prefix when entering the value into the **Authentication secret** field!

### Test the password import hook

The flow of events for a user with an unsupported hash is as follows:

1. Navigate to your web-app.

2. Your web-app redirects to Okta to sign in.

3. You type a username and password into the Okta sign-in dialog.

4. Okta makes a REST API request to your password-validation application.

5. The password-validation service validates the password and responds to Okta.

6. Okta stores a hash of the user's password.

7. The user is redirected back to the web-app.

To test the password import inline hook:

1. Open a private browser window (or clear your cookies) and navigate to `http://localhost:8080`.

2. Sign in with the following credentials:

   * Username: user2@example.com
   * Password: password

   <div class="half border">

   ![Sign-in dialog including username and password fields](/img/ra/directory-coexistence/db-to-okta-sign-in-to-db-example.png)

   </div>

  A successful sign-in will result in a "Welcome home" message, similar to in previous examples.

You can open a browser to `http://localhost:4040` (the URL assigned to the **Web Interface** attribute when ngrok assigned your external URL) to see the request that was sent to the `POST /pwhook` REST API endpoint, and the response. For example:

<div class="full border">

![POST pwhook endpoint request and response](/img/ra/directory-coexistence/db-to-okta-post-pwhook-request-and-response-in-ngrok.png)

</div>

### Stop the example

Once you have completed the example, you can stop the application and remove the running Docker containers.

1. In the `okta-db-auth-migration-example` directory, stop the current running containers with <kbd>Ctrl</kbd> + <kbd>C</kbd>.

2. Remove the containers:

   ```bash
   docker compose down
   ```