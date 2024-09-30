---
title: Customize tokens returned from Okta with a static allowlist
excerpt: Define groups claims for tokens returned from Okta.
layout: Guides
---

<ApiAmProdWarning />

This guide explains how to define custom groups claims for tokens that are returned from Okta. You can do this by using a static allowlist to define user limits with a default or custom authorization server.

---

#### Learning outcomes

* Customize Okta tokens with a static allowlist.
* Use a static allowlist with an authorization server.

#### What you need

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* [OpenID Connect client application](https://help.okta.com/okta_help.htm?id=ext_Apps_App_Integration_Wizard-oidc) in Okta with at least [one user assigned to it](https://help.okta.com/okta_help.htm?id=ext-assign-apps)
* A [group in Okta](https://help.okta.com/okta_help.htm?id=ext_Directory_Groups) with at least one person assigned to it

---

## About the static allowlist

You can create a [dynamic](/docs/guides/customize-tokens-dynamic/) or static allowlist when you need to set group allowlists on a per-app basis using both the org authorization server and a custom authorization server. Suppose you have many groups but only 20 groups apply to your app. You don't want to search all of your groups every time a groups claim is created. This process optionally uses Okta's flexible app profile, which accepts any JSON-compliant content, to create an allowlist of groups that can then easily be referenced.

Also, you can [add a groups claim](/docs/guides/customize-tokens-groups-claim) to ID tokens for any combination of app groups and user groups to perform SSO using the org authorization server. You can also [add a groups claim](/docs/guides/customize-tokens-groups-claim/main/#add-a-groups-claim-for-a-custom-authorization-server) to ID tokens and access tokens to perform authentication and authorization using a custom authorization server.

See [Customize tokens returned from Okta](/docs/guides/customize-tokens-returned-from-okta/main/) when you want to define your own custom claims. For example, you might want to add a user's email address to an access token and use that to uniquely identify the user.You may also want to add information stored in a user profile to an ID token.

## Request a token that contains the custom claim

There are sections in this guide that include information on building a URL to request a token that contains a custom claim. These sections refer you to this page for the specific steps to build the URL to request a claim and decode the JSON Web Token (JWT) to verify that the claim was included in the token. Specific request and payload examples remain in the appropriate sections. Move on to the next section if you don't currently need these steps.

To test the full authentication flow that returns an ID token or an access token, build your request URL:

1. Obtain the following values from your OpenID Connect application, both of which can be found on the application's **General** tab:

    * Client ID
    * Redirect URI

2. Use the authorization server's authorization endpoint:

    > **Note:** See [Authorization servers](/docs/guides/customize-authz-server/) for more information on the types of authorization servers available and their uses.

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
    * A scope. These examples use `openid` as the scope. When you add a groups claim, both the `openid` and the `groups` scopes are included.
    * Your OpenID Connect application's `redirect_uri`
    * Values for `state` and `nonce`, which can be anything

    > **Note:** All query parameters are fully documented on the [Obtain an Authorization Grant from a user](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/authorizeCustomAS) page.

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

4. After you paste the request into your browser, the browser is redirected to the sign-in page for your Okta org. Enter the credentials for a user who is mapped to your OpenID Connect app. The browser is directed to the `redirect_uri` that you specified in the URL and in the OpenID Connect app. The response contains an ID token or an access token, and any state that you defined are included in the response. The following are response examples:

    **ID token**

    ```bash
    https://yourRedirectUriHere.com#id_token=eyJraWQiOiIxLVN5[...]C18aAqT0ixLKnJUR6EfJI-IAjtJDYpsHqML7mppBNhG1W55Qo3IRPAg&state=myState
    ```

    **Access token**

    ```bash
    https://yourRedirectUriHere.com#access_token=eyJraWQiOiIxLVN5M2w2dFl2VTR4MXBSLXR5cVZQWERX[...]YNXrsr1gTzD6C60h0UfLiLUhA&token_type=Bearer&expires_in=3600&scope=openid&state=myState
    ```

5. To check the returned ID token or access token payload, you can copy the value and paste it into any JWT decoder (for example: <https://token.dev>). Use a JWT decoder to confirm that the token contains the claims that you expect, including the custom one. If you specified a nonce, that's also included in the token.

## Add a groups claim with a static allowlist

You can create a static allowlist when you need to set group allowlists on a per-application basis. Suppose you have many groups but only 20 groups apply to your app. You don't want to run through all of your groups every time a groups claim is created.

This process optionally uses the Okta app profile, which accepts any JSON-compliant content, to create an allowlist of groups that can then easily be referenced.

The following sections walk you through creating a groups claim, assigning a group allowlist to your client app, and configuring a groups claim that references an allowlist for the authorization server that you want to use.

This example configures a single group (the IT group) for simplicity. This group has a group ID of: `00goeudyucv6CcaeV0h7` and the OpenID Connect client used has a client ID of: `0oaoesxtxmPf08QHk0h7`.

### Get the group IDs

Send a request to `https://{yourOktaDomain}/api/v1/groups` and collect the IDs for the groups that you want in the allowlist.

#### Request example

```bash
curl --location --request GET 'https://{yourOktaDomain}/api/v1/groups' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: SSWS {api_token}'
```

#### Response example

```json
{
    "id": "00goeudyucv6CcaeV0h7",
    "created": "2019-11-12T19:56:23.000Z",
    "lastUpdated": "2019-11-12T19:56:23.000Z",
    "lastMembershipUpdated": "2019-11-12T22:59:13.000Z",
    "objectClass": [
        "okta:user_group"
    ],
    "type": "OKTA_GROUP",
    "profile": {
        "name": "IT",
        "description": "Info Tech"
    },
    "_links": {
        "logo": [
            {
                "name": "medium",
                "href": "https://op1static.oktacdn.com/assets/img/logos/groups/okta-medium.d7fb831bc4e7e1a5d8bd35dfaf405d9e.png",
                "type": "image/png"
            },
            {
                "name": "large",
                "href": "https://op1static.oktacdn.com/assets/img/logos/groups/okta-large.511fcb0de9da185b52589cb14d581c2c.png",
                "type": "image/png"
            }
        ],
        "users": {
            "href": "https://{yourOktaDomain}/api/v1/groups/00goeudyucv6CcaeV0h7/users"
        },
        "apps": {
            "href": "https://{yourOktaDomain}/api/v1/groups/00goeudyucv6CcaeV0h7/apps"
        }
    }
}
```

### Add a list of groups to the client App profile

If your allowlist contains many groups, you can store the group IDs as a string array property in the client app's profile. You can add app groups, user groups, or both to the group allowlist specified as an array of IDs. If you only have one or two groups to specify, simply add the group IDs to the first parameter of the `getFilteredGroups` function described in the [next step](#use-a-static-group-allow-list-with-the-org-authorization-server).

The following example names the group allowlist `groupallowlist`, but you can name it anything.

> **Tip:** To build your request body, you can first perform a GET to the `/apps` endpoint (`https://{yourOktaDomain}/api/v1/apps/{applicationId}`) using the `applicationId` for the app that you want to add the groups list to. Then, copy the response JSON that you receive to help build your request JSON for this example.

The `profile` property that contains the allowlist is at the bottom of the request example.

#### Request example

```json
{
    "name": "oidc_client",
    "label": "OIDC APP Name",
    "status": "ACTIVE",
    "signOnMode": "OPENID_CONNECT",
    "credentials": {
        "oauthClient": {
            "autoKeyRotation": true,
            "client_id": "0oaoesxtxmPf08QHk0h7",
            "token_endpoint_auth_method": "client_secret_basic"
        }
    },
    "settings": {
         "oauthClient": {
            "client_uri": null,
            "logo_uri": null,
            "redirect_uris": [
                "http://yourredirecturihere.com/"
            ],
            "response_types": [
                "code",
                "id_token",
                "token"
            ],
            "grant_types": [
                "authorization_code",
                "client_credentials",
                "implicit"
            ],
            "application_type": "web",
             "consent_method": "REQUIRED",
             "issuer_mode": "CUSTOM_URL"
     }
  },
  "profile": {
    "groupallowlist": [
        "00goeudyucv6CcaeV0h7"
    ]
   }
}
```

To use the group allowlist for every client that gets this claim in a token, put the attribute name of the allowlist in the first parameter of `getFilteredGroups`. This function is described in the [next section](#use-a-static-group-allow-list-with-the-org-authorization-server).

> **Note:** The following **Use group functions for static group allowlists** section goes into more detail on using group functions with static group allowlists. To continue with creating a groups claim with a static allowlist, [next section](#use-a-static-group-allow-list-with-the-org-authorization-server).

#### Use group functions for static group allowlists

This section discusses the `getFilteredGroups` group function and how it helps you use a static group allowlist.

`getFilteredGroups` returns all groups that are contained in a specified list, the allowlist, of which the user is a member. The groups are returned in a format specified by the `group_expression` parameter. You must specify the maximum number of groups to return in the expression.

The Expression Language (EL) function format: `getFilteredGroups(allow list, group_expression, limit)`

You can use this function anywhere to get a list of groups of which the current user is a member. This includes both user groups and app groups that originate from sources outside Okta, such as Active Directory and Workday. Also, you can use this combined, custom-formatted list for customizable claims into access and ID tokens that drive authorization flows.

> **Important:** When you use `Groups.startsWith`, `Groups.endsWith`, or `Groups.contains`, the `pattern` argument is matched and populated on the `name` attribute rather than the group's email (for example, when using Google Workspace). If you're targeting groups that may have duplicate group names (such as Google Groups), the `getFilteredGroups` group function is the best function for that use case.

This function takes Okta EL expressions for all parameters that evaluate to the correct data type. With these expressions you can create complex definitions for the allowlist, for the group format, and for the number of groups to return that can include `if` logic and customized formatting.

| Parameter              | Description                                                                    | Nullable    |
| :--------------------- | :----------------------------------------------------------------------------- | :---------- |
| `allowlist`            | Valid Okta EL expression that evaluates to a string array of group ids       | FALSE    |
| `group_expression`     | Valid Okta EL expression that evaluates to a string for use in evaluating the group. This string must also be a valid Okta EL expression. | FALSE    |
| `limit`                | Valid Okta EL expression that evaluates to an integer from 1 through 100, inclusive, to indicate the maximum number of groups to return **Note:** When you use the [Authorization Code](/docs/guides/implement-grant-type/authcode/main/) and [Authorization Code with PKCE](/docs/guides/implement-grant-type/authcodepkce/main/) flows, you can specify any number of maximum groups returned.  | FALSE    |

The string produced by the `group_expression` parameter usually contains attributes and objects from the [Groups API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Group/), although it isn't limited to those attributes and objects. Attributes and objects listed in the Groups API can be any of the following: `id`, `status`, `name`, `description`, `objectClass`, and `profile`. The [`profile`](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Group/#tag/Group/operation/getGroup!c=200&path=profile&t=response) object contains the `groupType`, `samAccountName`, `objectSid`, `groupScope`, `windowsDomainQualifiedName`, `dn`, and `externalID` attributes for groups that come from apps such as Active Directory.

The `allowlist` parameter must evaluate to a list of group IDs that are returned from the [Groups API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Group/). If the user isn't a member of a group in the allowlist, that group is ignored.

#### Parameter Examples

* `allowlist`
  * Array: <code class="OKTA-263808">{"00gn335BVurvavwEEL0g3", "00gnfg5BVurvavAAEL0g3"}</code>
  * Array variable: `app.profile.groupallowlist`
* `group_expression`
  * Attribute name: `"group.id"`
  * Okta EL string that contains an `if` condition: `"(group.objectClass[0] == 'okta:windows_security_principal') ? 'AD: ' + group.profile.windowsDomainQualifiedName : 'Okta: ' + group.name"`. If `okta:windows_security_principal` is true for a group, the function returns the `windowsDomainQualifiedName` prefixed with `AD:`. Otherwise, the function returns the group name prefixed with `Okta:`.
* `limit`
  * Integer from 1 through 100, inclusive. For example: `50`
  * Okta EL expression that contains a condition that evaluates to an integer: `app.profile.maxLimit < 100 ? app.profile.maxLimit : 100`. If the maximum group limit in the profile is less than 100, return that number of groups. Otherwise, return a maximum of 100 groups. If there are more groups returned than the specified limit, an error is returned.

## Use a static group allowlist with the org authorization server

For an org authorization server, you can only create an ID token with a groups claim, not an access token. For the steps to configure a groups claim for use with an access token, see the [Use a static group allowlist with a custom authorization server](#use-a-static-group-allowlist-with-a-custom-authorization-server) section.

1. In the Admin Console, go to **Applications** > **Applications**.
1. Select the OpenID Connect client application that you want to configure.
1. Go to the **Sign On** tab and click **Edit** in the **OpenID Connect ID Token** section.
1. In the **Groups claim type** section, select **Expression**.
1. In **Group claims expression**, leave the default name `groups` (or add it if the box is empty). Add this expression in the second box: `getFilteredGroups(app.profile.groupallowlist, "group.name", 40)`.
1. Click **Save**.

### Request an ID token that contains the groups claim

To obtain a token with the configured groups claim, send a request for an ID token that includes the groups claim as a scope to the authorization endpoint. The scopes that you need to include as query parameters are `openid` and `groups`. For the specific steps on building the request URL, receiving the response, and decoding the JWT, see [Request a token that contains the claim](#request-a-token-that-contains-the-custom-claim).

The resulting URL looks something like this:

```bash
curl -X GET \
"https://{yourOktaDomain}/oauth2/v1/authorize?client_id=0oaoesxtxmPf08QHk0h7
&response_type=id_token
&scope=openid%20groups
&redirect_uri=https%3A%2F%2Fexample.com
&state=myState
&nonce=yourNonceValue"
```

```bash
curl --location --request GET 'https://{yourOktaDomain}/oauth2/v1/authorize?client_id=0oaiw2v8m6unWCvXM0h7
&response_type=id_token
&scope=openid%20groups
&redirect_uri=https%3A%2F%2Fexample.com
&state=myState
&nonce=yourNonceValue' \
--header 'Accept: application/json'
```

The decoded JWT looks something like this:

```json
{
  "sub": "00uixa271s6x7qt8I0h7",
  "ver": 1,
  "iss": "{yourOktaDomain}",
  "aud": "0oaoesxtxmPf08QHk0h7",
  "iat": 1574117011,
  "exp": 1574120611,
  "jti": "ID.LPQaDhnBhZ9wy-B5BvamTBs7E2C8EzXuLA5P8Uyx-IE",
  "amr": [
    "mfa",
    "kba",
    "pwd"
  ],
  "idp": "00oixa26ycdNcX0VT0h7",
  "nonce": "yourNonceValue",
  "auth_time": 1574117006,
  "groups": [
    "IT"
  ]
}
```

The ID token contains the group "IT", so the audience (`aud`) has access to the group information about the user.

> **Note:** For flows other than implicit, post to the token endpoint `https://{yourOktaDomain}/oauth2/v1/token` with the user or client that you want. Make sure that the user is assigned to the app and to one of the groups from your allowlist.

If the results aren't as expected, start your troubleshooting by inspecting the [System Log](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/SystemLog/).

## Use a static group allowlist with a custom authorization server

Add a groups custom claim for an ID token or access token in a custom authorization server. The maximum number of groups specified must be less than 100. The following example demonstrates adding a custom claim for an access token.

1. In the Admin Console, from the **Security** menu, select **API**, and then select the authorization server that you want to configure.
2. Go to the **Claims** tab and click **Add Claim**.
3. Enter a name for the claim. For this example, name it **groups**.
4. In the **Include in token type** section, leave **Access Token** selected.
5. Leave **Expression** as the **Value type**.
6. Enter the following expression as the **Value**: `getFilteredGroups(app.profile.groupallowlist, "group.name", 40)`
7. Click **Create**.
8. Select the **Scopes** tab and click **Add Scope**.
9. Add **groups** as the scope **Name** and **DisplayName**, and then select the **Metadata** checkbox.
10. Click **Create**.

> **Note:** Be sure that you have a policy and rule set up in your custom authorization server or the request fails.

Now, when you mint a token, groups in the `groupallowlist` that also have the user as a member are included in the groups claim.

> **Note:** You can validate that your expression returns the results expected using the **Token Preview** tab.

### Request an access token that contains the groups claim

To obtain an access token with the configured groups claim, send a request to the authorization endpoint for an access token that includes the groups claim as a scope. The scopes that you need to include as query parameters are `openid` and `groups`. For the specific steps on building the request URL, receiving the response, and decoding the JWT, see [Request a token that contains the claim](#request-a-token-that-contains-the-custom-claim).

The resulting URL looks something like this:

```bash
curl --location --request GET 'https://{yourOktaDomain}/oauth2/{authorizationServerId}/v1/authorize?client_id=0oaiw2v8m6unWCvXM0h7
&response_type=token
&scope=openid%20groups
&redirect_uri=https%3A%2F%2Fexample.com
&state=myState
&nonce=yourNonceValue' \
--header 'Accept: application/json'
```

> **Note:** The claim was configured to work with all scopes. If you specify only certain scopes to return the claim, you need to specify one of them in the request.

The decoded JWT looks something like this:

```json
{
  "ver": 1,
  "jti": "AT.wYGuabpyb15nr9fmvb5SQGezLYYlMfvRWvUpI8mqoOY",
  "iss": "https://{yourOktaDomain}/oauth2/ausocqn9bk00KaKbZ0h7",
  "aud": "https://{yourOktaDomain}",
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

## See also

Look at other ways that you can customize claims and tokens:

* [Add a custom claim](/docs/guides/customize-tokens-returned-from-okta/main/#add-a-custom-claim-to-a-token)
* [Include App-specific information in a custom claim](/docs/guides/customize-tokens-returned-from-okta/main/#include-app-specific-information-in-a-custom-claim)
* [Customize tokens with a groups claim](/docs/guides/customize-tokens-groups-claim/)
* [Customize tokens returned from Okta with a dynamic allowlist](/docs/guides/customize-tokens-dynamic/)
