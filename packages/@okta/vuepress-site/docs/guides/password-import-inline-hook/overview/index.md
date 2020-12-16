---
title: Overview
---

This guide provides example code for an external service to respond to calls from a Password Import Inline Hook.

In the following example, the external service code parses requests from Okta and responds to Okta with commands that indicate whether the end user's credentials are valid. If the credentials are valid, the password is imported into the Okta org.

At a high level, the following workflow occurs:

- User profiles are imported into an Okta org that use the Password Import Inline Hook.
- The Password Import Inline Hook triggers on first sign-in request by a user.
- The external service evaluates the user credentials from the Password Import Inline Hook request against the data store.
- If the credentials are verified, the external service responds to Okta with a command to import the password and sign in the user.
- If the credentials are not verified, the user is not signed-in and the password does not import.

This guide uses the website Glitch.com to act as an external service and to implement the Password Import Inline hook with an Okta org. See the following Glitch project to copy working code that implements the following example or build your own using the code snippets:

* [Okta Password Import Inline Hook Example](https://glitch.com/~okta-passwordimport-inlinehook)

> **Tip:** For another in-depth look at a Password Import Inline Hook implementation, see the following Developer Experience blog example by Heather Wallander, [Migrate user Passwords with Okta's Password Hook](https://developer.okta.com/blog/2020/09/18/password-hook-migration).

For further reference data on the Password Import Inline Hook, see: [Password Import Inline Hook](/docs/reference/password-hook/).

<NextSectionLink/>