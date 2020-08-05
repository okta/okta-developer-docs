---
title: Okta API Products Release Notes
---

## 2020.08.0

| Change                                                    | Expected in Preview Orgs |
| --------------------------------------------------------- | ------------------------ |
| [Apple as an Identity Provider is now GA in Production](#apple-as-an-identity-provider-is-now-ga-in-production) | August 5, 2020 |
| [OAuth 2.0 authorization code length has been increased](#oauth-2-0-authorization-code-length-has-been-increased)| August 5, 2020 |
| [Bugs fixed in 2020.08.0](#bugs-fixed-in-2020-08-0)       | August 5, 2020           |

### Apple as an Identity Provider is now GA in Production

Apple as an Identity Provider is now Generally Available in Production. Apple as an IdP allows users to sign in to your app using their Apple ID. See [Apple as an Identity Provider](/docs/guides/add-an-external-idp/apple/before-you-begin/). <!-- OKTA-302300 -->

### OAuth 2.0 authorization code length has been increased

To better align with [security best practices](https://tools.ietf.org/html/rfc6819#section-5.1.4.2.2), the length of OAuth 2.0 authorization codes is now 256 bits of entropy (43 characters). <!-- OKTA-310346 -->

### Bugs fixed in 2020.08.0

* The GET `/api/v1/users/{userid}/idps` and POST `/api/v1/idps/{idpId}/users/{userId}` endpoints weren't [OAuth](/docs/guides/implement-oauth-for-okta/scopes/) enabled. (OKTA-303902)

* Non-CORS requests to the OAuth 2.0 `/token` endpoint failed when the Okta session cookie was present. (OKTA-312816)
