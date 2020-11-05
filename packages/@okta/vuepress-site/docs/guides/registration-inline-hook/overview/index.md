---
title: Overview
---

This guide provides example code for an external service to respond to calls from a Registration Inline hook.

In the following example, the external service code parses requests from Okta and responds to Okta with commands that indicate whether the end user's email domain is valid and allowed to register.

At a high-level, the following workflow occurs:

- A user attempts to self-register for your Okta org.
- A Registration Inline hook fires during this process and sends a call to the exernal service with the user's data.
- The external service evaluates the Okta call to make sure the user is from domain "yourDomain.com".
- The external service responds to Okta with a command to allow or deny the registration based on the email domain.

This guide uses the website Glitch.com to act as an external service and to implement the Registration Inline hook with an Okta org. See the following Glitch project to copy a working code example that implements the Registration Inline hook or build your own using the code snippets:

* [Okta Registration Inline Hook Example](https://okta-inlinehook-registrationhook.glitch.me/)

For further background on the Registration Inline Hook, see:

* [Registration Inline Hook](/docs/reference/registration-hook/) for a complete description of this Inline Hook type.

<NextSectionLink/>
