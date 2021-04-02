---
title: Overview
---

Tokens contain claims that are statements about the subject, such as name, role, or email address. Beyond the [default set of claims](/docs/guides/validate-id-tokens/overview/#verify-the-claims) that are contained in ID tokens and access tokens, you can define your own custom claims. For example, you might want to add a user's email address to an access token and use that to uniquely identify the user, or you may want to add information stored in a user profile to an ID token.

You can also [add a Groups claim](/docs/guides/customize-tokens-groups-claim/add-groups-claim-org-as/) to ID tokens for any combination of App Groups and User Groups to perform SSO using the Okta Org Authorization Server. And, you can [add a Groups claim](/docs/guides/customize-tokens-groups-claim/add-groups-claim-custom-as/) to ID tokens and access tokens to perform authentication and authorization using a Custom Authorization Server. See [Authorization Servers](/docs/guides/customize-authz-server/overview/) for more information on the types of authorization servers available to you and what you can use them for.

Additionally, you can create a [dynamic](/docs/guides/customize-tokens-dynamic/) or [static](/docs/guides/customize-tokens-static/) allow list when you need to set Group allow lists on a per-app basis using both the Org Authorization Server and a Custom Authorization Server. If you have a large number of Groups but only 20 Groups apply to your app, you don't want to run through all of your Groups every time a Groups claim is created. This process optionally uses Okta's flexible app profile, which accepts any JSON-compliant content, to create an allow list of Groups that can then easily be referenced.

This guide assumes that you:

* Have an Okta Developer Edition organization. [Create an org for free](https://developer.okta.com/signup).
* Have an [OpenID Connect client application](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Apps_App_Integration_Wizard-oidc) in Okta with at least [one user assigned to it](https://help.okta.com/en/prod/okta_help_CSH.htm#ext-assign-apps).
* Have a [group in Okta](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Directory_Groups) with at least one person assigned to it.

## Support

If you need help or have an issue, post a question in our [Developer Forum](https://devforum.okta.com).

<NextSectionLink/>
