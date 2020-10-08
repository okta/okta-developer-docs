---
title: Add a Groups claim with a static whitelist
---

You can create a static whitelist when you need to set group whitelists on a per-application basis. For example, you have a large number of Groups. Every time a Groups claim is created, you don't want to run through all of your Groups if only 20 Groups apply to your app.

This process optionally uses Okta's flexible app profile, which accepts any JSON-compliant content, to create a whitelist of Groups that can then easily be referenced.

The following sections walk you through creating a Groups claim, assigning a group whitelist to your client app, and configuring a Groups claim that references a whitelist for the authorization server that you want to use.

For this example, we're configuring just one group (the IT group) for simplicity. This group has a group ID of: `00goeudyucv6CcaeV0h7` and the OpenID Connect client used has a client ID of: `0oaoesxtxmPf08QHk0h7`.

## Get the group IDs

Send a request to `https://${yourOktaDomain}/api/v1/groups` and collect the IDs for all of the Groups that you want to whitelist.

**Request Example**

```bash
curl -X GET \
-H 'accept: application/json' \
-H 'authorization: SSWS ${api_token}' \
-H 'content-type: application/json' \
"https://${yourOktaDomain}/api/v1/groups"
```

**Response Example**

```json
{
    "id": "00goeudyucv6CcaeV0h7",
    "created": "2019-11-12T19:56:23.000Z",
    "lastUpdated": "2019-11-12T19:56:23.000Z",
    "lastMembershipUpdated": "2019-11-12T22:59:13.000Z",
    "objectClass": [
        "okta:user_group"
    ],
    "type": "OKTA_GROUP",
    "profile": {
        "name": "IT",
        "description": "Info Tech"
    },
    "_links": {
        "logo": [
            {
                "name": "medium",
                "href": "https://op1static.oktacdn.com/assets/img/logos/groups/okta-medium.d7fb831bc4e7e1a5d8bd35dfaf405d9e.png",
                "type": "image/png"
            },
            {
                "name": "large",
                "href": "https://op1static.oktacdn.com/assets/img/logos/groups/okta-large.511fcb0de9da185b52589cb14d581c2c.png",
                "type": "image/png"
            }
        ],
        "users": {
            "href": "https://${yourOktaDomain}/api/v1/groups/00goeudyucv6CcaeV0h7/users"
        },
        "apps": {
            "href": "https://${yourOktaDomain}/api/v1/groups/00goeudyucv6CcaeV0h7/apps"
        }
    }
}
```

## Add a list of Groups to the client App profile

When you have a lot of Groups to whitelist, you can put the Group IDs in the client App's profile property. You can add App Groups, User Groups, or both to the Group whitelist specified as an array of IDs. If you only have one or two Groups to specify, simply add the Group IDs to the first parameter of the `getFilteredGroups` function described in the <GuideLink link="../use-static-group-allowlist-org-as">next step</GuideLink>.

The following example names the group whitelist `groupwhitelist`, but you can name it anything.

> **Tip:** To build your request body, you can first perform a GET to the `/apps` endpoint (`https://${yourOktaDomain}/api/v1/apps/${applicationId}`) using the `applicationId` for the app that you want to add the Groups list to. Then, copy the response JSON that you receive to help build your request JSON for this example.

The `profile` property that contains the whitelist is at the bottom of the request example.

**Request Example**

