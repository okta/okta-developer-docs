---
title: Token Inline Hook
excerpt: Learn how to easily implement a Token Inline hook
layout: Guides
---

<StackSelector />

This guide provides a working example of an Okta Token Inline Hook. It uses the website [Glitch.com](https://glitch.com) to act as an external service and receive and respond to Token Inline Hook calls.

---

**Learning outcomes**

* Understand the Okta Token Inline Hook calls and responses.
* Implement a simple working example of a Token Inline Hook with a Glitch.com project, which acts as an external source.
* Test the Token Inline hook.

**What you need**

* A [Glitch.com](https://glitch.com) project or account to act as an external service.
* An Okta developer org. [Create an org for free](https://developer.okta.com/signup/).
* A Node.js Express framework sample application. This guide works with the sample application in the Sample code section below.

**Sample code**

* [Okta Token Inline Hook Example](https://glitch.com/edit/#!/okta-inlinehook-tokenhook)
* [Express Sample Applications for Okta](https://github.com/okta/samples-nodejs-express-4)

---

The Token Inline Hook can be used to customize the authorization code flow that occurs between an application and the Okta org used for authentication.

This guide provides example code for an external service to respond to calls from a Token Inline Hook, and provides an end-to-end scenario using a local application, an Okta org, and the external service.

### The Scenario

In the following Token Inline Hook scenario, the external service code parses a request from Okta, evaluates the user name against a simple patient data store, and, if the user is a patient, responds to Okta with a command to add a patient ID claim to the token. If the user is not part of the data store, no action is taken. The token is returned to the local application for authentication.

At a high-level, the following workflow occurs:

* A user logs into an Okta-Hosted Login sample application.
* The Okta org authenticates the user and mints an authentication token.
* The Okta Token Inline Hook triggers and sends a request to an external service.
* The external service evaluates the request, and if the user is a patient, adds a patient ID claim to the token.
* The authentication token is directed back to the Okta-Hosted Login application where the user is signed in.

> **Tip:** For another in-depth look at a Token Inline Hook implementation, see the following Developer Experience blog example by Micah Silverman, [Use Okta Token Hooks to Supercharge OpenID Connect](https://developer.okta.com/blog/2019/12/23/extend-oidc-okta-token-hooks).

## Set up the sample Express application

The sample Node.js Express application is designed to demonstrate the [Authorization Code flow](/docs/guides/implement-grant-type/authcode/main/), and includes an Okta-Hosted Login sample used in this Token Inline Hook guide. Access the code from the following Github repository:

* [Express Sample Applications for Okta](https://github.com/okta/samples-nodejs-express-4)

Follow the [README.md](https://github.com/okta/samples-nodejs-express-4/tree/master/okta-hosted-login) instructions to install and run the Okta-Hosted Login sample application with your Okta org. Make sure to have this application running before proceeding with the Token Inline Hook setup.
