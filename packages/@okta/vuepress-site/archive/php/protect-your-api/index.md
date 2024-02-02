---
title: Protect your API endpoints
excerpt: Configure your Okta org and your server-side application to secure your API endpoints.
language: PHP
integration: back-end
icon: code-php
layout: Guides
meta:
  - name: robots
    content: noindex, nofollow
---

> **Info**: PHP is no longer a supported language at Okta, and this article is no longer updated.

Add a layer of authorization to your web services with [Okta API Access Management](/docs/concepts/api-access-management/).

---

**Learning outcomes**

* Configure a web API to use Okta
* Define which endpoints require authorization and which don't
* Enable Cross-Origin Resource Sharing (CORS) for the API
* Test the API is secure

**What you need**

* An [Okta Developer Edition org](https://developer.okta.com/signup/)
* [Postman](https://www.getpostman.com/apps) to test the API
* <StackSnippet snippet="whatyouneed" />

**Sample code**

<StackSnippet snippet="samplecode" />

> **Note**: Several standalone tools can send requests to APIs and allow you to inspect the responses. Our documentation uses **Postman** and offers [Postman Collections](/docs/reference/postman-collections/) to test its APIs more efficiently with a GUI. It also includes HTTP requests as text for those who prefer to use a terminal utility such as [cURL](https://curl.se/download.html).

---