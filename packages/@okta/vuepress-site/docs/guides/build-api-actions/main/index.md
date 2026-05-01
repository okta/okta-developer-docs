---
title: Build an integration with API Integration Actions
excerpt: Learn how to build an integration with API Integration Actions in the Workflows Integration Builder.
layout: Guides
---

Build and validate integrations with API Integration Actions in the Integration Builder after you've defined your integration in the Okta Integration Network (OIN) Wizard.

---

#### What you need

* [Okta Integrator Free Plan org](https://developer.okta.com/signup)
* An API resource server that serves requests for provisioning, entitlement management, or Universal Logout for your app
* (Optional) OpenAPI Specification (OAS) version 3.0 or later of your APIs, in either JSON or YAML format
* An integration submission that's initiated through the OIN Wizard

---

## Overview

You can build integrations with API Integration Actions through the low-code Workflows Integration Builder. Okta calls these integrations to perform API actions against your app, such as fetching or updating user profiles, or initiating a risk-based logout.

The Integration Builder integrates with the OIN Wizard for a seamless build-and-submit experience. The following integration capabilities are supported for API Integration Actions:

* Provisioning
* Provisioning and entitlement management
* Universal Logout (your integration must also support SSO)

This guide assumes that you've already initiated your integration submission in the OIN Wizard and have been directed to the Integration Builder to build API actions. The next step is to configure your authentication and action flows in your [Integration Builder project](#integration-builder-project).

> **Note**: For the end-to-end API Integration Actions build and submit process, see the [API Integration Actions process overview](/docs/guides/oin-api-actions/#process-overview).

## Integration Builder project

After specifying your integration capabilities and details in the OIN Wizard, you're directed to the Integration Builder to build your API actions integration.

Your integration details from the OIN Wizard are transferred to a corresponding Integration Builder project. Following these steps to build in your Integration Builder project:

1. Review the [**General**](#general) tab and make any necessary edits.
1. If you have an OpenAPI specification of the APIs that you want to integrate with, go to the **API Spec** tab and [upload the OpenAPI schema](#upload-api-spec). This saves you time from configuring authentication and action events manually.
1. Go to the [**Authentication**](#authentication) tab, configure your authentication and variable mappings.
1. [Add actions](#add-actions) from the **New Component** dropdown list.
1. Validate all your action flows before you return to the OIN Wizard to complete your submission.

### General

You don't have to edit anything in the **General** tab because your Integration Builder project is linked to your integration in the OIN Wizard. All of the following details are transferred from the OIN Wizard:

* **Project name**: Your project name, which corresponds to the integration display name for the OIN catalog
* **Last Updated**: The last time that your integration was updated
* **Status**: The status of your integration submission (typically in `DRAFT` state)
* **Protocol**: Always set to `Build with no-code integration builder`

> **Note**: If you modify the project name, your project becomes disconnected from your integration in the OIN Wizard. Relink your project to use the action flows in your OIN integration.

## Upload API spec

If you have an OpenAPI specification for the API resource that you want to integrate with, you can upload it to your project to save configuration time. You can generate authentication configurations and action flows from your API specification instead of configuring them manually. This step is optional and isn't required to complete your integration project.

> **Note**: Integration Builder only supports OAS version 3.0 or later. You can upload a YAML or JSON-formatted schema file.

1. Click the **API Spec** tab from the Integration Builder project.
1. Click **Upload spec**.
1. Add your API specification file and click **Process file**.

After you upload your API specification, the **Core flows** section appears with three flow types for you to generate. In addition, if your schema file contains authentication schemas, the **Authentication configuration** section appears for you to generate authentication configurations.

> **Note**: You can replace your uploaded API specification file with an updated file if there are changes to the API.

### Generate authentication configuration

The **Authentication configuration** section appears if your API specification contains authentication schemas.

1. From the **API Spec** > **Authentication configuration** section, click **Generate**.
1. Select the authentication schemes from the API specification that you want to configure.
1. Click **Generate**.

The generated authentication configurations appear in your project **Authentication** tab.

### Generate core flows

The **Generate flow** option is enabled for the flow types based on your API specification. The **HTTP Helper** flow type is always enabled initially for you to generate helper flows.

1. From the **API Spec** > **Core flows** section, click **Generate flow** next to the available flow type.
1. Click **Generate flow** in the **Generate core flow** type dialog.
1. Click **Generate**.

After the HTTP Helper flows are available, you can generate the **Authping** and **Custom API Action** flows. These flow types require the HTTP Helper flows.

## Authentication configuration

Configure the connection to your app by setting up the authentication scheme and credential mappings.

> **Note:** These instruction aren't required if you've generated authentication configuration from your API specification.

1. Click **+ Add authentication** from the **Authentication** tab.
1. Select the authentication scheme from the **Auth Type** dropdown and configure the necessary fields.

   The following authentication schemes are supported in Integration Builder:

   * **Basic**: Basic authentication

        See [Build basic authentication](https://help.okta.com/wf/en-us/content/topics/workflows/connector-builder/authentication-basic.htm) for instructions from the Workflows product documentation.
   * **OAuth 2.0**: OAuth 2.0 authentication (supports Authentication Code or Client Credentials grant type)

        See [Build OAuth 2.0 authentication](https://help.okta.com/wf/en-us/content/topics/workflows/connector-builder/authentication-oauth2.htm) for instructions from the Workflows product documentation.
   * **Custom**: Vendor proprietary custom authentication, such as an API key

        See [Build custom authentication](https://help.okta.com/wf/en-us/content/topics/workflows/connector-builder/authentication-custom.htm) for instructions from the Workflows product documentation.

    If you configured optional authentication parameters, you can map them to the tenant authentication variables configured in the OIN Wizard. See [Authentication mapping](#authentication-mapping).

    > **Note**: Ensure that your authentication configuration matches what you entered in the OIN Wizard.<br>
    > For example, ensure that your **Authorization URL** value matches what you entered in the **Authorize endpoint** field of the OIN Wizard's [Authentication settings](/docs/guides/submit-oin-app/wfactions/main/#authentiation-settings). Similarly for all the other mandatory authentication fields, such as **Client ID** and **Client Secret**.

1. Click **Save**.

### Authentication mapping

After you've configured your authentication settings, you can map the authentication parameters to the tenant variables that you've configured in the OIN Wizard. This allows your customers to specify values that are specific to their tenant when they install your integration, such as `subdomain`.

1. Select the corresponding OIN Wizard integration variable for each **Connection parameter** from the **Authentication** > **Authentication mapping** section.

    * The parameters under **Connection parameter** are the ones that you defined in your [authentication configuration](#authentication-configuration).
    * The variables under **OIN app integration variables** are the ones that you defined in the OIN Wizard's [Tenant settings](/docs/guides/submit-oin-app/wfactions/main/#tenant-settings) section.

    > **Note**: The OIN Wizard doesn't support uppercase or camel case variable names.

1. Click **Save**.

> **Note:** Even if you've generated your authentication configuration, you need to perform these steps to map the authentication parameters to your OIN tenant variables.

## Add actions

1. Select **New Component** > **Add Action** in your Integration Builder project.

    The **Add new action** dialog appears with the available API Integration Actions supported:

    * Provisioning action contracts
    * Universal Logout

1. Select an action from the list and click **Save**.

   The action contracts appear in your project > **Shared Folder** > **Actions** folder.

The actions that you selected have a preset API contracts. You need to create a flow for each contract.
See [Add Universal Logout action flows](#add-universal-logout-action-flows) and [Add Provisioning action flows](#add-provisioning-action-flows).

### Add Universal Logout action flows

1. Click **+ New Flow** from the **Actions** > **Universal Logout** > **Flows** tab.
    The flow configuration page appears.

1. Click **Add event**.
1. Select **Proprietary Universal Logout**.

    The proprietary Universal Logout contract loads:
    * The **body** section contains the contract request schema.
    * The **auth** section contains the authentication parameters for the **Connection** to your API. Also included in the **Connection** section are the optional other parameters you configured and mapped to OIN tenant variables.

1. Create the action flows to your APIs. See [Flow types in Connector Builder](https://help.okta.com/wf/en-us/content/topics/workflows/connector-builder/about-flows.htm) for guidance.
1. Click **Save** to save your flow.
1. Click **Flow is OFF** button and turn the flow **ON**.
1. After you finished building your flows, go to the **Validate and submit** tab. Click **Validate flows** to confirm that your flows are error-free.
1. Resolve any validation errors in your flow.
1. After all your flows are validated successfully, click **Continue submission in OIN** to return to the OIN Wizard.

### Add Provisioning action flows

1. Click **+ New Flow** from the **Actions** > **Provisioning action contracts** > **Flows** tab.

    The flow configuration page appears.

1. Click **Add event**.
1. Select one of the provisioning request contracts. You need to build a flow for each of the mandatory actions listed in [Provisioning API Integration Actions](/docs/guides/submit-oin-app/wfactions/main/#provisioning-api-integration-actions). If your API supports them, you can also add the optional action flows.

    The provisioning contract loads:
    * The **body** section contains the action contract request schema.
    * The **auth** section contains the authentication parameters for the **Connection** to your API. Also included in the **Connection** section are the optional other parameters you configured and mapped to OIN tenant variables.

1. Click **Save** to save your flow.
1. Click **Flow is OFF** button and turn the flow **ON**.
Create the action flows to your APIs. See [Flow types in Connector Builder](https://help.okta.com/wf/en-us/content/topics/workflows/connector-builder/about-flows.htm) for guidance.
1. Click **Save** to save your flow.
1. Click **Flow is OFF** button and turn the flow on.
1. After you finished building your flows, go to the **Validate and submit** tab. Click **Validate flows** to confirm that your flows are error-free.
1. Resolve any validation errors in your flow.
1. After all your flows are validated successfully, click **Continue submission in OIN** to return to the OIN Wizard.

## Support

Post a question on the [Okta Developer Forum](https://devforum.okta.com/c/questions/oin-submissions/19) if you need help or have an issue.
