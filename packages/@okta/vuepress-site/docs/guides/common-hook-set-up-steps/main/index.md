---
title: Common Hook set-up steps
excerpt: A list of set-up steps that are common to all hook implementations.
layout: Guides
---

This guide explains common set-up steps when implementing an Okta Event or Inline hook, including using Glitch.com as an example external service, adding basic authentication to the hook calls, JSON body parsing in the external service code, and troubleshooting steps.

---

**Learning outcomes**

* Understand common set up steps for implementing an Okta Event or Inline Hook.
* Understand how to use these steps when running the example hook code in the accompanying guides.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup/)
* [Glitch.com](https://glitch.com) project or account

---

## About the common Hook set-up steps

Okta Event and Inline Hooks use outbound calls, which are received and parsed by an external service to implement additional custom functionality for your Okta implementation.

A secure web server and application is a requirement to implement an Okta Event or Inline Hook, and is referred to as the external service in these guides.

For instructional purposes, the following guides for Event Hooks and Inline Hook types use the third-party site [Glitch](https://glitch.com), which functions as an online external service. You can use the example code to quickly implement the hook and preview the functionality.

> **Note:** You can also use your own secure web server to implement the sample code.

See the following section on setting up a Glitch project and adding appropriate code.

## Set up an external service

The Event Hook and Inline Hook examples in this section use Glitch projects to create an external service for use with your Okta org.

[Glitch](https://www.glitch.com) is a browser-based development environment that can build a full-stack web application online. You can use their template applications to implement an external service that receives the outbound calls from Okta orgs.

Start with a new Node.js project built on the Express framework or a Node.js SQLite database application and use the code snippets in the following examples to implement the example hooks. Copy (**Remix on Glitch**) the Glitch projects for each hook in the following sections to have a working code sample.

<StackSelector snippet="setup"/>

## Add Basic Authorization and Body Parsing

The Glitch project templates don't have any authorization or body parsing code. To include this content:

* Add the Body Parser and Basic Auth `npm` packages to your Glitch project
* Add the code snippet below

If you remix a Glitch Inline Hook project, the packages and code are already included.

To add the `npm` packages:

1. Select the `package.json` file in the left-hand project menu.
2. From the `Add Package` drop-down box, search for the `express-basic-auth` and `body-parser` packages.
3. Click each package to add to your project.

The Inline Hook guides use [HTTP Basic Authentication](/books/api-security/authn/api-authentication-options/#http-basic-authentication) to authenticate the Okta Inline Hook API calls received by your Glitch external service. In your Okta org, you must encode the Glitch project username and password credentials in Base64 and add them as the **Authentication secret** when you activate the Inline Hook. Ensure that you add the scheme `Basic ` (including a space) as a prefix to the **Authentication secret** value.

For example, the credential pair used in the Inline Hook examples is `admin:supersecret`, which encoded in Base64 is `YWRtaW46c3VwZXJzZWNyZXQ=`. Adding the scheme to this value, creates the Inline Hook **Authentication secret** value: `Basic YWRtaW46c3VwZXJzZWNyZXQ=`.

After including the `npm` packages, add the following code snippet in your project.

<StackSelector snippet="auth" noSelector/>

## Troubleshoot hook implementations

After setting up an external service and an Event Hook or Inline Hook, you may need to troubleshoot or review your configurations. Use the following options to confirm a successful implementation.

### Preview tab

An [Inline Hook Preview](https://help.okta.com/okta_help.htm?id=ext-preview-inline-hooks) tab, accessible in the Admin Console, is available for the following two Inline Hooks:

* Registration Inline Hook
* SAML Inline Hook
* Telephony Inline Hook <ApiLifecycle access="ea" />

Before enabling the hook, the preview tab can run a sample Okta request call and receive the external service response. Review the request and response formats to make sure responses are accurate.

An [Event Hook Preview](https://help.okta.com/okta_help.htm?id=ext-event-hooks-preview) tab is also available for Event Hooks and displays the JSON payload for the selected Event Type. The preview tab can confirm a successful delivery of the request.

### Admin Console System Log

Use the Admin Console System Log to review logs of the Event, Inline Hook triggers, or errors encountered during testing from the Okta org. See [System Log](https://help.okta.com/okta_help.htm?id=ext_Reports_SysLog).

### Glitch logs

For implementations using the Glitch projects, use Glitch's log feature to review and troubleshoot your external service code:

1. In the Glitch project's left-hand folder navigation pane, click **Tools** at the bottom of the pane.
2. Click **Logs**.

A log pane appears that displays all `console.log()` output. Some console output code is available in the sample code.

## Next steps

Review the following guides to implement a simple hook example and preview the hook functionality:

* [Event Hook](/docs/guides/event-hook-implementation/)
* [Password Import Inline Hook](/docs/guides/password-import-inline-hook/)
* [Registration Inline Hook](/docs/guides/registration-inline-hook/)
* [Telephony Inline Hook](/docs/guides/telephony-inline-hook/) <ApiLifecycle access="ea" />
* [Token Inline Hook](/docs/guides/token-inline-hook/)

## See also

For background conceptual information on hooks, see [Event Hooks](/docs/concepts/event-hooks/) and [Inline Hooks](/docs/concepts/inline-hooks/).
