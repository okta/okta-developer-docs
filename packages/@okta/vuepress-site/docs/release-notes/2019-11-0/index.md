---
title: Okta API Products Release Notes
---

## 2019.11.0

| Change                                                                                                                | Expected in Preview Orgs |
|-----------------------------------------------------------------------------------------------------------------------|--------------------------|
| [Web Authentication as a factor is Generally Available in Production](#web-authentication-as-a-factor-is-generally-available-in-production)       | November 6, 2019         |
| [Features API is Generally Available in Preview](#features-api-is-generally-available-in-preview)            | November 6, 2019         |
| [SAML Inline Hook is Generally Available in Preview](#saml-inline-hook-is-generally-available-in-preview)  | November 6, 2019         |
| [Token Inline Hook is Generally Available in Preview](#token-inline-hook-is-generally-available-in-preview) | November 6, 2019         |
| [OAuth for Okta is Early Access in Preview](#oauth-for-okta-is-early-access-in-preview)                       | November 6, 2019         |
| [Concurrent requests to the same app now return exception](#concurrent-requests-to-the-same-app-now-return-exception)| November 6, 2019|
| [Rate Limits for /oauth2 endpoints](#rate-limits-for-oauth2-endpoints)                                               | November 6, 2019         |
| [Bug Fixed in 2019.11.0](#bug-fixed-in-2019-11-0)                                                                   | November 6, 2019         |

### Web Authentication as a factor is Generally Available in Production

Admins can enable [Web Authentication as a factor](/docs/reference/api/authn/#enroll-webauthn-factor) (WebAuthn) as defined by WebAuthn standards. WebAuthn supports both security key authentication such as YubiKey devices and platform authenticators such as Windows Hello. <!-- OKTA-254507 -->

### Features API is Generally Available in Preview

The [Features API](/docs/reference/api/features/) provides operations to manage self-service Early Access features in your Production and Preview orgs and self-service Beta features in your Preview org. <!-- OKTA-258109 -->

### SAML Inline Hook is Generally Available in Preview

The [SAML Inline Hook](/docs/reference/saml-hook/) enables you to customize SAML assertions returned by Okta. You can add attributes or modify existing attributes in outbound SAML assertions. <!-- OKTA-244856 -->

### Token Inline Hook is Generally Available in Preview

The [Token Inline Hook](/docs/reference/token-hook/) enables you to integrate your own custom functionality into the process of minting OAuth 2.0 and OpenID Connect tokens. <!-- OKTA-244855 -->

### OAuth for Okta is Early Access in Preview

With OAuth for Okta, you are able to interact with Okta APIs using scoped OAuth 2.0 access tokens. Each access token enables the bearer to perform specific actions on specific Okta endpoints, with that ability controlled by which scopes the access token contains. For more details, see our [OAuth for Okta](/docs/guides/oauth-for-okta/) guide. <!-- OKTA-251943 -->

### Concurrent requests to the same app now return exception

Concurrent PUT requests sent to the same app instance now return an `ApiException` rather than a 500 HTTP server error. <!-- OKTA-215949 -->

### Rate Limits for /oauth2 endpoints

[Rate limiting](https://developer.okta.com/docs/reference/rate-limits/) has been modified for `/oauth2` endpoints so that requests that use an invalid client ID don't consume rate limit. Additionally, a System Log warning has been introduced to provide notification of high rate limit consumption by requests that use a valid client ID. <!-- OKTA-241945 -->

### Bug Fixed in 2019.11.0

When the Token Inline Hook feature was enabled and the claim couldn't be evaluated, the OAuth 2.0 token endpoint returned a 403 HTTP status code rather than 400. (OKTA-258981)
