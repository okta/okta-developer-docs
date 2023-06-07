---
title: Migrate users from an on-premises generic database
---

# Migrate users from an on-premises generic database

Suppose you store your user profiles and groups in a generic on-premises database, but want to replace it with Universal Directory. In this case, you have two options:

* Export your user information into a CSV (or similar) file and then import the data from the file into Universal Directory.
* Write a script that queries the database for user information and then uses the [Okta Users API](/docs/reference/api/users/) to import the users into Universal Directory.

In both cases, Okta can import hashed passwords for users if the hash is one that [Okta supports](/docs/reference/api/users/#hashed-password-object). If Okta doesn't support the hash, it doesn't import the user's password. However, you can use the [Okta password inline import hook](/docs/reference/password-hook/) to import user records that use an unsupported hash type without requiring the user to reset their password.

> **Note:** Just-In-Time migration isn't supported in this scenario.

In this tutorial, you walk through the second of these migration options. Specifically:

1. [Set up the start scenario](#set-up-the-start-scenario).
   Start an OIDC-based web application in a Docker container that authenticates its user against a generic database server started in a second Docker container. At this point, Okta isn't involved in the authentication flow.
1. [Import users into Universal Directory with the Users API](#import-users-into-universal-directory-with-the-users-api).
   Run a script that queries the database for user information and then imports the users into Universal Directory with the Users API.
1. [Update the application to use Universal Directory](#update-the-application-to-use-universal-directory).
   Configure the web application to use Universal Directory instead of the generic database. Test that you can sign in successfully with the imported user profiles.
1. [Account for hash types Okta doesn't support](#account-for-hash-types-okta-doesn-t-support).
   If a user record uses a hash type that Okta doesn't support, the script in step 2 imports everything in the record into Universal Directory except the user's password. In this step, you use the Okta password inline import hook to import user records with an unsupported hash type without requiring the user to reset their password.

At the end of step 3, when a user attempts to sign in to the application, Okta handles their authorization request. The generic database isn't used.

## Set up the start scenario

Create the initial environment for the tutorial where an application authenticates directly with a generic user database running on-premises in a Docker container.

1. Change to your project directory and clone the `db-users` branch of the `okta-reference-coexistence-db-example` repository:

   ```bash
   cd ${your project directory}
   git clone https://github.com/oktadev/okta-reference-coexistence-db-example -b db-users
   ```

1. Change to the okta-reference-coexistence-db-example directory:

   ```bash
   cd okta-reference-coexistence-db-example
   ```

1. Start up the application. The `docker compose up` command uses the `okta-reference-coexistence-db-example/docker-compose.yml` file to start up two containers. One runs the web app, and the other runs the generic database.

   ```bash
   docker compose up
   ```

1. Open a private/incognito browser window and navigate to `http://localhost:8080`. A sign-in dialog appears.

   <div class="half wireframe-border">

   ![A sign-in form with fields for username and password and a next button](/img/wireframes/sign-in-form-username-password.png)

   <!--
   Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3398%3A36678&t=wzNwSZkdctajVush-1 sign-in-form-username-password
   -->

   </div>

1. Sign in with username **`user1@example.com`** and password **password**. The following dialog appears after successful authentication:

   <div class="three-quarters border">

   ![Sign-in response with welcome home successful authentication response](/img/architecture/directory-coexistence/db-to-okta-successful-signin.png)

   </div>

## Import users into Universal Directory with the Users API

With the basic environment set up, you can:

* [Sign in to your Okta account](#sign-in-to-your-okta-account)
* [Run the import script](#run-the-import-script)
* [Check that the users have imported correctly](#check-that-the-users-have-imported-correctly)

### Sign in to your Okta account

Stop the currently running containers and sign in to your Okta account.

1. In the `okta-reference-coexistence-db-example` directory, stop the currently running containers with <kbd>Ctrl</kbd> + <kbd>C</kbd>.
1. Run `okta login`.

   ```bash
   okta login
   ```

   If you're already signed in to Okta, a prompt similar to the following is returned. The current sign-in configuration is based on the Okta org URL and API token you provided at your previous `okta login` command. If you want to use the existing configuration, answer **N** and skip steps a and b. Otherwise, answer **Y** and continue to steps a and b.

   ```txt
   An existing Okta Organization (https://dev-133337.okta.com) was found in C:\mydirectory\.okta\okta.yaml
   Overwrite configuration file? [Y/n]
   ```

   If Okta CLI returns an error "Your Okta Org is missing a feature required to use the Okta CLI: API Access Management," you are not using an Okta developer account. To resolve this error, see [Okta developer account](/docs/reference/architecture-center/directory-coexistence/lab/#okta-developer-account).

   {style="list-style-type:lower-alpha"}
   1. Enter your `${OKTA_DOMAIN}`. If you don't know your `${OKTA_DOMAIN}`, see [Values and variables](/docs/reference/architecture-center/directory-coexistence/lab/#values-and-variables).
   1. Follow the instructions in [Create an API token](/docs/guides/create-an-api-token) to create a token. After you have the token, enter it at the Okta API token prompt.

### Run the import script

Check out the script to import the users and check that they have been imported correctly in Universal Directory.

1. Check out the main branch of the `https://github.com/oktadev/okta-reference-coexistence-db-example` repository. The main branch contains a migration script and updates to code in the project to replace the database authentication with OpenID Connect (OIDC).

   ```bash
   git checkout main
   ```

   After a successful checkout, the `okta-reference-coexistence-db-example` directory contains the `pw-import-hook` subdirectory, the `migrate-user.sh` file, and other files and code changes.

1. Restart the containers:

   ```bash
   docker compose start
   ```

1. Run the `okta-reference-coexistence-db-example/migrate-users.sh` script.

   ```bash
   ./migrate-users.sh
   ```

This script uses a database query to get the user profiles from the database server, and the [Okta Users API](/docs/reference/api/users/), to import those users into Okta. For this example, three users are defined in `okta-reference-coexistence-db-example/blob/main/sql/03-users.sql`.

Using the Okta Users API, the script imports the two users whose passwords are hashed with a hash that Okta supports; `Admin Istrator` and `User One`. The first time the users sign in, their passwords are rehashed and updated in Universal Directory with the `POST https://${OKTA_DOMAIN}/api/v1/user` API request. See [Create User with imported hashed password](/docs/reference/api/users/#create-user-with-imported-hashed-password).

There's one more user in the generic database whose password is hashed with a hash that Okta doesn't support: **User2 Two**. This user is also imported into Universal Directory, but their password isn't saved. To save a rehashed password the first time they sign in, an additional step is required. This is covered in [Account for hash types Okta doesn't support](#account-for-hash-types-okta-doesn-t-support).

> **Note**: If you're using Windows, use `git-bash` to open a git-bash command window and then run `./migrate-users.sh` in it. Type `exit` to close it. The remainder of the example is performed in the original command window, not the git-bash command window.

### Check that the users have imported correctly

Check that the three imported users appear in your Okta Universal Directory.

1. In a browser window, sign in to `https://${DOMAIN_NAME}-admin.okta.com`. If you don't know your `${OKTA_DOMAIN}`, see [Values and variables](/docs/reference/architecture-center/directory-coexistence/lab/#values-and-variables).
1. Choose **Directory > People**. The page lists three users in addition to those created in [Migrate users from an on-premises LDAP directory](/docs/reference/architecture-center/directory-coexistence/lab-ldap-server): **Admin Istrator**, **User One**, and **User2 Two**.

   > **Note:** If you don't see the three users, refresh the page.

   In the script, the user is imported and activated. [Activating a user account](https://help.okta.com/okta_help.htm?type=oie&id=ext_activate_user) sends an email to the user, informing them that their account is active and instructing them how to set up their account in your Okta org.

1. Select User One to see the applications they're assigned to.

   > **Note:** Okta automatically manages a group called **Everyone**, which includes all users. The **Everyone** group also includes all applications. You may see different applications assigned to each user if you complete other examples in this tutorial.

   You can select other tabs for additional information about each user.

## Update the application to use Universal Directory

Now that the users are mirrored in Universal Directory, you can reconfigure the application to use Universal Directory as its Identity Provider.

1. In the `okta-reference-coexistence-db-example` directory, stop the current running containers with <kbd>Ctrl</kbd> + <kbd>C</kbd>.

1. Remove the containers:

   ```bash
   docker compose down
   ```

1. Create an Okta OIDC application and register the application with Okta:

   ```bash
   okta start
   ```

   The `okta start` CLI command creates and registers an OIDC client with Okta. Okta considers this an OIDC application. When this application is registered, the `ISSUER`, `CLIENT_ID` and `CLIENT_SECRET` variables in the `okta-reference-coexistence-db-example/.env` file are updated for authentication with Okta, similar to:

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

1. Open a private/incognito window and navigate to the same URL as before: `http://localhost:8080`. This time you're redirected to Okta to sign in. Sign in with the user's email address and password: `user1@example.com` and `password`.

   When the user is authenticated by Okta, the following appears:

   <div class="three-quarters border">

   ![Successful sign-in response](/img/architecture/directory-coexistence/db-to-okta-successful-signin.png)

   </div>

## Account for hash types Okta doesn't support

You can use the [Okta password inline import hook](/docs/reference/password-hook/) to import user records with an [unsupported password hash type](/docs/reference/api/users/#hashed-password-object) without needing to reset the user's password. The first time the user with an unsupported hash tries to sign in to your application, the following flow occurs:

1. A user tries to sign in to an application.
1. Okta makes a REST API request to your password validation application.
1. The password validation service validates the password and responds to Okta.
1. Okta stores a hash of the user's password.
1. The user is successfully authenticated and redirected back to their application.

<div class="full">

  ![A flow diagram showing the Okta password inline import hook redirects authentication to a generic database from Okta if the password isn't saved in Universal Directory.](/img/architecture/directory-coexistence/db-to-okta-password-inline-import-hook-flow-diagram.png)

  <!--
    Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?type=design&node-id=3714%3A41151&t=U52HeyImgt4pt3M2-1 db-to-okta-password-inline-import-hook-flow-diagram
  -->
</div>

After this, no further calls are made to the password validation application when that user signs in.

To demonstrate the successful import of passwords through the password inline import hook, you:

1. [Expose the password validation application to Okta](#expose-the-password-validation-application-to-okta)
1. [Activate the password inline import hook in your web application](#activate-the-password-inline-import-hook-in-your-web-application)
1. [Test the password inline import hook](#test-the-password-import-hook)

## Expose the password validation application to Okta

A password validation application is already running on port 8000 from a Docker container, but it isn't exposed to the internet. Expose the app externally so that Okta can access it using `ngrok` to get a public URL.

1. Open a new command/terminal window and run:

   ```bash
   ngrok http 8000
   ```

   Make note of your public URL. The public URL is the `https` **Forwarding** URL. In the following image, the Forwarding URL is shown as `https://5d13-208-115-147-143.ngrok.io`.

   <div class="full border">

   ![ngrok CLI detail output](/img/architecture/directory-coexistence/db-to-okta-ngrok-url-for-generic-db.png)

   </div>

### Activate the password inline import hook in your web application

The `pwimporthook-1` Docker container contains a Java application in the `/pw-import-hook/` directory. This application contains the password hook REST API call (`Post /pwhook`) and logic to validate the passwords.

Set the password import inline hook up and activate it within your Admin Console:

1. Open the Admin Console for your org.
1. Choose **Workflow** > **Inline Hooks**.
1. Click **Add Inline Hook** and select **Password Import** from the dropdown menu.
1. Add a name for the hook. For example, _Password Import Hook_.
1. Set **URL** to your external service URL. Use the following syntax so that the **/pwhook** REST API is called on the external URL that ngrok generated. For example, `https://5d13-288-115-147-143.ngrok.io/pwhook`.
1. Set **Authentication field** to **Authorization**.
1. Set **Authentication secret** to **Basic dXNlcjp1c2UtYS1zdHJvbmctcGFzc3dvcmQ=**

   > **Caution:** Don't forget the **Basic** prefix when you set the value in the **Authentication secret** field.

1. Click **Save**.

> **Note:** The `POST /pwhook` REST API request uses basic authentication and a static username/password that is hard-coded for this example. You can calculate the authentication secret value for your own username and password combinations using the command `echo ${username}:${password} | base64`.

### Test the password import hook

To test the password import inline hook:

1. Open a private/incognito window and navigate to the same URL as before: `http://localhost:8080`.
1. Sign in with the user's email address and password: `user2@example.com` and `password`.

   <div class="half border">

   ![Sign-in dialog including username and password fields](/img/architecture/directory-coexistence/db-to-okta-sign-in-to-db-example.png)

   </div>

  A successful sign-in results in a "Welcome home" message, similar to previous examples.

Open a browser to `http://localhost:4040`, the URL assigned to the **Web Interface** attribute when ngrok assigned your external URL. The request that was sent to the `POST /pwhook` REST API endpoint, and the response appears. For example:

<div class="full border">

![POST pwhook endpoint request and response](/img/architecture/directory-coexistence/db-to-okta-post-pwhook-request-and-response-in-ngrok.png)

</div>

## Stop the application

After you complete this tutorial, stop the application and remove the Docker containers.

1. In the `okta-reference-coexistence-db-example` directory, stop the current running containers with <kbd>Ctrl</kbd> + <kbd>C</kbd>.
1. Remove the containers:

   ```bash
   docker compose down
   ```
