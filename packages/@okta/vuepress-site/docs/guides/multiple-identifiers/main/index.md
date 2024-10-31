---
title: Configure multiple identifiers
excerpt: Learn how to configure multiple identifiers for user sign-in
layout: Guides
---

<ApiLifecycle access="ie" />

This guide explains how to configure multiple identifiers using the [Policy API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/).

To configure multiple identifiers using the Admin Console, see [Multiple identifiers](https://help.okta.com/okta_help.htm?type=oie&id=ext-multiple-ids).

> **Note:** This document is written for Okta Identity Engine. If you’re using Okta Classic Engine, consider upgrading to Identity Engine. See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version.

---

#### What you need

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* [Groups created](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Group/) in your org
* An app or apps

---

## About multiple identifiers

Identifiers are attributes that a user can enter instead of their username when they sign in. They work in authentication, recovery, and unlock flows, and in self-service registration flows if you add them to the profile enrollment form. You can select two unique custom attributes in the Okta user profile to serve as identifiers. They need to be read-write (or read only), non-sensitive, and have a string data type.

Adding identifiers to an app's user profile policy lets users sign in with something other than their username. You can do one of the following:

* Select two custom attributes from the Okta user profile to serve as identifiers.
* Add new custom attributes specifically for this purpose.

### Use cases

You can use identifiers in standard authentication flows, but they're especially useful in hub-and-spoke orgs and for orgs with federated authentication. Consider the following scenarios:

* Users are in directories for both your corporate org (hub) and a specialized business unit (spoke). They authenticate with a username in the business unit, but they use an employee number for the corporate org. Configure both of these methods as identifiers so that users can sign in to the hub and the spoke with either ID.
* Users attempt to access your org through an app and are then redirected to Okta for authentication. If the app sign-in page requires a different attribute than Okta, you can configure them both as identifiers.

### User experience

In a hub-and-spoke flow, users go to the hub org sign-in page. They're prompted to enter any of the identifiers that you configured. The spoke org serves as the identity provider in this flow, so its preferred identifier should be represented in the entry field. Okta evaluates their entry according to your priority setting, to ensure that users who may have the same attribute for different identifiers are correctly authenticated.

In a standard authentication flow, users go to an app's sign-in page. They're prompted to authenticate with any of the identifiers that you configured. As in the hub-and-spoke flow, Okta evaluates their entry according to your priority setting.

Keep in mind that multiple identifiers don't change an app's MFA requirements or the sequence of the sign-in flow. The settings you configure in your global session and authentication policies determine whether users are prompted for the identifier or password first.

See [Sign-in flows](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-sign-in-flows).

### Configuration tasks

Identifiers are configured at the app level, in the user profile policy. This means that you can't set them for the entire org. However, you can apply the same user profile policy to all or multiple apps in your org. Follow this workflow to set up identifiers and ensure that your users understand how they work.

1. [Create a user profile policy](#create-a-user-profile-policy)
2. [Add identifiers to a user profile policy](#add-identifiers-to-a-user-profile-policy)
3. [Create a custom profile enrollment form](#create-a-custom-profile-enrollment-form)
4. [Customize your sign-in page](#customize-your-sign-in-page)
5. [Add apps to a user profile policy](#add-apps-to-a-user-profile-policy)

## Create a user profile policy

You can use the Policies API to create a user profile policy. See [Create a policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy).

Send a POST request to the `api/v1/policies` endpoint. Include the following:

* Set the value of the `activate` query parameter to `true`.
* Provide a value for `name`.
* Set the value of `type` to `PROFILE_ENROLLMENT`.
* Set `people.groups.include` to the value of a group in your org.


```bash
curl -i -X POST \
  'https://{yourOktaDomain}/api/v1/policies?activate=true' \
  -H 'Authorization: YOUR_API_KEY_HERE' \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "Creates a policy for multiple identifiers",
    "name": "Multiple identifiers",
    "priority": "Last / Lowest Priority, for example `1`",
    "status": "ACTIVE",
    "system": true,
    "type": "PROFILE_ENROLLMENT",
    "conditions": {
      "people": {
          "groups": {
            "include": [
                "{groupId}"
                ]
            }
        }
    }
  }'
```

## Add identifiers to a user profile policy

When you create a profile enrollment policy, a policy rule is created by default. This type of policy can only have one policy rule, so it's not possible to create other rules. Instead, consider editing the default one to meet your needs.

However, you can have up to 500 user profile policies in an org.

> **Notes:**
>
> * If the custom attributes you want to use aren't in the user profile, [add them](https://help.okta.com/okta_help.htm?type=oie&id=ext_Custom_Attributes_with_AD). Remember that custom attributes shouldn't be hidden or contain sensitive information.
> * In the Admin Console, for each custom attribute set the **Data type** to **string** and the **Restriction** to **Value must be unique for each user**. If this restriction isn't in your dropdown list, see [Unable to make a custom attribute unique](https://support.okta.com/help/s/article/unable-to-make-a-custom-attribute-unique?language=en_US).

### Identifier priority

Setting the priority of identifiers is an important configuration step. When a user enters an identifier, Okta validates it according to the priority that you set. When it finds a match, the evaluation process stops. This prevents users from authenticating with the same value.

For example, one identifier is `middle_name`, and for user A, that's "Barney". Another identifier is `father_name`, and for user B, that's "Barney". If you set `father_name` as the highest priority identifier, user B is the only one who can authenticate with "Barney".

When using the Policy API to add identifiers, set the identifier priority by their order in the `allowedIdentifiers` array. One of the attributes must be `login`. For example:

`"allowedIdentifiers":["father_name","middle_name", "login"]`

### Example rule request

Send a PUT request to the `/api/v1/policies/{policyId}/rules/{ruleId}` endpoint. Include the following parameters:

* Set the value of `policyId` to the ID of your user profile policy. See [Create a user profile policy](#create-a-user-profile-policy).
* Set the value of `ruleId` to the ID of the default rule in your user profile policy.
* Set the value of `type` to `PROFILE_ENROLLMENT`.
* In the `profileEnrollment` object, include an array of `allowedIdentifiers`.

> **Note:** One of the identifiers in the `allowedIdentifiers` array must be `login`.

```bash
curl -i -X PUT \
  'https://{yourOktaDomain}/api/v1/policies/{policyId}/rules/{ruleId}' \
  -H 'Authorization: YOUR_API_KEY_HERE' \
  -H 'Content-Type: application/json' \
  -d '{
"type": "PROFILE_ENROLLMENT",
"status": "ACTIVE",
"name": "Multiple identifiers",
"actions": {
    "profileEnrollment": {
        "allowedIdentifiers":["father_name","middle_name", "login"]
        }
    }
}
'
```

## Create a custom profile enrollment form

Use the Admin Console to create a custom profile enrollment form. See [Create a custom profile enrollment form](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-prof-enroll-form).


## Customize your sign-in page

Optional. You can use the Brands API to enter new values for any of the headings, labels, and links that you want to customize. For example, if you allow users to sign in with an identifier, you can change the Username label to describe which identifiers they can use.

See [Replace the customized sign-in page](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/CustomPages/#tag/CustomPages/operation/replaceCustomizedSignInPage).

## Add apps to a user profile policy

Multiple identifiers are configured at the app level. Add an app to the user profile policy or the IDs don’t work. See [Assign an authentication policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApplicationPolicies/#tag/ApplicationPolicies/operation/assignApplicationPolicy).

```bash
curl -i -X PUT \
  'https://subdomain.okta.com/api/v1/apps/{appId}/policies/{policyId}' \
  -H 'Authorization: YOUR_API_KEY_HERE'
```
