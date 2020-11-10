---
title: Overview
---

Most Okta API endpoints require that you include an API token with your request. Currently, this API token takes the form of an SSWS token that you generate in the Admin Console. With OAuth for Okta, you are able to interact with Okta APIs using scoped OAuth 2.0 access tokens. Each access token enables the bearer to perform specific actions on specific Okta endpoints, with that ability controlled by which scopes the access token contains.

> **Important:** You request an access token by making a call to your Okta [Org Authorization Server](/docs/concepts/auth-servers/#org-authorization-server) `/authorize` endpoint. Only the Org Authorization Server can mint access tokens that contain Okta API scopes. See [Which authorization server should you use](/docs/concepts/auth-servers/#which-authorization-server-should-you-use).

Scoped access tokens have a number of advantages, including:

* More access granularity
* Shorter token lifespans
* Can be generated and retrieved using an API

## Prerequisites

To use this guide, you need the following:

* An Okta developer org. [Create an org for free](https://developer.okta.com/signup).
* [Postman client](https://www.getpostman.com/downloads/) to test requests with the access token. See [Get Started with the Okta APIs](https://developer.okta.com/code/rest/) for information on setting up Postman.

> **Note:** At this time, OAuth for Okta works only with the APIs listed in the <GuideLink link="../scopes">Scopes and supported endpoints</GuideLink> section. We are actively working towards supporting additional APIs. Our goal is to cover all public Okta API endpoints.

## Support

If you need help or have an issue, post a question in our [Developer Forum](https://devforum.okta.com).

<NextSectionLink/>
