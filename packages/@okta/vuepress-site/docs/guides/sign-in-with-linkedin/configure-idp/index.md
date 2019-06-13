---
title: Configure LinkedIn as an Identity Provider in Okta
---

2.1. Sign in to your Okta org.

2.2. On the main page, hover your cursor over **Users** until the menu opens, then click on **Social & Identity Providers**.

2.3. On the Identity Providers page, click on **Add Identity Provider** > **Add LinkedIn**

* **Name:** We suggest using the name you would expect to see on a button, something like "Log in to LinkedIn".
* **Client Id:** Paste in the App ID that you got from LinkedIn in step 1.3 above.
* **Client Secret:** Paste in the App Secret that you got from LinkedIn in step 1.3 above.
* **Scopes:** Leave set to the default.

> For more information about these as well as the Advanced Settings, see [Social Identity Provider Settings](/docs/reference/social-settings/).

2.4. Once you have completed all the fields, click on **Add Identity Provider**. You will be returned to the main "Identity Providers" page.

2.5. On the "Identity Providers" page, you should find the LinkedIn Identity Provider that you just added. Once you have found the entry, copy both the "Authorize URL" and "Redirect URI" (ending in `/authorize/callback`).

<NextSectionLink/>
