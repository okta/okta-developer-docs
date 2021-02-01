---
title: Configure your Okta integration
---

Now that you have created an integration within your Okta org, you need to configure the SCIM options for that integration. These settings tell your Okta integration how to handle provisioning between the users in your downstream SCIM app and their Okta user profiles.

On the **Provisioning** tab of your Okta integration page, there are now three options listed in the **SETTINGS** panel:

* **To App**
* **To Okta**
* **API Integration**

## To App

This page contains settings for all information that flows from Okta user profiles and through this integration downstream to your application.

Click **Edit** to make changes to the following sections.

* **Create Users** &mdash; Assigns a new account in your downstream application for each user managed by Okta. Okta doesn't create a new account if it detects that the username specified in Okta already exists in your application. The user's Okta username is assigned by default.

    In addition to the user profile, Okta sends a random password in its request to create a new user.

* **Update User Attributes** &mdash; Syncs any updates made to the profiles of users assigned to the integration and sends those changes to your downstream application. Profile changes made in your application are overwritten with their respective Okta profile values.

* **Deactivate Users** &mdash; Automatically deactivates user accounts in the downstream application when either the integration is removed from a user profile in Okta or if the Okta account is deactivated.

    Okta can also reactivate the user account in the downstream application if the integration is later reassigned to a user in Okta.

* **Exclude Username Updates** &mdash; Prevents your downstream application profile from overwriting the Okta user profile when using the [Selective Profile Push](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Using_Selective_Profile_Push) feature.

* **Sync Password** &mdash; Ensures that a user's application password is always the same as their Okta password or, alternatively, allows Okta to generate a unique password for the user. See [Synchronize passwords](https://help.okta.com/en/prod/okta_help_CSH.htm#ext-password-sync-main) .

* **Profile Attribute Mappings** &mdash; Edit attributes and mappings through the Profile Editor. See the <GuideLink link="../attribute-mapping/">Attributes and mappings</GuideLink> section in this guide or [Work with Okta user profiles and attributes](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Directory_Manage_Profile_Attributes) in the Okta product documentation.

## To Okta

This page contains settings for all information that flows from your application upstream into Okta.

Click **Edit** to make changes to the following sections.

* **General** &mdash; Schedules imports and dictates a username format for imported users. You can also define a percentage of acceptable assignments before the [import safeguards](https://help.okta.com/en/prod/okta_help_CSH.htm#csh-eu-import-safeguard) feature is automatically triggered.

    If the Okta username is overridden due to mapping from a provisioning-enabled app, the custom mapping appears in this section.

* **User Creation & Matching** &mdash; Sets up matching rules to use when importing users from your application. Establishing matching criteria allows you to specify how an imported user is defined when creating a new user or mapping to an existing Okta user.

  * **Imported user is an exact match to Okta user if** &mdash; Sets the matching criteria to determine when an imported user matches to an existing Okta user. For the new imported user to be considered an exact match, each option that you select must be true. Note that if you choose the third option, the first and second choices are disabled.

  * **Allow partial matches** &mdash; Permits partial matching when the first and last name of an imported user match those of an existing Okta user, but not the username or email address.

  * **Confirm matched users** &mdash; Automates the confirmation or activation of existing users. If the option isn't selected, matches are confirmed manually.

  * **Confirm new users** &mdash; Automates the confirmation or activation of a newly imported user. If this option is selected, you can clear it during import confirmation. Note that this feature doesn't apply to users who already exist in Okta.

* **Profile & Lifecycle Sourcing** &mdash; Allows your downstream application to be a source for Okta user profiles. If enabled, your application appears in the list of profile sources on the [Profile Sources](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Directory_Profile_Sources) page.

  * **Allow `<app>` to source Okta users** &mdash; Enables profile sourcing and determines what happens when a user is deactivated or reactivated in your application. Only the highest priority profile source for that Okta user can deactivate or suspend an Okta user. To verify the highest priority profile source, check the Profile Sources page for your integration.

  * **When a user is deactivated in the app** &mdash; Select **Do Nothing** to prevent activity in your application from controlling the user life cycle when a user is removed from your application. This option still permits profile source control of attributes and mappings.

    The other options are to deactivate or suspend the Okta user profile if the user is removed from your downstream application.

  * **When a user is reactivated in the app** &mdash; Determines if deactivated or suspended Okta user profiles that are assigned to your Okta integration should also be reactivated when they have been reactivated in your downstream application.

    >**Note** When a user is reactivated in your application, the user profile must be an exact match to the Okta profile for the reactivation to occur in Okta. If any user profile is not an exact match, then after importing the reactivated users, the user profiles appear in **Pending Activation** state.

* **Import Safeguards** &mdash; Defines the maximum percentage of users in your org that can be left unassigned while still allowing the import to proceed. App-level and org-level safeguards are enabled by default and set at 20 percent.

* **Inline Hooks** &mdash; Configures custom logic to the process of importing new users into Okta from a downstream application. You can program the hooks to resolve conflicts in profile attributes and control whether imported users are treated as matches for existing users. To enable an import inline hook, see [Inline hooks](/docs/concepts/inline-hooks/).

* **Okta Attribute Mappings** &mdash; Edit attributes and mappings through the Profile Editor. See the <GuideLink link="../attribute-mapping/">Attributes and mappings</GuideLink> section in this guide or [Work with Okta user profiles and attributes](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Directory_Manage_Profile_Attributes) in the Okta product documentation.

## API Integration

If your API authentication credentials change at any point, this panel allows you to modify any of the authentication settings needed to connect to your SCIM application.

<NextSectionLink/>
