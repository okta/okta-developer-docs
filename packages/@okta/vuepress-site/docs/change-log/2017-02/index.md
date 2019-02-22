---
title: Okta API Products Change Log
excerpt: Summary of changes to the Okta Platform since Release 2016.51
---

## 2017.02

### Feature Improvements: New Expression Language Function

The new [expression language](/reference/okta_expression_language/) function `Arrays.toCsvString(array)` converts an array to a comma-delimited string. For example:

`Arrays.toCsvString({"This", "is", " a ", "test"})` returns `This,is, a ,test` <!-- OKTA-51976 -->

### Platform Bugs Fixed

* Introspection behavior for OpenID Connect and API Access Management was inconsistent across all token types when users were not in the ACTIVE state. (OKTA-110445)
* Incorrect text in the administrator UI, related to authorization (OpenID Connect and API Access Management), was corrected:
    * **Password** became **Resource Owner Password** in **Apps** > **General Settings** > **Allowed Grant Types**.
    * **Resource Owner Credential** became **Resource Owner Password** in the Edit Rule page of the authorization server configuration dialog
        (**Security** > **API** > **Authorization Servers**). (OKTA-110749)
* In some orgs, the links for `self` and `next` were returned with incorrect values. (OKTA-111350)
