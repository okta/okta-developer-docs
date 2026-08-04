---
title: Cross App Access (XAA) AI agent-to-app configuration
meta:
  - name: description
    content: Cross App Access (XAA) - AI agent-to-app configuration
layout: Guides
---

## XAA configuration for AI agent-to-app

If you're an Okta admin and want to secure access between custom SSO-agentic requesting apps and SSO resource apps, follow this configuration:


1. Follow this guide to create an AI agent object in Okta and bound to an agent app: [Add AI agents manually](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-add-manually). In **User access and authentication**, select:

   * **Create a new OIDC app linked to this AI agent** to create a new OIDC custom app bound to this AI agent.
   * **Select an existing app** to select an existing app instance in your org to bind to this AI agent. You can only select a custom SSO app that you created earlier to bind to the AI agent. Use this option if your agentic app uses SAML for SSO. See [Create SAML app integrations](https://help.okta.com/oie/en-us/content/topics/apps/apps_app_integration_wizard_saml.htm).

   The app you select in the **User access** tab represents the requesting app for Cross App Access flow. It allows your users to sign in to the agentic app through Okta, and the agentic app accessing resource apps on behalf of the signed in user.

1. For each resource app you want to connect to the AI agent, create a custom or OIN app instance in Okta with OIDC or SAML SSO configured. If you use an OIN app as the resource app, it must already have XAA enabled.

    * For an SSO resource app instance in Okta, configure the **Cross-app access (XAA)** in the **Resource Server** tab. See the instructions in [Configure resource server connectors](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-rsc-svr-config).

1. Connect your AI agent to resource apps by following this guide: [Connect AI agents to resources](https://help.okta.com/oie/en-us/content/topics/ai-agents/ai-agent-connected-resource.htm). For this configuration, select **Application** as the resource type. Select the resource app instance that's already in your Okta org (from step 2). This can be a custom or OIN app instance that has OIDC or SAML SSO, and XAA configured.

See [Set up AI agent token exchange](https://developer.okta.com/docs/guides/ai-agent-token-exchange/authserver/main/) for the AI agent-to-app token exchange flow.
