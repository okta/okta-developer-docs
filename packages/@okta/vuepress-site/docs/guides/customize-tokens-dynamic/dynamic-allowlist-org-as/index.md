---
title: Use a dynamic group whitelist with the Org Authorization Server
---

To use the Group Functions to create a token using a dynamic group whitelist, create a Groups claim on an app. For an Okta Org Authorization Server, you can only create an ID token with a Groups claim.

<RequireClassicUI/>

1. In the Admin Console, from the **Applications** menu, select **Applications**, and then select the client application that you want to configure.
2. Navigate to the **Sign On** tab and click **Edit** in the **OpenID Connect ID Token** section.
3. In the **Groups claim type** section, select **Expression**.
4. In the **Groups claims filter** section, leave the default name `groups` (or add it if the box is empty) and add one of the three functions with the criteria for your dynamic group whitelist. For this example: `Groups.startsWith("OKTA", "IT", 10)`
5. Click **Save**.

### Request an ID token that contains the Groups claim

To test the full authentication flow that returns an ID token, build your request URL. For the specific steps on building the request URL, receiving the response, and decoding the JWT, see <GuideLink link="../request-token-claim">Request a token that contains the claim</GuideLink>.

> **Note:** The scopes that you need to include as query parameters are `openid` and `groups`.

The resulting URL looks something like this:

```bash
curl -X GET
"https://${yourOktaDomain}/oauth2/v1/authorize?client_id=examplefa39J4jXdcCwWA
&response_type=id_token
&scope=openid%20groups
&redirect_uri=https%3A%2F%2FyourRedirectUriHere.com
&state=myState
&nonce=myNonceValue"
```

The decoded JWT looks something like this:

```json
{
  "sub": "00uixa271s6x7qt8I0h7",
  "ver": 1,
  "iss": "https://${yourOktaDomain}",
  "aud": "0oaoiuhhch8VRtBnC0h7",
  "iat": 1574207471,
  "exp": 1574211071,
  "jti": "ID.3xqAvJ3YTofkkrF0FpapgxFEExGWOEoyhWspO6SFQtA",
  "amr": [
    "pwd",
    "mfa",
    "kba"
  ],
  "idp": "00oixa26ycdNcX0VT0h7",
  "nonce": "UBGW",
  "auth_time": 1574207041,
  "groups": [
    "IT",
  ]
}
```

<NextSectionLink/>
