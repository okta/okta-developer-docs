---
title: Open the Sign-Out Page
---
To sign out users, open a web view and display the hosted sign-out page.

<StackSelector snippet="signout"/>

Users are signed out if the subject in the ID token matches the current Okta session. A `post_logout_redirect_uri` may be specified to redirect the browser after the sign out is performed, for example, `com.oktaorg.name:/logout`. Otherwise, the browser is redirected to the Okta sign-in page.

If no Okta session exists, this endpoint has no effect and the browser is redirected immediately to the Okta sign-in page or the `post_logout_redirect_uri` (if specified).

<NextSectionLink/>

