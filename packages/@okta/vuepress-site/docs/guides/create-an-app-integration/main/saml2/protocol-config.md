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