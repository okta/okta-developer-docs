1. Go to your custom IDV vendor.
1. Create a client app.
1. Create a client ID and client secret for the app.
1. Set your org URL as a redirect URI for the app and append `/idp/identity-verification/callback`. The redirect URI is the location where the custom IDV vendor sends the verification response.
   1. For example, if your Okta subdomain is called `company`, then the URL would be: `https://company.okta.com/idp/identity-verification/callback` If you’ve configured a custom domain in your Okta org, use that value to construct your redirect URI, such as `https://login.company.com/idp/identity-verification/callback`.
   [[style="list-style-type:lower-alpha"]]

IDV vendors can learn about how to integrate with Okta by reviewing [Integrate Okta with identity verification vendors](/docs/guides/idv-integration/).

After your IDV vendor provides this information, you can create the IdP integration in your org.

> **Note:** Your IDV vendor might have other configuration settings. Refer to their documentation for more information about other configuration settings.
