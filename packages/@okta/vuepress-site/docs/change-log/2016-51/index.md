---
title: Okta API Products Change Log
excerpt: Summary of changes to the Okta Platform since Release 2016.50
---

## 2016.51

### Platform Bugs Fixed

* When editing scopes in the General Settings tab for a single-page app (SPA) for OpenID Connect, switching to another tab deselected all scopes. (OKTA-108562)

* Instead of returning an error, invalid fields and names were added to user profiles in some cases. (OKTA-109719)

* The HAL links for the self-service actions `forgot_password`, `reset_password`, and `unlock` were returned for every user whether the action was allowed by policy or not.
This behavior applied to new orgs as of 2016.45 and is being reversed.
As of 2016.51, HAL links for these three operations are returned only if the policy for that user indicates the action is available. (OKTA-110739)
