---
title: Configure the identity claims sourcing policy
excerpt: Learn how to configure the identity claims sourcing policy to redirect federated users to their IdP when re-authentication is required
layout: Guides
---

<ApiLifecycle access="ie" /><br><ApiLifecycle access="ea" />

Use the Policies API to configure the identity claims sourcing policy for IdP re-authentication.

---

#### Learning outcomes

* Understand when and why to configure the identity claims sourcing policy
* Update the default policy rule to redirect federated users to their IdP for re-authentication

#### What you need

* If you don't have an Okta org, you can create an [Okta Integrator Free Plan org](https://developer.okta.com/signup).
* The identity claims sourcing feature enabled. See [Enable self-service features](https://developer.okta.com/docs/api/openapi/okta-management/guides/release-lifecycle/#early-access-ea).
* At least one third-party IdP (OIDC or SAML) or Org2Org IdP configured and active in your org. See [Add an Identity Provider](/docs/guides/add-an-external-idp/).

---

## Overview

The identity claims sourcing policy enables federated users, who may not have authenticators enrolled in your org, to be redirected to their SSO IdP for re-authentication. Each org has one identity claims sourcing policy with one default rule. You can't create other policies or delete the default rule. You can only update the default rule's settings. When you enable the feature, Okta automatically creates a default identity claims sourcing policy and rule.

### How the identity claims sourcing policy works

When an app sign-in policy or Okta account management policy requires re-authentication, Okta prompts the user for a local Okta authenticator by default. Prompting to enroll local authenticators can be disruptive for federated users. That's because federated users typically authenticate with their IdP credentials instead of using Okta authenticators.

The identity claims sourcing policy improves the re-authentication user experience for federated users. When it's configured, it redirects federated users back to the SSO IdP that last established their most recent Okta session. The IdP handles re-authentication and returns the user to their app or resource with fresh authentication claims.

Federated users can access the app or resource without having to authenticate with or enroll in local Okta authenticators.

### What is re-authentication

Re-authentication happens when a user needs to verify their identity again after they've already signed in. Re-authentication is typically required when a user accesses a sensitive app or resource, or when a user's session has reached its maximum lifetime. You set re-authentication requirements in app sign-in policies or the Okta account management policy.

Local re-authentication means that Okta prompts the user to authenticate with authenticators that are configured in the org. That's the default behavior. For example, Okta prompts the user to authenticate with their password or Okta Verify instead of redirecting them to the SSO IdP. The identity claims sourcing policy enables users to re-authenticate with their IdP instead of through local re-authentication.

The identity claims sourcing policy only applies to re-authentication scenarios. To use it, ensure that you have a re-authentication requirement configured in an app sign-in policy or Okta account management policy.

### Identity claims sourcing with claims sharing

* If you have [claims sharing](/docs/guides/configure-claims-sharing/) configured with your IdP, the default identity claims sourcing rule allows redirection to the last known SSO IdP for re-authentication.
* If you don't have claims sharing configured, the default rule doesn't allow redirection, which maintains Okta's existing local re-authentication behavior.

## The claims sourcing policy and different types of IdPs

There are different behaviors and outcomes when you use the claims sourcing policy with external SSO IdPs versus Org2Org SSO IdPs.

### Example scenario with an Org2Org IdP

A company runs separate Okta orgs for its parent organization and each regional subsidiary. Regional employees sign in to their subsidiary org (the IdP org) and access a financial reporting app in the parent org (the SP org) through Org2Org federation. The app sign-in policy in the parent org requires re-authentication for users accessing sensitive financial data. Regional employees don't have local authenticators enrolled in the parent org.

The identity claims sourcing policy in the parent org has `refresh.redirectType` set to `FIXED`. No filter is configured, so Okta redirects any federated user to the last known and active SSO IdP that established their session: the subsidiary org.

If the parent org keeps the default `NONE` setting instead, Okta prompts regional employees for local authenticators during re-authentication. Okta prompts employees without local authenticators enrolled in the parent org to enroll in a local authenticator. The authenticators that are available to be enrolled depends on the app sign-in and authenticator enrollment policy.

### Example scenario with an external IdP

A healthcare company uses Microsoft Entra ID as their primary identity provider. Clinical staff sign in to Okta through an Entra ID SAML connection and access a medication management app. The app sign-in policy requires re-authentication every 60 minutes for compliance. Clinical staff don't have local Okta authenticators enrolled.

The identity claims sourcing policy has `refresh.redirectType` set to `FIXED` and includes a filter containing the Entra ID IdP. Only users whose last SSO IdP is Entra ID are redirected when re-authentication is required. After they re-authenticate in Entra ID, they're returned to Okta with fresh claims and can access the app.

If the policy is kept at the default `NONE` setting instead, Okta prompts clinical staff for local authenticators. Because clinical staff don't have local Okta authenticators enrolled, Okta prompts them to enroll an authenticator.

## Configure the identity claims sourcing policy

1. [Ensure that a re-authentication requirement is configured in an app sign-in policy or Okta account management policy.](#configure-a-re-authentication-requirement)
1. [Retrieve the default identity claims sourcing policy and rule IDs.](#get-the-policy-and-rule-ids)
1. [Update the rule to enable re-authentication.](#enable-idp-redirection-for-re-authentication)
1. [Test the configuration.](#test-the-configuration)

> **Note:** To configure the identity claims sourcing policy in the Admin Console, see [Redirect federated users to IdPs for re-authentication](https://help.okta.com/okta_help.htm?type=oie&id=idp-reauth).

### Configure a re-authentication requirement

Update an existing app sign-in policy or create one with a re-authentication requirement. Alternatively, you can configure re-authentication in an Okta account management policy.

Configure the re-authentication requirement with the Policies API by setting a value for the [`reauthenticateIn`](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/policy/other/createpolicyrule#other/createpolicyrule/t=request&path=&d=0/actions/appsignon/verificationmethod&d=0/reauthenticatein) parameter.

Alternatively, configure the re-authentication requirement in the Admin Console. Ensure that the **Prompt for authentication** setting is set to either of the following options:

* **Every time user signs in to resource:** Users must authenticate every time they try to access the app.
* **When it's been over a specified length of time since the user signed in to any resource protected by the active Okta global session:** Users are prompted to authenticate when they exceed the time interval that you specify.

> **Note:** When you select **Password + Another Factor** or **Password / IdP + Another factor** for authentication, **Prompt for password authentication**
and **Prompt for all other factors of authentication** appear as the re-authentication options. You can then set the re-authentication time intervals separately for password and non-password authenticators.

For this guide, set the re-authentication requirement to the second option and specify a one minute time interval to test the policy quickly.

These settings trigger the identity claims sourcing policy when a federated user tries to access the app after their session exceeds the specified time interval. See [Add an app sign-in policy rule](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-auth-policy).

### Get the policy and rule IDs

1. Retrieve the policy ID of the claims sourcing policy by using the List all policies [endpoint](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/listPolicies).
1. In the GET request, use the `type` query parameter with `IDENTITY_CLAIM_SOURCING` to filter for the claims sourcing policy.
1. See the following example request:

    ```bash
    curl -i -X GET \
    'https://{yourOktaDomain}/api/v1/policies?type=IDENTITY_CLAIM_SOURCING'
    ```

1. Copy the policy `id` from the response into a text editor.
1. See the following example response for the policy:

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

Then, retrieve the rule ID for the default rule.

1. Retrieve the rule ID of the claims sourcing policy by using the List all policy rules [endpoint](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/policy/other/listpolicyrules).
1. In the GET request, use the policy ID from the [previous step](#get-the-policy-and-rule-ids).
1. See the following example request:

    ```bash
    curl -i -X GET \
    'https://{yourOktaDomain}/api/v1/policies/{policyId}/rules'
    ```

1. Copy the rule `id` from the response into a text editor.
1. See the following example response for the policy rule:

    ```json
    [
    {
        "id": "rul971e5smrwQB7Tz0g7",
        "status": "ACTIVE",
        "name": "Catch-all rule",
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

### Enable IdP redirection for re-authentication

Two configuration options are available when you enable IdP redirection for re-authentication:

* `NONE` (default): Okta handles re-authentication locally, prompting the user for locally configured authenticators such as Okta Verify.
* `FIXED`: Okta redirects the user to the third-party SSO or Org2Org SSO IdP that last established their Okta session. Only active SSO IdPs can re-authenticate users. You can optionally configure a filter list of allowed SSO IdPs to limit which IdPs are eligible for redirect. If the IdP isn't in the filter list, the policy behaves as NONE.

Okta tracks which IdP most recently established the user's session. If you configure an include filter, Okta checks the user's last SSO IdP against the list at re-authentication time. If there's no match, the policy falls back to `NONE` for that user and Okta handles re-authentication locally. This means that if a user's last SSO IdP isn't in the filter, they must then authenticate with a local authenticator.

1. Update the default rule using the Replace a policy rule [endpoint](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/policy/other/replacepolicyrule).
1. In the path parameters of the request, use the policy ID and rule ID from the previous steps.
1. In the request body, set `refresh.redirectType` to `FIXED`. The `FIXED` value means that Okta redirects users to the IdP that last established their session when re-authentication is required.
1. See the following example request:

    ```bash
    curl -i -X PUT \
    'https://{yourOktaDomain}/api/v1/policies/{policyId}/rules/{ruleId}' \
    -H 'Content-Type: application/json' \
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

1. See the following example response for the updated rule:

    ```json
    {
    "id": "rulIdentityClaimSourcing",
    "name": "Catch-all rule",
    "status": "ACTIVE",
    "priority": 99,
    "created": "2026-02-17T15:12:42.000Z",
    "lastUpdated": "2026-02-19T20:59:00.000Z",
    "system": true,
    "type": "IDENTITY_CLAIM_SOURCING",
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
    }
    }
    ```

### Test the configuration

Test the configuration by signing in to the app that has the re-authentication requirement with a federated user. If the policy and rule are configured correctly, Okta redirects you to your most recent SSO IdP for re-authentication when the requirement triggers.

## See also

* [Configure a global session policy and an app sign-in policy](/docs/guides/configure-signon-policy/main/)
* [Configure an Okta account management policy](/docs/guides/okta-account-management-policy/main/)
