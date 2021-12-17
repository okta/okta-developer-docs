---
title: Guides overview
guides:
 - add-an-external-idp
 - build-custom-ui-mobile
 - build-self-signed-jwt
 - common-hook-set-up-steps
 - configure-access-policy
 - configure-native-sso
 - configure-signon-policy
 - create-an-api-token
 - custom-email
 - custom-error-pages
 - custom-url-domain
 - custom-widget
 - customize-authz-server
 - customize-tokens-returned-from-okta
 - customize-tokens-dynamic
 - customize-tokens-static
 - customize-tokens-groups-claim
 - device-authorization-grant
 - enable-cors
 - event-hook-implementation
 - event-hook-ngrok
 - find-your-app-credentials
 - find-your-domain
 - password-import-inline-hook
 - implement-oauth-for-okta
 - implement-oauth-for-okta-serviceapp
 - implement-grant-type
 - mfa
 - migrate-to-okta-prerequisites
 - migrate-to-okta-bulk
 - migrate-to-okta-password-hooks
 - oin-oidc-overview
 - oin-oidc-best-practices
 - oin-oidc-multi-tenancy
 - oin-oidc-protocols
 - scim-provisioning-integration-overview
 - scim-provisioning-integration-prepare
 - scim-provisioning-integration-connect
 - scim-provisioning-integration-test
 - build-sso-integration
 - custom-sms-messaging
 - submit-app
 - deployment-checklist
 - deploy-your-app
 - protect-your-api
 - quickstart
 - sampleapp-oie-redirectauth
 - refresh-tokens
 - registration-inline-hook
 - request-user-consent
 - revoke-tokens
 - saml-tracer
 - session-cookie
 - set-up-self-service-registration
 - shared-sso-android-ios
 - sharing-cert
 - sign-into-mobile-app
 - sign-into-spa
 - sign-into-web-app
 - sign-users-out
 - sign-your-own-saml-csr
 - social-login
 - token-inline-hook
 - third-party-risk-integration
 - unlock-mobile-app-with-biometrics
 - updating-saml-cert
 - validate-access-tokens
 - validate-id-tokens
 - oie-embedded-sdk-limitations
 - oie-embedded-common-org-setup
 - oie-embedded-common-download-setup-app
 - oie-embedded-common-run-samples
 - oie-embedded-common-refresh-tokens
 - oie-embedded-sdk-use-case-basic-sign-in
 - oie-embedded-sdk-use-case-basic-sign-out
 - oie-embedded-sdk-use-case-pwd-recovery-mfa
 - oie-embedded-sdk-use-case-self-reg
 - oie-embedded-sdk-use-case-sign-in-pwd-email
 - oie-embedded-sdk-use-case-sign-in-pwd-phone
 - oie-embedded-sdk-use-case-sign-in-soc-idp
 - oie-embedded-widget-use-case-load
 - oie-embedded-widget-use-case-basic-sign-in
 - oie-embedded-widget-use-case-sign-in-soc-idp
 - oie-upgrade-add-sdk-to-your-app
 - oie-upgrade-api-sdk-to-oie-sdk
 - oie-upgrade-sign-in-widget-deprecated-methods
 - oie-upgrade-sign-in-widget-i18n
 - oie-upgrade-sign-in-widget
 - oie-upgrade-sign-in-widget-styling

---

Learn how to accomplish a task with step-by-step instructions.

## Embed authentication into your app

The following links outline what developers need to know step-by-step to successfully deploy a single app. For custom app developers, it covers planning, designing, building, deploying, and troubleshooting apps that require user management, authentication, and API authorization.

If you're using Okta as an identity layer in your app for the first time, we recommend that you start with [How Okta Works](/docs/concepts/how-okta-works/) and the [Okta Data Model](/docs/concepts/okta-data-model/). Then, you can follow the sequence of guides below or jump directly to the content that you need.

