---
title: Get info about the user
---
When a user signs in, their profile information (stored in Okta) is made available to your application. It's common to use this info to update your app's UI.

By default, the profile items (called "claims") that Okta returns include the user's email address, first name, and last name. You can see the default items returned in the [/userinfo response example](/docs/reference/api/oidc/#response-example-success-5). The claims you see may differ depending on what scopes your app has requested (see <GuideLink link="../configure-packages/">Add and configure packages</GuideLink>).

<StackSelector snippet="getinfo"/>

<!-- You can also customize the items (called claims) that are returned from Okta. See [Token customization guide]. -->

<NextSectionLink/>
