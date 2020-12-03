---
title: Overview
---

This guide provides example code for an external service to respond to calls from a Token Inline Hook.

In the following example, the external service code parses a request from Okta, evaluates the user name against a simple patient data store, and, if the user is part of the patient store, responds to Okta with a command to add a patient ID claim to the token. If the user name is not part of the data store, no action is taken.

At a high-level, the following workflow occurs:

- A user logs into an Okta-Hosted Login application.
- The Okta org authenticates the user and mints an authentication token.
- The Okta Token Inline Hook triggers and sends a request to an external service.
- The external service evaluates the request, and if the user is a patient, adds a patient ID claim to the token.
- The authentication token is directed back to the Okta-Hosted Login application where then user is logged in.

To implement this example, you also need to have an Okta-Hosted Login application that uses an Okta org to authenticate user access. See the following Express.js application, which provides a local application server and sample app: [https://github.com/okta/samples-nodejs-express-4](https://github.com/okta/samples-nodejs-express-4). (See the [next section](/docs/token-inline-hook/setup-express) for further details on this set up.)

This guide also uses the website Glitch.com to act as an external service and to implement the Token Inline hook with an Okta org. See the following Glitch project to copy working code that implements the following example or build your own using the code snippets:

[Okta Token Inline Hook Example](https://open-quiver-puma.glitch.me/)

> **Tip** For another in-depth look at a Token Inline Hook implementation, see the following Developer Experience blog example by Micah Silverman, [Use Okta Token Hooks to Supercharge OpenID Connect](https://developer.okta.com/blog/2019/12/23/extend-oidc-okta-token-hooks)

For further reference data on the Token Inline Hook, see [Token Inline Hook](/docs/reference/token-hook/.

<NextSectionLink/>