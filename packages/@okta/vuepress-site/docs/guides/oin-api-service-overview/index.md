---
title: Overview of API service integrations in the OIN
meta:
  - name: description
    content: Provides an overview of why and when to build API service integrations for the Okta Integration Network.
---

<ApiLifecycle access="ea" />
<!--Need OAUTH_ADMIN_CONSENT_DIALOG FF enabled in monolith org-->

API Service Integrations allow ISVs/customers to build and publish integrations that use Okta’s OAuth management API with ease.

OIN OAuth2 Integrations allows ISV/Customers to build and publish an integration with ease by utilizing Okta’s management API using OAuth.

## When to build an API Service Integration

API Service Integrations access the [Core Okta API](/docs/reference/core-okta-api/) using OAuth 2.0 and are sometimes referred to as service-to-service or machine-to-machine integrations. This API access represents the application itself rather than a particular user.

## When to build an API Service Integration

Consider the following to determine if API Service Integrations are appropriate for your needs:

* For auditing purposes, would it make more sense for the actor in a log entry to be the application rather than a human’s name?
* Are the API requests made without a user taking an action (clicking a button, running a script, and so on)?
* Is the application that will make the requests hosted on a secure server? (this type of application is also known as a confidential client)

Examples of API Service Integration access:

* Accessing certain types of Okta system log entries for occasional analysis
* Sending risk signals to Okta
* Occasionally syncing Okta user profile information to another system

If this describes your needs, then API Service Integrations are a good solution! If not, user-based API access might be a better fit for your needs.

Cases where user-based API access is a better fit than API Service Integrations:

* An IT Support ticketing system integration that allows an Okta admin to assign an application directly from the access request support ticket
* Configuring a new custom application from a form entry

 Learn more about implementing user-based API access by reading [Implement OAuth for Okta](/docs/guides/implement-oauth-for-okta/main/).


## API service integration benefits

Before API Service Integrations, Okta API tokens were a common way for integrations to access the Okta API. API Service Integrations offer improved security and reliability:

| &nbsp; | &nbsp; |
| ------ | ------ |
| **Access granularity** | Using OAuth 2.0 scopes, you can restrict your access request to specific resources instead of all the resources that a user can access. |
| **Configuration experience** | API Service Integrations can be discovered and added directly from the Okta Integration Network catalog, with no need to create and don’t require creating a service account or “dummy user” for the integration. |
| **Service integration** | Okta API tokens represent a user, which means they're not a great fit for service integrations where a user context isn’t needed or desirable. |
| **Reliability** | Okta API tokens expire after 30 days of inactivity or when a user leaves the Okta org. After being authorized, API Service Integrations can fetch a new access token whenever necessary and without manual action from an admin. |
| **Rotation** | Okta API tokens must be rotated manually. API Service Integration access tokens can be rotated programmatically. |

## Choose how to implement your integration

| &nbsp; |  System for Cross-domain Identity Management (SCIM) |  Workflows Connector |
| ------ | :------------------- | :----------------------- |
| **Description** | [SCIM](http://www.simplecloud.info) is the industry standard protocol for managing users and groups in cloud-based systems. It handles basic operations like create, read, update, delete, and search. | [Okta Workflows Connector Builder](https://help.okta.com/okta_help.htm?type=wf&id=ext-connector-builder) is a no-code, if-this-then-that logic builder that Okta customers can use to automate custom or complex employee onboarding and offboarding flows in your application. Publishing a Workflows Connector with Okta allows your customers to deeply integrate your product as part of their lifecycle management flows. |
| **Technology** | <ul><li>JSON-based REST API server implementation</li> <li>Okta supports outbound SCIM requests to your SCIM API service</li> <li>See [SCIM Protocol](/docs/reference/scim/)</li></ul> | <ul><li>Low code development environment</li> <li>See [Okta Workflows](https://help.okta.com/okta_help.htm?type=wf)</li></ul>|
| **Benefits** | <ul><li>Covers the most common lifecycle management needs related to onboarding/offboarding</li> <li>SCIM standard is throughout the industry</li> </ul> | <ul><li>Customers can create highly custom automation with your product without writing code</li> <li>Your product is tightly integrated with Okta</li> </ul>|
| **Get started** | [Build a SCIM Provisioning Integration](/docs/guides/scim-provisioning-integration-overview/) | [Workflows Connector Builder](https://help.okta.com/okta_help.htm?type=wf&id=ext-connector-builder) |


## Submit for review

[ Include code snippets in several languages we support, ultimately SDK examples. ]

## Support

If you need help or have an issue, post a question in the [Okta Developer Forum](https://devforum.okta.com/c/questions/oin-submissions/19).