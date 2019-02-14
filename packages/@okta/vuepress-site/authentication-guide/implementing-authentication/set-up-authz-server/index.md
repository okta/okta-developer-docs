---
title: Customizing Your Authorization Server
excerpt: How to set up a custom authorization server in Okta
redirect_from:
  - /docs/how-to/set-up-auth-server.html
---

# Overview

Okta allows you to create multiple custom OAuth 2.0 authorization servers which can be used to protect your own resource servers. Within each authorization server you can define your own OAuth 2.0 scopes, claims, and access policies.

If you have an [Okta Developer Edition](https://developer.okta.com/signup/) account, you already have a custom Authorization Server created for you, called "default". For simple use cases the default Authorization Server should suffice. If your application has requirements, such as additional scopes, customizing rules for when to grant scopes, or you need additional authorization servers with different scopes and claims, then this chapter is for you.

If you only need one Authorization Server, but you'd like to know more about customizing it, you can skip ahead and find out how to:

- [Create Access Policies](#create-access-policies)
- [Create Rules for your Access Policies](#create-rules-for-each-access-policy)
- [Create Scopes](#create-scopes-optional)
- [Create Claims](#create-claims-optional)
- [Test your Authorization Server](#test-your-authorization-server-configuration)

> NOTE: For a high-level explanation of OAuth 2.0 and OpenID Connect see our [OAuth 2.0 Overview](/authentication-guide/auth-overview/).

## Create an Authorization Server

> NOTE: If you have an [Okta Developer Edition](https://developer.okta.com/signup/) account, you can skip this step because you already have a custom Authorization Server created for you, called "default". The `{authServerId}` for the default server is `default`.

1. In the administration UI, navigate to **API > Authorization Servers**.
![Authorization Server](/assets/img/ "Authorization Server")

2. Choose **Add Authorization Server** and supply the requested information.

    * **Name**
    * **Audience:** URI for the OAuth 2.0 resource server that consumes the access tokens. Use an absolute path such as `https://api.example.com/pets`.
      This value is used as the default [audience](https://tools.ietf.org/html/rfc7519#section-4.1.3) for access tokens.
    * **Description**

When complete, your Authorization Server's **Settings** tab displays the information that you provided and allows you to edit it.
![Add Authorization Server width:](/assets/img/auth_server2.png "Add Authorization Server width:")

Once the Authorization Server is created you can also edit the Signing Key Rotation setting. You can find out more about Okta's signing keys by reading about [token validation](/authentication-guide/tokens/validating-access-tokens#what-to-check-when-validating-an-access-token).

## Create Access Policies

Access policies are containers for rules. Each access policy applies to a particular OpenID Connect application, and the rules it contains define different access and refresh token lifetimes depending on the nature of the token request.

1. In the administration UI, navigate to **API > Authorization Servers**.
2. Choose the name of an Authorization Server.
3. Choose **Access Policies > Add Policy**
![Add Access Policy width:](/assets/img/access_policy1.png "Add Access Policy width:")
4. Provide the requested information:
    * **Name**
    * **Description**
    * Assign to **All clients**, or select **The following clients:** and enter the name of the Okta OpenID Connect applications covered by this access policy. This field will auto-complete the names of your OpenID Connect applications as you type.
![Access Policy Configuration width:](/assets/img/access_policy2.png "Access Policy Configuration width:")

While in the Access Policy list, you can:
* Set access policies to be active or deactivate them for testing or debugging purposes.
* Reorder any policies you create using drag-n-drop.
![Access Policy List width:](/assets/img/access_policy3.png "Access Policy List width:")

Polices are evaluated in priority order, as are the rules in a policy.
The first policy and rule that matches the client request is applied and no further rule or policy processing occurs. If a client matches no policies, the authentication attempt will fail and an error will be returned.

## Create Rules for Each Access Policy

Rules define particular token lifetimes for a given combination of grant type, user, and scope. They are evaluated in priority order, and once a matching rule is found no other rules are evaluated. If no matching rule is found, then the authorization request fails.

1. In the administration UI, navigate to **API > Authorization Servers**.
2. Choose the name of an authorization server, and select **Access Policies**.
3. Choose the name of an access policy, and select **Add Rule**.
![Add Rule width:](/assets/img/rule1.png "Add Rule width:")
4. Enter the requested information:
    * **Rule Name**
    * **IF Grant type is:** Select one or more OAuth 2.0 grant types.
    * **AND User is:** Select whether there's no user (client credentials flow), or a user assigned to a client that's assigned to this rule's policy, or a user assigned to one or more groups that you specify or a list of users that you specify.
    * **AND Requested these scopes:** Choose the scopes (any scopes, or a list that you specify) that can be requested by the user as part of the rule conditions.
    * **THEN Access token lifetime is:** Choose the length of time before an access token expires.
    * **THEN Refresh token lifetime is:** Choose the length of time before a refresh token expires.
5. Choose **Create Rule** to save the rule.
![Rules List width:](/assets/img/rule2.png "Rules List width:")

While in the Rules list for an access policy, you can:

* Set a rule to be inactive for testing or debugging.
* Reorder rules. Rules are evaluated in priority order, so the first rule in the first policy that matches the client request is applied and no further processing occurs.

>Note: Service applications (client credentials flow) have no user. If you use this flow, make sure you have at least one rule that specifies the condition **No user**.

### Rule Usage

Access policy rules are whitelists. If you want to create granular rules, you must first ensure that you have no rules that match "any" of something (for example "Any user"). You can then create specific rules for each specific use case that you do want to support. For example, if you wanted to ensure that only administrators using the implicit flow were granted access, then you would create a rule specifying that if:

- a request is made using the `implicit` grant type, and
- the user is a member of the `admin` group, and
- any scope is specified

Then the access token that is granted will have a lifetime of, for example, 1 hour.

Rules can also be used to restrict grant types, users, or scopes. For example, you could prevent the use of all scopes other than `openid` and `offline_access` by only creating rules that specifically mention those two scopes. This means you would have to:

1. Not create any rules that match "Any scopes", and
2. Ensure that all of your rules only match to the `openid` and/or `offline_access` scopes.

Any request that is sent with a different scope will not match any rules and will consequently fail.

At this point you can keep reading to find out how to create custom scopes and claims, or proceed immediately to [Testing your Authorization Server](#test-your-authorization-server-configuration).

## Create Scopes (Optional)

Scopes specify what access privileges are being requested as part of the authorization. For example, the `email` scope requests access to the user's email address. There are certain reserved scopes that are created with any Okta authorization server, which are listed [here](/docs/api/resources/oidc#scopes).

If you need scopes in addition to the reserved scopes provided, you can create them. Custom scopes can have corresponding claims that tie them to some sort of user information.

1. In the administrator UI, navigate to **API > Authorization Servers**.
2. Choose the name of the Authorization Server to display, and then select **Scopes**.
![Add Scopes width:](/assets/img/scope1.png "Add Scopes width:")

3. Choose **Scopes > Add Scope**, and provide a name and description, then choose **Create** to save the scope.
![View Scopes width:](/assets/img/scope2.png "View Scopes width:")

These scopes are referenced by the **Claims** dialog.

If you set a scope as "Default", then it will be included by default in any tokens that are created. Depending on which flow you are using, it might also allow you to exclude the `scope` parameter from your token request.

## Create Claims (Optional)

Tokens contain claims that are statements about the subject, for example name, role, or email address.

Create ID Token claims for OpenID Connect, or access tokens for OAuth 2.0:

1. In the administrator UI, navigate to **API > Authorization Servers**.
2. Choose the name of the Authorization Server to display, and choose **Claims**.
![Choose Claims width:](/assets/img/claims1.png "Choose Claims width:")
 Okta provides a default subject claim. You can edit the mapping, or create your own claims.
3. Choose **Add Claim** and provide the requested information.
![Edit Claims width:](/assets/img/claim.png "Edit Claims width:")

    * **Name**
    * **Include in token type**: Choose Access Token (OAuth 2.0) or ID Token (OpenID Connect). If you choose ID Token, you can also choose if the claim should be included only when requested, or always.
    * **Value type**: Choose whether you'll define the claim by a group filter or by an **Expression** written in Okta Expression Language.
        * **Mapping**: This option displays if you chose **Expression** in the previous field. Add the mapping here using [Okta's Expression Language](/reference/okta_expression_language/), for example `appuser.username`.
          Be sure to check that your expression returns the results expected--the expression isn't validated here.
        * **Filter**: This option displays if you chose **Groups** in the previous field. Use it to add a group filter.
    * **Disable claim**: Check this option if you want to temporarily disable the claim for testing or debugging.
    * **Include in**: Specify whether the claim is valid for any scope, or select the scopes for which it is valid.

While in the Claims list, you can:

* Sort claims by type.
* Delete claims you've created, or disable claims for testing or debugging purposes.

![Claims List width:](/assets/img/claims2.png "Claims List width:")

## Test Your Authorization Server Configuration

Once you have followed the above instructions to set-up and/or customize your Authorization Server, you can test it by sending any one of the API calls that returns OAuth 2.0 and/or OpenID Connect tokens.

> NOTE: The `{authServerId}` for the default server is `default`.

A full description of Okta's relevant APIs can be found here: [OpenID Connect & OAuth 2.0 API](/docs/api/resources/oidc).

We have included here a few things that you can try to ensure that your Authorization Server is functioning as expected.

> Note: This is not meant to be an exhaustive testing reference, but only to show some examples.

### OpenID Connect Configuration

To verify that your server was created and has the expected configuration values, you can send an API request to the Server's OpenID Connect Metadata URI: `https://{yourOktaDomain}/oauth2/${authServerId}/.well-known/openid-configuration` using an HTTP client or by typing the URI inside of a browser. This will return information about the OpenID configuration of your Authorization Server, though it does not currently return any custom scopes or claims that you might have created.

For more information on this endpoint, see here: [Retrieve Authorization Server OpenID Connect Metadata](/docs/api/resources/oidc#well-knownopenid-configuration).

### Custom Scopes and Claims

You can retrieve a list of all scopes for your Authorization Server, including custom ones, using this endpoint:

`/api/v1/authorizationServers/${authServerId}/scopes`

For more information on this endpoint, see here: [Get all scopes](/docs/api/resources/authorization-servers#get-all-scopes).

If you created any custom claims, the easiest way to confirm that they have been successfully added is to use this endpoint:

`/api/v1/authorizationServers/${authServerId}/claims`

For more information on this endpoint, see here: [Get all claims](/docs/api/resources/authorization-servers#get-all-claims).

### Testing an OpenID Connect Flow

To test your Authorization Server more thoroughly, you can try a full authentication flow which returns an ID Token. To do this, you will need a client Application in Okta with at least one User assigned to it.

For more information you can read about:
- [The OpenID Connect Application Wizard](https://help.okta.com/en/prev/Content/Topics/Apps/Apps_App_Integration_Wizard.htm)
- [How to assign a User to an Application](https://support.okta.com/help/Documentation/Knowledge_Article/27418177-Using-the-Okta-Applications-Page#Assigning)

You will need the following values from your Okta OpenID Connect application, both of which can be found on your Application's General tab:

- Client ID
- A valid Redirect URI

Once you have an OpenID Connect Application set-up, and a User assigned to it you can try the authentication flow.

First, you will need your Authorization Server's Authorization Endpoint, which you can retrieve using the Server's Metadata URI: `https://{yourOktaDomain}/oauth2/${authServerId}/.well-known/openid-configuration`. It will look like this:

`https://{yourOktaDomain}/oauth2/${authServerId}/v1/authorize`

To this you will need to add the following URL query parameters:

- Your OpenID Connect Application's `client_id` and `redirect_uri`
- A `scope`, which for the purposes of this test will be `openid` and `profile`
- A `response_mode` which you can set to `fragment`
- (Optionally) `state` and `nonce` values

All of the values are fully documented here: [Obtain an Authorization Grant from a User](/docs/api/resources/oidc#authorize).

The resulting URL would look like this:

`https://{yourOktaDomain}/oauth2/${authServerId}/v1/authorize?client_id=examplefa39J4jXdcCwWA&response_type=id_token&response_mode=fragment&scope=openid%20profile&redirect_uri=https%3A%2F%2FyourRedirectUriHere.com&state=WM6D&nonce=YsG76jo`

If you paste this into your browser you are redirected to the sign-in page for your Okta org, with a URL that looks like this:

`https://{yourOktaDomain}/login/login.htm?fromURI=%2Foauth2%2Fv1%2Fauthorize%2Fredirect%3Fokta_key%aKeyValueWillBeHere`

Here you enter in the credentials for a user who is mapped to your Open ID Connect Application and you will be directed to the `redirect_uri` that you specified along with an ID Token, and any state that you included as well:

`https://yourRedirectUriHere.com/#id_token=eyJhbGciOiJSUzI1NiIsImtpZCI6ImluZUdjZVQ4SzB1SnZyWGVUX082WnZLQlB2RFowO[...]z7UvPoMEIjuBTH-zNkTS5T8mGbY8y7532VeWKA&state=WM6D`

To check the returned ID Token you can copy the value and paste it into your JWT decoder of choice (for example <https://jsonwebtoken.io>). There you can check the payload to confirm that it contains all of the claims that you are expecting, including custom ones. If you specified a `nonce` you will also find it there:

```json
{
 "sub": "00uawpa4r4Zybz9On0h7",
 "name": "John Smith",
 "locale": "en-US",
 "ver": 1,
 "iss": "https://{yourOktaDomain}/oauth2/${authServerId}",
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

In this example we see the `nonce` with value `YsG76jo` and the custom claim `preferred_honorific` with value `Commodore`.

At this point you have set-up your Authorization Server and confirmed that it is working!
