---
title: Create an ID Token or Access Token Containing a Groups Claim
excerpt: >-
  Use the app profile to create an ID token or access token that contains a
  groups claim
---

# Create an ID Token or Access Token that Contains a Groups Claim

You can add a groups claim for any combination of application groups and user groups into ID tokens to perform SSO using the Okta Authorization Server, or ID tokens and access tokens to perform authentication and authorization using the Custom Authorization Server (API Access Management required). This process optionally uses Okta's flexible app profile, which accepts any JSON-compliant content, to create a whitelist of groups that can then easily be referenced. This is especially useful if you have a large number of groups to whitelist or otherwise need to set group whitelists on a per-application basis.

## Create a Groups Claim for Okta-Mastered Groups
Do the following to create a Groups claim for Okta-mastered groups on an OpenID Connect client application. This approach is recommended if you are only using Okta-mastered groups.

>These steps require the administrator UI. If you are using the Developer Console, select the drop-down control on the left side of the top banner to switch to the Classic UI.

1. In the administrator UI, from the **Applications** menu, select **Applications**, and then select the OpenID Connect client application that you want to configure.

2. Navigate to the **Sign On** tab and click **Edit** in the **Open ID Connect ID Token** section.

3. In **Groups claim type**, choose either **Filter** or **Expression**.

4. In **Group claims filter**, leave the default name **groups** or change it if you want, and then add the appropriate filter or expression. For example, select **Filter**, and then select **Matches regex** and enter `.*` to return the user's groups. See [Okta Expression Language Group Functions](/reference/okta_expression_language/#group-functions) for more information.

5. Add the groups claim to the scopes in your request. The ID token is returned in the response.

Request Example:
```bash
cURL -X GET \
"https://your-okta-domain/oauth2/v1/authorize?client_id=0baiz2v8m6unWCvXM0h7
&response_type=id_token
&scope=openid%20groups
&redirect_uri=http:%2F%2Flocalhost:8080
&state=myState&nonce=yourNonceValue"
```

Notes:
* You can also create a claim directly in a Custom Authorization Server instead of on the OpenID Connect or OAuth 2.0 app.
* The maximum number of groups that you can specify must be less than 100.

## Create Groups Claims with a Dynamic Whitelist

