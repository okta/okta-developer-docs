---
title: Configure an Okta account management policy
excerpt: How to add rules to an Okta account management policy using the Policies API
layout: Guides
---

<ApiLifecycle access="ie" /></br>
<ApiLifecycle access="ea" />

This guide describes how to use the [Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/) and [Okta Expression Language](/docs/reference/okta-expression-language-in-identity-engine/) to configure rules for the Okta account management policy.

> **Note:** This document is only for Okta Identity Engine. See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version.

---

#### What you need

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* [Groups created](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Group/) in your org
* A configured [network zone](https://help.okta.com/okta_help.htm?id=ext_Security_Network)

---

## About the Okta account management policy

The Okta account management policy is a type of authentication policy. It defines the requirements when users enroll in authenticators, recover their passwords, and unlock their accounts. Its rule-based framework lets you enforce phishing resistance throughout the user journey, from onboarding to authentication and recovery.

The Okta account management policy appears in GET calls to the `/policies` endpoint. However, it's read-only. You can't create, update, or delete the policy. Disable the feature if you want to stop using it. Most importantly, you can't assign it to apps. This policy applies to Okta account management actions only.

You can use the Policy API to [manage the rules of the policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicyRule).

See [Okta account management policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-oamp) for details about configuring the policy in the Admin Console.

### Policy configuration

There are three primary use cases for the Okta account management policy. Each one adds a rule to the policy, so you can skip any that you don't need. However, if your org doesn't use phishing-resistant authenticators yet, start by enrolling your first phishing-resistant authenticator:

- [Add a rule for your first phishing-resistant authenticator](#add-a-rule-for-your-first-phishing-resistant-authenticator)
- [Add a rule for authenticator enrollment](#add-a-rule-for-authenticator-enrollment)
- [Add a rule for password recovery and account unlock](#add-a-rule-for-password-recovery-and-account-unlock)

You can also update rules to restore legacy processes. See [Use the legacy option](#use-the-legacy-option).

## Retrieve the Okta account management policy ID

Before you can create or update policy rules, you need the `id` of your Okta account management policy.

### Example policy ID request

To retrieve your Okta account management policy, make a GET request to the `/api/v1/policies` endpoint. Set the policy `type` parameter to `ACCESS_POLICY`:

```bash
curl -i -X GET \
  'https://subdomain.okta.com/api/v1/policies?type=ACCESS_POLICY' \
  -H 'Authorization: SSWS {apiToken}'
```

### Example response

The response includes all of your org's [authentication policies](/docs/concepts/policies/#authentication-policies) and the Okta account management policy. In the policy object, the value of the `_embedded.resourceType` parameter is `END_USER_ACCOUNT_MANAGEMENT` for your Okta account management policy. For authentication policies it's `APP`.

Use the value of the `id` parameter to manage the policy's rules. You can also use the `id` to retrieve the specific policy (GET `/api/v1/policies/{policyId}`).

```json
{
        "id": "rst5czs80uoZHaUxK0g7",
        "status": "ACTIVE",
        "name": "Okta Account Management Policy",
        "description": "This policy defines how users must authenticate for authenticator enrollment, password reset, or unlock account. Password policy rules control whether to enforce this policy for password reset and unlock account.",
        "priority": 1,
        "system": false,
        "conditions": null,
        "created": "2024-07-08T17:31:39.000Z",
        "lastUpdated": "2024-07-08T17:31:39.000Z",
        "_links": {
            "self": {
                "href": "https://{yourSubdomain}/api/v1/policies/rst5czs80uoZHaUxK0g7",
                "hints": {
                    "allow": [
                        "GET"
                    ]
                }
            },
            "rules": {
                "href": "https://{yourSubdomain}/api/v1/policies/rst5czs80uoZHaUxK0g7/rules",
                "hints": {
                    "allow": [
                        "GET",
                        "POST"
                    ]
                }
            }
        },
        "_embedded": {
            "resourceType": "END_USER_ACCOUNT_MANAGEMENT"
        },
        "type": "ACCESS_POLICY"
    }
```

## Use Expression Language in your requests

You can include an [Expression Language](/docs/reference/okta-expression-language-in-identity-engine/) Condition object in requests to add or update an Okta account management policy rule.

The policy allows for the following specific expressions:

| Syntax | Definitions | Type |
| ------ | ----------- | ---- |
| `accessRequest.{operation}`| `accessRequest` references the access context of the request. `operation` references the account management operation: `enroll`, `unenroll`, `recover`, or `unlockAccount`. | String |
| `accessRequest.authenticator.{id}` | `accessRequest` references the access context of the request. `authenticator.id` references an optional authenticator `id`, for example, the `id` of a custom authenticator. | String |
| `accessRequest.authenticator.{key}` | `accessRequest` references the access context of the request. `authenticator.key` references the [authenticator key](/docs/reference/api/policy/#authenticator-key-type-method-and-characteristic-relationships-for-constraints). | String |

### Condition Object example

```bash
"elCondition": {
    "condition": "accessRequest.operation == \'enroll\' && ( accessRequest.authenticator.key == \'okta_verify\' || accessRequest.authenticator.key == \'webauthn\' || accessRequest.authenticator.key == \'smart_card_idp\' || accessRequest.authenticator.key == \'yubikey_token\' )"
},
```

## Add a rule for your first phishing-resistant authenticator

Add this rule to your Okta account management policy if your org doesn't already use a phishing-resistant authenticator. After your users enroll their first phishing-resistant authenticator, you can require it for the other use cases.

If your org already uses phishing-resistant authenticators, see [Add a rule for authenticator enrollment](#add-a-rule-for-authenticator-enrollment).

> **Note:** This rule relies on [managed devices](https://support.okta.com/help/s/article/Howto-Get-a-List-of-All-Managed-and-NotManaged-Devices-in-Okta?language=en_US) and [IP Network Zones](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/NetworkZone/).

If you want to add this rule using the Admin Console, see [Add a rule for your first phishing-resistant authenticator](https://help.okta.com/okta_help.htm?type=oie&id=ext-oamp-enroll-first).

### Example rule request

Send a POST request to the `/api/v1/policies/{policyId}/rules` endpoint. Consider the following:

* Use the value of `id` from the [GET call](#retrieve-the-okta-account-management-policy-id) as the value of `policyId` in your request.
* Set the value of `priority` to `1`.
* Set values for `network.connection` and `network.include`.
* Set the value of `device.managed` to `true`.

```bash
curl --location --globoff 'https://{yourOktaDomain}/api/v1/policies/{policyId/rules?activate=true' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header 'Authorization: SSWS {apiToken}' \
--data '{
    "system": false,
    "type": "ACCESS_POLICY",
    "id": "rul2p9xACRTDf9qZV0g4",
    "name": "Test rule",
    "priority": 1,
    "status": "ACTIVE",
    "created": "2024-07-16T20:27:25.000Z",
    "lastUpdated": "2024-07-16T20:27:25.000Z",
    "conditions": {
        "userType": {
            "include": [],
            "exclude": []
        },
        "network": {
          "connection": "ZONE",
          "include": [
            "nzo5dtwhzly9mXvlN0g7"
            ]
        },
        "people": {
            "users": {
                "exclude": [],
                "include": []
            },
            "groups": {
                "include": [],
                "exclude": []
            }
        },
        "device": {
            "registered": true,
            "managed": true
        },
        "riskScore": {
            "level": "LOW"
        },
        "elCondition": {
            "condition": "accessRequest.operation == \'enroll\' && ( accessRequest.authenticator.key == \'okta_verify\' || accessRequest.authenticator.key == \'webauthn\' || accessRequest.authenticator.key == \'smart_card_idp\' || accessRequest.authenticator.key == \'yubikey_token\' )"
        },
        "platform": {
            "include": []
        }
    },
    "actions": {
        "appSignOn": {
            "access": "ALLOW",
            "verificationMethod": {
                "factorMode": "2FA",
                "reauthenticateIn": "PT0S",
                "constraints": [
                    {
                        "possession": {
                            "userPresence": "OPTIONAL"
                        }
                    }
                ],
                "type": "ASSURANCE"
            }
        }
    },
    "initialMode": false,
    "_links": {
        "self": {
            "href": "https://brent-stellar-org.trexcloud.com/api/v1/policies/rst1k0mWSjjvYzqQv0g4/rules/rul2p9xACRTDf9qZV0g4",
            "hints": {
                "allow": [
                    "GET",
                    "PUT",
                    "DELETE"
                ]
            }
        },
        "deactivate": {
            "href": "https://brent-stellar-org.trexcloud.com/api/v1/policies/rst1k0mWSjjvYzqQv0g4/rules/rul2p9xACRTDf9qZV0g4/lifecycle/deactivate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}'
```

### User experience

Users must be on a managed device, inside a trusted network zone, and demonstrate low risk behavior before they enroll the designated phishing-resistant authenticator. If they don't meet these requirements, all fields in their profile settings are read-only, including the Reset, Update, and Remove options for their existing security methods. The phishing-resistant authenticators that they haven't enrolled are hidden, which means that they can't access any apps with phishing-resistant authentication policies.

This rule also applies to authenticator unenrollment, and users can lock themselves out if they unenroll too many authenticators. Encourage users to always maintain one phishing-resistant authenticator.

## Add a rule for authenticator enrollment

Add this rule to build phishing resistance into your authenticator enrollment process. When this rule is active, users must provide a phishing-resistant authenticator when they enroll other authenticators and when they unenroll one. If your org doesn't use phishing-resistant authenticators yet, start with [Add a rule for your first phishing-resistant authenticator](#add-a-rule-for-your-first-phishing-resistant-authenticator).

> **Note:** All users in your org must be eligible to use the phishing-resistant authenticators. See [Profile enrollment policies](/docs/concepts/policies/#profile-enrollment-policies).

This request is similar to the request to [add a rule](#example-rule-request) for your first phishing-resistant authenticator. However, keep in mind the following:

* Use the same value for `policyId`.
* Set the value of `priority` above the catch-all rule but below the first [phishing-resistant authenticator](#add-a-rule-for-your-first-phishing-resistant-authenticator) (if you added it). Make sure that the first phishing-resistant authenticator rule stays at priority 1.
* Use the same Expression Language conditions.
* Your user doesn't need a managed device.
* Your user doesn't need to sign in from a network zone.

If you want to add this rule using the Admin Console, see [Add a rule for authenticator enrollment](https://help.okta.com/okta_help.htm?type=oie&id=ext-oamp-enroll-pr-auth).

### User experience

The user experience for this process doesn't change, except that the users' authenticator choices are limited to the phishing-resistant options. Consider these two scenarios:

- Users who are currently activated with a single factor can't enroll new authenticators or sign in to apps that require MFA. Refer to this task's prerequisite.
- Users can lock themselves out if they unenroll too many authenticators. Inform your users that they must keep one phishing-resistant authenticator enrolled always.
If a user doesn't meet the requirements of your Okta account management policy, they can't update their profile settings. All fields are read-only, including the Reset, Update, and Remove options for their existing security methods. Also, the authenticators that they haven't enrolled are hidden.

## Add a rule for password recovery and account unlock

Add this rule to require phishing resistant authenticators when users reset their passwords or unlock their accounts.

Traditionally, the password policy controls the authentication requirements for these self-service processes. If you're not ready to switch to phishing resistance for one or both of these processes, you can continue using the password policy.

> **Note:** All users in your org must be eligible to use the phishing-resistant authenticators. See [Add a rule for authenticator enrollment](#add-a-rule-for-authenticator-enrollment).

If you want to add this rule using the Admin Console, see [Add a rule for authenticator enrollment](https://help.okta.com/okta_help.htm?type=oie&id=ext-oamp-enroll-pr-auth).

### Update your password policy

Before you add this rule, change the access control settings in your [password policy](/docs/concepts/policies/#password-policies).

Send a PUT request to the `/api/v1/policies/{policyId}/rules/{ruleId}` endpoint. Include the following parameters in the request body:

- `"accessControl": "AUTH_POLICY"`
- `"type": "PASSWORD"`

Repeat for any other password policy rules.

> **Note:** For each rule, verify that `selfServicePasswordReset` and `selfServiceUnlock` are set to `ALLOW`. If they aren't, add a rule that specifically allows them. New rules that you add to your org default to `"accessControl": "AUTH_POLICY"`.

```bash
curl --location --request PUT '{yourSubdomain}/api/v1/policies/{policyId}/rules/{ruleId}' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: SSWS {apiToken}' \
--data '{
    "id": "{ruleId}",
    "name": "sdfsd",
    "priority": 1,
    "status": "ACTIVE",
    "conditions": {
        "people": {
            "users": {
                "exclude": []
            }
        },
        "network": {
            "connection": "ANYWHERE"
        }
    },
    "actions": {
        "passwordChange": {
            "access": "ALLOW"
        },
        "selfServicePasswordReset": {
            "access": "ALLOW",
            "requirement": {
                "primary": {
                    "methods": [
                        "email"
                    ]
                },
                "stepUp": {
                    "required": false
                },
                "accessControl": "AUTH_POLICY"
            }
        },
        "selfServiceUnlock": {
            "access": "ALLOW"
        }
    },
    "system": false,
    "type": "PASSWORD"
}'
```

### Example password policy update request

Continue to use the same value for `policyId`.

Set the value of `priority` above the catch-all rule but below the first [phishing-resistant authenticator](#add-a-rule-for-your-first-phishing-resistant-authenticator) (if you added it). Make sure that the first phishing-resistant authenticator rule stays at priority 1.

See [Add a rule for authenticator enrollment](#add-a-rule-for-authenticator-enrollment).

### User experience

There are no changes to the user experience when you move password recovery and account unlock to the account management policy. However, be aware of how the account management policy works with the following features:

- [Stay signed in](https://help.okta.com/okta_help.htm?type=oie&id=ext-stay-signed-in): Works with the account management policy if you configure the authentication frequency correctly. The **Prompt for authentication** setting must be more frequent than the equivalent setting in your Okta Dashboard authentication policy. Setting **Prompt for authentication** in your Okta account management policy to every time ensures that users don't have to wait to reset a password.
- [User enumeration prevention](https://help.okta.com/okta_help.htm?type=oie&id=ext_Security_General): Isn't supported in recovery scenarios with the Okta account management policy.
If a user doesn't meet the requirements of your Okta account management policy, they can't update their profile settings. All fields are read-only, including the Reset, Update, and Remove options for their existing security methods. Also, the authenticators that they haven't enrolled are hidden.

## Use the legacy option

You might want to use the Okta account management policy for some processes but not for others. For example, you want to use the Okta account management policy for authenticator enrollment. However, for self-service password recovery, you want to keep using your password policy.

Update a password policy rule to set the value of `accessControl` to `LEGACY`:

```bash
curl --location --request PUT 'http://devorg1.okta1.com:1802/api/v1/policies/{policyId}/rules/{ruleId}' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: SSWS {apiToken}' \
--data '{
    "id": "<RULE_ID>",
    "name": "sdfsd",
    "priority": 1,
    "status": "ACTIVE",
    "conditions": {
        "people": {
            "users": {
                "exclude": []
            }
        },
        "network": {
            "connection": "ANYWHERE"
        }
    },
    "actions": {
        "passwordChange": {
            "access": "ALLOW"
        },
        "selfServicePasswordReset": {
            "access": "ALLOW",
            "requirement": {
                "primary": {
                    "methods": [
                        "email"
                    ]
                },
                "stepUp": {
                    "required": false
                },
                "accessControl": "LEGACY"
            }
        },
        "selfServiceUnlock": {
            "access": "ALLOW"
        }
    },
    "system": false,
    "type": "PASSWORD"
}'
```

## See also

- [Policies](/docs/concepts/policies/)
- [Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/)
- [Configure a global session policy and authentication policies](/docs/guides/configure-signon-policy/main/)
