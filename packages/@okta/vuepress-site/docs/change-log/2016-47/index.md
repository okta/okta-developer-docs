---
title: Okta API Products Change Log
excerpt: Summary of changes to the Okta Platform since Release 2016.46
---

## 2016.47

### Platform Bugs Fixed

* Read-Only Admins were unable to evaluate an MFA action, resulting in a failure to create a session. (OKTA-105659)
* Configuring a SAML 2.0 IdP with **Assign to Specific Groups** or **Full sync of groups** incorrectly limited the **Group Filter** to 25 groups. (OKTA-106787)
* Creating users with the Users API failed if a bookmark app was assigned to a group. (OKTA-108185)
