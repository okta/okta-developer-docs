4. Select **SAML 2.0** in the **Sign-in method** section.
1. Click **Next**.
1. On the **General Settings** tab, enter a name for your integration and optionally upload a logo. You can also choose to hide the integration from your end user's Okta dashboard or mobile app. Click **Next**.
1. On the **Configure SAML** tab, use the SAML information that you gathered when you built your integration. See [Create SAML app integrations](https://help.okta.com/okta_help.htm?id=ext_Apps_App_Integration_Wizard-saml) in the Okta product documentation.
    * In the **Single sign on URL** field, enter the Assertion Consumer Service (ACS) URL.
    * Enter the Audience URI into the **Audience URI (SP Entity ID)** field.
        >**Note:** If you're just testing your setup using a sample SAML SP (such as this [SAML Service Provider on GitHub](https://github.com/mcguinness/saml-sp)), enter the following test URL into the **Single sign on URL** and **Audience URI (SP Entity ID)** fields: `http://example.com/saml/sso/example-okta-com`
    * Choose the **Name ID format** and **Application username** that must be sent to your application in the SAML response (for example, `EmailAddress` and `Email`) or leave the defaults.
    * In the **Attribute Statements (optional)** section, enter the SAML attributes to be shared with your application.
      For example:
      | Name (in SAML application) | Value (in Okta profile) |
      | ----------------------- | ------------------------- |
      | `FirstName`             | `user.firstName`          |
      | `LastName`              | `user.lastName`           |
      | `Email`                 | `user.email`              |
    * If your org uses groups to categorize users, fill in the **Group Attribute Statements (optional)** section to filter by group membership in your SAML assertion. For example:
        * **Name** &mdash; `groups`
        * **Filter** &mdash; `Matches regex`
        * **Value** &mdash; `.*`
    * Click **< > Preview the SAML Assertion** in section B to preview the generated SAML assertion.
    * Click **Next**.
1. In the final creation step, the **Feedback** tab helps Okta to understand how you want to position this application.
    * If you're only creating an internal (private) SAML integration:
        1. Select **I'm an Okta customer adding an internal app**. More checkboxes and fields appear.
           * Select the **App type** if you don't want the integration released publicly. If you select this box, you don't need to enter any further information.
           * Select the **Contact app vendor** checkbox if Okta needs to contact you to enable SAML for the integration. If you select this checkbox, you need to provide further general information about your integration to the Okta OIN team.
        1. Click **Finish**.
    * If you're an independent software vendor (ISV) and plan to add the SAML integration to the OIN:
        1. Select **I'm a software vendor. I'd like to integrate my app with Okta**.
        1. Click **Finish**.
        > **Note:** Selecting this option doesn't automatically make your integration available in the [OIN](https://www.okta.com/integrations/). After you test your integration, [submit it](/docs/guides/submit-oin-app/saml2/main/) to the OIN team for verification and publication. See the OIN [submission process](/docs/guides/submit-app-overview/#submission-process) overview.
1. Click **Finish**.
