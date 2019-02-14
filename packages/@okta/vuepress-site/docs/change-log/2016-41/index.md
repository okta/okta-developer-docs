---
title: Okta API Products Change Log
excerpt: Summary of changes to the Okta Platform since Release 2016.40
---

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

For more information, see [Identity Provider Signing Key Store Operations](/docs/api/resources/idps#identity-provider-signing-key-store-operations).
<!-- OKTA-91498 -->

#### New Function for Replacing Strings

Use the Expression Language function `String.replace` to replace strings.

Example:

`String.replace("This list includes chores", "is", "at") = "That last includes chores"`
<!-- * `String.replaceOnce("This list includes chores", "is", "at") = "That list includes chores"` -->

For more information, see [Expression Language: String Functions](/reference/okta_expression_language/#string-functions).

<!-- OKTA-103057, OKTA-103966 -->

### Platform Bug Fixed

* Reauthorization using app sign-on policy wasn't always enforced for OpenID Connect flows.(OKTA-99897) <!-- OKTA-99900 -->
