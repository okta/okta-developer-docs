---
title: Sign Users Out of Your App
---
Sign users out by ending their local session. This signs the user out of your application, but doesn't sign the user out of Okta.

<!-- Future content: and discarding the tokens Okta created when the user signed in. -->

<StackSelector snippet="localsignout"/>

Ending the local session does not end the user's Okta session. If your users are signed in to multiple applications, you might want to keep the Okta session. Keeping the Okta session means users won't be prompted for credentials when they try to sign in again.

If you want users to be prompted for credentials the next time they sign in, sign them out of Okta as well.

<NextSectionLink/>
