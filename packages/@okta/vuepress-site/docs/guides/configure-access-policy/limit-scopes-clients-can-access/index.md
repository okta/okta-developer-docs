---
title: Limit which scopes some clients can access
---

Use the following steps to create a policy that limits which scopes that a designated client can access.

## Create the policy container

1. In the Developer Console, navigate to **API > Authorization Servers**.

2. Select the name of the authorization server that you want to apply the policy to.

3. Select **Access Policies**, and then **Add Policy**.

4. Enter a **Name** and a **Description** for the policy.

5. Select **The following clients:** and start typing the names of the Okta OpenID Connect applications that you want to cover with the access policy. This field automatically displays a list of applications that match what you type.

6. Click **Create Policy**.

## Create the rule

1. Select the name of the access policy that you just created, and then select **Add Rule**.

2. Enter a **Name** for the rule, and then for this example leave the defaults for **IF Grant type is** and **AND User is**.

3. For the **AND Scopes requested** field, select **The following scopes:** and then click **OIDC default scopes**. All of the OpenID Connect reserved scopes appear in the box.

4. Click the **x** to remove all of the scopes except for **openid** and **email**. This limits the scopes that the applications associated with this policy can request to just the `openid` and `email` scopes.

> **Note:** Access policies rules are allow lists. Verify that there are no other rules in the policy that have **any scopes** selected and that all of your rules match only the `openid` and/or the `email` scopes.

5. Leave the other defaults and click **Create Rule**.

> **Note:** Policies are evaluated in priority order, as are the rules in a policy. The first policy and rule that match the client request are applied and no further rule or policy processing occurs. If a client matches no policies, the authentication attempt fails and an error is returned.

## Test the setup

Let's test your access policy and get back an access token.

1. You need the following values from your Okta OpenID client application, both of which can be found on the application's **General** tab in the Developer Console:

     * Client ID
     * Valid Redirect URI

> **Note:** Make sure that you have a user assigned to the client application.

2. Retrieve the authorization server's authorization endpoint by using the server's Metadata URI: https://${yourOktaDomain}/oauth2/${authServerId}/.well-known/openid-configuration.

     It looks like this: `https://${yourOktaDomain}/oauth2/${authServerId}/v1/authorize`

     Unless you are using the default Authorization Server, then it looks like this: `https://${yourOktaDomain}/oauth2/default/v1/authorize`

3. Add the following `/authorize` endpoint query parameters to the URL:

     > **Note:** All of the values are fully documented in the [OpenID Connect & OAuth 2.0 API](/docs/reference/api/oidc/#authorize) documentation.

     * The OpenID Connect application's `client_id` and `redirect_uri`
     * Scopes, which for the purposes of this example are `openid` and `email`
     * A `response_mode`, which you can set to `fragment`
     * A `state` value and a `nonce` value

     > **Note:** A `nonce` value is required if the `response_type` is `code`.

     The resulting URL looks like this:

     `https://${yourOktaDomain}/oauth2/${authServerId}/v1/authorize?client_id=${client_id}&response_type=token&response_mode=fragment&scope=openid email&redirect_uri=http://yourRedirectURIHere.com&state=WM6D&nonce=YsG76jo`

4. Open a private browsing session in your browser and paste the URL into the address box. You are redirected to the sign-in page for your Okta org.

5. Enter the credentials for a user who is mapped to your Open ID Connect application, and you are directed to the `redirect_uri` that you specified. Look in the address box for the URL that contains the access token, scopes, and any state that you defined:

     `http://yourRedirectUriHere.com#access_token=eyJraWQiOiJYc2hYcGZTSHdEMk1zU2pvSTlZTmozWF9KdE1mclpmYWFOUklfNlBCVjQwIi[...]i7U9uW0mI0Bb8SbUeKZjzuxP9aDog&token_type=Bearer&expires_in=3600&scope=openid+email&state=WM6D`

     To check the returned access token, you can copy that URL and paste it into any [JWT decoder](https://jsonwebtoken.io). Check the payload to confirm that it contains the scopes that you are expecting.

```json
{
  "ver": 1,
  "jti": "AT.ReRI96X_2Ny3nSf0DepnWLhbAJW5kB0nbl0WqSn22W8",
  "iss": "https://${yourOktaDomain}/oauth2/${authServerId}",
  "aud": "https://${yourOktaDomain}",
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

<NextSectionLink/>
