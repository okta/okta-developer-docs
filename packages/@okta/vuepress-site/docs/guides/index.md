---
title: Guides overview
guides:
 - add-an-external-idp
 - build-custom-ui-mobile
 - build-self-signed-jwt
 - common-hook-set-up-steps
 - configure-access-policy
 - configure-signon-policy
 - create-an-api-token
 - custom-error-pages
 - custom-url-domain
 - customize-authz-server
 - customize-tokens-returned-from-okta
 - customize-tokens-dynamic
 - customize-tokens-static
 - customize-tokens-groups-claim
 - email-customization
 - enable-cors
 - event-hook-implementation
 - find-your-app-credentials
 - find-your-domain
 - password-import-inline-hook
 - implement-auth-code
 - implement-auth-code-pkce
 - implement-client-creds
 - implement-implicit
 - implement-oauth-for-okta
 - implement-oauth-for-okta-serviceapp
 - implement-password
 - mfa
 - migrate-to-okta
 - oin-oidc-guide
 - build-provisioning-integration
 - build-sso-integration
 - sms-customization
 - submit-app
 - production-deployment
 - deploy-your-app
 - protect-your-api
 - quickstart
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
 - sign-into-web-app-remediation
 - sign-users-out
 - sign-your-own-saml-csr
 - style-the-widget
<<<<<<< HEAD
 - token-inline-hook
=======
 - third-party-risk-integration
>>>>>>> master
 - unlock-mobile-app-with-biometrics
 - updating-saml-cert
 - validate-access-tokens
 - validate-id-tokens

---

Learn how to accomplish a task with step-by-step instructions.

## Embed authentication into your app

The following links outline what developers need to know step-by-step to successfully deploy a single app. For custom app developers, it covers planning, designing, building, deploying, and troubleshooting apps that require user management, authentication, and API authorization.

If you're using Okta as an identity layer in your app for the first time, we recommend that you start with [How Okta Works](/docs/concepts/how-okta-works/) and the [Okta Data Model](/docs/concepts/okta-data-model/). Then, you can follow the sequence of guides below or jump directly to the content that you need.

1. Get the basics

    * [OAuth 2.0 and OpenID Connect overview](/docs/concepts/oauth-openid/)
    * [Authorization servers](/docs/concepts/auth-servers/)
    * [Policies](/docs/concepts/policies/)
    * [Quickstart: Signing in your first user](/docs/guides/quickstart/cli/create-org/)
    * [Set up self-service registration](/docs/guides/set-up-self-service-registration/before-you-begin/)

2. Sign users in

    * [Sign users in to your single-page application](/docs/guides/sign-into-spa/angular/before-you-begin/)
    * [Sign users in to your web application](/docs/guides/sign-into-web-app/aspnet/before-you-begin/)
    * [Sign users in using the Okta Sign-In Widget](/code/javascript/okta_sign-in_widget/)
    * [Configure Okta sign-on and App sign-on policies](/docs/guides/configure-signon-policy/before-you-begin/)
    * [Sign users out](/docs/guides/sign-users-out/android/before-you-begin/)

3. Authorize

    * [Implement the Authorization Code Flow](/docs/guides/implement-auth-code/overview/)
    * [Implement the Authorization Code Flow with PKCE](/docs/guides/implement-auth-code-pkce/overview/)
    * [Implement the Client Credentials Flow](/docs/guides/implement-client-creds/overview/)
    * [Refresh access tokens](/docs/guides/refresh-tokens/overview/)
    * [Validate access tokens](/docs/guides/validate-access-tokens/go/overview/)
    * [Validate ID tokens](/docs/guides/validate-id-tokens/overview/)
    * [Configure an access policy](/docs/guides/configure-access-policy/overview/)
    * [Customize tokens returned from Okta with custom claims](/docs/guides/customize-tokens-returned-from-okta/overview/)
    * [Customize tokens returned from Okta with a Groups claim](/docs/guides/customize-tokens-groups-claim/overview/)
    * [Customize tokens returned from Okta with a dynamic allow list](/docs/guides/customize-tokens-dynamic/overview/)
    * [Customize tokens returned from Okta with a static allow list](/docs/guides/customize-tokens-static/overview/)

4. Brand and customize

    * [Style the Widget](/docs/guides/style-the-widget/before-you-begin/)
    * [Customize the Okta URL domain](/docs/guides/custom-url-domain/overview/)
    * [Customize SMS messages](/docs/guides/sms-customization/before-you-begin/)
    * [Customize email notifications and email domains](/docs/guides/email-customization/before-you-begin/)

5. Deploy to production

    * [Pre-launch checklist](/docs/guides/production-deployment/deployment-checklist/)
    * [Deploy your app](/docs/guides/deploy-your-app/overview/)
    * [Migrate to Okta](/docs/guides/migrate-to-okta/prerequisites/)

## Publish an integration

Partner integrations connect your app or service to our mutual customers. One of the most common integrations is Single Sign-On (SSO), which gives Okta users the ability to sign in directly to your application through Okta. Many partners also build provisioning integrations (using the SCIM protocol) to automate lifecycle management use cases for their customers. Integrations can also extend Okta's functionality or integrate with your service in more complex ways.

Integrations can be published publicly in the Okta Integration network catalog, but that's entirely optional.

If you're creating an Okta integration for the first time, we recommend the following sequence of guides:

1. [OIDC and the OIN: A Developer Primer](/docs/guides/oin-oidc-guide/overview/)
1. [Build a Single Sign-On (SSO) integration](/docs/guides/build-sso-integration/openidconnect/overview/)
1. [Build a SCIM provisioning integration](/docs/guides/build-provisioning-integration/overview/)
1. [Submit an app integration](/docs/guides/submit-app/openidconnect/overview/)
