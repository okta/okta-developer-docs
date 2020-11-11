---
title: Create Rules for Each Access Policy
---

Rules define particular token lifetimes for a given combination of grant type, user, and scope. They are evaluated in priority order and once a matching rule is found no other rules are evaluated. If no matching rule is found, then the authorization request fails.

## Rule use

Access policy rules are allow lists. If you want to create granular rules, you must first ensure that you have no rules that match "any" of something (for example "any user"). You can then create specific rules for each specific use case that you do want to support. For example, if you wanted to ensure that only administrators using the Implicit flow were granted access, then you would create a rule specifying that if:

* A request is made using the `implicit` grant type
* The user is a member of the `admin` group
* Any scope is specified

Then, the access token that is granted has a lifetime of, for example, one hour.

You can also use rules to restrict grant types, users, or scopes. For example, you could prevent the use of all scopes other than `openid` and `offline_access` by only creating rules that specifically mention those two scopes. This means you would have to not create any rules that match "any scopes" and ensure that all of your rules only match the `openid` and/or `offline_access` scopes.

Any request that is sent with a different scope won't match any rules and consequently fails.

To create a rule for a policy:

1. In the Developer Console, navigate to **API > Authorization Servers**.
2. Select the name of an Authorization Server, and then select **Access Policies**.
3. Select the name of an access policy, and then select **Add Rule**.
4. Enter a **Name** for the rule, and then use the following fields to define the rule logic:
    * **IF Grant type is:** Select one or more OAuth 2.0 grant types. See [Choosing an OAuth 2.0 flow](/docs/concepts/oauth-openid/#choosing-an-oauth-2-0-flow) for more information on understanding the type of OAuth flow (grant type) that you should use.
    * **AND User is:** Select one of the following:<br>
        **Any user assigned the app:** The rule applies to any user that is assigned to the app.<br>
        **Assigned the app and a member of one of the following:** The rule applies to users that are assigned to the app and a member of one or more groups that you specify. You can also specify a list of users to whom the rule applies.<br>
        > **Note:** The app must be assigned to this rule's policy.
    * **AND Scopes requested:** Select the scopes (any scopes, or a list that you specify) that the user can request as part of the rule conditions.
    * **THEN Use this inline hook:**  Select an [Inline Hook](/docs/concepts/inline-hooks/), if any, that you want to use to customize the token returned by Okta API Access Management.
    * **AND Access token lifetime is:** Select the length of time before an access token expires.
    * **AND Refresh token lifetime is:** Select the length of time before a refresh token expires.
    * **but will expire if not used every:** Defines when the refresh token expires if it isn't used. Leave the default of **7 days** or make any necessary changes.
5. Click **Create Rule**.

Rules are evaluated in priority order, so the first rule in the first policy that matches the client request is applied and no further processing occurs. If you need to change the order of your rules, reorder the rules using drag and drop.

> **Note:** Service applications, which use the Client Credentials flow, have no user. If you use this flow, make sure that you have at least one rule that specifies the condition **No user**.

At this point you can keep reading to find out how to create custom scopes and claims or proceed immediately to [Testing your Authorization Server](/docs/guides/customize-authz-server/test-authz-server/).

<NextSectionLink/>
