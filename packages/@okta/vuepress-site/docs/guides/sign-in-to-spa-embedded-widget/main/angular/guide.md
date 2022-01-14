## About Angular and the Okta Sign-In Widget

The Okta Sign-In Widget works authenticate users in your Angular application

To implement authentication in your Angular application, the embedded Okta Sign-In Widget provides user authentication, as well as an opportunity to customize the sign in experience. This guide explains how to build a sample application with the Sign-In Widget, included in the [okta/samples-js-angular](https://github.com/okta/samples-js-angular) repository . See [Create a simple authentication use case with Angular](#create-a-simple-authentication-use-case-with-angular) for further details.

<img src="/img/okta-sign-in-angular.png" alt="Screenshot of basic Okta Sign-In Widget using Angular" width="400">

## Installation

The first step is to install the Widget. You have two options for your application: linking out to the Okta CDN, or installing locally through `npm`.

### CDN

To use the CDN, include the following script in your HTML:

```html
<!-- Latest CDN production JavaScript and CSS -->
<script src="https://global.oktacdn.com/okta-signin-widget/-=OKTA_REPLACE_WITH_WIDGET_VERSION=-/js/okta-sign-in.min.js" type="text/javascript"></script>
<link href="https://global.oktacdn.com/okta-signin-widget/-=OKTA_REPLACE_WITH_WIDGET_VERSION=-/css/okta-sign-in.min.css" type="text/css" rel="stylesheet"/>
```

More info, including the latest published version, can be found in the [Widget Documentation](https://github.com/okta/okta-signin-widget#using-the-okta-cdn).

### npm

```bash
# Run this command in your project root folder.
npm install @okta/okta-signin-widget@-=OKTA_REPLACE_WITH_WIDGET_VERSION=-
```

More info, including the latest published version, can be found in the [Widget Documentation](https://github.com/okta/okta-signin-widget#using-the-npm-module).

## Create a simple authentication use case with Angular

In this case, you use the Widget to sign in to a simple web page and xyz?. Ensure you have an Okta developer account, and use the github repo sample.

To create and run this sample use case:

* Create an app integration on your Okta org.
* Download a simple SPA from the gitHub repository.
* Run the sample application.

>**Note:** This use case uses Angulr x, Node y, and Auth-JS blah

### Create the app integration

Create an app integration that represents the Angular application you want to add authentication to using Okta:

1. In the Admin Console, go to **Applications** > **Applications**.
1. Click **Create App Integration**.
1. Select **OIDC - OpenID Connect** as the **Sign-in method**.
1. Select **Single-Page Application** for the **Application Type**.
1. On the **New Single-Page App Integration** page:

   * Enter an application name.
   * Select the **Interaction Code** check box.
   * Select the **Refresh Token** check box.
   * Set **Base URI** to `http://localhost:8080`
   * Set **Sign-in redirect URIs** to `http://localhost:8080/login/callback`.
   * Set **Sign-out redirect URIs** to `http://localhost:8080/`

1. In the **Assignments** section, select **Allow everyone in your organization to access**.
1. Click **Save**.
1. Select the **Sign On** tab.
1. In the **Sign On Policy** section, verify that the **Available Authenticators** settings are appropriate for your app. For this use case, ensure that the **1 factor type** authenticator is **Password / IdP**.
1. In the **Security** > **API** > **Authorization Servers** section, verify that the custom authorization server uses the Interaction Code grant type by selecting the **default** server, clicking **Access Policies**, and editing the **Default Policy Rule**. Review the **If Grant type is** section to ensure the **Interaction Code** check box is selected.
1. In the **Security** > **API** > **Trusted Origins** page, ensure there is an entry for your sign in redirect URI. See [Enable CORS](/docs/guides/enable-cors/).

> **Note:** From the **General** tab of your app integration, save the generated **Client ID** value, which is used in the next section.

### Download the sample Angular application

1. In your project folder, download the sample application from the gitHub repository, and navigate to the custom-login folder.

    ```bash
    git clone https://github.com/okta/samples-js-angular.git
    cd samples-js-angular/custom-login
    ```

1. In the `custom-login` folder, install the dependencies:

    ```bash
    npm install
    ```

1. Ensure you're using the angular version and node version designed for this sample application.

    ```bash
    node --version
    ```

    ```bash
    ng --version
    ```

1. Install the following version of `okta-auth-js` SDK:

    ```bash
    npm install @okta/okta-auth-js@5.9.1
    ```

1. Navigate to the `samples-js-angular` folder, and create a configuration file, `testenv` (no extension).

    >**Note:** You may need to install the `dotenv` package if not already installed (`npm install dotenv`).

1. Populate the `testenv` file with the following parameters and values from your app integration created in the previous section:

    ```txt
    ISSUER=https:////${yourOktaDomain.com}/oauth2/default
    CLIENT_ID=${Client ID value from app integration}
    USE_INTERACTION_CODE=true
    ```

### Run the sample application

1. From the `custom-login` folder, run the sample application:

    ```bash
    ng serve
    ```

1. After a successful compilation, navigate to `http://localhost:8080`. The **Custom Login with Sign-In Widget** page appears.

1. Click the **Login** button, and enter credentials for a user assigned to your app integration. The **Custom Login with Sign-In Widget** returns with the user's email address.

1. Click the **Profile** tab to view claim information returned in the ID token.

## Next steps

You have now successfully authenticated with Okta! Now what? With a user's `id_token`, you have basic claims for the user's identity. You can extend the set of claims by modifying the `scopes` to retrieve custom information about the user. This includes `locale`, `address`, `groups`, and [more](/docs/reference/api/oidc/).

Want to learn how to use the user's `access_token`? Check out our [how-to guide](/docs/guides/sign-into-spa/angular/main/) to learn about protecting routes on your server, validating the `access_token`, and more!