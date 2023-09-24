---
title: App intent links
meta:
  - name: description
    content: Learn about app intent links and how you can use them to signal intent for a sign-in experience.
---

# How App intent links work

<ApiLifecycle access="ie" />

App intent links are used to signal intent to access an application. These links are protocol-specific endpoints that you can use to initiate a sign-in flow to an application. Both Identity Provider and Service Provider initiated flows are supported.

Example app intent link for a SAML application:
`http://${yourOktaDomain}/app/mysamlapp_1/${appInstanceID}/sso/saml`

The app intent links the location hosts to the widget or sign-in experience for the app that the user is attempting to access. Identity Engine then evaluates the Global Session Policy, authentication policy, and all other policies relevant to the sign-in experience. Because each app intent link is responsible for hosting the sign-in experience on Identity Engine, they share a common app intent link rate limit group.