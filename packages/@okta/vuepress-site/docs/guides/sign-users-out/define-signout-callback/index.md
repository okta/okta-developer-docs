---
title: Define the sign-out callback
---

Signing out of Okta requires the app to open a browser and navigate to the [end session endpoint](/docs/reference/api/oidc/#logout). Okta ends the user's session and immediately redirects the user back to your application. To do this, you must define a callback route for the sign-out process, which means that you need to allow list the post sign-out URL in your Okta application settings. If you don't specify a `post_logout_redirect_uri`, then the browser is redirected to the Okta sign-in page.

Open your Okta Developer Console:

<a href="https://login.okta.com/" target="_blank" class="Button--blue">Go to Console</a>

1. Select **Applications**, and then select your application.

2. Select **General** and click **Edit**.

3. In the **Logout redirect URIs** section, add the base URI of your application.

    <StackSelector snippet="addbaseuri"/>

4. Click **Save**.

<NextSectionLink/>
