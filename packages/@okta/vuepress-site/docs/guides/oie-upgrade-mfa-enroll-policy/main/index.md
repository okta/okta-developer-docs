---
title: Understand authenticator enrollment policy API changes after the upgrade
meta:
  - name: description
    content: Manage authenticator enrollment policies with the Policy API in Okta Identity Engine.
---

<ApiLifecycle access="ie" />

## Overview

Okta Identity Engine separates factors from authenticators to align with industry standards:

- Identity Engine uses authenticators in the settings for its authenticator enrollment policy.
- Classic Engine uses factors in the settings for its multifactor (MFA) enrollment policy.

In Identity Engine, the MFA Enrollment Policy is now the [authenticator enrollment policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy). Classic Engine still calls the same policy the [Multifactor (MFA) Enrollment Policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy). The API policy type `MFA_ENROLL` stays the same, but the `settings` data now contains authenticators or factors, depending on your configuration.

After you upgrade your org to Identity Engine, keep these points in mind:

- New authenticator enrollment policies that you create in the Admin Console use authenticators.
- Existing authenticator enrollment policies from before the upgrade still use factors.
- When you save an existing policy in the Admin Console, Okta converts its factors to authenticators automatically.

> **Note:** When you edit an authenticator enrollment policy and click **Update Policy** in the Admin Console, Okta converts its factors to authenticators.

If your code manages authenticator enrollment policies through the [Policy API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy), update it for the factor-to-authenticator conversion. This guide covers the key API considerations for upgrading your multifactor enrollment flows in Identity Engine.

## Authenticator enrollment policy API changes in Identity Engine

Identity Engine changes authenticator enrollment policy behavior in these ways:

- The Policy API supports both factor and authenticator schemas in the [settings](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy!path=2/settings/authenticators&t=request) for the authenticator enrollment policy.
- New authenticator enrollment policies contain either factors or authenticators in their settings. The two schemas are mutually exclusive.
- Existing authenticator enrollment policies, meaning policies you created before the Identity Engine upgrade, still contain factors in their settings.
- When you modify a policy from the Admin Console of an Identity Engine org, Okta converts its factors to authenticators in the settings.

> **Note:** If your Identity Engine org has the authenticator enrollment policy feature enabled, Okta's new default policy uses the authenticators setting schema. Default policies from a migrated org keep the factors setting schema. To switch a default policy to the authenticators schema, open it in the Admin Console and convert the settings from factors to authenticators.

### Recovery authenticators

In Identity Engine, authenticator-based authenticator enrollment policies can govern recovery authenticator enrollment for the password recovery flow. Factor-based policies don't support this feature.

Both the password policy and the authenticator enrollment policy govern the enrollment of recovery authenticators: Email, Phone, Okta Verify, and Security Question. For example, suppose the Email authenticator is `Required` in the authenticator enrollment policy. Email enrollment becomes mandatory for recovery even if the password policy doesn't require it.

> **Note:** Password policy recovery authenticator settings override the authenticator enrollment policy settings. For example, the phone authenticator might be `Optional` or `Disabled` in the authenticator enrollment policy but `Required` in the password policy. In that case, phone enrollment becomes mandatory for the password recovery flow.

