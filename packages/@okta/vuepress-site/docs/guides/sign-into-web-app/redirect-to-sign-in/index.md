---
title: Redirect to the Sign-In Page
---

To sign a user in, your application must redirect the browser to the Okta-hosted sign-in page. You can do this when a user visits a protected route or when the user clicks a button to sign in.

<StackSelector snippet="login-redirect"/>

The user is redirected to the hosted sign-in page where they authenticate. After successful authentication, the user is redirected back to your application along with information about the user. The Okta SDK handles this redirect for you automatically.

<!-- >> Note: To customize this sign-in page, see the [Customization guide]. -->

<NextSectionLink/>
