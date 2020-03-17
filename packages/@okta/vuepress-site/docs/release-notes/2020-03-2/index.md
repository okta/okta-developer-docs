---
title: Okta API Products Release Notes
---

## 2020.03.2

| Change                                             | Expected in Preview Orgs |
|----------------------------------------------------|--------------------------|
| [Bugs fixed in 2020.03.2](#bugs-fixed-in-2020-03-2) | March 18, 2020           |

### Bugs fixed in 2020.03.2

* In some cases, an OAuth 2.0 [`/authorize`](/docs/reference/api/oidc/#authorize) request would incorrectly redirect if the client App had an App Sign-On Policy configured. (OKTA-269116)

* The [`_links`](/docs/reference/api-overview/#links) attribute for `groups` sent by Okta in the request body for a SAML Inline hook was incorrect. (OKTA-269553)

* Responses from OpenID Connect and OAuth 2.0 public metadata endpoints incorrectly omitted the return of CORS headers if the calling URL wasn't in the list of [trusted origins](/docs/reference/api/trusted-origins/) defined for the org. (OKTA-283549)

* When a Workflow was called, all headers that weren't white listed had text prepended in the response, which resulted in redirects not working due to the modification of the header name. (OKTA-282294)
