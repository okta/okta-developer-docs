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

The identity claims sourcing policy enables federated users, who may not have authenticators enrolled in your org, to be redirected to an IdP for re-authentication. Each org has one identity claims sourcing policy with one default rule. You can't create other policies or delete the default rule. You can only update the default rule's settings. When you enable the feature, Okta automatically creates a default identity claims sourcing policy and rule.

### How the identity claims sourcing policy works

When an app sign-in policy or Okta account management policy requires re-authentication, Okta prompts the user for a local Okta authenticator by default. Prompting to enroll local authenticators can be disruptive for federated users. That's because federated users typically authenticate with their IdP credentials instead of using Okta authenticators.

The identity claims sourcing policy improves the re-authentication user experience for federated users. When it's configured, it redirects federated users to an IdP. That IdP is the SSO IdP that last established their most recent Okta session, a specific IdP that you choose, or the IdP that your IdP routing rules select. The IdP handles re-authentication and returns the user to their app or resource with fresh authentication claims.

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

A company runs separate Okta orgs for its parent org and each regional subsidiary. Regional employees sign in to their subsidiary org (the IdP org) and access a financial reporting app in the parent org (the SP org) through Org2Org federation. The app sign-in policy in the parent org requires re-authentication for users accessing sensitive financial data. Regional employees don't have local authenticators enrolled in the parent org.

The identity claims sourcing policy in the parent org has `refresh.redirectType` set to `FIXED`. No filter is configured, so Okta redirects any federated user to the last known and active SSO IdP that established their session: the subsidiary org.

If the parent org keeps the default `NONE` setting instead, Okta prompts regional employees for local authenticators during re-authentication. Okta prompts employees without local authenticators enrolled in the parent org to enroll in a local authenticator. The authenticators that are available to be enrolled depends on the app sign-in and authenticator enrollment policy.

### Example scenario with an external IdP

A healthcare company uses Microsoft Entra ID as their primary identity provider. Clinical staff sign in to Okta through an Entra ID SAML connection and access a medication management app. The app sign-in policy requires re-authentication every 60 minutes for compliance. Clinical staff don't have local Okta authenticators enrolled.

The identity claims sourcing policy has `refresh.redirectType` set to `FIXED` and includes a filter that contains the Entra ID IdP. Only users whose last SSO IdP is Entra ID are redirected when re-authentication is required. After they re-authenticate in Entra ID, they're returned to Okta with fresh claims and can access the app.

If the policy is kept at the default `NONE` setting instead, Okta prompts clinical staff for local authenticators. Because clinical staff don't have local Okta authenticators enrolled, Okta prompts them to enroll an authenticator.

## Configure the identity claims sourcing policy

