## About the Authorization Code grant with PKCE

The Authorization Code flow with PKCE is the recommended method for controlling the access between your platform-specific apps and a resource server. The Authorization Code flow with PKCE is similar to the standard [Authorization Code flow](/docs/guides/implement-grant-type/authcode/main/). However, the flow with PKCE has an extra step at the beginning and an extra verification at the end.

See the [OAuth 2.0 and OpenID Connect decision flowchart](/docs/concepts/oauth-openid/#choosing-an-oauth-2-0-flow) for flow recommendations.

> **Note:** Some browsers have begun blocking third-party cookies by default, disrupting Okta functionality in certain flows. See [Mitigate the impact of third-party cookie deprecation](https://help.okta.com/okta_help.htm?type=oie&id=ext-third-party-cookies).
