---
title: Okta API Products Release Notes
---

## 2020.08.1

| Change                                                    | Expected in Preview Orgs |
| --------------------------------------------------------- | ------------------------ |
| [Bugs fixed in 2020.08.1](#bugs-fixed-in-2020-08-1)       | August 19, 2020           |

### Bugs fixed in 2020.08.1

* In orgs with Factor Sequencing enabled, customers always had `password` as one of the factor types in the ID token's `amr` claim, regardless of which factor was actually used. <!-- OKTA-318437 -->
* For some orgs with both Passwordless Authentication and Improved New Device Behavior Detection enabled, Okta treated all authentication attempts as though they came from new devices. <!--OKTA-320675-->
