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

You can configure the AI agent-to-app flow with Cross App Access (XAA) in an Okta org with Single Sign-On (SSO). See [Cross App Access (XAA)](/docs/concepts/xaa) for an overview of XAA and this flow.

In the AI agent-to-app XAA flow, the AI agent assumes the requesting app role and the resource app is any SSO app integration in Okta that has the XAA feature enabled. You must build your AI agent app and resource app to have XAA features before registering and configuring them in the Admin Console.

See [Set up AI agent token exchange](https://developer.okta.com/docs/guides/ai-agent-token-exchange/authserver/main/) for the AI agent-to-app token exchange flow.

> **Note:** For developer guidance on requesting and resource apps:
> * See [Enable Your SAML Requesting App for Cross App Access](https://developer.okta.com/blog/2026/07/17/xaa-saml-requester#xaa-implementation-checklist-for-saml-federated-applications).
> * See [Enabling Cross App Access for SAML-Based Resource Apps](https://developer.okta.com/blog/2026/07/03/cross-app-access-saml).

To configure the AI agent-to-app flow with XAA, perform the following process steps in Okta:

1. [Configure the AI agent (requesting app)](#configure-the-ai-agent-requesting-app).
1. [Configure the resource app](#configure-the-resource-app).
1. [Configure the XAA connection](#configure-the-xaa-connection).

## Configure the AI agent (requesting app)

To configure an AI agent as the requesting app for XAA in Okta, follow the **Register AI agent** manually wizard:

### Register AI agent > User access and authentication > Add owners

1. In the Admin Console, go to **Directory** > **AI agents**.
1. Click **Register AI agent** > **Register manually**.
1. Under **Profile**, add a name and description for your AI Agent.
1. Click **Next**.
1. Under **User access and authentication**, check **Allow users to access this agent**, then select one of:

   * **Create a new OIDC app linked to this AI agent:** To create a custom OIDC app integration instance to bind to this AI agent.
   * **Select an existing app:** To select an existing app integration instance in your org to bind to this AI agent. Use this option if your agentic app uses SAML for SSO. See [Create SAML app integrations](https://help.okta.com/oie/en-us/content/topics/apps/apps_app_integration_wizard_saml.htm).
        > **Note:** Currently, you can only select an existing OIN SAML app instance. You can't select an existing OIN OIDC app instance.

   The app you select in the **User access** tab acts as the requesting app role for the XAA flow. It allows your users to sign in to the agentic app through Okta. After the user is signed in, the agentic app can access resource apps on behalf of the signed in user.

1. Click **Next**.
1. Under **Owners**, add owners for the AI agent. This is optional. You can click **Skip for now**, however, Okta recommends that you add least two owners. Click **Save** after you've added the owners.
1. Select your AI Agent from the list of AI Agents, and click **Credentials**.
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

## Configure the resource app

For each resource app you want to connect to the AI agent, create a custom or OIN app integration instance in Okta with OIDC or SAML SSO configured. If you use an OIN app as the resource app, it must already have XAA enabled. To enable XAA on a custom app, follow [Enable XAA on a custom app integration](#enable-xaa-on-a-custom-app-integration).

> **Note:** To create a custom SSO app integration instance, see [Create OpenID Connect app integrations](https://help.okta.com/oie/en-us/content/topics/apps/apps_app_integration_wizard_oidc.htm) or [Create SAML app integrations](https://help.okta.com/oie/en-us/content/topics/apps/apps_app_integration_wizard_saml.htm) in the product documentation. To create an OIN app integration instance, see [Add existing app integrations](https://help.okta.com/oie/en-us/content/topics/apps/apps-add-applications.htm).

### Enable XAA on a custom app integration

Configure XXA for an existing custom SSO app integration instance in Okta:

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

In Okta for AI Agent orgs, when you delegate an AI agent to an app, it can only act on a user's behalf if the user is signed in to the app. Previously, you can create multiple app delegation links to an AI agent. However, with the new **User access** configuration, you can only allow users to sign in to one SSO app for an AI agent. In this model, the AI agent and SSO OIDC app use the same ID and credentials. This implies that the AI agent ID and the SSO OIDC client app ID have the same value. The credentials for the AI agent are used for the SSO client app.

> **Note:** For SAML SSO requesting apps, the AI agent's ID and credentials are used for the XAA flow.

If you've previously configured an AI agent with app delegation links, your delegation links now appear as user access apps. The following behavior applies to migrated delegation links in the direct user authentication model:

* If you have a single app delegation for your AI agent, you don't need to reconfigure the AI agent's migrated user access app. Your XAA flow still works with this configuration.
* If you previously have multiple app delegation links, you need to delete all of the migrated user access apps and recreate only one user access app. See [Reconfigure direct user authentiation for your AI agent](#reconfigure-direct-user-authentiation-for-your-ai-agent).
* If you want to modify your previous app delegation link configuration, you need to delete your exising user access app configuration and recreate a new one. See [Reconfigure direct user authentiation for your AI agent](#reconfigure-direct-user-authentiation-for-your-ai-agent).

> **Note:** A "This agent is using an outdated method for user sign-on" warning message appears if your AI agent was configured using delegation links. You only have to recreate your user access app configuration if you need to change the direct user authentication model for your AI agent.

### Reconfigure direct user authentiation for your AI agent

Delete previous user access apps:

1. In the Admin Console, go to **Directory** > **AI Agents**.
1. Select an AI agent.
1. Select the **User access** tab.
1. In the **User sign-on** section, click the more icon (![three-dot more icon](/img/icons/odyssey/more.svg)) next to user access app that you want to remove, then select **Delete**.
    > **Note:** Perform this step for all the user access apps you want to remove.

Add direct user authentiation to our AI agent with an SSO requesting app:

1. In the Admin Console, go to **Directory** > **AI Agents**.
1. Select an AI agent.
1. Select the **User access** tab.
1. Under **User access** > **App used for access configuration**, select one of:

   * **Create a new OIDC app linked to this AI agent:** To create a custom OIDC app integration instance to bind to this AI agent.
   * **Select an existing app:** To select an existing app integration instance in your org to bind to this AI agent. Use this option if your agentic app uses SAML for SSO. See [Create SAML app integrations](https://help.okta.com/oie/en-us/content/topics/apps/apps_app_integration_wizard_saml.htm).
        > **Note:** Currently, you can only select an existing OIN SAML app instance. You can't select an existing OIN OIDC app instance.
1. Click **Save**.
