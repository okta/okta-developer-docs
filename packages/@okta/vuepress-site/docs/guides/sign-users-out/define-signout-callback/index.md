---
title: Define the sign-out callback
---
After you sign users out of your app and out of Okta, you have to redirect users to a specific location in your application. You need to whitelist the post sign-out URL in your Okta application settings. 

Open your Okta Developer Console:

<a href="https://login.okta.com/" target="_blank" class="Button--blue">Go to Console</a>

1. Select **Applications**, and then select your application.

2. Select **General** and click **Edit**.

3. In the **Logout redirect URIs** section, add the base URI of your application. 

    <StackSelector snippet="addbaseuri"/>

4. Click **Save**.

<NextSectionLink/>