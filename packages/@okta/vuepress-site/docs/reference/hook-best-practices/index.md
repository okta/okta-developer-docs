---
title: Hook best practices
excerpt: >-
  Understand the best practices at Okta to implement and secure an Okta Event Hook or Inline Hook.
---

# Hooks best practices

Event Hooks and Inline Hooks are outbound calls from Okta to an external client application (external service). These outbound calls integrate custom functionality into your Okta processes. For further background information on Okta Hooks, see [Event Hooks](/docs/concepts/event-hooks) and [Inline Hooks](/docs/concepts/inline-hooks).

The following sections review best practices to implement and secure Okta Event Hooks or Inline Hooks.

## Secure your Hook endpoint

To prevent a malicious actor from making requests to the endpoint where your Okta Hooks are sent, use the following best practices:

* Configure Okta to send an Authentication header in the Hook and validate it in every request by:

  * Using [HTTP Basic Authentication](/books/api-security/authn/api-authentication-options/#http-basic-authentication) in the format `base64(user:password)`. See [Adding Basic Authorization and Body Parsing](/docs/guides/common-hook-set-up-steps/) for an example implementation of Basic Authentication.
  * Using a separate Secret Key, which can be configured on the Hook as a custom header field.

* Create an allowlist of IP addresses to check on incoming Okta calls. See the following Okta Knowledge Base article for a listing of Okta IP addresses: [What IP addresses/ranges should we allow for inbound traffic?](https://support.okta.com/help/s/article/What-IP-addresses-ranges-should-we-whitelist-for-inbound-traffic-i-e-REST-API-calls-from-Okta-to-on-prem-JIRA-server?language=en_US).

>**Note:** This is a large list of IP Addresses and the list is subject to change. Unless required by your organization, securing your Hook by Authentication header is recommended.

## Protect your Hook content from external viewers

To prevent unauthorized parties from reading the contents of an Okta Hook, we recommend the following:

* Okta uses HTTPS to encrypt communications to your Hook endpoint. When using HTTPS, ensure you keep your SSL certificate updated and the Domain Name System (DNS) secured, so that someone can’t re-point your endpoint to another location.

## Avoid delays in Inline Hook responses

When Okta uses an Inline Hook to communicate with your endpoint, the user experience is paused until your code responds. To prevent unnecessary delays or timeouts, we recommend the following:

* Treat Okta Hooks as you would any other HTTP request, namely: Ensure you respond to the HTTP request in under 400 milliseconds with a 200 (Success) or 204 (Success no content) code.

>**Note:** The Okta request times out after 3 seconds with no response for Inline Hooks and Event Hooks.

See Inline Hook [Timeout and Retry](/docs/concepts/inline-hooks/#timeout-and-retry) for further information on Inline Hook timeout and retry behavior; see Event Hook [Timeout and Retry](https://developer.okta.com/docs/concepts/event-hooks/) for the same.

## Working with Event Types (?)

* Do we have any guidelines on the number of Event Types we can add to a hook? Our current documentation suggests we can configure "multiple event types". Would it be better to have multiple endpoints for multiple event types, from a load perspective? Or does it matter?

## Manage scale of Okta Hook calls (?)

* Any advice necessary on this subject, which I've seen on other webhhook pages. E.g. "If you’re on the other side running a system that is consuming webhooks, you can scale your webhook ingestion the same way you’d horizontally scale for regular web traffic — by using a load balancer or reverse-proxy in front of your web servers. "

## Order and duplicates of Hook calls (?)

* Not sure if there is anything to discuss here?

## Create error messages (?)

* Any guidance for creating error messages? I can link [Inline Hooks concepts - error](/docs/concepts/inline-hooks/#error)

## Troubleshoot your Hook implementations

Developers and administrators can preview sample Okta calls and responses from your external service for certain Inline Hooks and Event Hooks, as well as review the Admin Console System Log to troubleshoot your implementations, in addition to your external service's logging features. See [Troubleshooting hook implementations](/docs/guides/common-hook-set-up-steps/nodejs/troubleshooting/) for further information.

See also the following guides for sample Okta Hook implementations:

* [Event Hook](/docs/guides/event-hook-implementation/nodejs/overview/)
* [Password Import Inline Hook](/docs/guides/password-import-inline-hook/nodejs/overview/)
* [Registration Inline Hook](/docs/guides/registration-inline-hook/nodejs/overview/)
* [Token Inline Hook](/docs/guides/token-inline-hook/nodejs/overview/)
