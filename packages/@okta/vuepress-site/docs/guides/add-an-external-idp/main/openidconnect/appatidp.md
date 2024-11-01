Use the documentation of the IdP to create a client application.

You also need to add the redirect URI to the appropriate section. The redirect URI sent in the authorize request from the client needs to match the redirect URI in the OIDC IdP. This is the URL where the IdP returns the authentication response (the access token and the ID token). It needs to be a secure domain that you own. This URL has the same structure for most IdPs in Okta and is constructed using your Okta subdomain and then the callback endpoint.

For example, if your Okta subdomain is called `company`, then the URL would be: `https://company.okta.com/oauth2/v1/authorize/callback`. If you’ve configured a custom domain in your Okta Org, use that value to construct your redirect URI, such as `https://login.company.com/oauth2/v1/authorize/callback`.

Include all base domains (Okta domain and custom domain) that your users interact with in the allowed redirect URI list.

> **Note:** If you've built your own custom IdP, you need the client ID and the client secret generated for the IdP. Add the client ID and client secret to the Okta configuration in the next section.