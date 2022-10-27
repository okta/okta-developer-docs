---
title: Reference overview
---

> **Try our new API reference beta!** We’ve got a new API reference in the works. With a fresh look and feel, our new API content will be easier to navigate and contribute to. This reference is in BETA and content is continuously being added. [Try it out](https://preview.redoc.ly/oktadev/rchan-content-import-d5936630/) and help us improve the site by [providing feedback](#).

# Reference overview

Details on parameters, requests, and responses for Okta's API endpoints.

## APIs only documented on the new Beta reference

In some cases, APIs have only been documented on the [new Beta reference site](https://preview.redoc.ly/oktadev/rchan-content-import-d5936630/). This section provides a list of those, so they can be found more easily.

* [Agent Pools](https://preview.redoc.ly/oktadev/rchan-content-import-d5936630/openapi/okta-management/management/tag/AgentPools/)

## Core Okta API

The Core Okta API is the primary way that apps and services interact with Okta. You can use it to implement basic auth functions such as signing in your users and programmatically managing your Okta objects.

[Explore core Okta API](/docs/reference/core-okta-api/)

<Cards><Card href="/docs/reference/postman-collections/" cardTitle="Postman Collections" :showFooter=true>Import any Okta API collection for Postman.</Card><Card href="/docs/reference/api/asa/introduction/" cardTitle="Advanced Server Access API" :showFooter=true>Scale your control of servers with automation.</Card></Cards>

## Okta hooks

Okta Event and inline hooks allow you to integrate custom functionality into specific Okta process flows. event hooks send Okta events of interest to your systems as they occur, just like a webhook. inline hooks allow developers to modify in-flight Okta processes with custom logic and data from a non-Okta source. For example, you can migrate users from another data store and keep the user’s current password with a [password inline hook](/docs/reference/password-hook/).

## Okta Expression Language

Expressions allow you to reference, transform, and combine attributes before you store or parse them.

[Learn more](/docs/reference/okta-expression-language/)

## System for Cross-domain Identity Management

SCIM is an industry-standard protocol for automating the exchange of user identity information and is part of the Okta Lifecycle Management feature. For example, as your company onboards employees, new user accounts are created in your application so they can connect immediately. Okta supports SCIM versions 1.1 and 2.0.

[Learn more](/docs/reference/scim/)
