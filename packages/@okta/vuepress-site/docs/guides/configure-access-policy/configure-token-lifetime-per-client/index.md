---
title: Configure a custom access token lifetime per client
---

Use the following steps to configure an access token lifetime for a specific client.

## Create the policy container

1. In the Admin Console, go to **Security** > **API**.

2. On the **Authorization Servers** tab, select the name of the authorization server that you want to apply the policy to.

3. Select **Access Policies**, and then **Add Policy**.

4. Enter a **Name** and a **Description** for the policy.

5. Select **The following clients:** and start typing the names of the Okta OpenID Connect applications that you want this access policy to apply to. This field automatically displays a list of applications that match what you type.

6. Click **Create Policy**.

## Create the rule

Now that you've created a policy container, the next step is to create one or more rules for that policy.

1. Select the name of the access policy that you just created, and then select **Add Rule**.

2. Enter a **Name** for the rule, and then leave the defaults for all fields except **AND Access token lifetime is**.

3. Change the token lifetime to 15 minutes.

4. Click **Create Rule**.

> **Note:** Policies are evaluated in priority order, as are the rules in a policy. The first policy and rule that match the client request are applied and no further rule or policy processing occurs. If a client matches no policies, the authentication attempt fails and an error is returned.

## Test the setup

Let's test your access policy and get back an access token.

1. You need the following values from your Okta OpenID client application, both of which can be found on the application's **General** tab in the Admin Console:

     * Client ID
     * Valid Redirect URI

     > **Note:** Make sure that you have a user assigned to the client application.

2. Retrieve the authorization server's authorization endpoint by using the server's Metadata URI: `https://${yourOktaDomain}/oauth2/${authServerId}/.well-known/openid-configuration`.

     It looks like this: `https://${yourOktaDomain}/oauth2/${authServerId}/v1/authorize`

     Unless you are using the default Authorization Server, then it looks like this: `https://${yourOktaDomain}/oauth2/default/v1/authorize`

3. Add the following `/authorize` endpoint query parameters to the URL:

     * The OpenID Connect application's `client_id` and `redirect_uri`
     * A scope, which for the purposes of this example is `openid`
     * A `response_mode`, which you can set to `fragment`
     * A `state` and a `nonce` value

     > **Note:** All of the values are fully documented in the [OpenID Connect & OAuth 2.0 API](/docs/reference/api/oidc/#authorize) documentation.

     The resulting URL looks like this:

     `https://${yourOktaDomain}/oauth2/${authServerId}/v1/authorize?client_id=${client_id}&response_type=token&response_mode=fragment&scope=openid&redirect_uri=http://yourRedirectURIHere.com&state=WM6D&nonce=YsG76jo`

4. Open a private browsing session in your browser and paste the URL into the address box. You are redirected to the sign-in page for your Okta org.

5. Enter the credentials for a user who is mapped to your OpenID Connect application, and you are directed to the `redirect_uri` that you specified. Look in the address box for the URL that contains the access token, scope, and any state that you defined:

     `http://yourRedirectUriHere.com#access_token=eyJraWQiOiJYc2hYcGZTSHdEMk1zU2pvSTlZTmozWF9KdE1mclpmYWFOUklfNlBCVjQw[...]vkAcHgJ1GFmR-7sO0Q&token_type=Bearer&expires_in=900&scope=openid+email&state=WM6D`

     In the response, you can see that the value for the `expires_in` parameter is `900`.

<NextSectionLink>Next steps</NextSectionLink>
