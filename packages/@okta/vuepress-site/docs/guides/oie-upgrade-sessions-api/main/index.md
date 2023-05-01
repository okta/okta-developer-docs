---
title: Understand how sessions work after the upgrade
meta:
  - name: description
    content: Learn how sessions work with the Okta Identity Engine.
---

<ApiLifecycle access="ie" />

Okta uses an HTTP session cookie to provide access to your Okta organization and applications across web requests for interactive user agents such as a browser. The Okta [Sessions API](/docs/reference/api/sessions/) provides operations to create and manage authentication sessions for users in your Okta org.

After your org is upgraded to Okta Identity Engine, there are a few things you should know about how sessions work with Identity Engine:

* The use of the session ID cookie (`sid`) isn't supported in Identity Engine. The new `idx` cookie is used with Identity Engine.
* Okta recommends that you move away from session ID-based (`sid` cookie) restful services and use the `/api/v1/sessions/me` endpoint to get session information for the current user and to determine if the user is signed in.

The following section discusses different use cases and what the changes are after you upgrade your org to Identity Engine:

1. **Are you using the Sign-In Widget?** Everything works as configured. The Sign-In Widget takes care of calling the correct Identity Engine endpoints and returns the `idx` cookie in the response.

2. **Are you creating a session with a [session token](/docs/reference/api/sessions/#create-session-with-a-session-token)?** Okta recommends that you use the [Okta Identity Engine SDKs](/docs/guides/identity-engine-sdk-upgrade/).

    However, creating a session with a session token does continue to work usually:

    When you create the session using the `api/v1/sessions/` endpoint, and then move from a Classic Engine session to an Identity Engine session, there's interoperability. Identity Engine knows to change the Session ID (`sid`) cookie into an Identity Engine (`idx`) cookie transparently.

    > **Note:** Operations on the two sessions aren't synchronous in all cases. Okta creates an `idx` session if there's a `sid` session (Classic Engine session) present. However, creating a `sid` session when there's an `idx` session (Identity Engine session) present isn't supported.

3. **Are you using the [My Session Management endpoints](/docs/reference/api/sessions/#get-current-session) (`api/v1/sessions/me`)?** Everything works as configured. Operations are reflected on both Session ID (`sid`) and Identity Engine (`idx`) cookies.

4. **Are you calling any of these four `v1/sessions/${sessionId}/*` endpoints?** These operations work only on the Session ID (`sid`) session and not on the Identity Engine `idx` sessions.

    * GET `/api/v1/sessions/${sessionId}`
    * POST `/api/v1/sessions/${sessionId}/lifecycle/refresh`
    * DELETE `/api/v1/sessions/${sessionId}`
    * POST `/api/v1/users/me/lifecycle/delete_sessions`
    * POST `/api/v1/sessions?additionalFields=cookieToken`

If you're using any of these endpoints, Okta highly recommends that you move away from using the Session ID entirely and use the [My Session Management endpoints](/docs/reference/api/sessions/#get-current-session) instead. This puts you in charge of managing your own session.
