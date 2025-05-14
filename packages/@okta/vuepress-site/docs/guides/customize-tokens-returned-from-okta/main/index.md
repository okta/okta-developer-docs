---
title: Customize tokens returned from Okta with custom claims
excerpt: Define custom claims and groups claims for tokens returned from Okta.
---

This guide explains how you can add custom claims to ID tokens and access tokens.

---

#### Learning outcomes

Create custom claims for tokens.

#### What you need

* [Okta Integrator Free Plan organization](https://developer.okta.com/signup)
* [OpenID Connect client app](https://help.okta.com/okta_help.htm?id=ext_Apps_App_Integration_Wizard-oidc) in Okta with at least [one user assigned to it](https://help.okta.com/okta_help.htm?id=ext-assign-apps)
* A [group in Okta](https://help.okta.com/okta_help.htm?id=ext_Directory_Groups) with at least one person assigned to it

---

## About tokens with custom claims

Tokens contain claims that are statements about the subject, such as name, role, or email address. Beyond the [default set of claims](/docs/guides/validate-id-tokens/main/#verify-the-claims) that are contained in ID tokens and access tokens, you can define custom claims. For example, you might want to add a user's email address to an access token and use that to uniquely identify the user. You might also want to add information stored in a user profile to an ID token or create an entitlement to add app user permissions.

[Add a groups claim](/docs/guides/customize-tokens-groups-claim/main/#add-a-groups-claim-for-the-org-authorization-server) to ID tokens for app groups and user groups to perform SSO using the org authorization server. You can also [add a groups claim](/docs/guides/customize-tokens-groups-claim/main/#add-a-groups-claim-for-a-custom-authorization-server) to ID tokens and access tokens to perform authentication and authorization using a custom authorization server. See [Authorization servers](/docs/guides/customize-authz-server/) for more information on the types of authorization servers available and what you can use them for.

<ApiAmProdWarning />

Also, you can create a [dynamic](/docs/guides/customize-tokens-dynamic/) or [static](/docs/guides/customize-tokens-static/) allowlist. Do this when you need to set group allowlists on a per-app basis using both the org authorization server and a custom authorization server. This helps if you have many groups and don't want to search all of them every time you create a groups claim. This process optionally uses the Okta app profile, which accepts any JSON-compliant content, to create an allowlist of groups that can then easily be referenced.

To add app user permissions to the ID token, create [federated app entitlement claims](/docs/guides/federated-claims/main/). An entitlement is a permission that allows users to take specific actions within a resource, such as a third-party app. App entitlements help you manage different levels of permissions that users can perform within an app.

## Request a token that contains the custom claim

There are sections in this guide that include information on building a URL to request a token that contains a custom claim. These sections refer you here for the specific steps to build the URL. Use this RUL to request a claim and decode the JSON Web Token (JWT) to verify that the claim was included in the token.

Specific request and payload examples remain in the appropriate sections. Move on to the section for the claim that you want to create if you don't currently need these steps.

To test the full authentication flow that returns an ID token or an access token, build your request URL:

1. Obtain the following values from your OpenID Connect (OIDC) app, both of which you can find on the app's **General** tab:

    * Client ID
    * Redirect URI

2. Use the authorization server's authorization endpoint:

    > **Note:** See [Authorization servers](/docs/guides/customize-authz-server/) for more information on the types of authorization servers available and what you can use them for.

    * An org authorization server `/authorize` endpoint looks like this:

        `https://{yourOktaDomain}/oauth2/v1/authorize`

    * A custom authorization server `/authorize` endpoint looks like this:

        `https://{yourOktaDomain}/oauth2/{authorizationServerId}/v1/authorize`

    > **Note:** If you add the claim to the default custom authorization server, the `{authorizationServerId}` is `default`.

    You can retrieve a custom authorization server's authorization endpoint using the [server's metadata URI](/docs/concepts/auth-servers/#discovery-endpoints-custom-authorization-server).

3. Add the following query parameters to the URL:

    * Your OIDC app's `client_id`
    * The response type, which for an ID token is `id_token` and an access token is `token`
    > **Note:** The examples in this guide use the [Implicit flow](/docs/concepts/oauth-openid/#implicit-flow). For the [Authorization Code flow](/docs/concepts/oauth-openid/#authorization-code-flow), the response type is `code`. You can exchange an authorization code for an ID token and/or an access token using the `/token` endpoint.
    * A scope, which is `openid` for the examples in this guide
    * Your OIDC app's `redirect_uri`
    * Values for `state` and `nonce`, which can be anything

    > **Note:** These values are fully documented on the [Obtain an Authorization Grant from a user](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/authorizeCustomAS) page.

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

4. After you paste the request into your browser, the browser is redirected to the sign-in page for your Okta org. Enter the credentials for a user who is mapped to your OIDC app, and then the browser is directed to the `redirect_uri` that you specified in the URL and in the OIDC app. An ID token, or an access token, and any state that you defined are included in the response. The following are response examples:

    **ID token**

    ```bash
    https://yourRedirectUriHere.com#id_token=eyJraWQiOiIxLVN5[...]C18aAqT0ixLKnJUR6EfJI-IAjtJDYpsHqML7mppBNhG1W55Qo3IRPAg&state=myState
    ```

    **Access token**

    ```bash
    https://yourRedirectUriHere.com#access_token=eyJraWQiOiIxLVN5M2w2dFl2VTR4MXBSLXR5cVZQWERX[...]YNXrsr1gTzD6C60h0UfLiLUhA&token_type=Bearer&expires_in=3600&scope=openid&state=myState
    ```

5. To check the returned ID token or access token payload, you can copy the value and paste it into any JWT decoder (for example: <https://token.dev>). Using a JWT decoder, confirm that the token contains the claims that you’re expecting, including the custom one. If you specified a nonce, that's also included.

## Add a custom claim to a token

To include custom claims in an ID token or an access token, add the claim to your custom authorization server.

> **Note:** You can only add custom claims to a custom authorization server, not the org authorization server. See [Authorization servers](/docs/guides/customize-authz-server/) for more information on the types of authorization servers available to you and what you can use them for.

To add a custom claim:

1. In the Admin Console, go to **Security** > **API**.

2. On the **Authorization Servers** tab, select the name of the custom authorization server (or select **default** when you use the `default` custom authorization server), and then click **Claims**. Okta provides a default subject claim. You can edit that mapping or create your own claims. For this example, create a custom claim.

3. Click **Add Claim**, and then configure the claim settings:

    * Enter a **Name** for the claim. In this example, use **IDTClaim** for the ID token and **ATClaim** for the access token.
    * **Include in token type**: If you’re creating a claim for an ID token, select **ID Token** (for OIDC). You can then define whether you want the claim included only when requested or always included. For this example, select **Always**.
    If you’re creating a claim for an access token, leave **Access Token** (for OAuth 2.0) selected.
    * **Value type**: Select whether you want to define the claim by a **Groups** filter or by an **Expression** written in Okta Expression Language. For this example, select **Expression**.
    * **Value**: This option appears if you choose **Expression**. Use Okta Expression Language syntax to generate values derived from attributes in Universal Directory and app profiles. For the ID token example, use `user.preferredLanguage` and for the access token example, use `user.secondEmail`. These reference an Okta user profile attribute.

      * See [Okta Expression Language](/docs/reference/okta-expression-language).
      * See [Expressions for OAuth 2.0/OIDC custom claims](/docs/reference/okta-expression-language/#expressions-for-oauth-2-0-oidc-custom-claims) for custom claim-specific expressions.
    > **Note:** In this example, the user has a preferred language and a second email defined in their profile.

    * **Disable claim**: Select if you want to temporarily disable the claim for testing or debugging. Leave this clear for this example.
    * **Include in**: Specify whether the claim is valid for any scope or select the scopes for which the claim is valid. Leave **Any scope** selected for this example.

4. Click **Create**.

    > **Note:** You can validate that your expression returns the expected results using the **Token Preview** tab.

### Verify the custom claim

To confirm that your custom claim is successfully added, you can [retrieve a list of all claims](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/AuthorizationServerClaims/#tag/AuthorizationServerClaims/operation/listOAuth2Claims) from your authorization server, including the custom ones, using the `/claims` endpoint:

`https://{yourOktaDomain}/api/v1/authorizationServers/{authorizationServerId}/claims`

> **Note:** If you add the claim to the default custom authorization server, the `{authorizationServerId}` is `default`.

### Request a token with the custom claim

To test the full authentication flow that returns an ID token or an access token, build your request URL. For the specific steps on building the request URL, receiving the response, and decoding the JWT, see [Request a token that contains a custom claim](#request-a-token-that-contains-the-custom-claim).

> **Note:** The scope that you need to include as a query parameter is `openid`.

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

The decoded JWT looks something like this:

**ID token**

```json
{
  "sub": "00uixa271s6x7qt8I0h7",
  "ver": 1,
  "iss": "https://{yourOktaDomain}/oauth2/{authorizationServerId}",
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
  "nonce": "myNonceValue",
  "auth_time": 1573756969,
  "IDTClaim": "eng"
}
```

**Access token**

```json
{
  "ver": 1,
  "jti": "AT.bcNo4WsBA8QS81SOrrTxWbqMsO50lrFxlYK88DlAPiM",
  "iss": "https://{yourOktaDomain}/oauth2/default",
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

## Include app-specific information in a custom claim

If you want to include certain app-specific information in a token claim, first add the metadata to the profile section of the app. You can access any values that are put inside the app profile using `app.profile` written in Okta Expression Language. See [Expressions for OAuth 2.0/OIDC custom claims](/docs/reference/okta-expression-language/#expressions-for-oauth-2-0-oidc-custom-claims).

To include, for example, the app `label` parameter in a token claim:

* Create an app with the Profile object.
* Add a custom claim to your custom authorization server.

> **Note:** You can directly use both `app.id` and `app.clientId` as claims.

### Create an app with the Profile object

Create an app with the profile object using the [Apps API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Application/#tag/Application/operation/createApplication!path=4/credentials/oauthClient&t=request).

```json
{
      "name": "oidc_client",
      "label": "Example App",
      "signOnMode": "OPENID_CONNECT",
      "credentials": {
        "oauthClient": {
          "token_endpoint_auth_method": "client_secret_post"
        }
      },
      "profile": {
        "label": "Example App"
        },
      "settings": {
        "oauthClient": {
          "client_uri": null,
          "logo_uri": null,
          "response_types": [
            "token"
          ],
          "grant_types": [
            "client_credentials"
          ],
          "application_type": "service",
          "consent_method": "REQUIRED",
          "issuer_mode": "ORG_URL"
        }
      }
    }
```

### Add a custom claim

> **Note:** You can only add custom claims to a custom authorization server, not the org authorization server. See [Authorization servers](/docs/guides/customize-authz-server/) for more information on the types of authorization servers available to you and what you can use them for.

To add a custom claim:

1. In the Admin Console, go to **Security** > **API**.

2. On the **Authorization Servers** tab, select the custom authorization server that you want to add the claim to, and then click **Claims**.

3. Click **Add Claim**, and then configure the claim settings:

    > **Note:** For more information on these fields, see [Add a custom claim to a token](#add-a-custom-claim-to-a-token).

    * **Name**: Enter a name for the claim, such as **applabel**.

    * **Include in token type**: Leave the default of **Access Token**.

    * **Value type**: Leave the default of **Expression** to define the claim by an Expression written in Okta Expression Language.

    * **Value**: This option appears if you chose **Expression**. For this example, enter `app.profile.label`, which is referencing the app Profile attribute that you want to include in the claim.

    > **Note:** You can validate that your expression returns the results expected using the **Token Preview** tab.

    * **Disable claim**: Leave this clear for this example.

    * **Include in**: Leave **Any scope** selected for this example.

4. Click **Create**.

5. (Optional) Confirm that your custom claim was successfully added by retrieving a list of all claims from your custom authorization server, including the custom claims, using the `/claims` endpoint. See [Verify the custom claim](#verify-the-custom-claim).

### Request a token with the custom claim

In this example, the service app's `token_endpoint_auth_method` was set to `client_secret_post` when you created the app. Include both the `client_id` and the `client_secret` values as other parameters in the POST request body to your custom authorization server's `/token` endpoint. For the specific steps on building the request URL, receiving the response, and decoding the JWT, see [Request a token that contains the custom claim](#request-a-token-that-contains-the-custom-claim).

```bash
curl -v -X POST \
-H "Content-type:application/x-www-form-urlencoded" \
"https://{yourOktaDomain}/oauth2/default/v1/token" \
-d "client_id={clientId}&client_secret={clientSecret}&grant_type=client_credentials&scope=aCustomScope"
```

If the credentials are valid, the access token is sent in the response:

```json
{
    "access_token": "eyJhbG[...]1LQ",
    "token_type": "Bearer",
    "expires_in": 3600,
    "scope": "aCustomScope"
}
```

## Next steps

Look at other ways that you can customize claims and tokens:

* [Customize tokens with a groups claim](/docs/guides/customize-tokens-groups-claim/)
* [Customize tokens returned from Okta with a dynamic allowlist](/docs/guides/customize-tokens-dynamic/)
* [Customize tokens returned from Okta with a static allowlist](/docs/guides/customize-tokens-static/)
