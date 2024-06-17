---
title: Customize tokens returned from Okta with a dynamic allowlist
excerpt: Define groups claims for tokens returned from Okta.
layout: Guides
---

<ApiAmProdWarning />

This guide explains how to use a dynamic allowlist to define custom group claims for tokens returned from Okta. The dynamic allowlist helps define user limits with a default or custom authorization server.

---

#### Learning outcomes

Use a dynamic allowlist with an authorization server to customize Okta tokens.

#### What you need

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* [OpenID Connect client application](https://help.okta.com/okta_help.htm?id=ext_Apps_App_Integration_Wizard-oidc) in Okta with at least [one user assigned to it](https://help.okta.com/okta_help.htm?id=ext-assign-apps)
* A [group in Okta](https://help.okta.com/okta_help.htm?id=ext_Directory_Groups) with at least one person assigned to it

---

## About the dynamic allowlist

You can create a dynamic or [static allowlist](/docs/guides/customize-tokens-static/) when you need to set group allowlists on a per-app basis using both the org authorization server and a custom authorization server.

If you have many groups but only 20 groups apply to your app, you don't want to search all of your groups every time a groups claim is created. This process optionally uses the Okta app profile, which accepts any JSON-compliant content, to create an allowlist of groups that you can then easily reference.

### Add a groups claim

You can [add a groups claim](/docs/guides/customize-tokens-groups-claim/main/#add-a-groups-claim-for-the-org-authorization-server) to ID tokens for any combination of app groups and user groups to perform SSO using the org authorization server. You can also [add a groups claim](/docs/guides/customize-tokens-groups-claim/main/#add-a-groups-claim-for-a-custom-authorization-server) to ID tokens and access tokens to perform authentication and authorization using a custom authorization server.

See [Customize tokens returned from Okta](/docs/guides/customize-tokens-returned-from-okta/main/) when you want to define your own custom claims. For example, you might want to add a user's email address to an access token and use that to uniquely identify the user, or you may want to add information stored in a user profile to an ID token.

## Request a token that contains the custom claim

There are sections in this guide that include information on building a URL to request a token that contains a custom claim. These sections refer you to this page for the specific steps to build the URL to request a claim and decode the JWT to verify that the claim was included in the token. Specific request and payload examples remain in the appropriate sections. Move on to the next section if you don't currently need these steps.

To test the full authentication flow that returns an ID token or an access token, build your request URL:

1. Obtain the following values from your OpenID Connect application, both of which can be found on the application's **General** tab:

    * Client ID
    * Redirect URI

2. Use the authorization server's authorization endpoint:

    > **Note:** See [Authorization servers](/docs/guides/customize-authz-server/) for more information on the types of authorization servers available to you and what you can use them for.

    * An org authorization server authorization endpoint looks like this:

        `https://{yourOktaDomain}/oauth2/v1/authorize`

    * A custom authorization server authorization endpoint looks like this:

        `https://{yourOktaDomain}/oauth2/{authorizationServerId}/v1/authorize`

    > **Note:** If you add the claim to the default custom authorization server, the `{authorizationServerId}` is `default`.

    You can retrieve a custom authorization server's authorization endpoint using the server's metadata URI:

    **ID token**
    `https://{yourOktaDomain}/oauth2/{authorizationServerId}/.well-known/openid-configuration`

    **Access token**
    `https://{yourOktaDomain}/oauth2/{authorizationServerId}/.well-known/oauth-authorization-server`

3. Add the following query parameters to the URL:

    * Your OpenID Connect application's `client_id`
    * The response type, which for an ID token is `id_token` and an access token is `token`
    > **Note:** The examples in this guide use the [Implicit flow](/docs/concepts/oauth-openid/#implicit-flow). For the [Authorization Code flow](/docs/concepts/oauth-openid/#authorization-code-flow), the response type is `code`. You can exchange an authorization code for an ID token and/or an access token using the `/token` endpoint.
    * A scope, which for the purposes of the examples is `openid`. When you’re adding a groups claim, both the `openid` and the `groups` scopes are included.
    * Your OpenID Connect application's `redirect_uri`
    * Values for `state` and `nonce`, which can be anything

    > **Note:** All of the values are fully documented on the [Obtain an Authorization Grant from a user](/docs/reference/api/oidc/#authorize) page.

    The resulting URL looks something like this:

    ```bash
    curl -X GET
    "https://{yourOktaDomain}/oauth2/{authorizationServerId}/v1/authorize?client_id=examplefa39J4jXdcCwWA
    &response_type=id_token
    &scope=openid
    &redirect_uri=https%3A%2F%2FyourRedirectUriHere.com
    &state=myState
    &nonce=myNonceValue"
    ```

    > **Note:** The `response_type` for an access token looks like this: `&response_type=token`

4. After you paste the request into your browser, the browser is redirected to the sign-in page for your Okta org. Enter the credentials for a user who is mapped to your OpenID Connect app, and then the browser is directed to the `redirect_uri` that you specified in the URL and in the OpenID Connect app. The response contains an ID token or an access token, and any state that you defined.

    **ID token**

    ```bash
    https://yourRedirectUriHere.com#id_token=eyJraWQiOiIxLVN5[...]C18aAqT0ixLKnJUR6EfJI-IAjtJDYpsHqML7mppBNhG1W55Qo3IRPAg&state=myState
    ```

    **Access token**

    ```bash
    https://yourRedirectUriHere.com#access_token=eyJraWQiOiIxLVN5M2w2dFl2VTR4MXBSLXR5cVZQWERX[...]YNXrsr1gTzD6C60h0UfLiLUhA&token_type=Bearer&expires_in=3600&scope=openid&state=myState
    ```

5. To check the returned ID token or access token payload, you can copy the value and paste it into any JWT decoder (for example: <https://token.dev>). Using a JWT decoder, confirm that the token contains the claims that you’re expecting, including the custom one. If you specified a nonce, that's also included.

## Add a groups claim with a dynamic allowlist

You can use Okta Expression Language (EL) group functions with dynamic allowlists. Three group functions help you use dynamic group allowlists: `contains`, `startsWith`, and `endsWith`. These functions return all groups that match the specified criteria without needing to have groups specified in the app.

You can use this function anywhere to get a list of groups of which the current user is a member, including both user groups and app groups that originate from sources outside of Okta, such as Active Directory and Workday. Also, you can use this combined, custom-formatted list for customizable claims into access and ID tokens that drive authorization flows. All three functions have the same parameters:

| Parameter          | Description                                   | Nullable       | Example values                        |
| :----------------- | :-------------------------------------------  | :------------- | :------------------------------------ |
| app                | Application type or App ID                    | FALSE          | `"OKTA"`,`"0oa13c5hnZFqZsoS00g4"`, `"active_directory"`|
| pattern            | Search term                                   | FALSE          | `"Eastern-Region"`, `"Eastern"`, `"-Region"`|
| limit              | Maximum number of groups returned. Must be a valid EL expression and evaluate to a value between 1-100. **Note:** When you use the [Authorization Code](/docs/guides/implement-grant-type/authcode/main/) and [Authorization Code with PKCE](/docs/guides/implement-grant-type/authcodepkce/main/) flows, you can specify any number of maximum groups returned. | FALSE | `1`, `50`, `100`|

> **Important:** When you use `Groups.startWith`, `Groups.endsWith`, or `Groups.contains`, the `pattern` argument is matched and populated on the `name` attribute rather than the group's email (for example, when using G Suite). If you’re targeting groups that may have duplicate group names (such as Google groups), use the `getFilteredGroups` group function instead.
>
>Example: `getFilteredGroups({"00gml2xHE3RYRx7cM0g3"}, "group.name", 40) )`
>
>See the Parameter Examples section of [Use group functions for static group allowlists](/docs/guides/customize-tokens-static/main/#use-group-functions-for-static-group-allow-lists) for more information on the parameters used in this group function.
>

You can use a dynamic group allowlist with both the org authorization server and a custom authorization server:

* [Use a dynamic group allowlist with the org authorization server](#use-a-dynamic-group-allow-list-with-the-org-authorization-server)
* [Use a dynamic group allowlist with a custom authorization server](#use-a-dynamic-group-allow-list-with-a-custom-authorization-server)

## Use a dynamic group allowlist with the org authorization server

To use the group functions to create a token using a dynamic group allowlist, create a groups claim on an app. For an org authorization server, you can only create an ID token with a groups claim.

> **Note:** In this example, the user signing in to your app is assigned to a group called "IT."

1. In the Admin Console, go to **Applications** > **Applications**.
1. Select the client application that you want to configure.
1. Go to the **Sign On** tab and click **Edit** in the **OpenID Connect ID Token** section.
1. In the **Groups claim type** section, select **Expression**.
1. In the **Groups claims filter** section, leave the default name `groups` (or add it if the box is empty) and add one of the three functions with the criteria for your dynamic group allowlist. For this example, use `Groups.startsWith("OKTA", "IT", 10)`.
1. Click **Save**.

### Request an ID token that contains the groups claim

To test the full authentication flow that returns an ID token, build your request URL. The scopes that you need to include as query parameters are `openid` and `groups`. For the specific steps on building the request URL, receiving the response, and decoding the JWT, see [Request a token that contains the custom claim](#request-a-token-that-contains-the-custom-claim).

The resulting URL looks something like this:

```bash
curl -X GET
"https://{yourOktaDomain}/oauth2/v1/authorize?client_id=examplefa39J4jXdcCwWA
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
    "IT"
  ]
}
```

## Use a dynamic group allowlist with a custom authorization server

To use the group functions to create an ID token or an access token using a dynamic group allowlist, create a groups claim and a groups scope in the custom authorization server. For this example, add a claim for use with an access token.

> **Note:** In this example, the user signing in to your app is assigned to a group called "IT."

1. In the Admin Console, from the **Security** menu, select **API**, and then select the custom authorization server that you want to configure.
1. Go to the **Claims** tab and click **Add Claim**.
1. Enter a name for the claim. For this example, name it **dynamic_group**.
1. In the **Include in token type** section, leave **Access Token** selected.
1. Leave **Expression** as the **Value type**.
1. Enter the following expression as the **Value**: `Groups.startsWith("OKTA", "IT", 10)`

    > **Important:** When you use `Groups.startWith`, `Groups.endsWith`, or `Groups.contains`, the `pattern` argument is matched and populated on the `name` attribute rather than the group's email (for example, when using G Suite). If you’re targeting groups that may have duplicate group names (such as Google groups), use the `getFilteredGroups` group function instead.
    >
    >Example: `getFilteredGroups({"00gml2xHE3RYRx7cM0g3"}, "group.name", 40) )`
    >
    >See the Parameter Examples section of [Use group functions for static group allowlists](/docs/guides/customize-tokens-static/main/#use-group-functions-for-static-group-allow-lists) for more information on the parameters used in this group function.

1. Click **Create**.
1. Select the **Scopes** tab and click **Add Scope**.
1. Add **groups** as the scope **Name** and **DisplayName**, and then select the **Metadata** checkbox.
1. Click **Create**.

### Request an access token that contains the groups claim

To test the full authentication flow that returns an access token, build your request URL. The scopes that you need to include as query parameters are `openid` and `groups`. For the specific steps on building the request URL, receiving the response, and decoding the JWT, see [Request a token that contains the custom claim](#request-a-token-that-contains-the-custom-claim).

The resulting URL looks something like this:

```bash
curl -X GET
"https://{yourOktaDomain}/oauth2/{authorizationServerId}/v1/authorize?client_id=examplefa39J4jXdcCwWA
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
  "iss": "https://{yourOktaDomain}/oauth2/ausocqn9bk00KaKbZ0h7",
  "aud": "https://{yourOktaDomain}",
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

## See also

Other ways that you can customize claims and tokens:

* [Add a custom claim](/docs/guides/customize-tokens-returned-from-okta/main/#add-a-custom-claim-to-a-token)
* [Include App-specific information in a custom claim](/docs/guides/customize-tokens-returned-from-okta/main/#include-app-specific-information-in-a-custom-claim)
* [Customize tokens with a groups claim](/docs/guides/customize-tokens-groups-claim/)
* [Customize tokens returned from Okta with a static allowlist](/docs/guides/customize-tokens-static/)
