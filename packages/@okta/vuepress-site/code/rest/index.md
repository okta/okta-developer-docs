---
title: Test the Okta REST APIs with Postman
language: rest
integration: back-end
icon: code-rest
meta:
  - name: description
    content: Get started with Okta REST APIs and learn how to import a collection and send requests in Postman.
---

A great way to learn an Application Programming Interface (API) is to issue requests and inspect the responses. You can use Okta Postman collections to learn how to incorporate Okta APIs into your workflow. To use these collections, you need to:

* [Obtain an Okta org](#sign-up-for-okta).
* [Set up your Postman environment](#set-up-your-postman-environment).
* [Import the Okta collection you want to test](#import-a-collection).
* [Set up Okta for API access](#set-up-okta-for-api-access).

You can then [send test requests](#send-a-request) to your Okta org and verify the results.

## Sign up for Okta

You need a free Okta developer-edition org to get started. Don't have one? [Create an org for free](https://developer.okta.com/signup). When you create an Okta org, the org is assigned a base URL such as `dev-1234567.okta.com`. This is your unique subdomain in Okta.

> **Note:** Use this unique subdomain whenever you see the `{yourOktaDomain}` variable in this document.

## Set up your Postman environment

1. [Install the Postman app](https://www.getpostman.com/apps).
1. Start Postman if it's not open already.
1. In the upper-left corner, click **Import**.
1. In the **Import** dialog box, click **Link** and then paste the following link into the **Enter a URL** box: `https://developer.okta.com/docs/api/postman/example.oktapreview.com.environment`.
   > **Note:** You can also download this environment locally and import it as a file.
1. Click **Continue** and then **Import** to confirm your environment import.
1. In the upper-right corner, click the box that lists the environments and then select `{yourOktaDomain}` from the list. The initial value is `No Environment` if you just installed Postman.

    <div class="three-quarter">

    ![Postman environment list box: Displays an arrow pointing to the box in the upper-right corner of the window that contains environments for use with Postman](/img/postman/postman_environment_list.png)

    <!--
    Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3236%3A30994  postman_environment_list
      -->

    </div>

1. In the upper-right corner, next to `{yourOktaDomain}`, click **Environment quick look** ![Postman environment quick look button](/img/postman/postman_eye_icon_button.png  "Displays the eye icon button").
1. In the upper-right corner of the **{yourOktaDomain}** dialog box, click **Edit**.

    <div class="three-quarter">

    ![Postman environment quick look edit link: Displays an arrow pointing to the edit link in the upper-right corner of the ${yourOktaDomain} dialog box](/img/postman/postman_environment_quick_look_edit.png)

    <!--
    Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3236%3A31016  postman_environment_quick_look_edit
    -->

    </div>

1. In the **Manage Environments** dialog box, do the following:
    * Click on the environment name, delete the placeholder text, and name your environment, for example: `Test Okta Org`.
    * For the `url` variable, in the **Initial Value** and **Current Value** columns, replace the placeholder text with your org's full URL, for example: `https://dev-1234567.okta.com`. Remember to remove the `-admin` part of your subdomain.

1. Click **Save** near the top of the tab.
1. To close the environment tab, hover over the tab and click the **x**.

## Import a collection

Go to the Okta [Postman collections](https://developer.okta.com/docs/reference/postman-collections/) reference to import the collection you want to test. Alternatively, you can fork a collection from the [Okta Public API Collections](https://www.postman.com/okta-eng/workspace/okta-public-api-collections/overview) online workspace.

To import a collection from the Okta [Postman collections](https://developer.okta.com/docs/reference/postman-collections/) reference page, click **Run in Postman** for the collection you want.

For example, this button is used to import the Users API collection:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/1755573c5cf5fbf7968b)

You can select the option to open the collection using the Postman app or you can use the **Web View** link to download the collection as a JSON file and import it.

To import a JSON file collection from Postman:

1. Import that file into Postman by selecting **Import** from the **File** menu.
1. In the **Import** window, leave **Import File** selected and click **Choose Files**.
1. Browse to your download location, select the JSON file, and click **Open**.
1. Click **Import**.

## Set up Okta for API access

To access Okta APIs from Postman, you need to authenticate with the Okta API resource server. Okta APIs support two authentication options:

1. OAuth 2.0 or OpenID Connect (OIDC)

    The OAuth 2.0 or OIDC authentication option uses the **Bearer Token** authorization type in Postman. This option uses an access token that enables the bearer to perform specific actions on specific Okta endpoints, which is controlled by the scopes defined in the access token.

    Scoped access tokens have several advantages, including:

    * More access granularity
    * Shorter token lifespans
    * Can be generated and retrieved using an API

    > **Note:** For a detailed guide on OAuth 2.0 access tokens, see [Implement OAuth for Okta](/docs/guides/implement-oauth-for-okta/).

1. API token

    This option uses the **API Key** authorization type in Postman with the Okta propriety `SSWS` authentication scheme. Use this authentication scheme to quickly test various Okta endpoints with one API token.

    This API token allows you to access a broad range of APIs since there's no scope associated with the token. However, only the Okta user that created the API token can use it and access to the APIs depend on the privileges of that user. You can't use the API token if the token-created user is deactivated, deleted, lost their access privileges, or if the token expired.

    > **Note:** The rate limits for API token requests are reduced by 50 percent. See [Token rate limits](/docs/guides/create-an-api-token/main/#token-rate-limits).

You need to either obtain an API token (API key), an OIDC, or an OAuth 2.0 access token to configure the authorization header of your Postman API requests to Okta. To obtain one of these tokens, set up Okta for your use case:

* [OpenID Connect (OIDC) authentication setup](#openid-connect-authentication-setup): to obtain an access token for user authentication that is scoped for specific resources
* [OAuth 2.0 service app authentication setup](#oauth-20-service-app-authentication-setup): to obtain an access token for service app authentication that is scoped for specific resources (access isn't associated with an Okta user)
* [API token authentication setup](#api-token-authentication-setup): to obtain an API token, attached to an admin user, that uses the Okta proprietary `SSWS` authentication scheme

> **Note:** For production usage, Okta recommends the more secure OAuth 2.0 or OIDC authentication schemes.

### OpenID Connect authentication setup

If your use case requires you to access a limited number Okta endpoints as a specific user, you can use an OIDC access token in the authorization header of your API requests. See the following sections to set up your Okta org for API authentication using OIDC.

#### Create an OIDC app in Okta

First, you need to create an OIDC app integration that you can define your scope-based access to Okta APIs.

1. [Sign in](https://developer.okta.com/login) to your Okta org Admin Console as a user with administrative privileges (Super Admin role).
1. In the Admin Console, go to **Applications** > **Applications**.
1. Click **Create App Integration**.
1. On the **Create a new app integration** page, select **OIDC - OpenID Connect** as the **Sign-in method**. Choose **Web Application** for the **Application type**. Creating a web app is an easy way to test scope-based access to Okta's APIs. Click **Next**.
1. Enter a name for your app integration.
1. For the **Grant type**, use the **Authorization Code** grant flow that is already selected.
1. In the **Sign-in redirect URIs** box, specify the callback location where Okta returns a browser (along with the token) after the user finishes authenticating. You can use the default values for testing purposes.
1. In the **Assignments** section, select **Limit access to selected groups** and add a group or **Skip group assignment for now**. It's good practice to create and use groups for testing purposes.
1. Click **Save**. The settings page for the app integration appears, showing the **General** tab. Make note of the **Client ID** and **Client secret** listed in the **Client Credentials** section. You need this information for the [Get an access token and make a request](#get-an-access-token-and-make-a-request) task.
1. Click the **Assignments** tab and ensure that the right users are assigned to the app. If you skipped the assignment during the app integration creation, you must add one or more users. For instructions on how to assign the app integration to individual users and groups, see the [Assign app integrations](https://help.okta.com/okta_help.htm?id=ext_Apps_Apps_Page-assign) topic in the Okta product documentation.
1. Select the **Okta API Scopes** tab and then click **Grant** for each of the scopes that you want to add to the application's grant collection. Ensure that you grant the scopes for the API access you require. See [Okta OAuth 2.0 scopes](https://developer.okta.com/docs/api/oauth2/).

   > **Notes:** When an API request is sent to the org authorization server's `/authorize` endpoint, it validates all of the requested scopes in the request against the app's grants collection. The scope is granted if it exists in the app's grants collection.

### OAuth 2.0 service app authentication setup

If your use cases requires access to a limited number Okta endpoints as a service or daemon without user context, use the Client Credentials grant flow with an OAuth 2.0 service app. The Client Credentials grant flow is the only grant flow supported with the OAuth 2.0 service app when you want to mint access tokens that contain Okta scopes.

See the following sections to set up your Okta org for API authentication for a service.

#### Create a service app in Okta

First, you need to create a service app integration that you can define your scope-based access to Okta APIs.

1. [Sign in](https://developer.okta.com/login) to your Okta org Admin Console as a user with administrative privileges (Super Admin role).
1. In the Admin Console, go to **Applications** > **Applications**.
1. Click **Create App Integration**.
1. On the Create a new app integration page, select **API Services** as the **Sign-in method** and click **Next**.
1. Enter a name for your app integration and click **Save**. The settings page for the app integration appears, showing the **General** tab. Make note of the **Client ID** listed in the **Client Credentials** section. You need this information for the [Create and sign the JWT](#create-and-sign-the-jwt) task.
1. Click the **Admin roles** tab and assign an admin role with permissions to resource sets that you require.
   > **Note:** This step is only required for Preview orgs. For Production orgs, this step is required only if the **Assign admin roles to public client apps** early access feature is enabled.

   You can assign the [standard admin roles](https://help.okta.com/okta_help.htm?type=oie&id=ext-administrators-admin-comparison) or a [custom admin role](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-creating-custom-admin-roles) with permissions to specific resource sets. See [Assign admin roles to apps](https://help.okta.com/okta_help.htm?type=oie&id=csh-work-with-admin-assign-admin-role-to-apps).

   If you're unsure of which admin roles to assign, for testing purposes, assign the super admin role to have permission to all resource sets:
   1. Click **Edit assignments**.
   {style="list-style-type:lower-alpha"}
   1. Select **Super Administrator** under Roles and click **Save Changes**.

1. Select the **Okta API Scopes** tab and then click **Grant** for each of the scopes that you want to add to the application's grant collection. Ensure that you grant the scopes for the API access you require. See [Okta OAuth 2.0 scopes](https://developer.okta.com/docs/api/oauth2/).

   > **Notes:** When an API request is sent to the org authorization server's `/token` endpoint, it validates all of the requested scopes in the request against the app's grants collection. The scope is granted if it exists in the app's grants collection.

1. Generate the public/private JSON Web Key Set (JWKS) for client authentication. This is the only authentication method supported for OAuth 2.0 service apps that want access to tokens with Okta scopes. For testing purposes, you can use the Admin Console to generate the JWKS:
   1. In the **Client Credentials** section of the **General** tab, click **Edit** to change the client authentication method.
   {style="list-style-type:lower-alpha"}
   1. Select **Public key/Private key** as the **Client authentication** method.
   1. For a simple implementation, leave the default of **Save keys in Okta**, and then click **Add key**.
   1. Click **Generate new key** and the public and private keys appear in JWK format.

      This is your only opportunity to save the private key. Click **Copy to clipboard** to copy the private key and store it somewhere safe for the [Create and sign the JWT](#create-and-sign-the-jwt) task.
   1. Click **Done**. The new public key is now registered with the app and appears in a table in the **PUBLIC KEYS** section of the **General** tab.

#### Create and sign the JWT

> **Note:** The instructions in this section are for testing purposes only. In production environments, use Okta SDKs or other language libraries to create and sign the JSON Web Token (JWT). See [Build a JWT with a private key](/docs/guides/build-self-signed-jwt/java/main/#build-a-jwt-with-a-private-key) for an example in Java or JavaScript.

To create a JWT, use the private key saved from the previous steps as the JWT header and use the [JWT claims](/docs/reference/api/oidc/#token-claims-for-client-authentication-with-client-secret-or-private-key-jwt) as the JWT payload. For this use case, use the following JWT claim values:

* `aud`: Set this value to `https://${yourOktaDomain}/oauth2/v1/token`.
* `exp`: The expiration time of the token in seconds since January 1, 1970 UTC (current UNIX timestamp). Set this value to a maximum of only an hour in the future.
* `iss`: Set this value to your service app client ID from the [Create a service app in Okta](#create-a-service-app-in-okta) steps.
* `sub`: Set this value to your service app client ID.

To generate a JWT for testing purposes:

1. Go to the [Generate JWT tool](https://www.jsonwebtoken.dev/). This tool supports both JWT and PEM formats.
1. In the **Signing Key** box, paste the private key that you generated for your service app and leave the format as **JWK KEY**. Select **PEM KEY** if you saved your private key in PEM format.
1. In the **Payload** box, specify the JWT claims.

    ```json
    {
        "aud": "https://${yourOktaDomain}/oauth2/v1/token",
        "iss": "${clientId}",
        "sub": "${clientId}",
        "exp": "${currentPlusOneHour}"
    }
    ```

1. Click **Generate JWT**. The signed JWT appears.
1. Copy the JWT for use in [Get an access token](#get-an-access-token).

### API token authentication setup

Use this authentication scheme to quickly test various Okta endpoints. The token allows you to access a broad range of APIs since there's no scope associated with the token. However, only the Okta admin that created the API token can use it, and access to the APIs depend on the privileges of that admin user.

> **Note:** Not all Okta APIs support SSWS API token authentication. See the security scheme of [Okta API endpoints](https://developer.okta.com/docs/api/).

For the `SSWS` Okta propriety authentication scheme, go to the Admin Console of your Okta org to obtain an API token. See [Create an API token](/docs/guides/create-an-api-token/) for your org.

#### Update your Postman environment with the API token

1. In Postman, click  **Environment quick look** ![Postman environment quick look button](/img/postman/postman_eye_icon_button.png  "Displays the eye icon button") next to your test environment in the upper-right corner.

1. In the upper-right corner of your environment dialog box, click **Edit**.
1. In the **Manage Environments** dialog box, do the following:
    * In the **Initial Value** and **Current Value** columns of the `apikey` variable, enter your API token that you created earlier, for example: `00LzMWxMq_0sdErHy9Jf1sijEGexYZlsdGr9a4QjkS`.

    <div class="three-quarter">

    ![Displays arrows that points to the Environment Name box and the url and apikey variables in the Manage Environments dialog box](/img/postman/postman_manage_environments_dialog.png)

    <!--
    Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3236%3A31047  postman_manage_environments_dialog
    -->

    </div>

1. Click **Save** near the top of the tab.
1. To close the environment tab, hover over the tab and click the **x**.

## Send a request

### Get an OIDC access token and make a request

You can get an access token and make a request to an endpoint after you have the following:

* An Okta OpenID Connect app
* One or more grants associated with that app
* Users with appropriate permissions associated with the app
* Users with appropriate administrator permissions in Okta

Request an access token by making a request to your Okta [org authorization server](/docs/concepts/auth-servers/) `/authorize` endpoint. Only the org authorization server can mint access tokens that contain Okta API scopes.

> **Note:** See [Token lifetime](/docs/reference/api/oidc/#token-lifetime) for more information on hard-coded and configurable token lifetimes.

This page helps you build a request in Postman.

We recommend that you always use the Authorization Code with PKCE grant flow. See [Implement the Authorization Code with PKCE flow](/docs/guides/implement-grant-type/authcodepkce/main/) for details on this grant type.

1. In Postman, select the request that you want to make, such as a `GET` request to the `/api/v1/users` endpoint to get back a list of all users.
2. On the **Header** tab, remove the existing SSWS Authorization API Key.
3. Click the **Authorization** tab and from the **Type** dropdown list, select **OAuth 2.0**.
4. On the right pane, go to the **Configure New Token** section.
5. In the first field, enter a name for the token and select **Authorization Code (With PKCE)** as the grant type.
6. Define the remaining fields for the token request:

    * **Callback URL**: Define the callback location where Okta returns the token after the user finishes authenticating. This URL must match one of the redirect URIs that you configured in the [Create an OAuth 2.0 app in Okta](#create-an-oauth-2-0-app-in-okta) section.
    * **Auth URL**: Enter the authorization endpoint for your org authorization server, for example, `https://${yourOktaDomain}/oauth2/v1/authorize`.
    * **Access Token URL**: Enter the token endpoint for your org authorization server, for example, `https://${yourOktaDomain}/oauth2/v1/token`.
    * **Client ID**: Use the `client_id` of your Okta OAuth 2.0 application that you created in the [Create an OAuth 2.0 app in Okta](#create-an-oauth-2-0-app-in-okta) section.
    * **Client secret**: Use the `client_secret` of your Okta OAuth 2.0 application that you created in the [Create an OAuth 2.0 app in Okta](#create-an-oauth-2-0-app-in-okta) section.
    * **Code Challenge Method**: Leave the default of `SHA-256` selected.
    * **Code Verifier**: Leave it empty so that Postman generates its own.
    * **Scope**: Use `okta.users.read` for this example. Include the scopes that allow you to perform the actions on the endpoint that you want to access. The scopes requested for the access token must exist in the application's grants collection, and the user must have the permission to perform those actions. See [Scopes and supported endpoints](#scopes-and-supported-endpoints).
    * **State**: Use the default value or any alphanumeric value. The authorization server reflects this string when redirecting the browser back to the client, which your client can verify to help prevent cross-site request forgery attacks.
    * **Client Authentication**: Set to **Send client credentials in body**.

7. Click **Get New Access Token**. You're prompted to sign in to your Okta org. After you are authenticated, the **Manage Access Tokens** window displays the access token, including the scopes requested. The token also automatically populates the **Available Token** dropdown list.
    > **Note:** The lifetime for this token is fixed at one hour.
8. Click **Use Token** at the top of the window to use this access token in your request to the `/users` endpoint.
9. Click **Send**. Since you requested `okta.users.read`, the response should contain an array of all the users associated with your app. This depends on the user's permissions.


### Get an OAuth 2.0 access token and make a request

To request an access token using the Client Credentials grant flow, your app makes a request to your Okta [org authorization server's](/docs/concepts/auth-servers) `/token` endpoint.

Include the following parameters:

* `scope`: Include the scopes that allow you to perform the actions on the endpoint that you want to access. The scopes requested for the access token must already be in the [application's grants collection](#grant-allowed-scopes). See [Scopes and supported endpoints](/docs/guides/implement-oauth-for-okta/main/#scopes-and-supported-endpoints).

    In this example, we only request access for one scope. When you request an access token for multiple scopes, the format for the scope value looks like this: `scope=okta.users.read okta.apps.read`

* `client_assertion_type`: Specifies the type of assertion, in this case a JWT token:  `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`

* `client_assertion`: The signed JWT. Paste the JWT that you signed in the [Create and sign the JWT](#create-and-sign-the-jwt) section.

The following is an example request for an access token (the JWT is truncated for brevity).

```bash
curl --location --request POST 'https://${yourOktaDomain}/oauth2/v1/token' \
    --header 'Accept: application/json' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --data-urlencode 'grant_type=client_credentials' \
    --data-urlencode 'scope=okta.users.read' \
    --data-urlencode 'client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer' \
    --data-urlencode 'client_assertion=eyJhbGciOiJSU....tHQ6ggOnrG-ZFRSkZc8Pw'
```

The response should look something like this (the token is truncated for brevity):

```json
{
    "token_type": "Bearer",
    "expires_in": 3600,
    "access_token": "eyJraWQiOiJ.....UfThlJ7w",
    "scope": "okta.users.read"
}
```

> **Note:** The lifetime for this token is fixed at one hour.

#### Make a request

Make a request to the `/users` endpoint using the access token.

1. If you are using Postman to test, select the **List Users** `GET` request to the `/api/v1/users` endpoint to get back a list of all users.
2. On the **Header** tab, remove the existing Okta API token (SSWS Authorization API Key).
3. Click the **Authorization** tab and from the **Type** drop-down box, select **OAuth 2.0**.
4. On the right, paste the access token into the **Access Token** box and click **Send**. The response should contain an array of all the users associated with your app. This is dependent on the user's permissions.

**Example Request**

```bash
curl -X GET "https://${yourOktaDomain}/api/v1/users"
    -H "Accept: application/json"
    -H "Content-Type: application/json"
    -H "Authorization: Bearer eyJraWQiOiJEa1lUbmhTdkd5OEJkbk9yMVdYTENhbVFRTUZiNTlYbHdBWVR2bVg5ekxNIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULmRNcmJJc1paTWtMR0FyN1gwRVNKdmdsX19JOFF4N0pwQlhrVjV6ZGt5bk0iLCJpc3MiOiJodHRwczovL2xvZ2luLndyaXRlc2hhcnBlci5jb20iLCJhdWQiOiJodHRwczovL2dlbmVyaWNvaWRjLm9rdGFwcmV2aWV3LmNvbSIsInN1YiI6IjBvYXI5NXp0OXpJcFl1ejZBMGg3IiwiaWF0IjoxNTg4MTg1NDU3LCJleHAiOjE1ODgxODkwNTcsImNpZCI6IjBvYXI5NXp0OXpJcFl1ejZBMGg3Iiwic2NwIjpbIm9rdGEudXNlcnMubWFuYWdlIl19.TrrStbXUFtuH5TemMISgozR1xjT3rVaLHF8hqnwbe9gmFffVrLovY-JLl63G8vZVnyudvZ_fWkOBUxip1hcGm80KvrSgpdOp9Nazz-mjkP6T6JwslRFHDe8SC_4h2LG9zi5PV9y3hAayBK51q1HIwgAxl_2F7q4l0jLKDFsWjQS8epNaB05NLI12BDvO-C-7ZGGJ4EQfGS9EjN9lS-vWnt_V3ojTL0BJCKgL5Y0c9D2VkSqVN4j-7BSRZt0Un3MAEgznXmk2ecg3y7s9linGR0mC3QqKeyDfFNdsUJG6ac0h2CFFZQizpQu1DFmI_ADKmzxVQGPICuslgJFFoIF4ZA"
```


### Make an SSWS API token request

After you've imported the Users API collection and added your Okta org information to your environment, you're ready to send a request.

To make sure everything works, send a request to list all of the users in your org:

1. Select the **Collections** tab in Postman and expand the **Users (Okta API)** collection.
1. Expand the **List Users** folder and select **List Users**. This loads the List Users request into Postman, ready to send.
1. Click **Send**. The result pane automatically displays the results of your request:

If you receive an error, it's likely that one of the values in the environment isn't set correctly. Check the values and try again.

After you have completed this simple request, you're ready to explore the Okta API.

## Tips

Now that you have a working collection, you can use the following tips to work more efficiently.

### Find IDs for Okta API requests

Your imported collections contain URLs and JSON request bodies that have sample data with variables such as `${userId}`. You can replace URL and body variables with the IDs of the resources that you want to specify.

1. To get a user's ID, for example, send a request to list the users in your org like you did in the previous section. Each user listed in the response has an ID:

  <div class="three-quarter border">

  ![Response example for a GET users request that highlights the ID in the response](/img/postman/postman_response2.png)

  </div>

2. Copy the `id` of the resource, in this example the `id` for Tony Stark, for use in your next request.

### Retain headers when you click links

You can retain headers when when you click HAL links in the responses.

To retain the headers:

1. Click the gear icon from the toolbar in the upper-right corner of the page.
1. Select **Settings**.
1. In the **Headers** section, enable **Retain headers when clicking on links**.

## Next steps

Now that you have imported a collection and successfully tested a request and received a response, you can use Postman to learn more about the Okta APIs.

Access an Okta API, download the collection for that API, and try the request examples that come with the collection to help you more fully understand how that API works.
