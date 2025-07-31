## Additional information

Admins use Express Configuration to set up SSO for an instance of your app in Okta. During this process, the following default configurations are applied to the newly created Okta Workforce Connection in Auth0. See [Enable Organization Connections](https://auth0.com/docs/manage-users/organizations/configure-organizations/enable-connections).

**Connection Settings**

  * **Scopes**: `openid email profile`
  * **User Mapping**: `{"mapping_mode" : "basic_profile"}`
  * **Connection Profile**: `{"pkce":"auto"}`

**Connection Login Experience (Org Level)**

  * **Home Realm Discovery**: Empty (not supported)
  * **Display Connection as a button**: Enable
  * **Button display name**: Okta
  * **Button logo URL**: `https://cdn.brandfolder.io/R30ALRIS/at/scvv8tj7w545j3r5gmxq4jrb/Okta_Aura_Logomark_Black_RGB.png` (Okta brand logo)