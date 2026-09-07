Configure your SSO properties for the protocols that you selected:

* SAML 2.0: See [SAML properties](#saml-properties).
* OpenID Connect: See [OIDC properties](#oidc-properties).

#### Cross App Access (XAA) roles

> **Note:**
> * This section appears if you select Cross App Access with SAML 2.0 or OIDC or both.

Under **Cross App Access (XAA) roles**, select the role that your app plays in the token exchange:

| Role | Description |
| ----- | ----------- |
| **Client app** | App that exchanges its Okta token for an Identity Assertion JWT Authorization Grant (ID-JAG) token, then exchanges the ID-JAG token at the resource app's authorization server for an access token, which the client app can then use to access the resource app's data and APIs. It registers as a client at that authorization server and shares the issuer and client ID with Okta to enable the exchange. |
| **Resource app** | App that uses its auth server to validate the ID-JAG token and return an access token, which the client app can then use to access its data and APIs. |

#### XAA client app properties

> **Note:** This section appears if you select the client app under the Cross App Access (XAA) roles.

In the **Resource client registrations** section, specify the issuer URL and client ID for each resource app that this client app connects to. You can add up to 100 registrations.

| Property | Description |
| ----- | ----------- |
| **Issuer URL** | URL of the resource app's authorization server. |
| **Client ID** | The unique identifier assigned to the client app when it's registered on the resource app's authorization server. |

1. Click **Add resource client registrations** to add a row.
1. Click **Add**.

#### XAA resource app properties

> **Note:** This section appears if you select the Resource app under Cross App Access (XAA) roles.

Specify the following properties for your resource app:

| Property | Description |
| ----- | ----------- |
| **Issuer URL** `*` | URL of the resource app's authorization server. The issuer URL must support the HTTPS protocol. If you're using a per tenant design, include the variable names that you created in your URL. For example:` 'https://' + app.subdomain + '.example.com/' `. See [Dynamic properties with Okta Expression Language](#dynamic-properties-with-okta-expression-language).<br>.  |
| **Audience tenant ID** | Enable this checkbox to require the Okta IDP to send an audience tenant claim (`aud_tenant`) in the ID-JAG token. This scopes token issuance to a specific organization, workspace, or tenant in the Resource Authorization Server when XAA is enabled. |
| **Resource identifier** | API resource URLs available in your resource app. You can add up to 20 resource identifiers. Click **Add resource identifiers** to add another row. |
| **Scopes** | Resource scopes that your resource app's authorization server accepts, such as read or write. You can add up to 1oo scopes. Click **Add scopes** to add another row. |

`*` Required properties