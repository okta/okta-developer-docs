---
title: Add a Groups claim
---
You can add a Groups claim to ID tokens for any combination of App Groups and User Groups to perform single sign-on (SSO) using the <GuideLink link="../add-groups-claim-org-as">Okta Org Authorization Server</GuideLink>. You can also add a Groups claim to ID tokens and access tokens to perform authentication and authorization using a Custom Authorization Server.

Additionally, you can create a dynamic or static whitelist when you need to set group whitelists on a per-application basis using both the Org Authorization Server and a Custom Authorization Server. See [Add a Groups claim with a dynamic whitelist]() and [Add a Groups claim with a static whitelist]().

This guide assumes that you:

* Have an Okta Developer Edition organization. [Create an org for free](https://developer.okta.com/signup).
* Have an [OpenID Connect client application](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Apps_App_Integration_Wizard-oidc) in Okta with at least [one user assigned to it](https://help.okta.com/en/prod/okta_help_CSH.htm#ext-assign-apps).
* Have a [group in Okta](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Directory_Groups) with at least one person assigned to it.

## Support

If you need help or have an issue, post a question in our [Developer Forum](https://devforum.okta.com).

<NextSectionLink/>
