---
title: Overview
---

This guide is about coding an external service to respond to calls from the Password Import Inline Hook. An external service is the customer-provided piece of software that Okta calls when the Inline Hook fires.

* See [Password Import Inline Hook](/docs/reference/password-hook/) for a complete description of this Inline Hook type.

* See [Inline Hooks](/docs/concepts/inline-hooks/) for a general conceptual overview of how Okta Inline Hooks work.

The sample code presented in this guide is meant as a demonstration of the steps any external service for the Password Import Inline Hook needs to implement: parsing requests from Okta, looking up received end user credentials in an existing user store, and responding to Okta with commands that indicate whether the end user credentials are valid.

## Support

If you need help or have an issue, post a question in our [Developer Forum](https://devforum.okta.com).

<NextSectionLink/>
