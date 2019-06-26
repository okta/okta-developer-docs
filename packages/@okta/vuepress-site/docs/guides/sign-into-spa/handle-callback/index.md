---
title: Handle the callback from Okta
---
After Okta authenticates a user, they're redirected back to your application via the callback route you <GuideLink link="../define-callback">defined earlier</GuideLink>. When Okta redirects back, the URL fragment (the portion after `#`) contains either tokens for the user or an error if something went wrong.

Your application must parse this information, and if tokens are present, store the user's tokens. Our SDK does this for you.

<StackSelector snippet="handle-callback"/>

<NextSectionLink/>
