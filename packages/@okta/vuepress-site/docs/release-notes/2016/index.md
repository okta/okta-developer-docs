---
title: Okta API Products Release Notes
---

## 2016.52

### Platform Bugs Fixed

* When voice call MFA was used for an MFA challenge, the resend link wasn't populated. (OKTA-109683)
* Callouts failed when using Microsoft for social authentication. (OKTA-103080)


## 2016.51

### Platform Bugs Fixed

* When editing scopes in the General Settings tab for a single-page app (SPA) for OpenID Connect, switching to another tab deselected all scopes. (OKTA-108562)

* Instead of returning an error, invalid fields and names were added to user profiles in some cases. (OKTA-109719)

* The HAL links for the self-service actions `forgot_password`, `reset_password`, and `unlock` were returned for every user whether the action was allowed by policy or not.
This behavior applied to new orgs as of 2016.45 and is being reversed.
As of 2016.51, HAL links for these three operations are returned only if the policy for that user indicates the action is available. (OKTA-110739)


## 2016.50

### New Feature: API Access Management in EA Release

Okta's API Access Management helps enterprises protect their APIs using OAuth 2.0 as a Service.
By defining flexible security domains, scopes, claims, and access policies, you can control access as narrowly or as widely as needed for your enterprise.
With this solution, you can create one or more authorization servers, configure scopes, set access policies and have a fully operational OAuth Authorization Service in minutes.
We support the full set of core OAuth and OIDC flows (code, implicit, password, client credential, hybrid, and refresh) and are fully spec compliant.

![Authorization Server page](/img/auth_server2.png "Authorization Server page")

To get started with API Access Management, visit [API Access Management](/docs/concepts/api-access-management/).

### Feature Enhancement: Delete User Endpoint

