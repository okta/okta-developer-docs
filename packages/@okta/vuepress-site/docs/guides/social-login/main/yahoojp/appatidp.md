1. Create and register an [OAuth 2.0](https://developer.yahoo.co.jp/yconnect/v2/registration.html) app at Yahoo Japan.

1. When you create an application at the IdP, you must provide a redirect URI for authentication.

    The redirect URI sent in the authorize request from the client must match the redirect URI set at the IdP. This URI is where the IdP sends the authentication response (the access token and the ID token). It needs to be a secure domain that you own. This URI has the same structure for most IdPs in Okta and is constructed using your Okta subdomain and the callback endpoint.

    For example, if your Okta subdomain is `company`, then the URI would be `https://company.okta.com/oauth2/v1/authorize/callback`. If you configured a custom domain in your Okta org, use that value to construct your redirect URI, such as `https://login.company.com/oauth2/v1/authorize/callback`.

    Specify the Okta URI and the custom URI in the external IdP's allowed redirect URI list.

1. Save the generated Yahoo Japan client ID and client secret values. You need them to configure your Identity Provider in Okta.