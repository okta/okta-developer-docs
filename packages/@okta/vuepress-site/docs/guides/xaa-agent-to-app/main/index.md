---
title: XAA - AI agent-to-app configuration
meta:
  - name: description
    content: XAA - AI agent-to-app configuration
layout: Guides
---

## AI agent-to-app use case

If you’re an Okta admin and want to set up an AI agent-to-app cross-app access configuration, follow these steps:

1. Create a custom OIDC or SAML app in Okta to represent your AI agent app. This custom app acts as the requesting app, allowing users to SSO into your AI agent.

1. Follow this guide to create an AI agent object in Okta and bound to an agent app: [Add AI agents manually](https://help.okta.com/oie/en-us/Content/Topics/ai-agents/ai-agent-add-manually.htm). For this configuration, select your custom agent app (in step 1) in the **Delegations** tab of the AI agent page.

1. For each resource app you want to connect to the AI agent, create a custom or OIN app instance in Okta with OIDC or SAML SSO configured. If you use an OIN app as the resource app, it must already have XAA enabled.

  For an SSO resource app instance in Okta, configure the **Cross-app access (XAA)** in the **Resource server** tab. See the instructions in [Configure resource server connectors](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-rsc-svr-config).

1. Connect your AI agent to resource apps by following this guide: [Connect AI agents to resources](https://help.okta.com/oie/en-us/content/topics/ai-agents/ai-agent-connected-resource.htm). For this configuration, select **Application** as the resource type. Select the resource app instance that's already in your Okta org. This can be a custom or OIN app instance that has OIDC or SAML SSO configured.


See [Set up AI agent token exchange](https://developer.okta.com/docs/guides/ai-agent-token-exchange/authserver/main/) for the AI agent-to-app token exchange flow.
