5. On the **General Settings** tab, enter a name for your integration and optionally upload a logo. You can also choose to hide the integration from your end user's Okta dashboard or mobile app. Click **Next**.
6. On the **Configure SAML** tab, configure the following integration settings using the SAML information that you gathered when you built your integration:

    * **Single sign on URL** field - Enter the Assertion Consumer Service (ACS) URL.

    * **Audience URI (SP Entity ID)** field - Enter the unique identifier for your app.

        > **Note:** If you're just testing your setup using a sample SAML SP (such as a sample SAML Service Provider on GitHub), enter the following test URL into the **Single sign on URL** and **Audience URI (SP Entity ID)** fields:

        ```
        http://example.com/saml/sso/example-okta-com
        ```

    * Choose the **Name ID format** and **Application username** that must be sent to your app in the SAML response (for example, `EmailAddress` and `Email`) or leave the defaults.

    * **Attribute Statements (optional)** section - Enter the SAML attributes to be shared with your application. For example:

        | Name (in SAML application) | Value (in Okta profile) |
        |---|---|
        | `FirstName` | `user.firstName` |
        | `LastName` | `user.lastName` |
        | `Email` | `user.email` |

    * If your org uses groups to categorize users, fill in the **Group Attribute Statements (optional)** section to filter by group membership in your SAML assertion. For example:

        - **Name** — `groups`
        - **Filter** — `Matches regex`
        - **Value** — `.*`

    * Click < > **Preview the SAML Assertion** in section B to preview the generated SAML assertion.

    * Click **Next**.

7. On the **Feedback** tab, select how you want to position this app:

    * **Internal (Private) Apps**: Select **I'm an Okta customer adding an internal app**. You can then specify the app type or indicate if the vendor needs to be contacted.
    * **OIN-bound Apps**: If you’re an ISV, select **I'm a software vendor. I'd like to integrate my app with Okta**. This doesn’t make it public automatically. It prepares the integration for OIN submission.

8. Click **Finish**.

>**Note:** This private integration is only visible within your Okta org. To modify settings after creation, click **Edit** on the main app page. To configure your SP app, copy the **Metadata URL** from the **Sign On** tab, or click **More details** to manually copy individual URLs and certificates. To make your app publicly available later, see [Publish an OIN integration](/docs/guides/submit-app-overview/).

9. To build and finalize your implementation settings details, see: [Create SAML app integrations](https://help.okta.com/okta_help.htm?type=oie&id=ext_Apps_App_Integration_Wizard-saml).