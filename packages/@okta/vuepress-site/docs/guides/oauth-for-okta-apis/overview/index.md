---
title: Overview
---
Most Okta API endpoints require that you include an API token with your request. Currently, this API token takes the form of an SSWS token that you generate in the Admin Console. With OAuth for Okta APIs, you are able to interact with Okta APIs using scoped OAuth 2.0 access tokens. Each access token enables the bearer to perform specific actions on specific Okta endpoints, with that ability dependent on which scopes the access token contains.

Scoped access tokens have a number of advantages, including:
* More granularity for permissions
* Shorter token lifespans
* Can be generated and retrieved using an API

## Prerequisites
To use this guide, you need the following:

* An Okta Developer Edition Org. (Don't have one? Create one for free.)
* The OAUTH2_FOR_OKTA_API feature flag enabled for your Org. Use the [Early Access Features](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Manage_Early_Access_features) page in your Org to enable this feature flag. 
* [Postman client](https://www.getpostman.com/downloads/) to test requests with the access token. This guide uses the Postman client and not the browser-based version, as the browser-based version is deprecated. See [Get Started with the Okta APIs](https://developer.okta.com/code/rest/) for information on setting up Postman. 

> **Note:** At this time, the OAuth for Okta APIs works only with the APIs listed in the <GuideLink link="../supported-endpoints">Supported Endpoints</GuideLink> section.

<NextSectionLink/> 
