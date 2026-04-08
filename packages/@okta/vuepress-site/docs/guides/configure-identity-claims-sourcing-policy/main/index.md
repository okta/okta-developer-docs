---
title: Configure the identity claims sourcing policy
excerpt: Learn how to configure the identity claims sourcing policy to redirect federated users to their IdP when re-authentication is required
layout: Guides
---

<ApiLifecycle access="ea" />

Use the Policies API and Identity Providers API to configure the identity claims sourcing policy for IdP re-authentication.

---

#### Learning outcomes

* Understand when and why to configure the identity claims sourcing policy
* Update the default policy rule to redirect federated users to their IdP for re-authentication
* Optionally restrict redirects to a specific set of IdPs

#### What you need

* An Identity Engine org with the identity claims sourcing feature enabled. See [Enable self-service features](https://developer.okta.com/docs/api/openapi/okta-management/guides/release-lifecycle/#early-access-ea).
* At least one third-party IdP (OIDC or SAML) or Org2Org IdP configured and active in your org. See [Add an Identity Provider](/docs/guides/add-an-external-idp/).
* An [app sign-in policy](/docs/guides/configure-signon-policy/main/) or [Okta account management policy](/docs/guides/okta-account-management-policy/main/) with a re-authentication requirement configured. The identity claims sourcing policy only activates when one of these policies triggers re-authentication.

---

## Overview

Federated users whose Okta session was established through a third-party IdP or Org2Org IdP may not have local authenticators enrolled in Okta. When an app sign-in policy or Okta account management policy requires re-authentication, Okta prompts the user for a local authenticator by default. Federated users without local authenticators receive an error.

The identity claims sourcing policy fixes this. When set to `FIXED`, it redirects federated users back to the IdP that last established their Okta session. The IdP handles re-authentication and returns the user to Okta with fresh authentication claims.

When you enable the feature, Okta automatically creates a default identity claims sourcing policy and rule. The default rule sets `refresh.redirectType` to `NONE`, which keeps Okta's existing local re-authentication behavior. Update this rule to change the behavior.

Two configuration options are available:

* `NONE` (default): Okta prompts for local authenticators. Federated users without local authenticators receive an error.
* `FIXED`: Okta redirects the user to the IdP that last established their session. You can optionally configure an IdP filter to restrict which IdPs are eligible.

## Scenarios

### Third-party IdP

A healthcare company uses Microsoft Entra ID as their primary identity provider. Clinical staff sign in to Okta through an Entra ID SAML connection and access a prescription management app. The app sign-in policy requires re-authentication every 60 minutes for compliance. Clinical staff don't have local Okta authenticators enrolled.

Before this policy is configured, the 60-minute re-authentication interval causes Okta to prompt clinical staff for a local authenticator they don't have, producing an error.

The admin configures the identity claims sourcing policy with `refresh.redirectType` set to `FIXED` and an include filter containing the Entra ID IdP. Only users whose last SSO IdP is Entra ID are redirected.

#### User experience

1. A nurse signs in through Entra ID and opens the prescription app.
1. After 60 minutes, the app sign-in policy requires re-authentication.
1. Okta redirects the nurse to Entra ID with a forced re-authentication request.
1. Entra ID prompts the nurse to sign in.
1. The nurse authenticates at Entra ID.
1. Entra ID returns fresh authentication claims to Okta.
1. Okta validates the claims against the app sign-in policy and grants access.

### Org2Org IdP

A company runs separate Okta orgs for its parent organization and each regional subsidiary. Regional employees sign in to their subsidiary org (the IdP org) and access a financial reporting app in the parent org (the SP org) through Org2Org federation. The app sign-in policy in the parent org requires re-authentication for users accessing sensitive financial data. Regional employees don't have local authenticators in the parent org.

The admin in the parent org configures the identity claims sourcing policy with `refresh.redirectType` set to `FIXED`. No filter is configured, so any federated user is redirected to their last known SSO IdP.

#### User experience

1. A regional employee signs in to their subsidiary Okta org and opens the financial reporting app in the parent org.
1. The parent org's app sign-in policy requires re-authentication.
1. The parent org redirects the employee to the subsidiary org for re-authentication.
1. The subsidiary org prompts the employee to sign in.
1. The employee authenticates at the subsidiary org.
1. The subsidiary org returns fresh authentication claims to the parent org.
1. The parent org validates the claims and grants access.

## Configure the identity claims sourcing policy

### Get the policy and rule IDs

1. [List all policies](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/listPolicies) filtered by type to retrieve the identity claims sourcing policy.

   ```bash
   GET /api/v1/policies?type=IDENTITY_CLAIM_SOURCING
   ```

   Copy the policy `id` from the response.

   ```json
    [
        {
        "id": "policyId",
        "status": "ACTIVE",
        "name": "Default Policy",
        "priority": 1,
        "system": true,
        "conditions": null,
        "created": "2026-03-23T12:00:00.000Z",
        "lastUpdated": "2026-03-23T12:00:00.000Z",
        "_links": {
            "self": {
                "href": "https://{yourOktaDomain}/api/v1/policies/{policyId}",
                "hints": {
                    "allow": [
                        "GET",
                        "PUT"
                    ]
                }
            },
            "rules": {
                "href": "https://{yourOktaDomain}/api/v1/policies/{policyId}/rules",
                "hints": {
                    "allow": [
                        "GET",
                        "POST"
                    ]
                }
            }
        },
        "type": "IDENTITY_CLAIM_SOURCING"
        }
    ]
   ```

1. [List the policy rules](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/listPolicyRules) and copy the default rule `id`.

   ```bash
   GET /api/v1/policies/{policyId}/rules
   ```

   Response

  ```json
  [
    {
      "id": "rul971e5smrwQB7Tz0g7",
      "status": "ACTIVE",
      "name": "Catch-all Rule",
      "priority": 99,
      "created": "2026-03-23T16:00:00.000Z",
      "lastUpdated": "2026-03-23T16:00:00.000Z",
      "system": true,
      "conditions": null,
      "actions": {
          "claimSourcing": {
              "redirectType": "IDP_DISCOVERY",
              "refresh": {
                  "redirectType": "NONE",
                  "filter": null
              }
          }
      },
      "_links": {
          "self": {
              "href": "https://{yourOktaDomain}/api/v1/policies/{policyId}/rules/{ruleId}",
              "hints": {
                  "allow": [
                      "GET",
                      "PUT"
                  ]
              }
          }
      },
      "type": "IDENTITY_CLAIM_SOURCING"
    }
  ]
  ```

### Update the rule

1. [Update the default rule](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/replacePolicyRule) with `refresh.redirectType` set to `FIXED`.

   ```bash
   curl -L -X PUT 'https://{yourOktaDomain}/api/v1/policies/{policyId}/rules/{ruleId}' \
    -H 'Content-Type: application/json' \
    -H 'Accept: application/json' \
    -H 'Authorization: SSWS {apiToken}' \
    -H 'Cookie: JSESSIONID={sessionId}' \
    -d '{
        "type": "IDENTITY_CLAIM_SOURCING",
        "name": "Catch-all rule",
        "status": "ACTIVE",
        "priority": 99,
        "conditions": null,
        "actions": {
            "claimSourcing": {
                "redirectType": "IDP_DISCOVERY",
                "refresh": {
                    "redirectType": "FIXED",
                    "filter": {
                        "include": [
                            {
                                "id": "idpId1",
                                "name": "idpName1"
                            },
                            {
                                "id": "idpId2",
                                "name": "idpName2"
                            }
                        ]
                    }
                }
            }
        }
    }'
   ```

   ```json
   {
     "type": "IDENTITY_CLAIM_SOURCING",
     "name": "Default Rule",
     "actions": {
       "claimSourcing": {
         "refresh": {
           "redirectType": "FIXED"
         }
       }
     }
   }
   ```

   Okta redirects any federated user to the IdP that last established their session when re-authentication is required.

### Restrict redirects to specific IdPs (optional)

To limit re-authentication redirects to specific IdPs, add an include filter to the rule. If a user's last SSO IdP isn't in the include list, the policy falls back to `NONE` for that user.

1. [List your identity providers](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentityProvider/#tag/IdentityProvider/operation/listIdentityProviders) to get the IdP IDs.

   ```bash
   GET /api/v1/idps
   ```

1. [Update the default rule](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/replacePolicyRule) with the filter.

   ```bash
   PUT /api/v1/policies/{policyId}/rules/{ruleId}
   ```

   ```json
   {
     "type": "IDENTITY_CLAIM_SOURCING",
     "name": "Default Rule",
     "actions": {
       "claimSourcing": {
         "refresh": {
           "redirectType": "FIXED",
           "filter": {
             "include": [
               {
                 "id": "{idpId}",
                 "name": "{idpName}"
               }
             ]
           }
         }
       }
     }
   }
   ```

## Next steps

* [Identity claims sourcing policy](/docs/concepts/policies/#identity-claims-sourcing-policies)
* [Configure a global session policy and an app sign-in policy](/docs/guides/configure-signon-policy/main/)
* [Configure an Okta account management policy](/docs/guides/okta-account-management-policy/main/)
