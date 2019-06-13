---
title: Create a Client Application at the IdP
---

Create a client application that you want to use for authenticating and authorizing your users.

> Note: These steps cover the Okta org to Okta org scenario. When configuring another generic OIDC IdP, refer to the IdP's documentation to configure a client application.

1. At the Okta org that represents the IdP, select **Applications** and then click **Add Application**.
2. You need a trusted client, so select **Web** as the platform. OpenID Connect is the sign-in method by default.
3. Click **Next**.
4. Enter a name for your application.
5. Leave the default for **Login Redirect URI** for now. We will come back and update that after the next section.
6. Assign a group or leave the **Everyone** default. Be sure to verify that the users you want to have access are assigned to the group that you select.
7. Click **Done**.
8. Copy the **Client ID** and **Client Secret** from the **Client Credentials** section and paste in to a text editor. You need these when you configure this IdP in your org.

<NextSectionLink/>
