---
title: Create an Okta app integration
---
Before you can sign a user in, you need to create an Okta app integration that represents your mobile application.

1. Sign in to your Okta organization with your administrator account.
<a href="https://developer.okta.com/login" target="_blank" class="Button--blue">Go to Admin Console</a>

1. In the Admin Console, go to **Applications** > **Applications**.
1. Click **Create App Integration**.
1. Select **OIDC - OpenID Connect** as the **Sign-in method**.
1. Select **Native Application** as the **Application type** and click **Next**.
    > **Note:** It is important to choose the appropriate application type for apps that are public clients. Failing to do so may result in Okta API endpoints attempting to verify an app's client secret, which public clients are not designed to have, and would break the sign-in or sign-out flow.
1. Enter a name for your app integration (or leave the default value).
1. Enter your callback route for the **Sign-in redirect URIs**. This is the full redirect URI that you defined in the <GuideLink link="../define-callback/">previous step</GuideLink> (for example, `com.okta.example:/login`).
1. Enter your callback route for the **Sign-out redirect URIs**. This is the full redirect URI that you defined in the <GuideLink link="../define-callback/">previous step</GuideLink> (for example, `com.okta.example:/logout`).
1. Include a URI in the **Initiate login URI** box to have Okta initiate the sign-in flow. When Okta redirects to this endpoint (for example, `https://example:0000.com/login`), the client is triggered to send an authorize request. This URI is also used when users reset their passwords while signing in to the app. Okta redirects the user back to this URI after the password is reset so that the user can continue to sign in.

<NextSectionLink/>
