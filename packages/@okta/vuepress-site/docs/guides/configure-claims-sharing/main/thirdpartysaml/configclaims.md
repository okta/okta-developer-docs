The **Third-Party IdP + Claims Sharing** feature enables claims sharing between an Okta SP and a third-party IdP. This section covers how to configure authentication claims sharing for this use case.

### Third-party IdP configuration

Before you configure Okta to accept AMR claims, it's important to first ensure at the third-party IdP that the client app used for authenticating and authorizing users sends an `amr` array with the AMR claims in the OpenID Connect ID token (`id_token`).

### Okta SP configuration

To use claims sharing, update the third-party IdP settings in your Okta SP org by adding the `trustClaims: true` key and value pair to your IdP PUT request. Alternatively, you can enable the **Trust claims from this identity provider** checkbox in the Admin Console. See <StackSnippet snippet="addanidp" inline />.

> **Note:** When **Third-Party IdP + Claims Sharing** and the legacy **AMR Claims Mapping** feature are both used in your SP org, claims sharing is the only feature considered. The `mapAMRClaims` property (**Trust AMR claims from this identity provider** checkbox in the Admin Console) is associated with the legacy claims mapping feature. If you include this property and the `trustClaims: true` property in your request, only the `trustClaims` property is considered.

#### Example Okta <StackSnippet snippet="idptype" inline /> IdP update request

<StackSnippet snippet="idpupdaterequest" />

#### Response example

> **Note:** This example is truncated for brevity.

<StackSnippet snippet="idpupdateresponse" />
