---
title: Understand how sessions work after the upgrade
meta:
  - name: description
    content: Learn how sessions work with the Okta Identity Engine.
---

<ApiLifecycle access="ie" />

Okta uses an HTTP session cookie to provide access to your Okta org and apps across web requests for interactive user agents such as a browser. The Okta [Sessions API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Session/) provides operations to create and manage authentication sessions for users in your Okta org.

After your org is upgraded to Okta Identity Engine, there are a few things you should know about how sessions work with Identity Engine:

* The use of the session ID cookie (`sid`) isn't supported in Identity Engine. The new `idx` cookie is used with Identity Engine.
* Okta recommends that you move away from session ID-based (`sid` cookie) RESTful services. The `/api/v1/sessions/me` endpoints are deprecated. To identify a user on your server, use the ID token or the access token from an OpenID Connect sign-in flow. For a SAML app or an app that uses WS-Federation, use the assertion instead.
* Session cookies work only within a browser, where Okta and the browser manage them automatically to maintain a signed-in state. Okta doesn't document this cookie mechanism, and it isn't covered by any agreements, so Okta recommends that you don't rely on it in your own code.
* Some browsers block third-party cookies by default, which disrupts Okta functionality in certain flows. See [Mitigate the impact of third-party cookie deprecation](https://help.okta.com/okta_help.htm?type=oie&id=ext-third-party-cookies).

The following section discusses different use cases and what the changes are after you upgrade your org to Identity Engine:

1. **Are you using the Sign-In Widget?** Everything works as configured. The Sign-In Widget takes care of calling the correct Identity Engine endpoints and returns the `idx` cookie in the response.

2. **Are you creating a session with a [session token](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Session/#tag/Session/operation/createSession)?** Okta recommends that you use the [Okta Identity Engine SDKs](/docs/guides/identity-engine-sdk-upgrade/).

    However, creating a session with a session token does continue to work usually:

    When you create the session using the `api/v1/sessions/` endpoint, and then move from a Classic Engine session to an Identity Engine session, there's interoperability. Identity Engine knows to change the Session ID (`sid`) cookie into an Identity Engine (`idx`) cookie transparently.

    > **Note:** Operations on the two sessions aren't synchronous in all cases. Okta creates an `idx` session if there's a `sid` session (Classic Engine session) present. However, creating a `sid` session when there's an `idx` session (Identity Engine session) present isn't supported.

3. **Are you using the My Session Management endpoints (`api/v1/sessions/me`)?** These endpoints are deprecated. They still return a response when a session exists, but don't use them in new integrations, and plan to move off them. To identify a user on your server, use the ID token or the access token from an OpenID Connect sign-in flow. For a SAML app or an app that uses WS-Federation, use the assertion instead.

    The `{sessionId}`-based operations, such as retrieving, revoking, and refreshing a session by its `id`, aren't deprecated and remain supported.

4. **Are you making this request (POST `/api/v1/sessions?additionalFields=cookieToken`) using the Sessions API?** This operation works only on the session ID (`sid`) session and not on the Identity Engine `idx` session.

    If you're using this endpoint, Okta highly recommends that you move away from using the session ID entirely. Use the [Okta Identity Engine SDKs](/docs/guides/identity-engine-sdk-upgrade/), and identify users with the tokens from an OpenID Connect sign-in flow, or the assertion for a SAML or WS-Federation app.

5. **Did a user authenticate in Classic Engine before the upgrade was completed?** If a user authenticates in Classic Engine, they receive a sessionToken that remains valid for five minutes. If the upgrade to Identity Engine completes while this sessionToken is still valid, the user's existing session becomes invalid. When the user attempts to access an OpenID Connect app after the upgrade, they’re prompted for their password again.

    > **Note:** This scenario only happens during an upgrade from Classic Engine to Identity Engine. It doesn't continue to happen after the upgrade.

## Related topics

* [Audit your Classic API dependencies](/docs/guides/oie-upgrade-audit-classic-api-dependencies/)
* [Okta API changes for Identity Engine](/docs/guides/oie-upgrade-api-changes/)
