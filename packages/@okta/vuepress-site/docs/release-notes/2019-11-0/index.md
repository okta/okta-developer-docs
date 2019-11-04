---
title: Okta API Products Release Notes
---

## 2019.11.0

| Change                                                                                                                | Expected in Preview Orgs |
|-----------------------------------------------------------------------------------------------------------------------|--------------------------|
| [WebAuthn is now Generally Available (GA) in Production](#webauthn-is-now-generally-available-ga-in-production)       | November 6, 2019         |
| [Features API is now Generally Available (GA) in Preview](#features-api-is-now-generally-available-ga-in-preview)            | November 6, 2019         |
| [Token Inline Hook is now Generally Available (GA) in Preview](#token-inline-hook-is-now-generally-available-ga-in-preview) | November 6, 2019         |
| [SAML Inline Hooks is now Generally Available (GA) in Preview](#saml-inline-hooks-is-now-generally-available-ga-in-preview)  | November 6, 2019         |
| [Rate Limits for /oauth2 endpoints](#rate-limits-for-oauth2-endpoints)                                               | November 6, 2019         |
| [OAuth for Okta is Early Access (EA) in Preview](#oauth-for-okta-is-early-access-ea-in-preview)                       | November 6, 2019         |
| [API Exception now returned for concurrent requests sent to the same app](#api-exception-now-returned-for-concurrent-requests-sent-to-the-same-app)| November 6, 2019|
| [Bugs Fixed in 2019.11.0](#bugs-fixed-in-2019-11-0)                                                                   | November 6, 2019         |

### WebAuthn is now Generally Available (GA) in Production

[Web Authentication as a factor](/docs/reference/api/authn/#enroll-webauthn-factor) is now GA in Production. Admins can enable Web Authentication as a factor as defined by WebAuthn standards. Web Authentication supports both security key authentication such as YubiKey devices and platform authenticators such as Windows Hello. <!-- OKTA-254507 -->

### Features API is now Generally Available (GA) in Preview

The [Features API](docs/reference/api/features/) is now GA in Preview. The Features API provides operations to manage self-service features in your Production and Preview orgs and Beta features in your Preview org. <!-- OKTA-258109 -->

### Token Inline Hook is now Generally Available (GA) in Preview

[Token Inline Hook](/docs/reference/token-hook/) is now GA in Preview. Token Inline Hook enables you to integrate your own custom functionality into the process of minting OAuth 2.0 and OpenID Connect tokens. <!-- OKTA-244855 -->

### SAML Inline Hooks is now Generally Available (GA) in Preview

SAML Inline Hooks is now GA in Preview. The SAML Inline Hook enables you to customize SAML assertions returned by Okta. You can add attributes or modify existing attributes in outbound SAML assertions. For details, see our [SAML Inline Hook](/docs/reference/saml-hook/) page. <!-- OKTA-244856 -->

### Rate Limits for /oauth2 endpoints

Rate limiting has been modified for `/oauth2` endpoints so that requests that use an invalid client ID don't consume rate limit. Additionally, a System Log warning has been introduced to provide notification of high rate limit consumption by requests that use a valid client ID. <!-- OKTA-241945 -->

### OAuth for Okta is Early Access (EA) in Preview

OAuth for Okta is EA in Preview. With OAuth for Okta, you are able to interact with Okta APIs using scoped OAuth 2.0 access tokens. Each access token enables the bearer to perform specific actions on specific Okta endpoints, with that ability controlled by which scopes the access token contains. For more details, see our [OAuth for Okta](/docs/guides/oauth-for-okta/) guide. <!-- OKTA-251943 -->

### API Exception now returned for concurrent requests sent to the same app

Concurrent PUT requests sent to the same app instance now return an `ApiException` rather than a 500 HTTP server error. <!-- OKTA-215949 -->

### Bugs Fixed in 2019.11.0

When the Token Inline Hook feature was enabled and the claim couldn't be evaluated, the OAuth 2.0 token endpoint returned a 403 HTTP status code rather than 400. (Okta-258981)
