---
title: Understand MFA enrollment policy API changes after the upgrade
meta:
  - name: description
    content: Learn how to use and manage the MFA enrollment policy with the API in Okta Identity Engine.
---

<ApiLifecycle access="ie" />

## Overview

With Okta Identity Engine, the definition of factors and authenticators have been differentiated to align with industry standards. Identity Engine uses authenticators in its MFA enrollment policy settings, whereas Okta Classic Engine uses factors in its MFA enrollment policy settings. See [Compare Identity Engine and Classic Engine](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-whats-new).

After upgrading your org to Identity Engine, new MFA enrollment policies created in the Admin Console are configured using authenticators. Existing MFA enrollment policies, created before upgrading to Identity Engine, are still configured with factors. However, if an existing MFA policy was modified and saved in the Admin Console, the factors in that policy are converted to authenticators. This conversion is seamless to admin users that are managing policies in the Admin Console.

For existing apps that manage and use MFA enrollment policies programmatically through the [Policy API](/docs/reference/api/policy/), some development work is required to handle the factor to authenticator conversion schema changes after the org is upgraded to Identity Engine. This guide provides you with key API considerations to upgrade your app for MFA enrollment flows in Identity Engine.

## MFA enrollment policy API changes in Identity Engine

The following are the main behavior changes to the [MFA enrollment policy](/docs/reference/api/policy/#multifactor-mfa-enrollment-policy) type in Identity Engine:

- The Policy API supports both factors and authenticators schemas in the MFA enrollment policy [settings](/docs/reference/api/policy/#policy-settings-data-2).
- MFA enrollment policies are created with either factors or authenticators in their settings (they are mutually exclusive).
- Existing MFA enrollment policies (that is, MFA enrollment policies created before the Identity Engine upgrade) still contain factors in their settings.
- For existing MFA enrollment policies modified from the Admin Console of an Identity Engine org, existing factors are converted to authenticators in their settings.

### Recovery authenticators

In Identity Engine, you can use the new MFA enrollment policy format with authenticators to govern recovery authenticator enrollment for the password recovery flow. The enrollment for recovery authenticators (Email, Phone, Okta Verify, and Security question) are governed by both the password policy and the enrollment policy. For example, if the Email authenticator is enabled and set to `Required` in the MFA enrollment policy, then email enrollment is required for recovery even if it isn't required in the password policy. Therefore, if you want to manage your recovery authenticators in the enrollment policy, you need to configure your MFA enrollment policy with [authenticators](/docs/reference/api/policy/#policy-authenticator-object), and not [factors](/docs/reference/api/policy/#policy-factors-configuration-object).

> **Note:** Password policy recovery authenticator settings supersedes the authenticator settings in an MFA enrollment policy. For example, if the Phone authenticator is `Optional` or `Disabled` for the MFA enrollment policy, but `Required` for the password policy, then phone enrollment is required for the password recovery flow.

See [password policy](/docs/reference/api/policy/#password-policy) and [Configure password policies](https://help.okta.com/okta_help.htm?type=oie&id=csh-configure-password) for details on how to configure the password policy in the Admin Console.

## Get MFA enrollment policies

To parse a response from the `GET /api/v1/policies?type=MFA_ENROLL` request, you must determine if the returned MFA enrollment policy contains either `authenticators` or `factors` in the [settings schema](/docs/reference/api/policy/#policy-settings-data-2).

> **Note:** Another indicator for an authenticator MFA enrollment policy is that the [settings schema](/docs/reference/api/policy/#policy-settings-data-2) contains a `type` property that is set to the `AUTHENTICATORS` value.

If the returned policy uses `authenticators`, you need to loop through the list of [Policy Authenticator objects](/docs/reference/api/policy/#policy-authenticator-object) and use the `key` property to identify the authenticator. See the [Authenticator Administration API](/docs/reference/api/authenticators-admin/) for more details on the available authenticators in your org.

If the returned policy uses `factors`, you need to loop through every type of [Policy Factor Configuration object](/docs/reference/api/policy/#policy-factors-configuration-object), as you've done previously for your app.

Example of an MFA enrollment policy response `settings` snippet with authenticators:

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

Example of an MFA enrollment policy response `settings` snippet with factors:

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

## Create an MFA enrollment policy

To create an MFA enrollment policy through the [Policy API](/docs/reference/api/policy/), you need to provide the `settings` schema with either the list of [Policy Authenticator objects](/docs/reference/api/policy/#policy-authenticator-object) or [Policy Factors Configuration objects](/docs/reference/api/policy/#policy-factors-configuration-object) in the `POST /api/v1/policies` request parameters body.

For a new MFA enrollment policy in Identity Engine, use the [Create a Policy](/docs/reference/api/policy/#create-a-policy) API operation. Set the list of authenticators for the policy by using the [Authenticators Administration API](/docs/reference/api/authenticators-admin/) to list the available authenticators in your org.

You can also create a new MFA enrollment policy with factors instead of authenticators to support legacy systems or workflows. Set the policy `settings` to the factors schema with [Policy Factor Configuration objects](/docs/reference/api/policy/#policy-factors-configuration-object).

> **Note:** You need to configure the other policy parameters according to the [Create a Policy](/docs/reference/api/policy/#create-a-policy) API operation. Specifically, you need to include the `type=MFA_ENROLL` parameter for an MFA enrollment policy. This section focuses on the `settings` parameter required for the MFA enrollment policy type.

## Update an MFA enrollment policy

To update an MFA enrollment policy through the [Update a Policy](/docs/reference/api/policy/#update-a-policy) API operation, you need to provide the `settings` schema with either the list of [Policy Authenticator objects](/docs/reference/api/policy/#policy-authenticator-object) or [Policy Factors Configuration objects](/docs/reference/api/policy/#policy-factors-configuration-object) in the `PUT /api/v1/policies/${policyId}` request parameters body.

> **Note:** You need to configure the other policy parameters according to the [Update a Policy](/docs/reference/api/policy/#update-a-policy) API operation. This section focuses on the `settings` parameter required specifically for the MFA enrollment policy.

If you need to convert an existing factor MFA enrollment policy to use authenticators, then update the policy with authenticators in the `settings` parameter.  Use the [Policy Factors Configuration object to authenticator keys mapping](#policy-factors-configuration-object-and-authenticator-keys-mapping) table to map [Policy Factors Configuration objects](/docs/reference/api/policy/#policy-factors-configuration-object) to authenticator keys. See [MFA enrollment policy settings conversion example](#mfa-enrollment-policy-settings-conversion-example).

If you need to revert to the Classic Engine MFA enrollment model, you can edit an existing authenticator MFA enrollment policy to a factored one. See all of the available [Policy Factors Configuration objects](/docs/reference/api/policy/#policy-factors-configuration-object) and the [Policy Factors Configuration object and Authenticator keys mapping](#policy-factors-configuration-object-and-authenticator-keys-mapping) to convert the authenticator keys to Policy Factor Configuration objects.

> **Note:** If your app is integrated with systems, such as Terraform, that can’t be updated to parse the new authenticators MFA enrollment policy, you need to revert your policy to use factors instead of authenticators.

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

### MFA enrollment policy settings conversion example

The following example shows the `settings` schema conversion from a factor to an authenticator MFA enrollment policy.

Original MFA enrollment policy with factor settings:

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

Converted MFA enrollment policy with authenticator settings:

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
