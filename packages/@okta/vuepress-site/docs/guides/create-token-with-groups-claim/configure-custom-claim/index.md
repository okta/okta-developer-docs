---
title: Configure a Custom Claim for Your Groups
---

### If you have an Okta Authorization Server:

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

### If you have a custom Authorization Server:

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
