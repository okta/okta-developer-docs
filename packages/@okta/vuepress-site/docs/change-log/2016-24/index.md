---
title: Okta API Products Change Log
---

## 2016.24

### New Platform Feature

#### New Version of Okta Sign-In Widget
Version 1.3.3 of the Okta Sign-In Widget, and version 1.0.2 of okta-auth-js are available for Preview orgs. For more information, see Okta Sign-In Widget.

#### Policy API
The Links object, `_links`, is available in the Policy object. For more information, see [Links Object](/docs/api/resources/users#links-object).

#### Improved Error Descriptions
The error descriptions related to OAuth provide more helpful information about invalid clients for OpenID Connect flows.

#### Disable Automatic Key Rotation
If you need to disable automatic key rotation for an OpenID Connect flow, you can do so in General Settings section under the General tab for an app, and then use the `/oauth2/v1/keys` endpoint to fetch public keys for your app. For more information, see [OpenID Connect](/docs/api/resources/oidc).

### Bugs Fixed

* OKTA-69173 – The `helpURL` for `vpn` wasn't returned even though it had been set previously in a request to `/api/v1/apps`.
