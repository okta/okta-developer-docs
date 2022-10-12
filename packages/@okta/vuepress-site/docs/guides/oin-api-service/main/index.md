---
title: Build an API Service Integration
excerpt: Learn how to build and register an API Service Integration to the Okta Integration Network.
layout: Guides
---
<ApiLifecycle access="ea" />

This guide explains how to register and submit an API Service Integration to the Okta Integration Network for review and publishing.

---

**Learning outcomes**

* Learn how to build an API Service Integration that can be published in the OIN.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup)

> **Note:** At this time, OAuth for Okta only supports the APIs listed in the [Scopes and supported endpoints](/docs/implement-oauth-for-okta/main/#scopes-and-supported-endpoints). We're working towards supporting scopes for all Okta API endpoints.

---

## When to build an API Service Integration

API Service Integrations access the [Core Okta API](/docs/reference/core-okta-api/) using OAuth 2.0 and are sometimes referred to as service-to-service or machine-to-machine integrations. This API access represents the application itself rather than a particular user.

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

## Benefits of API Service Integrations

Before API Service Integrations, Okta API tokens were a common way for integrations to access the Okta API. API Service Integrations offer improved security and reliability:

* **Access granularity**: Using OAuth 2.0 scopes, you can restrict your access request to specific resources instead of all the resources that a user can access.

* **Configuration experience**: API Service Integrations can be discovered and added directly from the Okta Integration Network catalog, with no need to create and don’t require creating a service account or “dummy user” for the integration.
