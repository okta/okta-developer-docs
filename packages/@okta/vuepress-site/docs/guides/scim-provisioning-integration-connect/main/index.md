---
title: Connect your SCIM API service to Okta
excerpt: Use Okta to make SCIM requests to your SCIM API service by creating and configuring an Okta SCIM integration from the Admin Console.
meta:
  - name: description
    content: Use Okta to make SCIM requests to your SCIM API service by creating and configuring an Okta SCIM integration from the Admin Console.
layout: Guides
---

This guide teaches you how to configure Okta to make SCIM requests to your SCIM API service.

---

#### Learning outcomes

* Create an Okta SCIM integration.
* Configure SCIM provisioning.
* Verify user profile and attribute mappings.

#### What you need

* A SCIM API service
* An [Okta Developer Edition org](https://developer.okta.com/signup/)

---

## Getting connected

Make sure your SCIM implementation passes all the Runscope tests before integrating it with Okta. For more information on testing your SCIM implementation, see [Prepare your SCIM API service](/docs/guides/scim-provisioning-integration-prepare/main/#test-your-scim-api)

Begin by signing in to your Okta Developer Edition org. If you don't have one, sign up for an [Okta developer account](https://developer.okta.com/signup/).

1. Sign in to your [Okta org](https://developer.okta.com/login/) with your administrator account.
1. Click **Admin** in the upper-right right corner of the page.
1. Select **Applications** > **Applications**.
1. Click **Browse App Catalog**.
1. Search for either "SCIM 2.0" or "SCIM 1.1" depending on the version of SCIM supported by your server. After searching you see template applications for each of the three authentication methods used to connect to your SCIM implementation: Basic Auth, Header Auth, or OAuth Bearer Token.
1. Click **Add Integration** on the desired template application for your integration and finish adding the template application.
1. On the **General Settings** page: Set the name of your application, choose if it's hidden from general and mobile users, and choose if users' are automatically signed in from the landing page. Click **Next**.
1. Choose the sign in method for your integration on the **Sign-On Options** page. Select either SAML or SWA. For guidance on choosing the access method, see [App integrations](https://help.okta.com/okta_help.htm?id=ext_Apps_Apps). Click **Done** to create the integration.
1. Click the **Provisioning** tab, then in the main panel click **Configure API Integration**. Select the **Enable API Integration** checkbox.
  Enter the base URL for your SCIM server.
  Configure the credential options based on the previously chosen authentication method:
    - Basic Auth: Enter the the username and password for the account that handles the create, update, and deprovisioning actions of your SCIM implementation.
    - HTTP Header: Enter a bearer token for accessing your SCIM implementation.
    - OAuth: Enter the OAuth token for accessing your SCIM implementation.

    Test the credentials by clicking **Test API Credentials**, which attempts to connect to Okta. If there's an error, check the credentials entered above.

    Click **Save** to complete the API integration.
1. On the **Assignments** tab, ensure that the right users and groups in your org are assigned to the app integration. For instructions on how to assign the app integration to individual users and groups, see the [Assign app integrations](https://help.okta.com/okta_help.htm?id=ext_Apps_Apps_Page-assign) topic in the Okta product documentation.

<!-- Saving these instructions for when we switch over to the Okta App Integration Wizard
1. Click **Create App Integration** to start the Application Integration Wizard.
Select the type of integration you want to create, choosing either **SWA** or **SAML 2.0**. To decide which option is right for you, see the [Overview of Managing Apps and SSO](https://help.okta.com/okta_help.htm?id=ext_Apps_Overview_of_Managing_Apps_and_SSO) topic in the Okta product documentation. Adding SCIM provisioning to an SSO integration that uses the OpenID Connect (OIDC) sign-on mode isn't supported.

    >**Note:** A detailed description of creating SWA and SAML applications is available in the [Using the App Integration Wizard](https://help.okta.com/okta_help.htm?id=ext_Apps_App_Integration_Wizard) topic in the Okta product documentation.

1. After your integration is created, open it from the **Applications** dashboard, and click the **General** tab.
1. Click **Edit**, then scroll down to the **Provisioning** section.
  ![Add SCIM](/img/oin/admin_console-app_integration_wizard-scim_app.png "Add SCIM provisioning")
1. Select **SCIM**, then click **Save**.
1. Click the new **Provisioning** tab. The SCIM connection settings appear under **Settings** > **Integration**.
1. Click **Edit**.
1. Specify the base URL for your SCIM connector and the field name of the unique identifier for your users on your SCIM server.
1. Under **Supported provisioning actions**, choose the provisioning actions supported by your SCIM server.

    - Import New Users and Profile Updates &mdash; this option populates the **Settings** > **To Okta** page. You can specify the details of how Okta imports new users and user profile updates.
    - Push New Users &mdash; this option populates the **Settings** > **To App** page. This page contains settings for all the user information that flows from Okta into an application.
    - Push Profile Updates &mdash; this option populates the **Settings** > **To App** page. This page contains settings for all profile information that flows from Okta into an application.
    - Push Groups &mdash; this option populates the **Settings** > **To App** page. This page contains settings for all group information that flows from Okta into an application.

1. In the **Authentication Mode** section, you can choose which mode you want to use for Okta to connect to your SCIM application.

    - Basic Auth: To authenticate using Basic Auth mode, you need to provide the username and password for the account that handles the create, update, and deprovisioning actions on your SCIM server.
    - HTTP Header: To authenticate using the HTTP Header, enter a bearer token to provide authorization against your SCIM application. See [Create an API token](/docs/guides/create-an-api-token/) for instructions on how to generate a token.
    - OAuth2: To authenticate using OAuth2, you need to provide the access token and authorization endpoints for your SCIM server, along with a client ID and a client secret.
Click **Test Connector Configuration** to confirm that Okta can connect to your SCIM server.

1. Click **Save** to complete the SCIM integration setup.
-->

## SCIM integration troubleshooting

If you experience any difficulties when creating your SCIM integration in Okta, check out the system log information available in the Okta Admin Console.

1. In the Admin Console, go to **Applications** > **Applications**.
1. Select your Okta integration to open the integration settings page.
1. Click **View Logs** to open the System Log.

The system log captures all events in your developer org for the previous seven days. This information is invaluable to troubleshoot any connection or authentication issues between Okta and your application. See [System Log](https://help.okta.com/okta_help.htm?id=ext_Reports_SysLog) in the Okta product documentation.

## Configure your Okta integration

Now that you have created an integration within your Okta org, you need to configure the SCIM options for that integration. These settings tell your Okta integration how to handle provisioning between the users in your downstream SCIM app and their Okta user profiles.

On the **Provisioning** tab of your Okta integration page, there are now three options listed in the **SETTINGS** panel:

* **To App**
* **To Okta**
* **API Integration**

### To App

This page contains settings for all information that flows from Okta user profiles and through this integration downstream to your application.

Click **Edit** to make changes to the following sections.

* **Create Users**: Assigns a new account in your downstream application for each user managed by Okta. Okta doesn't create a new account if it detects that the username specified in Okta already exists in your application. The user's Okta username is assigned by default.

    In addition to the user profile, Okta sends a random password in its request to create a new user.

* **Update User Attributes**: Syncs any updates made to the profiles of users assigned to the integration and sends those changes to your downstream application. Profile changes made in your application are overwritten with their respective Okta profile values.

* **Deactivate Users**: Automatically deactivates user accounts in the downstream application when either the integration is removed from a user profile in Okta or if the Okta account is deactivated.

    Okta can also reactivate the user account in the downstream application if the integration is later reassigned to a user in Okta.

* **Exclude Username Updates**: Prevents your downstream application profile from overwriting the Okta user profile when using the [Profile Push](https://help.okta.com/okta_help.htm?id=ext_Using_Selective_Profile_Push) feature.

* **Sync Password**: Ensures that a user's application password is always the same as their Okta password, or alternatively, allows Okta to generate a unique password for the user. See [Synchronize passwords](https://help.okta.com/okta_help.htm?id=ext-password-sync-main).

* **Profile Attribute Mappings**: Edit attributes and mappings through the Profile Editor. See [Check the attributes and corresponding mappings](#check-the-attributes-and-corresponding-mappings) or [Work with profiles and attributes](https://help.okta.com/okta_help.htm?id=ext_Directory_Manage_Profile_Attributes) in the Okta product documentation.

### To Okta

This page contains settings for all information that flows from your application upstream into Okta.

Click **Edit** to make changes to the following sections.

* **General**: Schedules imports and dictates a username format for imported users. You can also define a percentage of acceptable assignments before the [import safeguards](https://help.okta.com/okta_help.htm?id=csh-eu-import-safeguard) feature is automatically triggered.

    If the Okta username is overridden due to mapping from a provisioning-enabled app, the custom mapping appears in this section.

* **User Creation & Matching**: Sets up matching rules to use when importing users from your application. Establishing matching criteria allows you to specify how an imported user is defined when creating a new user or mapping to an existing Okta user.

  * **Imported user is an exact match to Okta user if**: Sets the matching criteria to determine when an imported user matches to an existing Okta user. To consider the new imported user an exact match, each option that you select must be true. Note that if you choose the third option, the first and second choices are disabled.

  * **Allow partial matches**: Permits partial matching when the first and last name of an imported user match those of an existing Okta user, but not the username or email address.

  * **Confirm matched users**: Automates the confirmation or activation of existing users. If the option isn't selected, matches are confirmed manually.

  * **Confirm new users**: Automates the confirmation or activation of a newly imported user. If this option is selected, you can clear it during import confirmation. Note that this feature doesn't apply to users who already exist in Okta.

* **Profile & Lifecycle Sourcing**: Allows your downstream application to be a source for Okta user profiles. If enabled, your application appears in the list of profile sources on the [Profile Sources](https://help.okta.com/okta_help.htm?id=ext_Directory_Profile_Masters) page.

  * **Allow `<app>` to source Okta users**: Enables profile sourcing and determines what happens when a user is deactivated or reactivated in your application. Only the highest priority profile source for that Okta user can deactivate or suspend an Okta user. To verify the highest priority profile source, check the Profile Sources page for your integration.

  * **When a user is deactivated in the app**: Select **Do Nothing** to prevent activity in your application from controlling the user life cycle when a user is removed from your application. This option still permits profile source control of attributes and mappings.

    The other options are to deactivate or suspend the Okta user profile if the user is removed from your downstream application.

  * **When a user is reactivated in the app**: Determines if deactivated or suspended Okta user profiles that are assigned to your Okta integration should also be reactivated when they have been reactivated in your downstream application.

    >**Note** When a user is reactivated in your application, the user profile must be an exact match to the Okta profile for the reactivation to occur in Okta. If any user profile is not an exact match, then after importing the reactivated users, the user profiles appear in **Pending Activation** state.

* **Import Safeguards**: Defines the maximum percentage of users in your org that can be left unassigned while still allowing the import to proceed. App-level and org-level safeguards are enabled by default and set at 20 percent.

* **Inline hooks**: Configures custom logic to the process of importing new users into Okta from a downstream application. You can program the hooks to resolve conflicts in profile attributes and control whether imported users are treated as matches for existing users. To enable an import inline hook, see [Inline hooks](/docs/concepts/inline-hooks/).

* **Okta Attribute Mappings**: Edit attributes and mappings through the Profile Editor. See [Check the attributes and corresponding mappings](/docs/guides/scim-provisioning-integration-connect/main/#check-the-attributes-and-corresponding-mappings) or [Work with Okta user profiles and attributes](https://help.okta.com/okta_help.htm?id=ext_Directory_Manage_Profile_Attributes) in the Okta product documentation.

### API Integration

If your API authentication credentials change at any point, this panel allows you to modify any of the authentication settings needed to connect to your SCIM application.

## Check the attributes and corresponding mappings

When you add a SCIM template integration to your development org, it comes with base attributes set by default. The user schema in your SCIM application might not support all of these attributes. It is important that you go through the steps below to ensure that the integration you're submitting to Okta for review reflects the attributes supported by your application.

>**Note:** Confirm your attributes and mappings before you submit your integration for review, or your submission will be returned by the Okta OIN team with a request to update your attributes.

### Delete attributes

Before you can delete an attribute, you first need to remove the mapping for that attribute.

  1. From the Admin Console, open your SCIM integration.

  1. Go to the **Provisioning** tab. Under the **Settings** section, click **To App**.

     <div class="three-quarter border">

     ![Displays the Provisioning > To App tab.](/img/oin/scim_check-attributes-1.png)

     </div>

  1. Scroll to the **Attribute Mappings** section. Look for the attribute that you want to delete and then click the corresponding **X**.
  1. Click **OK** to confirm that you want to remove the mapping for the attribute that you selected.

        Repeat steps 3 and 4 until you remove all the mappings for the attributes that you want to delete.

  1. After removing all the mappings for the attributes that you want to delete, click **Go to Profile Editor** in the **Attribute Mappings** section.

  1. In the Profile Editor, look for the attribute that you want to delete, and click the corresponding **X**.
  1. Click **Delete Attribute** to confirm that you want to remove the attribute.

        Repeat steps 6 and 7 for all the attributes that you want to delete.

### Add attributes

1. From the Admin Console, open your SCIM integration.

1. Go to the **Provisioning** tab. Under the **Settings** section, click **To App**.

1. Scroll to the **Attribute Mappings** section. Click **Go to Profile Editor**.

1. In the Profile Editor, click **Add Attribute**.

1. Enter the information for the new attribute that you’re adding and then click **Save**.

    > **Note:** The **Scope** property determines whether the attribute that you are adding can be assigned at a group level or just per user. If you want your admins to be able to assign a value for this attribute at a group level, don't select the **User personal** checkbox.

1. After adding an attribute, you can add a mapping for that new attribute.

### Map attributes

1. From the Admin Console, open your SCIM integration.

1. Go to the **Provisioning** tab. Under the **Settings** section, click **To App**.

1. Scroll to the **Attribute Mappings** section. Look for the attribute that you want to update and click the corresponding **Edit** (pen) button.

1. In the dialog that appears, there are two dropdown fields. In the first dropdown menu, select **Map from Okta Profile**. In the second dropdown menu, choose the Okta profile attribute that you want to map the SCIM attribute from. Click **Save**.

   <div class="three-quarter border">

   ![Displays the Map Attribute dialog.](/img/oin/scim_check-attributes-14.png)

   </div>

1. Repeat steps 3 and 4 for all other SCIM attributes that you want to map (from Okta to your application).

1. After you update the mappings from Okta to your application, click **To Okta** under the **Settings** section.

1. Scroll to the **Attribute Mappings** section. Look for the attribute that you want to update and click **Edit**.

1. In the dialog that appears, there are two dropdown fields. In the first dropdown menu, select **Map from ${App Name} App Profile**. In the second dropdown menu, choose the Okta profile attribute that you want to map the SCIM attribute to. Click **Save**.

1. Repeat steps 7 and 8 for all other SCIM attributes that you want to map (from your application to Okta).

### Attribute support

You only want to include the attributes that you support in your current user schema. To ensure that the attributes are being sent properly to and from Okta:

1. When assigning a user to the SCIM integration that you added in your dev org, ensure that all expected attributes are populated for that user.

1. After the user is pushed to your SCIM application, check that all attributes are populated in your SCIM repository.

1. If your integration supports User Imports, try importing one user from your application. Check the imported user and ensure that the values for supported attributes are reflected in that imported user's account in Okta.

    1. From your Admin Console, select **Directory** > **People**. The list of Okta users for your org appears.

    1. Find the user that you imported and click the user's name.
    1. After the user account appears, click **Profile**. The Profile screen shows the user's attributes. Verify that the supported attribute values were imported properly.

        Your Profile Mapping template can always be updated in the future.

        As mentioned in the adding and deleting attributes sections, you can set whether the attribute you are adding is set per user, or for both per user and group. This is set using the Scope attribute. If you want the attribute you are adding to be set strictly  per user, you need to check the **User personal** checkbox for the Scope attribute. If you want to give admins the ability to set the attribute both per user or per group, leave this checkbox empty.

## Next steps

Now that you've successfully created a SCIM integration within Okta, the next step is to [Test your Okta SCIM integration](/docs/guides/scim-provisioning-integration-test/).