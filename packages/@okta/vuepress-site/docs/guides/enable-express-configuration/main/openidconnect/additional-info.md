
With Express Configuration, admins can quickly set up SSO for an instance of your app in Okta. During the process, these default settings are applied to the new Okta Workforce connection in Auth0. See [Enable Organization Connections](https://auth0.com/docs/manage-users/organizations/configure-organizations/enable-connections) for more information.

**Connection Settings**

  * **Scopes**: `openid email profile`
  * **User Mapping**: `{"mapping_mode" : "basic_profile"}`
  * **Connection Profile**: `{"pkce":"auto"}`

**Connection Login Experience** (org level settings)

  * **Home Realm Discovery**: Empty (not supported)
  * **Display Connection as a button**: Enable
  * **Button display name**: Okta
  * **Button logo URL**: `https://cdn.brandfolder.io/R30ALRIS/at/scvv8tj7w545j3r5gmxq4jrb/Okta_Aura_Logomark_Black_RGB.png` (Okta brand logo)
