---
title: Okta API Products Change Log
---

## 2019.03.2

| Change                                                                                                                  | Expected in Preview Orgs |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| [Bugs Fixed in 2019.03.2](#bugs-fixed-in-2019032)                                                                       | March 20, 2019           |

### Bugs Fixed in 2019.03.2

* Under some circumstances, users in a locked out state would receive success responses from the SMS recovery API. (OKTA-207288)
* In some instances, users who were not Okta-mastered would have inaccurate `passwordChanged` values in API responses. (OKTA-210233)
* SAML applications created through the API would not save the value for the `HonorForceAuthn` property. (OKTA-209083)
* For SAML applications, the `attributeStatements` object would not update if a `null` value was passed as part of a PUT operation. (OKTA-209767)
