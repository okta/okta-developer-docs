---
title: Migrate users from Azure Active Directory
---

# Migrate users from Azure Active Directory

Suppose you already handle authentication through cloud-based Identity Provider (IdP) such as Azure Active Directory (AD) but want to replace it with Okta. You can install an on-premises Okta AD Agent to mirror those users to Universal Directory and then redirect your applications to Okta for authentication. In this scenario, Universal Directory serves as a single source of truth for user data and lets administrators centrally manage policies and profiles. You can assign them to any application registered with your Okta org.

However, the user passwords are still managed in your original IdP. This directory coexistence can stay in place until you migrate all your user information to Universal Directory and no longer require the other IdP.

> **Note:** You need an instance of [Azure Active Directory](https://azure.microsoft.com/en-ca/products/active-directory/) to follow this tutorial.

In this tutorial, you migrate all the users in a simple Azure Active Directory instance to Universal Directory with the Okta AD Agent, and then create an application to authenticate its users with Universal Directory. Specifically:

* [Configure Okta to mirror an Azure AD instance and enable JIT provisioning](#configure-azure-ad-as-an-idp-in-okta).
* [Create an OIDC-based application that redirects to Okta for authentication](#create-an-oidc-based-application-that-redirects-to-okta-for-authentication).

At the end of the tutorial, when a user attempts to sign in to the application, their authorization request is redirected to Okta and then delegated to Azure AD to match the user and authenticate them.

<div class="full">

  ![An architecture diagram showing the authorization flow from user to Okta to Azure Active Directory and back again.](/img/architecture/directory-coexistence/ad-to-okta-flow-diagram.png)

  <!--
    Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?type=design&node-id=3658%3A38395&t=U52HeyImgt4pt3M2-1 ad-to-okta-flow-diagram
  -->
</div>

## Configure Azure AD as an IdP in Okta

To migrate user profiles from Active Directory to Okta, first delegate authentication to Active Directory by configuring it as an IdP in Okta. This process involves creating the Okta enterprise application in Active Directory and adding it as an Identity Provider in Okta. For full instructions, [Make Azure Active Directory an Identity Provider](https://help.okta.com/okta_help.htm?type=oie&id=ext-azure-idp-setup).

> **Note:** Set up Just-In-Time (JIT) provisioning at this point if you want to use a [JIT migration strategy](/docs/reference/architecture-center/directory-coexistence/#just-in-time-migration). Remember that this allows Active Directory and Universal Directory profiles to co-exist. It also provides a seamless experience because users don't have to create a new username or password in Universal Directory.

After users are in Okta, you can provide access to applications that you've registered with Okta. You can also set [policies](https://developer.okta.com/docs/concepts/policies/#what-are-policies) for the users in Okta, such as requiring a user to sign in again after a given time. Also, you can implement [multifactor authentication](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-authenticators) for your Okta users.

## Create an OIDC-based application that redirects to Okta for authentication

This tutorial uses a [Docker](https://www.docker.com) container that you can run on any platform. It contains a [Spring Boot](https://spring.io/projects/spring-boot) web application that uses [OpenID Connect (OIDC)](/docs/concepts/oauth-openid/#openid-connect) for authentication directly with Okta. The sample application shows the types of changes that you can make in your application to authenticate directly with Okta.

To run the sample application and connect directly to the Okta sign-in dialog:

1. Change to your project directory and clone the `okta-reference-coexistence-oidc-example` repository:

   ```bash
   cd ${your project directory}
   git clone https://github.com/oktadev/okta-reference-coexistence-oidc-example.git
   ```

1. Change to the `okta-reference-coexistence-oidc-example` directory:

   ```bash
   cd okta-reference-coexistence-oidc-example
   ```

1. Sign in to your Okta account:

   ```bash
   okta login
   ```

   If you're already signed in to Okta, a prompt similar to the following is returned. The current sign-in configuration is based on the Okta org URL and API token that you provided at the previous `okta login` command. If you want to use the existing configuration, answer **N** and skip steps a and b. Otherwise, answer **Y** and continue to steps a and b.

   ```txt
   An existing Okta Organization (https://dev-133337.okta.com)
   was found in C:\mydirectory\.okta\okta.yaml
   Overwrite configuration file? [Y/n]
   ```

   If Okta CLI returns an error "Your Okta Org is missing a feature required to use the Okta CLI: API Access Management," you aren't using an Okta developer account. To resolve this error, see [Okta developer account](/docs/reference/architecture-center/directory-coexistence/lab/#okta-developer-account).

   {style="list-style-type:lower-alpha"}
   1. Enter your `${OKTA_DOMAIN}`. If you don't know your `${OKTA_DOMAIN}`, see [Values and variables](/docs/reference/architecture-center/directory-coexistence/lab/#values-and-variables).
   1. Follow the instructions in [Create an API token](/docs/guides/create-an-api-token) to create a token. After you have the token, enter it at the Okta API token prompt.

1. Register the sample application with Okta:

   ```bash
   okta start
   ```

   Okta CLI shows the following message:

   ```txt
   Configuring a new OIDC application, almost done:
   Created OIDC application, client-id: 0oa1jnble6
   Okta configuration written to .env
   ```

   If Okta CLI returns an error "Your Okta Org is missing a feature required to use the Okta CLI: API Access Management," you aren't using an Okta developer account. To resolve this error, see [Okta developer account](/docs/reference/architecture-center/directory-coexistence/lab/#okta-developer-account).

   > **Note:** If you're asked to select the authorization server to use, select the default server.

   The `okta start` CLI command creates and registers an OIDC client with Okta. Okta considers this client an OIDC application. When you register the OIDC application, the `okta-reference-coexistence-oidc-example/.env` file is updated with the issuer URI, client ID, and client secret used for authentication with Okta. The sample web application in this example uses the client ID and client secret to communicate with the Okta OIDC application.

   The `okta-reference-coexistence-oidc-example/.env` file tells Docker which environment variables to set when `docker compose` is run.

   The `okta-reference-coexistence-oidc-example/.env` file before running `okta start` is as follows:

   ```txt
   ISSUER=${CLI_OKTA_ISSUER}
   CLIENT_ID=${CLI_OKTA_CLIENT_ID}
   CLIENT_SECRET=${CLI_OKTA_CLIENT_SECRET}
   ```

   After you run the `okta start` command, the `okta-reference-coexistence-oidc-example/.env` file is similar to the following where the `ISSUER` references your Okta domain, and the `CLIENT_ID` and `CLIENT_SECRET` are set to authenticate with your Okta domain.

   ```txt
   ISSUER=https://${OKTA_DOMAIN}/oauth2/default
   CLIENT_ID=0oa1jnble6BnOyerj697
   CLIENT_SECRET=vShMAaUlsOvX8WwuouZfHjOBE3FmM4UOVISz5w4K
   ```

1. Start the application:

   ```bash
   docker compose up
   ```

   When you run `docker compose up`, Docker looks at the `okta-reference-coexistence-oidc-example/docker-compose.yml` configuration file. This file defines the services in the containers. In the example below, a web service is defined using port 8080, and the `${ISSUER}`, `${CLIENT_ID}`, and `${CLIENT_SECRET}` variables set in the previous step.

   ```yaml
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

   After the application starts, something similar to the following appears in your terminal:

   ```txt
   okta-server-side-example-webapp-1  | 2022-07-19 02:44:41.909  INFO 1 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8080 (http) with context path ''
   okta-server-side-example-webapp-1  | 2022-07-19 02:44:41.926  INFO 1 --- [           main] com.okta.example.ra.Application          : Started Application in 3.807 seconds (JVM running for 4.674)
   ```

1. Open a private/incognito browser window and navigate to `http://localhost:8080`. You're redirected to Okta to sign in to your application.

   > **Note**: The username of your Okta account is the email address that you provided when you created the account.

   <div class="half border">

   ![Okta sign-in window with username text field](/img/architecture/directory-coexistence/ad-to-okta-sign-in.png)

   </div>

1. Sign in with your Okta org account credentials. You should see the following:

   <div class="three-quarters border">

   ![Sign-in response with welcome home successful authentication response](/img/architecture/directory-coexistence/ad-to-okta-signin-response.png)

   </div>

## Stop the application

After you complete this tutorial, stop the application and remove the Docker containers.

1. In the `okta-server-side-example` directory, stop the current running containers with <kbd>Ctrl</kbd> + <kbd>C</kbd>.

1. Remove the containers:

   ```bash
   docker compose down
   ```
