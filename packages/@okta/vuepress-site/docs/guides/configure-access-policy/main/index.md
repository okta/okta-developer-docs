---
title: Configure an access policy
meta:
  - name: description
    content: Okta access policies help you secure your APIs by defining different access and refresh token lifetimes for a given combination of grant type, user, and scope.
layout: Guides
---

This guide explains access policies and how to configure them for common scenarios.

---
<!-- Nutrition facts bullets -->
**Learning outcomes**

* Understand what access policies are and how they are used.
* Configure an access policy to limit which scopes that some clients can access.
* Configure a custom access token lifetime per client.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* An OIDC client app for testing access policies

<ApiAmProdWarning />

---

## About access policies

Access policies help you secure your APIs by defining different access and refresh token lifetimes for a given combination of grant type, user, and scope. You create policy rules to determine if an application should be permitted to access specific information from your protected APIs and for how long. Access policies are specific to a particular authorization server and the client applications that you designate for the policy.

For example, an access token for a banking API may include a `transactions:read` scope with a multi-hour token lifetime. By contrast, the lifetime of an access token for transferring funds should be only a matter of minutes.

You can also [include custom claims](/docs/guides/customize-authz-server/main/#create-claims) in ID and access tokens to disclose the information that you want to share, depending on the client and the scope of the tokens. Scopes specify what access privileges are being requested as part of the authorization. Claims are statements about the user (or `subject`), such as name, role, or email address.

For example, a shopping site may have one set of claims for customers while they browse, but another claim for administrator functions like changing a customer's personal information. Custom claims also help you by reducing the number of lookup calls that are required to retrieve user information from the Identity Provider (IdP). This benefit depends on the level of security that your apps require.

Policies are evaluated in priority order, as are the rules in a policy. The first policy and rule that match the client request are applied and no further rule or policy processing occurs. If a client matches no policies, the authentication attempt fails and an error is returned.

### Configure access policies for common scenarios

This guide provides step-by-step instructions to configure an access policy for two of the most common scenarios:

* [Limit which scopes some clients can access](#limit-which-scopes-some-clients-can-access)
* [Configure a custom token lifetime per client](#configure-a-custom-access-token-lifetime-per-client)

## Limit which scopes some clients can access

Use the following steps to create a policy that limits which scopes that a designated client can access.

### Create the policy container

1. In the Admin Console, go to **Security** > **API**.

2. On the **Authorization Servers** tab, select the name of the authorization server that you want to apply the policy to.

3. Select **Access Policies**, and then **Add Policy**.

4. Enter a **Name** and a **Description** for the policy.

5. Select **The following clients:** and start typing the names of the Okta OpenID Connect applications that you want to cover with the access policy. This field automatically displays a list of applications that match what you type.

6. Click **Create Policy**.

### Create the rule

1. Select the name of the access policy that you just created, and then select **Add Rule**.

2. Enter a **Name** for the rule, and then for this example, leave the defaults for **IF Grant type is** and **AND User is**.

3. For the **AND Scopes requested** field, select **The following scopes:** and then click **OIDC default scopes**. All of the OpenID Connect reserved scopes appear in the box.

4. Click the **x** to remove all of the scopes except for **openid** and **email**. This limits the scopes that the applications associated with this policy can request to just the `openid` and `email` scopes.

     > **Note:** Access policies rules are allowlists. Verify that there are no other rules in the policy that have **any scopes** selected and that all of your rules match only the `openid` and/or the `email` scopes.

5. Leave the other defaults and click **Create Rule**.

     > **Note:** Policies are evaluated in priority order, as are the rules in a policy. The first policy and rule that match the client request are applied and no further rule or policy processing occurs. If a client matches no policies, the authentication attempt fails and an error is returned.

### Test the setup

Let's test your access policy and get back an access token.

1. You need the following values from your Okta OpenID client application, both of which can be found on the application's **General** tab in the Admin Console:

     * Client ID
     * Valid Redirect URI

     > **Note:** Make sure that you have a user assigned to the client application.

2. Retrieve the authorization server's authorization endpoint by using the server's Metadata URI: `https://${yourOktaDomain}/oauth2/${authorizationServerId}/.well-known/openid-configuration`.

     It looks like this: `https://${yourOktaDomain}/oauth2/${authorizationServerId}/v1/authorize`

     Unless you are using the default authorization server, then it looks like this: `https://${yourOktaDomain}/oauth2/default/v1/authorize`

3. Add the following `/authorize` endpoint query parameters to the URL:

     > **Note:** All of the values are fully documented in the [OpenID Connect & OAuth 2.0 API](/docs/reference/api/oidc/#authorize) documentation.

     * The OpenID Connect application's `client_id` and `redirect_uri`
     * Scopes, which for the purposes of this example are `openid` and `email`
     * A `response_mode`, which you can set to `fragment`
     * A `state` value and a `nonce` value

     > **Note:** A `nonce` value is required if the `response_type` is `code`.

     The resulting URL looks like this:

     `https://${yourOktaDomain}/oauth2/${authorizationServerId}/v1/authorize?client_id=${client_id}&response_type=token&response_mode=fragment&scope=openid email&redirect_uri=http://yourRedirectURIHere.com&state=WM6D&nonce=YsG76jo`

4. Open a private browsing session in your browser and paste the URL into the address box. You are redirected to the sign-in page for your Okta org.

5. Enter the credentials for a user who is mapped to your OpenID Connect application, and you are directed to the `redirect_uri` that you specified. Look in the address box for the URL that contains the access token, scopes, and any state that you defined:

     `http://yourRedirectUriHere.com#access_token=eyJraWQiOiJYc2hYcGZTSHdEMk1zU2pvSTlZTmozWF9KdE1mclpmYWFOUklfNlBCVjQwIi[...]i7U9uW0mI0Bb8SbUeKZjzuxP9aDog&token_type=Bearer&expires_in=3600&scope=openid+email&state=WM6D`

     To check the returned access token, you can copy that URL and paste it into any [JWT decoder](https://token.dev). Check the payload to confirm that it contains the scopes that you are expecting.

```json
{
  "ver": 1,
  "jti": "AT.ReRI96X_2Ny3nSf0DepnWLhbAJW5kB0nbl0WqSn22W8",
  "iss": "https://{yourOktaDomain}/oauth2/{authorizationServerId}",
  "aud": "https://{yourOktaDomain}",
  "iat": 1594769008,
  "exp": 1594772608,
  "cid": "0oas6ywyq7cwyKUfF0h7",
  "uid": "00uixa271s6x7qt8I0h7",
  "scp": [
    "openid",
    "email"
  ],
  "sub": "joe.smith@examplecompany.com"
}
```

## Configure a custom access token lifetime per client

Use the following steps to configure an access token lifetime for a specific client.

### Create the policy container

1. In the Admin Console, go to **Security** > **API**.

2. On the **Authorization Servers** tab, select the name of the authorization server that you want to apply the policy to.

3. Select **Access Policies**, and then **Add Policy**.

4. Enter a **Name** and a **Description** for the policy.

5. Select **The following clients:** and start typing the names of the Okta OpenID Connect applications that you want this access policy to apply to. This field automatically displays a list of applications that match what you type.

6. Click **Create Policy**.

### Create the rule

Now that you've created a policy container, the next step is to create one or more rules for that policy.

1. Select the name of the access policy that you just created, and then select **Add Rule**.

2. Enter a **Name** for the rule, and then leave the defaults for all fields except **AND Access token lifetime is**.

3. Change the token lifetime to 15 minutes.

4. Click **Create Rule**.

> **Note:** Policies are evaluated in priority order, as are the rules in a policy. The first policy and rule that match the client request are applied and no further rule or policy processing occurs. If a client matches no policies, the authentication attempt fails and an error is returned.

### Test the setup

Let's test your access policy and get back an access token.

1. You need the following values from your Okta OpenID client application, both of which can be found on the application's **General** tab in the Admin Console:

     * Client ID
     * Valid Redirect URI

     > **Note:** Make sure that you have a user assigned to the client application.

2. Retrieve the authorization server's authorization endpoint by using the server's Metadata URI: `https://${yourOktaDomain}/oauth2/${authorizationServerId}/.well-known/openid-configuration`.

     It looks like this: `https://${yourOktaDomain}/oauth2/${authorizationServerId}/v1/authorize`

     Unless you are using the default authorization server, then it looks like this: `https://${yourOktaDomain}/oauth2/default/v1/authorize`

3. Add the following `/authorize` endpoint query parameters to the URL:

     * The OpenID Connect application's `client_id` and `redirect_uri`
     * A scope, which for the purposes of this example is `openid`
     * A `response_mode`, which you can set to `fragment`
     * A `state` and a `nonce` value

     > **Note:** All of the values are fully documented in the [OpenID Connect & OAuth 2.0 API](/docs/reference/api/oidc/#authorize) documentation.

     The resulting URL looks like this:

     `https://${yourOktaDomain}/oauth2/${authorizationServerId}/v1/authorize?client_id=${client_id}&response_type=token&response_mode=fragment&scope=openid&redirect_uri=http://yourRedirectURIHere.com&state=WM6D&nonce=YsG76jo`

4. Open a private browsing session in your browser and paste the URL into the address box. You are redirected to the sign-in page for your Okta org.

5. Enter the credentials for a user who is mapped to your OpenID Connect application, and you are directed to the `redirect_uri` that you specified. Look in the address box for the URL that contains the access token, scope, and any state that you defined:

     `http://yourRedirectUriHere.com#access_token=eyJraWQiOiJYc2hYcGZTSHdEMk1zU2pvSTlZTmozWF9KdE1mclpmYWFOUklfNlBCVjQw[...]vkAcHgJ1GFmR-7sO0Q&token_type=Bearer&expires_in=900&scope=openid+email&state=WM6D`

     In the response, you can see that the value for the `expires_in` parameter is `900`.

## Next steps

You should now understand how to configure an access policy.

You can customize and style various Okta assets to match your company's visual identity and branding:

* [Customize domain and email address](/docs/guides/custom-url-domain/)
* [SMS customization](/docs/guides/custom-sms-messaging/)
* [Email customization](/docs/guides/custom-email/)
* [Style the Sign-In Widget](/docs/guides/custom-widget/)
