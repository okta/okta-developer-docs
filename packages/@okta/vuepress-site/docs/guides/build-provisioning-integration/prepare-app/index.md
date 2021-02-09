---
title: Connect your SCIM service with a new Okta integration
---

After you have a SCIM implementation that passes all of the Runscope tests, you need to create your SCIM integration directly within Okta.

Begin by signing up for an [Okta developer account](https://developer.okta.com/signup/).

1. After you request the developer account and have received the initial email, open the link to your developer org's Admin Console.
1. Click **Applications** > **Applications** on the side navigation.
1. Click **Add Application**.
1. Search for "SCIM 2.0" or "SCIM 1.1" (your choice depends on which version your SCIM server supports). You'll see three different SCIM template applications, one for each of the three authentication methods that you can use to connect to your SCIM implementation (Basic Auth, Header Auth, or OAuth Bearer Token).
1. Click **Add** on the template you want to use and complete the add steps.
1. On the **General Settings** page, give your integration a descriptive name and specify whether you want it to be hidden from general and mobile users. Additionally, you can decide if you want to have your users automatically be logged in when they reach the landing page in their web browser. Click **Next**.
1. On the **Sign-On Options** page, you specify how your users sign in to your integration. You can select either SAML or SWA. See the [Applications topic](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Apps_Apps) in the Okta product documentation if you need guidance on which single sign-on access method to choose. Click **Done** to create the integration.
1. After the integration is created, click the **Provisioning** tab, and in the main panel, click **Configure API Integration**. Select the **Enable API Integration** check box.
  Enter the base URL for your SCIM server.
  The credential options vary depending on your choice of authentication method:
    - Basic Auth: To authenticate using Basic Auth mode, you need to provide the username and password for the account that handles the create, update, and deprovisioning actions on your SCIM implementation.
    - HTTP Header: To authenticate using HTTP Header, you need to provide a bearer token to access your SCIM implementation.
    - OAuth: To authenticate using OAuth, you need to provide the OAuth access token to access your SCIM implementation.

    Fill in this information and click **Test API Credentials** to test whether the Okta integration can connect to your SCIM API.

    Click **Save** to complete the API integration.

<!-- Saving these instructions for when we switch over to the Okta App Integration Wizard
1. Click **Add Application** to open the OIN Catalog.
1. Click **Create New App** to start the Application Integration Wizard.
Select the type of integration you want to create, choosing either **SWA** or **SAML 2.0**. To decide which option is right for you, see the [Overview of Managing Apps and SSO](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Apps_Overview_of_Managing_Apps_and_SSO) topic in the Okta product documentation. Adding SCIM provisioning to an SSO integration that uses the OpenID Connect (OIDC) sign-on mode isn't supported.

    >**Note:** A detailed description of creating SWA and SAML applications is available in the [Using the App Integration Wizard](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Apps_App_Integration_Wizard) topic in the Okta product documentation.

1. After your integration is created, open it from the **Applications** dashboard, and click the **General** tab.
1. Click **Edit**, then scroll down to the **Provisioning** section.
  ![Add SCIM](/img/oin/admin_console-app_integration_wizard-scim_app.png "Add SCIM provisioning")
1. Select **SCIM**, then click **Save**.
1. Click the new **Provisioning** tab. The SCIM connection settings appear under **Settings** > **Integration**.
1. Click **Edit**.
1. Specify the base URL for your SCIM connector and the field name of the unique identifier for your users on your SCIM server.
1. Under **Supported provisioning actions**, choose the provisioning actions supported by your SCIM server.

    - Import New Users and Profile Updates: This option populates the **Settings > To Okta** page. You can specify the details of how Okta imports new users and user profile updates.
    - Push New Users: This option populates the **Settings > To App** page, and contains settings for all the user information that flows from Okta into an application.
    - Push Profile Updates: This option populates the **Settings > To App** page, and contains settings for all profile information that flows from Okta into an application.
    - Push Groups: This option populates the Settings > To App page, and contains settings for all group information that flows from Okta into an application.

1. In the Authentication Mode section, you can choose which mode you want to use for Okta to connect to your SCIM application.

    - Basic Auth: To authenticate using Basic Auth mode, you need to provide the username and password for the account that handles the create, update, and deprovisioning actions on your SCIM server.
    - HTTP Header: To authenticate using the HTTP Header, enter a bearer token to provide authorization against your SCIM application. See [Create an API token](/docs/guides/create-an-api-token/) for instructions on how to generate a token.
    - OAuth2: To authenticate using OAuth2, you need to provide the access token and authorization endpoints for your SCIM server, along with a client ID and a client secret.
Click **Test Connector Configuration** to confirm that Okta can connect to your SCIM server.

1. Click **Save** to complete the SCIM integration setup.
-->

## Troubleshooting

If you experience any difficulties when creating your SCIM integration in Okta, check out the system log information available in the Okta Admin Console.

1. From the Admin Console for your developer org, go to **Applications > Applications**.
1. Select your Okta integration to open the integration settings page.
1. Click **View Logs** to open the System Log.

The system log captures all events in your developer org for the previous seven days. This information is invaluable to troubleshoot any connection or authentication issues between Okta and your application. See [System Log](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Reports_SysLog) in the Okta product documentation.

<NextSectionLink/>
