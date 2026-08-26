In a SAML-based XAA flow, after the user is authenticated, it delegates the requesting app to interact with the IdP to obtain the refresh token necessary to perform the ID-JAG token exchange.

<div class="three-quarters">

   ![XAA token exchange flow](/img/guides/xaa/xaa-saml-sso.png)

   </div>
    <!--
    See http://www.plantuml.com/plantuml/uml/
    @startuml
    participant User as "User"
    participant WebApp as "Client (requesting app)"
    participant OAS as "IdP (Okta)"
    User -> WebApp: 1. User signs in
    WebApp -> OAS: 2. Redirect user to sign in to IdP
    OAS -> WebApp: 3. Returns SAML assertion response after user successfully signs in
    WebApp -> OAS: 4. Use SAML assertion to request a refresh token
    OAS -> WebApp: 5. Returns refresh token
    @enduml
    -->

1. When a user signs into your federated app.

1. Your app uses SAML and redirects the user to the IdP for SSO. As a prerequisite for this to happen, your app has to integrate and register SAML SSO with the IdP (Okta). See [SAML concept](/docs/concepts/saml/) and [SAML app integrations](https://help.okta.com/okta_help.htm?id=ext-apps-about-saml) in the product documentation for details.

1. After the user is authenticated, the IdP returns the users's SAML assertion response (`<SAMLResponse>`) to your requesting app. Save this base64-encoded SAML response as `{SAMLReponse}` for the refresh token exchange.

1. Use the SAML assertion to exchange for a refresh token from your Okta org's [OAuth 2.0 token endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/orgas/token). This exchange follows the [OAuth 2.0 Token Exchange (RFC 8693)](https://datatracker.ietf.org/doc/html/rfc8693) specification.

   Add code to your app to handle the token exchange:

   1. Create a client assertion JWT (`{client_assertion}`) for the token exchange payload. This assertion is in `private_key_jwt` form and informs the IdP who the client is. Specify the following claims in your JWT payload:
      [[style="list-style-type:lower-alpha"]]

      | Claim    | Type    | Description                                                  |
      |----------|---------|--------------------------------------------------------------|
      | `aud`    | String  | Set to `https://{yourOktaDomain}/oauth2/v1/token` (Okta's token exchange endpoint). This is the full URL of the resource that you're trying to access using the JWT to authenticate.  |
      | `iss`    | String  | Set to `{clientId}`. The AI agent's client ID, which is the issuer of the token. |
      | `sub`    | String  | Set to `{clientId}`. The AI agent's client ID, which the subject of the token.  |
      | `exp`    | Integer | The token expiration time in UNIX timestamp format. The request fails from this claim if the expiration time is more than one hour in the future or if the token is already expired. |
      | `jti`    | String  | Optional. The unique token identifier. If you specify this parameter, the token can only be used once and, as a result, subsequent token requests don't succeed. |
      | `iat`    | Integer | Optional. When the token was issued in UNIX timestamp format. If specified, it must be a time before the request is received. |

      Sign your JWT with the private key from the AI agent (`{clientKey}`) in Okta. See [Build a JWT with a private key](https://developer.okta.com/docs/guides/build-self-signed-jwt/js/main/#build-a-jwt-with-a-private-key) for guidance on how to build your JWT with a private key.

   1. Send a POST request to your Okta org's [OAuth 2.0 token endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/orgas/token) with the following parameters to obtain a refresh token.

        | Parameter              | Type   | Description |
        |------------------------|--------|-------------|
        | `grant_type`           | String | Set to `urn:ietf:params:oauth:grant-type:token-exchange`. |
        | `client_id`            | String | Optional. Set to `{clientId}`. This is client ID of the requesting app role, which is the AI agent in Okta. You don't need this value if you have the `client_assertion`. |
        | `client_assertion_type`| String | Set to `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`. |
        | `client_assertion`     | String | Set to `{client_assertion}`, the signed JWT generated from the previous step. |
        | `subject_token`        | String | Set to `{SAMLResponse}`, the base64-encoded SAML 2.0 assertion received from the IdP. |
        | `subject_token_type`   | String | Set to `urn:ietf:params:oauth:token-type:saml2` |
        | `requested_token_type` | String | Set to `urn:ietf:params:oauth:token-type:refresh_token` |
        | `scope`                | String | Set to `openid offline_access` (`offline_access` is required to issue a refresh token). |

        For example:

        ```bash
        POST /oauth2/v1/token HTTP/1.1
        Host: {yourOktaDomain}
        Content-Type: application/x-www-form-urlencoded

        grant_type=urn:ietf:params:oauth:grant-type:token-exchange&
        subject_token={SAMLResponse}&
        subject_token_type=urn:ietf:params:oauth:token-type:saml2&
        requested_token_type=urn:ietf:params:oauth:token-type:refresh_token&
        scope=openid+offline_access&
        client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer&
        client_assertion={client_assertion}
        ```

1. After the refresh token exchange request is sent, the IdP (Okta) responds with the requested token. For example:

```JSON
{
    "access_token": "eyJraWQ.....rm8EA4osYg",
    "expires_in": 3600,
    "issued_token_type": "urn:ietf:params:oauth:token-type:refresh_token",
    "scope": "offline_access openid",
    "token_type": "N_A",
}
```

The `access_token` property value contains the refresh token. The `issued_token_type` indicates what type of token is returned. Save the `access_token` value as the `{refresh_token}` variable to use in your token exchange for ID-JAG in the next step.