---
title: Facebook
---

# Facebook

##### 1. Set Up a Facebook App

1.1. Go to <https://developers.facebook.com> and register for a developer account if you haven't already done so.

1.2. Head over to the Facebook App Dashboard: <https://developers.facebook.com/apps>.

1.3. Create a Facebook app. Instructions for creating a Facebook application can be found here: <https://developers.facebook.com/docs/apps/register>.

> NOTE: The `public_profile` and `email` OAuth scopes are automatically included by Okta. If your app requires more scopes, request a [Login Review](https://developers.facebook.com/docs/facebook-login/review). For more information on Facebook scopes, see [Permissions](https://developers.facebook.com/docs/facebook-login/permissions).

1.4. On the "Product Setup" page, expand **Settings** on the left-hand side, then click **Basic**.

1.5. Save the App ID and App Secret values so you can add them to the Okta configuration in the next section.

##### 2. Configure Facebook as an Identity Provider in Okta

2.1. Sign in to your Okta org.

2.2. On the main page, hover your cursor over **Users** until the menu opens, then click on **Social & Identity Providers**.

2.3. On the Identity Providers page, click on **Add Identity Provider** > **Add Facebook**.

* **Name:** We suggest using the name you would expect to see on a button, something like "Log in to Facebook".
* **Client Id:** Paste in the App ID that you got from Facebook in step 1.5 above.
* **Client Secret:** Paste in the App Secret that you got from Facebook in step 1.5 above.
* **Scopes:** Leave set to the default.

> For more information about these as well as the Advanced Settings, see [Social Identity Provider Settings](social-settings).

2.4. Once you have completed all the fields, click on **Add Identity Provider**. You will be returned to the main "Identity Providers" page.

2.5. Find the Facebook Identity Provider that you just added. Once you have found the entry, copy both the "Authorize URL" and "Redirect URI" (ending in `/authorize/callback`).

##### 3. Add the Okta Redirect URI to Facebook

3.1. Go to your main apps page on Facebook: <https://developers.facebook.com/apps/>

3.2. Select your app

3.3. Scroll down to the "Add a Product" section and choose Choose **Facebook Login**.

3.4. On the first page of the Quickstart, choose **Web**.

3.5. In the Site URL field, enter the Okta "Redirect URI" that you copied in step 2.5.

3.6. Click **Save**, then click **Continue**.

3.7. On the left-hand side, find "Facebook Login" and click on **Settings**.

3.8. Under your app's "Client OAuth Settings", find the "Valid OAuth Redirect URIs" section and paste your's app's Redirect URI (from step 2.5) into this field.

##### 4. Register an OpenID Connect Application in Okta

4.1. Back in the Okta administrator UI, click on **Applications**.

4.2. Click **Add Application**.

4.3. On the "Add Application" page, click **Create New App**.

4.4. Select the appropriate platform for your use case and choose a name for your new application.

4.5. Add one or more Redirect URIs. This is where the user will be directed to after they have authenticated with Facebook.

4.6. Assign the group of your choosing (if you [set Group Assignments](social-settings) for your app), or assign "Everyone".

4.7. Under "Grant type allowed", make sure "Implicit" is enabled.

4.8. Click **Done** and you will arrive on the page for your new application.

4.9. In the "Client Credentials" section, copy your "Client ID", which you will use to complete your Authorize URL in the next step.

##### 5. Complete Your Authorize URL

The Okta Identity Provider that you created in section 2 above generated an Authorize URL with a number of blank parameters that you must now fill-in:

* **client_id:** use the client_id value you copied in step 4.9.
* **scope:** Determines the claims that are returned in the ID token. This should have at least `openid`.
* **response_type:** Determines which flow is used. This should be `id_token`.
* **response_mode:** Determines how the authorization response should be returned. This should be `fragment`.
* **state:** Protects against cross-site request forgery (CSRF).
* **nonce:** A string included in the returned ID Token. Use it to associate a client session with an ID Token, and to mitigate replay attacks.
* **redirect_uri:** The location where Okta returns a browser after the user has finished authenticating against their social login provider. This URL must start with "https" and must match one of the Redirect URIs that you configured previously in step 4.5.

For a full explanation of all these parameters, see: [/authorize Request parameters](/docs/api/resources/oidc#request-parameters)

An example of a complete URL looks like this: `https://{yourOktaDomain}/oauth2/v1/authorize?idp=0oaaq9pjc2ujmFZexample&client_id=GkGw4K49N4UEE1example&response_type=id_token&response_mode=fragment&scope=openid&redirect_uri=https%3A%2F%2FyourAppUrlHere.com%2Fsocial_auth&state=WM6D&nonce=YsG76jo`

#### Using Facebook for Login

There are four primary ways to kick off the sign-in with Facebook flow.

**HTML Link**

One option is to create a link that the user clicks in order to log in. The HREF for that link would be the Authorize URL that you created previously:

`<a href="https://{yourOktaDomain}/oauth2/v1/authorize?idp=0oaaq9pjc2ujmFZexample&client_id=GkGw4K49N4UEE1example&response_type=id_token&response_mode=fragment&scope=openid&redirect_uri=https%3A%2F%2FyourAppUrlHere.com%2Fsocial_auth&state=WM6D&nonce=YsG76jo">Login With Facebook</a>`

After clicking this link, the user will be prompted to sign in with the social provider. After they succeed they will be returned to the specified `redirect_uri` along with an ID Token in JWT format.

**Custom Okta-hosted Sign-in Page**

If you have configured an [Custom Okta-hosted Sign-in Page](https://help.okta.com/en/prod/Content/Topics/Settings/custom-okta-hosted-sign-in-page.htm), you can add a "Login with Facebook" button by adding the following code:

```js
idps: [

{type: 'FACEBOOK', id: '$Your_FB_IDP_ID_Here'}
]
```

**Okta Sign-in Widget**

Okta also offers an easily embeddable JavaScript widget that reproduces the look and behavior of the standard Okta sign-in page. Adding a "Login with Facebook" button is as simple as adding the following code to your configuration:

```js
idps: [
  {type: 'FACEBOOK', id: '$Your_FB_IDP_ID_Here'}
]
```

You can find out more about it [on GitHub](https://github.com/okta/okta-signin-widget#okta-sign-in-widget). Implementing login with Facebook would use the Widget's [OpenID Connect authentication flow](https://github.com/okta/okta-signin-widget#openid-connect).

**AuthJS**

If you don't want pre-built views, or need deeper levels of customization, then you can use the same AuthJS SDK that the Sign-in Widget is built with. For further information see [the AuthJS GitHub repo](https://github.com/okta/okta-auth-js#install). Implementing login with Facebook would use the SDK's [OpenID Connect authentication flow](https://github.com/okta/okta-auth-js#openid-connect-options).
