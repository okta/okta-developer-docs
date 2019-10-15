---
title: Add a List of Groups to the Profile of the Client App
---

### If you have an Okta Authorization Server:

If you only have one or two groups to specify, simply add the group IDs to the first parameter of the `getFilteredGroups` function described in the next step.
However, if you have a lot of groups to whitelist, you can put the group IDs in the client app's profile property bag: `https://${yourOktaDomain}/api/v1/apps/${applicationId}`.
The following example names the group whitelist `groupwhitelist`, but you can name it anything.

Request Example:

```bash
curl -X PUT \
"https://${yourOktaDomain}/api/v1/apps/0oabskvc6442nkvQO0h7" \
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

### If you have a custom Authorization Server:

If you only have one or two groups to specify, simply add the group IDs to the first parameter of the `getFilteredGroups` function described in the next step.
However, if you have a lot of groups to whitelist, you can put the group IDs in the client app's profile property bag: `https://${yourOktaDomain}/api/v1/apps/${applicationId}`.

This example names the group whitelist `groupwhitelist`, but you can name it anything.

Request Example:

```bash
curl -X POST \
"https://${yourOktaDomain}/api/v1/apps/0oabskvc6442nkvQO0h7" \
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

<NextSectionLink/>
