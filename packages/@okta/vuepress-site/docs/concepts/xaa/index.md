---
title: Cross-app access (XAA)
---

## What is Cross-app access?

Cross-app access (XAA) is a mechanism that enables apps to securely connect to third-party resource apps protected by an external authorization server. The app’s identity provider establishes a trust relationship with the external resource authorization server to support cross-domain authorization. XAA implements an extension of OAuth 2.0 to support authorization across domains called the [Identity Assertion JWT Authorization Grant (ID-JAG)](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-identity-assertion-authz-grant) flow.

### The problem Cross-app access solves

Traditional external resource authorization methods (such as API authorization) create security and operational challenges in enterprise environments:

* **Limitations of static API keys and standard OAuth**: Static key and direct app-to-app OAuth flows lack end user context, grant overly broad permissions, and operate outside central identity governance.
* **Benefits for enterprise customers**: XAA provides centralized governance, unified policy enforcement, and audit logging for every cross-app access request.
* **Benefits for end users**: Users sign in once through their primary IdP and seamlessly access connected tools without encountering repetitive authentication prompts.
* **Benefits for ISV developers**: Independent software vendors (ISVs) can meet enterprise security requirements faster, reducing friction in sales cycles. They can build their cross-app access integration once and reuse it for their customers.

## Use cases

Cross-app access (XAA) addresses critical security, compliance, and user-experience challenges across modern enterprise SaaS environments. By shifting authorization decisions from end users to enterprise IT administrators, XAA replaces static API keys and interactive consent prompts with a central identity policy.

### AI agent-to-app

AI agents that act on behalf of users require access to third-party SaaS apps and internal databases. Traditional authorization methods that force users to complete individual OAuth consent pages or embedding static API keys fail to scale in enterprise settings and introduce security vulnerabilities.

XAA integrates directly with AI agent frameworks and server standards, such as the Model Context Protocol (MCP). It enables AI assistants to perform complex, multi-app actions while preserving the signing user's identity context.

Common AI agent scenarios include:

* **Cross-tool project aggregation**: An AI assistant (such as Claude or Cursor) compiles a project status report by retrieving milestones from project management platforms (such as Asana or Linear), pulling technical documentation (such as Atlassian Confluence), inspecting designs (such as Figma), and analyzing meeting notes (such as Zoom or Granola).
* **Automated developer operations**: Developer tools and code editors (such as Visual Studio Code or Cursor) query container registries (such as Docker), inspect cloud app performance metrics (such as Datadog), or query production databases (such as Supabase) using the engineer's scoped user identity.
* **Enterprise AI search**: Federated AI search tools (such as Glean) retrieve internal company records from connected cloud services only when the end user has active permissions, preventing data leakage across organizational boundaries.

### App-to-app

Business apps need to share data and trigger workflows across identity service boundaries. Traditional app-to-app integrations rely either on user-managed OAuth authorization flows (which interrupt employees with consent pages) or static API keys and shared service accounts (which lack user context and bypass enterprise IT policy).

Cross-app access (XAA) extends enterprise identity governance to direct app-to-app data exchange. When a user interacts with a requesting SaaS app, XAA allows that app to securely access APIs in a separate target app on the user's behalf (without prompting the user and without using static shared secrets).

Common app-to-app integration scenarios include:

* **Messaging and productivity synchronization**: A team collaboration app (such as Zoom) accesses an enterprise notification API (such as Slack) on another resource server, sending action items and notifications to employees.
* **Project management and issue tracking**: A project planning platform (such as Asana or Linear) pulls live issue statuses, customer details, or pull request updates from developer and CRM tools (such as Jira, Salesforce, or GitHub) under the context of the active team member.
* **Automated workflow execution**: An enterprise integration platform (such as Zapier or Workato) triggers multi-step actions across connected HR, payroll, and IT ticketing tools while preserving the identity of the employee who initiated the request for compliance and auditing.

## How Cross-app access works

