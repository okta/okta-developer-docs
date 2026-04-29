---
title: Build an integration with API Integration Actions
excerpt: Learn how to build an integration with API Integration Actions in the Workflows Integration Builder.
layout: Guides
---

Build, test, and submit an an integration with API Integration Actions to the Okta Integration Network (OIN) for review and publication.

---

#### What you need

* [Okta Integrator Free Plan org](https://developer.okta.com/signup)

* A service app that needs to access Okta APIs for your customer

---

## Overview

xxx


### New IB project

Building and Submitting the Workflow
The following steps occur within the Integration Builder section of Okta Workflows:

Click the + sign next to Integration Builder Projects to create a new project.
Enter the project name and description, and then click Save.
On the General tab, confirm the OIN project is linked and that the project name and protocols are correct.
Click on the Authentication tab and add the authentication information, ensuring it matches what you entered in the OIN Wizard.
Fill out the Authentication Mapping section to map the OIN Wizard authentication parameters to the Workflow authentication parameters.
Click on New Component and choose Add Action.
Select the API Integration Action component from the list, and then click Save.
Click on New Flow to begin building your workflow. Use the available sample templates as a guide.
After creating your flows, you can create test flows in the test folder to validate that the API calls are being made correctly.
After testing, click on Validate and Submit.
Click on Validate flows and fix any errors.
Click on Submit in OIN Wizard.

## Upload API spec

If you have an OpenAPI 3.0 specification for the third-party API resource that you want to integrate with, you can upload it to your project to save configuration time. You can generate authentication configurations and action flows from your API specification instead of configuring them manually. This step is optional and not required to complete your integration project.

> **Note**: Integration Builder only supports OpenAPI 3.0 specifications. You can upload a YAML or JSON-formatted schema file.

1. In your Integration Builder project folder, go to the **API Spec** tab.
1. Click **Upload spec**.
1. Add your API specification file and click **Process file**.

After you upload your API specification, the **Core flows** section appears with three flow types for you to generate. In addition, if your schema file contains authentication schemas, the **Authentication configuration** section appears for you to generate authentcation configurations.

> **Note**: You can replace your uploaded API specification file with an updated file if there are changes to the API.

### Generate authentication configuration

The **Authentication configuration** section appears if your API specification contains authentication schemes.

1. From the **API Spec** > **Authentication configuration** section, click **Generate**.
1. Select the authentication schemes from the API specification that you want to configure.
1. Click **Generate**.

The generated authentication configurations appear in your project **Authentication** tab.

### Generate core flows

The **Generate flow** option is enabled for the flow types based on your API specification. Typically, the **HTTP Helper** flow type is enabled for you to generate.

1. From the **API Spec** > **Core flows** section, click **Generate flow** next to the available flow type.
1. Click **Generate flow** in the **Generate core flow** type dialog.
1. Click **Generate**.

All the endpoints in your API schema becomes available in the **Authping** and **Custom API Action** flows.

## Authentication

Configure the connection to your app by setting up the authentication scheme and credential mappings. The following authentication schemes are supported for API Integration Actions in Integration Builder:

* Basic authentication
* OAuth 2.0 authentication
* Custom authentication

### Basic authentication

Configure Basic authentication to prompt your users to 

### Add an API integration action component


### Select action contracts

pre-built contracts

### Add flows

Add the required flow for the action contracts that you selected.

#### Add events for a flow

#### Add functions for a flow

Save the flow and set them to **active** so that they are discoverable by OIN Wizard.

#### Configure authentication in the flows


For testing purposes, use the Okta domain, client ID, and client secret obtained from your test integration to make an access token request. Then, make an API request using the access token returned by the first request. See [Test your API service flow](#test-your-api-service-flow).



### Validate ?

### Go back to OIN Wizard



## Support

Post a question on the [Okta Developer Forum](https://devforum.okta.com/c/questions/oin-submissions/19) if you need help or have an issue.