You can use the [Okta Expression Language Group Functions](/reference/okta_expression_language/#group-functions) to use static and dynamic whitelists.

Three Group functions help you use dynamic group whitelists:  `contains`, `startsWith`, and `endsWith`.

These functions return all the groups that match the specified criteria. Use this function to get a list of groups that include the current user as a member.

You can use this function anywhere to get a list of groups of which the current user is a member, including both user groups and app groups that originate from sources outside Okta, such as from Active Directory and Workday. Additionally, you can use this combined, custom-formatted list for customizable claims into Access and ID Tokens that drive authorization flows. All three functions have the same parameters:

| Parameter | Description | Nullable | Example Values |
| :------------- | :-------------- | :---------- | :--------------------- |
| app | Application type or App ID | FALSE | `"OKTA"`, `"0oa13c5hnZFqZsoS00g4"`, `"active_directory"` |
| pattern | Search term | FALSE | `"Eastern-Region"`, `"Eastern"`, `"-Region"` |
| limit | Maximum number of groups returned. Must be a valid EL expression and evaluate to a value from 1 to 100. | FALSE | `1`, `50`, `100` |

To use these functions to create a token using a dynamic group whitelist, create a Groups claim on an app:

1. In the administrator UI, from the **Applications** menu, select **Applications**, and then select the client application that you want to configure.

2. Navigate to the **Sign On** tab and click **Edit** in the **Open ID Connect ID Token** section.

3. In **Groups claim type**, choose **Expression**.

4. In **Group claims filter**, leave the default name **groups** or change it if you want.

5. In **Groups claim expression**, add one of the three functions with the criteria for your dynamic group whitelist:

    `Groups.startsWith("active_directory", "myGroup", 10)`

  Notes:
  * The syntax for these three functions is different from `getFilteredGroups`.
  * You can also create a claim directly in a Custom Authorization Server instead of on the OpenID Connect or OAuth 2.0 app.

## Create Groups Claims with a Static Whitelist

Before you start, perform the following two tasks for either Okta Authorization Server or Custom Authorization Server.

 * Create an OAuth 2.0 or OpenID Connect client with the [Apps API](/docs/api/resources/apps#request-example-8). In the instruction examples, the client ID is `0oabskvc6442nkvQO0h7`.
 * Create the groups that you want to configure in the groups claim. In the instruction examples, we're configuring the `WestCoastDivision` group, and the group ID is `00gbso71miOMjxHRW0h7`.

Now, use the instructions for your chosen authorization server to create a group claim, assign a group whitelist to your client app, and configure a groups claim that references a whitelist:

* [Create a Token with a Groups Claim with Okta Authorization Server](#create-a-token-with-a-groups-claim-okta-authorization-server)
* [Create a Token with a Groups Claim with Custom Authorization Server](#create-a-token-with-a-groups-claim-custom-authorization-server)

For examples using [Okta Expression Language Group Functions](/reference/okta_expression_language/#group-functions) in static whitelists, see [Use Group Functions for Static Group Whitelists](#use-group-functions-for-static-group-whitelists).


### Create a Token with a Groups Claim (Okta Authorization Server)

Use this procedure if you have the Okta Authorization Server, not the `default` or other Custom Authorization Server.

#### Step One: Get the Group IDs

Send a request to `https://{yourOktaDomain}/api/v1/groups` and collect the IDs for all the groups you'll want to whitelist.

   Request Example:

```bash
curl -X GET \
-H 'accept: application/json' \
-H 'authorization: SSWS ${api_token}' \
-H 'content-type: application/json' \
"https://{yourOktaDomain}/api/v1/groups"
```

   Response Example:

```json
[
  {
    "id": "00gbso71miOMjxHRW0h7",
    "created": "2017-08-25T21:15:48.000Z",
    "lastUpdated": "2017-08-25T21:15:48.000Z",
    "lastMembershipUpdated": "2017-08-25T21:16:07.000Z",
    "objectClass": [
      "okta:user_group"
    ],
    "type": "OKTA_GROUP",
    "profile": {
      "name": "WestCoastDivision",
      "description": "Employees West of the Rockies"
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
        "href": "https://{yourOktaDomain}/api/v1/groups/00gbso71miOMjxHRW0h7/users"
      },
      "apps": {
        "href": "https://{yourOktaDomain}/api/v1/groups/00gbso71miOMjxHRW0h7/apps"
      }
    }
  }
]
```

This example uses one `groupId` for simplicity's sake.

#### Step Two: Add a List of Groups to the Profile of the Client App

If you only have one or two groups to specify, simply add the group IDs to the first parameter of the `getFilteredGroups` function described in the next step.
However, if you have a lot of groups to whitelist, you can put the group IDs in the client app's profile property bag: `https://{yourOktaDomain}/api/v1/apps/${applicationId}`.
The following example names the group whitelist `groupwhitelist`, but you can name it anything.

Request Example:

```bash
curl -X PUT \
"https://{yourOktaDomain}/api/v1/apps/0oabskvc6442nkvQO0h7" \
-H 'accept: application/json' \
-H 'authorization: SSWS ${api_token}' \
-H 'cache-control: no-cache' \
-H 'content-type: application/json' \
-d '{
  "name": "oidc_client",
  "label": "Sample Client",
  "status": "ACTIVE",
  "signOnMode": "OPENID_CONNECT",
  "credentials": {
    "oauthClient": {
      "token_endpoint_auth_method": "client_secret_post"
    }
  },
  "settings": {
    "oauthClient": {
      "client_uri": "http://localhost:8080",
      "logo_uri": "http://developer.okta.com/assets/images/logo-new.png",
      "redirect_uris": [
        "https://example.com/oauth2/callback",
        "myapp://callback"
      ],
      "response_types": [
        "token",
        "id_token",
        "code"
      ],
      "grant_types": [
        "implicit",
        "authorization_code"
      ],
      "application_type": "native"
    }
  },
  "profile": {
    "groupwhitelist": [
      "00gbso71miOMjxHRW0h7"
    ]
  }
}'
```

You can add application groups, user groups, or both to the group whitelist, specified as an array of IDs.

To use the group whitelist for every client that gets this claim in a token, put the attribute name of the whitelist in the first parameter of the `getFilteredGroups` function described in the next step.

#### Step Three: Configure a Custom Claim for Your Groups (Okta Authorization Server)

For Okta Authorization Server, you can only create an ID token with a groups claim, not an access token.

> This step requires the administrator UI. If you are using the Developer Console, select the drop-down control on the left side of the top banner to switch to Classic UI for Step Three.

 a. In the administrator UI, from the **Applications** menu, select **Applications**, and then select the client application that you want to configure.

 b. Navigate to the **Sign On** tab and click **Edit** in the **Open ID Connect ID Token** section.

 c. In **Groups claim type**, choose **Expression**.

 d. In **Group claims filter**, leave the default name `groups` or change it if you want.

 e. In **Groups claim expression**, add this expression: `getFilteredGroups(app.profile.groupwhitelist, "group.name", 40)`.

#### Step Four: Send a Test Request

To obtain a token with the configured groups claim, send a request for an ID token that includes the `groups` claim set in Step 3.c. as a scope to `https://{yourOktaDomain}/oauth2/v1/authorize`, as illustrated in the following example.

Request Example for Okta Authorization Server:

```bash
curl -X GET \
"https://{yourOktaDomain}/oauth2/v1/authorize?client_id=0oabskvc6442nkvQO0h7
&response_type=id_token
&response_mode=fragment&scope=openid%20groups
&redirect_uri=https%3A%2F%2Fexample.com
&state=myState&nonce=${yourNonceValue}"
```

#### Step Five: Decode the JWT to Verify

Decode the JWT in the response to see that the groups are in the token. For example, this JWK contains the `groups` claim in an ID token:

 ```JSON
eyJraWQiOiJiS0U0czM3d01tQWZ5ZzQtVFJQcVg1YW50blE1ajBuNFJKcE9nSl9zT0JVIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIwMHU1dDYwaWxvT0hOOXBCaTBoNyIsInZlciI6MSwiaXNzIjoiaHR0cHM6Ly9teXN0aWNvcnAub2t0YXByZXZpZXcuY29tIiwiYXVkIjoiMG9hYnNrdmM2NDQybmt2UU8waDciLCJpYXQiOjE1MTQ0OTc3ODEsImV4cCI6MTUxNDUwMTM4MSwianRpIjoiSUQua0FlMWFzU08wM00walp0Y2ZHZGtpWGwwUW9LRHE5aHl3OE1VUU1UNGwtWSIsImFtciI6WyJwd2QiXSwiaWRwIjoiMDBvNXQ2MGlsM1V6eUllNXYwaDciLCJub25jZSI6IjQ1YzExMDJiLTM0MmUtNGZjMC04ZDllLWM0NTY0MmFlOWFkOCIsImF1dGhfdGltZSI6MTUxNDQ5NjM1MCwiZ3JvdXBzIjpbIldlc3RDb2FzdERpdmlzaW9uIl19.ACKbJZ-lbGtgBAQDhamq7K9WJzHS0WySN0R2LXSkBahWWVMU1W-oTh2xDuHmyQv6HZpk-V4epnk-OItRBQb214NsRG8AJGn5n3QGYp5xPWVXXQ_hFZSro4br6Rdn_U8iZebqs6EXpGhxG7tN9VEgB-SkAynHdy2MbQpikGWcxORSA8vQLQhDRt2VZDobienTA8zLeThzOyAmhPjELxHRHFVT1OOrEoCqUV6wlk8LfhATRlxZGm6lrlZQbqxV_PDM8u7zN0l9XV01Rh0WHO7zZ_Oq0PEeQkf-TC9x7Gl_pOuRyRfGEsrqq-ZEL6AZszxotRKQJO1nNahAhfbNESO2mg
```

Example Payload Data for the ID Token:

```JSON
{
  "sub": "00u5t60iloOHN9pBi0h7",
  "ver": 1,
  "iss": "https://{yourOktaDomain}",
  "aud": "0oabskvc6442nkvQO0h7",
  "iat": 1514497781,
  "exp": 1514501381,
  "jti": "ID.kAe1asSO03M0jZtcfGdkiXl0QoKDq9hyw8MUQMT4l-Y",
  "amr": [
    "pwd"
  ],
  "idp": "00o5t60il3UzyIe5v0h7",
  "nonce": "${yourNonceValue}",
  "auth_time": 1514496350,
  "groups": [
    "WestCoastDivision"
  ]
}
```

The ID token contains the group `WestCoastDivision` so the audience (`aud`) has access to the group information about the user.

For flows other than implicit, post to the token endpoint `https://{yourOktaDomain}/oauth2/v1/token` with the user or client that you want. Make sure the user is assigned to the app and to one of the groups from your whitelist.

If the results aren't as expected, start your troubleshooting by inspecting the System Log to see what went wrong. Also, try requesting only an ID token instead of both an ID token and an access token.

### Create a Token with a Groups Claim (Custom Authorization Server)

#### Step One: Get the Group IDs

Send a request to `https://{yourOktaDomain}/api/v1/groups` and collect the IDs for all the groups you'll want to whitelist.

Request Example:

```bash
curl -X GET \
-H 'accept: application/json' \
-H 'authorization: SSWS ${api_token}' \
-H 'content-type: application/json' \
"https://{yourOktaDomain}/api/v1/groups"
```

This example uses one `groupId` for simplicity's sake.

 Response Example:

```json
[
  {
    "id": "00gbso71miOMjxHRW0h7",
    "created": "2017-08-25T21:15:48.000Z",
    "lastUpdated": "2017-08-25T21:15:48.000Z",
    "lastMembershipUpdated": "2017-08-25T21:16:07.000Z",
    "objectClass": [
      "okta:user_group"
    ],
    "type": "OKTA_GROUP",
    "profile": {
      "name": "WestCoastDivision",
      "description": "Employees West of the Rockies"
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
        "href": "https://{yourOktaDomain}/api/v1/groups/00gbso71miOMjxHRW0h7/users"
      },
      "apps": {
        "href": "https://{yourOktaDomain}/api/v1/groups/00gbso71miOMjxHRW0h7/apps"
      }
    }
  }
]
```

#### Step Two:  Add a List of Groups to the Profile of the Client App

If you only have one or two groups to specify, simply add the group IDs to the first parameter of the `getFilteredGroups` function described in the next step.
However, if you have a lot of groups to whitelist, you can put the group IDs in the client app's profile property bag: `https://{yourOktaDomain}/api/v1/apps/${applicationId}`.

This example names the group whitelist `groupwhitelist`, but you can name it anything.

Request Example:

```bash
curl -X POST \
"https://{yourOktaDomain}/api/v1/apps/0oabskvc6442nkvQO0h7" \
-H 'accept: application/json' \
-H 'authorization: SSWS ${api_token}' \
-H 'cache-control: no-cache' \
-H 'content-type: application/json' \
-d '{
  "name": "oidc_client",
  "label": "Sample Client",
  "status": "ACTIVE",
  "signOnMode": "OPENID_CONNECT",
  "credentials": {
    "oauthClient": {
      "token_endpoint_auth_method": "client_secret_post"
    }
  },
  "settings": {
    "oauthClient": {
      "client_uri": "http://localhost:8080",
      "logo_uri": "http://developer.okta.com/assets/images/logo-new.png",
      "redirect_uris": [
        "https://example.com/oauth2/callback",
        "myapp://callback"
      ],
      "response_types": [
        "token",
        "id_token",
        "code"
      ],
      "grant_types": [
        "implicit",
        "authorization_code"
      ],
      "application_type": "native"
    }
  },
  "profile": {
    "groupwhitelist": [
      "00gbso71miOMjxHRW0h7"
    ]
  }
}'
```

You can add application groups, user groups, or both to the group whitelist specified as an array of IDs.

To use the group whitelist for every client that gets this claim in a token, put the attribute name of the whitelist in the first parameter of the `getFilteredGroups` function described in the next step.

#### Step Three: Configure a Custom Claim for Your Groups (Custom Authorization Server)

Add a custom claim for the ID token or access token on a Custom Authorization Server with the following function:

```
 getFilteredGroups({app.profile.whitelist},
 "{value-to-represent-the-group-in-the-token}",
 {maximum-number-of-groups-to-include-in-token})
```

The maximum number of groups specified must be less than 100.

In the following two examples for creating the groups claim, the `name` for the claim is `groups`, but you can name it whatever you want.

##### Request Example for Access Token

```bash
curl -X POST \
"https://{yourOktaDomain}/api/v1/authorizationServers/ausain6z9zIedDCxB0h7/claims" \
-H 'accept: application/json' \
-H 'authorization: SSWS ${api_token}' \
-H 'cache-control: no-cache' \
-H 'content-type: application/json' \
-d '{
  "name": "groups",
  "status": "ACTIVE",
  "claimType": "RESOURCE",
  "valueType": "EXPRESSION",
  "value": "\"getFilteredGroups(app.profile.groupwhitelist, \"group.name\", 40)\"",
  "conditions": {
    "scopes": []
  }
}'
```

##### Request Example for ID Token

```bash
curl -X POST \
"https://{yourOktaDomain}/api/v1/authorizationServers/ausain6z9zIedDCxB0h7/claims" \
-H 'accept: application/json' \
-H 'authorization: SSWS ${api_token}' \
-H 'cache-control: no-cache' \
-H 'content-type: application/json' \
-d '{
  "name": "groups",
  "status": "ACTIVE",
  "claimType": "IDENTITY",
  "valueType": "EXPRESSION",
  "value": "\"getFilteredGroups(app.profile.groupwhitelist, \"group.name\", 40)\"",
  "conditions": {
    "scopes": []
  }
}'
 ```

Be sure that you have a policy and rule set up in your Custom Authorization Server or the request in the next step won't work.

See [Create Groups Claims with a Dynamic Whitelist](#create-groups-claims-with-a-dynamic-whitelist) above for more information about specifying groups with `getFilteredGroups`.

Now when you mint a token, groups in the `groupwhitelist` that also have the user as a member are included in the `groups` claim. Test your configuration in the next step.

#### Step Four: Send a Test Request

To obtain a token with the configured groups claim, send a request for an ID token that includes one of the scopes that the claim is associated with: `https://{yourOktaDomain}/oauth2/${authServerId}/v1/authorize`.

##### Request Example for Custom Authorization Server:

```bash
curl -X GET \
"https://{yourOktaDomain}/oauth2/ausain6z9zIedDCxB0h7/v1/authorize?client_id=0oabskvc6442nkvQO0h7
&response_type=id_token
&response_mode=fragment
&scope=groups%20openid
&redirect_uri=https%3A%2F%2Fexample.com
&state=myState&nonce=${myNonceValue}"
 ```

>Note:
* In this example, the claim was configured to work with all scopes. If you specify only certain scopes to return the claim, you'll need to specify one of them in the request.
* To obtain an access token, simply change `response_type=id_token` to `response_type='token'`.

#### Step Five: Decode the JWT to Verify

Decode the JWT in the response to see that the groups are in the token. For example, this JWK contains the group claim:

```JSON
eyJraWQiOiJ2U2N0OVJ0R2g5ang5QVFfT05aNEFhM19lZ3YwVlktelJKWTZvbmE5R3o4IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIwMHU1dDYwaWxvT0hOOXBCaTBoNyIsInZlciI6MSwiaXNzIjoiaHR0cHM6Ly9teXN0aWNvcnAub2t0YXByZXZpZXcuY29tL29hdXRoMi9hdXNhaW42ejl6SWVkREN4QjBoNyIsImF1ZCI6IjBvYWJza3ZjNjQ0Mm5rdlFPMGg3IiwiaWF0IjoxNTE0NDk3MzQ2LCJleHAiOjE1MTQ1MDA5NDYsImp0aSI6IklELlo1RkhPY1BhUUI3Q3ExeXhkRElIRzhieDd0Y3gxVGxYcFdvZTY4cHpGSDgiLCJhbXIiOlsicHdkIl0sImlkcCI6IjAwbzV0NjBpbDNVenlJZTV2MGg3Iiwibm9uY2UiOiIzODBiNTgwMS05MTYzLTRjNGEtOWMyMS1kNjBhMmEzMzJhNzciLCJhdXRoX3RpbWUiOjE1MTQ0OTYzNTAsIm15Z3JvdXBXaGl0ZWxpc3QiOlsiV2VzdENvYXN0RGl2aXNpb24iXX0.X4_rs_bgmWW5cX6p-fur_EN4-Uf2hz3jZZVUgdBRUX0x64O7wbmuPXGicjfLIMH6HRx7bETPjALNoSjvUrFI1IEHBMVROZQGvAYtB5f5ge6ZvZVNk0B8Coz6h3Y9vLmZGwxOFHR0_bbQQC2j01wKKeFPjznfMxtEuBLkD2DXuF7WkHZSmMG5dp7L9LUpvwfCQ2fv1SYRQ_pRVGIxZK5jh9O2yip4LMANbayDkF0Ud8lbq9CAv3Zz4tG77Cwou87yphnHlPgHDrCRRiEbCoe6Q1l8UIfMC3kfaT2HoyJb6jvA91h89jgRbIvUEfasrLoSwUJQv-sYz302QiQdF8WZAQ
```

##### Example Payload Data for an ID Token:

```JSON
{
  "sub": "00u5t60iloOHN9pBi0h7",
  "ver": 1,
  "iss": "https://{yourOktaDomain}/oauth2/ausain6z9zIedDCxB0h7",
  "aud": "0oabskvc6442nkvQO0h7",
  "iat": 1514497346,
  "exp": 1514500946,
  "jti": "ID.Z5FHOcPaQB7Cq1yxdDIHG8bx7tcx1TlXpWoe68pzFH8",
  "amr": [
    "pwd"
  ],
  "idp": "00o5t60il3UzyIe5v0h7",
  "nonce": "${myNonceValue}",
  "auth_time": 1514496350,
  "groups": [
    "WestCoastDivision"
  ]
}
```

##### Example Payload Data for an Access Token:

```JSON
{
  "aud": "https://{yourOktaDomain}",
  "sub": "annie.jackson@acme.com",
  "iat": 1511983934,
  "exp": 1511987534,
  "cid": "0oabskvc6442nkvQO0h7",
  "uid": "00u5t60iloOHN9pBi0h7",
  "scp": [
    "openid"
  ],
  "groups": [
    "WestCoastDivision"
  ]
}
```

The ID token or access token contains the group `WestCoastDivision` so the audience (`aud`) has access to the group information about the user.

For flows other than implicit, post to the token endpoint `https://{yourOktaDomain}/oauth2/${authServerId}/v1/token` with the user or client you want. Make sure the user is assigned to the app and to one of the groups from your whitelist.

If the results aren't as expected, start your troubleshooting by inspecting the System Log to see what went wrong. Also, try requesting only an ID token instead of both an ID token and an access token.

### Use Group Functions for Static Group Whitelists

The `getFilteredGroups` group function helps you use a static group whitelist.

`getFilteredGroups` returns all groups contained in a specified list, the whitelist, of which the user is a member. The groups are returned in a format specified by the `group_expression` parameter. You must specify the maximum number of groups to return. The format of this EL function is `getFilteredGroups( whitelist, group_expression, limit)`.

You can use this function anywhere to get a list of groups of which the current user is a member, including both user groups and app groups that originate from sources outside Okta, such as from Active Directory and Workday. Additionally, you can use this combined, custom-formatted list for customizable claims into Access and ID Tokens that drive authorization flows.

This function takes Okta EL expressions for all parameters that evaluate to the correct data type. With these expressions you can create complex definitions for the whitelist, the group format, and for the number of groups to return that can include `if` logic and customized formatting.

| Parameter        | Description                                                                                                                            | Nullable |
|:-----------------|:---------------------------------------------------------------------------------------------------------------------------------------|:---------|
| whitelist        | Valid Okta EL expression that evaluates to a string array of group ids                                                                 | FALSE    |
| group_expression | Valid Okta EL expression that evaluates to a string to use to evaluate the group. This string must also be a valid Okta EL expression. | FALSE    |
| limit            | Valid Okta EL expression that evaluates to an integer between 1 and 100, inclusive to indicate the maximum number of groups to return  | FALSE    |

All parameters must be valid Okta EL expressions that evaluate as described above. Okta EL expressions can be comprised of strings, integers, arrays, etc.

The string produced by the `group_expression` parameter usually contains attributes and objects from the [Groups API](/docs/api/resources/groups), although it isn't limited to those attributes and objects. Attributes and objects listed in the [Group Attributes](/docs/api/resources/groups#group-attributes) section of the Groups API can be any of the following: `id`, `status`, `name`, `description`, `objectClass`, and the `profile` object that contains the `groupType`, `samAccountName`, `objectSid`, `groupScope`, `windowsDomainQualifiedName`, `dn`, and `externalID` attributes for groups that come from apps such as Active Directory.

The `whitelist` parameter must evaluate to a list of group ids that is returned from the [Groups API](/docs/api/resources/groups). If the user is not a member of a group in the whitelist, the group is ignored.

**Parameter Examples**

* whitelist
  * Array: `{"00gn335BVurvavwEEL0g3", "00gnfg5BVurvavAAEL0g3"}`<br />
  * Array variable: `app.profile.groups.whitelist`
* group_expression
  * Attribute name: `"group.id"`
  * Okta EL string containing an if condition: `"(group.objectClass[0] == 'okta:windows_security_principal') ? 'AD: ' + group.profile.windowsDomainQualifiedName : 'Okta: ' + group.name"`
      If *okta:windows_security_principal* is true for
      a group, the function returns the `windowsDomainQualifiedName` prefixed with `AD:`; otherwise, the function returns the group name prefixed with `Okta:`.
* limit
   * Integer between 1 and 100, inclusive; for example: `50`.
   * Okta EL expression containing a condition that evaluates to an integer: `app.profile.maxLimit < 100 ? app.profile.maxLimit : 100`.
    If the maximum group limit in the profile is less than 100, return that number of groups; otherwise, return a maximum of 100 groups. If there are more groups returned than the specified limit, an error is returned.
