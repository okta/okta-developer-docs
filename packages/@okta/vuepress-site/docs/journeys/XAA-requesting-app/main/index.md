---
title: Enable Cross App Access (XAA) - Build a requesting app
meta:
  - name: description
    content: Add Cross App Access to your integration so it can call another app's APIs using a signed-in user's Okta identity.
    date-updated: October 19, 2026
    target persona: ISV developers - IAM beginners (MCP developers, AI agent builders, vibe coders, and new ISVs inspired by Anthropic) and IAM-experienced (already on OIN, familiar with SAML or OAuth 2.0, responding to enterprise demand). Secondary personas - ISV technical leads, Identity PMs, and partner engineers.
    level: Intermediate
sections:
- main
---

# Enable Cross App Access (XAA): Build a requesting app

Let your app access another app's APIs on behalf of a signed-in user. No separate authentication prompts and no static secrets.

## Introduction

[Cross App Access (XAA)](/docs/concepts/xaa/) lets your app call another app's API on behalf of a user who is already signed in through Okta, without static API keys or a second sign-in prompt. As a requesting app, your app signs the user in through SSO (OIDC or SAML), exchanges that sign-in for an ID-JAG from Okta, and redeems the ID-JAG at the resource app's authorization server for a scoped access token. In Okta, a requesting app is registered as an AI agent.

> **Notes:**
> - This journey assumes that your app already has OIDC or SAML SSO set up. You're adding the XAA token exchange on top.
> - Starting from scratch? Set up SSO first.
> - This journey covers apps with a human user in the loop. It doesn't cover autonomous agents or background jobs.

This journey covers the requesting app role. If you are building an API that accepts incoming XAA calls, see [**Enable Cross App Access (XAA) for a resource app**](/docs/journeys/XAA-resource-app/main/).

## What you will accomplish

By the end of this journey:

* Your app can sign a user in and complete the full XAA token exchange, from authentication through ID-JAG to a scoped resource access token.
* You can see the token exchange working end-to-end in the Okta system log, and any enterprise logging tool can capture the same events.
* You have a tested, end-to-end XAA flow that passes the xaa.dev conformance tests.
* Your integration is ready to submit to the OIN catalog through the OIN Wizard, with the xaa.dev conformance log as test evidence.

## Learn

New to Okta? Understand these concepts:

* [Okta org](/docs/concepts/okta-organizations/): serves as your central Okta development hub, encapsulating all configurations, users, groups, policies, and other objects that your app uses.
* [Identity and Access Management (IAM) overview](/docs/concepts/iam-overview/): Learn the key issues and concepts for adding identity and access management to your internal and external services.

Understand these before you build:

* [Cross App Access overview](/docs/concepts/xaa/): how XAA works and how it layers over OIDC or SAML.
* [ID-JAG token](/docs/guides/xaa-request-token-ex/openidconnect/main/): The assertion Okta issues when you exchange your sign-in token (an ID token or a refresh token). You redeem it at the resource app's authorization server for an access token.

## Plan

Before you write any code, ensure you have:

- **Existing SSO integration:** XAA is added on top of an existing SSO app integration (OIDC or SAML). If you haven't set up SSO yet, configure a [working SSO integration](https://developer.okta.com/blog/2023/07/28/oidc_workshop) first.
- **Understand your requesting app architecture:** In Okta, your requesting app uses an SSO integration (OIDC or SAML) for user sign-in and an AI agent to sign token exchange requests. Link the agent to your SSO app in the Admin Console.
- **Check your IdP/CIAM provider:** Verify WorkOS, Auth0, or custom CIAM solutions support RFC 8693 token exchange. For homegrown CIAM, plan the necessary changes to support the [token exchange spec](https://developer.okta.com/docs/guides/xaa-request-token-ex/openidconnect/main/).
- **Design your scope handling:** Scopes are defined by the resource app. Decide which scopes your app requests, and make sure the resource connection on your AI agent allows them.
- **Test environment:** Register an account on [xaa.dev](https://xaa.dev). It acts as the resource app and authorization server for your tests, and its conformance log is the test evidence for OIN submission.
- **Okta org:** An Okta [Integrator Free Plan](https://developer.okta.com/signup/) org and a user with the super admin role (or the app and org admin roles).

> **Note:** The audience URL and resource app identifier must match exactly. Mismatches commonly cause token validation failures.

## Build

 Your SSO integration is already set up. These steps add XAA on top:

1. [**Register your requesting app as an AI agent**](/docs/guides/xaa-agent-to-app/main/#configure-the-ai-agent-requesting-app): In the Admin Console, register an AI agent, link it to your SSO app, set its client registration method, and add a [resource connection](https://developer.okta.com/docs/guides/xaa-agent-to-app/main/) to the resource app.
2. **Implement token exchange:** Authenticate the user through SSO, exchange their session for an ID-JAG at Okta's authorization server, and redeem it at the resource app's authorization server for an access token. OIDC apps exchange an ID or refresh token, while SAML apps swap their assertion for a refresh token first. See the [OIDC token exchange guide](/docs/guides/xaa-request-token-ex/openidconnect/main/) and the [SAML token exchange guide](/docs/guides/xaa-request-token-ex/saml2/main/).
3. **Make the API call:** Include the resource access token in the Authorization header: `Authorization: Bearer {resource-access-token}`
4. [**Handle token expiration**](/docs/guides/xaa-request-token-ex/openidconnect/main/): When the access token expires, request a new ID-JAG from your ID token or refresh token and redeem it again. If Okta returns `invalid_grant`, the user must sign in again. Don't request a refresh token from the resource app.
5. **Get the resource app's details:** Find the resource app's authorization server issuer URL and resource identifier in its metadata or docs. Use these as the audience and resource values during token exchange. See [Expose XAA metadata for your resource app](/docs/guides/xaa-resource-metadata/main/).

## Validate

Test your flow end to end on [xaa.dev](https://xaa.dev), which acts as the resource app and its authorization server. Run the tests for your protocol until Conformance passed appears, then export the JSON conformance log.

For OIN submission, follow the xaa.dev testing steps in the [OIN submission guide](/docs/guides/submit-xaa-app/main/). If an exchange fails, see the [Troubleshoot](/docs/guides/xaa-request-token-ex/openidconnect/main/#troubleshoot) section of the token exchange guide.

## Go further

Congratulations, your requesting application is now XAA-enabled. Here's how to expand your integration and reach enterprise customers:

*  [**Publish your Cross App Access (XAA) Connections on Okta Integration Network (OIN**](/docs/guides/submit-xaa-app/main/): Submit through the OIN Wizard, choosing the client app role, to make your app discoverable by Okta customers.
* [**Build a resource app:**](/docs/journeys/XAA-resource-app/main/) allow your API to accept incoming XAA calls from other apps.
* [**Add SCIM provisioning**](/docs/guides/scim-provisioning-integration-overview/main/): Automate user lifecycle management alongside SSO and XAA so admins can manage your app's users entirely from Okta.
* [**Implement Universal Logout**](/docs/guides/oin-universal-logout-overview/): End user sessions across connected apps in real time when Okta fires a security event.
* [**Add custom claims to the ID-JAG token**](https://www.ietf.org/archive/id/draft-ietf-oauth-identity-assertion-authz-grant-04.html#name-introduction): Configure Okta's auth server to include app-specific claims for fine-grained access control.
