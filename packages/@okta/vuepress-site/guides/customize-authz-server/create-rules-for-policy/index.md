---
title: Create Rules for Each Access Policy
---

Rules define particular token lifetimes for a given combination of grant type, user, and scope. They are evaluated in priority order, and once a matching rule is found no other rules are evaluated. If no matching rule is found, then the authorization request fails.

1. In the administration UI, navigate to **API > Authorization Servers**.
2. Choose the name of an authorization server, and select **Access Policies**.
3. Choose the name of an access policy, and select **Add Rule**.
![Add Rule width:](/img/rule1.png "Add Rule width:")
4. Enter the requested information:
    * **Rule Name**
    * **IF Grant type is:** Select one or more OAuth 2.0 grant types.
    * **AND User is:** Select whether there's no user (client credentials flow), or a user assigned to a client that's assigned to this rule's policy, or a user assigned to one or more groups that you specify or a list of users that you specify.
    * **AND Requested these scopes:** Choose the scopes (any scopes, or a list that you specify) that can be requested by the user as part of the rule conditions.
    * **THEN Access token lifetime is:** Choose the length of time before an access token expires.
    * **THEN Refresh token lifetime is:** Choose the length of time before a refresh token expires.
5. Choose **Create Rule** to save the rule.
![Rules List width:](/img/rule2.png "Rules List width:")

While in the Rules list for an access policy, you can:

* Set a rule to be inactive for testing or debugging.
* Reorder rules. Rules are evaluated in priority order, so the first rule in the first policy that matches the client request is applied and no further processing occurs.

>Note: Service applications (client credentials flow) have no user. If you use this flow, make sure you have at least one rule that specifies the condition **No user**.

### Rule Usage

Access policy rules are whitelists. If you want to create granular rules, you must first ensure that you have no rules that match "any" of something (for example "Any user"). You can then create specific rules for each specific use case that you do want to support. For example, if you wanted to ensure that only administrators using the implicit flow were granted access, then you would create a rule specifying that if:

- a request is made using the `implicit` grant type, and
- the user is a member of the `admin` group, and
- any scope is specified

Then the access token that is granted will have a lifetime of, for example, 1 hour.

Rules can also be used to restrict grant types, users, or scopes. For example, you could prevent the use of all scopes other than `openid` and `offline_access` by only creating rules that specifically mention those two scopes. This means you would have to:

1. Not create any rules that match "Any scopes", and
2. Ensure that all of your rules only match to the `openid` and/or `offline_access` scopes.

Any request that is sent with a different scope will not match any rules and will consequently fail.

At this point you can keep reading to find out how to create custom scopes and claims, or proceed immediately to [Testing your Authorization Server](#test-your-authorization-server-configuration).

<NextSectionLink/>