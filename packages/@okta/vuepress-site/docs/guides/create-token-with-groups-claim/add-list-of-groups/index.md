---
title: Add a list of groups to the client app profile
---
When you have a lot of groups to whitelist, you can put the group IDs in the client app's profile property. You can add application groups, user groups, or both to the group whitelist specified as an array of IDs. If you only have one or two groups to specify, simply add the group IDs to the first parameter of the `getFilteredGroups` function described in the <GuideLink link="../config-custom-groups-claim">next step</GuideLink>.

The following example names the group whitelist `groupwhitelist`, but you can name it anything.

> **Tip:** To build your request body, you can first perform a GET to the `/apps` endpoint (`https://${yourOktaDomain}/api/v1/apps/${applicationId}`) using the `applicationId` for the app that you want to add the groups list to. Then, copy the response json that you receive to help build your request JSON for this example.

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
                "http://localhost:8080/authorization-code/callback"
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

To use the group whitelist for every client that gets this claim in a token, put the attribute name of the whitelist in the first parameter of the `getFilteredGroups` function described in the <GuideLink link="../config-custom-groups-claim-orgas">next step</GuideLink>.

<NextSectionLink/>
