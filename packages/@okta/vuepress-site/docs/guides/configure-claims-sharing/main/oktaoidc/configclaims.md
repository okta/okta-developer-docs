The **Okta-to-Okta Claims Sharing** feature enables claims sharing between Okta orgs. This section covers how to configure authentication claims sharing for this use case.

### Okta IdP configuration

Okta supports the use of SAML 2.0 and OpenID Connect app integrations, and the Org2Org app in the OIN catalog. This is the app that you use for authenticating and authorizing your users. Use the app that you've configured in your Okta IdP org for this example use case. There are no configuration requirements for claims sharing for the Okta IdP org.

### Okta SP configuration

To use claims sharing, update the IdP settings in your Okta SP org by adding the `trustClaims: true` key and value pair to your IdP PUT request. Alternatively, you can enable the **Trust claims from this identity provider** checkbox in the Admin Console. See <StackSnippet snippet="addanidp" inline />.

> **Note:** When **Okta-to-Okta Claims Sharing** and the legacy **AMR Claims Mapping** feature are both used in your SP org, claims sharing is the only feature considered. The `mapAMRClaims` property (**Trust AMR claims from this identity provider** checkbox in the Admin Console) is associated with the legacy claims mapping feature. If you include this property and the `trustClaims: true` property in your request, Okta only considers the `trustClaims` property.

#### Example Okta <StackSnippet snippet="idptype" inline /> IdP update request

<StackSnippet snippet="idpupdaterequest" />

#### Response example

> **Note:** This example is truncated for brevity.

<StackSnippet snippet="idpupdateresponse" />