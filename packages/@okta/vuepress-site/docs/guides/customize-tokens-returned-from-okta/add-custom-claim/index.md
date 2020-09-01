---
title: Add a custom claim to a token
---
To include custom claims in an ID token or an access token, add the claim to your Custom Authorization Server.

> **Note:** You can only add custom claims to a Custom Authorization Server, not the Org Authorization Server. See [Authorization Servers](/docs/guides/customize-authz-server/overview/) for more information on the types of authorization servers available to you and what you can use them for.

To add a custom claim:

1. In the Developer Console, navigate to **API**, and then **Authorization Servers**.

2. Select the name of the authorization server and then click **Claims**. Okta provides a default subject claim. You can edit that mapping or create your own claims. For this example, we are creating a custom claim.

3. Click **Add Claim**, and then configure the claim settings:

    * Enter a **Name** for the claim. In this example, we use **IDTClaim** for the ID token and **ATClaim** for the access token.
    * **Include in token type** &mdash; If you are creating a claim for an ID token, select **ID Token** (for OpenID Connect). You can then define whether you want the claim included only when requested or always included. For this example, select **Always**.
    If you are creating a claim for an access token, leave **Access Token** (for OAuth 2.0) selected.
    * **Value type** &mdash; Select whether you want to define the claim by a **Groups** filter or by an **Expression** written in Okta Expression Language. For this example, select **Expression**.
    * **Value** &mdash; This option appears if you chose **Expression**. Use [Okta Expression Language](/docs/reference/okta-expression-language/) syntax to generate values derived from attributes in Universal Directory and app profiles. For the ID token example, we use `user.preferredLanguage` and for the access token example, we use `user.secondEmail`. These are referencing an Okta user profile attribute.

    > **Note:** You can validate that your expression returns the results expected using the **Token Preview** tab.

    * **Disable claim** &mdash; Select if you want to temporarily disable the claim for testing or debugging. Leave this clear for this example.
    * **Include in** &mdash; Specify whether the claim is valid for any scope or select the scopes for which the claim is valid. Leave **Any scope** selected for this example.

4. Click **Create**.

### Verify the custom claim

To confirm that your custom claim was successfully added, you can [retrieve a list of all claims](/docs/reference/api/authorization-servers/#get-all-claims) from your authorization server, including the custom ones, using the `/claims` endpoint:

`https://${yourOktaDomain}/api/v1/authorizationServers/${authServerId}/claims`

> **Note:** If you added the claim to the default authorization server, the `${authServerId}` is `default`.

### Request a token that contains the custom claim

To test the full authentication flow that returns an ID token or an access token, build your request URL. For the specific steps on building the request URL, receiving the response, and decoding the JWT, see <GuideLink link="../request-token-claim">Request a token that contains a custom claim</GuideLink>.

> **Note:** The scope that you need to include as a query parameter is `openid`.

The resulting URL looks something like this:

```bash
curl -X GET
"https://${yourOktaDomain}/oauth2/${authServerId}/v1/authorize?client_id=examplefa39J4jXdcCwWA
&response_type=id_token
&scope=openid
&redirect_uri=https%3A%2F%2FyourRedirectUriHere.com
&state=myState
&nonce=${myNonceValue}"
```

> **Note:** The `response_type` for an access token looks like this: `&response_type=token`

The decoded JWT looks something like this:

**ID token**

```json
{
  "sub": "00uixa271s6x7qt8I0h7",
  "ver": 1,
  "iss": "https://${yourOktaDomain}/oauth2/${authServerId}",
  "aud": "0oaoesxtxmPf08QHk0h7",
  "iat": 1573762864,
  "exp": 1573766464,
  "jti": "ID.T-ngjNl193t6rg3_eXifJatKDhLPviN8NG02wJLWf2g",
  "amr": [
    "mfa",
    "pwd",
    "kba"
  ],
  "idp": "00oixa26ycdNcX0VT0h7",
  "nonce": "${myNonceValue}",
  "auth_time": 1573756969,
  "IDTClaim": "eng"
}
```

**Access token**

```json
{
  "ver": 1,
  "jti": "AT.bcNo4WsBA8QS81SOrrTxWbqMsO50lrFxlYK88DlAPiM",
  "iss": "https://${yourOktaDomain}/oauth2/default",
  "aud": "api://default",
  "iat": 1573775216,
  "exp": 1573778816,
  "cid": "0oaoesxtxmPf08QHk0h7",
  "uid": "00uixa271s6x7qt8I0h7",
  "scp": [
    "openid"
  ],
  "sub": "joe.user@example.com",
  "ATClaim": "juser@gmail.com"
}
```

<NextSectionLink/>
