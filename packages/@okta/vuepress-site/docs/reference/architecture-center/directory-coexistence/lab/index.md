---
title: Lab overview and prerequisites
---

# Lab overview and prerequisites

Learn how to migrate users from three different types of user directories into Universal Directory using a directory coexistence strategy. Then, reconfigure a sample application to authenticate a user with Universal Directory rather than the original user directory.

* [Migrate users from Azure Active Directory](/docs/reference/architecture-center/directory-coexistence/lab-azure-ad)
* [Migrate users from an on-premises LDAP directory server](/docs/reference/architecture-center/directory-coexistence/lab-ldap-server)
* [Migrate users from an on-premises generic database](/docs/reference/architecture-center/directory-coexistence/lab-generic-database)

> **Note:** These tutorials are independent of each other. They can be completed in any order.

## Prerequisites

Set up the following to complete the tutorials in this lab.

### Applications

This lab uses Docker containers to provide a starting point for each tutorial. To use these containers, install the following:

* [Docker](https://docs.docker.com/get-docker/)
* [Okta CLI](https://cli.okta.com/)
* [Git](https://git-scm.com/downloads)
* [ngrok](https://ngrok.com/download)

> **Tip:** Before running `git`, `okta`, `docker`, and `ngrok` commands, add the directory path to each executable to your `PATH` environment variable.

### Okta developer account

An Okta developer account is required to act as the target of your user migration. Okta CLI is the quickest way to work with your Okta org, so we recommend using it for the first few steps. Alternatively, you can manually sign up for an org instead.

1. Open your terminal.
2. Run `okta register`, and enter your first name, family name, email address, and country.
3. Click or tap **Activate** in the account activation email that is sent to the email address that you gave.

   > **Tip:** If you don't receive a confirmation email sent as part of the creation process, check your spam filters for an email from `noreply@okta.com`.

4. After your domain is registered, look for output similar to this:

   ```txt
   Your Okta Domain: https://dev-xxxxxxx.okta.com
   To set your password open this link:
   https://dev-xxxxxxx.okta.com/welcome/xrqyNKPCZcvxL1ouKUoh
   ```

5. Set the password for your Okta developer org by opening the link and following the instructions.
6. After you enter your password, your Okta domain is returned, similar to the following.

   ```txt
   New Okta Account created!
   Your Okta Domain: https://dev-xxxxxxx.okta.com
   ```

Make note of your Okta domain. Use it wherever you see `${OKTA_DOMAIN}` in the lab.

> **Note:** If you're using an existing org and want to use Okta CLI in this lab, check API Access Management is enabled: Open your Admin Console, go to **Security** > **API**, and verify you have an **Authorization Servers** tab. If not, you can:
>
> * Create a developer account and org with Okta CLI.
> * Contact your support team to enable the feature in your org.
> * Use the Admin Console to create your app integrations manually instead of the CLI.
>
> All accounts created with Okta CLI are developer accounts.

### Azure Active Directory

For [Migrate users from Azure Active Directory](/docs/reference/architecture-center/directory-coexistence/lab-azure-ad), you need an instance of [Azure Active Directory](https://azure.microsoft.com/en-ca/products/active-directory/) to follow along.

### GitHub repository

You can find the source code and docker files for all the tutorials on GitHub:

* <https://github.com/oktadev/okta-reference-coexistence-oidc-example>
* <https://github.com/oktadev/okta-reference-coexistence-ldap-example>
* <https://github.com/oktadev/okta-reference-coexistence-db-example>

The tutorials in this lab use Java 11 and [Spring Boot](https://spring.io/projects/spring-boot) MVC.

### Values and variables

Configure the application that you create in each tutorial to use Okta as its Identity Provider using the following values:

* `${OKTA_DOMAIN}`: The full URL of your Okta developer org
   For example, `https://dev-133337.okta.com`
* `${OKTA_DOMAIN_NAME}`: The subdomain of your Okta developer org
   For example, `dev-133337`
* `${CLIENT_ID}`: The unique ID that Okta assigns your application when registered in the Okta CLI or the Admin Console
* `${CLIENT_SECRET}`: The secret the application uses to authenticate with the authorization server
* `${ISSUER}`: The URL of your authorization server
   For example, the default custom authorization server is `https://${OKTA_DOMAIN}/oauth2/default`.
* `${SIGN_IN_REDIRECT_URI}`: The URL where a user is redirected after completing the authentication process successfully and receiving an authorization code or token.
   For example, `http://localhost:8080/login/oauth2/code/okta`

Okta CLI reports the `${CLIENT_ID}`, `${CLIENT_SECRET}`, and `${ISSUER}` when you register an application with the `okta start` command.

To find these settings in the Admin Console, see [Configuration settings](/docs/guides/oie-embedded-common-download-setup-app/java/main/#configuration-settings).
