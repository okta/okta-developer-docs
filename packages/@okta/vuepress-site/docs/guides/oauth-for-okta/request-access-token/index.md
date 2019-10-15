---
title: Request an access token
---
After you have the following, you can request an access token:

* An Okta OIDC or OAuth 2.0 Service app
* One or more grants associated with that app
* Users with appropriate permissions associated with the app

> **Note:** Using a Service app? See <GuideLink link="../get-access-token-using-service-app">Get an access token using a Service app</GuideLink> for the steps.

1. Request an access token by making a request to your Okta [Org Authorization Server's](/docs/concepts/auth-servers) `/authorize` endpoint. For testing purposes, we recommend that you use a private browser window and the Implicit grant flow. Using the Implicit grant flow streamlines authentication for testing by returning a token without introducing any additional steps. In a production environment, we recommend that you always use the Authorization Code grant flow.

    > **Note:** If this is your first time working with Okta's APIs, you should read [Get Started with the Okta REST APIs](https://developer.okta.com/code/rest/) first. See [Implement the Authorization Code Flow](/docs/guides/implement-auth-code/) for more information on this grant type.

2. Paste your request URL into a private browser window. Your request URL should look something like this:

    ```bash
    https://{yourOktadomain}/oauth2/v1/authorize?client_id=0oan47pj9BsB30h7&response_type=token&response_mode=fragment&scope=okta.users.read&redirect_uri={yourConfiguredRedirectUri}&nonce=UBGW&state=1234
    ```

    > **Note:** Only the [Org Authorization Server](/docs/concepts/auth-servers) can mint access tokens that contain Okta API scopes.

    Note the parameters being passed:

    * `client_id`: Use the `client_id` of your Okta OAuth application that you created in the <GuideLink link="../create-oauth-app">previous step</GuideLink>.
    * `response_type`: Use `token` in this instance, since you are testing in a browser and want the authorization server to return the access token rather than an authorization code. In a production environment, this value would be `code`.
    * `response_mode`: Use `fragment` to indicate that you want the authorization server to return the authorization response parameters encoded in a fragment that is added to the `redirect_uri` when redirecting back to the client.
    * `scope`: Include the scopes that allow you to perform the actions on the endpoint that you want to access. The scopes requested for the access token must already be in the application's grants collection and the user must have the permission to perform those actions. See <GuideLink link="../scopes">Scopes & supported endpoints</GuideLink> for more information.
    * `redirect_uri`: Define the callback location where Okta returns a browser (along with the token) after the user finishes authenticating. This URL must match one of the redirect URIs that you configured in the <GuideLink link="../create-an-OAuth-2.0-app-in-okta">Create an OAuth 2.0 app in Okta</GuideLink> section.
    * `state`: Use any alphanumeric value. The authorization server reflects this string when redirecting the browser back to the client, which helps prevent cross-site request forgery.
    * `nonce`: Use any value. This is a string that is included in the returned ID token. It associates a client session with an ID token and mitigates replay attacks. In this example, we aren't requesting the `id_token` response type, so an ID token isn't returned.

3. Enter your credentials on the Okta Sign-in Page that appears. After you authenticate, the browser returns an access token in the address bar.

    In this example, you previously added the `okta.users.read` scope to the application's grants collection. You then requested that scope be included in the access token. Since this is an admin-level scope, you need to sign in with admin user credentials that are associated with your app.

    The response that is returned looks something like this (the token is truncated for brevity):

    ```bash
    http://{yourOktadomain}/authorization-code/callback#access_token=eyJraWQiOiJEa1lUbmhTdkd5OEJk.......Y5D6XG&token_type=Bearer&expires_in=3600&scope=okta.users.read&state=1234
    ```

    > **Note:** The lifetime for this token is fixed at one hour.

4. Copy the access token for use in subsequent <GuideLink link="../save-access-token">requests to Okta API endpoints</GuideLink>.

<NextSectionLink/>
