---
title: Okta API Products Release Notes
---

## 2020.04.1

| Change                                             | Expected in Preview Orgs |
|----------------------------------------------------|--------------------------|
| [Bug fixed in 2020.04.1](#bug-fixed-in-2020-04-1) | April 15, 2020           |

### Bug fixed in 2020.04.1

* When calling the `/oauth2/default/v1/authorize` or `/oauth2/${authServerId}/v1/authorize` endpoints with the `prompt` parameter set to `login` and the `idp` parameter set to a SAML IdP, the end user wasn't forced to authenticate. (OKTA-288118)
