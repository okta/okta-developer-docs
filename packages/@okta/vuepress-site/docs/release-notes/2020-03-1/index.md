---
title: Okta API Products Release Notes
---

## 2020.03.1

| Change                                             | Expected in Preview Orgs |
|----------------------------------------------------|--------------------------|
| [Bugs fixed in 2020.03.1](#bugs-fixed-in-2020-03-1) | March 11, 2020           |

### Bugs fixed in 2020.03.1

* The [Update Identity Provider](/docs/reference/api/idps/#update-identity-provider) operation allowed changing the `protocol` property of an Identity Provider object, which resulted in errors. (OKTA-277221)
* Responses from OpenID Connect and OAuth 2.0 public metadata endpoints incorrectly omitted the return of CORS headers if the calling URL wasn't in the list of trusted origins defined for the org. (OKTA-282429)
