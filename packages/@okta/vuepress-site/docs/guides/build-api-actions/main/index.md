---
title: Build an integration with API Integration Actions
excerpt: Learn how to build an integration with API Integration Actions in the Workflows Integration Builder.
layout: Guides
---

Build and validate integrations with API Integration Actions from the Okta Integration Network (OIN) Wizard and Integration Builder.

---

#### What you need

* [Okta Integrator Free Plan org](https://developer.okta.com/signup)
* An API resource server that serves requests for provisioning, entitlement management, or Universal Logout for your app
* (Optional) OpenAPI Specification (OAS) version 3.0 or later of your APIs, in either JSON or YAML format
* An integration submission that's initiated through the OIN Wizard

---

## Overview

You can build integrations with API Integration Actions, which Okta calls to perform API actions against your app, such as fetching or updating user profiles, or initiating a risk-based logout. API actions to your app are built through the low-code Workflows Integration Builder, which is available in Okta Integrator Free Plan orgs.

To begin building API actions in the Integration Builder, you must first start your integration submission within the OIN Wizard. This process ensures a seamless build-and-submit experience, as the Integration Builder is designed to integrate directly with the OIN Wizard.

The following capabilities are supported for API Integration Actions:

* Provisioning
* Entitlement Management
* Universal Logout (your integration must also support SSO)

> **Note**: For the end-to-end API integration actions build and submit process, see the [API Integration Actions process overview](/docs/guides/oin-api-actions/#process-overview).

## Integration Builder project

After specifying your integration capabilities and details in the OIN Wizard, you're directed to the Integration Builder to build your API actions integration.

Your integration details from the OIN Wizard are transferred to a corresponding Integration Builder project, which is highlighted in the Integration Builder project panel (the left panel). Perform these steps to build your Integration Builder project:

1. Review the [**General**](#general) tab and make any necessary edits.
1. If you have an OpenAPI specification of the APIs that you want to integrate with, go to the **API Spec** tab and [upload the OpenAPI schema](#upload-api-spec). This saves you time from configuring authentication and core flows manually.
1. [Configure your authentication](#authentication-configuration) and variable mappings in the **Authentication** tab.
1. [Add actions](#add-actions) from the **New Component** dropdown list.
1. Add [test flows](#test-flows) to test your actions' use cases.
1. Validate all your actions and test flows before you return to the OIN Wizard to complete your submission.

### General

You don't have to edit anything in the **General** tab because your Integration Builder project is linked to your integration in the OIN Wizard. The following details are transferred from the OIN Wizard:

* **Project name**: Your project name, which corresponds to the integration display name for the OIN catalog
* **Last Updated**: The last time that your integration was updated
* **Status**: The status of your integration submission (typically in `DRAFT` state)
* **Protocol**: Always set to `Build with no-code integration builder`

Available options:

* **View in OIN Wizard**: Click **View in OIN Wizard** to return to the OIN Wizard
* **Unlinik app**: Click **Unlink app** to disconnect the Integration Builder project from the integration in the OIN Wizard. If you unlink the project, tenant variables from the OIN Wizard aren't available for your authentication and action configurations.
* **Link an OIN app**: If your project isn't linked to an integration in the OIN Wizard, click **Link an OIN app** to connect your project to an integration from the OIN Wizard. Integration details are then transferred to your project.

> **Note**: If you modify the project name, description, or logo, the updates are only visible in the Integration Builder project folder. The corresponding integration in the OIN Wizard doesn't reflect the changes you made in the **General** tab.

## Upload API spec

If you have an OpenAPI specification for the API resource that you want to integrate with, you can upload it to your project to save configuration time. You can generate authentication configurations and action flows from your API specification instead of configuring them manually. This step is optional and isn't required to complete your integration project.

> **Note**: Integration Builder only supports OAS version 3.0 or later. You can upload a YAML or JSON-formatted schema file.

1. Click the **API Spec** tab from the Integration Builder project.
1. Click **Upload spec**.
1. Add your API specification file and click **Process file**.

After you upload your API specification, the **Core flows** section appears with three flow types for you to generate. If your schema file contains authentication schemas, the **Authentication configuration** section appears for you to generate authentication configurations.

> **Note**: You can replace your uploaded API specification file with an updated version if the API changes.

### Generate authentication configuration

The **Authentication configuration** section appears if your API specification contains authentication schemas.

1. Click **Generate** from the **API Spec** > **Authentication configuration** section.
1. Select the authentication schemes from the API specification that you want to configure.
1. Click **Generate**.

The generated authentication configurations appear in your project's **Authentication** tab.

### Generate core flows

The **Generate flow** option is enabled for the flow types specified in your API. The **HTTP Helper** flow type is initially enabled so you can generate helper flows.

1. From the **API Spec** > **Core flows** section, click **Generate flow** next to the available flow type.
1. Click **Generate flow** in the **Generate core flow** type dialog.
1. Click **Generate**.

After the HTTP Helper flows are available, you can generate the **Authping** and **Custom API Action** flows. These flow types require the HTTP helper flows.

## Authentication configuration

Configure the connection to your app by setting up the authentication scheme and credential mappings.

> **Note:** These instructions aren't required if you've generated authentication configurations from your API specification.

1. Click **+ Add authentication** from the **Authentication** tab.
1. Select the authentication scheme from the **Auth Type** dropdown, then configure the required fields.

   The following authentication schemes are supported in Integration Builder:

   * **Basic**: Basic authentication

        See [Build basic authentication](https://help.okta.com/wf/en-us/content/topics/workflows/connector-builder/authentication-basic.htm) for instructions from the Workflows product documentation.
   * **OAuth 2.0**: OAuth 2.0 authentication (supports Authentication Code or Client Credentials grant type)

        See [Build OAuth 2.0 authentication](https://help.okta.com/wf/en-us/content/topics/workflows/connector-builder/authentication-oauth2.htm) for instructions from the Workflows product documentation.
   * **Custom**: Vendor proprietary custom authentication, such as an API key

        See [Build custom authentication](https://help.okta.com/wf/en-us/content/topics/workflows/connector-builder/authentication-custom.htm) for instructions from the Workflows product documentation.

    If you configured optional authentication parameters, you can map them to the tenant authentication variables configured in the OIN Wizard. See [Authentication mapping](#authentication-mapping).

    > **Note**: Ensure that your authentication configuration matches what you entered in the OIN Wizard.<br>
    > For example, ensure that your **Authorization URL** value matches what you entered in the **Authorize endpoint** field of the OIN Wizard's [Authentication settings](/docs/guides/submit-oin-app/wfactions/main/#authentiation-settings). Review all the other mandatory authentication fields, such as **Client ID** and **Client Secret**.

1. Click **Save**.

### Authentication mapping

After you've configured your authentication settings, you can map the authentication parameters to the tenant variables that you've configured in the OIN Wizard. This allows your customers to specify values that are specific to their tenant when they install your integration, such as `subdomain`.

1. Select the corresponding OIN Wizard integration variable for each **Connection parameter** from the **Authentication** > **Authentication mapping** section.

    * The **Connection parameters** are the ones that you defined in your [authentication configuration](#authentication-configuration).
    * The variables under **OIN app integration variables** are the ones that you defined in the OIN Wizard's [Tenant settings](/docs/guides/submit-oin-app/wfactions/main/#tenant-settings) section.

    > **Note**: The OIN Wizard doesn't support uppercase or camel case variable names.

1. Click **Save**.

> **Note:** Even if you've generated your authentication configurations from an OpenAPI specification, you still need to perform these steps to map the authentication parameters to your OIN tenant variables.

## Add actions

1. Select **New Component** > **Add Action** in your Integration Builder project.

    The **Add new action** dialog appears with the supported API Integration Actions available:

    * Provisioning action contracts
    * Universal Logout

1. Select an action from the list and click **Save**.

   The actions appear in your project panel's **Shared Folder** > **Actions** folder.

See [API Integration Action reference](/docs/guides/oin-api-actions-contracts/) for the available API schema contracts.

### Add Universal Logout action flows

1. Click **+ New Flow** from the **Actions** > **Universal Logout** > **Flows** tab.
    The flow configuration page appears.

1. Click **Add event**.
1. Select **Proprietary Universal Logout**.

    The proprietary Universal Logout contract loads:
    * The **body** section contains the contract request schema. See the [Proprietary Universal Logout](/docs/guides/oin-api-actions-contracts/#proprietary-universal-logout) schema reference for input and output property definitions.
    * The **auth** section contains the authentication parameters for the **Connection** to your API. Also included in the **Connection** section are optional parameters that you can configure and map to OIN tenant variables.

1. Create the action flows to your APIs. See [Flow types in Connector Builder](https://help.okta.com/wf/en-us/content/topics/workflows/connector-builder/about-flows.htm) for guidance.
1. Click **Save** to save your flow.
1. Select **Flow is OFF**, and then set the toggle to **ON**.
1. After you've finished building your flows, go to the **Validate and submit** tab. Click **Validate flows** to confirm that your flows are error-free.
1. Resolve any validation errors in your flow.
1. Optionally, add [test flows](#test-flows) to test different use cases and combination flows.
1. Click **Continue submission in OIN** from the **Validate and submit** tab to return to the OIN Wizard, or continue to [add provisioning action flows](#add-provisioning-action-flows).

### Add Provisioning action flows

1. Click **+ New Flow** from the **Actions** > **Provisioning action contracts** > **Flows** tab.

    The flow configuration page appears.

1. Click **Add event**.
1. Select one of the provisioning action contracts.

    The provisioning contract loads:
    * The **body** section contains the action contract request schema. See the [Provisioning action contracts](/docs/guides/oin-api-actions-contracts/#provisioning-action-contracts) schema reference for input and output property definitions.
    * The **auth** section contains the authentication parameters for the **Connection** to your API. Also included in the **Connection** section are optional parameters that you can configure and map to OIN tenant variables.

    Build a flow for each of the mandatory actions listed in [Provisioning API Integration Actions](/docs/guides/submit-oin-app/wfactions/main/#provisioning-api-integration-actions). If your API supports them, you can also add the optional action flows.

1. Create the action flows to your APIs. See [Flow types in Connector Builder](https://help.okta.com/wf/en-us/content/topics/workflows/connector-builder/about-flows.htm) for guidance.
1. Click **Save** to save your flow.
1. Select **Flow is OFF**, and then set the toggle to **ON**.
1. Click **Validate flows** to confirm that your flows are error-free from the **Validate and submit** tab.
1. Resolve any validation errors in your flow.
1. Optionally, add [test flows](#test-flows) to test different use cases and combination flows.
1. Click **Continue submission in OIN** from the **Validate and submit** tab to return to the OIN Wizard.

## Test flows

You can configure and run test flows to test your API actions across multiple use cases.

1. From the Integration Builder project panel, select the **Test Folder** that belongs to your action. The **Test Folder** flow page appears.
1. Click **+ New Flow**, and add your test flow to your project. See [Build and test a flow](https://help.okta.com/wf/en-us/content/topics/workflows/workflows-build-a-flow.htm) for guidance.

1. After you've finished testing your flows, click your project folder from the Integration Builder project panel. The **General** tab appears for your project.
1. Click **View in OIN wizard** to return to the OIN Wizard.

## Support

Post a question on the [Okta Developer Forum](https://devforum.okta.com/c/questions/oin-submissions/19) if you need help or have an issue.

See [Integration Builder](https://help.okta.com/okta_help.htm?type=wf&id=ext-connector-builder).
