To submit a specific Workflows connector version from your Workflows Connector Builder environment, click the **Connector** tab and select **On** from the **Connector Support** dropdown menu.

#### Connector details

* **Connector**: Select the Workflows connector you want to submit.

* **Version**: Select the version of Workflows connector you want to submit.

The list of available connectors and the associated versions are based on the Workflows Connector Builder environment from the org associated with your user credentials.

#### Validation

A flow test suite is required to validate the functionality of your connector. This test suite is obtained by exporting your test flows from the Workflows environment. See [Connector Builder submission testing](https://help.okta.com/okta_help.htm?type=wf&id=ext-third-party-test) and [Export Folder](https://help.okta.com/okta_help.htm?type=wf&id=ext-utility-method-exportgroup).

* Click **Upload file** to upload a flows test suite file (accepts `.folder` or `.flopack` file).

* Click **Download file** to download the flows test suite or **Upload new file** to replace the existing flows test suite in this submission.

#### Documentation

* **User documentation URL**: Specify a publicly accessible URL to your customer connector configuration guide. This guide needs to have step-by-step instructions on how to use and configure your connector in the customer orgs. See [Connector Builder submission documentation](https://help.okta.com/okta_help.htm?type=wf&id=ext-third-party-docs).

* **API documentation URL**: Specify a publicly accessible URL for the API reference that is used to develop your connector. For example: [`https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentitySource/`](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentitySource/)