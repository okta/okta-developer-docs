---
title: Guides overview
guides:
 - add-an-external-idp
 - archive-auth-js
 - archive-embedded-siw
 - archive-registration-inline-hook
 - archive-sign-in-to-spa-authjs
 - archive-sign-in-to-spa-embedded-widget
 - archive-configure-signon-policy
 - auth-js
 - archive-overview
 - build-custom-ui-mobile
 - build-self-signed-jwt
 - client-secret-rotation-key
 - common-hook-set-up-steps
 - configure-access-policy
 - configure-ciba
 - configure-native-sso
 - configure-signon-policy
 - configure-user-scoped-account-management
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
 - embedded-siw
 - enable-cors
 - event-hook-hookdeck
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
 - mobile-idx-sdk-overview
 - oin-oidc-overview
 - oin-oidc-best-practices
 - oin-oidc-multi-tenancy
 - oin-oidc-protocols
 - scim-provisioning-integration-overview
 - scim-provisioning-integration-prepare
 - scim-provisioning-integration-connect
 - scim-provisioning-integration-test
 - sign-in-overview
 - secure-oauth-between-orgs
 - build-sso-integration
 - custom-sms-messaging
 - submit-app
 - submit-app-prereq
 - deployment-checklist
 - deploy-your-app
 - dpop
 - protect-your-api
 - quickstart
 - sampleapp-oie-redirectauth
 - refresh-tokens
 - registration-inline-hook
 - request-user-consent
 - revoke-tokens
 - saml-inline-hook
 - saml-tracer
 - session-cookie
 - set-up-self-service-registration
 - set-up-token-exchange
 - shared-sso-android-ios
 - sharing-cert
 - sign-in-to-spa-authjs
 - sign-in-to-spa-embedded-widget
 - sign-into-mobile-app-redirect
 - sign-into-spa-redirect
 - sign-into-web-app-redirect
 - sign-users-out
 - sign-your-own-saml-csr
 - social-login
 - telephony-inline-hook
 - token-inline-hook
 - third-party-risk-integration
 - unlock-mobile-app-with-biometrics
 - updating-saml-cert
 - validate-access-tokens
 - validate-id-tokens
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
 - oie-upgrade-overview
 - oie-upgrade-plan-embedded-upgrades
 - oie-upgrade-add-sdk-to-your-app
 - oie-upgrade-api-sdk-to-oie-sdk
 - oie-upgrade-sessions-api
 - oie-upgrade-sign-in-widget-deprecated-methods
 - oie-upgrade-sign-in-widget-i18n
 - oie-upgrade-sign-in-widget
 - oie-upgrade-sign-in-widget-styling
 - oie-upgrade-mfa-enroll-policy
 - ie-limitations
 - authenticators-overview
 - authenticators-google-authenticator
 - authenticators-web-authn
 - oie-embedded-sdk-use-case-custom-pwd-recovery-mfa
 - authenticators-okta-verify
 - authenticators-custom-authenticator
 - authenticators-okta-email
 - oie-embedded-sdk-use-case-new-user-activation
 - advanced-use-case-overview
 - pwd-optional-new-sign-up-email
 - pwd-optional-sign-in-email
 - pwd-optional-widget-sign-in-email
 - pwd-optional-change-email
 - email-magic-links-overview
 - step-up-authentication
 - device-context
 - pwd-optional-best-practices
 - pwd-optional-overview
 - build-api-integration
 - add-logingov-idp
---

Learn how to accomplish a task with step-by-step instructions.

## Integrate authentication into your app

The following links outline what developers need to know step-by-step to successfully deploy a single app. For custom app developers, it covers planning, designing, building, deploying, and troubleshooting apps that require user management, authentication, and API authorization.

If you're using Okta as an identity layer in your app for the first time, we recommend that you start with [How Okta Works](/docs/concepts/how-okta-works/) and the [Okta Data Model](/docs/concepts/okta-data-model/). Then, you can follow the sequence of guides below or jump directly to the content that you need.

1. Get the basics

    * [OAuth 2.0 and OpenID Connect overview](/docs/concepts/oauth-openid/)
    * [Authorization servers](/docs/concepts/auth-servers/)
    * [Policies](/docs/concepts/policies/)
    * [Set up self-service registration](/docs/guides/set-up-self-service-registration/)

2. Sign users in

    * [Sign users in to your SPA using the redirect model](/docs/guides/sign-into-spa-redirect/)
    * [Sign users in to your web app using the redirect model](/docs/guides/sign-into-web-app-redirect/)
    * [Auth JS fundamentals](/docs/guides/auth-js)
    * [Embedded Okta Sign-In Widget fundamentals](/docs/guides/embedded-siw)
    * [Configure a global session policy and authentication policies](/docs/guides/configure-signon-policy/)
    * [Single Sign-On with external Identity Providers](/docs/guides/identity-providers)

3. Authorize

    * [Implement authorization by grant type](/docs/guides/implement-grant-type/)
    * [Configure SSO for native apps](/docs/guides/configure-native-sso/)
    * [Refresh access tokens](/docs/guides/refresh-tokens/)
    * [Validate access tokens](/docs/guides/validate-access-tokens/)
    * [Validate ID tokens](/docs/guides/validate-id-tokens/)
    * [Configure an access policy](/docs/guides/configure-access-policy/)
    * [Customize tokens returned from Okta with custom claims](/docs/guides/customize-tokens-returned-from-okta/)
    * [Customize tokens returned from Okta with a Groups claim](/docs/guides/customize-tokens-groups-claim/)
    * [Customize tokens returned from Okta with a dynamic allowlist](/docs/guides/customize-tokens-dynamic/)
    * [Customize tokens returned from Okta with a static allowlist](/docs/guides/customize-tokens-static/)

4. Brand and customize

    * [Style the Sign-In Widget](/docs/guides/custom-widget/)
    * [Customize SMS messages](/docs/guides/custom-sms-messaging/)
    * [Customize domain and email address](/docs/guides/custom-url-domain/)
    * [Customize email notifications and email domains](/docs/guides/custom-email/)

5. Deploy to production

    * [Pre-launch checklist](/docs/guides/deployment-checklist/)
    * [Deploy your app](/docs/guides/deploy-your-app/)
    * [Migrate to Okta](/docs/guides/migrate-to-okta-prerequisites/)

6. Customize Okta process flows with event or inline hooks

    * [Event hook example](/docs/guides/event-hook-implementation/)
    * [Token inline hook example](/docs/guides/token-inline-hook/)
    * [Password import inline hook example](/docs/guides/password-import-inline-hook/)
    * [Registration inline hook example](/docs/guides/registration-inline-hook/)

## Publish an integration in the OIN

Partner integrations connect your app or service to our mutual customers. One of the most common integrations is Single Sign-On (SSO), which gives Okta users the ability to sign in directly to your application through Okta. Many partners also build provisioning integrations (using the SCIM protocol) to automate lifecycle management use cases for their customers. Integrations can also extend Okta's functionality or integrate with your service in more complex ways.

You can publish your integration in the Okta Integration Network (OIN) catalog to expose your app to thousands of Okta workforce customers.

If you're creating an Okta integration for the first time, we recommend the following sequence of guides:

1. [OIDC and the OIN: A Developer Primer](/docs/guides/oin-oidc-overview/)
1. [Overview of Single Sign-On in the OIN](/docs/guides/oin-sso-overview/)
1. [Overview of lifecycle management in the OIN](/docs/guides/oin-lifecycle-mgmt-overview/)
1. [Submit an app integration](/docs/guides/submit-app/)
