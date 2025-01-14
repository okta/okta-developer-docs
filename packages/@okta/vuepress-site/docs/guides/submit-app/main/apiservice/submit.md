To submit an API service integration, click the **API Service** tab and select **On** from the **API Service support** dropdown menu.

#### API Service Settings

The **Client Credentials** grant type is selected. This is the only supported grant type for OAuth 2.0 API service integrations.

* **Enable scopes**: Enter the Okta API scope to grant access from your integration. See [Scope selection](/docs/guides/build-api-integration/main/#scope-selection).

    Click **+ Add Another** to add more than three scopes.

* **Link to configuraton guide**: Specify the URL to the configuration document for your integration. See [Customer configuration document guidelines](/docs/guides/submit-app-prereq/main/#customer-configuration-document-guidelines).

### Test your integration

You can test your API service integration in the OIN Manager before you submit it. You can generate an instance of your service app and make a few API requests in the OIN Manager to verify that your integration works as intended.

#### Generate an instance

Generate a service app instance in your associated Okta Developer Edition org for testing. The app instance you generate provides credentials for your API calls:

1. From the **API Service** tab, click **Test in Okta** at the bottom of your page.

   Your browser redirects to the Authorize integration page in your Okta org.

1. From the Authorize integration page, click **Install and Authorize**.
1. Copy the client secret from the dialog and securely store it for your integration test.
1. Click **Done** to dismiss the dialog.
1. On the integration details page, copy the Okta domain and client ID and securely store them for your integration test.

Use the credentials from your app instance (Okta domain, client ID, and secret) to test your service app integration with Okta. You can use the [interface that you build](/docs/guides/build-api-integration/main/#save-customer-credentials) or enter the credentials manually to configure your service app. Trigger a process from your service app to access Okta endpoints and verify that the process works as intended.

See
1. [Request an access token](/docs/guides/build-api-integration/main/#request-an-access-token)
1. [Make Okta API requests](/docs/guides/build-api-integration/main/#make-okta-api-requests)

---