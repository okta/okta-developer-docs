---
title: Add a Groups claim with a dynamic whitelist
---
You can use Okta Expression Language Group Functions with dynamic whitelists. Three Group functions help you use dynamic group whitelists: `contains`, `startsWith`, and `endsWith`. These functions return all of the Groups that match the specified criteria without needing to have Groups specified in the app.

You can use this function anywhere to get a list of Groups of which the current user is a member, including both User Groups and App Groups that originate from sources outside of Okta, such as from Active Directory and Workday. Additionally, you can use this combined, custom-formatted list for customizable claims into access and ID tokens that drive authorization flows. All three functions have the same parameters:

| Parameter          | Description                                   | Nullable       | Example Values                        |
| :----------------- | :-------------------------------------------  | :------------- | :------------------------------------ |
| app                | Application type or App ID                    | FALSE          | `"OKTA"`,`"0oa13c5hnZFqZsoS00g4"`, `"active_directory"`|
| pattern            | Search term                                   | FALSE          | `"Eastern-Region"`, `"Eastern"`, `"-Region"`|
| limit              | Maximum number of Groups returned. Must be a valid EL expression and evaluate to a value between 1 to 100. | FALSE | `1`, `50`, `100`|

> **Important:** When you use `Groups.startWith`, `Groups.endsWith`, or `Groups.contains`, the `pattern` argument is matched and populated on the `name` attribute rather than the group's email. If you are targeting groups that may have duplicate group names (such as Google Groups), use the `getFilteredGroups` Group function instead.<br>
<br>
Example: `getFilteredGroups({"00gml2xHE3RYRx7cM0g3"}, "group.name", 40) )`<br>
<br>
See the **Parameter Examples** section of [Use group functions for static group whitelists](/docs/guides/customize-tokens-returned-from-okta/static-whitelist/#use-group-functions-for-static-group-whitelists) for more information on the parameters used in this Group function.

You can use a dynamic group whitelist with both the Okta Org Authorization Server and a Custom Authorization Server:

* <GuideLink link="../dynamic-whitelist-org-as">Use a dynamic group whitelist with the Org Authorization Server</GuideLink>
* <GuideLink link="../dynamic-whitelist-custom-as">Use a dynamic group whitelist with a Custom Authorization Server</GuideLink>

<NextSectionLink/>
