---
title: Create an Okta app integration
---
Before you can sign a user in, you need to create an Okta app integration that represents your mobile application.

1. Sign in to your Okta organization with your administrator account.
<a href="https://developer.okta.com/login" target="_blank" class="Button--blue">Go to Admin Console</a>

1. From the Admin Console side navigation, click **Applications** > **Applications**.
1. Click **Add Application** and then **Create New App**.
1. Pick **Native** as the platform and click **Create**.
    > **Note:** It is important to choose the appropriate application type for apps which are public clients. Failing to do so may result in Okta API endpoints attempting to verify an app's client secret, which public clients are not designed to have, hence breaking the sign-in or sign-out flow.
1. Enter a name for your app integration (or leave the default value).
1. Enter your callback route for the **Login redirect URI**. This is the full redirect URI that you defined in the <GuideLink link="../define-callback/">previous step</GuideLink> (for example, `com.okta.example:/login`).
1. Enter your callback route for the **Logout redirect URI**. This is the full redirect URI that you defined in the <GuideLink link="../define-callback/">previous step</GuideLink> (for example, `com.okta.example:/logout`).
1. Include a URI in the **Initiate login URI** box to have Okta initiate the sign-in flow by redirecting to this endpoint (for example, `https://example:0000.com/login`). This triggers the client to send an authorize request. This URI is also used when users reset their passwords and need to be redirected back to your app.

<NextSectionLink/>
