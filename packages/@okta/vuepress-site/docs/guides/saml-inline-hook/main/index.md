---
title: SAML Assertion inline hook
excerpt: Learn how to easily implement a SAML Assertion inline hook
layout: Guides
---

This guide provides a working example of an Okta SAML Assertion inline hook. It uses the website [Glitch.com](https://glitch.com) to act as an external service to receive and respond to SAML Assertion inline hook calls.

---

**Learning outcomes**

* Understand the Okta SAML Assertion inline hook calls and responses.
* Implement a simple working example of a SAML Assertion inline hook with a Glitch.com external service.
* Preview and test the SAML Assertion inline hook.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup/)
* [Glitch.com](https://glitch.com) project or account
* A sample application that uses SAML to implement authentication. This guide works with the application in the Sample code section below.

**Sample code**

* [Okta SAML Assertion Inline Hook Example](https://glitch.com/edit/#!/okta-inlinehook-samlhook)
* [Spring Boot, SAML, and Okta](https://github.com/oktadev/okta-spring-boot-saml-example)

---

## About SAML assertion inline hook implementation

The SAML Assertion Inline Hook can be used to customize the authentication workflow that occurs between an application and the Okta org, which functions as the Identity Provider (IdP).

This guide provides an end-to-end scenario using a SAML-authenticated application and an Okta org, and includes example code for an external service to respond to calls from a SAML Assertion Inline Hook triggered during the authentication workflow.

In the following scenario, the external service code parses a request from Okta, evaluates the user name against a simple patient data store, and, if the user is part of the patient store, responds to Okta with a command to add a patient ID claim to the SAML assertion. If the user name is not part of the data store, no action is taken.

At a high-level, the following workflow occurs:

* A user logs into an application authenticated by SAML, which uses the Okta org as an Identity Provider (IdP).
* The Okta org authenticates the user.
* At this point in the workflow, the Okta SAML Assertion Inline Hook triggers and sends a request to an external service.
* The external service evaluates the request, and if the user is a patient, adds a patient ID claim to the SAML assertion.
* The user is logged in to the application with the additional claim in the SAML assertion.