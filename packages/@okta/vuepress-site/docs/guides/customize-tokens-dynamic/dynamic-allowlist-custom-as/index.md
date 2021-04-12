---
title: Use a dynamic group allow list with a Custom Authorization Server
---

To use the Group Functions to create an ID token or an access token using a dynamic group allow list, create a Groups claim and a Groups scope in the Custom Authorization Server. For this example, we are adding a claim for use with an access token.

> **Note:** In this example, the user signing in to your app is assigned to a group called "IT".

1. In the Admin Console, from the **Security** menu, select **API**, and then select the Custom Authorization Server that you want to configure.
2. Navigate to the **Claims** tab and click **Add Claim**.
3. Enter a name for the claim. For this example, name it **dynamic_group**.
4. In the **Include in token type** section, leave **Access Token** selected.
5. Leave **Expression** as the **Value type**.
6. Enter the following expression as the **Value**: `Groups.startsWith("OKTA", "IT", 10)`

    > **Important:** When you use `Groups.startWith`, `Groups.endsWith`, or `Groups.contains`, the `pattern` argument is matched and populated on the `name` attribute rather than the group's email (for example, when using G Suite). If you are targeting groups that may have duplicate group names (such as Google Groups), use the `getFilteredGroups` Group function instead.
    >
    >Example: `getFilteredGroups({"00gml2xHE3RYRx7cM0g3"}, "group.name", 40) )`
    >
    >See the Parameter Examples section of [Use group functions for static group allow lists](/docs/guides/customize-tokens-static/static-allowlist/#use-group-functions-for-static-group-allow-lists) for more information on the parameters used in this Group function.

7. Click **Create**.
8. Select the **Scopes** tab and click **Add Scope**.
9. Add **groups** as the scope **Name** and **DisplayName**, and then select the **Metadata** check box.
10. Click **Create**.

### Request an access token that contains the Groups claim

To test the full authentication flow that returns an access token, build your request URL. The scopes that you need to include as query parameters are `openid` and `groups`. For the specific steps on building the request URL, receiving the response, and decoding the JWT, see <GuideLink link="../request-token-claim">Request a token that contains the custom claim</GuideLink>.

The resulting URL looks something like this:

```bash
curl -X GET
"https://${yourOktaDomain}/oauth2/${authServerId}/v1/authorize?client_id=examplefa39J4jXdcCwWA
&response_type=token
&scope=openid%20groups
&redirect_uri=https%3A%2F%2FyourRedirectUriHere.com
&state=myState
&nonce=myNonceValue"
```

The decoded JWT looks something like this:

```json
{
  "ver": 1,
  "jti": "AT.lsZ5XmKiK4KxpKs2IDUBKMRgfMhiB2i2hTBZEM7epAk",
  "iss": "https://${yourOktaDomain}/oauth2/ausocqn9bk00KaKbZ0h7",
  "aud": "https://${yourOktaDomain}",
  "iat": 1574270245,
  "exp": 1574273845,
  "cid": "0oaoiuhhch8VRtBnC0h7",
  "uid": "00uixa271s6x7qt8I0h7",
  "scp": [
    "groups",
    "openid"
  ],
  "sub": "joe.user@okta.com",
  "dynamic_group": [
    "IT"
  ]
}
```

<NextSectionLink>Next Steps</NextSectionLink>
