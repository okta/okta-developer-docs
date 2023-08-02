<div class="three-quarter">

![Flow diagram that displays the back and forth between the client, resource server, and Okta](/img/auth/step-up-authentication-acr-flowSAML.png)

</div>

At a high level, this flow has the following steps:

1. Per your use case, include the `acr_values` predefined parameter value in the authentication request.

2. Okta performs the authentication scenarios required to identify and authenticate the user in accordance with the predefined `acr_values` parameter value used in the authentication request.

3. Okta generates a SAML assertion and sends it back to the user-agent (browser), and then the browser relays the assertion to the Service Provider.

4. The Service Provider sends the `securitycontext` to the browser.

5. The user agent requests access to the protected resource.

6. The service provider responds with the requested resource.
