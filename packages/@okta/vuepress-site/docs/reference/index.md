---
title: Reference overview
---

> **We've got a new API reference in the works!** With a fresh look and feel, our new API content features a more logical navigation and a wider variety of code examples. [Try the beta now](https://developer.okta.com/docs/api/) and help us improve the site by [providing feedback](https://forms.gle/Y9XmNNTF2rPQwive7).

# Reference overview

Details on parameters, requests, and responses for Okta's API endpoints.

## APIs documented only on the new beta reference

In some cases, APIs have only been documented on the [new beta reference site](https://developer.okta.com/docs/api/). This section provides a list of those, so that you can easily find them.

* [Agent Pools](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/AgentPools/#tag/AgentPools)
* [API Service Integrations](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApiServiceIntegrations/)
* [Customized Sign-in Page](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Customization/#tag/Customization/operation/getSignInPage)
* [Customized Sign-out Page](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Customization/#tag/Customization/operation/getSignOutPageSettings)
* [Customized Error Page](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Customization/#tag/Customization/operation/getErrorPage)
* [Group Owners](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Group/#tag/Group/operation/listGroupOwners)

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
