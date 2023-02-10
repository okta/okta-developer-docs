---
title: Directory coexistence lab prerequisites
---

# Directory coexistence: Lab prerequisites

> **Note:** This area is a work in progress. Please leave feedback on the content and format of this new type of architecture article by posting comments in the [Architecture area of the developer forums](https://devforum.okta.com/c/questions/architecture/24).

## Applications

This lab uses Docker containers to provide a starting point for each tutorial. To use these containers, install the following:

* [Docker](https://docs.docker.com/get-docker/)
* [Okta CLI](https://cli.okta.com/)
* [Git](https://git-scm.com/downloads)
* [ngrok](https://ngrok.com/download)

> **Tip:** Before running `git`, `okta`, `docker`, and `ngrok` commands, consider adding the directory path to their executables to your `PATH` environment variable.

## Okta developer account

An Okta developer account is required to migrate your user accounts into. Okta CLI is the quickest way to work with your Okta org, so we recommend using it for the first few steps. Alternatively, you can manually sign up for an org instead.

1. Open your terminal.
2. Run `okta register`, and enter your first name, last name, email address, and country.
3. Click or tap **Activate** in the account activation email that is sent to the email address that you gave.
4. After your domain is registered, look for output similar to this:

   ```txt
   Your Okta Domain: https://dev-xxxxxxx.okta.com
   To set your password open this link:
   https://dev-xxxxxxx.okta.com/welcome/xrqyNKPCZcvxL1ouKUoh
   ```

5. Set the password for your Okta developer org by opening the link and following the instructions.
6. After you enter your password, your Okta domain is returned, similar to the following. Make note of it.

   ```txt
   New Okta Account created!
   Your Okta Domain: https://dev-xxxxxxx.okta.com
   ```

Make note of your Okta domain. Use it wherever you see `${OKTA_DOMAIN}` in the lab.

> **Tip:** If you don't receive the confirmation email sent as part of the creation process, check your spam filters for an email from `noreply@okta.com`.

## Azure Active Directory

For tutorial 1, you need an instance of [Azure Active Directory](https://azure.microsoft.com/en-ca/products/active-directory/) to follow along.

## GitHub repository

You can find the source code and docker files for all the tutorials on GitHub:

* <https://github.com/oktadev/okta-reference-coexistence-oidc-example>
* <https://github.com/oktadev/okta-reference-coexistence-ldap-example>
* <https://github.com/oktadev/okta-reference-coexistence-db-example>

The tutorials in this lab use Java 11 and [Spring Boot](https://spring.io/projects/spring-boot) MVC.

## Values and variables

Configure the application that you create in each tutorial to use Okta as its Identity Provider using the following values:

* `${OKTA_DOMAIN}`: the full URL of your Okta developer org
   For example, `https://dev-133337.okta.com`
* `${OKTA_DOMAIN_NAME}`: the subdomain of your Okta developer org
   For example, `dev-133337`
* `${CLIENT_ID}`: the unique ID that Okta assigns your application when registered in the Okta CLI or the Admin Console
* `${CLIENT_SECRET}`: the secret the application uses to authenticate with the authorization server
* `${ISSUER}`: the URL of your authorization server
   For example, the default custom authorization server is `https://${OKTA_DOMAIN}/oauth2/default`.
* `${SIGN_IN_REDIRECT_URI}`: the URL where a user is redirected after completing the authentication process successfully and receiving an authorization code or token.
   For example, `http://localhost:8080/login/oauth2/code/okta`

Okta CLI reports the `${CLIENT_ID}`, `${CLIENT_SECRET}`, and `${ISSUER}` when you register an application with the `okta start` command.

To find these settings in the Admin Console, see [Configuration settings](/docs/guides/oie-embedded-common-download-setup-app/java/main/#configuration-settings).
