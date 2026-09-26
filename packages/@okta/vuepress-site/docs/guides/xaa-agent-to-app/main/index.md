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
- An agentic requesting app and a resource app with XAA capabilities

---

## Overview

You can configure the AI agent-to-app flow with Cross App Access (XAA) in an Okta org with Single Sign-On (SSO). See [Cross App Access (XAA)](/docs/concepts/xaa) for an overview of XAA.

In the AI agent-to-app XAA flow, the AI agent assumes the requesting app role and the resource app can be any SSO app integration in Okta that has the XAA feature enabled. Build your AI agent app and resource app to have XAA features before registering and configuring them in the Admin Console.

See [XAA flow specifics for an OIDC or SAML requesting app](/docs/guides/xaa-request-token-ex/openidconnect/main/#xaa-flow-specifics-for-requesting-app) for the AI agent-to-app token exchange flow.

> **Note:** For developer guidance on requesting and resource apps:
> * See [Implement XAA token exchange for your requesting app](/docs/guides/xaa-request-token-ex/openidconnect/main/).
> * See [Enabling Cross App Access for SAML-Based Resource Apps](https://developer.okta.com/blog/2026/07/03/cross-app-access-saml).

To configure the AI agent-to-app flow with XAA, perform the following process steps in Okta:

1. [Configure the AI agent (requesting app)](#configure-the-ai-agent-requesting-app).
1. [Configure the resource app](#configure-the-resource-app).
1. [Configure the XAA connection](#configure-the-xaa-connection).

## Configure the AI agent (requesting app)

To configure an AI agent as the requesting app for XAA, you need to create an app instance (the requesting agentic app) and link it to an AI agent in your Okta org. There are two paths to configure your AI agent (requesting app) in Okta. You can select either path, depending on your configuration.

1. [Register an AI agent from an existing app](#register-an-ai-agent-from-an-existing-app).
1. [Register an AI agent from Directory](#register-an-ai-agent-from-directory).

### Supported requesting apps

Okta supports requesting app instances created from the Okta Integration Network (OIN) or from a custom OIDC or SAML integration.

| Custom OIDC app | Custom SAML app | OIN OIDC catalog app | OIN SAML catalog app |
| :-------------: | :---: | :---: | :---: |
|  ✔ Create a new OIDC app linked to this AI agent<br> ✔ Select an existing app<br> |  ✔ Select an existing app |  ✔ Select an existing app  |  ✔ Select an existing app |

#### Select an existing app

This option links the AI agent to an existing app instance in your org. Users can sign in to the linked app to access the AI agent.

- You can link to an existing SAML SSO app instance. Create this existing SAML app instance from an [integration in the OIN catalog](https://help.okta.com/okta_help.htm?type=oie&id=csh-apps-add-app) or from the [Custom SAML App Integration Wizard](https://help.okta.com/okta_help.htm?type=oie&id=csh-apps-aiw-saml).

- You can link to an existing OIDC SSO app instance. Create this existing OIDC app instance from an [integration in the OIN catalog](https://help.okta.com/okta_help.htm?type=oie&id=csh-apps-add-app) or from the [Custom OIDC App Integration Wizard](https://help.okta.com/okta_help.htm?type=oie&id=csh-apps-aiw-oidc). However, Okta recommends that you create the custom OIDC app instance from the **Register AI agent** wizard. See [Create a new OIDC app linked to this AI agent](#create-a-new-oidc-app-linked-to-this-ai-agent).

#### Create a new OIDC app linked to this AI agent

This option creates a [custom OIDC app integration instance](https://help.okta.com/okta_help.htm?type=oie&id=create-openid-connect-app-integrations) in your org that's linked to the AI agent. This linked app instance functions as the requesting app (client) and shares client credentials with the AI agent.

The linked OIDC app instance is initially deactivated. When you activate your AI agent, the linked app instance is also activated. You can access the app details from the **Applications** page.

### Register an AI agent from an existing app

You can configure an AI agent and link it to an existing app instance in Okta. Your existing app must support either OIDC or SAML for SSO:

- For an OIN app, see [Add an existing app integration](#https://help.okta.com/okta_help.htm?type=oie&id=csh-apps-add-app). For example, you can select **Claude** as a requesting app from the OIN.
- For a custom SAML app, see [Create SAML app integrations](https://help.okta.com/okta_help.htm?type=oie&id=csh-apps-aiw-saml).
- For a custom OIDC app, Okta recommends that you register the AI agent and then create the custom OIDC app instance from the wizard. See [Register an AI agent from Directory](#register-an-ai-agent-from-directory) and select **Create a new OIDC app linked to this AI agent** in [Configure user access](#configure-user-access).
   > **Note:** You can also create a custom OIDC app before you register the AI agent if creating an OIDC app with the Register AI agent wizard isn't possible for your configuration. See [Create OpenID Connect app integrations](https://help.okta.com/okta_help.htm?type=oie&id=csh-apps-aiw-oidc) to create a custom OIDC app.

After you create your SSO requesting app, register an AI agent and link it to the app:

1. In the Admin Console, go to **Applications and Resources** > **Applications**.
1. Select your SSO requesting app.
1. On the **Machine Assignments** tab of your app page, select the **Resources** tile.
1. Click **Register AI agent**.
1. Under **Profile**, add a name and description for your AI agent.
1. Click **Next**.

See [Configure user access](#configure-user-access) for the next step in the **Register AI agent** wizard.

### Register an AI agent from Directory

To register your AI agent first from the Directory path, use the **Register AI agent** > **User access and authentication** wizard:

1. In the Admin Console, go to **Directory** > **AI agents**.
1. Click **Register AI agent**.
1. Under **Profile**, add a name and description for your AI agent.
1. Click **Next**.

See [Configure user access](#configure-user-access) for the next step in the wizard.

### Configure user access

1. Under **User access and authentication** > **App assigned to users to access this AI Agent** of the AI agent page, select one of the following items:

   * **Create a new OIDC app linked to this AI agent:** To create a custom OIDC app integration instance for users to sign in to access the AI agent. See [Create a new OIDC app linked to this AI agent](#create-a-new-oidc-app-linked-to-this-ai-agent).
   * **Select an existing app:** To select an existing app integration instance in your org for users to sign in to access the AI agent. Use this option if your agentic app uses SAML for SSO. See [Select an existing app](#select-an-existing-app).

        > **Note:** If you [register an AI agent from an existing app](#register-an-ai-agent-from-an-existing-app), the existing app is prepopulated in this section.

   The app that you select in the **User access** tab acts as the requesting app role for the XAA flow. It allows your users to sign in to the agentic app through Okta. After the user is signed in, the agentic app can access resource apps on behalf of the signed in user.

1. Click **Next**. Your AI agent appears in the **AI agents** list with the `STAGED` status.

> **Note:** For OIDC apps, this action permanently links the AI agent to the app. If you need to make a change to the linked OIDC app, delete the AI agent and recreate it.

See [Add client registration details](#add-client-registration-details) for the next process.

### Add client registration details

You can stage multiple client registration methods, but you can only activate one method at a time.

1. On the **Client registration** tab in the AI agent page, click **Configure** next to the client registration method that you want to use:
   - **External client ID**: For agentic clients whose identity definition is discovered through a hosted document.
      - **Client ID metadata document (CIMD)**:
        1. Specify the **CIMD URL** for your agentic client.
        1. Click **Activate CIMD client registration**.
          - Click **Switch** to use CIMD for authentication. All resources referencing this agentic app must also use this method.
          - Click **Cancel** to cancel this operation and use the previous authentication method.
   - **Okta-generated client ID**: For agentic clients that use Okta generated credentials for authentication.
      - **Client secret**: Recommended for server-side AI agents.
          1. Click **Generate secret** and save the secret and **Client ID** values for your agentic app's OAuth 2.0 flow.
          1. Click **Activate** > **Enable**.
          > **Note:** You can have a maximum of two client secrets active at a time for rotation.
      - **Public/private key**: Recommended for AI agents that have builder-managed key pairs.
          1. Define where your keys are managed:
             - **Okta**: Generate a pubic/private key in Okta for your AI agent.
                1. Click **Add public key**.
                [[style="list-style-type:lower-alpha"]]
                1. Enter your public key, or click **Generate new key**. Okta creates a public key that's associated with a private key that you can view in JSON or PEM.
                1. Click **Copy to clipboard** and use the private key in your AI agent app's OAuth 2.0 flow.
                1. Click **Done**.
             - **External**: Enter the JWKS URI where Okta can dynamically fetch public keys to verify the agent's JWT.
          1. Copy the identifier that appears in the **Client ID** field and use it in your AI agent app. This is the requesting app's client ID that's used for OAuth 2.0.
          1. Click **Activate**, then **Enable**.
      - **Client ID only**: Recommended for public clients that can't store a secret, such as local coding agents.
         1. Copy the identifier that appears in the **Client ID** field and use it in your AI agent app. This is the requesting app's client ID that's used for OAuth 2.0.
         1. Click **Activate**, then **Enable**.

> **Note:** After you register an AI Agent, it appears in the linked app's **Machine Assignments** tab > **Resources** tile. This indicates that the requesting app is ready to begin accessing resources.

### Activate the AI agent

1. On the AI agent page, select **Actions** > **Activate**.

> **Note:** Activating your AI agent can take a few seconds. Wait until you see the "AI agent activated successfully" message before you continue configuring or using your AI agent.

You can also activate the AI agent indirectly by activating the linked requesting app.

1. Go to **Applications and Resources** > **Applications**.
1. Select the **Inactive** tab from the **STATUS** column, and find the linked requesting app that you want to activate.
1. Select **Activate** from the dropdown menu beside your app integration. The AI agent is automatically activated when you activate the linked app.

To deactivate the AI agent:

1. On the AI agent page, select **Actions** > **Deactivate**.

> **Notes:**
> * Deactivating your AI agent can take a few seconds. Wait until you see the "AI agent deactivated successfully" message before you continue with other configurations.
> * If the requesting app that's linked to the AI agent is an OIDC app, it's also deactivated.

### Assign users to the requesting app

Assign users to access the AI agent by assigning them to the linked requesting app.

1. Select your AI agent from the list of **Directory** > **AI Agents**.
1. Click the **User access** tab.
1. Under **User access** > **Users and groups assigned to this agent**, click **Application** > **Assignments**. The **Assignments** tab appears for your linked SSO app.
1. On the **Assignments** tab, select the users or groups who can access the AI agent.
    See [Assign an app integration to a user](https://help.okta.com/okta_help.htm?type=oie&id=ext-lcm-assign-app-user) and [Assign an app integration to a group](https://help.okta.com/okta_help.htm?type=oie&id=ext-lcm-assign-app-groups) in the product documentation.

    > **Note:** Your linked SSO app may initially be inactive, so if you're navigating from the **Applications** page, it may be listed in the **Inactive** tab.

## Configure the resource app

The resource app contains the protected resources that your AI agent can access on behalf of the user.
Create the app integration instance that represents your resource app in Okta before configuring the resource connection.

### Supported resource apps

| &nbsp;  | Custom OIDC app | Custom SAML app | OIN OIDC catalog app | OIN SAML catalog app |
| --- | :---: | :---: | :---: | :---: |
| Resource app |  ✔  |  ✔  |  ✔ Only with XAA functionality |  ✔ Only with XAA functionality |

For each resource app that you want to connect to the AI agent, create a custom or OIN app integration instance in Okta with OIDC or SAML SSO configured. If you use an OIN app as the resource app, it must already have XAA capabilities and have the **Cross App Access** functionality indicator. To configure XAA on a resource app, follow [Configure XAA on an app integration](#configure-xaa-on-an-app-integration).

> **Note:** To create a custom SSO app integration instance, see [Create OpenID Connect app integrations](https://help.okta.com/okta_help.htm?type=oie&id=create-openid-connect-app-integrations) or [Create SAML app integrations](https://help.okta.com/okta_help.htm?type=oie&id=csh-apps-aiw-saml) in the product documentation. To create an OIN app integration instance, see [Add existing app integrations](https://help.okta.com/okta_help.htm?type=oie&id=csh-apps-add-app).

### Configure XAA on an app integration

Configure XAA for an existing SSO app integration instance in Okta:

1. In the Admin Console, go to **Applications and Resources** > **Applications**.
1. Select your SSO resource app.
1. On the **Machine Assignments** tab of your app page, select the **Callers** tile. The **Callers** page appears for you to specify the access method for callers to your resource app.
1. Click **Edit** next to **Cross App Access (XAA)** to enable and configure XAA.
    1. Select **Enable** to grant access to the app through XAA.
    [[style="list-style-type:lower-alpha"]]
    1. Specify the following fields:
        - **Issuer URL**: The base URL of the app's authorization server. Okta uses this URL for token verification requests.
        - **Audience/tenant ID**: A unique identifier or audience claim for the authorization server that protects the resource.
        - **Scopes**: The scopes that the resource app allows the callers to access. Specify one scope in the text field. Click **+ Add** to add more scopes. A maximum of 100 scopes are allowed.
        > **Note:** Specify these fields for custom SSO app instances. For app instances created from the OIN, these fields are set by the vendor. An OIN app without defined scopes indicates that the app doesn't support scopes.
    1. Click **Save**.

## Configure the XAA connection

For each XAA-enbled resource app that you want to connect to your AI agent, configure the connection on the AI agent page:

1. In the Admin Console, go to **Directory** > **AI Agents**.
1. Select an AI agent.
1. Select the **Resource connections** tab.
1. Click **Add resource connection**.
1. From the  **Application** > **Application instance** dropdown, select the XAA-enabled resource app that you configured from [Configure the resource app](#configure-the-resource-app).
    1. Specify the following fields:
        - **{AI_agent_name} client ID registered in {resource_app_name}**: The external client ID of the AI agent registered in the external resource app configuration.
        - **Resource identifier**: Specify the resource identifier specific to the resource app.
        - **Scopes**: Specify the scopes that the AI agent is allowed to request from the resource app.
            - **Allow any scope**: Allows the AI agent to request scopes supported by the resource app vendor. This includes any future scopes that the app may support.
            - **Allow specific scopes**: Restricts the AI agent to a defined allowlist of scopes.
            - **Disallow specific scopes**: Explicitly blocks selected scopes, while allowing all other resource-defined scopes.

1. Click **Add**.

> **Note:** Use of XAA as part of SSO is limited to 250 ID-JAG tokens per user, per resource app, per month. For the purposes of this limit, a "User" must be a licensed "User of Single Sign-On in an Active Status," and the total number of users using XAA can't exceed the org's total purchased SSO users. One ID-JAG token is consumed each time an AI agent uses XAA to access a resource app. If you require ID-JAG token volumes above the limit, contact your Okta account team to subscribe to Okta for AI Agents for a platform-wide agentic identity security solution.

## Resource Server to Machine Assignments

If you configured XAA in Okta before release 2026.09.2, the **Resource Server** tab has been renamed to **Machine Assignments** in both the requesting (client) and resource apps. The **Machine Assignments** tab contains machine or non-human identities that are assigned to the app:

- On the **Machine Assignments** > **Resources** tile, XAA requesting (client) apps request connections to resources they can access. The resource access is established through an AI agent that's linked on this page. All resources are then managed through the linked AI agent.

- On the **Machine Assignments** > **Callers** tile, the machine access method of callers to the app is configured. For XAA resource apps, this is where you configure the authorization server that provides access to your resource app callers.

If your org is subscribed to Okta for AI Agents, the **Machine Assignments** tab is also available in both the requesting (client) and resource apps. The **Machine Assignments** > **Callers** tile also contains the Brokered Consent access method for your resource app callers in Okta for AI Agents.

## Migration from Okta for AI Agent delegation link

If your org is subscribed to Okta for AI Agents and you configured a delegated app for your AI agent prior to release 2026.08.2, the **Delegations** tab has been renamed to **User access** and **Machine access** on the AI agent page. The **User access** tab contains configurations of the users that can access the AI agent, and the **Machine access** tab contains configurations of the AI agent's non-human access.

In Okta for AI Agent orgs, when you delegate an AI agent to an SSO app, it can only act on a user's behalf if the user is signed in to the app. Previously, you can create multiple delegation links for an AI agent under the **Delegations** tab. However, with the new **User access** configuration, you can only allow users to sign in to one SSO app for an AI agent. You can still have multiple non-user delegation links, which now appear in the **Machine access** tab.

> **Note:** The **Machine access** tab is only available if your org is still subscribed to Okta for AI Agents.

In the **User access** configuration, if you have an OIDC SSO app linked to your AI agent, it's assumed that the OAuth client ID and credentials are shared with the OIDC app. If you have a SAML SSO app, the OAuth client ID and credentials belong to the AI agent alone. In both cases, the requesting client ID and credentials appear in the **Client registration** tab in the AI agent page.

If you've previously configured an AI agent with user access delegation links, they now appear as apps in the **User access** tab. On the tab, a "This agent is using an outdated method for user sign-on" warning message appears.

Review the following scenarios to determine if you have to reconfigure your AI agent or user access links:

* If you have a single SAML app as a user-access delegation link for your AI agent, you don't need to reconfigure the AI agent's user access app. Your XAA flow still works with the current configuration.
* If you have a single OIDC app for your AI agent's user-access delegation link, you have two options depending on what configuration you want to preserve.
    * If you want to keep your AI agent configuration and can reconfigure a new OIDC app integration for linking:
        1. Delete your linked app (see [Delete your previous user access apps](#delete-previous-user-access-apps)).
        1. Relink a user access app by selecting the **Create a new OIDC app linked to this agent** option (see [Reconfigure direct user authentication to your AI agent](#reconfigure-direct-user-authentication-to-your-ai-agent)).
    * If you want to keep your OIDC app configuration and can reconfigure the AI agent, [delete and re-register your AI agent](#delete-and-re-register-your-ai-agent) and link to the existing OIDC app.
* If you previously had multiple apps as user-access delegation links, delete the existing user-access apps and recreate only one user-access app for linking. See [Delete your previous user access apps](#delete-previous-user-access-apps), then see [Reconfigure direct user authentication for your AI agent](#reconfigure-direct-user-authentiation-for-your-ai-agent).
* If you want to modify your previous delegation configuration, see [Reconfigure direct user authentication to your AI agent](#reconfigure-direct-user-authentiation-to-your-ai-agent).

### Delete previous user access apps

1. In the Admin Console, go to **Directory** > **AI Agents**.
1. Select an AI agent.
1. Select the **User access** tab.
1. In the **User sign-on** section, click the more icon (![three-dot more icon](/img/icons/odyssey/more.svg)) next to the user-access app that you want to remove, then select **Delete**.

    > **Note:** Perform this step for all the user-access apps you want to remove.

### Reconfigure direct user authentication to your AI agent

1. Go to **Directory** > **AI Agents**.
1. Select an AI agent.
1. Select the **User access** tab, click **Edit**.
1. Under **User access and authentication** > **App assigned to users to access this AI Agent**, select one of:

   * **Create a new OIDC app linked to this AI agent:** To create a custom OIDC app integration instance for users to sign in to access the AI agent. See [Create a new OIDC app linked to this AI agent](#create-a-new-oidc-app-linked-to-this-ai-agent).
   * **Select an existing app:** To select an existing SAML app integration instance in your org for users to sign in to access the AI agent. See [Select an existing app](#select-an-existing-app).

        > **Note:** Currently, you can only select an existing SAML app instance. You can't select an existing OIDC app instance when you edit an existing AI agent.

1. Click **Save**.

### Delete and re-register your AI agent

1. Go to **Directory** > **AI Agents**.
1. Next to your selected an AI agent, click the more icon (![three-dot more icon](/img/icons/odyssey/more.svg)) then select **Deactivate**, if your AI agent was activated.
1. Next to your selected an AI agent, click the more icon (![three-dot more icon](/img/icons/odyssey/more.svg)) then select **Delete**.
1. See [Configure the AI agent (requesting app)](#configure-the-ai-agent-requesting-app) to re-register your AI agent.