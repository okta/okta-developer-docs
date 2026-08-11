---
title: Configure AI agent-to-app with XAA
meta:
  - name: description
    content: Cross App Access (XAA) - AI agent-to-app configuration
layout: Guides
---
<ApiLifecycle access="ie" />

Follow this guide to secure access between an AI agent and resource apps with Cross App Access (XAA) in the Okta Admin Console.

---

#### Learning outcomes

- Learn how to register and configure an AI agent in the Admin Console.
- Learn how to configure the resource app in the Admin Console.
- Learn how to configure the AI agent-to-app connection in the Admin Console.
- Learn how to migrate a previous AI agent-to-app configuration in an org that's subscribed to Okta for AI Agents.

#### What you need

- An Okta org that has the SSO feature, such as the [Okta Integrator Free Plan org](https://developer.okta.com/signup)
- An Okta user account in your org with the super admin role

---

## Overview

You can configure the AI agent-to-app flow with Cross App Access (XAA) in an Okta org with Single Sign-On (SSO). See [Cross App Access (XAA)](/docs/concepts/xaa) for an overview of XAA.

In the AI agent-to-app XAA flow, the AI agent assumes the requesting app role and the resource app can be any SSO app integration in Okta that has the XAA feature enabled. You must build your AI agent app and resource app to have XAA features before registering and configuring them in the Admin Console.

See [Set up AI agent token exchange](https://developer.okta.com/docs/guides/ai-agent-token-exchange/authserver/main/) for the AI agent-to-app token exchange flow.

> **Note:** For developer guidance on requesting and resource apps:
> * See [Enable Your SAML Requesting App for Cross App Access](https://developer.okta.com/blog/2026/07/17/xaa-saml-requester#xaa-implementation-checklist-for-saml-federated-applications).
> * See [Enabling Cross App Access for SAML-Based Resource Apps](https://developer.okta.com/blog/2026/07/03/cross-app-access-saml).

To configure the AI agent-to-app flow with XAA, perform the following process steps in Okta:

1. [Configure the AI agent (requesting app)](#configure-the-ai-agent-requesting-app).
1. [Configure the resource app](#configure-the-resource-app).
1. [Configure the XAA connection](#configure-the-xaa-connection).

## Configure the AI agent (requesting app)

To configure an AI agent as the requesting app for XAA in Okta, follow the **Register AI agent manually** wizard.

### Register AI agent > User access and authentication > Add owners

1. In the Admin Console, go to **Directory** > **AI agents**.
1. Click **Register AI agent** > **Register manually**.
1. Under **Profile**, add a name and description for your AI Agent.
1. Click **Next**.
1. Under **User access and authentication**, check **Allow users to access this agent**, then select one of:

   * **Create a new OIDC app linked to this AI agent:** To create a custom OIDC app integration instance for users to sign in to access the AI agent. See [Create a new OIDC app linked to this AI agent](#create-a-new-oidc-app-linked-to-this-ai-agent).
   * **Select an existing app:** To select an existing app integration instance in your org for users to sign in to access the AI agent. Use this option if your agentic app uses SAML for SSO. See [Select an existing app](#select-an-existing-app).

        > **Note:** Currently, you can only select an existing OIN SAML app instance. You can't select an existing OIDC app instance.

   The app you select in the **User access** tab acts as the requesting app role for the XAA flow. It allows your users to sign in to the agentic app through Okta. After the user is signed in, the agentic app can access resource apps on behalf of the signed in user.

1. Click **Next**.
1. Under **Owners**, add owners for the AI agent. This is optional. You can click **Skip for now**, however, Okta recommends that you add least two owners. Click **Save** after you've added the owners.
1. Select your AI Agent from the list of AI Agents, and click **Client registration**.
1. On the **Client registration** tab, select a client registration method:
   * **Client ID only**: Recommended for public clients that can't store a secret, such as local coding agents.
   * **Client secret**: Recommended for server-side AI agents. Click **Generate secret** and save the value for your AI agent app's OAuth 2.0 flow.
   * **Public/private key**: Recommended for AI agents that have builder-managed key pairs.
      1. Click **Add public key**.
      1. Enter your public key, or click **Generate new key**. Okta creates a public key that's associated with a private key that you can view in JSON or PEM.
      1. Click **Copy to clipboard** and use the private key in your AI agent app's OAuth 2.0 flow.
      1. Click **Done**.
   * Copy the identifier that appears in the **Client ID** field and use it in your AI agent app. This is the requesting app's client ID that's used for OAuth 2.0.
   * Click **Activate**.

### Supported requesting apps

From the previous **User access and authentication** step in the AI agent configuration, only specific types of app integration instances are supported for the options ([Create a new OIDC app linked to this AI agent](#create-a-new-oidc-app-linked-to-this-ai-agent) or [Select an existing app](#select-an-existing-app)) provided.

#### Create a new OIDC app linked to this AI agent

| &nbsp;  | Custom OIDC app | Custom SAML app | OIN OIDC catalog app | OIN SAML catalog app |
| --- | :---: | :---: | :---: | :---: |
| Creates a new app instance, linked to the AI agent |  ✔  |  ✗  |  ✗  |  ✗  |

This option creates a [custom OIDC app integration instance](https://help.okta.com/okta_help.htm?type=oie&id=create-openid-connect-app-integrations) in your org that's linked to the AI agent. This linked app instance functions as the requesting app (client). You can't create a custom SAML app instance or a new app instance from the OIN catalog.

The linked OIDC app instance is initially deactivated. When you activate your AI agent, the linked app instance is also activated. You can access the app details from the **Applications** page.

#### Select an existing app

| &nbsp;  | Custom OIDC app | Custom SAML app | OIN OIDC catalog app | OIN SAML catalog app |
| ---     | :-------------: | :---: | :---: | :---: |
| Link to an existing app |  ✗  |  ✔  |  ✗  |  ✔  |

This option links the AI agent to an existing app instance in your org. You can only link an existing SAML app instance. This existing SAML app instance can be created from an integration in the OIN catalog or by using the [custom SAML App Integration Wizard](https://help.okta.com/okta_help.htm?type=oie&id=csh-apps-aiw-saml). Users can sign in to the linked app to access the AI agent. You can't link an existing OIDC app instance, created from the custom App Integration Wizard or from the OIN.

### Assign users to the requesting app

Assign users to access the AI agent by assigning them to the linked requesting app.

1. In the Admin Console, go to **Applications and Resources** > **Applications**.
1. Select your SSO requesting app that's linked to your AI agent. Your requesting app is initially inactive, so it may be listed in the **Inactive** tab.
1. In the **Assignments** tab, select the users or groups who can access the AI agent.
    See [Assign an app integration to a user](https://help.okta.com/okta_help.htm?type=oie&id=ext-lcm-assign-app-user) and [Assign an app integration to a group](https://help.okta.com/okta_help.htm?type=oie&id=ext-lcm-assign-app-groups) in the product documentation.

## Configure the resource app

The resource app contains the protected resources that your AI agent wants to access on behalf of the user.
Create the app integration instance that represents your resource app in Okta before configuring the resource connection.

If you create your resource app instance from the OIN catalog, it already has XAA configured, so you don't have to enable XAA. You can go directly to [configure the XAA connection](#configure-the-xaa-connection).

If you create a custom resource app instance using the [classic experience App Integration Wizard](https://help.okta.com/okta_help.htm?type=oie&id=csh-apps-aiw-main), you need to configure XAA. See [Enable XAA on a custom app integration](#enable-xaa-on-a-custom-app-integration).

> **Note:** To create a custom SSO app integration instance, see [Create OpenID Connect app integrations](https://help.okta.com/oie/en-us/content/topics/apps/apps_app_integration_wizard_oidc.htm) or [Create SAML app integrations](https://help.okta.com/oie/en-us/content/topics/apps/apps_app_integration_wizard_saml.htm) in the product documentation. To create an OIN app integration instance, see [Add existing app integrations](https://help.okta.com/oie/en-us/content/topics/apps/apps-add-applications.htm).

### Supported resource apps

| &nbsp;  | Custom OIDC app | Custom SAML app | OIN OIDC catalog app | OIN SAML catalog app |
| --- | :---: | :---: | :---: | :---: |
| Resource app |  ✔  |  ✔  |  ✔ Only if XAA is enabled |  ✔ Only if XAA is enabled |

For each resource app you want to connect to the AI agent, create a custom or OIN app integration instance in Okta with OIDC or SAML SSO configured. If you use an OIN app as the resource app, it must already have XAA enabled. To enable XAA on a custom app, follow [Enable XAA on a custom app integration](#enable-xaa-on-a-custom-app-integration).

> **Note:** To create a custom SSO app integration instance, see [Create OpenID Connect app integrations]((https://help.okta.com/okta_help.htm?type=oie&id=create-openid-connect-app-integrations)) or [Create SAML app integrations](https://help.okta.com/okta_help.htm?type=oie&id=csh-apps-aiw-saml) in the product documentation. To create an OIN app integration instance, see [Add existing app integrations](https://help.okta.com/okta_help.htm?type=oie&id=csh-apps-add-app).

### Enable XAA on a custom app integration

Configure XAA for an existing custom SSO app integration instance in Okta:

<!-- For an SSO resource app instance in Okta, configure the **Cross-app access (XAA)** in the **Resource Server** tab. See the instructions in [Configure resource server connectors](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-rsc-svr-config). -->

1. In the Admin Console, go to **Applications and Resources** > **Applications**.
1. Select your SSO resource app.
1. In the **Resource Server** tab of your app page, select **Cross App Access (XAA)** to configure XAA:
    1. Select **Enable** to grant access to the app through XAA.
    1. Specify the following fields:
        * **Resource URL**: The base URL of the app's resource server.
        * **Issuer URL**: The base URL of the app's authorization server. Okta uses this URL for token verification requests.
        * **Audience/tenant ID**: A unique identifier or audience claim for the authorization server that protects the resource.
    1. Click **Save**.

## Configure the XAA connection

For each XAA-enbled resource app that you want to connect to your AI agent, configure the connection on the AI agent page:

<!-- Connect your AI agent to resource apps by following this guide: [Connect AI agents to resources](https://help.okta.com/oie/en-us/content/topics/ai-agents/ai-agent-connected-resource.htm). For this configuration, select **Application** as the resource type. Select the resource app instance that's already in your Okta org (from step 2). This can be a custom or OIN app instance that has OIDC or SAML SSO, and XAA configured. -->

1. In the Admin Console, go to **Directory** > **AI Agents**.
1. Select an AI agent.
1. Select the **Resource connections** tab.
1. Click **Add resource connection**.
1. Select **Application**.
1. From the **Application** > **Connect to** section, select **App configured for AI Agent access**.
1. From the **Application instance** dropdown, select the XAA-enabled resource app that you configured from [Configure the resource app](#configure-the-resource-app).
1. Click **Add**.

## Migration from Okta for AI Agent delegation link

If your org is subscribed to Okta for AI Agents, the **Delegations** tab has been renamed to **User access** and **Machine access** on the AI agent page. The **User access** tab contains configuration on the users that can access the AI agent, and the **Machine access** tab contains configuration on the AI agent's non-human access.

In Okta for AI Agent orgs, when you delegate an AI agent to an SSO app, it can only act on a user's behalf if the user is signed in to the app. Previously, you can create multiple delegation links for an AI agent under the **Delegations** tab. However, with the new **User access** configuration, you can only allow users to sign in to one SSO app for an AI agent. You can still have multiple non-user delegation links, which now appear in the **Machine access** tab.

In the **User access** configuration, if you have an OIDC SSO app linked to your AI agent, it's assumed that the client ID and credentials come from the OIDC app. If you have a SAML SSO app, the client ID and credentials are obtained from the AI agent. In both cases, the requesting client ID and credentials appear in the **Client registration** tab in the AI agent page.

If you've previously configured an AI agent with user-access-app delegation links, they now appear as apps in the **User access** tab. The following behavior applies to migrated delegation links in the **User access** model:

* If you have a single SAML user-access-app delegation for your AI agent, you don't need to reconfigure the AI agent's user access app. Your XAA flow still works with the current configuration.
* If you have a single OIDC user-access-app delegation for your AI agent, delete the existing user-access app configuration and recreate a new OIDC app instance for linking. See [Reconfigure direct user authentication for your AI agent](#reconfigure-direct-user-authentiation-for-your-ai-agent).
* If you previously had multiple user-access-app delegation links, delete the existing user-access-app configurations and recreate only one user-access-app for linking. See [Reconfigure direct user authentication for your AI agent](#reconfigure-direct-user-authentiation-for-your-ai-agent).
* If you want to modify your previous delegation configuration, delete your existing user-access-app configuration and recreate a new one. See [Reconfigure direct user authentication for your AI agent](#reconfigure-direct-user-authentiation-for-your-ai-agent).

> **Note:** A "This agent is using an outdated method for user sign-on" warning message appears if your AI agent was configured using delegation links. [Reconfigure direct user authentication for your AI agent](#reconfigure-direct-user-authentication-for-your-ai-agent) depending on the behavior of your migrated delegation links.

### Reconfigure direct user authentication for your AI agent

Delete previous user access apps:

1. In the Admin Console, go to **Directory** > **AI Agents**.
1. Select an AI agent.
1. Select the **User access** tab.
1. In the **User sign-on** section, click the more icon (![three-dot more icon](/img/icons/odyssey/more.svg)) next to the user-access app that you want to remove, then select **Delete**.
    > **Note:** Perform this step for all the user-access apps you want to remove.

Add direct user authentication to our AI agent with an SSO requesting app:

1. Go to **Directory** > **AI Agents**.
1. Select an AI agent.
1. Select the **User access** tab.
1. Under **User access** > **App used for access configuration**, select one of:

   * **Create a new OIDC app linked to this AI agent:** To create a custom OIDC app integration instance for users to sign in to access the AI agent. See [Create a new OIDC app linked to this AI agent](#create-a-new-oidc-app-linked-to-this-ai-agent).
   * **Select an existing app:** To select an existing app integration instance in your org for users to sign in to access the AI agent. Use this option if your agentic app uses SAML for SSO. See [Select an existing app](#select-an-existing-app).

        > **Note:** Currently, you can only select an existing OIN SAML app instance. You can't select an existing OIDC app instance.

1. Click **Save**.
