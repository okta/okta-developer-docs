## About the Authorization Code grant with PKCE

If you are building a native application, then the Authorization Code flow with a Proof Key for Code Exchange (PKCE) is the recommended method for controlling the access between your application and a resource server. The Authorization Code flow with PKCE is similar to the standard [Authorization Code flow](/docs/guides/implement-grant-type/authcode/main/) with an extra step at the beginning and an extra verification at the end.

See the [OAuth 2.0 and OpenID Connect decision flowchart](/docs/concepts/oauth-openid/#choosing-an-oauth-2-0-flow) for flow recommendations.

> **Note:** Some browsers have begun blocking third-party cookies by default, disrupting Okta functionality in certain flows. See [FAQ: How Blocking Third Party Cookies Can Potentially Impact Your Okta Environment](https://support.okta.com/help/s/article/FAQ-How-Blocking-Third-Party-Cookies-Can-Potentially-Impact-Your-Okta-Environment).
