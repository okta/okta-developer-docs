---
title: API service integrations in the OIN
meta:
  - name: description
    content: Provides an overview of why and when to build API service integrations for the Okta Integration Network.
---

<ApiLifecycle access="ea" />

<!-- Need OAUTH_ADMIN_CONSENT_DIALOG FF enabled in monolith org -->

An API service integration allows you to build and publish service integrations that can access your customer's Okta org through [Okta's core management APIs](/docs/reference/core-okta-api/) using OAuth 2.0.

Previously, if you have a service app requiring Okta management API access, you need to use an API token that was tied to a specific Okta user and can't restrict access to certain resources. With an OAuth API service integration, your service app can have secure, reliable, and granular access to Okta APIs without being tied to a user.

When your service app integration is in the Okta Integration Network (OIN), your customers can discover and configure your integration through the OIN catalog in their own Okta tenant org. Configuration is easy and consistent for your customers because you've already done the hard work by building the integration with the required configuration instructions. Customers trust that integrations in the OIN are secure and reliable because it's Okta verified.

## When to build an API service integration

API service integrations access the [Core Okta API](/docs/reference/core-okta-api/) using OAuth 2.0 and are sometimes referred to as service-to-service or machine-to-machine integrations. This API access represents the application itself rather than a particular user. Consider the following scenarios to determine if you need to build a service-based or a user-based OAuth API integration.

| &nbsp; |  Service-based API access | User-based API access |
| ------ | :------------------- | :----------------------- |
| **Use cases** | <ul><li>For auditing purposes, would it make more sense for the actor in a log entry to be the application rather than a human’s name?</li> <li>Are the API requests made without a user taking an action (clicking a button, running a script, and so on)?</li> <li>Is the application that will make the requests hosted on a secure server? (this type of application is also known as a confidential client)</li></ul> | <ul><li>Configure a new custom application from a form entry</li> <li>API requests made by an admin user taking an action</li></ul> |
| **Examples** | <ul><li>Accessing certain types of Okta system log entries for occasional analysis</li> <li>Sending risk signals to Okta</li> <li>Occasionally syncing Okta user profile information to another system</li></ul> |  <ul><li>An IT Support ticketing system integration that allows an Okta admin to assign an application directly from the access request support ticket</li></ul> |
| **Best-fit API integration** | If these use cases and examples describe your needs, then implementing an API service integration for the OIN is a best-fit solution. See [Build an API service integration](/docs/guides/build-api-service-integration/).  | If these use cases and examples describe your needs, then implementing a user-based API integration is a better solution. User-based API integrations aren't currently supported in the OIN. See [Implement OAuth for Okta](/docs/guides/implement-oauth-for-okta/main/) to learn more about user-based API integrations. |

## API service integration benefits

Before API Service Integrations, Okta API tokens were a common way for integrations to access the Okta API. API Service Integrations offer improved security and reliability:

| &nbsp; | &nbsp; |
| ------ | ------ |
| **Access granularity** | Using OAuth 2.0 scopes, you can restrict your access request to specific resources instead of all the resources that a user can access. |
| **Configuration experience** | API Service Integrations can be discovered and added directly from the Okta Integration Network catalog, with no need to create and don’t require creating a service account or “dummy user” for the integration. |
| **Service integration** | Okta API tokens represent a user, which means they're not a great fit for service integrations where a user context isn’t needed or desirable. |
| **Reliability** | Okta API tokens expire after 30 days of inactivity or when a user leaves the Okta org. After being authorized, API Service Integrations can fetch a new access token whenever necessary and without manual action from an admin. |
| **Rotation** | Okta API tokens must be rotated manually. API Service Integration access tokens can be rotated programmatically. |

## Next steps

Ready to get started? See [Build an API service integration](/docs/guides/build-api-service-integration/).

Post your questions on the [Okta Developer Forum](https://devforum.okta.com/c/questions/oin-submissions/19) if you need help or have an issue.
