1. Specify the following properties if you want to integrate to API service:

    > **Note:**
    > * The **Authentication properties** and **API service integration properties** section only displays when you select **API service** from the **Add integration capabilities** section.

    | Property | Description |
    | --- | --- |
    | Authentication properties | |
    | Client authentication | |
    | Client secret | This is a confidential unique string used to prove your app’s identity during a secure exchange. Selecting this option generates a unique secret key for your app instance upon installation. Currently only client-secret authentication is supported for API service integration. |
    | API service integration properties | |
    | Scope | Scopes define the specific levels of access your app requires for the customer’s Okta organization. You can manually select the **scopes** from the provided list of [Okta OAuth 2.0 scopes](https://developer.okta.com/docs/api/oauth2/). You can also filter the selected and available scopes. |
    | Tell us the reason to use scopes | Enter a quick note on how you use these scopes. |
    | *Link to configuration guide | Specify the URL link to your customer-facing instructions on how to use API service integrations. See [Customer configuration document guidelines](/docs/guides/submit-app-prereq/main/#customer-configuration-document-guidelines). |

    `*` Required properties

1. Click **Start testing** to save your edits and move to the testing section, where you need to enter your integration test details.