---
title: Okta API Products Release Notes
---

## 2020.02.1

| Change                                             | Expected in Preview Orgs |
|----------------------------------------------------|--------------------------|
| [Bugs Fixed in 2020.02.1](#bug-fixed-in-2020-02-1) | February 19, 2020        |

### Bugs Fixed in 2020.02.1

* When an admin's last role was revoked using the [Roles API](/docs/reference/api/roles/), it would sometimes not trigger a System Log event. (OKTA-276093)
* In certain situations the [`/keys`](/docs/reference/api/oidc/#keys) endpoint would incorrectly return that the current key was expired and needed to be rolled over when the rollover hadn't occurred yet. (OKTA-227062)
* Expired AD users would receive different authentication errors depending on whether the Passwordless Policy was enabled or disabled. (OKTA-268306)
