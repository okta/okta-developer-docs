When you create a custom IDV vendor integration in your org, the vendor must first provide the following information:

| Requirement     | Description                   |
|-----------------|-------------------------------|
| Instance name      | The vendor must have a client app that can communicate with Okta. The **Instance name** is the unique name of that app. |
| End user license agreement (EULA) | The vendor must provide a URL that links to an EULA that your users must accept before using the IDV vendor. |
| Vendor name   | The vendor must provide a name that identifies the IDV vendor. This name is displayed to users during IDV flows, in the Sign-In Widget. |
| Privacy policy  | The vendor must provide a URL that links to a privacy policy that explains the vendor's privacy practices. |
| Client ID       | The vendor must provide a client identifier for the app that you create at the vendor. |
| Client secret   | The vendor must provide a client secret for the app that you create at the vendor. |
| Issuer URL      | The vendor must provide a URL that identifies the IDV vendor. This is the base URL for the IDV vendor’s authorization server. <br></br>This URL identifies the IDV vendor and is used as the issuer in OAuth 2.0 and OpenID Connect (OIDC) requests. Okta uses it to verify tokens and establish trust during the IDV flow. |
| PAR request URL | The vendor must provide a URL that Okta uses to send pushed authorization requests (PAR) to the IDV vendor. <br></br>Okta sends a POST request to this URL to initiate a verification session and to transmit user claims and verification parameters. |
| Authorize URL   | The vendor must provide a URL that Okta uses to redirect users to the IDV vendor for identity verification. |
| Token URL       | The vendor must provide a URL that Okta uses to exchange the authorization code for an access token and an ID token. |
| JWKS URL        | The vendor must provide a URL that Okta uses to retrieve JSON Web Key Set (JWKS) from the IDV vendor. |

The custom IDV vendor must also enable you to add your org as a redirect URI.

* The redirect URI is the location where the custom IDV vendor sends the verification response. The URI sent in the verification request from the client needs to match the redirect URI set at the IDV vendor. Ensure that the URI is located in a secure domain that you own.
* For example, if your Okta subdomain is called `company`, then the URL would be: `company.okta.com.` If you’ve configured a custom domain in your Okta org, use that value to construct your redirect URI, such as `login.company.com.`
* If your IDV vendor supports multiple redirect URIs, include all base domains (Okta domain and custom domain) that your users interact with as redirect URIs.

For more information about these requirements, see [Integrate Okta with identity verification vendors](/docs/guides/idv-integration/).

After your IDV vendor provides this information, you can create the IdP integration in your org.

> **Note:** Your IDV vendor might have other configuration settings. Refer to your IDV vendor's documentation for more information about other configuration settings.