The endpoint to delete users changed from the Beta endpoint `POST /api/v1/users/{id}/lifecycle/delete`
to the more intuitive [`DELETE /api/v1/users/{id}`](/docs/reference/api/users/#delete-user) for EA.
The Beta endpoint has been removed. <!-- (OKTA-108195) -->

### Platform Bugs Fixed

* Tokens for a suspended user didn't fail introspection. (OKTA-1090006)


## 2016.49

### Feature Enhancements

#### Delete User API in EA

API access to [delete users](/docs/reference/api/users/#delete-user) is now in EA. To request the feature, contact [Support](https://support.okta.com/help/open_case).
<!-- OKTA-109291 -->

#### System Query Log Change

System logs are truncated after six months. You may want to revise any system log queries for the new limit.
This change allows us to provide faster, more consistent responses to a wider range of system-log API requests.
Because the system keeps less data in memory, it responds faster.
<!-- OKTA-105346 -->

### Platform Bugs Fixed

* Two users created simultaneously with the same login returned an HTTP 500 error. Now, a validation error is returned. (OKTA-105484)
* If an administrator was reassigned to a User Administrator role that was scoped to a group, requests to the Users API returned fewer records than indicated by the limit parameter. (OKTA-107410)
* Creating users with the Users API failed if a bookmark app was assigned to a group. (OKTA-108185)
* User profiles weren't always updated with social profile changes. (OKTA-108602)


## 2016.47

### Platform Bugs Fixed

* Read-Only Admins were unable to evaluate an MFA action, resulting in a failure to create a session. (OKTA-105659)
* Configuring a SAML 2.0 IdP with **Assign to Specific Groups** or **Full sync of groups** incorrectly limited the **Group Filter** to 25 groups. (OKTA-106787)
* Creating users with the Users API failed if a bookmark app was assigned to a group. (OKTA-108185)


## 2016.46

### Platform Bug Fixed

* When creating a user via the API, the user was created even though an exception was thrown because a word from the question was in the answer. (OKTA-106668)

## 2016.45

### Feature Enhancements

#### New Version of Okta Sign-In Widget

The new version of Okta Sign-In Widget, 1.8.0, is available:

* Localized security questions
* Added Microsoft as a Social Provider
* Added an option to provide your own dependencies

Learn about these and other improvements in [the GitHub repository](https://github.com/okta/okta-signin-widget/releases/tag/okta-signin-widget-1.8.0).

#### Improved Error Message for OpenID Connect

OpenID Connect error messages related to invalid scopes now return more information.
<!-- OKTA-94798 -->

#### User API Response Always Contains HAL Links

Previously, HAL links for self-service operations (reset password, change password and self-service unlock) were only returned if a policy evaluation indicated they should be present. As of this release we always return these links, except we don't return the self-service unlock link if the user is not locked.

This enhancement applies to all new preview and productions orgs. Existing orgs receive the enhancement at a later date.
<!-- OKTA-104084 -->

### Platform Bugs Fixed

* Blank or empty passwords were allowed when users reset their passwords via the API following a reset password action.
Following the login with a temporary password the user would be prompted to enter their new password.
At that time, the user could enter an empty password without generating an error. (OKTA-100802)
* Validation of the security answer length in accordance with password policy wasn't performed
when creating a user via the API with the group password policy feature enabled.
Before the fix, the minimum security answer length was assumed to always be 4, regardless of the policy settings. (OKTA-103407)
* Improved the error message returned by an HTTP 429 error to remind the user to wait 30 seconds before re-issuing the request for an SMS message. (OKTA-104738)
* Removed some app metadata that was incorrectly returned from a `GET /api/v1/apps/{app-ID}` request for an OpenID Connect app. (OKTA-104767)
* After resetting an SMS factor for a user, that factor was incorrectly included in a subsequent API call for that user. (OKTA-105672)
* Changed validation of OpenID Connect client apps to disallow fragment components in configured redirect URIs. (OKTA-106049)


## 2016.43

### Enhanced Well-Known Endpoint for OpenID Connect

The [OpenID Connect discovery endpoint](/docs/reference/api/oidc/#well-knownopenid-configuration) `.well-known` includes the introspection and revocation endpoints.

Request Example:

```bash
GET https://${yourOktaDomain}/.well-known/openid-configuration
```

Response Example:

```bash
{
    "issuer": "https://${yourOktaDomain}",
    "authorization_endpoint": "https://${yourOktaDomain}/oauth2/v1/authorize",
    "token_endpoint": "https://${yourOktaDomain}/oauth2/v1/token",
    "userinfo_endpoint": "https://${yourOktaDomain}/oauth2/v1/userinfo",
    "jwks_uri": "https://${yourOktaDomain}/oauth2/v1/keys",
    "response_types_supported": [
        "code",
        "code id_token",
        "code id_token token",
        "id_token",
        "id_token token",
        "token"
    ],
    ...
    "introspection_endpoint": "https://${yourOktaDomain}/oauth2/v1/introspect",
    "introspection_endpoint_auth_methods_supported": [
        "client_secret_basic",
        "client_secret_post",
        "none"
    ],
    "revocation_endpoint": "https://${yourOktaDomain}/oauth2/v1/revoke",
    "revocation_endpoint_auth_methods_supported": [
        "client_secret_basic",
        "client_secret_post",
        "none"
    ]
}
```

### New Function for Replacing Strings

Use the [Expression Language](/docs/reference/okta-expression-language/) function `String.replaceFirst` to replace the first occurrence of a string.

Example:

`String.replaceFirst("This list includes chores", "is", "at") = "That list includes chores"`

In release 2016.41 we introduced the string replacement function `String.replace`, which replaces all instances of a specified string.

### Platform Bug Fixed

POST requests to `/api/v1/sessions` failed with an InvalidSessionException if the request specified a
`sessionToken` but no API token was included. (OKTA-104965)


## 2016.41

### Feature Enhancements

* [New Version of Okta Sign-In Widget](#new-version-of-okta-sign-in-widget)
* [New Version of Okta Auth JS](#new-version-of-okta-auth-js)
* [Key Store Operations for Identity Providers API](#key-store-operations-are-available-for-identity-providers-api)
* [New Function for Replacing Strings](#new-function-for-replacing-strings)

#### New Version of Okta Sign-In Widget

The new version of Okta Sign-In Widget, 1.7.0, is available:

* The Widget can create access tokens and authorization codes.
* `tokenManager` manages OAuth 2.0 and OpenID Connect tokens.
* Voice Call is supported in the forgot password flow.
* Localization is available for Hungarian and Romanian.
* Added the language option to set the displayed language.

Learn about these and other improvements in [the GitHub repository](http://github.com/okta/okta-signin-widget/releases/latest).

#### New Version of Okta Auth JS

The new version of Okta Auth JS, 1.5.0, is available:

* Perform manual token refreshes with the `token.refresh` method.
* Create authorization codes in Okta Auth JS.
* Access updated user information with `token.getUserInfo`.
* Performance has improved when refreshing multiple tokens.

Learn about these and other improvements in [the GitHub repository](http://github.com/okta/okta-auth-js/releases/latest).

#### Key Store Operations are Available for Identity Providers API

Just as you can in the Apps API, you can perform key store operations in the Identity Providers API:

* Generate an X.509 certificate public key
* Retrieve and list public keys

For more information, see [Identity Provider Signing Key Store Operations](/docs/reference/api/idps/#identity-provider-signing-key-store-operations).
<!-- OKTA-91498 -->

#### New Function for Replacing Strings

Use the Expression Language function `String.replace` to replace strings.

Example:

`String.replace("This list includes chores", "is", "at") = "That last includes chores"`
<!-- * `String.replaceOnce("This list includes chores", "is", "at") = "That list includes chores"` -->

For more information, see [Expression Language: String Functions](/docs/reference/okta-expression-language/#string-functions).

<!-- OKTA-103057, OKTA-103966 -->

### Platform Bug Fixed

* Reauthorization using app sign-on policy wasn't always enforced for OpenID Connect flows.(OKTA-99897) <!-- OKTA-99900 -->


## 2016.40

### Feature Enhancement: Listing Apps that Share an Application Key Credential

Once you have shared a credential between apps, you can list all the applications that are using
the same application key credential. <!-- OKTA-100925 -->

For more information, see the [Apps API reference](/docs/reference/api/apps/#list-applications-using-a-key).


## 2016.39

### Feature Enhancement: Sharing Certificates Between App Instances

By cloning an app key credential with the Apps API, you can share the same certificate between two or more apps:

<pre>/apps/<em>:aid</em>/credentials/keys/<em>:kid</em>/clone?targetAid=<em>:targetAid</em></pre>

To share a certificate among app instances:

1. Generate a new app key credential for an app (the source app).
2. Use the new credential in the source app.
3. Share the credential (`kid`) with one or more target apps.
4. Use the new credential in the target app.

For more detailed instructions, see ["Clone Key Credential for Application"](/docs/reference/api/apps/#clone-application-key-credential)
and ["Update Key Credential for Application"](/docs/reference/api/apps/#update-key-credential-for-application).

### Bug Fixed

The WWW-Authenticate header couldn't be read when the `/oauth2/v1/userinfo` endpoint returned errors in a browser. (OKTA-101943)


## 2016.37

### Bug Fixed

* In some cases, a `GET /api/v1/users` request incorrectly returned a 403 error. <!-- OKTA-75861 -->


## 2016.36

### System Log Enhancement

The names of [AppUser properties](/docs/reference/api/apps/#application-user-properties)
that have changed during an import are included in the system log. <!-- (OKTA-96525) -->


## 2016.35

### Feature Enhancements

#### Improvements to Endpoint sessions/me
<!-- OKTA-95047 -->
* The parameter `createdAt` is returned in results.
* If authentication is done using a social IdP or SAML, `lastPasswordVerification` isn't updated.
* The parameter `lastPasswordVerification` is only updated when the password is verified.

#### New Version of Okta Sign-In Widget

The new version of Okta Sign-In Widget, 1.6.0, is available:

* Okta Sign-In Widget supports two new factors: Windows Hello and U2F.
* The Widget is localized for Czech.
* Translations are shipped with the `npm` module.

Learn about these and other improvements at [the Git site](https://github.com/okta/okta-signin-widget/releases/tag/okta-signin-widget-1.6.0).


## 2016.34

### Feature Enhancement: HAL Links For Sessions API Are CORS-Enabled

Two Session API endpoints, `GET /api/v1/sessions/me` and `POST /sessions/me/lifecycle/refresh`, return `/me` instead of `/${userId}` in response links.
These links are CORS-enabled, consistent with the original API calls which are also CORS-enabled.

For more information, see [Get Session](/docs/reference/api/sessions/#get-session) or [Refresh Session](/docs/reference/api/sessions/#refresh-session).<!-- OKTA-98961 -->

### Bugs Fixed

* IdP keys could be deleted even when referenced by an active or inactive app instance. (OKTA-96139)
* Properties could be deleted from the [User Profile schema](/docs/reference/api/schemas/#remove-property-from-user-profile-schema)
while still referenced as a `matchAttribute` in inbound SAML IdPs. (OKTA-96281)
* Identity Providers for social authentication configured to look up usernames by Okta username or email failed to return a valid match.
This failure occurred if the username was in both the username and email and a second user existed with the same email but different username. (OKTA-96335)


## 2016.33

### Bugs Fixed

* Custom SAML apps couldn't update their signing key credentials via API. (OKTA-93959)
* When configuring OpenID Connect client apps, the App Embed Links dialog displayed custom login and error page sections that weren't applicable. (OKTA-95526)
* Using an API token created by a Read-Only Administrator caused a permission error when GET requests were sent to `/api/v1/users/${userId}/factors` or `/api/v1/users/${userId}/factors/catalog`. (OKTA-95569)
* GET requests to `oauth2/v1/authorize` that specified the Form Post Response Mode sometimes failed to receive `expires_in` and `scope` in the response. (OKTA-98245)


## 2016.31

### Feature Enhancements

#### Version 1.4.0 of okta-auth-js Available

<!-- OKTA-97056 -->
We've added support for Access Tokens and two new namespaces, token and tokenManager,
to handle both ID Tokens and Access Tokens.
The token namespace makes it easier to specify how to retrieve your tokens:
getWithoutPrompt, getWithPopup, and getWithRedirect.
The tokenManager namespace allows tracking tokens and automatically refreshes them for you.

For more details including feature and bug-fix commits,
see [the okta-auth-js Git repository](https://github.com/okta/okta-auth-js/releases/tag/okta-auth-js-1.4.0).

#### Rules Included in Policy API requests

<!-- OKTA-40548 -->
Use the `expand` query parameter to include up to twenty rules in a Policy API query:

`GET https://my-org.okta.com/api/v1/policies/{id}?expand=rules`

The embedded rules option returns up to 20 rules for a given policy. If the policy has more than 20 rules, this request returns an error.

### Bug Fixed

* The ampersand (&) character in a username caused Forgot Password API requests (`/api/v1/authn/recovery/password` to fail. (OKTA-93994)


## 2016.30

### New Features

#### Create Custom Apps with the API

<!-- OKTA-83462 -->
You can now create SAML and SWA custom apps using the Apps API. Previously you had to create a custom app
using the [**App Integration Wizard**](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Apps_App_Integration_Wizard-saml)
in the administrator UI.

For more information about creating custom apps with the API, see [Apps API: Add Custom SAML Application](/docs/reference/api/apps/#add-custom-saml-application).

### Feature Enhancements

#### User-Matching Improvement for SAML Identity Providers (IdPs)

<!-- OKTA-93061 -->
For SAML IdPs, you can now match transformed IdP usernames using more attributes.
To match on an attribute other than username, email, or either, specify the attribute name in the property `matchAttribute`,
and specify the value `CUSTOM_ATTRIBUTE` in `matchType`.

For more information, see [Identity Providers](/docs/reference/api/idps/#subject-policy-object).

> Contact [Support](https://support.okta.com/help/open_case) to enable this Early Access feature.

#### Okta Sign-In Widget Release 1.5.0

<!-- OKTA-96356 -->
The Okta Sign-In Widget release 1.5.0 contains the following enhancements:

* Passcodes for RSA and On-Prem MFA are masked.
* The dependencies `@okta/i18n` and `@okta/courage` are optional, to allow `npm install` to work properly.
* The **Show Answer** checkbox has been replaced with a simpler **Show/Hide** toggle button in the **Answer** field. The **Show Answer** checkbox displays when a security question is a factor.

### Bugs Fixed

* When configuring an app with OpenID Connect, some redirect URIs weren't saved correctly. (OKTA-90445)
* Problems occurred in some orgs when deleting a very large group using the API. (OKTA-91383)



## 2016.29

### Feature Enhancements

#### New Response Parameter For Access Token Expiration

<!-- OKTA-94115 -->
The `expires_in` response parameter tells you the number of seconds before a `token` (Access Token) expires. If your
response from the `/oauth2/v1/authorize` endpoint includes an Access Token, `expires_in` is included in the response.

For more information, see the `/oauth2/v1/authorize` [Response Properties](/docs/reference/api/oidc/#response-properties).

#### SHA256 Certificate for New SAML IdP Instances

<!-- OKTA-91496 -->
The default certificate used by new SAML IdP instances to sign assertions is a SHA256 certificate.
Existing SAML IdP instances will continue to use the certificate they currently have.

### Bug Fixed

* Requiring `okta-auth-js` didn't work unless you also defined global variables in the build flow. (OKTA-94206)


## 2016.28

### Feature Enhancement: Password Complexity Requirements

<!-- OKTA-88905 -->
To enable a platform client to display password
complexity requirements to the user, we've enhanced the PasswordComplexity object to include those requirements: `excludeUsername`, `age:minAgeMinutes`, and `age:historyCount`.

```json
{
  "expiration":{
    "passwordExpireDays": 0
  },
  "complexity": {
    "minLength": 8,
    "minLowerCase": 1,
    "minUpperCase": 1,
    "minNumber": 1,
    "minSymbol": 0,
    "excludeUsername": "true"
    },
   "age":{
     "minAgeMinutes":0,
     "historyCount":0
    }
}
```

Also, the response to an answer recovery question (`/api/v1/authn/recovery/answer`) includes the PasswordPolicy object, which contains the PasswordComplexity object:

```json
{
  "stateToken": "00lMJySRYNz3u_rKQrsLvLrzxiARgivP8FB_1gpmVb",
  "expiresAt": "2015-11-03T10:15:57.000Z",
  "status": "PASSWORD_RESET",
  "relayState": "/myapp/some/deep/link/i/want/to/return/to",
  "_embedded": {
    "user": {
      "id": "00ub0oNGTSWTBKOLGLNR",
      "passwordChanged": "2015-09-08T20:14:45.000Z",
      "profile": {
        "login": "dade.murphy@example.com",
        "firstName": "Dade",
        "lastName": "Murphy",
        "locale": "en_US",
        "timeZone": "America/Los_Angeles"
      }
    },
    "policy": {
     "expiration":{
       "passwordExpireDays": 0
       },
       "complexity": {
         "minLength": 8,
         "minLowerCase": 1,
         "minUpperCase": 1,
         "minNumber": 1,
         "minSymbol": 0,
         "excludeUsername": "true"
       },
       "age":{
         "minAgeMinutes":0,
         "historyCount":0
       }
    }
  },
  "_links": {
    "next": {
        "name": "resetPassword",
        "href": "https://{yourOktaDomain}/api/v1/authn/credentials/reset_password",
        "hints": {
          "allow": ["POST"]
        }
      },
      "cancel": {
        "href": "https://{yourOktaDomain}/api/v1/authn/cancel",
        "hints": {
          "allow": ["POST"]
        }
      }
  }
}
```

When performing a self-service password reset (forgot password), the request for an answer recovery question is made in response to the security question challenge.
For more information, see [Password Complexity Object](/docs/reference/api/authn/#password-complexity-object)
and [Answer Recovery Question](/docs/reference/api/authn/#answer-recovery-question).

## 2016.27

### Feature Enhancements

#### Improvements for OAuth Panels in the Administrator Console

<!-- OKTA-93256 -->
To improve usability, we've moved some of the panels in the administrator UI related to OAuth:

* The **OAuth** tab has been renamed **Authorization Server**.
* The **Signing credentials rotation** option was on the **Client Registration** panel, but since it helps you configure tokens, we've
 moved it to the **Authorization Server** tab.

![New Tab for Managing OAuth-Related Configuration](/img/changed_tabs.png "New Tab for Managing OAuth-Related Configuration")

#### Okta Sign-In Widget Updated

<!-- OKTA-91831, OKTA-93759 -->
The Okta Sign-In Widget will be updated to version 1.4.0 for Production orgs.

See [Okta Sign-In Widget](/code/javascript/okta_sign-in_widget/) for updated sample code.

The new release includes several enhancements:

* The new version is an npm module and is availabe on the [npm registry](https://www.npmjs.com/package/@okta/okta-signin-widget).
* Changes to the "Trust this Device" checkbox and other minor bug fixes have been made.

#### Improved User Lookup for Password Recovery

<!-- OKTA-92001 -->
To ensure a successful password recovery lookup if an email address is associated with multiple users, we improved the lookup behavior:

* Okta no longer includes deactivated users in the lookup.
* The lookup searches login IDs first, then primary email addresses, and then secondary email addresses.

### Bugs Fixed

* The OIDC Access Token was incorrectly available to Okta endpoints other than `/oauth2/v1/userinfo`. (OKTA-91099)
* The format of the issuer (`iss`) in the Access Token has changed: it was the client ID. It now takes the form: `https://${yourOktaDomain}.okta.com/as/{authorization-server-ID}. (OKTA-93628)


## 2016.26

### New Feature: API for Custom SMS Template

You can send custom text as part of an SMS message request:

1. Use the `/api/v1/templates/sms` endpoint to create a custom SMS text template.
2. Send a request to the Factors API specifying the template for verification. There is no change in the response.

For more information, see [Templates API](/docs/reference/api/templates/) and [Factors API](/docs/reference/api/factors/).

### Feature Enhancement: Resource Owner Password Credential Flow for OpenID Connect Supports Refresh Tokens

The `/oauth2/v1/token` endpoint includes a Refresh Token if:

* The request contains a `grant_type` with the value `password` and your client supports the `grant_type` value `refresh_token`. For more information, see [Token Request](/docs/reference/api/oidc/#request-parameters-1).
* You request the `offline_access` scope. For more information, see [Refresh Tokens](/docs/guides/refresh-tokens/).

### Bugs Fixed

* For some customers, an API request for users that match a value for `last_name` didn't return all the matches. (OKTA-91367)


## 2016.25

### New Platform Feature: Limit on Size of Groups Claim

To protect against arbitrarily large numbers of groups matching the group filter, the group claim has a limit of 100.
If more than 100 groups match the filter, then the request fails.

* For more information about configuring an app for OpenID Connect, including group claims, see [Using OpenID Connect](/docs/reference/api/oidc/).
* For more information about group claims in the API, see Scope-dependent claims.

### Bugs Fixed

The following issues are fixed:

* OKTA-89624 - Base schema attributes for OpenID Connect without default mappings weren't included in ID token claims.
* OKTA-89867 - Creating a new user and adding that user to a group with the same create request via the API failed, which was a problem for group-scoped User Admins creating users.
* OKTA-90593 - The Group property <em>lastMembershipUpdated</em> wasn't updated when adding or removing users from an Active Directory group using scheduled import.
* OKTA-90898 - Updating credentials failed when using the Apps API for custom apps.
* OKTA-91066 - System log messages related to OpenID Connect didn't contain scopes.

Added on June 29:

* OKTA-90514 - When adding a group target to a User Administrator role via the API, that user still had the ability to administer all groups. Also, removing the last group target from a role after one has been added was incorrectly allowed.

## 2016.24

### New Platform Feature

#### New Version of Okta Sign-In Widget
Version 1.3.3 of the Okta Sign-In Widget, and version 1.0.2 of okta-auth-js are available for Preview orgs. For more information, see Okta Sign-In Widget.

#### Policy API
The Links object, `_links`, is available in the Policy object. For more information, see [Links Object](/docs/reference/api/users/#links-object).

#### Improved Error Descriptions
The error descriptions related to OAuth provide more helpful information about invalid clients for OpenID Connect flows.

#### Disable Automatic Key Rotation
If you need to disable automatic key rotation for an OpenID Connect flow, you can do so in General Settings section under the General tab for an app, and then use the `/oauth2/v1/keys` endpoint to fetch public keys for your app. For more information, see [OpenID Connect](/docs/reference/api/oidc/).

### Bugs Fixed

* OKTA-69173 - The `helpURL` for `vpn` wasn't returned even though it had been set previously in a request to `/api/v1/apps`.

## 2016.23

### Bugs Fixed

* OKTA-73691 - HTML tags were incorrectly allowed in POST and PUT requests to `/api/v1/idps/`.
* OKTA-90218 - Requests to `/oauth2/v1/authorize` failed if they included a state value with special characters.
* OKTA-91074 - Requests to `/oauth2/v1/introspect` incorrectly included scopesList.
* OKTA-91441 - The Users API incorrectly returned an error when updating login.
