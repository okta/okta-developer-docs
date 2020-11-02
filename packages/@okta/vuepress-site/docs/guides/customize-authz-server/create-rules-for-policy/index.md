---
title: Create Rules for Each Access Policy
---

Rules define particular token lifetimes for a given combination of grant type, user, and scope. They are evaluated in priority order and once a matching rule is found no other rules are evaluated. If no matching rule is found, then the authorization request fails.

1. In the Developer Console, navigate to **API > Authorization Servers**.
2. Select the name of an authorization server, and then select **Access Policies**.
3. Select the name of an access policy, and then select **Add Rule**.
4. Enter a **Name** for the rule, and then use the following fields to define the rule logic:
    * **IF Grant type is:** Select one or more OAuth 2.0 [grant types](/docs/concepts/oauth-openid/#choosing-an-oauth-2-0-flow).
    * **AND User is:** Select whether there's no user (client credentials flow), a user assigned to a client that's assigned to this rule's policy, or a user assigned to one or more groups that you specify or a list of users that you specify.
    * **AND Scopes requested:** Select the scopes (any scopes or a list that you specify) that the user can request as part of the rule conditions.
    * **THEN Use this inline hook:**  Select an [Inline Hook](/docs/concepts/inline-hooks/), if any, that you want to use to customize the token returned by Okta API Access Management.
    * **THEN Access token lifetime is:** Select the length of time before an access token expires.
    * **THEN Refresh token lifetime is:** Select the length of time before a refresh token expires.
5. Click **Create Rule**.

Rules are evaluated in priority order, so the first rule in the first policy that matches the client request is applied and no further processing occurs. If you need to change the order of your rules, reorder the rules using drag-n-drop.

> **Note:** Service applications (client credentials flow) have no user. If you use this flow, make sure that you have at least one rule that specifies the condition **No user**.

### Rule Use

Access policy rules are allow lists. If you want to create granular rules, you must first ensure that you have no rules that match "any" of something (for example "any user"). You can then create specific rules for each specific use case that you do want to support. For example, if you wanted to ensure that only administrators using the implicit flow were granted access, then you would create a rule specifying that if:

* a request is made using the `implicit` grant type, and
* the user is a member of the `admin` group, and
* any scope is specified

Then the access token that is granted has a lifetime of, for example, one hour.

You can also use rules to restrict grant types, users, or scopes. For example, you could prevent the use of all scopes other than `openid` and `offline_access` by only creating rules that specifically mention those two scopes. This means you would have to:

1. Not create any rules that match "any scopes", and
2. Ensure that all of your rules only match the `openid` and/or `offline_access` scopes.

Any request that is sent with a different scope won't match any rules and will consequently fail.

At this point you can keep reading to find out how to create custom scopes and claims or proceed immediately to [Testing your Authorization Server](/docs/guides/customize-authz-server/test-authz-server/).

<NextSectionLink/>
