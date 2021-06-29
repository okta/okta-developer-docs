---
title: Add a Groups claim for a Custom Authorization Server
---

Use these steps to add a Groups claim to ID tokens and access tokens to perform authentication and authorization using a Custom Authorization Server. See [Authorization Servers](/docs/guides/customize-authz-server/overview/) for more information on the types of authorization servers available to you and what you can use them for.

1. In the Admin Console, from the **Security** menu, select **API**, and then select the Custom Authorization Server that you want to configure.
2. Go to the **Claims** tab and click **Add Claim**.
3. Enter a name for the claim. For this example, name it **Groups**.
4. In the **Include in token type** section, leave **Access Token** selected. We are adding the Groups claim to an access token in this example.

    > **Note** You can configure the Groups claim to always be included in the ID token. To do that, follow these steps and select **ID Token** for the **Include in token type** value and select **Always**.

5. Select **Groups** as the **Value type**.
6. In the **Filter** drop-down box, select **Matches regex** and then enter the following expression as the **Value**: `.*`

    > **Note:** For more fine-grained filtering information, see the steps for adding a groups claim with a [dynamic](/docs/guides/customize-tokens-dynamic/add-groups-claim-dynamic/) allow list.

7. Click **Create**.

### Request an access token that contains the Groups claim

To test the full authentication flow that returns an access token, build your request URL. Make sure that you include the `openid` scope in the request. For the specific steps on building the request URL, receiving the response, and decoding the JWT, see <GuideLink link="../request-token-claim">Request a token that contains the custom claim</GuideLink>.

The resulting URL looks something like this:

> **Note:** If you add the claim to the default Custom Authorization Server, the `${authServerId}` is `default`.

```bash
curl -X GET
"https://${yourOktaDomain}/oauth2/${authServerId}/v1/authorize?client_id=examplefa39J4jXdcCwWA
&response_type=token
&scope=openid
&redirect_uri=https%3A%2F%2FyourRedirectUriHere.com
&state=myState
&nonce=myNonceValue"
```

The decoded JWT looks something like this:

```json
{
  "ver": 1,
  "jti": "AT.BYBJNkCefidrwo0VtGLHIZCYfSAeOyB0tVPTB6eqFss",
  "iss": "https://${yourOktaDomain}/oauth2/${authServerId}",
  "aud": "https://${yourOktaDomain}",
  "iat": 1617301739,
  "exp": 1617305339,
  "cid": "0oaipnnzumvqt5tiu1d6",
  "uid": "00uzrjisTQK1SlAMB1d5",
  "scp": [
    "openid"
  ],
  "sub": "joe.user@example.com",
  "GroupsClaim": [
    "Midwest Sales",
    "Everyone"
  ]
}
```

<NextSectionLink>Next Steps</NextSectionLink>
