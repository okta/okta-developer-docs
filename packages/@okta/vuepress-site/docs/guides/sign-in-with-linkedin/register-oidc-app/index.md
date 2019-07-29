---
title: Register an OpenID Connect Application in Okta
---

4.1. Back on the Okta administrator UI, click **Applications**.

4.2. Click **Add Application**.

4.3. On the **Add Application** page, click **Create New App**.

4.4. Select the appropriate platform for your use case and enter a name for your new application.

4.5. Add one or more Redirect URIs. This is where the user is directed after they authenticate with LinkedIn.

4.6. Assign the group of your choosing (if you [set Group Assignments](/docs/reference/social-settings/) for your app) or leave the **Everyone** default.

4.7. Under **Grant type allowed**, make sure that you enable **Implicit**.

> Note: The Authorization Code grant type also works.

4.8. Click **Done** and the page for your new application appears.

4.9. In the **Client Credentials** section, copy your Client ID, which you use to complete your Authorize URL in the next step.

<NextSectionLink/>
