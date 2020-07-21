### Create a SAML integration

7. Select **SAML 2.0** in the **Sign on method** section.
1. Click **Create**.
1. On the **General Settings** tab, enter a name for your integration and optionally upload a logo. You can also hide the integration from your end-user's Okta dashboard or mobile app.
1. On the **Configure SAML** tab, use the SAML information that you gathered in the <GuideLink link="../before-you-begin">first step</GuideLink> to configure the settings of your integration. See [Create a SAML integration using AIW](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Apps_App_Integration_Wizard-saml) in the Okta product documentation.
    * In the **Single sign on URL** field, enter the Assertion Consumer Service (ACS) URL.
    * Enter the Audience URI into the **Audience URI (SP Entity ID)** field.  
        >**Note:** If you are just testing your setup using a sample SAML SP (such as this [SAML Service Provider on GitHub](https://github.com/mcguinness/saml-sp)), enter the following test URL into the **Single sign on URL** and **Audience URI (SP Entity ID)** fields: `http://example.com/saml/sso/example-okta-com`
    * Choose the **Name ID format** and **Application username** that must be sent to your application in the SAML response (for example, `EmailAddress` and `Email`) or leave the defaults.
    * In the **ATTRIBUTE STATEMENTS (OPTIONAL)** section, enter the SAML attributes to be shared with your application.
      For example:
      | Name (in SAML application)         | Value (in Okta profile)              |
      | ----------------------- | ------------------------- |
      | `FirstName`             | `user.firstName`          |
      | `LastName`              | `user.lastName`           |
      | `Email`                 | `user.email`              |
    * If your org uses groups to categorize users, fill in the **GROUP ATTRIBUTE STATEMENTS (OPTIONAL)** section to filter by group membership in your SAML assertion. For example:
        * **Name** &mdash; `groups`
        * **Filter** &mdash; `Matches regex`
        * **Value** &mdash; `.*`
    * You can preview the generated SAML assertion by clicking the button in Section B.
    * Click **Next**.
1. In the final creation step, the **Feedback** tab helps Okta to understand how you want to position this application.
    * If you are only creating an internal SAML integration:
        1. Select **I'm an Okta customer adding an internal app**.
        1. For the check boxes that appear, select the **App type** check box if your company created the integration and it won't be released publicly. If you check this box, you don't need to enter any further information.
        1. Select the **Contact app vendor** check box if Okta needs to contact you to enable SAML for the integration. If you select this check box, you need to provide further general information about your integration to the Okta OIN team.
        1. Click **Finish**.
    * For ISVs that are creating a SAML integration for the OIN:
        1. Select **I'm a software vendor. I'd like to integrate my app with Okta**.
        1. Click **Finish**.
