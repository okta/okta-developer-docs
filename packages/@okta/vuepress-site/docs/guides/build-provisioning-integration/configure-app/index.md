---
title: Configure your Okta integration
---

Now that you have created a integration within your Okta org, you need to configure the SCIM options for that integration. These settings tell Okta how to handle provisioning between the users in your SCIM app and their Okta user profiles.

On the **Provisioning** tab of your Okta integration page, there are now three options listed in the **SETTINGS** panel:

* **To App**
* **To Okta**
* **API Integration**

## To App

This screen contains settings for all information that flows from Okta user profiles and through this integration downstream to your application.

Click **Edit** to make changes to the following sections.

* **Create Users** &mdash; Assigns a new application account to each user managed by Okta. Okta doesn't create a new account if it detects that the username specified in Okta already exists in your application. The user's Okta username is assigned by default.

    In addition to the user profile, Okta sends a random password in its request to create a new user.

* **Update User Attributes** &mdash; Updates the profiles of users assigned to the integration and syncs those changes to your downstream application. Profile changes made in your application are overwritten with their respective Okta profile values.

* **Deactivate Users** &mdash; Automatically deactivates user accounts when they are unassigned in Okta or their Okta accounts are deactivated.

    Okta can also reactivate the application account if the integration is later reassigned to a user in Okta.

* **Exclude Username Updates** &mdash; Prevents your downstream application profile from overwriting the Okta user profile when using the profile push feature.

* **Sync Password** &mdash; Ensures a user's application password is always the same as their Okta passwords or, alternatively, allows Okta to generate a unique password for the user. See [Synchronize passwords](https://help.okta.com/en/prod/okta_help_CSH.htm#ext-password-sync-main) .

* **Profile Attribute Mappings** &mdash; Use this portion of the page to edit attributes and mappings in the Profile Editor. See  the [attributes and mappings](/docs/guides/build-provisioning-integration/attribute-mapping/) section or [Work with Okta user profiles and attributes](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Directory_Manage_Profile_Attributes) in the Okta product documentation.

## To Okta

This screen contains settings for all information that flows from your application upstream into Okta.

Click **Edit** to make changes to the following sections.

* **General** &mdash; Use this section to schedule imports and dictate a username format for imported users. You can also define a percentage of acceptable assignments before the [import safeguards](https://help.okta.com/en/prod/okta_help_CSH.htm#csh-eu-import-safeguard) feature is automatically triggered.

    If the Okta username is overridden due to mapping from a provisioning-enabled app, the custom mapping appears in this section.

* **User Creation & Matching** &mdash; Matching rules are used when importing users from all applications and directories that allow importing. Establishing matching criteria allows you to specify how an imported user should be defined as a new user or mapped to an existing Okta user.

  * **Imported user is an exact match to Okta user if** &mdash; The matching criteria that establishes whether an imported user exactly matches an existing Okta user. Choose any combination from the list of options to establish your criteria. For the new imported user to be considered an exact match, each option that you select must be true. Note that if you choose the third option, the first and second choices are disabled.

  * **Allow partial matches** &mdash; Partial matching occurs when the first and last name of an imported user match those of an existing Okta user, but the username or email address do not.

  * **Confirm matched users** &mdash; Select to automate the confirmation or activation of existing users. If the option isn't selected, matches are confirmed manually.

  * **Confirm new users** &mdash; Select to automate the confirmation or activation of a newly imported user. If this option is selected, you can clear it during import confirmation. Note that this feature doesn't apply for users who already exist in Okta.

* **Profile & Lifecycle Mastering** &mdash; Use this section to allow the current application to profile master Okta users. If enabled, the application appears in the list of profile masters on the Profile mastering page.

  * **Allow `<app>` to master Okta users** &mdash; Enable mastery and determine what happens when a user is deactivated or reactivated in an application. Only the highest priority profile master for that Okta user can deactivate or suspend an Okta user. To verify the highest priority profile master, review the Profile mastering page.

  * **When a user is deactivated in the app** &mdash; Select **Do Nothing** to prevent activity in the application from controlling the user life cycle. This still allows profile master control of attributes and mappings. Otherwise, you can choose between deactivating or suspending the user.

  * **When a user is reactivated in the app** &mdash; Decide if suspended or deactivated Okta users should be reactivated when they have been reactivated in the application.

    >**Note** When a user is reactivated in the app, the user profile must be an exact match to the Okta profile for the reactivation to also occur in Okta. Otherwise, after importing the reactivated users, they appear in **Pending Activation** state.

* **Import Safeguards** &mdash; The import safeguard settings define the maximum percentage of application users in an org that can be unassigned while still allowing the import to proceed. App-level and org-level safeguards are enabled by default and set at 20 percent.

* **Inline Hooks** &mdash; Use this section to add custom logic to the process of importing new users into Okta from an app. You can resolve conflicts in profile attributes and control whether imported users are treated as matches for existing users. To enable an import inline hook, see [Inline hooks](/docs/concepts/inline-hooks/).

* **Okta Attribute Mappings** &mdash; Use this portion of the page to edit attributes and mappings in the Manage user profiles.

## API Integration

If your API authentication credentials change at any point, this panel allows you to modify any of the authentication settings needed to connect to your SCIM application.

<NextSectionLink/>
