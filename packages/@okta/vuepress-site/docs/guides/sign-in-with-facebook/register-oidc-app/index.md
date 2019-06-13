---
title: Register an OpenID Connect Application in Okta
---

4.1. Back in the Okta administrator UI, click on **Applications**.

4.2. Click **Add Application**.

4.3. On the "Add Application" page, click **Create New App**.

4.4. Select the appropriate platform for your use case and choose a name for your new application.

4.5. Add one or more Redirect URIs. This is where the user will be directed to after they have authenticated with Facebook.

4.6. Assign the group of your choosing (if you [set Group Assignments](/docs/reference/social-settings/) for your app), or assign "Everyone".

4.7. Under "Grant type allowed", make sure "Implicit" is enabled.

4.8. Click **Done** and you will arrive on the page for your new application.

4.9. In the "Client Credentials" section, copy your "Client ID", which you will use to complete your Authorize URL in the next step.

<NextSectionLink/>