1. [Configure a re-authentication requirement in an app sign-in policy or Okta account management policy.](#configure-a-re-authentication-requirement)
1. [Retrieve the default identity claims sourcing policy and rule IDs.](#get-the-policy-and-rule-ids)
1. [Update the rule to enable re-authentication.](#enable-idp-redirection-for-re-authentication)
1. [Test the configuration.](#test-the-configuration)

> **Note:** To configure the identity claims sourcing policy in the Admin Console, see [Redirect federated users to IdPs for re-authentication](https://help.okta.com/okta_help.htm?type=oie&id=idp-reauth).

### Configure a re-authentication requirement

Update an existing app sign-in policy or create one with a re-authentication requirement. Alternatively, you can configure re-authentication in an Okta account management policy.

Configure the re-authentication requirement with the Policies API by setting a value for the [`reauthenticateIn`](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/policy/other/createpolicyrule#other/createpolicyrule/t=request&path=&d=0/actions/appsignon/verificationmethod&d=0/reauthenticatein) parameter.

Alternatively, configure the re-authentication requirement in the Admin Console:

1. In the Admin Console, go to **Security** > **Authentication Policies**.
1. In this example, click **App sign-in** to update one of your app sign-in policies. You can also click **Okta account management** to update that policy instead.
1. Select a policy to update.
1. Click **Add Rule** to create a new rule with a re-authentication requirement, or select an existing rule to edit.
1. Ensure that the **Prompt for authentication** setting is set to either of the following options:

    * **Every time user signs in to resource:** Users must authenticate every time they try to access the app.
    * **When it's been over a specified length of time since the user signed in to any resource protected by the active Okta global session:** Users are prompted to authenticate when they exceed the time interval that you specify.

    > **Note:** When you select **Password + Another Factor** or **Password / IdP + Another factor** for authentication, **Prompt for password authentication** and **Prompt for all other factors of authentication** appear as the re-authentication options. You can then set the re-authentication time intervals separately for password and non-password authenticators.

1. In this example, set the re-authentication requirement to the second option and specify a one minute time interval to test the policy quickly.

These settings trigger the identity claims sourcing policy when a federated user tries to access the app after their session exceeds the specified time interval. See [Add an app sign-in policy rule](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-auth-policy).

### Get the policy and rule IDs

1. Retrieve the policy ID of the claims sourcing policy by using the List all policies [endpoint](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/listPolicies).
1. In the GET request, use the `type` query parameter with `IDENTITY_CLAIM_SOURCING` to filter for the claims sourcing policy. Ensure that your GET request is structured like the following example.

    ```bash
    curl -i -X GET \
    'https://{yourOktaDomain}/api/v1/policies?type=IDENTITY_CLAIM_SOURCING'
    ```

1. Copy the policy `id` from the response into a text editor. A successful response returns the default claims sourcing policy and is structured like the following example:

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

1. Retrieve the rule ID of the claims sourcing policy by using the List all policy rules [endpoint](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/policy/other/listpolicyrules).
1. In the GET request, use the policy ID from the [previous step](#get-the-policy-and-rule-ids) as the `policyId` path parameter. Ensure that your GET request is structured like the following example:

    ```bash
    curl -i -X GET \
    'https://{yourOktaDomain}/api/v1/policies/{policyId}/rules'
    ```

1. Copy the rule `id` from the response into a text editor. A successful response returns an array of policy rules for the identity claims sourcing policy and is structured like the following example:

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

Set `refresh.redirectType` to one of the following options to configure where Okta sends users to re-authenticate:

* `NONE` (default): Okta doesn't redirect the user to an IdP. If the app sign-in policy or Okta account management policy requires the user to re-enter their password, the user sees an error and can't continue. Okta can't verify a federated user's password. If the app sign-in policy or Okta account management policy requires only other authenticators, Okta prompts the user for them locally, such as Okta Verify.
* `FIXED`: Okta redirects the user to the third-party SSO or Org2Org SSO IdP that last established their Okta session. Only active SSO IdPs can re-authenticate users. You can optionally configure a filter list to limit which IdPs are eligible for redirect. If the IdP isn't eligible, the policy behaves as `NONE`.
* `SPECIFIC`: Okta redirects all users to the IdP that you specify, regardless of the IdP they used to sign in. See [Redirect users to a specific IdP](#redirect-users-to-a-specific-idp).
* `IDP_DISCOVERY`: Okta redirects users to the IdP that your IdP routing rules select. See [Redirect users with IdP routing rules](#redirect-users-with-idp-routing-rules).

For `FIXED`, Okta tracks which IdP most recently established the user's session. If you configure an `include` filter, Okta checks the user's last SSO IdP against the list at re-authentication time. If there's no match, the policy behaves as `NONE` for that user. This means that if a user's last SSO IdP isn't in the filter, they see an error when the app sign-in policy or Okta account management policy requires them to re-enter their password. If the app sign-in policy or Okta account management policy requires only other authenticators, Okta prompts the user for them locally.

To exclude IdPs instead, add them to the `exclude` list. An IdP in the `exclude` list isn't eligible for redirect. You can't add the same IdP to both the `include` and `exclude` lists. If the `include` list is empty, all IdPs that aren't excluded are eligible.

1. Update the default rule using the Replace a policy rule [endpoint](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/policy/other/replacepolicyrule).
1. In the path parameters of the PUT request, use the policy ID and rule ID from the previous steps.
1. In the request body, set `refresh.redirectType` to `FIXED`. The `FIXED` value means that Okta redirects users to the IdP that last established their session when re-authentication is required. Ensure that your PUT request is structured like the following example:

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

A successful response returns the updated policy rule and is structured like the following example:

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

### Redirect users to a specific IdP

To send all users to one IdP for re-authentication, set `refresh.redirectType` to `SPECIFIC` and add exactly one IdP to the `filter.include` list. The IdP must be an active SSO IdP (OIDC, SAML2, or Org2Org). Okta rejects inactive IdPs and non-SSO IdPs such as Persona or Smart Card. You can't use `filter.exclude` with `SPECIFIC`.

If you deactivate or delete the specified IdP, Okta removes it from the rule and the `filter.include` list is empty. Users can't re-authenticate until you add another active SSO IdP, and the fallback doesn't apply.

You can set `refresh.fallback.redirectType` for `SPECIFIC`, but it doesn't apply when the IdP is removed from the rule.

```json
"actions": {
    "claimSourcing": {
        "redirectType": "IDP_DISCOVERY",
        "refresh": {
            "redirectType": "SPECIFIC",
            "filter": {
                "include": [
                    {
                        "id": "idpId1",
                        "name": "idpName1"
                    }
                ]
            },
            "fallback": {
                "redirectType": "MOST_RECENT_ACTIVE_SSO"
            }
        }
    }
}
```

### Redirect users with IdP routing rules

To use your existing [IdP routing rules](https://help.okta.com/okta_help.htm?type=oie&id=ext-cfg-routing-rules) to select the IdP, set `refresh.redirectType` to `IDP_DISCOVERY`. Okta evaluates the routing rules for the user and the app, and redirects the user to the first IdP that the rules return. You don't configure a `filter` for this option.

If the routing rules don't return an IdP, Okta uses the `refresh.fallback.redirectType` value. Set it to `MOST_RECENT_ACTIVE_SSO` to redirect the user to the SSO IdP that last established their Okta session, or to `NONE`. With `NONE`, a federated user sees an error when the app sign-in policy or Okta account management policy requires them to re-enter their password. If the app sign-in policy or Okta account management policy requires only other authenticators, Okta prompts the user for them locally. If you don't specify a fallback, the behavior is the same as `NONE`.

```json
"actions": {
    "claimSourcing": {
        "redirectType": "IDP_DISCOVERY",
        "refresh": {
            "redirectType": "IDP_DISCOVERY",
            "fallback": {
                "redirectType": "NONE"
            }
        }
    }
}
```

> **Note:** You can set `refresh.fallback` only when `refresh.redirectType` is `SPECIFIC` or `IDP_DISCOVERY`.

### Test the configuration

Test the configuration by signing in to the app that has the re-authentication requirement with a federated user. If the policy and rule are configured correctly, Okta redirects you to the IdP that your `refresh.redirectType` setting selects when the requirement triggers.

## See also

* [Configure a global session policy and an app sign-in policy](/docs/guides/configure-signon-policy/main/)
* [Configure an Okta account management policy](/docs/guides/okta-account-management-policy/main/)
