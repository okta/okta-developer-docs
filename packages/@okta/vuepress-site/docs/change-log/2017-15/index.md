---
title: Okta API Products Change Log
excerpt: Summary of changes to the Okta Platform since Release 2017.12
---

## 2017.14

### Advance Notice: API Rate Limit Improvements

We are making org-wide rate limits more granular, and treating authenticated end-user interactions separately. More granular rate limits will further lessen the likelihood of calls to one URI impacting another. Treating authenticated end-user interactions separately will lessen the chances of one user's impacting another. We're also providing a transition period so you can see what these changes will look like in your Okta system log before enforcing them:

1. After Monday, 2017-04-17, you'll see system log alerts that let you know if you would have exceeded any of the new API rate limits. We're making this feature available to all preview orgs, and the feature will remain in preview for at least two weeks.

2. Starting later in April, 2017, we'll treat authenticated end-user interactions on a per-user basis. Interactions like SSO after login won't apply to your org-wide API rate limits.

3. Early in May, 2017, we will enforce the new, more granular rate limits. At that point, the warnings in the System Log will change to error notifications.

Of course, as each change is released, we'll announce the change here.

For a full description of the rate limit changes, see [API Rate Limits](/docs/api/getting_started/rate-limits).<!-- OKTA-110472 -->

### Platform Feature Improvements

#### Revoke Access Tokens and Refresh Tokens

Use the `oauthTokens` parameter when clearing user sessions to revoke all OpenID Connect and OAuth Access Tokens and Refresh Tokens
issued to the user. For more information, see [the Users API](/docs/api/resources/users#clear-user-sessions).<!-- OKTA-116904 -->

#### Token Requests with Grant Type password

Token requests with `password` grant type (`grant_type`) and `openid` scope now return an ID Token.
Previously only the appropriate Access Token or Refresh Token was returned. <!-- OKTA-117288 -->

#### Authentication That Overrides Client Request Context

The API now authenticates a user via a trusted application or proxy that uses the activation token.
For more information, see [Authentication API](/docs/api/resources/authn#primary-authentication-with-activation-token). <!-- OKTA-119692 -->

#### HAL Link for User in Provisioned State

A [HAL link](https://tools.ietf.org/html/draft-kelly-json-hal-06) to `/api/v1/users/${userId}/lifecycle/reactivate` is now provided
for requests when the user is in a PROVISIONED state but doesn't have a password.  <!-- OKTA-119221 -->

#### New Developer Org Banner

A new banner displays when you log into your developer org. It provides links to common onboarding tasks. Once you dismiss the banner, it can't be displayed again. <!-- OKTA-121055 -->

#### Access Policy by IP Range

Access Policies can now be defined based on an IP address range. <!-- OKTA-121280 -->

#### Bring Your Own SAML Certificates

Okta Admins can now upload their own SAML certificates to sign the assertion for Outbound SAML apps. These certificates can also be used to sign the AuthNRequest, as well as to decrypt the assertion for Inbound SAML. For more information, see [Bring Your Own SAML App Certificate](/docs/how-to/byo_saml).<!-- OKTA-119158 -->

#### Universal Directory for User Locale

When determining the user locale via the API, Okta uses the locale setting in the Universal Directory. If one isn't found, then Okta uses the org-wide display language instead. If the settings in Universal Directory and org are different for an end user, then Okta will prioritize the locale indicated in Universal Directory settings. This priority may change in future releases. <!-- OKTA-117789 -->

#### Lifecycle Reactivation Endpoint

Added `lifecycle/reactivate` endpoint.

This endpoint enables the API user to recover from failure in the authentication workflow, specifically when the user password is not set. In those cases this endpoint can be used to restart the activation by getting a new token and proceeding to set the user credentials. For more information, see the [API Reference](/docs/api/resources/users#reactivate-user). <!-- OKTA-119096 -->

#### Linking Users to Social Identity Providers

Added a number of APIs that allow you to link an existing Okta user to a Social Identity Provider via an `externalId`. For more information, see [Identity Provider User Operations](/docs/api/resources/idps#identity-provider-user-operations) <!-- OKTA-97257 -->

### Platform Bugs Fixed

 * Request to `/api/v1/users` while the user was still activating failed to return an HTTP 409 error. (OKTA-120458)
 * REACT samples contained errors. (OKTA-120530)
 * IdP key thumbprints were generated using SHA1. They are now generated using SHA-256, and the returned IdP key property has changed from `x5t` to `x5t#S256`. (OKTA-121442)
 * As part of the System Log API, if an invalid value was specified for `after`, we would return 0 results. Now you will get a validation error. (OKTA-119726)
