When you create a custom IDV vendor integration in your org, the vendor must first provide the following information:

| Requirement     | Description                   |
|-----------------|-------------------------------|
| Client app      | The vendor must have a client app that can communicate with Okta. |
| End user license agreement (EULA) | The vendor must provide a URL that links to the EULA that your users must accept before using the IDV vendor. |
| Privacy policy  | The vendor must provide a URL that links to the privacy policy that explains the vendor's privacy practices. |
| Client ID       | The vendor must provide a client identifier for the app that you create at the vendor. |
| Client Secret   | The vendor must provide a client secret for the app that you create at the vendor. |
| Issuer URL      | The vendor must provide a URL that identifies the IDV vendor. This is the base URL for the IDV vendor’s authorization server. <br></br>This URL identifies the IDV vendor and is used as the issuer in OAuth and OpenID Connect requests. Okta uses it to verify tokens and establish trust during the IDV flow. |
| PAR Request URL | The vendor must provide a URL that Okta uses to send Pushed Authorization Requests (PAR) to the IDV vendor. <br></br>Okta sends a POST request to this URL to initiate a verification session and transmit user claims and verification parameters. |
| Authorize URL   | The vendor must provide a URL that Okta uses to redirect users to the IDV vendor for identity verification. |
| Token URL       | The vendor must provide a URL that Okta uses to exchange the authorization code for an access token and an ID token. |
| JWKS URL        | The vendor must provide a URL that Okta uses to retrieve JSON Web Keys (JWKS) from the IDV vendor. |

For more information about these requirements, see [Integrate Okta with identity verification vendors](/docs/guides/idv-integration/).

After your IDV vendor provides this information, you can create the IdP integration in your org.

> **Note:** Your IDV vendor might have additional configuration settings. Refer to your IDV vendor's documentation for more information about other configuration settings.
