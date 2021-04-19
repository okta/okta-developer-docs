---
title: Hook best practices
excerpt: >-
  Understand the best practices at Okta to implement and secure an Okta Event Hook or Inline Hook.
---

 Hooks best practices

Event Hooks and Inline Hooks are outbound calls from Okta to an external client application (external service). These outbound calls integrate custom functionality into your Okta processes. For further background information, see [Event Hooks](/docs/concepts/event-hooks) and [Inline Hooks](/docs/concepts/inline-hooks).

The following sections review best practices to implement and secure and Okta Event Hooks or Inline Hooks.

## Securing your hook endpoint

To prevent a malicious actor from making requests to the endpoint where your Okta Hooks are sent, use the following best practices:

* Configure Okta to send an Authentication header in the Hook and validate it in every request by:

  * Using [HTTP Basic Authentication](/books/api-security/authn/api-authentication-options/#http-basic-authentication) in the format `base64(user:password)`. See [Adding Basic Authorization and Body Parsing](/docs/guides/common-hook-set-up-steps/) for an example implementation of Basic Authentication.
  * Using a separate Secret Key, which can be configured on the Hook as a custom header field.

* Create an allow list of IP addresses to check on incoming Okta calls. See the following Okta Knowledge Base article for a listing of Okta IP addresses: [What IP addresses/ranges should we allow list for inbound traffic?](https://support.okta.com/help/s/article/What-IP-addresses-ranges-should-we-whitelist-for-inbound-traffic-i-e-REST-API-calls-from-Okta-to-on-prem-JIRA-server?language=en_US).

>**Note:** This is a large list of IP Addresses and the list is subject to change. Unless required by your organization, securing your Hook by Authentication header is recommended.

## Protecting your Hook content from external viewers

To prevent unauthorized parties from reading the contents of an Okta Hook, we recommend the following:

* Use HTTPS to encrypt communications to your Hook endpoint. <!-- The Hook concept docs seem to imply we can only use HTTPS, meaning this is not really a best practice, more of a note. BD>
When using HTTPS, make sure you keep your SSL certificate updated, and that the DNS is secured so that someone can’t re-point your endpoint to another location. <!--Fr om Joel's comment in slack>

## Avoiding delays in Inline Hook responses

When Okta uses an Inline Hooks to communicate with your endpoint, the user experience is paused until your code responds. To prevent unnecessary delays or timeouts, we recommend the following:

* Treat Okta Hooks as you would any other HTTP request, namely: Make sure you respond to the HTTP request in under 400 milliseconds with a 200 (Success) or 204 (Success no content).
