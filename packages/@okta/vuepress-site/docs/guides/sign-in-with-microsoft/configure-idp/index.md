---
title: Configure Microsoft as an Identity Provider in Okta
---

2.1. Sign in to your Okta org.

2.2. On the main page, click on the **Admin** button in the upper right.

2.3. If you use the Developer Console, hover your cursor over **Users** until the menu opens, and then click **Social & Identity Providers**. If you use the Classic UI, hover over **Security**, and then click **Identity Providers**.

2.4. On the Identity Providers page, click on **Add Identity Provider** > **Add Microsoft**.

* **Name:** We suggest using the name you would expect to see on a button, something like "Log in to Microsoft".
* **Client Id:** Paste the App ID that you got from Microsoft in step 1.3.
* **Client Secret:** Paste the App Secret that you got from Microsoft in step 1.3.
* **Scopes:** Leave set to the default.

> For more information about these as well as the Advanced Settings, see [Social Identity Provider Settings](/docs/reference/social-settings/).

2.5. Once you have completed all the fields, click on **Add Identity Provider**. You will be returned to the main "Identity Providers" page.

2.6. On the "Identity Providers" page, you should find the Microsoft Identity Provider that you just added. Once you have found the entry, copy both the "Authorize URL" and "Redirect URI" (ending in `/authorize/callback`).

<NextSectionLink/>
