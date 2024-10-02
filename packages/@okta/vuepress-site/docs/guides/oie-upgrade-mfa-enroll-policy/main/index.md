---
title: Understand authenticator enrollment policy API changes after the upgrade
meta:
  - name: description
    content: Learn how to use and manage the authenticator enrollment policies with the API in Okta Identity Engine.
---

<ApiLifecycle access="ie" />

## Overview

Okta Identity Engine sets apart factors and authenticators to align with industry standards:

- Identity Engine uses authenticators in the settings for its authenticator enrollment policy.
- Classic Engine uses factors in the settings for its multifactor (MFA) enrollment policy.

In Identity Engine, the MFA Enrollment Policy name has changed to [authenticator enrollment policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy). Classic Engine still refers to the same policy as the [Multifactor (MFA) Enrollment Policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy). In the API, the policy type of `MFA_ENROLL` remains unchanged, however, the `settings` data contains authenticator or factors, depending on the configuration.

After you upgrade your org to Identity Engine, consider the following:

- New authenticator enrollment policies that you create in the Admin Console are configured with authenticators.

- Existing authenticator enrollment policies that you created before upgrading to Identity Engine are still configured with factors.

- Existing authenticator enrollment policies that you save in the Admin Console have their factors converted to authenticators. The conversion is seamless to admins that manage policies in the Admin Console.

> **Note:** Whether you edit the authenticator enrollment policy, when you click **Update Policy** in the Admin Console, the factor-to-authenticator conversion occurs.

Existing code that manages and uses authenticator enrollment policies through the [Policy API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy) requires some development work. After you upgrade your org, address the factor-to-authenticator conversion schema changes.

This guide provides key API considerations to upgrade your app for multifactor enrollment flows in Identity Engine.

## Authenticator enrollment policy API changes in Identity Engine

The following are the main behavior changes to the [authenticator enrollment policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy) in Identity Engine:

- The Policy API supports both factors and authenticator schemas in the [settings](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy!path=2/settings/authenticators&t=request) for the authenticator enrollment policy.
- New authenticator enrollment policies contain either factors or authenticators in their settings (they’re mutually exclusive).
- Existing authenticator enrollment policies (that is, policies created before the Identity Engine upgrade) still contain factors in their settings.
- Authenticator enrollment policies modified from the Admin Console of an Identity Engine org have their factors converted to authenticators in their settings.

> **Note:** For Identity Engine orgs with the Authenticator enrollment policy feature enabled, the new default authenticator enrollment policy created by Okta uses the authenticators setting schema. Existing default authenticator enrollment policies from a migrated org remain unchanged and still use the factors setting schema. If you want the default policy to use the authenticators setting schema, then modify the default policy. In the Admin Console, convert the settings from factors to authenticators.

### Recovery authenticators

In Identity Engine, you can use authenticator-based authenticator enrollment policies to govern recovery authenticator enrollment for the password recovery flow. This feature isn't available for factor-based authenticator enrollment policies.

Both the password policy and the authenticator enrollment policy govern the enrollment of recovery authenticators (Email, phone, Okta Verify, and Security Question). For example, if the Email authenticator is enabled and set to `Required` in the authenticator enrollment policy, then email enrollment is required for recovery even if it isn't required in the password policy.

> **Note:** Password policy recovery authenticator settings supersede the authenticator enrollment policy settings. For example, if the phone authenticator is `Optional` or `Disabled` for the authenticator enrollment policy, but `Required` for the password policy, then phone enrollment is required for the password recovery flow.

See [password policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy) and [Configure password policies](https://help.okta.com/okta_help.htm?type=oie&id=csh-configure-password) for details on how to configure the password policy in the Admin Console.

## Get authenticator enrollment policies

To parse a response from the `GET /api/v1/policies?type=MFA_ENROLL` request, you must determine if the returned authenticator enrollment policy contains either `authenticators` or `factors` in the [settings schema](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy!path=2/settings&t=request).

> **Note:** Another indicator of an authenticator-based enrollment policy is when `type=AUTHENTICATORS` in the [settings schema](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy!path=2/settings&t=request). The `type` property could be absent from the response of factor-based authenticator enrollment policies.

If the returned policy uses `authenticators`, loop through the list of [policy authenticator objects](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy!path=2/settings/authenticators&t=request) and use the `key` property to identify the authenticator. See the [Authenticators API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Authenticator/) for more details on the available authenticators in your org.

If the returned policy uses `factors`, you need to loop through every type of [policy factor configuration object](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy!path=2/settings/authenticators/key&t=request), as you've done previously for your app.

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

To create an authenticator enrollment policy through the [Policy API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy), you need to provide the `settings` schema with either the list of [policy authenticator objects](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy!path=2/settings/authenticators&t=request) or [policy factor configuration objects](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy!path=2/settings/authenticators/key&t=request) in the `POST /api/v1/policies` request body parameters.

To create an authenticator enrollment policy in Identity Engine, use the [Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy). To set the list of authenticators for the policy, use the [Authenticators API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Authenticator/#tag/Authenticator/operation/listAuthenticators).

You can also create an authenticator enrollment policy with factors instead of authenticators to support legacy systems or workflows. Set the policy `settings` to the factors schema with the [policy factor configuration objects](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy!path=2/settings/authenticators/key&t=request).

> **Note:** Configure the other policy parameters according to the [Create a Policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy) API operation. Specifically, you need to include the `type=MFA_ENROLL` parameter for an authenticator enrollment policy.

## Update an authenticator enrollment policy

To update an authenticator enrollment policy through the [Update a Policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/replacePolicy) API operation, you need to provide the `settings` schema with either the list of [policy authenticator objects](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy!path=2/settings/authenticators&t=request) or [policy factor configuration objects](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy!path=2/settings/authenticators/key&t=request) in the `PUT /api/v1/policies/{policyId}` request body parameters.

> **Note:** Configure the other policy parameters according to the [Update a Policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/replacePolicy) API operation. This section focuses on the `settings` parameter required specifically for the authenticator enrollment policy.

If you need to convert an existing factor-based authenticator enrollment policy to use authenticators, then update the policy with authenticators in the `settings` parameter. Use the [Policy Factors Configuration object and Authenticator keys mapping](#policy-factors-configuration-object-and-authenticator-keys-mapping) table to map Policy Factors Configuration objects to authenticator keys. See the [settings conversion example](#authenticator-enrollment-policy-settings-conversion-example).

You can revert to the factor-based authenticator enrollment policy model. Modify an existing authenticator-based enrollment policy to a factored one. To convert the authenticator keys to Policy Factor Configuration objects, see the following:

* [Policy factor configuration objects](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy!path=2/settings/authenticators/key&t=request)
* [Policy Factors Configuration object and Authenticator keys mapping](#policy-factors-configuration-object-and-authenticator-keys-mapping)

> **Note:** Your app might be integrated with systems like Terraform that you can't update to parse the authenticators-based enrollment policy. If so, revert your policy to use factors instead of authenticators.

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
