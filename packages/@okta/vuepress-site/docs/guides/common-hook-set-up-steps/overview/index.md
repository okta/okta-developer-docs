---
title: Overview
---

Okta Event and Inline Hooks use outbound calls, which are received and parsed by an external service to implement additional custom functionality for your Okta implementation.

A secure web server and application is a requirement to implement an Okta Event or Inline Hook, and is referred to as the external service in these guides.

For instructional purposes, the following example guides for Event Hooks and Inline Hook types use the third-party site [Glitch](https://glitch.com) to function as an online external service, one you can use to quickly implement the sample code to preview the functionality of an Event or Inline Hook. You also need a working dev or preview Okta org to configure the hooks and implement the hook functionality.

> **Note:** You can also use your own secure web server to implement the sample code.

See the following section on setting up a Glitch project and adding appropriate code.

For background conceptual information on hooks, see [Event Hooks](/docs/concepts/event-hooks/) and [Inline Hooks](/docs/concepts/inline-hooks/).

<NextSectionLink/>