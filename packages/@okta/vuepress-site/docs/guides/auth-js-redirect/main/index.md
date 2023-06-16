---
title: Sign users in to your SPA using the redirect model and Auth JS
---

The [Okta JavaScript Auth SDK](https://github.com/okta/okta-auth-js) (Auth JS) helps implement a wide variety of web authentication solutions for both the [redirect and embedded model](/docs/concepts/redirect-vs-embedded/). This guide creates a simple redirect authentication solution using Auth JS, which you can drop into just about any front-end or server-side web application.

---

**Learning outcomes**

* Understand how to implement a simple redirect sign-in using Auth JS.
* Understand basic installation and code configurations using AuthJS.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup/)

---

## About the Okta Auth JavaScript SDK

The Okta Auth JS SDK builds on top of the [Authentication API](/docs/reference/api/authn/), the [OpenID Connect API](/docs/reference/api/oidc/), and the Identity Engine [interaction code](/docs/concepts/interaction-code/) flow. This SDK enables you to create various sign-in experiences.

These experiences include fully branded embedded authentication, as with [Auth JS fundamentals](/docs/guides/auth-js/) and redirect authentication. Auth JS is used by the Okta [Sign-In Widget](https://github.com/okta/okta-signin-widget), which powers the default Okta sign-in page. It also powers our other redirect SDKs that provide simple authentication for server-side web apps and single-page JavaScript apps (SPA). See the [Quickstart guides](/docs/guides/quickstart/).

In this guide, you don’t need to use a specific server-side or front-end framework that Okta officially supports to get access to redirect authentication. It's possible to use Auth JS to create a drop-in solution that works with most web apps, whether you're adding a centralized sign-in flow to a new app or retrofitting it to an existing app. To see examples of Auth JS with other front-end frameworks, go to [Sign in to SPA](/docs/guides/sign-into-spa-redirect/angular/main/).

If you'd like to explore the entire Auth JS SDK, see [Okta Auth JS JavaScript SDK](https://github.com/okta/okta-auth-js/#readme).

## Create an Okta app integration

An Okta app integration represents your app in your Okta org. The integration configures how your app integrates with the Okta services including which users and groups have access, authentication policies, token refresh requirements, redirect URLs, and more. The integration includes configuration information required by the app to access Okta.

1. [Sign in to your Okta organization](https://developer.okta.com/login) with your administrator account.
1. Click **Admin** in the upper-right corner of the page.
1. Open the Applications configuration pane by selecting **Applications** > **Applications**.
1. Click **Create App Integration**.
1. Select a **Sign-in method** of **OIDC - OpenID Connect**.
1. Select an **Application type** of **Single-Page Application**, then click **Next**.
   > **Note:** If you choose an inappropriate application type, it breaks the sign-in or sign-out flows by requiring the verification of a client secret, which public clients don't have.
1. Enter an **App integration name**.
1. Ensure that the **Authorization Code** grant type is selected.
1. Enter the **Sign-in redirect URIs** for local development. For this sample, use `http://localhost:9000`.
1. Enter the **Sign-out redirect URIs** for local development. For this sample, use `http://localhost:9000`.
1. Enter the **Base URIs** for the trusted origin. For this sample, use `http://localhost:9000`. See [Trusted Origins](#about-trusted-origins).
1. In the **Assignments** section, define the type of **Controlled access** for your app. Select **Allow everyone in your organization to access**. See [Assign app integrations](https://help.okta.com/okta_help.htm?type=oie&id=ext-lcm-user-app-assign).
1. Clear the **Enable immediate access with Federation Broker Mode** checkbox .
1. Click **Save** to create the app integration. The configuration pane for the integration opens after it's saved. Keep this pane open as you need to copy the **Client ID** and your org domain name when configuring your app.

### About Trusted Origins

Reduce possible attack vectors by defining Trusted Origins, which are the websites allowed to access the Okta API for your app integration. Cross-Origin Resource Sharing (CORS) enables JavaScript requests using `XMLHttpRequest` with the Okta session cookie. See [Grant cross-origin access to websites](/docs/guides/enable-cors/main/#grant-cross-origin-access-to-websites).

>**Note:** To reduce risk, only grant access to the Okta API to specific websites (origins) that you both control and trust.

To review or set trusted origins go to **Security** > **API** and select the **Trusted Origins** tab. See [Enable Trusted Origins](/docs/guides/enable-cors/).

## Create a basic app

To make this sample as versatile as possible, the following starter app redirects to Okta to sign in as you load it into the browser. In your own apps, you might want to initiate the redirect through the press of a sign-in button, or when visiting a certain route that requires authentication (such as an admin page). The key is that you initiate the sign-in flow through the redirect.

### Create a simple HTML UI

In your app directory, create an HTML file called `index.html`. Add the following markup to this file:

```HTML
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Okta Auth JS - Redirect SPA</title>
</head>

<body>
 <b>Okta Auth JS Simple Redirect App</b>
 <hr />
 <div id="content-jwt"></div>
</body>

</html>
```

The content in the body tags represents a simple app. The `content-jwt` reference displays user information after you add some upcoming JavaScript.

### Install the Auth JS SDK

Include this script in your target HTML page (`index.html`) by including the following after the `<title>` element:

```html
<!-- Latest CDN production Auth JS SDK-->
<script src="https://global.oktacdn.com/okta-auth-js/7.2.0/okta-auth-js.min.js" type="text/javascript"></script>
```

>**Note:** If you're using a package manager, you can also install it through the appropriate command, for example `yarn add @okta/okta-auth-js` or `npm install @okta/okta-auth-js`.

### Add JavaScript to initialize the SDK

In the same `index.html` file, add the following JavaScript code after the Auth JS SDK reference. Update the `baseOktaURL` to your org and the `appClientID` to the client ID from the [Create an Okta app integration](#create-an-okta-app-integration) section.

```html
<script type="text/javascript">

// UPDATE THESE FOR YOUR OKTA TENANT
var baseOktaURL = "https:${yourOKtaDomain}"; //For example, https://dev-08607539.okta.com
var appClientID = "${yourClientID}"; // For example, 0oa73hm5sh9jf6s5e1d6

// Bootstrap the AuthJS Client
const authClient = new OktaAuth({
  // Required Fields for OIDC client
  url: baseOktaURL,
  clientId: appClientID,
  redirectUri: "http://localhost:9000/", //or the redirect URI for your app
  issuer: baseOktaURL , // oidc
  scopes: ['openid', 'profile', 'email']
});

</script>
```

This code initializes the SDK by creating an instance of the `OktaAuth()` object. The object stores all the necessary config information for your auth session and is used to control subsequent steps of the process.

### Get info about the user

Include the following JavaScript within the `<script>` tags and after the code that initializes the SDK:

```JavaScript
if (authClient.isLoginRedirect()) {
  // Parse token from redirect url
  console.log("Parse token from redirect url");
  authClient.token.parseFromUrl()
    .then(data => {
      const { idToken } = data.tokens;
      // Display the Token
      const str1 = document.createElement('p');
      str1.innerHTML = `<b>${idToken.claims.email}</b> (email)<br /><b>${idToken.claims.sub}</b> (sub)<br /><br />Token Response:<br /><code style="word-wrap: break-word;">${JSON.stringify(idToken)}</code><br /><br/>Parsed from JWT<br />Client ID: <b>${authClient.options.clientId}</b><br />Issuer: <b>${authClient.options.issuer}</b>`;
      document.getElementById('content-jwt').appendChild(str1);
    });
} else {
  // Always Redirect to get a "Fresh JWT" - Skipping the Token Manager in this example
  console.log("Attempt to retrieve ID Token from redirect");
  authClient.token.getWithRedirect({
          responseType: ['id_token']
        });
}
```

By default, the SDK returns the JWT with the user's information. The JWT contains the encoded ID and access tokens. The previous JavaScript parses the ID token and prints the data to your web page. See [token.parseFromUrl()](https://github.com/okta/okta-auth-js/#tokenparsefromurloptions) in the Auth JS SDK.

### Add a sign-out function

Include the following function within the `body` tags after the `content-jwt` reference:

```html
 <hr />
 <div id="uxActiveOptions">
  <b>Functions:</b>
  <br /><button onclick="authClient.signOut();">Close Okta Session</button>
</div>
```

This function signs the user out of the Okta session. See [signOut()](https://github.com/okta/okta-auth-js/#signout) in the Auth JS SDK.

## Test your app

You can now run your app by using a local web server. For example, with a macOS, go to your sample app directly and use the Python web server command:

```bash
python3 -m http.server 9000
```

Open a private or incognito browser window and go to `http://localhost:9000` or the port for your local web server. The sample app starts the redirect flow when the page opens, and the Sign-In Widget for your org appears. Sign in with a user assigned to your app, and with a successful authentication, your app's `index.html` page displays the ID token for the signed-in user.

### Troubleshoot your app

If your app isn't working, ensure that:

* Your org URL is accurate and formatted correctly, including the secure protocol, `https://`.
* Your client ID is accurate from your Okta app integration.
* Your `redirectUri` is accurate or the port number for your local web server is correct.
* You've enabled a Trusted Origin for `http://localhost:9000`. See [About Trusted Origins](#about-trusted-origins).
* If your app is bypassing the Okta Sign-In Widget, your user is already signed in. Use a new private or incognito browser window or optionally set the Authentication Policy for your app to always sign in. That is, **Re-authentication frequency is** set to **Every sign-in attempt**.

## Enable self-service registration

The self-service registration feature provides a **Sign-up** link on the Sign-In Widget for end users to register and sign in to your app.

By default, self-service registration isn’t enabled for all apps. Use the following steps to understand the policy configurations and to make this feature only available to your application. See [Self-Service Registration](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-ssr).

1. Ensure that your app is assigned to the Everyone group:

    1. Go to **Applications** > **Applications** and select your app.
    {style="list-style-type:lower-alpha"}
    1. Click the **Assignments** tab.
    1. Click the **Groups** filter.
    1. If the Everyone group isn’t assigned, add it by clicking **Assign** > **Assign to Groups**, and assigning to the Everyone group.
1. Go to **Security** > **Profile Enrollment** and edit the **Default Policy**.
1. In the **Profile Enrollment** section, **Denied** is selected for **Self-service registration**. This setting removes the self-registration option for all apps assigned to the default policy.
1. [Test your app](#test-your-app) and note that the **Sign-up** link doesn’t appear under the Sign-In Widget.
1. In the Admin Console, select **Back to all Profile Enrollment Policies** to return to the **Security** > **Profile Enrollment** page. Click **Add Profile Enrollment Policy**, and then create a name for the policy (for example, "App self-service registration").
1. Edit the new policy and note that self-service registration is **Allowed** by default. For ease of testing and to allow your new user to sign in to the app immediately, clear the **Email verification** checkbox. Click **Save**.
1. Click **Manage Apps** and then **Add an App to This Policy**. Add or apply your sample app to this new policy.
1. [Test your app](#test-your-app) again and note that the text **Don't have an account?** with a **Sign up** link now appears for your app under the Sign-In Widget. Click the link to add a user.
    1. Enter a first name, last name, and email address and click **Sign up**.
    {style="list-style-type:lower-alpha"}
    1. Click **Set up** to add a new password. (Click **Set up later** for any other authenticators.)
    You're now logged into the app with the new user's profile.

Based on other policy configurations, the self-service registration flow may be different or include other authenticators. See [Sign-in flows](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-sign-in-flows).

> **Note:** All new users through the self-registration process receive a welcome email. This email activates user access to apps on your dev org and demonstrates ownership of the email authenticator. If you complete this process, ensure you're in the same browser window as the application sign-in tab.

## Add MFA with a mandatory second factor

By default, your dev org isn’t configured for multifactor authentication. Use the following steps to understand the policy configurations and set up this use case. This setup requires an end user to authenticate with a password and a phone authenticator.

1. Go to **Security** > **Authenticators** and ensure that the phone authenticator is available in the **Authenticators** list on the **Setup** tab.

   1. If it isn't listed, click **Add Authenticator**, and then click **Add** in the **Phone** tile.
   {style="list-style-type:lower-alpha"}
   1. For **User can verify with**, select **SMS**.
   1. Set **This authenticator can be used for** to **Authentication and recovery**, and click **Add**.

1. Go to **Security** > **Authentication policies**, click **Add a policy**.

1. Add a name for the policy. For example, **Mandatory MFA**

1. In the **Catch-all Rule**, click **Edit** under the **Actions** dropdown menu.

1. For the option **User must authenticate with**, select **Password / IdP +  Another factor**. Ensure that the **Possession factor constraints are** doesn't have the **Exclude phone and email authenticators** checkbox selected. Click **Save**.

1. Go to **Applications** > **Applications** and select your app.

1. Click the **Sign On** tab.

1. Scroll down to the **User authentication** section and click **Edit**.

1. From the **Authentication policy** dropdown menu, select your new authentication policy, **Mandatory MFA**. Click **Save**.

1. Test the new configurations by signing into your app. If your test user doesn’t have a phone number enrolled, the user is prompted for the enrollment during the sign in. Enroll the test user, add the SMS code, and the user is signed-in to your sample app.

After your users have enrolled in the phone authenticator, future user sign-in flows require both a password and SMS code to access your app.

## Enable password recovery with email magic link

By default, the dev org is configured for a self-service password reset. Review the following steps to understand the policy configurations and to enable your sample app users to self-recover their password through an email magic link.

1. Go to **Security** > **Authenticators** and ensure that the email authenticator is available in the **Authenticators** list on the **Setup** tab, and that it's used for **Recovery**.

   1. If it isn't listed, click **Add Authenticator**, and then click **Add** in the **Email** tile.
   {style="list-style-type:lower-alpha"}
   1. Set **This authenticator can be used for** to **Recovery**, and click **Add**.

1. Go to **Security** > **Authenticators** and edit the **Password** authenticator by clicking **Actions** > **Edit**.

1. Scroll to the bottom of the **Default Policy** and edit the **Default Rule**.

1. Ensure that **Password reset** is selected for the **Users can perform self-service** section.

1. Ensure that **Email** is selected for the **Users can initiate recovery with** section.

1. Click **Not required** for the **additional verification is** question, and then click **Update rule**.

1. If you previously set the sign-on policy for your app as Mandatory MFA, go to **Applications** > **Applications** and select your app. Click the **Sign On** tab and scroll down to the **User authentication** section and click **Edit**. From the **Authentication policy** dropdown menu, select **One factor access** and click **Save**.

Test the new configurations by recovering a password for a user of your sample app:

1. Start your app. On the Sign-In Widget, click the **Forgot password?** link.

1. Add the email address for your test user.

1. Click the **Send me an email** link.

1. Check your test user's email inbox and wait for the **Account password reset** email from your Okta dev org.

   >**Note:** Stay in the same browser window as the application sign-in tab.

1. In the body of the email, click the **Reset Password** link.

1. Create and verify a new password. Click **Reset Password**. Your test user is now signed in to your sample app with a new password.

See [Self-service account recovery](https://help.okta.com/okta_help.htm?type=oie&id=ext-config-sspr).

<!-- ## Use Cases - Review these headings for future content

* Retrofitting
* Centralized login
* Utility application

## Next steps

Explain what Okta doesn't cover, for example, handling routes, authentication per route, and so on. Okta didn’t want to build our own SPA framework to show you how to do all this. Just basic sign-in. But point them to the other guides for plenty of examples of handling this.

Sign-out - App vs Okta global session
Sign-in policy
Recovery
Sign-up

Talk about session management, and what happens when the page is refreshed. (To decide: app manages the session or uses the “built-in token manager”.-->

## See also

* [Sign in to SPA](/docs/guides/sign-into-spa-redirect/angular/main/)
* [Redirect auth in the sample app](https://developer.okta.com/docs/guides/sampleapp-oie-redirectauth/angular/main/)
* [Auth JS fundamentals](/docs/guides/auth-js/main/)
* [OAuth 2.0 and OpenID Connect overview](/docs/concepts/oauth-openid/)
