---
title: Use a static group whitelist with a Custom Authorization Server
---

Add a Groups custom claim for an ID token or access token in a Custom Authorization Server. The maximum number of Groups specified must be less than 100. For the following example, we are adding a custom claim for an access token.

<RequireClassicUI/>

1. In the Admin Console, from the **Security** menu, select **API**, and then select the authorization server that you want to configure.
2. Navigate to the **Claims** tab and click **Add Claim**.
3. Enter a name for the claim. For this example, name it **groups**.
4. In the **Include in token type** section, leave **Access Token** selected.
5. Leave **Expression** as the **Value type**.
6. Enter the following expression as the **Value**: `getFilteredGroups(app.profile.groupwhitelist, "group.name", 40)`
7. Click **Create**.
8. Select the **Scopes** tab and click **Add Scope**.
9. Add **groups** as the scope **Name** and **DisplayName**, and then select the **Metadata** check box.
10. Click **Create**.

> **Note:** Be sure that you have a policy and rule set up in your Custom Authorization Server or the request won't work.

Now, when you mint a token, Groups in the `groupwhitelist` that also have the user as a member are included in the Groups claim.

### Request an access token that contains the Groups claim

To obtain an access token with the configured Groups claim, send a request to the authorization endpoint for an access token that includes the Groups claim as a scope. For the specific steps on building the request URL, receiving the response, and decoding the JWT, see <GuideLink link="../request-token-claim">Request a token that contains the claim</GuideLink>.

> **Note:** The scopes that you need to include as query parameters are `openid` and `groups`.

The resulting URL looks something like this:

```bash
curl -X GET
"https://${yourOktaDomain}/oauth2/${authServerId}/v1/authorize?client_id=xamplefa39J4jXdcCwWA
&response_type=token
&scope=openid%20groups
&redirect_uri=https%3A%2F%2Fexample.com
&nonce=yourNonceValue
&state=myState"
```

> **Note:** The claim was configured to work with all scopes. If you specify only certain scopes to return the claim, you need to specify one of them in the request.

The decoded JWT looks something like this:

```json
{
  "ver": 1,
  "jti": "AT.wYGuabpyb15nr9fmvb5SQGezLYYlMfvRWvUpI8mqoOY",
  "iss": "https://${yourOktaDomain}/oauth2/ausocqn9bk00KaKbZ0h7",
  "aud": "https://${yourOktaDomain}",
  "iat": 1574286687,
  "exp": 1574290287,
  "cid": "0oaoesxtxmPf08QHk0h7",
  "uid": "00uixa271s6x7qt8I0h7",
  "scp": [
    "groups",
    "openid"
  ],
  "sub": "joe.user@example.com",
  "groups": [
    "IT"
  ]
}
```

<NextSectionLink>Next Steps</NextSectionLink>
