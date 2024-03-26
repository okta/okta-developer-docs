---
title: Customize tokens returned from Okta with a Groups claim
excerpt: Define Groups claims for tokens returned from Okta.
layout: Guides
---

This guide explains how to add a Groups claim to ID tokens for any combination of App Groups and User Groups to perform single sign-on (SSO) using the org authorization server. You can also add a Groups claim to ID tokens and access tokens to perform authentication and authorization using a custom authorization server.

---

#### Learning outcomes

* Add a Groups claim to ID tokens and access tokens to perform authentication and authorization.
* Build a request URL to test the full authentication flow.

#### What you need

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* [OpenID Connect client application](https://help.okta.com/okta_help.htm?id=ext_Apps_App_Integration_Wizard-oidc) in Okta with at least [one user assigned to it](https://help.okta.com/okta_help.htm?id=ext-assign-apps)
* A [Group in Okta](https://help.okta.com/okta_help.htm?id=ext_Directory_Groups) with at least one person assigned to it

---

## About customized tokens with a Groups claim

You can create a Groups claim for an OpenID Connect client application. This approach is recommended if you are using only Okta-sourced Groups. For groups not sourced in Okta, you need to use an expression. See [Retrieve both Active Directory and Okta Groups in OpenID Connect claims](https://support.okta.com/help/s/article/Can-we-retrieve-both-Active-Directory-and-Okta-groups-in-OpenID-Connect-claims?language=en_US). For an org authorization server, you can only create an ID token with a Groups claim, not an access token.

Additionally, you can create a [dynamic](/docs/guides/customize-tokens-dynamic/) or [static](/docs/guides/customize-tokens-static/) allowlist when you need to set group allowlists on a per-application basis using both the org authorization server and a custom authorization server.

See [Customize tokens returned from Okta](/docs/guides/customize-tokens-returned-from-okta/) when you want to define your own custom claims. For example, you may want to add a user's email address to an access token and use that to uniquely identify the user, or you may want to add information stored in a user profile to an ID token.

## Request a token that contains the custom claim

There are sections in this guide that include information on building a URL to request a token that contains a custom claim. These sections refer you here for the specific steps to build the URL to request a claim and decode the JWT to verify that the claim was included in the token. Specific request and payload examples remain in the appropriate sections. Move on to the next section if you don't currently need these steps.

To test the full authentication flow that returns an ID token or an access token, build your request URL:

1. Obtain the following values from your OpenID Connect application, both of which can be found on the application's **General** tab:

    * Client ID (`client_id`)
    * Sign-in redirect URI (`redirect_uri`)

2. Use the authorization server's authorization endpoint:

    > **Note:** See [Authorization servers](/docs/guides/customize-authz-server/) for more information on the types of authorization servers available to you and what you can use them for.

    * An org authorization server authorization endpoint looks like this:

        `https://${yourOktaDomain}/oauth2/v1/authorize`

    * A custom authorization server authorization endpoint looks like this:

        `https://${yourOktaDomain}/oauth2/${authorizationServerId}/v1/authorize`

    > **Note:** If you add the claim to the default custom authorization server, the `${authorizationServerId}` is `default`.

    You can retrieve a custom authorization server's authorization endpoint using the server's metadata URI:

    **ID token**
    `https://${yourOktaDomain}/oauth2/${authorizationServerId}/.well-known/openid-configuration`

    **Access token**
    `https://${yourOktaDomain}/oauth2/${authorizationServerId}/.well-known/oauth-authorization-server`

3. Add the following query parameters to the URL:

    * Your OpenID Connect application's `client_id`
    * The response type, which for an ID token is `id_token` and an access token is `token`
    > **Note:** The examples in this guide use the [Implicit flow](/docs/concepts/oauth-openid/#implicit-flow). For the [Authorization Code flow](/docs/concepts/oauth-openid/#authorization-code-flow), the response type is `code`. You can exchange an authorization code for an ID token and/or an access token using the `/token` endpoint.
    * A scope, which for the purposes of the examples is `openid`. When you are adding a Groups claims, both the `openid` and the `groups` scopes are included.
    * Your OpenID Connect application's `redirect_uri`
    * Values for `state` and `nonce`, which can be anything

    > **Note:** All of the values are fully documented on the [Obtain an Authorization Grant from a user](/docs/reference/api/oidc/#authorize) page.

    The resulting URL looks something like this:

    ```bash
    curl -X GET
    "https://${yourOktaDomain}/oauth2/${authorizationServerId}/v1/authorize?client_id=examplefa39J4jXdcCwWA
    &response_type=id_token
    &scope=openid
    &redirect_uri=https%3A%2F%2FyourRedirectUriHere.com
    &state=myState
    &nonce=myNonceValue"
    ```

    > **Note:** The `response_type` for an access token looks like this: `&response_type=token`

4. After you paste the request into your browser, the browser is redirected to the sign-in page for your Okta org. Enter the credentials for a User who is mapped to your OpenID Connect application, and then the browser is directed to the `redirect_uri` that you specified in the URL and in the OpenID Connect app. The response contains an ID token or an access token, as well as any state that you defined. The following are response examples:

    **ID token**

    ```bash
    https://yourRedirectUriHere.com#id_token=eyJraWQiOiIxLVN5[...]C18aAqT0ixLKnJUR6EfJI-IAjtJDYpsHqML7mppBNhG1W55Qo3IRPAg&state=myState
    ```

    **Access token**

    ```bash
    https://yourRedirectUriHere.com#access_token=eyJraWQiOiIxLVN5M2w2dFl2VTR4MXBSLXR5cVZQWERX[...]YNXrsr1gTzD6C60h0UfLiLUhA&token_type=Bearer&expires_in=3600&scope=openid&state=myState
    ```

5. To check the returned ID token or access token payload, you can copy the value and paste it into any JWT decoder (for example: <https://token.dev>). Using a JWT decoder, confirm that the token contains all of the claims that you are expecting, including the custom one. If you specified a nonce, that is also included.

## Add a Groups claim for the org authorization server

Use these steps to create a Groups claim for an OpenID Connect client application. This approach is recommended if you are using only Okta-sourced Groups. For an org authorization server, you can only create an ID token with a Groups claim, not an access token. See [Authorization servers](/docs/guides/customize-authz-server/) for more information on the types of authorization servers available to you and what you can use them for.

1. In the Admin Console, go to **Applications** > **Applications**.
1. Select the OpenID Connect client application that you want to configure.
1. Go to the **Sign On** tab and click **Edit** in the **OpenID Connect ID Token** section.
1. In the **Groups claim type** section, you can select either **Filter** or **Expression**. For this example, leave **Filter** selected.
1. In the **Group claims filter** section, leave the default name `groups` (or add it if the box is empty), and then add the appropriate filter. For this example, select **Matches regex** and enter `.*` to return all of the user's Groups. See [Okta Expression Language Group Functions](/docs/reference/okta-expression-language/#group-functions) for more information on expressions.
1. Click **Save**.
1. Click the **Back to applications** link.
1. From the **More** button dropdown menu, click **Refresh Application Data**.

### Request an ID token that contains the Groups claim

To test the full authentication flow that returns an ID token, build your request URL. The scopes that you need to include as query parameters are `openid` and `groups`. For the specific steps on building the request URL, receiving the response, and decoding the JWT, see [Request a token that contains the custom claim](#request-a-token-that-contains-the-custom-claim).

> **Note:** The examples in this guide use the [Implicit flow](/docs/concepts/oauth-openid/#implicit-flow) for quick testing. In the following example we request only `id_token` as the `response_type` value. This means that the requests are for a [fat ID token](/docs/concepts/api-access-management/#tokens-and-scopes), and the ID token is the only token included in the response. The ID token contains any groups assigned to the user that signs in when you include the `groups` scope in the request.
>
>If you make a request to the org authorization server for both the ID token and the access token, that is considered a [thin ID token](/docs/concepts/api-access-management/#tokens-and-scopes) and contains only base claims. Profile attributes and Groups aren't returned, even if those scopes are included in the request. You can use the access token to get the Groups claim from the `/userinfo` [endpoint](/docs/reference/api/oidc/#userinfo).
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
  "iss": "https://{yourOktaDomain}",
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

## Add a Groups claim for a custom authorization server

Use these steps to add a Groups claim to ID tokens and access tokens to perform authentication and authorization using a custom authorization server. See [Authorization servers](/docs/guides/customize-authz-server/) for more information on the types of authorization servers available to you and what you can use them for.

1. In the Admin Console, from the **Security** menu, select **API**, and then select the custom authorization server that you want to configure.
2. Go to the **Claims** tab and click **Add Claim**.
3. Enter a name for the claim. For this example, name it **Groups**.
4. In the **Include in token type** section, leave **Access Token** selected. We are adding the Groups claim to an access token in this example.

    > **Note:** You can configure the Groups claim to always be included in the ID token. To do that, follow these steps and select **ID Token** for the **Include in token type** value and select **Always**.

5. Select **Groups** as the **Value type**.
6. In the **Filter** drop-down box, select **Matches regex** and then enter the following expression as the **Value**: `.*`

    > **Note:** For more fine-grained filtering information, see the steps for adding a Groups claim with a [dynamic](/docs/guides/customize-tokens-dynamic/) allowlist.

7. Click **Create**.

### Request an access token that contains the Groups claim

To test the full authentication flow that returns an access token, build your request URL. Make sure that you include the `openid` scope in the request. For the specific steps on building the request URL, receiving the response, and decoding the JWT, see [Request a token that contains the custom claim](#request-a-token-that-contains-the-custom-claim).

The resulting URL looks something like this:

> **Note:** If you add the claim to the default custom authorization server, the `${authorizationServerId}` is `default`.

```bash
curl -X GET
"https://${yourOktaDomain}/oauth2/${authorizationServerId}/v1/authorize?client_id=examplefa39J4jXdcCwWA
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
  "iss": "https://{yourOktaDomain}/oauth2/{authorizationServerId}",
  "aud": "https://{yourOktaDomain}",
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

## See also

Take a look at other ways that you can customize claims and tokens:

* [Add a custom claim](/docs/guides/customize-tokens-returned-from-okta/main/#add-a-custom-claim-to-a-token)
* [Include app-specific information in a custom claim](/docs/guides/customize-tokens-returned-from-okta/main/#include-app-specific-information-in-a-custom-claim)
* [Customize tokens returned from Okta with a dynamic allowlist](/docs/guides/customize-tokens-dynamic/)
* [Customize tokens returned from Okta with a static allowlist](/docs/guides/customize-tokens-static/)
