---
title: Overview
---

You can create a dynamic or [static allow list](/docs/guides/customize-tokens-static/) when you need to set Group allow lists on a per-app basis using both the Org Authorization Server and a Custom Authorization Server. If you have a large number of Groups but only 20 Groups apply to your app, you don't want to run through all of your Groups every time a Groups claim is created. This process optionally uses Okta's flexible app profile, which accepts any JSON-compliant content, to create an allow list of Groups that can then easily be referenced.

Additionally, you can [add a Groups claim](/docs/guides/customize-tokens-groups-claim) to ID tokens for any combination of App Groups and User Groups to perform single sign-on (SSO) using the Okta Org Authorization Server. You can also [add a Groups claim](/docs/guides/customize-tokens-groups-claim/add-groups-claim-custom-as/) to ID tokens and access tokens to perform authentication and authorization using a Custom Authorization Server.

See [Customize tokens returned from Okta](/docs/guides/customize-tokens-returned-from-okta/overview/) when you want to define your own custom claims. For example, you might want to add a user's email address to an access token and use that to uniquely identify the user, or you may want to add information stored in a user profile to an ID token.

This guide assumes that you:

* Have an Okta Developer Edition organization. [Create an org for free](https://developer.okta.com/signup).
* Have an [OpenID Connect client application](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Apps_App_Integration_Wizard-oidc) in Okta with at least [one user assigned to it](https://help.okta.com/en/prod/okta_help_CSH.htm#ext-assign-apps).
* Have a [group in Okta](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Directory_Groups) with at least one person assigned to it.

## Support

If you need help or have an issue, post a question on the [Okta Developer Forum](https://devforum.okta.com).

<NextSectionLink/>
