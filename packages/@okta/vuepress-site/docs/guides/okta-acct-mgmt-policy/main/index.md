---
title: Configure an Okta account management policy
excerpt: How to add rules to an Okta account management policy using the Policies API
layout: Guides
---

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="ea" />

> **Note:** This document is only for Okta Identity Engine. See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version.

This guide describes how to use the Policies API and Okta Expression Language to configure rules for the Okta account management policy.

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

## Policy configuration

There are three primary use cases for the Okta account management policy. Each one adds a rule to the policy, so you can skip any that you don't need. However, if your org doesn't use phishing-resistant authenticators yet, start by enrolling your first phishing-resistant authenticator.

- Enroll your first phishing-resistant authenticator
- Enroll new authenticators using an existing phishing-resistant authenticator
- Unlock accounts and recover passwords using phishing-resistant authenticators

You can also update rules to restore legacy processes. See [Edit the Okta account management policy]().

### Enroll your first phishing-resistant authenticator






### Enroll new authenticators using an existing phishing-resistant authenticator





### Unlock accounts and recover passwords using phishing-resistant authenticators




## See also

- [Policies](/docs/concepts/policies/)
- [Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/)
- [Configure a global session policy and authentication policies](/docs/guides/configure-signon-policy/main/)


