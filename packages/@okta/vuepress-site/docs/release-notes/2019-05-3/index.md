---
title: Okta API Products Release Notes
---

## 2019.05.3

| Change                                                                                                                                        | Expected in Preview Orgs |
|-----------------------------------------------------------------------------------------------------------------------------------------------|--------------------------|
| [Token Inline Hook Can Modify or Remove Existing Claims (Early Access)](#token-inline-hook-can-modify-or-remove-existing-claims-early-access) | May 29, 2019             |
| [Bug Fixed in 2019.05.3](#bug-fixed-in-2019-05-3)                                                                                           | May 29, 2019             |

### Token Inline Hook Can Modify or Remove Existing Claims (Early Access)

The [Token Inline Hook](/use_cases/inline_hooks/token_hook/token_hook/) now supports changing or removing existing claims in tokens minted by the Okta Custom Authorization Server. <!-- (OKTA-218305) -->

### Bug Fixed in 2019.05.3

* Responses from the `GET /groups/rules` [API](/docs/api/resources/groups/#list-group-rules) failed to include a link to the next page of results in cases where there was more than one page. (OKTA-221434)

