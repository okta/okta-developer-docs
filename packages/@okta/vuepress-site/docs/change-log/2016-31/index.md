---
title: Okta API Products Change Log
excerpt: Summary of changes to Okta Platform since Release 2016.30
---

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
