---
title: Delete all Stay signed in sessions
---

<ApiLifecycle access="ie" />

This guide explains how to delete all sessions of the **Stay signed in** feature using the [My Account Sessions API](https://developer.okta.com/docs/api/openapi/okta-myaccount/myaccount/tag/Sessions/). See [Stay signed in](https://help.okta.com/okta_help.htm?type=oie&id=ext-stay-signed-in) for more details.

> **Note:** This document is written for Okta Identity Engine. See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version.

---

#### Learning outcomes

- Learn to enable the usePersistentCookie option.
- Understand how to delete all sessions using the API.

#### What you need

- An Okta developer org configured for a **Stay signed in** use case
- Access to the [My Account Sessions API](https://developer.okta.com/docs/api/openapi/okta-myaccount/myaccount/tag/Sessions/)
- [Postman client](https://www.getpostman.com/downloads/) to set up `userPersistentCookie`. See also [Test the Okta REST APIs with Postman](/docs/reference/rest/).

**Sample code**

[Request example](#request-example)

---

## About **Stay signed in**

**Stay signed in** lets users establish an Okta session that continues after they close and reopen their browsers. When a user selects this option during authentication, they won't be prompted again for MFA for the amount of time defined in your global session policy.

There are two ways to present the **Stay signed in** option to your users. By default, it's displayed on the Sign-In Widget when users enter their credentials. You can also configure it so that the prompt appears after users authenticate. This option is recommended for orgs that use delegated authentication or identity providers, because their users may bypass the credential entry page of the Sign-In Widget.

**Stay signed in** is only recommended for users on private devices or networks. Users who suspect that their credentials have been compromised can end all sessions in their account settings.

See [Stay signed in](https://help.okta.com/okta_help.htm?type=oie&id=ext-stay-signed-in) for more details.


## Enable the userPersistentCookie parameter

Enable the `usePersistentCookie` option in the API if you want users to stay signed in across browser sessions.

### About Single Sign-On (SSO) cookies

SSO allows users to authenticate once and access multiple resources without being prompted for more credentials. Okta supports both session and persistent SSO:

Session SSO: Session SSO cookies are written for the authenticated user, which eliminates further prompts when the user switches applications during a particular session. However, if a particular session ends, the user is prompted for their credentials again.

Persistent SSO: Persistent SSO cookies are written for the authenticated user, which eliminates further prompts when the user switches applications for as long as the persistent SSO cookie is valid.

The difference between persistent SSO and session SSO is that you can maintain persistent SSO across different sessions. Persistent SSO is disabled by default in Okta. To share a sign-in session across different sessions, you need to enable persistent SSO.

### Enable the parameter

To enable persistent SSO for **Stay signed in**, you need to update the [`usePersistentCookie`](/docs/reference/api/policy/#signon-action-object) parameter in the appropriate global session policy. These steps use the Okta [Policy Postman collection](/docs/reference/postman-collections/) to enable the parameter.

Before you begin, complete the following steps:

- Create an [API token](/docs/guides/create-an-api-token/) for your Org.
- Download the [Policy Postman collection](/docs/reference/postman-collections/).

1. In Postman, expand the **Policies (Okta API)** folder, and then the **Global Session Policy** folder.
2. Click the **Get Global Session Policies** request to open it, and then click **Send** to run it.

    Example request:

    ```bash
    GET https://${yourOktaDomain}/api/v1/policies?type=OKTA_SIGN_ON
    ```

3. In the response, locate the policy that you want to modify and copy its `id` value.
    > **Tip:** You can also highlight the policy ID, right-click it, and set it as the value for the `policyId` variable in your environment.
4. Click the **Get Rules** request to open it.
5. In the request URL, replace the `policyId` variable with the policy ID that you copied. If you assigned the policy ID as a variable in your environment, skip this step.
    > **Tip:** To see which value is assigned to a variable, hover over the variable in the request URL. A box pops up that displays the currently assigned variable value.
6. Click **Send** to run the request.

    Example:

    ```bash
    GET https://${yourOktaDomain}/api/v1/policies/00p2sy9ploJnRwPwp5g7/rules
    ```

7. In the response, locate the rule that you want to modify, copy its `id` value, and copy the `actions` property section of the JSON payload.
    > **Note:** You can't modify the `Default Rule` properties `usePersistentCookie` or `maxSessionLifetimeMinutes`. Copy the `id` value of a custom rule instead. If you only see a `Default Rule` in the response, then you should first [create a custom rule](/docs/guides/customize-authz-server/create-rules-for-policy/).

    > **Tip:** You can also highlight the rule ID, right-click, and set it as the value for the `ruleId` variable in your environment.
8. Click the **Update Global Session Policy rule** request to open it.
9. In the request URL, replace the `policyId` and `ruleId` variables with the policy ID and rule ID that you copied previously. If you assigned these as variables in your environment, skip this step.

    Example:

    ```bash
    PUT https://${yourOktaDomain}/api/v1/policies/00p2sy9ploJnRwPwp5g7/rules/0pr2syd4moJ2gFXnD5g7

    ```

    Or

    ```bash
    https://${yourOktaDomain}/api/v1/policies/${policyId}/rules/${ruleId}
    ```

10. Select the **Body** tab of the request and add `"type": "SIGN_ON",` just below the `name` parameter.
11. Replace the `actions` property with the `actions` property that you copied previously.
12. In the `actions` property section, change the `usePersistentCookie` parameter value to `true`.

    ```json
    {
        "name": "Your Policy Rule",
        "type": "SIGN_ON",
        "actions": {
            "signon": {
                "access": "ALLOW",
                "requireFactor": true,
                "factorPromptMode": "ALWAYS",
                "rememberDeviceByDefault": false,
                "session": {
                    "usePersistentCookie": true,
                    "maxSessionIdleMinutes": 100,
                    "maxSessionLifetimeMinutes": 100
                }
            }
        }
    }
    ```

13. Click **Send** to run the update request.

## Delete all sessions

This API call revokes all active identity provider sessions of the user. As a result, the user must authenticate on the next operation. Also, this call revokes OpenID Connect and OAuth refresh and access tokens issued to the user. See [My Account Sessions API](https://developer.okta.com/docs/api/openapi/okta-myaccount/myaccount/tag/Sessions/).

> **Note:** The deletion happens at the browser level, not the device level.

### Request example

```bash
curl -i -X DELETE \
  https://subdomain.okta.com/idp/myaccount/sessions \
  -H 'Authorization: Bearer <YOUR_TOKEN_HERE>'
```

## See also

- [Stay signed in](https://help.okta.com/okta_help.htm?type=oie&id=ext-stay-signed-in)
