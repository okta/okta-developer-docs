---
title: Enable Cross App Access (XAA) - Build a resource app
meta:
  - name: description
    content: Make your API accept authenticated cross-app calls from other apps using a signed-in user's Okta identity.
    date-updated: October 19, 2026
    target persona: ISV developers, IAM-experienced (existing API or OIN integration, familiar with SAML or OAuth 2.0, responding to enterprise governance demand), and IAM beginners (SaaS providers and vibe coders with resource servers). Secondary personas - ISV technical leads, Identity PMs, and partner engineers.
    level: Intermediate
sections:
- main
---

# Enable Cross App Access (XAA): Build a resource app

Make your API accept authenticated cross-app calls from other apps using a signed-in user's Okta identity.

## Introduction

[Cross App Access (XAA)](/docs/concepts/xaa/) lets an app call your API on behalf of a user who is already signed in through Okta, without static API keys or a second sign-in prompt.

As a resource app (such as an API service, web application, or Model Context Protocol (MCP) server), your API handles requests from requesting apps (for example, automation workflows, AI agents, or chat integrations). A requesting app exchanges a signed-in user's Okta identity for a temporary token called an ID-JAG. Your authorization server validates the ID-JAG and issues an access token for your API.

> **Note:** XAA builds on SSO. Your app must already have enterprise SSO configured (OIDC or SAML) for authentication. It may or may not already use Okta as its identity provider. If you're starting from scratch, set up SSO first.

This journey covers the resource app role only. If you are building the app that initiates the call, see [Enable Cross App Access (XAA) for a requesting app](/docs/journeys/XAA-requesting-app).

### What you will accomplish

By the end of this journey:

* Your authorization server accepts incoming XAA requests from requesting apps and returns scoped access tokens.  
* Your authorization server validates incoming ID-JAG tokens and correctly rejects tokens with wrong type, mismatched audience, or insufficient scope.  
* You have a tested, end-to-end XAA flow that passes the xaa.dev conformance tests. 
* Your integration is ready to submit to the OIN catalog through the OIN Wizard, with the xaa.dev conformance log as test evidence.

## Learn

New to Okta? Understand these concepts:

* [**Okta org**](/docs/concepts/okta-organizations/): serves as your central Okta development hub, encapsulating all configurations, users, groups, policies, and other objects that your app uses. 
* [**Identity and Access Management (IAM) overview**](https://developer.okta.com/docs/concepts/iam-overview/): Learn the key issues and concepts for adding identity and access management to your internal and external services.

Understand these before you build:

* [**Cross App Access overview**](https://developer.okta.com/docs/concepts/xaa/)**:** how XAA works and how it layers over OIDC or SAML.  
* [**ID-JAG token**](?tab=t.8e27s81avzan)**:** The token Okta issues to the requesting app. Your authorization server validates its type, audience, and claims before it issues an access token for your API.

```textproto
Protocol Selection: XAA supports both OIDC and SAML implementations. OIDC is recommended for new integrations. Existing SAML implementations do not require protocol migration.
```

## Plan

Verify the following readiness requirements prior to implementation:

* **Existing SSO integration:** XAA is added on top of an existing SSO app integration (OIDC or SAML). If you haven't set up SSO yet, configure a [working SSO integration](https://developer.okta.com/blog/2023/07/28/oidc_workshop) first. 
* **Test environment configuration:** Register an account on [xaa.dev](https://xaa.dev). It acts as the requesting app in the Validate step, and its conformance log is the test evidence for OIN submission.
* **Okta org:** An Okta [Integrator Free Plan](https://developer.okta.com/signup/) org and a user with the super admin role (or the app and org admin roles).

Additional planning considerations:

* Decide which scopes your API exposes and which requesting apps you'll allow initially.  
* Decide what to log per call: requesting app (act.sub), user (sub), scopes, timestamp.  
* Decide your resource authorization server's issuer URL. It becomes the aud claim in every ID-JAG your server receives, and it can't be changed without resetting the XAA connection.

## Build

**Choose your path.** 

1. If you're new to Okta, Build your SSO integration first ([OIDC](https://developer.okta.com/docs/guides/submit-oin-app/openidconnect/main/) or [SAML](https://developer.okta.com/docs/guides/submit-oin-app/saml2/main/)), then follow the steps below. You add Cross App Access in the same OIN Wizard submission.   
2. If your SSO app is already on the OIN, follow the steps below, then extend your existing integration from your OIN Integrations.  
   

If you have your SSO app listed on OIN, follow these steps:

1. [Expose XAA discovery metadata](https://developer.okta.com/docs/guides/xaa-resource-metadata/main/): Publish .well-known/oauth-authorization-server metadata with the two XAA properties and .well-known/oauth-protected-resource (required for MCP servers, recommended for other resource servers), so requesting apps can discover your token requirements.   
2. [Validate the ID-JAG at your authorization server:](https://developer.okta.com/docs/guides/xaa-validate-id-jag/main/) Configure your authorization server to accept the ID-JAG (jwt-bearer grant type), validate it, and issue a scoped access token.   
3. [Validate access tokens at your API](https://developer.okta.com/docs/guides/validate-access-tokens/dotnet/main/): Your API validates the access token your authorization server issues, as it does for any other token. If you already do this, no change is needed.    
4. [Enable XAA on your resource app and add a connection:](https://developer.okta.com/docs/guides/xaa-agent-to-app/main/#configure-the-resource-app) In the [Admin Console](https://developer.okta.com/docs/guides/xaa-agent-to-app/main/#configure-the-resource-app), enable XAA on your resource app, then add a [resource connection](https://developer.okta.com/docs/guides/xaa-agent-to-app/main/) so xaa.dev can reach it. For SAML apps, set the Name ID format to EmailAddress. 

```
Important: - Your API's audience URL must match the requesting app's configuration exactly, including trailing slashes. A mismatch is a primary cause of token validation failures.- Do not issue refresh tokens for XAA exchanges. Requesting apps are required to submit a fresh ID-JAG upon access token expiration.
```

## Validate

Test your flow end to end on [xaa.dev](https://xaa.dev), which acts as the requesting app. Run the tests until Conformance passed appears, then export the JSON conformance log. For OIN submission, follow the xaa.dev testing steps in the [OIN submission guide](https://developer.okta.com/docs/guides/submit-oin-app/scrossapp/main/). If a test fails, see Error handling and troubleshooting in the [ID-JAG validation guide](https://developer.okta.com/docs/guides/xaa-validate-id-jag/main/). 

## Go further

Congratulations, your API is now XAA-enabled. Here's how to expand your integration and reach enterprise customers:

* [Publish your Cross App Access (XAA) integration on Okta Integration Network (OIN)](https://developer.okta.com/docs/guides/submit-oin-app/scrossapp/main/): Submit through the OIN Wizard to make your app discoverable by Okta customers.  
* [Build a requesting app](https://docs.google.com/document/d/19_S6RlIkkKNWXlrhuDghlUw2TbOhEgEQlascjyCh1N8/edit?tab=t.0): make your app call another app's APIs on behalf of a signed-in user.  
* [Add SCIM provisioning](https://developer.okta.com/docs/guides/scim-provisioning-integration-overview/main/): Automate user lifecycle management alongside SSO and XAA so admins can manage your app's users entirely from Okta.  
* [Implement Universal Logout](https://developer.okta.com/docs/guides/oin-universal-logout-overview/): End user sessions across connected apps in real time when Okta fires a security event.   
* [Protect your integration with DPoP](https://developer.okta.com/docs/guides/dpop/nonoktaresourceserver/main/): Bind access tokens to the client's key pair so an intercepted token is useless without it.