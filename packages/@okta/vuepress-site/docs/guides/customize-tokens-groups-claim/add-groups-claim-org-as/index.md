---
title: Add a Groups claim for the Org Authorization Server
---

Use these steps to create a Groups claim for an OpenID Connect client application. This approach is recommended if you are using only Okta-mastered Groups. For an Okta Org Authorization Server, you can only create an ID token with a Groups claim, not an access token. See [Authorization Servers](/docs/guides/customize-authz-server/overview/) for more information on the types of authorization servers available to you and what you can use them for.

1. In the Admin Console, go to **Applications** > **Applications**.
1. Select the OpenID Connect client application that you want to configure.
1. Go to the **Sign On** tab and click **Edit** in the **OpenID Connect ID Token** section.
1. In the **Groups claim type** section, you can select either **Filter** or **Expression**. For this example, leave **Filter** selected.
1. In the **Group claims filter** section, leave the default name `groups` (or add it if the box is empty), and then add the appropriate filter. For this example, select **Matches regex** and enter `.*` to return all of the user's Groups. See [Okta Expression Language Group Functions](/docs/reference/okta-expression-language/#group-functions) for more information on expressions.
1. Click **Save**.

### Request an ID token that contains the Groups claim

To test the full authentication flow that returns an ID token, build your request URL. The scopes that you need to include as query parameters are `openid` and `groups`. For the specific steps on building the request URL, receiving the response, and decoding the JWT, see <GuideLink link="../request-token-claim">Request a token that contains the custom claim</GuideLink>.

> **Note:** The examples in this guide use the [Implicit flow](/docs/concepts/oauth-openid/#implicit-flow) for quick testing. In the following example we are requesting only `id_token` as the `response_type` value. This means that the requests are for a [fat ID token](/docs/concepts/api-access-management/#tokens-and-scopes), and the ID token is the only token included in the response. The ID token contains any groups assigned to the user that signs in when you include the `groups` scope in the request.
>
>If you make a request to the Org Authorization Server for both the ID token and the access token, that is considered a [thin ID token](/docs/concepts/api-access-management/#tokens-and-scopes) and contains only base claims. Profile attributes and Groups aren't returned, even if those scopes are included in the request. You can use the access token to get the Groups claim from the `/userinfo` [endpoint](/docs/reference/api/oidc/#userinfo).
>

The resulting URL looks something like this:

> **Note:** In this example, the user signing in to your app is assigned to a group called "IT" as well as being a part of the "Everyone" group.

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
  "iat": 1574201516,
  "exp": 1574205116,
  "jti": "ID.ewMNfSvcpuqyS93OgVeCN3F2LseqROkyYjz7DNb9yhs",
  "amr": [
    "pwd",
    "mfa",
    "kba"
  ],
  "idp": "00oixa26ycdNcX0VT0h7",
  "nonce": "UBGW",
  "auth_time": 1574201433,
  "groups": [
    "Everyone",
    "IT"
  ]
}
```

<NextSectionLink>Next Steps</NextSectionLink>