See [password policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy) and [Configure password policies](https://help.okta.com/okta_help.htm?type=oie&id=csh-configure-password) to configure the password policy in the Admin Console.

## Get authenticator enrollment policies

To parse a `GET /api/v1/policies?type=MFA_ENROLL` response, check whether the returned policy contains `authenticators` or `factors` in the [settings schema](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy!path=2/settings&t=request).

> **Note:** You can also spot an authenticator-based policy by `type=AUTHENTICATORS` in the [settings schema](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy!path=2/settings&t=request). Factor-based policies often omit the `type` property entirely.

If the policy uses `authenticators`, loop through the list of [policy authenticator objects](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy!path=2/settings/authenticators&t=request) and use the `key` property to identify each authenticator. See the [Authenticators API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Authenticator/) for the full list of authenticators available in your org.

If the policy uses `factors`, loop through every [policy factor configuration object](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy!path=2/settings/authenticators/key&t=request), the same way your app already does.

Response example of an authenticator enrollment policy `settings` snippet with authenticators:

```json
"settings": {
  "type": "AUTHENTICATORS",
  "authenticators": [
    {
      "key": "security_question",
      "enroll": {
        "self": "OPTIONAL"
      }
    },
    {
      "key": "phone_number",
      "enroll": {
        "self": "REQUIRED"
      }
    }
  ]
}
```

Response example of an authenticator enrollment policy `settings` snippet with factors:

```json
"settings": {
  "factors": {
    "okta_question": {
      "enroll": {
        "self": "OPTIONAL"
      },
      "consent": {
        "type": "NONE"
      }
    },
    "okta_sms": {
      "enroll": {
        "self": "REQUIRED"
      },
      "consent": {
        "type": "NONE"
      }
    }
  }
}
```

## Create an authenticator enrollment policy

To create an authenticator enrollment policy, use the [Create a Policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy) API operation with `type=MFA_ENROLL`. In the request body, provide the `settings` schema with either [policy authenticator objects](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy!path=2/settings/authenticators&t=request) or [policy factor configuration objects](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy!path=2/settings/authenticators/key&t=request).

To set the list of authenticators for the policy, use the [Authenticators API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Authenticator/#tag/Authenticator/operation/listAuthenticators).

You can also create a policy with factors instead of authenticators, to support legacy systems or workflows. Set the policy `settings` to the factors schema with [policy factor configuration objects](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy!path=2/settings/authenticators/key&t=request).

> **Note:** Configure the remaining policy parameters as described in the [Create a Policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy) API operation.

## Update an authenticator enrollment policy

To update a policy, use the [Update a Policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/replacePolicy) API operation with `PUT /api/v1/policies/{policyId}`. In the request body, provide the `settings` schema with either [policy authenticator objects](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy!path=2/settings/authenticators&t=request) or [policy factor configuration objects](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy!path=2/settings/authenticators/key&t=request).

> **Note:** Configure the remaining policy parameters as described in the [Update a Policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/replacePolicy) API operation. This section covers only the `settings` parameter for the authenticator enrollment policy.

To convert an existing factor-based policy to use authenticators, update the policy's `settings` parameter with authenticators. Use the [Policy Factors Configuration object and Authenticator keys mapping](#policy-factors-configuration-object-and-authenticator-keys-mapping) table to map each factor to its authenticator key, and see the [settings conversion example](#authenticator-enrollment-policy-settings-conversion-example).

You can also revert an authenticator-based policy to the factor-based model. To convert the authenticator keys back to Policy Factor Configuration objects, see:

* [Policy factor configuration objects](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy!path=2/settings/authenticators/key&t=request)
* [Policy Factors Configuration object and Authenticator keys mapping](#policy-factors-configuration-object-and-authenticator-keys-mapping)

> **Note:** Your app might integrate with a system, such as Terraform, that can't parse the authenticators-based schema. If so, revert your policy to use factors instead.

## Policy Factors Configuration object and Authenticator keys mapping

| Policy Factors Configuration object | Authenticator keys       |
| --------- | ----------- |
| okta_sms<br>okta_voice  | `phone_number` |
| okta_otp<br>okta_push   | `okta_verify`  |
| okta_question           | `security_question` |
| okta_email              | `email`  |
| duo                     | `duo`  |
| fido_webauthn           | `security_key`  |
| rsa_token               | n/a  |
| sympantec_vip           | n/a  |
| yubikey_token           | n/a  |

### Authenticator enrollment policy settings conversion example

This example shows the `settings` schema conversion from a factor-based to an authenticator-based enrollment policy.

Original authenticator enrollment policy with factor settings:

```json
 "settings": {
    "factors": {
        "okta_question": {
            "enroll": {
                "self": "OPTIONAL"
            },
            "consent": {
                "type": "NONE"
            }
        },
        "okta_otp": {
            "enroll": {
                "self": "OPTIONAL"
            },
            "consent": {
                "type": "NONE"
            }
        }
    }
}
```

Converted authenticator enrollment policy with authenticator settings:

```json
"settings": {
    "type": "AUTHENTICATORS",
    "authenticators": [
        {
            "key": "security_question",
            "enroll": {
                "self": "OPTIONAL"
            }
        },
        {
            "key": "okta_verify",
            "enroll": {
                "self": "OPTIONAL"
            }
        }
    ]
}
```

## Related topics

* [Audit your Classic API dependencies](/docs/guides/oie-upgrade-audit-classic-api-dependencies/)
