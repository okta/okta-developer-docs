---
title: Redirect Users After Okta Sign Out
---

When you follow the Okta Sign Out approach, you can also redirect users to a specific location after sign out. You need to whitelist the post signing out URL in your Okta Application settings.

Open your Okta Developer Console:

<a href="https://login.okta.com/" target="_blank" class="Button--blue">Go to Console</a>

1. Select **Applications**, then pick your application.

2. Select **General** tab and click **Edit**.

3. Add your post signing out URL in the  **Logout redirect URI** section, such as `http://localhost:3000/account/postsignout`.

4. Click **Save**.

Then, you have to modify the Okta configuration in your application to also include the **Logout redirect URI**:

<StackSelector snippet="configmid"/>

Finally, add the desired logic for the post sign out callback:

<StackSelector snippet="postsignoutcallback"/>
