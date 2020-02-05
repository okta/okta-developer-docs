---
title: Get an access token and make a request
---
After you have the following, you can get an access token and make a request to an endpoint.

* An Okta OpenID Connect or OAuth 2.0 Service app
* One or more grants associated with that app
* Users with appropriate permissions associated with the app

> **Note:** Using a Service app? See <GuideLink link="../get-access-token-using-service-app">Get an access token using a Service app</GuideLink> for the steps.

Request an access token by making a request to your Okta [Org Authorization Server](/docs/concepts/auth-servers/) `/authorize` endpoint. Only the Org Authorization Server can mint access tokens that contain Okta API scopes.

For testing purposes, we recommend that you use the Implicit grant flow. Using the Implicit grant flow streamlines authentication for testing by returning a token without introducing any additional steps. In a production environment, we recommend that you always use the Authorization Code grant flow. See [Implement the Authorization Code Flow](/docs/guides/implement-auth-code/) for more information on this grant type.

> **Note:** If this is your first time working with the Okta APIs, read [Get Started with the Okta REST APIs](https://developer.okta.com/code/rest/) first.

1. In Postman, select the request that you want to make, such as a `GET` request to the `/api/v1/users` endpoint to get back a list of all users.
2. On the **Header** tab, remove the existing SSWS Authorization API Key.
3. Click the **Authorization** tab and from the **Type** drop-down list, select **OAuth 2.0**.
4. On the right, click **Get New Access Token**.
5. In the dialog box that appears, enter a name for the token and select **Implicit** as the grant type.
6. Define the following for the token request:

    * **Callback URL**: Define the callback location where Okta returns the token after the user finishes authenticating. This URL must match one of the redirect URIs that you configured in the <GuideLink link="../create-an-OAuth-2.0-app-in-okta">Create an OAuth 2.0 app in Okta</GuideLink> section.
    * **Auth URL**: Enter the authorization endpoint for your Org Authorization Server. For example: `https://{yourOktadomain}/oauth2/v1/authorize?none=WBYA`
        > **Note:** There isn't an entry in the dialog box for a `nonce` parameter. But, you can append it to the Auth URL here. Use any value for `nonce`. This is a string that is included in the returned ID token. It associates a client session with an ID token and mitigates replay attacks. In this example, we aren't requesting the `id_token` response type, so an ID token isn't returned.
    * **Client ID**: Use the `client_id` of your Okta OAuth application that you created in the <GuideLink link="../create-oauth-app">previous step</GuideLink>.
    * **Scope**: Include the scopes that allow you to perform the actions on the endpoint that you want to access. The scopes requested for the access token must already exist in the application's grants collection and the user must have the permission to perform those actions. See <GuideLink link="../scopes">Scopes & supported endpoints</GuideLink> for more information.
    * **State**: Use any alphanumeric value. The authorization server reflects this string when redirecting the browser back to the client, which helps prevent cross-site request forgery.
    * **Client Authentication**: Leave the default of **Send as Basic Auth Header**.

7. Click **Request Token**. You are prompted to sign in to your Okta org. After you are authenticated, the **Manage Access Tokens** window displays the access token, including the scopes requested. The token also automatically populates the **Available Token** drop-down list.
    > **Note:** The lifetime for this token is fixed at one hour.
8. Click **Use Token** at the bottom of the window to use this access token in your request to the `/users` endpoint.
9. Click **Send**. Since you requested `okta.users.read`, the response should contain an array of all the users associated with your app. This is dependent on the user's permissions.

> **Note:** You can also manually build the request URL and paste it into a private browser window. After you authenticate, the browser returns the access token in the address bar. Your request URL should look something like this:<br>
    ```
        https://{yourOktadomain}/oauth2/v1/authorize?client_id=0oan47pj9BsB30h7&response_type=token&response_mode=fragment&scope=okta.users.read&redirect_uri={yourConfiguredRedirectUri}&nonce=UBGW&state=1234
    ```

<NextSectionLink/>
