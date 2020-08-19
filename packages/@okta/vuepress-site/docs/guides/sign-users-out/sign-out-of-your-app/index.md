---
title: Sign users out of your app
---

Sign users out your application by ending their local session. This signs the user out of your app, but doesn't <GuideLink link="../sign-out-of-okta">sign the user out of Okta</GuideLink>. The steps required to end the app session varies depending on the type of app that you are using.

<!-- Future content: and discarding the tokens Okta created when the user signed in. -->

<StackSelector snippet="localsignout"/>

Ending the local session doesn't end the user's Okta session. If your users are signed in to multiple applications, you might want to keep the Okta session. Keeping the Okta session means users won't be prompted for credentials when they try to sign in again.

If you want users to be prompted for credentials the next time that they sign in, sign them out of Okta as well.

<NextSectionLink/>