```json
{
    "name": "oidc_client",
    "label": "OIDC APP Name",
    "status": "ACTIVE",
    "signOnMode": "OPENID_CONNECT",
    "credentials": {
        "oauthClient": {
            "autoKeyRotation": true,
            "client_id": "0oaoesxtxmPf08QHk0h7",
            "token_endpoint_auth_method": "client_secret_basic"
        }
    },
    "settings": {
         "oauthClient": {
            "client_uri": null,
            "logo_uri": null,
            "redirect_uris": [
                "http://yourredirecturihere.com/"
            ],
            "response_types": [
                "code",
                "id_token",
                "token"
            ],
            "grant_types": [
                "authorization_code",
                "client_credentials",
                "implicit"
            ],
            "application_type": "web",
             "consent_method": "REQUIRED",
             "issuer_mode": "CUSTOM_URL"
     }
  },
  "profile": {
    "groupwhitelist": [
        "00goeudyucv6CcaeV0h7"
    ]
   }
}
`https://${yourOktaDomain}/api/v1/apps/${applicationId}`
```

To use the group whitelist for every client that gets this claim in a token, put the attribute name of the whitelist in the first parameter of the `getFilteredGroups` function described in the <GuideLink link="../use-static-group-allowlist-org-as">next step</GuideLink>.

> **Note:** The following **Use group functions for static group whitelists** section goes into more detail on using group functions with static group whitelists. To continue with creating a Groups claim with a static whitelist, <GuideLink link="../use-static-group-allowlist-org-as">skip to the next section</GuideLink>.

### Use group functions for static group whitelists

This section discusses the `getFilteredGroups` group function and how it helps you use a static group whitelist.

`getFilteredGroups` returns all Groups that are contained in a specified list, the whitelist, of which the user is a member. The Groups are returned in a format specified by the `group_expression` parameter. You must specify the maximum number of Groups to return in the expression.

The EL function format: `getFilteredGroups(whitelist, group_expression, limit)`

You can use this function anywhere to get a list of Groups of which the current user is a member, including both User Groups and App Groups that originate from sources outside Okta, such as from Active Directory and Workday. Additionally, you can use this combined, custom-formatted list for customizable claims into access and ID tokens that drive authorization flows.

> **Important:** When you use `Groups.startWith`, `Groups.endsWith`, or `Groups.contains`, the `pattern` argument is matched and populated on the `name` attribute rather than the group's email (for example, when using G Suite). If you are targeting groups that may have duplicate group names (such as Google Groups), the `getFilteredGroups` Group function is the best function to use for that use case.

This function takes Okta EL expressions for all parameters that evaluate to the correct data type. With these expressions you can create complex definitions for the whitelist, for the group format, and for the number of Groups to return that can include `if` logic and customized formatting.

| Parameter              | Description                                                                    | Nullable    |
| :--------------------- | :----------------------------------------------------------------------------- | :---------- |
| `whitelist`            | Valid Okta EL expression that evaluates to a string array of group ids       | FALSE    |
| `group_expression`     | Valid Okta EL expression that evaluates to a string for use in evaluating the group. This string must also be a valid Okta EL expression. | FALSE    |
| `limit`                | Valid Okta EL expression that evaluates to an integer between 1 and 100, inclusive to indicate the maximum number of Groups to return  | FALSE    |

The string produced by the `group_expression` parameter usually contains attributes and objects from the [Groups API](/docs/reference/api/groups/), although it isn't limited to those attributes and objects. Attributes and objects listed in the [Group Attributes](/docs/reference/api/groups/#group-attributes) section of the Groups API can be any of the following: `id`, `status`, `name`, `description`, `objectClass`, and the `profile` object that contains the `groupType`, `samAccountName`, `objectSid`, `groupScope`, `windowsDomainQualifiedName`, `dn`, and `externalID` attributes for Groups that come from apps such as Active Directory.

The whitelist parameter must evaluate to a list of group IDs that are returned from the [Groups API](/docs/reference/api/groups/). If the user isn't a member of a group in the whitelist, the group is ignored.

**Parameter Examples**

* whitelist
  * Array: <code class="OKTA-263808">{"00gn335BVurvavwEEL0g3", "00gnfg5BVurvavAAEL0g3"}</code>
  * Array variable: `app.profile.groups.whitelist`
* group_expression
  * Attribute name: `"group.id"`
  * Okta EL string that contains an `if` condition: `"(group.objectClass[0] == 'okta:windows_security_principal') ? 'AD: ' + group.profile.windowsDomainQualifiedName : 'Okta: ' + group.name"` If `okta:windows_security_principal` is true for a group, the function returns the `windowsDomainQualifiedName` prefixed with `AD:`. Otherwise, the function returns the group name prefixed with `Okta:`.
* limit
  * Integer between 1 and 100, inclusive. For example: `50`
  * Okta EL expression that contains a condition that evaluates to an integer: `app.profile.maxLimit < 100 ? app.profile.maxLimit : 100`. If the maximum group limit in the profile is less than 100, return that number of Groups. Otherwise, return a maximum of 100 Groups. If there are more Groups returned than the specified limit, an error is returned.

<NextSectionLink/>
