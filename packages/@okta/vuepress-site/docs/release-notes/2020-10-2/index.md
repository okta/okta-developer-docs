---
title: Okta API Products Release Notes
---

## 2020.10.2

| Change                                                                                | Expected in Preview Orgs |
|---------------------------------------------------------------------------------------|--------------------------|
| [Bug fixed in 2020.10.2](#bug-fixed-in-2020-10-2)                                     | October 21, 2020         |

### Bug fixed in 2020.10.2

When accessing the `/authorize` [endpoint](/docs/reference/api/oidc/#authorize) with a scope parameter requiring consent, users not assigned to the application received a consent prompt, rather than an error message.  (OKTA-335476)
