---
title: Overview
---

This guide provides example code for an external service to respond to calls from a Registration Inline Hook.

In the following example, the external service code parses requests from Okta and responds with commands that indicate whether the end user's email domain is valid and allowed to register.

At a high-level, the following workflow occurs:

1. A user attempts to self-register for your Okta org.
1. A Registration Inline Hook fires during this process and sends a call to the external service with the user's data.
1. The external service evaluates the Okta call to make sure the user is from domain "example.com".
1. The external service responds to Okta with a command to allow or deny the registration based on the email domain.

This guide uses the website Glitch.com to act as an external service and to implement the Registration Inline Hook with an Okta org. See the following Glitch project to copy a working code example that implements the Registration Inline Hook, or build your own using the code snippets:

- [Okta Registration Inline Hook Example](https://glitch.com/~okta-inlinehook-registrationhook)

For further background on the Registration Inline Hook, see:

- [Registration Inline Hook](/docs/reference/registration-hook/) for a complete description of this Inline Hook type.

## Support

If you need help or have an issue, post a question on the [Okta Developer Forum](https://devforum.okta.com).

<NextSectionLink/>
