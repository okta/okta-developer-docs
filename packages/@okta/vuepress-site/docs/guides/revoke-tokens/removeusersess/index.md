---
title: Remove a User session
---

## Remove a User session

Separate from access and refresh tokens, there is also the Okta session cookie that provides access to your Okta organization and applications. For a more complete explanation of Okta User sessions, see the [Sessions API documentation](/docs/reference/api/sessions/). You can revoke Okta sessions in one of two ways:

* Close a specific session using the Sessions API
* Revoke all sessions for a given user using the Users API

> **Note:** Removing all User sessions can optionally also remove all related access and refresh tokens.

See [Close Session](/docs/reference/api/sessions/#close-session) in the Sessions API reference for more information on removing a specific session.

See [Clear User Sessions](/docs/reference/api/users/#clear-user-sessions) in the Users API reference for more information on removing all of a user's sessions.
