---
title: Overview
---

This guide provides example code for an external service to respond to calls from the Registration Inline hook. An external service is the customer-provided piece of software that Okta calls when the Registratation Inline hook fires.

* See [Registration Inline Hook](/docs/reference/registration-hook/) for a complete description of this Inline Hook type.

* See [Inline Hooks](/docs/concepts/inline-hooks/) for a general conceptual overview of how Okta Inline Hooks work.

The sample code presented in this guide is meant as a simple demonstration of the steps required for any external service to implement a Registration Inline hook. In the following scenario, the code parses requests from Okta and responds to Okta with commands that indicate whether the end user email domain is valid for registration.

## Support

If you need help or have an issue, post a question in our [Developer Forum](https://devforum.okta.com).

<NextSectionLink/>
