---
title: Handle the Callback from Okta
---

After Okta authenticates a user, they're redirected back to your application via the callback route you [defined earlier](/guides/sign-into-spa/-/define-callback). When Okta redirects back, the URL fragment (the portion after `#`) contains either tokens for the user or an error if something went wrong.

Your application must parse this information, and if tokens are present, store the user's tokens.

<StackSelector snippet="handle-callback"/>

<NextSectionLink/>
