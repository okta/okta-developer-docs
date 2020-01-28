---
title: Integrate your SCIM service with an Okta app
---

After you have a SCIM implementation that passes all of the Runscope tests, you need to create your SCIM integration directly within Okta.

Begin by signing up for an [Okta developer account](https://www.okta.com/integrate/signup/).

1. After you request the developer account and have received the initial email, open the link to your developer org.
1. Navigate to the Developer Console in your Okta org by clicking **Admin**.
  ![Admin Button](/img/oin/scim_end-user-ui.png "Admin Button")
1. Click **Developer Console** and then **Classic UI** to switch over to the Admin Console in your Okta org.
  ![Switch to Admin Console](/img/oin/scim_switch-ui.png "Switch to Admin UI")
1. Click **Applications** > **Applications**.
  ![Open Applications](/img/oin/scim_open-apps.png "Open Applications")
1. Click **Add Application**.
  ![Create New Application](/img/oin/scim_create-app.png "Create App button")
1. Search for "SCIM 2.0" or "SCIM 1.1" (your choice depends on which version your SCIM server supports). You'll see three different SCIM template applications, one for each of the three authentication methods that you can use to connect to your SCIM implementation (Basic Auth, Header Auth, or OAuth Bearer Token).
  ![SCIM 2.0 Template Apps](/img/oin/scim_app-templates.png "List of SCIM template apps")
  Click **Add** on the template you want to use.
1. In the **General Settings** screen, give your app a descriptive name, and specify whether you want the app to be hidden from general and mobile users. Additionally, you can decide if you want to have your users automatically be logged in when they reach the landing page in their web browser. Click **Next**.
1. In the **Sign-On Options** screen, you specify how your users sign in to your app. You can select either SAML or SWA. See the [Applications topic](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Apps_Apps) in the Okta product documentation if you need guidance on which single sign-on access method to choose. Click **Done** to create the app.
1. After the app is created, click the **Provisioning** tab, and in the main panel, click **Configure API Integration**. Select the **Enable API Integration** check box.
  ![SCIM App Enable API](/img/oin/scim_app-enable-api.png "Enable the API integration for your app")
  Enter the base URL for your SCIM server.
  The credential options vary depending on your choice of authentication method for the app:
    - Basic Auth: To authenticate using Basic Auth mode, you need to provide the username and password for the account that handles the create, update, and deprovisioning actions on your SCIM implementation.
    - HTTP Header: To authenticate using HTTP Header, you need to provide a bearer token to access your SCIM implementation.
    - OAuth: To authenticate using OAuth, you need to provide the OAuth access token to access your SCIM implementation.

    Fill in this information and click **Test API Credentials** to test whether the Okta app can connect to your SCIM API.

    Click **Save** to complete the API integration.

<!-- Saving these instructions for when we switch over to the Okta App Integration Wizard
1. Click **Add Application** to open the OIN App Catalog.
1. Click **Create New App** to start the Application Integration Wizard.
Select the type of app you want to create, choosing either **SWA** or **SAML 2.0**. To decide which option is right for you, see the [Overview of Managing Apps and SSO](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Apps_Overview_of_Managing_Apps_and_SSO) topic in the Okta product documentation. Adding SCIM provisioning to an app that uses the OpenID Connect (OIDC) sign-on mode isn't supported.

    >**Note:** A detailed description of creating SWA and SAML applications is available in the [Using the App Integration Wizard](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Apps_App_Integration_Wizard) topic in the Okta product documentation.

1. After your app is created, open it from the **Applications** dashboard, and click the **General** tab.
1. Click **Edit**, then scroll down to the **Provisioning** section.
  ![Add SCIM](/img/oin/admin_console-app_integration_wizard-scim_app.png "Add SCIM provisioning")
1. Select **SCIM**, then click **Save**.
1. Click the new **Provisioning** tab. The SCIM connection settings appear under **Settings** > **Integration**.
1. Click **Edit**.
1. Specify the base URL for your SCIM connector and the field name of the unique identifier for your users on your SCIM server.
1. Under **Supported provisioning actions**, choose the provisioning actions supported by your SCIM server.

    - Import New Users and Profile Updates: This option populates the **Settings > To Okta** page. You can specify the details of how Okta imports new users and user profile updates.
    - Push New Users: This option populates the **Settings > To App** page, and contains settings for all the user information that flows from Okta into an app.
    - Push Profile Updates: This option populates the **Settings > To App** page, and contains settings for all profile information that flows from Okta into an app.
    - Push Groups: This option populates the Settings > To App page, and contains settings for all group information that flows from Okta into an app.

1. In the Authentication Mode section, you can choose which mode you want to use for Okta to connect to your SCIM app.

    - Basic Auth: To authenticate using Basic Auth mode, you need to provide the username and password for the account that handles the create, update, and deprovisioning actions on your SCIM server.
    - HTTP Header: To authenticate using HTTP Header, you need to provide a bearer token that will provide authorization against your SCIM app. See [Create an API token](/docs/guides/create-an-api-token/) for instructions on how to generate a token.
    - OAuth2: To authenticate using OAuth2, you need to provide the access token and authorization endpoints for your SCIM server, along with a client ID and a client secret.
Click **Test Connector Configuration** to confirm that Okta can connect to your SCIM server.

1. Click **Save** to complete the SCIM app setup.
-->

<NextSectionLink/>
