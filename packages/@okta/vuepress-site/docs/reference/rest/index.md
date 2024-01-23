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

1. Obtain an Okta org.<br>
   [Sign up for Okta](#sign-up-for-okta) if you don't have an existing Okta org.
1. [Set up your Postman environment](#set-up-your-postman-environment).
1. [Import the Okta collection](#import-a-collection) that you want to test.
1. [Set up Okta for API access](#set-up-okta-for-api-access).

You can then [send test requests](#send-a-request) to your Okta org and verify the results.

## Sign up for Okta

You need a free Okta developer-edition org to get started. Don't have one? [Create an org for free](https://developer.okta.com/signup). The developer-edition org is assigned a base URL such as `dev-1234567.okta.com`. This is your unique subdomain in Okta.

> **Note:** Use this unique subdomain whenever you see the `{yourOktaDomain}` variable in this document.

## Set up your Postman environment

1. [Install the Postman app](https://www.getpostman.com/apps).
1. Start Postman if it's not open already.
1. In the upper-left corner, click **Import**.
1. In the **Import** dialog, paste the following link into the **Paste cURL, Raw text or URL...** textbox: `https://developer.okta.com/docs/api/postman/example.oktapreview.com.environment`.
   > **Note:** You can also download this environment locally and import it as a file.
1. In the upper-right corner, click the box that lists the environments, and then select **`{yourOktaDomain}`** from the list. The initial value is `No Environment` if you just installed Postman.

    <div class="three-quarter">

    ![Postman environment list: Displays an arrow pointing to the box in the upper-right corner of the window that contains environments for use with Postman](/img/postman/postman_environment_list.png)

    <!--
    Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3236%3A30994  postman_environment_list
      -->

    </div>

1. In the upper-right corner, next to `{yourOktaDomain}`, click **Environment quick look** ![Postman environment quick look button](/img/postman/postman_eye_icon_button.png  "Displays the eye icon button").
1. In the upper-right corner of the `{yourOktaDomain}` dialog, click **Edit**.

    <!--
    ![Postman environment quick look edit link: Displays an arrow pointing to the edit link in the upper-right corner of the ${yourOktaDomain} dialog](/img/postman/postman_environment_quick_look_edit.png)
    Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3236%3A31016  postman_environment_quick_look_edit
    -->

1. In the environment tab, do the following:
    1. Click the environment name, delete the placeholder text, and name your environment. For example: `dev-1234567 Okta Org`
    {style="list-style-type:lower-alpha"}
    1. For the `url` variable, in the **Initial Value** and **Current Value** columns, replace the placeholder text with your org's full URL. For example: `https://dev-1234567.okta.com`. Remember to remove the `-admin` part of your subdomain.

1. Click **Save** near the top of the tab.
1. To close the environment tab, hover over the tab and click the **x**.

## Import a collection

Go to the Okta [Postman collections](https://developer.okta.com/docs/reference/postman-collections/) reference to import the collection you want to test.

> **Note:** Alternatively, you can fork a collection from the [Okta Public API Collections](https://www.postman.com/okta-eng/workspace/okta-public-api-collections/overview).

To import a collection from the Okta [Postman Collections](https://developer.okta.com/docs/reference/postman-collections/) reference page:

1. Click **Run in Postman** next to the collection you want.

   For example, click this **Run in Postman** action to import the Users API collection:
   [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/9daeb4b935a423c39009)
   > **Note:** The **Run in Postman** option is also available on each [core API reference](/docs/reference/core-okta-api/) page on this site.

1. On the **Run in** dialog, either select to import your collection to your local Postman app or to your web Postman account.

   If you select the web option, you need to sign in to your online Postman account.

1. Select the workspace to import your collection, and then click **Import**.

## Set up Okta for API access

To access Okta APIs from Postman, you need to authenticate with the Okta API resource server. Okta APIs support the OAuth 2.0 authentication scheme that uses access tokens. Access tokens enable the bearer to perform specific actions on specific Okta endpoints, defined by the scopes in the token.

Scoped access tokens have several advantages, including:

* More access granularity
* Shorter token lifespans
* Can be generated and retrieved using an API

> **Note:** Okta doesn't recommend using the Okta-propriety `SSWS` API token authentication scheme.
> This API token scheme allows you to access a broad range of APIs since there's no scope associated with the token. Access to the APIs depends on the privileges of the user that [created the API token](/docs/guides/create-an-api-token/main/). The API token also has a fixed expiry date.

You need to obtain an OAuth 2.0 access token to configure the authorization header of your Postman API requests to Okta. To obtain this access token, set up Okta for your use case:

* [User-based API access setup](#user-based-api-access-setup): to obtain an access token that is scoped for specific resources and actions and tied to the permissions of an Okta user
* [Service-based API access setup](#service-based-api-access-setup): to obtain an access token that is scoped for specific resources and actions, not associated with an Okta user

### User-based API access setup

If your use case requires you to access a limited number of Okta endpoints as a specific user, use the OAuth 2.0 Authorization Code grant flow with PKCE. See the following task to set up your Okta org for API access.

#### Create an OIDC app in Okta

Create an OIDC app integration to define your scope-based access to Okta APIs with the Authorization Code grant flow with PKCE.

1. [Sign in](https://developer.okta.com/login) to your Okta org Admin Console as a user with administrative privileges (Super Admin role).
1. In the Admin Console, go to **Applications** > **Applications**.
1. Click **Create App Integration**.
1. On the **Create a new app integration** page, select **OIDC - OpenID Connect** as the **Sign-in method**. Choose **Web Application** for the **Application type**. Creating a web app is an easy way to test scope-based access to Okta APIs. Click **Next**.
1. Enter a name for your app integration.
1. For the **Grant type**, leave the default of **Authorization Code** grant flow.
1. In the **Sign-in redirect URIs** box, specify the callback location where Okta returns a browser (along with the token) after the user finishes authenticating. You can use the default values for testing purposes.
1. In the **Assignments** section, select **Limit access to selected groups** and add a group or **Skip group assignment for now**. It's good practice to create and use groups for testing purposes.
1. Click **Save**. The settings page for the app integration appears, showing the **General** tab. Make note of the **Client ID** and **Client secret** listed in the **Client Credentials** section. You need this information for the [Get an access token and make a request](#get-an-access-token-and-make-a-request) task.
1. Click the **Assignments** tab and ensure that the right users are assigned to the app. If you skipped the assignment during the app integration creation, you must add one or more users. For instructions on how to assign the app integration to individual users and groups, see the [Assign app integrations](https://help.okta.com/okta_help.htm?id=ext_Apps_Apps_Page-assign) topic in the Okta product documentation.
1. Select the **Okta API Scopes** tab and then click **Grant** for each of the scopes that you want to add to the app grant collection. Ensure that you grant the scopes for the API access you require. See [Okta OAuth 2.0 scopes](https://developer.okta.com/docs/api/oauth2/).<br>For example, click **Grant** next to `okta.users.read`.

   > **Notes:** When an API request is sent to the org authorization server's `/authorize` endpoint, it validates the requested scopes in the request against the app's grants collection. The scope is granted if it exists in the app's grants collection.

After you obtain your client ID and secret from your app integration, see [Get an access token and make a request](#get-an-access-token-and-make-a-request).

> **Note:** For a detailed guide on OAuth 2.0 with the Authorization Code flow, see [Implement OAuth for Okta](/docs/guides/implement-oauth-for-okta/).

### Service-based API access setup

If your use case requires access to a limited number of Okta endpoints as a service or daemon without user context, use the Client Credentials grant flow. The Client Credentials grant flow is the only grant flow supported with the OAuth 2.0 service app when you want to mint access tokens that contain Okta scopes.

 > **Note:** Client Credentials grant requests to the Okta org authorization server must use the private key JWT token method (`client_assertion_type`) for the `/token` endpoint. The client ID and secret method isn't allowed. Tasks in this section show you how to generate the public/private JWKS and JWT for the `/token` endpoint.

See the following tasks to set up your Okta org for a service app API access.

#### Create a service app in Okta

First, create a service app integration where you can define your scope-based access to Okta APIs.

1. [Sign in](https://developer.okta.com/login) to your Okta org Admin Console as a user with administrative privileges (Super Admin role).
1. In the Admin Console, go to **Applications** > **Applications**.
1. Click **Create App Integration**.
1. On the **Create a new app integration** page, select **API Services** as the **Sign-in method** and click **Next**.
1. Enter a name for your app integration and click **Save**. The settings page for the app integration appears, showing the **General** tab. Make note of the **Client ID** listed in the **Client Credentials** section. You need this information for the [Create and sign the JWT](#create-and-sign-the-jwt) task.
1. Click the **Admin roles** tab and assign an admin role with permissions to the resource sets that you require.
   > **Note:** This step is only required for Preview orgs. For Production orgs, this step is required only if the **Assign admin roles to public client apps** Early Access feature is enabled.

   You can assign the [standard admin roles](https://help.okta.com/okta_help.htm?type=oie&id=ext-administrators-admin-comparison) or a [custom admin role](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-creating-custom-admin-roles) with permissions to specific resource sets. See [Assign admin roles to apps](https://help.okta.com/okta_help.htm?type=oie&id=csh-work-with-admin-assign-admin-role-to-apps).

   If you're unsure of which admin roles to assign, for testing purposes, assign the super admin role to have permission to all resource sets:
   1. Click **Edit assignments**.
   {style="list-style-type:lower-alpha"}
   1. Select **Super Administrator** under Roles and click **Save Changes**.

1. Select the **Okta API Scopes** tab and then click **Grant** for each of the scopes that you want to add to the app grant collection. Ensure that you grant the scopes for the API access you require. See [Okta OAuth 2.0 scopes](https://developer.okta.com/docs/api/oauth2/). <br>For example, click **Grant** next to `okta.users.read`.

   > **Notes:** When an API request is sent to the org authorization server's `/token` endpoint, it validates the requested scopes in the request against the app's grants collection. The scope is granted if it exists in the app's grants collection.

1. Generate the public/private JSON Web Key Set (JWKS) for client authentication. This is the only authentication method supported for OAuth 2.0 service apps that want access to tokens with Okta scopes. For testing purposes, you can use the Admin Console to generate the JWKS:
   1. In the **Client Credentials** section of the **General** tab, click **Edit** to change the client authentication method.
   {style="list-style-type:lower-alpha"}
   1. Select **Public key/Private key** as the **Client authentication** method.
   1. For a simple implementation, leave the default of **Save keys in Okta**, and then click **Add key**.
   1. Click **Generate new key** and the public and private keys appear in JWK format.

      This is your only opportunity to save the private key. Click **Copy to clipboard** to copy the private key and store it somewhere safe for the [Create and sign the JWT](#create-and-sign-the-jwt) task.
   1. Click **Done** to close the dialog.
   1. Click **Save** in the **Client Credentials** section. The new public key is now registered with the app and appears in a table in the **PUBLIC KEYS** section of the **General** tab.

   


#### Create and sign the JWT

After you obtain the JWKS from you Okta service app, create a JSON Web Token (JWT) for your access token request.

Use the private JWKS as the JWT header and use the following [token claims](/docs/reference/api/oidc/#token-claims-for-client-authentication-with-client-secret-or-private-key-jwt) as the JWT payload:

* `aud`: Set this value to `https://${yourOktaDomain}/oauth2/v1/token`.
* `exp`: The expiration time of the token in seconds since January 1, 1970 UTC (current UNIX timestamp). Set this value to a maximum of only an hour in the future.
* `iss`: Set this value to your service app client ID (from the [Create a service app in Okta](#create-a-service-app-in-okta) task).
* `sub`: Set this value to your service app client ID.

> **Note:** The instructions in this section are for testing purposes only. In production environments, use Okta SDKs or other language libraries to create and sign the JWT. See [Build a JWT with a private key](/docs/guides/build-self-signed-jwt/java/main/#build-a-jwt-with-a-private-key) for an example in Java or JavaScript.

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
1. Copy the JWT for use in the next task: [Get an access token from a signed JWT](#get-an-access-token-from-a-signed-jwt).

#### Get an access token from a signed JWT

To request an access token using the Client Credentials grant flow, make a request to your Okta [org authorization server's](/docs/concepts/auth-servers) `/token` endpoint.

> **Note:** Client Credentials grant requests from a custom app to the Okta org authorization server must use the private key JWT token method (`client_assertion_type`) for the `/token` endpoint.

Include the following parameters in your `/token` request:

* `scope`: Include the scopes that allow you to perform the actions on the endpoint that you want to access. The scopes requested for the access token must already be in the service app grant collection. See [Scopes and supported endpoints](/docs/guides/implement-oauth-for-okta/main/#scopes-and-supported-endpoints).

    In this example, only one access scope is requested (`scope=okta.users.read`). When you request an access token for multiple scopes, the format for the scope value looks like this: `scope=okta.users.read okta.apps.read`

* `client_assertion_type`: Specifies the type of assertion, in this case a JWT token:  `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`

* `client_assertion`: The signed JWT. Paste the JWT that you signed in the [Create and sign the JWT](#create-and-sign-the-jwt) section.

1. Make a `POST` request to the `/token` endpoint with the JWT token client assertion parameters. You can execute the cURL command in your local terminal.

    The following is a cURL request example for an access token (the JWT is truncated for brevity).

    ```bash
    curl --location --request POST 'https://${yourOktaDomain}/oauth2/v1/token' \
        --header 'Accept: application/json' \
        --header 'Content-Type: application/x-www-form-urlencoded' \
        --data-urlencode 'grant_type=client_credentials' \
        --data-urlencode 'scope=okta.users.read' \
        --data-urlencode 'client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer' \
        --data-urlencode 'client_assertion=eyJhbGciOiJSU....tHQ6ggOnrG-ZFRSkZc8Pw'
    ```

    The following is an example of a response (the token is truncated for brevity):

    ```json
    {
        "token_type": "Bearer",
        "expires_in": 3600,
        "access_token": "eyJraWQiOiJ.....UfThlJ7w",
        "scope": "okta.users.read"
    }
    ```

    > **Note:** The lifetime for this token is fixed at one hour.

1. Use the `access_token` value from the response to [make a request with an access token](#make-a-request-with-an-access-token).

> **Note:** For a detailed OAuth 2.0 for service apps guide using the Client Credentials flow, see [Implement OAuth for Okta with a service app](/docs/guides/implement-oauth-for-okta-serviceapp/main/).

## Send a request

* If you have an access token, see [Make a request with an access token](#make-a-request-with-an-access-token) to test sending an API request in Postman.

* If you don't have an access token, Postman incorporates getting an access token and sending a request with the **OAuth 2.0** authorization type option. See [Get an access token and make a request](#get-an-access-token-and-make-a-request).

### Get an access token and make a request

Request an OAuth 2.0 access token by making a call to your Okta [org authorization server](/docs/concepts/auth-servers/) `/authorize` endpoint. Only the Okta org authorization server can mint access tokens that contain Okta API scopes.

In Postman, the initial `/authorize` request is included in the **Authorization** tab > **OAuth 2.0** type > **Configure New Token** section.

> **Notes:**
> * See [Token lifetime](/docs/reference/api/oidc/#token-lifetime).
> * Okta recommends that you always use the Authorization Code with PKCE grant flow. See [Implement the Authorization Code with PKCE flow](/docs/guides/implement-grant-type/authcodepkce/main/) for details on this grant type.

1. Select the request that you want to make from Postman, such as a `GET` request to the `/api/v1/users` endpoint to get back a list of all users.
2. On the **Header** tab, remove the **Authorization** parameter if it exists.
3. Click the **Authorization** tab and from the **Type** dropdown list, select **OAuth 2.0**.
4. On the right pane, scroll down to the **Configure New Token** section.
5. In the first field, enter a name for the token and select **Authorization Code (With PKCE)** as the grant type.
6. Define the remaining fields for the token request:

    * **Callback URL**: Define the callback location where Okta returns the token after the user finishes authenticating. This URL must match one of the redirect URIs that you configured in the [Create an OIDC app in Okta](#create-an-oidc-app-in-okta) task.
    * **Auth URL**: Enter the authorization endpoint for your org authorization server: `https://${yourOktaDomain}/oauth2/v1/authorize`.
    * **Access Token URL**: Enter the token endpoint for your org authorization server: `https://${yourOktaDomain}/oauth2/v1/token`.
    * **Client ID**: Specify the client ID value of your Okta OIDC app integration that you created in the [Create an OIDC app in Okta](#create-an-oidc-app-in-okta) task.

        Alternatively, you can add the client ID to the `clientId` variable in your Postman environment and use the following **Client ID** value:
        ```json
        {{clientId}}
        ```

    * **Client secret**: Specify the client secret of your Okta OIDC app integration that you created in the [Create an OIDC app in Okta](#create-an-oidc-app-in-okta) task.

        Alternatively, you can add the client secret to the `clientSecret` variable in your Postman environment and use the following **Client secret** value:
        ```json
        {{clientSecret}}
        ```

    * **Code Challenge Method**: Leave the default of `SHA-256` selected.
    * **Code Verifier**: Leave this field empty so that Postman generates its own.
    * **Scope**: Include the scopes that allow you to perform the actions on the endpoint that you want to access. The scopes requested for the access token must exist in the app's grants collection, and the user must have the permission to perform those actions. Use `okta.users.read` for this example.
    * **State**: Specify any alphanumeric value. The authorization server reflects this string when redirecting the browser back to the client.
    * **Client Authentication**: Set to **Send client credentials in body**.

7. Click **Get New Access Token**. You're prompted to sign in to your Okta org. Sign in as a user that was assigned to your OIDC app integration.

   After you're authenticated, the access token and the scopes requested appear in the **Manage Access Tokens** window. The token also appears in the **Current Token** dropdown list.
     > **Note:** The lifetime for this token is fixed at one hour.
8. Click **Use Token** at the top of the window to use this access token in your request to the `/users` endpoint.
9. Click **Send**. <br>The result pane displays the results of your request. In this `GET /api/v1/users` example, a list of users associated with your app appears.

### Make a request with an access token

If you have an access token (such as the `access_token` value from the [Get an access token from a signed JWT](#get-an-access-token-from-a-signed-jwt) task), follow these steps to make your Okta API request:

1. In Postman, select the request that you want to make, such as a `GET` request to the `/api/v1/users` endpoint to get back a list of all users.
1. On the **Header** tab, remove the **Authorization** parameter if it exists.
1. Click the **Authorization** tab and from the **Type** dropdown list, select **OAuth 2.0**.
   * On the right **Current Token** section, select **Available Tokens** and paste the access token into the **Token** box. Ensure that **Header Prefix** is set to **Bearer**.

   Or

   * Select **Bearer Token** from the **Type** dropdown list in the **Authorization** tab. Paste the access token to the **Token** box on the right.

        The following is a cURL example of a similar request:

        ```bash
        curl -X GET "https://${yourOktaDomain}/api/v1/users"
            -H "Accept: application/json"
            -H "Content-Type: application/json"
            -H "Authorization: Bearer eyJraWQiOiJ.....UfThlJ7w"
        ```
        The access token is truncated for brevity.

1. Click **Send** for the API request. <br>The result pane displays the results of your request. In this `GET /api/v1/users` example, a list of users in your org appears.



## Tips

Use the following tips to work more efficiently with your collection.

### Find IDs for Okta API requests

Your imported collections contain URLs and JSON request bodies that have sample data with variables such as `${userId}`. You can replace the variables in the URL and body with the IDs of the resources that you want to specify.

1. To get a user's ID, for example, send a request to list the users in your org like you did in the previous section. Each user listed in the response has an ID:

  <div class="three-quarter border">

  ![Response example for a request that highlights the ID in the response](/img/postman/postman_response2.png)

  </div>

2. Copy the `id` of the resource, in this example the `id` for Tony Stark, for use in your next request. You can add the `id` value in your Postman environment and use the corresponding variable in your request URL or body.

### Retain the headers when you click links

You can retain headers when you click HAL links in the responses.

To retain the headers:

1. Click the gear icon from the toolbar in the upper-right corner of the page.
1. Select **Settings**.
1. In the **Headers** section, enable **Retain headers when clicking on links**.

## Next steps

Use Postman to learn more about the Okta APIs:

* Review the [Okta API reference](https://developer.okta.com/docs/api/).
* Import more API Postman collections.
* Try request examples in the collections to help you understand how the APIs behave.
