1. Create an [OAuth](https://developer.spotify.com/documentation/general/guides/authorization/app-settings/) app at Spotify.

1. When you create an application at the IdP, you need to provide a redirect URI for authentication.

    The redirect URI sent in the authorize request from the client needs to match the redirect URI set at the IdP. This URI is where the IdP sends the authentication response (the access token and the ID token). It needs to be a secure domain that you own. This URI has the same structure for most IdPs in Okta and is constructed using your Okta subdomain and the callback endpoint.

    For example, if your Okta subdomain is called `company`, then the URI would be `https://company.okta.com/oauth2/v1/authorize/callback`. If you have configured a custom domain in your Okta org, use that value to construct your redirect URI, such as `https://login.company.com/oauth2/v1/authorize/callback`.

1. Save the generated Spotify client ID and client secret values. You need them to configure your Identity Provider in Okta.