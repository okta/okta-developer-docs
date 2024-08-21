---
title: Create an authorization server
excerpt: How to set up a custom authorization server in Okta
layout: Guides
---

<ApiAmProdWarning />

This guide explains the custom OAuth 2.0 authorization server in Okta and how to set it up.

---

#### Learning outcomes

Set up and test your authorization server.

#### What you need

[Okta Developer Edition organization](https://developer.okta.com/signup)

---

## About the authorization server

Okta allows you to create multiple custom authorization servers that you can use to protect your own resource servers. Within each authorization server you can define your own OAuth 2.0 scopes, claims, and access policies.

If you have an [Okta Developer Edition](https://developer.okta.com/signup/) account, you already have a custom authorization server created for you called `default`. If you renamed this custom authorization server, there’s an additional `Default` label to help identify the default authorization server created out of the box.

For simple use cases the default custom authorization server should suffice. If your application has requirements such as requiring more scopes, customizing rules for when to grant scopes, or you need more authorization servers with different scopes and claims, then this guide is for you.

See [Which authorization server should you use](/docs/concepts/auth-servers/#which-authorization-server-should-you-use) for more information on the types of authorization servers available to you and what you can use them for.

## Create an authorization server

> **Note:** If you have an [Okta Developer Edition](https://developer.okta.com/signup/) account and you don't want to create any additional custom authorization servers, you can skip this step. You already have a custom authorization server created for you called "default." The `{authorizationServerId}` for the default server is `default`.

1. In the Admin Console, go to **Security** > **API**.

2. On the **Authorization Servers** tab, select **Add Authorization Server** and enter the **Name**, **Audience**, and **Description** for the authorization server.

  > **Note:** An access token that is minted by a custom authorization server requires that you define the **Audience** property and that it matches the `aud` claim that is returned during access token validation. The **Audience** property should be set to the URI for the OAuth 2.0 resource server that consumes the access token. Use an absolute path such as `https://api.example.com/pets`. This value is used as the default [audience](https://tools.ietf.org/html/rfc7519#section-4.1.3) for access tokens.

When you finish, the authorization server's **Settings** tab displays the information that you provided. If you need to [edit any of the information](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/AuthorizationServer/), such as [Signing Key Rotation](/docs/concepts/key-rotation/), click **Edit**.

## Create access policies

Access policies are containers for rules. Each [access policy](/docs/guides/configure-access-policy/) applies to a particular OpenID Connect application. The rules that the policy contains define different access and refresh token lifetimes depending on the nature of the token request.

1. In the Admin Console, go to **Security** > **API**.
1. On the **Authorization Servers** tab, select the name of an authorization server.
1. Select **Access Policies**, and then **Add Policy**.
1. Enter a **Name** and a **Description** for the policy.
1. Assign the policy to **All clients** or select **The following clients:** and enter the name of the Okta OpenID Connect applications that are covered by this access policy. This field auto-completes the names of your OpenID Connect applications as you type.
1. Click **Create Policy** when you finish.

Policies are evaluated in priority order, as are the rules in a policy.
The first policy and rule that matches the client request is applied and no further rule or policy processing occurs. If a client matches no policies, the authentication attempt fails and an error is returned.

> **Note:** If you need to change the order of your policies, reorder the policies using drag and drop.

## Create Rules for each Access Policy

Rules define particular token lifetimes for a given combination of grant type, user, and scope. They’re evaluated in priority order and once a matching rule is found no other rules are evaluated. If no matching rule is found, then the authorization request fails.

Access policy rules are allowlists. If you want to create granular rules, you must first ensure that you have no rules that match "any" of something (for example "any user"). You can then create specific rules for each specific use case you do want to support. For example, if you wanted to ensure that only administrators using the Implicit flow were granted access, then you would create a rule specifying if:

* A request is made using the `implicit` grant type
* The user is a member of the `admin` group
* Any scope is specified

Then, the access token that's granted has a lifetime of, for example, one hour.

You can also use rules to restrict grant types, users, or scopes. For example, you could prevent the use of all scopes other than `openid` and `offline_access` by only creating rules that specifically mention those two scopes. This means you would have to not create any rules that match "any scopes" and ensure that all of your rules only match the `openid` and/or `offline_access` scopes.

Any request that is sent with a different scope won't match any rules and therefore fails.

To create a rule for a policy:

1. In the Admin Console, go to **Security** > **API**.
2. On the **Authorization Servers** tab, select the name of an authorization server, and then select **Access Policies**.
3. Select the name of an access policy, and then select **Add Rule**.
4. Enter a **Name** for the rule, and then use the following fields to define the rule logic:
    * **IF Grant type is:** Select one or more OAuth 2.0 grant types. See [Choosing an OAuth 2.0 flow](/docs/concepts/oauth-openid/#choosing-an-oauth-2-0-flow) for more information on understanding the type of OAuth flow (grant type) that you should use.
    * **AND User is:** Select one of the following:<br>
        **Any user assigned the app:** The rule applies to any user that is assigned to the app.<br>
        **Assigned the app and a member of one of the following:** The rule applies to users that are assigned to the app and a member of one or more groups that you specify. You can also specify a list of users to whom the rule applies.<br>
        > **Note:** The app must be assigned to this rule's policy.
    * **AND Scopes requested:** Select the scopes (any scopes, or a list that you specify) that the user can request as part of the rule conditions.
    * **THEN Use this inline hook:**  Select an [inline hook](/docs/concepts/inline-hooks/), if any, that you want to use to customize the token returned by Okta API Access Management.
    * **AND Access token lifetime is:** Select the length of time before an access token expires.
    * **AND Refresh token lifetime is:** Leave the default of `Unlimited` unless you need to customize how long you can use a refresh token before it expires.

    > **Note:** If you customize the refresh token lifetime and [rotate your refresh tokens](/docs/guides/refresh-tokens/main/#refresh-token-rotation), that lifetime is inherited from the initial refresh token minted when the user first authenticates. It stays the same through the series of refresh token rotations until the timeframe that you set expires.

    * **but will expire if not used every:** Defines the maximum time that a refresh token can be idle (unused) before it expires. For example, if a request isn't made to refresh an access token within this timeframe, the refresh token expires. Leave the default of **7 days** or make any necessary changes.

    > **Note:** This idle time resets each time a request is made to refresh an access token and when a refresh token is rotated. It doesn't affect the refresh token lifetime, only how long the refresh token can remain unused before it expires.

5. Click **Create Rule**.

Rules are evaluated in priority order. The first rule in the first policy that matches the client request is applied and no further processing occurs. If you need to change the order of your rules, reorder the rules using drag and drop.

> **Note:** Service applications, which use the Client Credentials flow, have no user. If you use this flow, make sure that you have at least one rule that specifies the condition **No user**.

At this point you can keep reading to find out how to create custom scopes and claims or proceed immediately to [Testing your authorization server](/docs/guides/customize-authz-server/main/#test-the-authorization-server).

## Create Scopes

Scopes specify what access privileges are being requested as part of the authorization. For example, the `email` scope requests access to the user's email address. There are certain reserved scopes that are created with any Okta authorization server that are listed on the OpenID Connect & OAuth 2.0 [Scopes](/docs/reference/api/oidc/#scopes) section.

If you need scopes in addition to the reserved scopes provided, you can create them. Custom scopes can have corresponding claims that tie them to some sort of user information.

1. In the Admin Console, go to **Security** > **API**.
1. On the **Authorization Servers** tab, select the name of the authorization server, and then select **Scopes**.
1. Select **Scopes** and then **Add Scope**.
1. Enter a **Name**, **Display phrase**, and **Description**.

    > **Note:** The **Display phrase** is what the user sees in the **Consent** dialog box.

1. Select **Require user consent for this scope** to require that a user grant consent for the scope.

    > **Note:** You can configure individual clients to ignore this setting and skip consent.

1. Select **Set as a default scope** if you want Okta to grant authorization requests to apps that don't specify scopes on an authorization request. If the client omits the scope parameter in an authorization request, Okta returns all default scopes that are permitted in the access token by the access policy rule.
1. Select **Include in public metadata** if you want the scope to be [publicly discoverable](/docs/reference/api/oidc/#well-known-oauth-authorization-server).
1. Click **Create**.

The [**Claims** dialog box](#create-claims) references the scopes that you add.

If you set a scope as a default scope, then it’s included by default in any tokens that are created. Depending on which flow you’re using, it might also allow you to exclude the `scope` parameter from your token request.

## Create Claims

Tokens contain claims that are statements about the subject (for example: name, role, or email address).

Create ID token claims for OpenID Connect or access tokens for OAuth 2.0:

1. In the Admin Console, go to **Security** > **API**.
1. On the **Authorization Servers** tab, select the name of the authorization server, and then click **Claims**. Okta provides a default subject claim. You can edit the mapping or create your own claims.
1. Click **Add Claim**, enter a **Name** for the claim, and configure the claim settings:

    * **Include in token type**&mdash;select **Access Token** (OAuth 2.0) or **ID Token** (OpenID Connect). If you choose **ID Token**, you can also define whether you want the claim included only when requested or always included.
    * **Value type**&mdash;select whether you want to define the claim by a **Groups** filter or by an **Expression** written using Okta Expression Language.
    * **Value**&mdash;this option appears if you choose **Expression**. Use Okta Expression Language syntax to generate values derived from attributes in Universal Directory and app profiles, for example: `appuser.username`.

      * See [Okta Expression Language](/docs/reference/okta-expression-language).
      * See [Expressions for OAuth 2.0/OIDC custom claims](/docs/reference/okta-expression-language/#expressions-for-oauth-2-0-oidc-custom-claims) for custom claim-specific expressions.
      > **Note:** Check that your expression returns the results expected. You can validate an expression using the **Token Preview** tab.
    * **Filter**&mdash;this option appears if you choose **Groups**. Use it to add a group filter.
      > **Note:** Up to 100 groups are included in the claim. If the filter results in more than that, the request fails.
    * **Disable claim**&mdash;select if you want to temporarily disable the claim for testing or debugging.
    * **Include in**&mdash;specify whether the claim is valid for any scope or select the scopes for which the claim is valid.

## Test the authorization server

After you set up and customize your authorization server, test it by sending any one of the API calls that returns OAuth 2.0 and OpenID Connect tokens.

> **Note:** The `{authorizationServerId}` for the default server is `default`.

You can find a full description of the relevant Okta APIs on the [OpenID Connect & OAuth 2.0 API](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/overview/) page.

The following are a few things that you can try to ensure that your authorization server is functioning as expected.

> **Note:** This isn't meant to be an exhaustive testing reference, but only to show some examples.

### OpenID Connect configuration

You can send an API request to the server's OpenID Connect Metadata URI to verify that your server was created and has the expected configuration values: `https://{yourOktaDomain}/oauth2/{authorizationServerId}/.well-known/openid-configuration` using an HTTP client or by typing the URI inside a browser. This returns information about the OpenID configuration of your authorization server.

For more information on this endpoint, see how to [retrieve authorization server OpenID Connect metadata](/docs/reference/api/oidc/#well-known-openid-configuration).

### Custom scopes and claims

You can retrieve a list of all scopes for your authorization server, including custom ones, using this endpoint:

`/api/v1/authorizationServers/{authorizationServerId}/scopes`

For more information on this endpoint, see [Get all scopes](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/AuthorizationServerScopes/#tag/AuthorizationServerScopes/operation/listOAuth2Scopes).

If you created any custom claims, the easiest way to confirm that they’ve been successfully added is to use this endpoint:

`/api/v1/authorizationServers/{authorizationServerId}/claims`

For more information on this endpoint, see [Get all claims](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/AuthorizationServerClaims/#tag/AuthorizationServerClaims/operation/listOAuth2Claims).

### Test an OpenID Connect flow

To test your authorization server more thoroughly, you can try a full authentication flow that returns an ID token. To do this, you need a client application in Okta with at least one user assigned to it.

For more information you can read about:

- [Create OIDC app integrations using AIW](https://help.okta.com/okta_help.htm?id=ext_Apps_App_Integration_Wizard-oidc)
- [Assign applications to users](https://help.okta.com/okta_help.htm?id=ext-assign-apps)

You need the following values from your Okta OpenID Connect application, both of which can be found on your application's **General** tab:

- Client ID
- A valid Redirect URI

Once you have an OpenID Connect application set up, and a user assigned to it, you can try the authentication flow.

First, you need the authorization server's authorization endpoint, which you can retrieve using the server's Metadata URI: `https://{yourOktaDomain}/oauth2/{authorizationServerId}/.well-known/openid-configuration`.

It looks like this:
`https://{yourOktaDomain}/oauth2/{authorizationServerId}/v1/authorize`

Add the following URL query parameters to the URL:

- Your OpenID Connect application's `client_id` and `redirect_uri`
- A `scope`, which for the purposes of this test are `openid` and `profile`
- A `response_mode`, which you can set to `fragment`
- A `state` value and a `nonce` value

> **Note:** A `nonce` value isn't required if the `response_type` is `code`.

All values are fully documented here: [Obtain an Authorization Grant from a user](/docs/reference/api/oidc/#authorize).

The resulting URL looks like this:

`https://{yourOktaDomain}/oauth2/{authorizationServerId}/v1/authorize?client_id=examplefa39J4jXdcCwWA&response_type=id_token&response_mode=fragment&scope=openid%20profile&redirect_uri=https%3A%2F%2FyourRedirectUriHere.com&state=WM6D&nonce=YsG76jo`

If you paste this into your browser, you’re redirected to the sign-in page for your Okta org with a URL that looks like this:

`https://{yourOktaDomain}/login/login.htm?fromURI=%2Foauth2%2Fv1%2Fauthorize%2Fredirect%3Fokta_key%aKeyValueWillBeHere`

Enter the credentials for a user who is mapped to your OpenID Connect application, and you’re directed to the `redirect_uri` that you specified. An ID token and any state that you defined are also included:

`https://yourRedirectUriHere.com/#id_token=eyJhbGciOiJSUzI1NiIsImtpZCI6ImluZUdjZVQ4SzB1SnZyWGVUX082WnZLQlB2RFowO[...]z7UvPoMEIjuBTH-zNkTS5T8mGbY8y7532VeWKA&state=WM6D`

To check the returned ID token, you can copy the value and paste it into any JWT decoder (for example: <https://token.dev>). Using a JWT decoder you can check the payload to confirm that it contains all claims that you’re expecting, including custom ones. If you included a `nonce` value, that value is also included:

```json
{
 "sub": "00uawpa4r4Zybz9On0h7",
 "name": "John Smith",
 "locale": "en-US",
 "ver": 1,
 "iss": "https://{yourOktaDomain}/oauth2/{authorizationServerId}",
 "aud": "fa39J40exampleXdcCwWA",
 "iat": 1498328175,
 "exp": 1498331912,
 "jti": "ID.fL39TTtvfBQoyHVkrbaqy9hWooqGOOgWau1W_y-KNyY",
 "amr": [
  "pwd"
 ],
 "idp": "examplefz3q4Yd3Zk70h7",
 "nonce": "YsG76jo",
 "preferred_username": "john@example.com",
 "given_name": "John",
 "family_name": "Smith",
 "zoneinfo": "America/Los_Angeles",
 "updated_at": 1498155598,
 "auth_time": 1498328174,
 "preferred_honorific": "Commodore"
}
```

This example includes the `nonce` with value `YsG76jo` and the custom claim `preferred_honorific` with value `Commodore`.

## See also

* [OAuth 2.0 Overview](/docs/concepts/oauth-openid/) for a high-level explanation of OAuth 2.0 and OpenID Connect.
* [Scopes](/docs/reference/api/oidc/#scopes) for further information on using scopes.
* [Claims](/docs/reference/api/oidc/#tokens-and-claims) for more information on what claims are and how to use them.
