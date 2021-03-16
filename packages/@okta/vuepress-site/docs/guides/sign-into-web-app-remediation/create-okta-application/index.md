---
title: Create an Okta app integration
---
Before you can sign a user in, you need to create an Okta app integration that represents your web application.

1. Sign in to your Okta organization with your administrator account.

    <a href="https://developer.okta.com/login" target="_blank" class="Button--blue">Go to Admin Console</a>

1. From the Admin Console side navigation, click **Applications** > **Applications**.
1. Click **Add Application** and then **Create New App**.
1. Pick **Web** as the platform and click **Create**.
    > **Note:** It is important to choose the appropriate application type for apps that are public clients. Failing to do so may result in Okta API endpoints attempting to verify an app's client secret, which public clients aren't designed to have, hence breaking the sign-in or sign-out flow.
1. Enter a name for your app integration (or leave the default value).
1. Enter values for the **Login redirect URI**. Add values for local development (such as `http://localhost:8080/authorization-code/callback`) and production (such as `https://app.example.com/authorization-code/callback`). Your users aren't redirected, but this URL is required by the API to validate the request.

<!-- removed step 3 until the base uri is returned to the app wizard ui in feb 2021 -->
<!--
3. Add the **Base URI** of your application during local development, such as `http://localhost:3000`. Also, add any base URIs where your application runs in production, such as `https://app.example.com`.
-->

7. Click **Save** to finish creating the Okta app integration.
1. On the **General** tab, the **Client Credentials** section shows the client ID and client secret values for your app integration.
1. Copy the **Client ID** and **Client secret** values using the **Copy to Clipboard** button beside each text field.
1. Under **Grant type allowed**, make sure that **Interaction Code** is selected.

## Enable Trusted Origins

To reduce possible attack vectors, you need to explicitly define the Trusted Origins that can access the Okta API for your app integration. Cross-Origin Resource Sharing (CORS) allows JavaScript hosted on your website to make a request using `XMLHttpRequest` to the Okta API with the Okta session cookie. For instructions on setting trusted origins, see [Grant cross-origin access to websites](/docs/guides/enable-cors/granting-cors/).

>**Note:** You should only grant access to specific origins (websites) that you control and trust to access the Okta API.

<NextSectionLink/>
