---
title: Check for Tokens on Startup
---
When the app is closed and reopened, you need to check for the existence of an `access_token` to see if the user has an existing session.

In native applications, it is common for users to have a long-lived session. It is important for the app to manage the user's session by refreshing tokens when they expire, using the `refresh_token` or re-prompting the user to sign in. See [refreshing a token manually](https://github.com/okta/okta-oidc-android#refresh-a-token) for more information.

<StackSelector snippet="checkfortoken"/>

<NextSectionLink/>
