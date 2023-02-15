Submit a specific Workflows connector version from your Workflows Connector Builder environment in your org.

#### Connector details

* **Connector**: Select the Workflows connector you want to submit.

* **Version**: Select the version of Workflows connector you want to submit.

The list of available connectors and the associated versions are based on the Workflows Connector Builder environment from the org associated with your user credential. These fields are automatically populated if you submit from the Workflows Connector Builder.

#### Validation

A flow test suite is required to validate the functionality of your connector. This test suite is obtained from exporting your flows in the Workflows environment. See [Export Folder](https://help.okta.com/wf/en-us/Content/Topics/Workflows/function-reference/Folders/folders_exportfolder.htm).

* Click **Download file** to download the flows test suite in this submission. This file is automatically populated from your Workflows Connector environment if you have flows associated with your submitted connector.

* Click **Upload new file** to upload new flows from a test suite (`.folder` file).

#### Documentation

* **User documentation URL**: Specify a publicly accessible URL to your customer connector configuration guide. This guide needs to have step-by-step instructions on how to use and configure your connector in the customer orgs. See [Connector Builder submission documentation](https://help.okta.com/wf/en-us/Content/Topics/Workflows/connector-builder/third-party-submissions-prepare-docs.htm).

* **API documentation URL**: Specify a publicly accessible URL to the API reference that is used to develop your connector. For example: [`https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentitySource/`](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentitySource/)