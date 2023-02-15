#### Connector details

* **Connector**: Select the Workflows connector you want to submit.

* **Version**: Select the version of Workflows connector you want to submit.

The list of available connectors and the associated versions are based on the Workflow Connector Builder org associated with your user credential. These fields are automatically set if you submit from the Workflows Connector Builder.

#### Validation

A flow test suite is required to validate the functionality of your connector. This test suite is obtained from exporting your flows in the Workflows Connector environment. See [Export Flow](https://help.okta.com/wf/en-us/Content/Topics/Workflows/function-reference/Flows/flows_exportflow.htm) or [Export Folder](https://help.okta.com/wf/en-us/Content/Topics/Workflows/function-reference/Folders/folders_exportfolder.htm) to export more than one flow.

* Click **Download file** to download the flow test suite in this submission. This file is automatically populated from your Workflows Connector environment if you have a flow associated with your submitted connector.

* Click **Upload new file** to upload a new test flow (`.flopack` file) or a test suite that contains more than one flow (`.folder` file).

#### Documentation

* **User documentation URL**: Specify a customer connector
   configuration guide. This guide should have step-by-step instructions on how to configure the connector in your customer orgs.
   See [Workflows Connector docs](https://help.okta.com/okta_help.htm?type=wf&id=ext-connectorbuilder-deploy) or [Connector Builder submission documentation](https://help.okta.com/wf/en-us/Content/Topics/Workflows/connector-builder/third-party-submissions-prepare-docs.htm)

* **API documentation URL**: See [Connector Builder custom API card documentation](https://help.okta.com/wf/en-us/Content/Topics/Workflows/connector-builder/third-party-submissions-prepare-docs-capia.htm).