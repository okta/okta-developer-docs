4. Select **SAML 2.0** in the **Sign-in method** section.
1. Click **Next**.
1. On the **General Settings** tab, enter a name for your integration and optionally upload a logo. You can also choose to hide the integration from your end user's Okta dashboard or mobile app. Click **Next**.
1. On the **Configure SAML** tab, use the SAML information that you gathered in the [preparation step](#prepare-your-integration) to configure the settings of your integration. See [Create SAML app integrations](https://help.okta.com/okta_help.htm?id=ext_Apps_App_Integration_Wizard-saml) in the Okta product documentation.
    * In the **Single sign on URL** field, enter the Assertion Consumer Service (ACS) URL.
    * Enter the Audience URI into the **Audience URI (SP Entity ID)** field.
        >**Note:** If you are just testing your setup using a sample SAML SP (such as this [SAML Service Provider on GitHub](https://github.com/mcguinness/saml-sp)), enter the following test URL into the **Single sign on URL** and **Audience URI (SP Entity ID)** fields: `http://example.com/saml/sso/example-okta-com`
    * Choose the **Name ID format** and **Application username** that must be sent to your application in the SAML response (for example, `EmailAddress` and `Email`) or leave the defaults.
    * In the **Attribute Statements (optional)** section, enter the SAML attributes to be shared with your application.
      For example:
      | Name (in SAML application)         | Value (in Okta profile)              |
      | ----------------------- | ------------------------- |
      | `FirstName`             | `user.firstName`          |
      | `LastName`              | `user.lastName`           |
      | `Email`                 | `user.email`              |
    * If your org uses groups to categorize users, fill in the **Group Attribute Statements (optional)** section to filter by group membership in your SAML assertion. For example:
        * **Name** &mdash; `groups`
        * **Filter** &mdash; `Matches regex`
        * **Value** &mdash; `.*`
    * You can preview the generated SAML assertion by clicking **Preview the SAML Assertion** in Section B.
    * Click **Next**.
1. Click **Finish**.
