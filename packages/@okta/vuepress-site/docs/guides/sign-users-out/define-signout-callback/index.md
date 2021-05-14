---
title: Define the sign-out callback
---

Signing out of Okta requires the app to open a browser and navigate to the [end session endpoint](/docs/reference/api/oidc/#logout). Okta ends the user's session and immediately redirects the user back to your application. To do this, you must define a callback route for the sign-out process, which means that you need to allow the post sign-out URL in your Okta app integration settings. If you don't specify a `post_logout_redirect_uri`, then the browser is redirected to the Okta sign-in page.

1. Sign in to your Okta organization with your administrator account.

    <a href="https://developer.okta.com/login" target="_blank" class="Button--blue">Go to Admin Console</a>

1. In the Admin Console, go to **Applications** > **Applications**.
1. Click on your app integration.
1. On the **General** tab, click **Edit** in the **General Settings** section.
1. In the **Sign-out redirect URIs** section, add the base URI of your application.

    <StackSelector snippet="addbaseuri"/>
1. Click **Save** to confirm your changes.

<NextSectionLink/>
