In a OIDC-based XAA flow, after the user is authenticated, the IdP returns the ID token necessary to perform the ID-JAG token exchange.

<div class="three-quarters">

   ![XAA token exchange flow](/img/guides/xaa/xaa-oidc-sso.svg)

   </div>
    <!--
    See http://www.plantuml.com/plantuml/uml/
    @startuml
    participant User as "User"
    participant WebApp as "Client (requesting app)"
    participant OAS as "IdP (Okta)"
    User -> WebApp: 1. User signs in
    WebApp -> OAS: 2. Redirect user to sign in to IdP
    OAS -> WebApp: 3. Returns ID token after user successfully signs in
    @enduml
    -->

1. User signs in to your OIDC agentic app.

1. Your agentic app redirects the user to the IdP for SSO. As a prerequisite for this to happen, your app has to integrate and register OIDC SSO with the IdP (Okta). See [Create OpenID Connect app integrations](https://help.okta.com/okta_help.htm?type=oie&id=ext_Apps_App_Integration_Wizard-oidc) in the product documentation for details.

   > **Note:** If you want to also receive a refresh token, ensure that your agentic OIDC app integration is configured to return the refresh token in Okta (include the `offline_access` scope).

1. After the user is authenticated, the IdP returns the ID token to your requesting app. Save the ID token value as `{id_token}` for the ID-JAG token exchange.

```JSON
{
  "token_type": "Bearer",
  "expires_in": 3600,
  "access_token": "eyJraW...OYqhUp6g",
  "scope": "openid",
  "id_token": "eyJ...vc_JaEQCw"
}
```
