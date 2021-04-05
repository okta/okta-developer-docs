---
title: Overview
---

You can add a Groups claim to ID tokens for any combination of App Groups and User Groups to perform single sign-on (SSO) using the Okta Org Authorization Server. You can also add a Groups claim to ID tokens and access tokens to perform authentication and authorization using a Custom Authorization Server.

This guide walks you through creating a Groups claim for an OpenID Connect client application. This approach is recommended if you are using only Okta-mastered Groups. For groups not mastered in Okta, you need to use an expression. See [Retrieve both Active Directory and Okta groups in OpenID Connect claims](https://support.okta.com/help/s/article/Can-we-retrieve-both-Active-Directory-and-Okta-groups-in-OpenID-Connect-claims?language=en_US). For an Okta Org Authorization Server, you can only create an ID token with a Groups claim, not an access token.

Additionally, you can create a [dynamic](/docs/guides/customize-tokens-dynamic/) or [static](/docs/guides/customize-tokens-static) allow list when you need to set group allow lists on a per-application basis using both the Org Authorization Server and a Custom Authorization Server.

See [Customize tokens returned from Okta](/docs/guides/customize-tokens-returned-from-okta/overview/) when you want to define your own custom claims. For example, you might want to add a user's email address to an access token and use that to uniquely identify the user, or you may want to add information stored in a user profile to an ID token.

This guide assumes that you:

* Have an Okta Developer Edition organization. [Create an org for free](https://developer.okta.com/signup).
* Have an [OpenID Connect client application](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Apps_App_Integration_Wizard-oidc) in Okta with at least [one user assigned to it](https://help.okta.com/en/prod/okta_help_CSH.htm#ext-assign-apps).
* Have a [Group in Okta](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Directory_Groups) with at least one person assigned to it.

## Support

If you need help or have an issue, post a question in our [Developer Forum](https://devforum.okta.com).

<NextSectionLink/>
