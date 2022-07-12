1. Create and register an [app](https://developer.amazon.com/docs/login-with-amazon/register-web.html) at Amazon.

1. When you create an application at the IdP, you need to provide a redirect URI for authentication.

    The redirect URI sent in the authorize request from the client needs to match the redirect URI set at the IdP. This URI is where the IdP sends the authentication response (the access token and the ID token). It must be a secure domain that you own. This URI has the same structure for most IdPs in Okta and is constructed using your Okta subdomain and the callback endpoint.

    For example, if your Okta subdomain is called `company`, then the URI would be `https://company.okta.com/oauth2/v1/authorize/callback`. If you configured a custom domain in your Okta org, use that value to construct your redirect URI, such as `https://login.company.com/oauth2/v1/authorize/callback`.

    > **Note:** If you set `issuerMode` to `DYNAMIC` [mode](/docs/reference/api/idps/#property-details), then you must add both the Okta URI and the custom URI in the external IdP's allowed `redirectUri` list.

1. Save the generated Amazon client ID and client secret values. You need them to configure your Identity Provider in Okta.
