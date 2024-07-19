---
title: Configure an Okta account management policy
excerpt: How to add rules to an Okta account management policy using the Policies API
layout: Guides
---

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="ea" />

> **Note:** This document is only for Okta Identity Engine. See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version.

This guide describes how to use the [Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/) and [Okta Expression Language](/docs/reference/okta-expression-language-in-identity-engine/) to configure rules for the Okta account management policy.

---

#### What you need

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* [Groups created](/docs/reference/api/groups/) in your org
* A configured [dynamic network zone](https://help.okta.com/okta_help.htm?id=ext_Security_Network)

---

## About the Okta account management policy

The Okta account management policy is a type of authentication policy. It defines requirements when users enroll in authenticators, recover their passwords, and unlock their accounts. The policy uses a rule-based framework to enforce phishing resistance throughout the user journey, from onboarding to authentication and recovery.

Okta account management policies appear in GET calls to the `/policies` endpoint. However, they are read-only. You can't create, update, or delete the policy. You have to disable the feature if you want to stop using it. Most importantly, you can't assign it to apps. This policy applies to Okta account management actions only.

However, you can use the Policy API to [manage its policy rules](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicyRule).

See [Okta account management policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-account-management-policy) for details about configuring the policy in the Admin Console.

### Policy configuration

There are three primary use cases for the Okta account management policy. Each one adds a rule to the policy, so you can skip any that you don't need. However, if your org doesn't use phishing-resistant authenticators yet, start by enrolling your first phishing-resistant authenticator.

- [Add a rule for your first phishing-resistant authenticator](#add-a-rule-for-your-first-phishing-resistant-authenticator)
- [Add a rule for authenticator enrollment](#add-a-rule-for-authenticator-enrollment)
- [Add a rule for password recovery and account unlock](#add-a-rule-for-password-recovery-and-account-unlock)

You can also update rules to restore legacy processes. See [Edit the Okta account management policy](#edit-the-okta-account-management-policy).

## Retrieve the Okta account management policy ID

Before you can create or update policy rules, you need the `id` of your Okta account management policy.

### Example request

To retrieve your Okta account management policy, make a GET request to the `/api/v1/policies` endpoint. Set the policy `type` parameter to `ACCESS_POLICY`:

```curl
curl -i -X GET \
  'https://subdomain.okta.com/api/v1/policies?type=ACCESS_POLICY' \
  -H 'Authorization: YOUR_API_KEY_HERE'
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

## Add a rule for your first phishing-resistant authenticator

Add this rule to your Okta account management policy if your org doesn't already use a phishing-resistant authenticator. After your users enroll their first phishing-resistant authenticator, you can require it for the other use cases.

If your org already uses phishing-resistant authenticators, see [Add a rule for authenticator enrollment]().

> **Note:** This rule relies on [managed devices](https://support.okta.com/help/s/article/Howto-Get-a-List-of-All-Managed-and-NotManaged-Devices-in-Okta?language=en_US) and [IP Network Zones](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/NetworkZone/).

### Example request




### Example response



### User experience

Users must be on a managed device, inside a trusted network zone, and demonstrate low risk behavior before they enroll the designated phishing-resistant authenticator. If they don't meet all of these requirements, they're denied enrollment, which means that they also can't access any apps with phishing-resistant authentication policies.

This rule also applies to authenticator unenrollment, and users can lock themselves out if they unenroll too many authenticators. Encourage users to always maintain one phishing-resistant authenticator.

### Add a rule for authenticator enrollment

Add this rule to build phishing resistance into your authenticator enrollment process. When this rule is active, users must provide a phishing-resistant authenticator when they enroll other authenticators and when they unenroll one. If your org doesn't use phishing-resistant authenticators yet, start with Add a rule for your first phishing-resistant authenticator.

> **Note:** All users in your org must be eligible to use the phishing-resistant authenticators. See [Profile enrollment policies](/docs/concepts/policies/#profile-enrollment-policies).

### Example request


### Example response



### User experience

The user experience for this process doesn't change, except that users' authenticator choices are limited to the phishing-resistant options. Consider these two scenarios:

- Users who are currently activated with a single factor can't enroll new authenticators or sign in to apps that require MFA. Refer to this task's prerequisite.
- Users can lock themselves out if they unenroll too many authenticators. Inform your users that they must keep one phishing-resistant authenticator enrolled always.

### Add a rule for password recovery and account unlock





### Edit the Okta account management policy




## See also

- [Policies](/docs/concepts/policies/)
- [Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/)
- [Configure a global session policy and authentication policies](/docs/guides/configure-signon-policy/main/)
