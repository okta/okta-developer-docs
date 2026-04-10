---
title: API Integration Actions
meta:
  - name: description
    content: Provides instruction on how to create and integration with API Integration Actions in the Workflows Integration Builder.
---

API Integration Actions enable ISVs to build Okta integrations with capabilities, such as provisioning, entitlement management, and Universal Logout. API Integration Actions are available through the low-code Workflows Integration Builder. These integrations are seamlessly called by Okta for actions like retrieving and updating entitlements or triggering risk-based logout.

The Workflows Integrator Builder is exclusively available in the Okta Integrator Free orgs, and integrates with the OIN wizard submission flow. You can define their your integration metadata in the OIN wizard, which directs you to a preset project within Integrator Builder to build your API integration action flows. After the action flows are defined, you can continue back to the OIN Wizard to validate the flows and submit the integration to the OIN for distrubtion.

After the OIN catalog lists your app integration, your customers can discover and configure it in their own Okta tenant org. Configuration is easy and consistent for your customers because you've already built the integration with the required configuration instructions. Customers trust that integrations in the OIN are secure and reliable because they're verified by Okta.

---

## API service integration benefits

Before the OIN supported API service integrations, Okta API tokens were a common way for integrations to access the Okta management APIs. API service integrations offer improved security and reliability:

| &nbsp; | &nbsp; |
| ------ | ------ |
| **Access granularity** | Using OAuth 2.0 scopes, you can restrict access requests to specific resources instead of all the resources that a user can access. |
| **Configuration experience** | You can discover API service integrations and add them directly from the OIN catalog. You don't need to create a service account or an anonymous activity user for the integration. |
| **Service integration** | Okta API tokens represent a user, which means they're not a great fit for service integrations where user context isn’t needed or desirable. |
| **Reliability** | Okta API tokens expire after 30 days of inactivity or when a user leaves the Okta org. After being authorized, API service integrations can request a new access token whenever necessary and without manual action from an admin. |
| **Rotation** | You must rotate Okta API tokens manually. You can automatically rotate access tokens for API service integration. |

## When to build an API service integration

API service integrations access [Okta management APIs](/docs/reference/core-okta-api/) using OAuth 2.0 and are sometimes referred to as service-to-service or machine-to-machine integrations. This API access represents the app itself rather than a particular user. Consider the following scenarios to determine if you need to build a service-based or a user-based OAuth 2.0 API integration.

| &nbsp; |  Service-based API access | User-based API access |
| ------ | :------------------- | :----------------------- |
| **Use cases** | <ul><li>For auditing purposes, you need to associate log entries with an app name instead of a username.</li> <li>API requests aren't initiated by a user action (for example, a user clicking a button or starting a script).</li> <li>The app that requests API access is hosted on a secure server (this type of app is also known as a confidential client).</li></ul> | <ul><li>A new custom app is configured from a user entry form.</li> <li>An admin user takes action by making API requests.</li></ul> |
| **Examples** | <ul><li>An app that accesses certain types of Okta System Log entries for occasional analysis</li> <li>An app that sends risk signals to Okta</li> <li>An app that occasionally syncs Okta user profile information to another system</li></ul> |  <ul><li>An IT support ticketing system that allows an Okta admin to assign an app directly from the support ticket of the access request</li></ul> |
| **Best-fit API integration** | If these use cases and examples describe your needs, implement an API service integration for the OIN. See [Build an API service integration](/docs/guides/build-api-integration/).  | If these use cases and examples describe your needs, implement a user-based API integration. User-based API integrations aren't supported in the OIN. See [Implement OAuth for Okta](/docs/guides/implement-oauth-for-okta/main/) to learn more about user-based API integrations. |

## Next steps

Ready to get started? Sign up for a free [Okta Integrator Free Plan org](/signup) and see [Build an API service integration](/docs/guides/build-api-integration/).

Post your questions on the [Okta Developer Forum](https://devforum.okta.com/c/questions/oin-submissions/19) if you need help or have an issue.