Cross-app access support authorization chaining across domains by implementing the Identity Assertion JWT Authorization Grant (ID-JAG) flow. See [Identity Assertion JWT Authorization Grant](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-identity-assertion-authz-grant) and [OAuth Identity and Authorization Chaining Across Domains](https://datatracker.ietf.org/doc/draft-ietf-oauth-identity-chaining/).

### Roles and responsibilities

Cross-app access defines these roles:

* **Requesting app**: The client app that accesses a protected resource on behalf of the authenticated user. This is the app that initiates the API calls to the external service.
* **Resource app**: The app that contains the protected resource data
* **IdP**: The identity provider that issues the ID-JAG based on a trusted relationship between a requesting app and a resource app. With Okta as the IdP, the Okta admin manages this trusted relationship (connection) in Okta. The Okta authorization server issues the ID-JAG only for scoped access allowed in that relationship.
* **Resource authorization server**: The authorization server that’s protecting the resource app. It validates incoming ID-JAG assertions and issues scoped access tokens in accordance with local access control policies.

<div class="three-quarter">

![XAA token exchange flow](/img/concepts/xaa-generic-flow.png)

</div>
<!--
See http://www.plantuml.com/plantuml/uml/
@startuml
participant WebApp as "Client (requesting app)"
participant OAS as "IdP (Okta)"
participant CAS as "Resource authorization server"
participant RS as "Resource server (resource app)"
WebApp -> OAS: 1. User SSO
OAS -> WebApp: 2. ID token
WebApp -> OAS: 3. Token exchange with ID token
OAS -> WebApp: 4. Returns ID-JAG
WebApp -> CAS: 5. Token exchange with ID-JAG
CAS -> CAS: 6. ID-JAG validation through SSO trust relationship with resource app
CAS -> WebApp: Returns access token for resource app
WebApp -> RS: 7 Resource request with access token (such as API requests)
RS -> WebApp: Returns resource data
@enduml
-->

The XAA token exchange flow:

1. **User SSO**: The user signs in to the requesting app through the IdP using standard SSO.
1. **ID token issued**: The IdP returns an ID token.
1. **Token exchange for ID-JAG**: The client exchanges its user session credential or refresh token at the IdP authorization server to obtain an Identity Assertion JWT Authorization Grant (ID-JAG) token.
1. **ID-JAG token issuance**: The IdP authorization server issues an ID-JAG token to the client if the client has a trusted connection to the resource server.
1. **Token exchange with ID-JAG**: The client presents the ID-JAG token to the target resource app's custom authorization server.
1. **Resource access token issuance**: The resource authorization server validates the assertion and issues a short-lived, scoped resource access token.
1. **Client accesses resource data**: The requesting client then uses the short-lived, scoped token to access the protected resource app on behalf of the user.

## When to use Cross-app access

Use Cross-app access when your app meets the following criteria:

* **Human user in the loop**: The Cross-app access flow (API interaction) originates from an active human user session.
* **Existing SSO infrastructure**: Your organization or app already integrates with an enterprise IdP for authentication.
* **Enterprise or AI agent integration**: You’re an ISV responding to enterprise security requirements or building AI agents and tools that require delegated user access to third-party services.

## When not to use Cross-app access

Don’t use Cross-app access in the following scenarios:

* **Autonomous agents**: Workflows that run independently without an active user session or human initiation.
* **Background processing**: Scheduled background jobs, batch scripts, or machine-to-machine (M2M) processes operating without an end-user context.
* **Apps without an IdP**: Apps that don’t integrate with a central identity provider.

## Cross-app access in Okta

Okta implements Cross-app access with the following requesting and resource app configurations.

### Requesting app

Okta supports requesting apps that use the following protocols for SSO:

* **OpenID Connect (OIDC)**: Recommended for new integrations and modern app architectures.
* **SAML 2.0**: Supported for existing enterprise federations, allowing organizations to adopt XAA without migrating legacy authentication flows. For this protocol, Okta allows your requesting app to request an ID-JAG based on a refresh token exchange using your SAML assertion. See [Enable Your SAML Requesting App for Cross-app access](https://developer.okta.com/blog/2026/07/17/xaa-saml-requester#xaa-implementation-checklist-for-saml-federated-applications)

For independent software vendors (ISVs) that want to build cross-app access capabilities on top of their existing SSO  app integration in the Okta Integration Network (OIN), see this journey for creating a requesting app:

* **[Build a requesting app]**: Follow the requesting app journey if your app needs to access an external resource app on behalf of signed-in users.

For the AI agent-to-app use case, follow this guide to connect an AI agent bound to an existing OIN agent app with SSO capabilities: [Add AI agents manually](https://help.okta.com/oie/en-us/Content/Topics/ai-agents/ai-agent-add-manually.htm). For this configuration, select the OIN agent app in the **Delegations** tab of the AI agent page.

### Resource apps

Okta supports resource apps that use the following protocols for SSO:

* **OpenID Connect (OIDC)**: Recommended for new integrations and modern app architectures.
* **SAML 2.0**: Supported for existing enterprise federations, allowing organizations to adopt XAA without migrating legacy authentication flows.For this protocol, your resource authorization server must validate the ID-JAG and resolve the SAML `nameid` assertion. See [Enabling Cross-App Access for SAML-Based Resource Apps](https://developer.okta.com/blog/2026/07/03/cross-app-access-saml)

For independent software vendors (ISVs) that want to build cross-app access capabilities on top of their existing SSO app integration in the Okta Integration Network (OIN), see this journey for creating a requesting app:

* **[Build a resource app]**: Follow the resource app journey if your app exposes APIs that need to accept incoming XAA authorization requests.

For the AI agent-to-app use case, follow this guide to connect a resource app to an existing AI agent: [Connect AI agents to resources](https://help.okta.com/oie/en-us/content/topics/ai-agents/ai-agent-connected-resource.htm). For this configuration, select **Application** as the resource type.
