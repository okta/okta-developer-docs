---
title: Overview
---

You can add a Groups claim to ID tokens for any combination of App Groups and User Groups to perform single sign-on (SSO) using the Okta Org Authorization Server. You can also add a Groups claim to ID tokens and access tokens to perform authentication and authorization using a Custom Authorization Server.

This guide walks you through creating a Groups claim for an OpenID Connect client application. This approach is recommended if you are using only Okta-mastered Groups. For non Okta mastered groups an expression will need to be used, detailed instructions can be followed [here](https://support.okta.com/help/s/article/Can-we-retrieve-both-Active-Directory-and-Okta-groups-in-OpenID-Connect-claims?language=en_US). For an Okta Org Authorization Server, you can only create an ID token with a Groups claim, not an access token.

Additionally, you can create a dynamic or static whitelist when you need to set group whitelists on a per-application basis using both the Org Authorization Server and a Custom Authorization Server. See [Add a Groups claim with a dynamic whitelist](/docs/guides/customize-tokens-dynamic/) and [Add a Groups claim with a static whitelist](/docs/guides/customize-tokens-static).

This guide assumes that you:

* Have an Okta Developer Edition organization. [Create an org for free](https://developer.okta.com/signup).
* Have an [OpenID Connect client application](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Apps_App_Integration_Wizard-oidc) in Okta with at least [one user assigned to it](https://help.okta.com/en/prod/okta_help_CSH.htm#ext-assign-apps).
* Have a [Group in Okta](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Directory_Groups) with at least one person assigned to it.

## Support

If you need help or have an issue, post a question in our [Developer Forum](https://devforum.okta.com).

<NextSectionLink/>
