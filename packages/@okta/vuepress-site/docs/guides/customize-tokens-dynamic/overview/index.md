---
title: Overview
---

You can create a dynamic or [static whitelist](/docs/guides/customize-tokens-static/) when you need to set Group whitelists on a per-app basis using both the Org Authorization Server and a Custom Authorization Server. For example, you have a large number of Groups and every time a Group claim is created, you don't want to run through all of your Groups if only 20 of them apply to your app. This process optionally uses Okta's flexible app profile, which accepts any JSON-compliant content, to create a whitelist of Groups that can then easily be referenced.

Additionally, you can [add a Groups claim](/docs/guides/customize-tokens-groups-claim) to ID tokens for any combination of App Groups and User Groups to perform single sign-on (SSO) using the Okta Org Authorization Server. You can also add a Groups claim to ID tokens and access tokens to perform authentication and authorization using a Custom Authorization Server.

This guide assumes that you:

* Have an Okta Developer Edition organization. [Create an org for free](https://developer.okta.com/signup).
* Have an [OpenID Connect client application](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Apps_App_Integration_Wizard-oidc) in Okta with at least [one user assigned to it](https://help.okta.com/en/prod/okta_help_CSH.htm#ext-assign-apps).
* Have a [group in Okta](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Directory_Groups) with at least one person assigned to it.

## Support

If you need help or have an issue, post a question in our [Developer Forum](https://devforum.okta.com).

<NextSectionLink/>
