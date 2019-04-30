---
title: Redirect Users After Okta Sign Out
---

After you sign users out of your app and out of Okta, you can also redirect users to a specific location after signing out. You need to whitelist the post sign-out URL in your Okta Application settings.

Open the Okta Developer Console:

<a href="https://login.okta.com/" target="_blank" class="Button--blue">Go to Console</a>

1. Select **Applications**, and then pick your application.

2. Select **General** and click **Edit**.

3. Add the post sign-out URL in the  **Logout redirect URI** field, for example, `http://localhost:3000/account/postsignout`.

4. Click **Save**.

Then, you have to modify the Okta configuration in your application to also include the **Logout redirect URI**:

<StackSelector snippet="configmid"/>

Finally, add the desired logic for the post sign-out callback:

<StackSelector snippet="postsignoutcallback"/>