1. Get the basics

    * [OAuth 2.0 and OpenID Connect overview](/docs/guides/custom-widget/)
    * [Authorization servers](//docs/guides/custom-widget/)
    * [Policies](/docs/concepts/policies/)
    * [Quickstart: Signing in your first user](/docs/guides/quickstart/cli/main/)
    * [Set up self-service registration](/docs/guides/set-up-self-service-registration/)

2. Sign users in

    * [Sign users in to your single-page application](/docs/guides/sign-into-spa/angular/before-you-begin/)
    * [Sign users in to your web application](/docs/guides/sign-into-web-app/aspnet/main/)
    * [Sign users in using the Okta Sign-In Widget](/code/javascript/okta_sign-in_widget/)
    * [Configure Okta sign-on and App sign-on policies](/docs/guides/configure-signon-policy/)
    * [Sign users out](/docs/guides/sign-users-out/android/before-you-begin/)

3. Authorize

    * [Implement authorization by grant type](/docs/guides/implement-grant-type/-/main/)
    * [Configure SSO for native apps](/docs/guides/configure-native-sso/main/)
    * [Refresh access tokens](/docs/guides/refresh-tokens/)
    * [Validate access tokens](/docs/guides/validate-access-tokens/)
    * [Validate ID tokens](/docs/guides/validate-id-tokens/)
    * [Configure an access policy](/docs/guides/configure-access-policy/)
    * [Customize tokens returned from Okta with custom claims](/docs/guides/customize-tokens-returned-from-okta/main/)
    * [Customize tokens returned from Okta with a Groups claim](/docs/guides/customize-tokens-groups-claim/overview/)
    * [Customize tokens returned from Okta with a dynamic allow list](/docs/guides/customize-tokens-dynamic/)
    * [Customize tokens returned from Okta with a static allow list](/docs/guides/customize-tokens-static/)

4. Brand and customize

    * [Style the Sign-In Widget](/docs/guides/custom-widget/)
    * [Customize SMS messages](/docs/guides/custom-sms-messaging/)
    * [Customize the Okta URL domain](/docs/guides/custom-url-domain/)
    * [Customize email notifications and email domains](/docs/guides/custom-email/)

5. Deploy to production

    * [Pre-launch checklist](/docs/guides/deployment-checklist/)
    * [Deploy your app](/docs/guides/deploy-your-app/)
    * [Migrate to Okta](/docs/guides/migrate-to-okta-prerequisites/)

6. Customize Okta process flows with Event or Inline Hooks

    * [Event Hook example](/docs/guides/event-hook-implementation/)
    * [Token Inline Hook example](/docs/guides/token-inline-hook/)
    * [Password Import Inline Hook example](/docs/guides/password-import-inline-hook/)
    * [Registration Inline Hook example](/docs/guides/registration-inline-hook/)

## Publish an integration

Partner integrations connect your app or service to our mutual customers. One of the most common integrations is Single Sign-On (SSO), which gives Okta users the ability to sign in directly to your application through Okta. Many partners also build provisioning integrations (using the SCIM protocol) to automate lifecycle management use cases for their customers. Integrations can also extend Okta's functionality or integrate with your service in more complex ways.

Integrations can be published publicly in the Okta Integration network catalog, but that's entirely optional.

If you're creating an Okta integration for the first time, we recommend the following sequence of guides:

1. [OIDC and the OIN: A Developer Primer](/docs/guides/oin-oidc-overview/)
1. [Build a Single Sign-On (SSO) integration](/docs/guides/build-sso-integration/openidconnect/main/)
<<<<<<< HEAD
1. [Build a SCIM provisioning integration](/docs/guides/custom-widget/)
1. [Submit an app integration](/docs/guides/custom-widget/)
=======
1. [Build a SCIM provisioning integration](/docs/guides/token-inline-hook/)
1. [Submit an app integration](/docs/guides/token-inline-hook/)

>>>>>>> staging
