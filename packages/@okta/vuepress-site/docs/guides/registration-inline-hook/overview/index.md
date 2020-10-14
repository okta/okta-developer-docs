---
title: Overview
---

This guide provides example code for an external service to respond to calls from a Registration Inline hook. An external service is the customer-provided software that Okta calls when the Registration Inline hook fires.

In the following example, the external service code parses requests from Okta and responds to Okta with commands that indicate whether the end user's email domain is valid and allowed to register.

This guide uses the website Glitch.me to act as an external service and to implement the Registration Inline hook with an Okta org. However, you can implement this code with your own web server if it is provisioned with HTTPS and with a certificate from a trusted authority.

>**Note:** Okta will not call a non-HTTPS external service endpoint. You must implement HTTPS in order to use Inline Hooks.

For further background on Inline Hooks and the Registration Inline Hook, see:

* [Registration Inline Hook](/docs/reference/registration-hook/) for a complete description of this Inline Hook type.

* [Inline Hooks](/docs/concepts/inline-hooks/) for a general conceptual overview of how Okta Inline Hooks work.

## Support

If you need help or have an issue, post a question in our [Developer Forum](https://devforum.okta.com).

<NextSectionLink/>
