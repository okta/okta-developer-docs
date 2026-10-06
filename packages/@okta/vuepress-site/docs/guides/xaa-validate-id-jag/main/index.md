---
title: Validate ID-JAG tokens for resource authorization servers
meta:
  - name: description
    content: Validate ID-JAG tokens in external authorization servers
layout: Guides
---

<ApiLifecycle access="ie" />

This guide explains how to validate incoming Identity Assertion JWT Authorization Grant (ID-JAG) tokens in your resource authorization server as part of the Cross App Access (XAA) flow.
---

---

#### Learning outcomes

* Accept the `jwt-bearer` grant type on your external authorization server.
* Parse and validate required headers, signatures, and claims in incoming ID-JAG tokens from Okta, the enterprise Identity Provider (IdP).
* Handle identity resolution for both OIDC and SAML SSO integrations.
* Handle the necessary audit logging and return an access token if validation succeeds.

#### What you need

* A resource server that provides API access to users
* An authorization server that protects your resource server
---
