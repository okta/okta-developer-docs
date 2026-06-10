5. On the **General Settings** tab, enter a name for your integration and optionally upload a logo. You can also choose to hide the integration from your end user's Okta dashboard or mobile app. Click **Next**.
6. On the **Configure SAML** tab, configure the following integration settings using the SAML information that you gathered when you built your integration:

    * **Single sign-on URL**: Enter the Assertion Consumer Service (ACS) URL.

    * **Audience URI (SP Entity ID)**: Enter the unique identifier for your app.

        > **Note:** If you're just testing your setup using a sample SAML SP (such as a sample SAML Service Provider on GitHub), enter the following test URL into the **Single sign on URL** and **Audience URI (SP Entity ID)** fields:

        ```
        http://example.com/saml/sso/example-okta-com
        ```

    * Choose the **Name ID format** and **Application username** that is sent to your app in the SAML response (for example, `EmailAddress` and `Email`) or leave the defaults.

    * **Attribute Statements (optional)**: Enter the SAML attributes you want shared with your app. For example:

        | Name (in SAML app) | Value (in Okta profile) |
        |---|---|
        | `FirstName` | `user.firstName` |
        | `LastName` | `user.lastName` |
        | `Email` | `user.email` |

    * If your org uses groups to categorize users, fill in the **Group Attribute Statements (optional)** section to filter by group membership in your SAML assertion. For example:

        - **Name**: `groups`
        - **Filter**: `Matches regex`
        - **Value**: `.*`

    * Click **Preview the SAML Assertion** in section B to preview the generated SAML assertion.

    * Click **Next**.

7. On the **Feedback** tab, select how you want to position this app:

    * Internal app creation: If your org created the app and you don't want it publicly released, select **This is an internal app that we have created**.

    * Vendor configuration: If your app requires more SAML configuration instructions to work with Okta, select **It's required to contact the vendor to enable SAML**, and then fill in the fields to help the Okta Support team understand your setup.

8. Click **Finish**.

9. To build and finalize your implementation settings details, see: [Create SAML app integrations](https://help.okta.com/okta_help.htm?type=oie&id=ext_Apps_App_Integration_Wizard-saml).
