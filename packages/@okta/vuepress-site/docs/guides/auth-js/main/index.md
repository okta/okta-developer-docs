---
title: Auth JS fundamentals
---

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" /><br>

This guide explains authentication fundamentals using Auth JS, formally known as the Okta Auth JavaScript SDK, and provides a simple SPA application to demonstrate a sign-in use case.

---

**Learning outcomes**

* Understand how to implement basic sign-in using the Okta Auth JavaScript SDK.
* Understand basic installation and code configurations using the Okta Auth JavaScript SDK.
* Implement the sample SPA use case and sign a user in to the application.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup/)
* Basic knowledge of building front-end JavaScript applications

**Sample code**

* [static-spa sample](https://github.com/okta/okta-auth-js/tree/master/samples/generated/static-spa)

---

## About the Okta Auth JavaScript SDK

## Installation

## Add code to reference the SDK

### Initialize the SDK

    var authClient = new OktaAuth({})

### Create a sign-in page

### Authenticate user credentials

    idx.authenticate

### Handle responses

    Idx.Status.SUCCESS

    and other cases

### Get the user profile information

    authClient.token.getUserInfo(accessToken, idToken)

## Run the sample application

### Create an app integration

Create an app integration in the Okta org that represents the application you want to add authentication to:

1. In the Admin Console, go to **Applications** > **Applications**.
1. Click **Create App Integration**.
1. Select **OIDC - OpenID Connect** as the **Sign-in method**.
1. Select **Single-Page Application** for the **Application Type**.
1. On the **New Single-Page App Integration** page:

   * Enter an application name.
   * Select the **Interaction Code** checkbox.
   * Select the **Refresh Token** checkbox.
   * Set **Sign-in redirect URIs** to `http://localhost:8080/login/callback`.

1. In the **Assignments** section, select **Allow everyone in your organization to access**.
1. Click **Save**.
1. Select the **Sign On** tab.
1. In the **Sign On Policy** section, verify that the **Available Authenticators** settings are appropriate for your app. For this use case, ensure that the **1 factor type** authenticator is **Password / IdP**.
1. In the **Security** > **API** > **Authorization Servers** section, verify that the custom authorization server uses the Interaction Code grant type by selecting the **default** server, clicking **Access Policies**, and editing the **Default Policy Rule**. Review the **If Grant type is** section to ensure the **Interaction Code** checkbox is selected.
1. In the **Security** > **API** > **Trusted Origins** page, ensure that there is an entry for your sign in redirect URI (`http://localhost:8080`). See [Enable CORS](/docs/guides/enable-cors/).

> **Note:** From the **General** tab of your app integration, save the generated **Client ID** value, which is used in the next section.

### Download and install the sample app

The sample app, `static-spa` resides in the `okta-auth-js` repository. Clone the repository and install the project dependencies:

1. Clone the Okta Auth JavaScript SDK repository to your local project directory and navigate to the `static-spa` directory:

```shell
git clone https://github.com/okta/okta-auth-js.git
cd okta-auth-js/samples/generated/static-spa
```

1. Install the dependencies with a package manager, `npm` for example:

```shell
npm install
```

1. In the `apps.js` file, update the Okta org configurations for your sample application in the `config` variable:

```JavaScript
var config = {
  issuer: `https://${yourOktaDomain}/oauth2/default`, //For example, `"https://example.okta.com/oauth2/default"`
  clientId: `${yourClientId}`, // for example, `0oa2am3kk1CraJ8xO1d7`
  scopes: ['openid','email'],
  storage: 'sessionStorage',
  useInteractionCodeFlow: true,
  requireUserSession: 'true',
  authMethod: 'form',
  startService: false,
  useDynamicForm: false,
  uniq: Date.now() + Math.round(Math.random() * 1000), // to guarantee a unique state
  idps: '',
};
```

> **Note:** You can also set these configurations at runtime.

### Run the sample app

1. In the `static-spa` directory, run the sample application:

    ```shell
    npm start
    ```

1. Navigate to `http://localhost:8080`. The static spa page appears with a custom login form. Application status details appear to the right of the screen.

1. Sign in with a user from your org assigned to the app integration. The static spa page appears printing the user's info and access token details to the page.

> **Note:** You can also configure an embedded Sign-In Widget use-case or a redirect use-case by updating the configuration details in the application. Click `Edit Config` to make those changes. For more information, see the [static-spa sample](https://github.com/okta/okta-auth-js/tree/master/samples/generated/static-spa#configuring).

## Next steps

## See also

