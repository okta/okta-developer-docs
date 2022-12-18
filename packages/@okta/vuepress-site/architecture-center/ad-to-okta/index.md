---
layout: Landing
title: Migrate from Azure Active Directory to Okta
---

# Migrate from Azure Active Directory to Okta

This article illustrates how to migrate from a cloud-based identity and access management service to Okta. The tutorial shows how to integrate your current identity system with Okta, using Azure Active Directory as an example. Specifically, this involves using Just-In-Time (JIT) user identity authentication to migrate users from Active Directory to [Okta Universal Directory](https://www.okta.com/products/universal-directory/).

## Introduction

If you already handle authentication via a cloud-based identity provider (IdP) such as Active Directory, you can mirror those users in Okta Universal Directory. Universal Directory can serve as a single source of truth for user data, and let administrators centrally manage policies and profiles. The user passwords are still managed in Active Directory.

This example uses a [Docker](https://www.docker.com/) container that can be run on any platform, containing a [Spring Boot](https://spring.io/projects/spring-boot) web application that uses [OpenID Connect](/docs/concepts/oauth-openid/#openid-connect) for authentication directly with Okta. The sample application shows the types of changes you would make in your application to authenticate directly with Okta.

To migrate user profiles from Active Directory to Okta, you'll first delegate authentication to Active Directory by configuring it as an IdP in Okta. This process involves creating the Okta enterprise application in Active Directory, and adding it as an Identity Provider (IdP) in Okta. [Make Azure Active Directory an identity provider](https://help.okta.com/en-us/Content/Topics/Provisioning/azure/azure-identify-identity-provider.htm#Update) provides further information.

As part of setting up Active Directory as an IdP in Okta, you should configure the Just-In-Time (JIT) provisioning settings. JIT provisioning automatically creates new user profiles in Okta when a user first authenticates with Active Directory delegated authentication. A new user account is only created if the user does not have an existing user profile in Universal Directory. This allows Active Directory and Universal Directory profiles co-existing. It also provides a seamless experience for users because they do not have to create a new username or password in Universal Directory.

Once users are in Okta, you can provide them with [access to applications](https://help.okta.com/oie/en-us/Content/Topics/Apps/Apps_Apps.htm) you have registered with Okta. You can also set [policies](https://developer.okta.com/docs/concepts/policies/#what-are-policies) for the users in Okta, such as requiring a user to sign in again after a certain period of time. You can also implement [Multi-Factor Authentication](https://help.okta.com/oie/en-us/Content/Topics/identity-engine/authenticators/about-authenticators.htm) for your Okta users.

## Required variables

The application in the Docker container is configured to use Okta as the identity provider by setting the following variables used for authentication.

* The application (client) ID that Okta assigns when it registers the application.
* A client secret that is generated when the application is registered with Okta. This secret is used by the OAuth 2.0 client to authenticate with the authorization server.
* An issuer URI, which is the authentication endpoint for a cloud environment.
* A redirect URI, which is the endpoint to which the authorization server will send the response after the user has been successfully authorized and granted an authorization code or token. In this example, the redirect URI is `http://localhost:8080/login/oauth2/code/okta`.

The client ID, client secret, and issuer URI are set in the web application by the Okta CLI command `okta start`, as described in Step 4 below.

The web application has the following scopes set for the OpenID Connect login:

```java
spring.security.oauth2.client.registration.okta.scope=email,profile,openid
spring.security.oauth2.client.provider.okta.user-name-attribute=email
```

These values are set in the `okta-server-side-example/src/main/resources/application.properties` file.

## Tutorial

To run the example, and connect directly to the Okta sign-in dialog:

1. Change to your project directory and clone the `okta-server-side-example` repository:

   ```bash
   cd ${your project directory}
   git clone https://github.com/oktadev/okta-server-side-example
   ```

2. Change to the `okta-server-side-example` directory:

   ```bash
   cd okta-server-side-example
   ```

3. Sign in into your Okta account:

   ```bash
   okta login
   ```

   > **Note**:  If you are already logged into Okta, a prompt similar to the following is returned. The current sign in configuration is based on the Okta Org URL and API token you provided at your previous `okta login` command.  If you want to use the existing configuration, answer N and skip steps a and b. Otherwise, answer Y and continue to steps a and b.

   ```
   An existing Okta Organization (https://dev-133337.okta.com)
   was found in C:\mydirectory\.okta\okta.yaml
   Overwrite configuration file? [Y/n]
   ```

   1. Enter your Okta Org URL. If you do not know your Okta Org URL, refer to [Find your Okta domain](https://developer.okta.com/docs/guides/find-your-domain/main/).

   2. Follow the instructions in [Create an API token](https://developer.okta.com/docs/guides/create-an-api-token/main/) to create a token. Once you have the token, enter it at the Okta API token prompt.

4. Register the sample application with Okta:

   ```bash
   okta start
   ```

   The CLI will show the following message:

   ```
   Configuring a new OIDC Application, almost done:
   Created OIDC application, client-id: 0oa1jnble6
   Okta configuration written to .env
   ```

   > **Note**: If you are asked to select the authorization server to use, select the default server.

   The `okta start` CLI command creates and registers an OAuth/OpenID Connect client with Okta. Okta considers this client an OpenID Connect (OIDC) application. When you register the OIDC application, the `okta-server-side-example/.env` file is updated with the issuer URI, client ID, and client secret used for authentication with Okta. The sample web application in this example uses the client ID and client secret to communicate with the Okta OIDC application.

   The `okta-server-side-example/.env` file tells Docker which environment variables to set when `docker compose` is run.

   The `okta-server-side-example/.env` file before running `okta start` is as follows:

   ```
   ISSUER=${CLI_OKTA_ISSUER}
   CLIENT_ID=${CLI_OKTA_CLIENT_ID}
   CLIENT_SECRET=${CLI_OKTA_CLIENT_SECRET}
   ```

   After running the `okta start` command, the `okta-server-side-example/.env` file is similar to the following where the `ISSUER` references your Okta domain, and the `CLIENT_ID` and `CLIENT_SECRET` are set to authenticate with your Okta domain.

   ```
   ISSUER=https://${yourOktaDomain}/oauth2/default
   CLIENT_ID=0oa1jnble6BnOyerj697
   CLIENT_SECRET=vShMAaUlsOvX8WwuouZfHjOBE3FmM4UOVISz5w4K
   ```

5. Start the application:

   ```bash
   docker compose up
   ```

   When you run `docker compose up`, Docker looks at the `okta-server-side-example/docker-compose.yml` configuration file. This file defines the services in the containers. In the below example a web service is defined using port 8080, and the issuer, client ID, and client secret environment variables set in the `okta-server-side-example/.env` file. (These variables are set by the `okta start` command you ran in the step above.)

   ```
   version: "3.7"
   services:
     webapp:
       build: .
       ports:
         - 8080:8080
       environment:
         SPRING_SECURITY_OAUTH2_CLIENT_PROVIDER_OKTA_ISSUER_URI: ${ISSUER}
         SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_OKTA_CLIENT_ID: ${CLIENT_ID}
         SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_OKTA_CLIENT_SECRET: ${CLIENT_SECRET}
   ```

   Once the application has started, you will see something similar to the following in your terminal:

   ```
   okta-server-side-example-webapp-1  | 2022-07-19 02:44:41.909  INFO 1 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8080 (http) with context path ''
   okta-server-side-example-webapp-1  | 2022-07-19 02:44:41.926  INFO 1 --- [           main] com.okta.example.ra.Application          : Started Application in 3.807 seconds (JVM running for 4.674)
   ```

6. Open a private/incognito browser window and navigate to `http://localhost:8080`. You will be redirected to Okta to sign-in to your application.

   > **Note**: The username of your Okta account is the email address you provided when you created the account.

   <div class="half border">

   ![Okta sign-in window with username text field](/img/ra/directory-coexistence/ad-to-okta-sign-in.png)

   </div>

7. Sign in with your Okta Org account credentials. You should see the following displayed in the browser:

   <div class="full border">

   ![Sign-in response with welcome home successful authentication response](/img/ra/directory-coexistence/ad-to-okta-signin-response.jpg)

   </div>

## Tear down the example

Once you have completed the example, you can stop the application and remove the running Docker containers.

1. In the `okta-server-side-example` directory, stop the current running containers with <kbd>Ctrl</kbd> + <kbd>C</kbd>.

2. Remove the containers:

   ```bash
   docker compose down
   ```