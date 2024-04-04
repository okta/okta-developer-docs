<div class="three-quarter">

![Flow diagram that displays the back and forth between the client, resource server, and the authorization server](/img/auth/step-up-authentication-acr-flow.png)

</div>

At a high level, this flow has the following steps:

1. Per your use case, include the `acr_values` predefined parameter value in the authentication request.
2. The authentication scenarios required by the [grant type](/docs/guides/implement-grant-type/authcode/main/) authenticate the user in accordance with the predefined `acr_values` parameter value used in the authentication request.
3. When the authentication flow completes, the authorization server returns an access token and/or an ID token to the client that contains the `acr` claim.
4. The client requests access to the protected resource and presents the new access token.
5. The resource server evaluates the assurance level of the access token against its requirements and then returns the protected resource.
