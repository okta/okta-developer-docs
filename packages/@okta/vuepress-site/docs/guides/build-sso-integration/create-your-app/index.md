---
title: Create your integration
---

After you have your background information, you can use the Okta Admin Console and the Application Integration Wizard (AIW) to create your SSO integration inside the Okta org associated with your developer account.

If you don't have an Okta developer account, begin by signing up for one at <https://developer.okta.com/signup/>.

1. After you request the developer account and have received the initialization email, click the link in the email to go to your developer org. Sign in as a user with administrative privileges.
1. Navigate to the Admin Console in your Okta org by clicking **Admin** in the upper-right corner.

   >**Note:** If you are in the Developer Console, click **< > Developer Console** in the upper-left corner and then click **Classic UI** to switch over to the Admin Console in your Okta org.
  ![Switch to Admin Console](/img/oin/scim_switch-ui.png "Switch to Admin UI")

3. In the Admin Console, go to  **Applications** > **Applications**.
<!--  ![Open Applications](/img/oin/scim_open-apps.png "Open Applications") -->
1. Click **Add Application**.
<!--  ![Create Application](/img/oin/scim_create-app.png "Add Application button") -->
1. Click **Create New App** to start the Application Integration Wizard.
<!--   ![Create New Application](/img/oin/scim_create-app-new.png "Create Application button") -->
1. Choose either **Web** or **SPA** as the platform for your integration. Web is the only supported platform for both OIDC and SAML 2.0 applications in the OIN. SPA is supported for OIDC apps only.

    If you are creating an OIDC integration that is intended for private use only, you can select Native or Single Page App as the platform.

<StackSelector snippet="create" />

<NextSectionLink/>
