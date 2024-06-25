---
title: Understand authenticator enrollment policy API changes after the upgrade
meta:
  - name: description
    content: Learn how to use and manage the authenticator enrollment policies with the API in Okta Identity Engine.
---

<ApiLifecycle access="ie" />

## Overview

With Okta Identity Engine, the definition of factors and authenticators have been differentiated to align with industry standards. Identity Engine uses authenticators in its authenticator enrollment policy settings, whereas Okta Classic Engine uses factors in its Multifactor (MFA) enrollment policy settings.

In Identity Engine, the MFA Enrollment Policy name has changed to [authenticator enrollment policy](/docs/reference/api/policy/#authenticator-enrollment-policy). Classic Engine still refers to the same policy as [Multifactor (MFA) Enrollment Policy](/docs/reference/api/policy/#multifactor-mfa-enrollment-policy). In the API, the policy type of `MFA_ENROLL` remains unchanged, however, the `settings` data contains authenticator or factors, depending on the configuration.

After upgrading your org to Identity Engine, new authenticator enrollment policies created in the Admin Console are configured using authenticators. Authenticator enrollment policies created before upgrading to Identity Engine, are still configured with factors. However, if an existing policy was saved in the Admin Console, the factors in that policy are converted to authenticators. This conversion is seamless to admin users that are managing policies in the Admin Console.

> **Note:** Whether you edit the authenticator enrollment policy or not, when you click the **Update Policy** button in the Admin Console, the factor-to-authenticator conversion occurs.

For existing code that manages and uses authenticator enrollment policies programmatically through the [Policy API](/docs/reference/api/policy/), some development work is required to handle the factor to authenticator conversion schema changes after the org upgrades to Identity Engine. This guide provides you with key API considerations to upgrade your app for multifactor enrollment flows in Identity Engine.

## Authenticator enrollment policy API changes in Identity Engine

The following are the main behavior changes to the [authenticator enrollment policy](/docs/reference/api/policy/#authenticator-enrollment-policy) in Identity Engine:

- The Policy API supports both factors and authenticators schemas in the authenticator enrollment policy [settings](/docs/reference/api/policy/#policy-settings-data-2).
- Authenticator enrollment policies are created with either factors or authenticators in their settings (they are mutually exclusive).
- Existing authenticator enrollment policies (that is, policies created before the Identity Engine upgrade) still contain factors in their settings.
- For authenticator enrollment policies modified from the Admin Console of an Identity Engine org, existing factors are converted to authenticators in their settings.

> **Note:** For Identity Engine orgs with the Authenticator enrollment policy feature enabled, the new default authenticator enrollment policy created by Okta uses the authenticators setting schema. Existing default authenticator enrollment policies from a migrated org remain unchanged and still use the factors setting schema. If you want the default policy to use the authenticators setting schema, then modify the default policy from the Admin Console to convert the settings from factors to authenticators.

### Recovery authenticators

In Identity Engine, you can use authenticator-based authenticator enrollment policies to govern recovery authenticator enrollment for the password recovery flow. This feature isn't available for factor-based authenticator enrollment policies.

The enrollment for recovery authenticators (Email, Phone, Okta Verify, and Security question) are governed by both the password policy and the authenticator enrollment policy. For example, if the Email authenticator is enabled and set to `Required` in the authenticator enrollment policy, then email enrollment is required for recovery even if it isn't required in the password policy.

> **Note:** Password policy recovery authenticator settings supersedes authenticator enrollment policy settings. For example, if the Phone authenticator is `Optional` or `Disabled` for the authenticator enrollment policy, but `Required` for the password policy, then phone enrollment is required for the password recovery flow.

See [password policy](/docs/reference/api/policy/#password-policy) and [Configure password policies](https://help.okta.com/okta_help.htm?type=oie&id=csh-configure-password) for details on how to configure the password policy in the Admin Console.

## Get authenticator enrollment policies

To parse a response from the `GET /api/v1/policies?type=MFA_ENROLL` request, you must determine if the returned authenticator enrollment policy contains either `authenticators` or `factors` in the [settings schema](/docs/reference/api/policy/#policy-settings-data-2).

> **Note:** Another indicator of an authenticator-based enrollment policy is when `type=AUTHENTICATORS` in the [settings schema](/docs/reference/api/policy/#policy-settings-data-2). The `type` property could be absent from the response of factor-based authenticator enrollment policies.

If the returned policy uses `authenticators`, you need to loop through the list of [Policy Authenticator objects](/docs/reference/api/policy/#policy-authenticator-object) and use the `key` property to identify the authenticator. See the [Authenticators API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Authenticator/) for more details on the available authenticators in your org.

If the returned policy uses `factors`, you need to loop through every type of [Policy Factor Configuration object](/docs/reference/api/policy/#policy-factors-configuration-object), as you've done previously for your app.

Example of an authenticator enrollment policy response `settings` snippet with authenticators:

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

Example of an authenticator enrollment policy response `settings` snippet with factors:

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

To create an authenticator enrollment policy through the [Policy API](/docs/reference/api/policy/), you need to provide the `settings` schema with either the list of [Policy Authenticator objects](/docs/reference/api/policy/#policy-authenticator-object) or [Policy Factors Configuration objects](/docs/reference/api/policy/#policy-factors-configuration-object) in the `POST /api/v1/policies` request body parameters.

For a new authenticator enrollment policy in Identity Engine, use the [Create a Policy](/docs/reference/api/policy/#create-a-policy) API operation. Set the list of authenticators for the policy by using the [Authenticators API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Authenticator/) to list the available authenticators in your org.

You can also create a new authenticator enrollment policy with factors instead of authenticators to support legacy systems or workflows. Set the policy `settings` to the factors schema with [Policy Factor Configuration objects](/docs/reference/api/policy/#policy-factors-configuration-object).

> **Note:** You need to configure the other policy parameters according to the [Create a Policy](/docs/reference/api/policy/#create-a-policy) API operation. Specifically, you need to include the `type=MFA_ENROLL` parameter for an authenticator enrollment policy.

## Update an authenticator enrollment policy

To update an authenticator enrollment policy through the [Update a Policy](/docs/reference/api/policy/#update-a-policy) API operation, you need to provide the `settings` schema with either the list of [Policy Authenticator objects](/docs/reference/api/policy/#policy-authenticator-object) or [Policy Factors Configuration objects](/docs/reference/api/policy/#policy-factors-configuration-object) in the `PUT /api/v1/policies/{policyId}` request body parameters.

> **Note:** You need to configure the other policy parameters according to the [Update a Policy](/docs/reference/api/policy/#update-a-policy) API operation. This section focuses on the `settings` parameter required specifically for the authenticator enrollment policy.

If you need to convert an existing factor-based authenticator enrollment policy to use authenticators, then update the policy with authenticators in the `settings` parameter. Use the [Policy Factors Configuration object and Authenticator keys mapping](#policy-factors-configuration-object-and-authenticator-keys-mapping) table to map Policy Factors Configuration objects to authenticator keys. See [Authenticator enrollment policy settings conversion example](#authenticator-enrollment-policy-settings-conversion-example).

If you need to revert to the factor-based authenticator enrollment policy model, you can modify an existing authenticator-based enrollment policy to a factored one. See the available [Policy Factors Configuration objects](/docs/reference/api/policy/#policy-factors-configuration-object) and the [Policy Factors Configuration object and Authenticator keys mapping](#policy-factors-configuration-object-and-authenticator-keys-mapping) to convert the authenticator keys to Policy Factor Configuration objects.

> **Note:** If your app is integrated with systems, such as Terraform, that can’t be updated to parse the authenticators-based enrollment policy, you need to revert your policy to use factors instead of authenticators.

## Policy Factors Configuration object and Authenticator keys mapping

| Policy Factors Configuration object | Authenticator keys       |
| --------- | ----------- |
| okta_sms<br>okta_voice  | phone_number |
| okta_otp<br>okta_push   | okta_verify  |
| okta_question           | security_question  |
| okta_email              | email  |
| duo                     | duo  |
| fido_webauthn           | security_key  |
| rsa_token               | n/a  |
| sympantec_vip           | n/a  |
| yubikey_token           | n/a  |

### Authenticator enrollment policy settings conversion example

The following example shows the `settings` schema conversion from a factor-based to an authenticator-based enrollment policy.

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
