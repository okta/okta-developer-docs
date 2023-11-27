---
title: Test the Okta REST APIs with Postman
language: rest
integration: back-end
icon: code-rest
meta:
  - name: description
    content: Get started with Okta REST APIs and learn how to import a collection and send requests in Postman.
---

A great way to learn an Application Programming Interface (API) is to issue requests and inspect the responses. You can use Okta Postman collections to learn how you can incorporate Okta APIs into your workflow. To use these collections, you need to set up your local environment and import a collection. You can then send a test request and verify the results.

## Sign up for Okta

You need a free Okta Developer Edition org to get started. Don't have one? [Create an org for free](https://developer.okta.com/signup). When you create an Okta org, the org is assigned a base URL such as `dev-1234.okta.com`. This is your unique subdomain in Okta.

## Get authentication for Okta APIs

To access Okta APIs from Postman, you need to authenticate with the Okta API resource server. Okta APIs support two authentication options:

* OAuth 2.0 and OpenID Connect
* API token

You need to either obtain an API token (API key) or an OAuth 2.0 access token to configure the Authorization header of your Postman API requests to Okta. See

* [OpenID Connect (OIDC) authentication](#openid-connect-authentication): to obtain a bearer access token for user authentication that is scoped for specific resources
* [OAuth 2.0 service app authentication](#oauth-20-service-app-authentication): to obtain a bearer access token for service app authentication that is scoped for specific resources
* [API token authentication](#api-token-authentication): to obtain an API token for the Okta proprietary `SSWS` authentication scheme

### OpenID Connect authentication

If your use case requires you to access a limited number Okta endpoints as a specific user, you can use an OIDC access token in the Authorization header of your API requests. The OIDC access token enables the bearer to perform specific actions on specific Okta endpoints, which is controlled by the scopes defined in the access token.

Scoped access tokens have several advantages, including:

* More access granularity
* Shorter token lifespans
* Can be generated and retrieved using an API

> **Note:** For a detailed guide on OIDC access tokens, see [Implement OAuth for Okta](/docs/guides/implement-oauth-for-okta/).

#### Create an OIDC app in Okta

First, you need to create an OIDC app integration that you can define your scope-based access to Okta APIs.

1. [Sign in](https://developer.okta.com/login) to your Okta org Admin Console as a user with administrative privileges.
1. In the Admin Console, go to **Applications** > **Applications**.
1. Click **Create App Integration**.
1. On the **Create a new app integration** page, select **OIDC - OpenID Connect** as the **Sign-in method**. Choose **Web Application** for the **Application type**. Creating a web app is an easy way to test scope-based access to Okta's APIs using an OAuth 2.0 bearer token. Click **Next**.
1. Enter a name for your app integration.
1. For the **Grant type**, use the **Authorization Code** grant flow that is already selected.
1. In the **Sign-in redirect URIs** box, specify the callback location where Okta returns a browser (along with the token) after the user finishes authenticating. You can use the default values for testing purposes.
1. In the **Assignments** section, select **Limit access to selected groups** and add a group or **Skip group assignment for now**. It's good practice to create and use groups for testing purposes.
1. Click **Save**. The settings page for the app integration appears, showing the **General** tab. Make note of the **Client ID** and **Client secret** listed in the **Client Credentials** section. You need this information for the [Get an access token and make a request](#get-an-access-token-and-make-a-request) task.
1. Click the **Assignments** tab and ensure that the right users are assigned to the app. If you skipped the assignment during the app integration creation, you must add one or more users now. For instructions on how to assign the app integration to individual users and groups, see the [Assign app integrations](https://help.okta.com/okta_help.htm?id=ext_Apps_Apps_Page-assign) topic in the Okta product documentation. For more information about which users have access to which scopes, see the [Scopes and supported endpoints](#scopes-and-supported-endpoints) section.
1. Optional. Click the **Application rate limits** tab to adjust the rate-limit capacity percentage for this application. By default, each new application sets this percentage at 50%.

#### Define allowed scopes for your OIDC app integration

When a request is sent to the org authorization server's `/authorize` endpoint, it validates all of the requested scopes in the request against the app's grants collection. The scope is granted if it exists in the app's grants collection.

> **Note:** Only the Super Admin role has permission to grant scopes to an app.

1. Sign in to your Okta org with your administrator account.
1. In the Admin Console, go to **Applications** > **Applications**.
1. Select the OpenID Connect (OIDC) app that needs grants added.
1. Select the **Okta API Scopes** tab and then click **Grant** for each of the scopes that you want to add to the app's grant collection.

> **Note:** You can find a list of available Okta scopes and their descriptions in [OAuth 2.0 Scopes](https://developer.okta.com/docs/api/oauth2/).

#### Get an OIDC access token and make a request

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


### OAuth 2.0 service app authentication

[create an OAuth 2.0 access token for service apps](/docs/guides/implement-oauth-for-okta-serviceapp/main/)

### API token authentication

For the `SSWS` Okta propriety authentication scheme, go to the Admin Console of your Okta org to obtain an API token. See [Create an API token](/docs/guides/create-an-api-token/) for your org.

Use this authentication scheme to quickly test various Okta endpoints. The token allows you to access a broad range of APIs since there's no scope associated with the token. However, only the Okta user that created the API token can use it, and access to the APIs depend on the privileges of the token-created user. You can't use the API token if the token-created user is deactivated, deleted, lost their access privileges, or if the token expired.

> **Note:** The rate limits for API token requests are reduced by 50 percent. See [Token rate limits](/docs/guides/create-an-api-token/main/#token-rate-limits).

For production usage, Okta recommends the more secure OAuth 2.0 or OIDC authentication schemes.

## Set up your environment with SSWS authentication scheme

1. [Install the Postman app](https://www.getpostman.com/apps).
1. Start Postman if it's not open already.
1. In the upper-left corner, click **Import**.
1. In the **Import** dialog box, click **Link** and then paste the following link into the **Enter a URL** box: `https://developer.okta.com/docs/api/postman/example.oktapreview.com.environment`.
   > **Note:** You can also download this environment locally and import it as a file.
1. Click **Continue** and then **Import** to confirm your environment import.
1. In the upper-right corner, click the box that lists the environments and then select `${yourOktaDomain}` from the list. The initial value is `No Environment` if you just installed Postman.

<div class="three-quarter">

![Postman environment list box: Displays an arrow pointing to the box in the upper-right corner of the window that contains environments for use with Postman](/img/postman/postman_environment_list.png)

<!--
Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3236%3A30994  postman_environment_list
   -->

</div>

8. In the upper-right corner, next to `${yourOktaDomain}`, click **Environment quick look** ![Postman environment quick look button](/img/postman/postman_eye_icon_button.png  "Displays the eye icon button").
9. In the upper-right corner of the **${yourOktaDomain}** dialog box, click **Edit**.

<div class="three-quarter">

![Postman environment quick look edit link: Displays an arrow pointing to the edit link in the upper-right corner of the ${yourOktaDomain} dialog box](/img/postman/postman_environment_quick_look_edit.png)

<!--
Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3236%3A31016  postman_environment_quick_look_edit
 -->

</div>

10. In the **Manage Environments** dialog box, do the following:
    * Click on the environment name, delete the placeholder text, and name your environment, for example: `Test Okta Org`.
    * For the `url` variable, in the **Initial Value** and **Current Value** columns, replace the placeholder text with your org's full URL, for example: `https://dev-1234567.okta.com`. Remember to remove the `-admin` part of your subdomain.
    * For OAuth 2.0 or OIDC authentication, in the **Initial Value** and **Current Value** columns of the `apikey` variable, enter the access token that you obtained earlier. Pay attention to the expiration of the access token.
    * For `SSWS` API token authentication, in the **Initial Value** and **Current Value** columns of the `apikey` variable, enter your API token that you created earlier, for example: `00LzMWxMq_0sdErHy9Jf1sijEGexYZlsdGr9a4QjkS`.

<div class="three-quarter">

![Displays arrows that points to the Environment Name box and the url and apikey variables in the Manage Environments dialog box](/img/postman/postman_manage_environments_dialog.png)

<!--
Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3236%3A31047  postman_manage_environments_dialog
-->

</div>

11. Click **Save** near the top of the tab.
12. To close the environment tab, hover over the tab and click the **x**.

## Import a collection

Use the **Run in Postman** button below to import the Users API collection:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/1755573c5cf5fbf7968b)

You can then select the option to open the collection using the Postman app. Alternatively, you are also given the option to use the **Web View** link to download the collection as a JSON file and import it:

* Import that file into Postman by selecting **Import** from the **File** menu.
* In the **Import** window, leave **Import File** selected and click **Choose Files**.
* Browse to your download location, select the JSON file, and click **Open**.
* Click **Import**.

> **Note:** You can import and work with the rest of the Okta API using the link at the top of each API reference page,
or see [all Postman collections](/docs/reference/postman-collections/). This tutorial only requires the Users API collection.

## Send a request

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
