---
title: Create a groups claim with a static whitelist
---
You can create a static whitelist when you need to set group whitelists on a per-application basis. For example, you have a large number of groups. Every time a group claim is created, you don't want to run through all of your groups if only 20 groups apply to your app.

This process optionally uses Okta's flexible app profile, which accepts any JSON-compliant content, to create a whitelist of groups that can then easily be referenced.

The following pages walk you through creating a groups claim, assigning a group whitelist to your client app, and configuring a groups claim that references a whitelist for the authorization server that you want to use.

For this example, we're configuring just one group (the IT group) for simplicity. This group has a group ID of: `00goeudyucv6CcaeV0h7` and the OIDC client used has a client ID of: `0oaoesxtxmPf08QHk0h7`.

The **Use group functions for static group whitelists** section goes into more detail on using group functions for static group whitelists. To continue with creating a groups claim with a static whitelist, <GuideLink link="../get-group-ids">skip to the next section</GuideLink>.

### Use group functions for static group whitelists

This section discusses the `getFilteredGroups` group function and how it helps you use a static group whitelist.

`getFilteredGroups` returns all groups that are contained in a specified list, the whitelist, of which the user is a member. The groups are returned in a format specified by the `group_expression` parameter. You must specify the maximum number of groups to return in the expression.

The EL function format: `getFilteredGroups(whitelist, group_expression, limit)`

You can use this function anywhere to get a list of groups of which the current user is a member, including both user groups and app groups that originate from sources outside Okta, such as from Active Directory and Workday. Additionally, you can use this combined, custom-formatted list for customizable claims into access and ID tokens that drive authorization flows.

This function takes Okta EL expressions for all parameters that evaluate to the correct data type. With these expressions you can create complex definitions for the whitelist, for the group format, and for the number of groups to return that can include `if` logic and customized formatting.

| Parameter              | Description                                                                    | Nullable    |
| :--------------------- | :----------------------------------------------------------------------------- | :---------- |
| `whitelist`            | Valid Okta EL expression that evaluates to a string array of group ids       | FALSE    |
| `group_expression`     | Valid Okta EL expression that evaluates to a string for use in evaluating the group. This string must also be a valid Okta EL expression. | FALSE    |
| `limit`                | Valid Okta EL expression that evaluates to an integer between 1 and 100, inclusive to indicate the maximum number of groups to return  | FALSE    |

The string produced by the `group_expression` parameter usually contains attributes and objects from the [Groups API](/docs/reference/api/groups/), although it isn't limited to those attributes and objects. Attributes and objects listed in the [Group Attributes](/docs/reference/api/groups/#group-attributes) section of the Groups API can be any of the following: `id`, `status`, `name`, `description`, `objectClass`, and the `profile` object that contains the `groupType`, `samAccountName`, `objectSid`, `groupScope`, `windowsDomainQualifiedName`, `dn`, and `externalID` attributes for groups that come from apps such as Active Directory.

The whitelist parameter must evaluate to a list of group ids that is returned from the [Groups API](/docs/reference/api/groups/). If the user isn't a member of a group in the whitelist, the group is ignored.

**Parameter Examples**

* whitelist
  * Array: <code class="OKTA-263808">{"00gn335BVurvavwEEL0g3", "00gnfg5BVurvavAAEL0g3"}</code> 
  * Array variable: `app.profile.groups.whitelist`
* group_expression
  * Attribute name: `"group.id"`
  * Okta EL string that contains an `if` condition: `"(group.objectClass[0] == 'okta:windows_security_principal') ? 'AD: ' + group.profile.windowsDomainQualifiedName : 'Okta: ' + group.name"` If `okta:windows_security_principal` is true for a group, the function returns the `windowsDomainQualifiedName` prefixed with `AD:`. Otherwise, the function returns the group name prefixed with `Okta:`.
* limit
  * Integer between 1 and 100, inclusive. For example: `50`
  * Okta EL expression containing a condition that evaluates to an integer: `app.profile.maxLimit < 100 ? app.profile.maxLimit : 100`. If the maximum group limit in the profile is less than 100, return that number of groups. Otherwise, return a maximum of 100 groups. If there are more groups returned than the specified limit, an error is returned.

<NextSectionLink/>
