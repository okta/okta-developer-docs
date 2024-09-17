---
title: Hooks best practices guide
meta:
  - name: A guide on best practices when implementing Okta Hooks
    content: A guide on best practices when implementing Okta Hooks
---

Event hooks and inline hooks are outbound calls from Okta to an external service. These outbound calls integrate custom functionality into your Okta processes. See [event hooks](/docs/concepts/event-hooks) and [inline hooks](/docs/concepts/inline-hooks).

The following sections review best practices to implement and secure Okta event hooks or inline hooks.

## Secure your hook endpoint

To prevent a malicious actor from making requests to the endpoint where your Okta hooks are sent, use the following best practices:

* Configure Okta to send an authentication header in the hook and validate it in every request by one of two ways:

  * Using [HTTP Basic Authentication](/books/api-security/authn/api-authentication-options/#http-basic-authentication). When activating and enabling your hooks on the Okta org, set the **Authorization field** as `Authorization` and the **Authentication secret** in the Base64 `user:password` format.

    >**Note:** You must include the authentication scheme as part of the **Authentication secret**. For Basic Authentication, your secret must appear similar to: `Basic Base64(user:password)`. See the following partial hook header as an example:

    ```http
    Accept: application/json
    content-type: application/json
    Authorization: Basic YWRtaW46c3VwZXJzZWNyZXQ=
    ```

  * Using a separate Secret Key, which can be configured on the hook as a custom header field.

* For Okta inline hook calls, configure the hook to use OAuth 2.0 authentication using either:

  * Client Secret method (`client_secret_post`): See [OAuth 2.0: Client secret](/docs/guides/common-hook-set-up-steps/nodejs/main/#oauth-2-0-client-secret).
  * Private Key method (`private_key_jwt`): See [OAuth 2.0: Private Key](/docs/guides/common-hook-set-up-steps/nodejs/main/#oauth-2-0-private-key).

* Create an allowlist of IP addresses to check incoming Okta calls. For a listing of Okta IP addresses, see [What IP Addresses/Ranges Should Be Allowlisted for Inbound Traffic?](https://support.okta.com/help/s/article/What-IP-addresses-ranges-should-we-whitelist-for-inbound-traffic-i-e-REST-API-calls-from-Okta-to-on-prem-JIRA-server?language=en_US).

>**Note:** This is a large list of IP addresses and the list is subject to change. Unless required by your organization, securing your hook by authentication header or OAuth 2.0 is recommended.

## Protect your hook content from external viewers

Okta requires HTTPS to encrypt communications to your hook endpoint to prevent unauthorized parties from reading the contents of an Okta hook. When using HTTPS, ensure you keep your SSL certificate updated and the Domain Name System (DNS) secured, so that someone can’t reroute your calls to another location.

>**Note:** Adding an HTTP URL when enabling a hook in the Admin Console displays an invalid URL provided error.

## Avoid delays in hook responses

When Okta uses an inline hook to communicate with your endpoint, the user experience is paused until your code responds.

Okta event hooks also require a response. To prevent unnecessary delays or timeouts, Okta recommends the following for event hooks:

* Respond immediately to the HTTP request with either a 200 (Success) or 204 (Success no content) return code.
* Process the event hook request data after sending the response code.

A timeout of three seconds is enforced on all outbound requests for event and inline hooks. One request retry is sent in the event of a timeout or an error response from the external service. If a successful response isn't received after that, an HTTP 400 error is returned with more information about the failure.

See inline hook [Timeout and retry](/docs/concepts/inline-hooks/#timeout-and-retry) and event hook [Time out and retry](/docs/concepts/event-hooks/#timeout-and-retry).

## Limits, duplicates, and order of hook calls

The number of hook calls and the limits per org are available in the following table. Keep in mind these numbers and limits when designing your hook solution.

Your external service that processes hook requests must consider that the order of events or inline hook calls aren't guaranteed. Also, to avoid processing duplicate requests, use the `eventId` property to identify unique requests.

| Hook Type | Limit Type | Limit | Description |
| --------- | -----------| ----- | ----------- |
| Event hook | Number of daily events | 400,000 | A maximum of 400,000 applicable events, per org, per day, that trigger event hooks. Event hooks aren't recorded or replayed after this point. If a request times out after three seconds, event hooks are retried once. Retries don't count toward the org limit.
|            | Maximum number of event hooks per org | 25 | A maximum of 25 active event hooks can be configured per org. You can configure each event hook to deliver multiple event types. |
| Inline hook | Timeout | 3 seconds | Inline hooks have a completion timeout of three seconds with a single retry. However, a request isn't retried if your endpoint returns a 4xx HTTP error code. Any 2xx code is considered successful, and the request is not retried. If the external service endpoint responds with a redirect, it isn't followed. |
|             | Maximum number of inline hooks per org | 100 | The maximum number of inline hooks that you can configure per org is 100, which is a combined total for any combination of inline hook types. |
|             | Concurrent rate limit | Variable | The maximum number of inline hooks that can be sent concurrently based on org type. See [Concurrent rate limits](/docs/reference/rl-additional-limits/#concurrent-rate-limits).|

## Troubleshoot your hook implementations

Developers and administrators can preview sample Okta calls and responses from your external service. Previews are available for all event hooks ([Event hook preview](https://help.okta.com/okta_help.htm?id=ext-event-hooks-preview)) and for SAML, telephony, token, and registration inline hooks ([Preview an inline hook](https://help.okta.com/okta_help.htm?type=oie&id=ext-preview-inline-hooks)).

Review the Admin Console System Log to troubleshoot your implementations, in addition to the logging features in your external service. See the following sections to help you with troubleshooting your implementations:

* [Troubleshooting inline hooks](/docs/concepts/inline-hooks/#troubleshooting)
* [Troubleshooting event hooks](/docs/concepts/event-hooks/#debugging)

Inline hooks also provide an `error` object that can be returned as part of the hook response. See [Inline hooks error object](/docs/concepts/inline-hooks/#error).

See also the following guides for sample Okta hook implementations:

* [Event hook](/docs/guides/event-hook-implementation/)
* [Password import inline hook](/docs/guides/password-import-inline-hook/)
* [Registration inline hook](/docs/guides/registration-inline-hook/)
* [Token inline hook](/docs/guides/token-inline-hook/)
* [Telephony inline hook](/docs/guides/telephony-inline-hook)
