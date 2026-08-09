---
title: Configure XAA AI agent-to-app
meta:
  - name: description
    content: Cross App Access (XAA) - AI agent-to-app configuration
layout: Guides
---
<ApiLifecycle access="ie" />

Follow this guide to secure access between an AI agent and SSO resource apps with Cross App Access (XAA) in the Okta Admin Console.

---

#### Learning outcomes

- Learn how to register and configure an AI agent in the Admin Console.
- Learn how to configure the resource app in the Admin Console.
- Learn how to configure the AI-agent-to-app connection in the Admin Console.
- Learn how to migrate a previous AI-agent-to-app configuration in an org that's subscribed to Okta for AI Agents.

#### What you need

- An Okta org that has the SSO feature, such as the [Okta Integrator Free Plan org](https://developer.okta.com/signup)
- An Okta user account in your org with the super admin role

---

## Overview

You can configure the an AI agent-to-app flow with Cross App Access (XAA) in an Okta org with Single Sign-On (SSO). See [Cross App Access (XAA)](/docs/concepts/xaa) for details of this flow.

In the AI agent-to-app XAA flow, the AI agent assumes the requesting app role and the resource app is any SSO app integration in Okta that has the XAA feature enabled. You must build your AI agent app and resource app to have XAA features before registering and configuring them in the Admin Console.

See the developer guidance on [Build an XAA requesting app] and [Build an XAA resource app].
Also see [Set up AI agent token exchange](https://developer.okta.com/docs/guides/ai-agent-token-exchange/authserver/main/) for the AI agent-to-app token exchange flow.

## Configure the AI agent (requesting app)

To configure an AI agent as the requesting app for XAA, follow the register AI agent manually wizard:

**Register AI agent** > **User access and authentication** > **Add owners**

1. In the Admin Console, go to **Directory** > **AI agents**.
1. Click **Register AI agent** > **Register manually**.
1. Under **Profile**, add a name and description for your AI Agent.
1. Click **Next**.
1. Under **User access and authentication**, check **Allow users to access this agent**, then select:

   * **Create a new OIDC app linked to this AI agent:** To create a new OIDC custom app to bind to this AI agent.
   * **Select an existing app:** Select an existing app instance in your org to bind to this AI agent. You can only select a custom SSO app that you created previously to bind to the AI agent. Use this option if your agentic app uses SAML for SSO. See [Create SAML app integrations](https://help.okta.com/oie/en-us/content/topics/apps/apps_app_integration_wizard_saml.htm).

   The app you select in the **User access** tab represents the requesting app for the Cross App Access flow. It allows your users to sign in to the agentic app through Okta, and the agentic app to access resource apps on behalf of the signed in user.

1. Click **Next**.
1. Under **Owners**, add owners for the AI agent. This is optional. You can click **Skip for now**, however, Okta recommends that you add least two owners. Click **Save** after you've added the owners.
1. Select your AI Agent from the list of AI Agents, and click **Credentials**.
1. On the **Client registration** tab, select a client registration method:
   * **Client ID only**: Recommended for public clients that can't store a secret, such as local coding agents.
   * **Client secret**: Recommended for server-side AI agents. Click **Generate secret** and save the value for your AI agent app's OAuth 2.0 flow.
   * **Public/private key**: Recommended for AI agents that have builder-managed key pairs.
      1. Click Add public key.
      1. Enter your public key, or click Generate new key. Okta creates a public key that's associated with a private key that you can view in JSON or PEM.
      1. Click Copy to clipboard and store the private key safely.
      1. Click **Done**.
   * Copy the identifier that appears in the **Client ID** field and use in your AI agent app. This is the requesting app's client ID used for OAuth 2.0.
   * Click **Activate**.


## Configure the resource app

1. For each resource app you want to connect to the AI agent, create a custom or OIN app instance in Okta with OIDC or SAML SSO configured. If you use an OIN app as the resource app, it must already have XAA enabled.

    * For an SSO resource app instance in Okta, configure the **Cross-app access (XAA)** in the **Resource Server** tab. See the instructions in [Configure resource server connectors](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-rsc-svr-config).

## Configure the XAA connection

1. Connect your AI agent to resource apps by following this guide: [Connect AI agents to resources](https://help.okta.com/oie/en-us/content/topics/ai-agents/ai-agent-connected-resource.htm). For this configuration, select **Application** as the resource type. Select the resource app instance that's already in your Okta org (from step 2). This can be a custom or OIN app instance that has OIDC or SAML SSO, and XAA configured.


## Migration from Okta for AI Agent delegation link

If your org is subscribed to Okta for AI Agents, and you've configured an AI agent with an app delegation link, you need to update the delegation link to an AI agent **User access** configuration.

In Okta for AI Agent orgs, when you delegate an AI agent to an app, it can only act on a user's behalf if the user is signed in to the app. Previously, you can create multiple app delegation links to an AI agent. However, with the new **User access** configuration, you can only allow users to sign in to one SSO app for an AI agent. In this model, the AI agent and SSO OIDC app use the same ID and credentials. This implies that the AI agent ID and the SSO OIDC client app ID have the same value. The credentials for the AI agent are used for the SSO client app.

> **Note:** Error message appears if your AI agent was configured using delegation links.

1. Delete the current User Access link
1. Select an app to link to your AI agent in User access.



