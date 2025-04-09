The **Third-party IdP claims sharing** feature enables claims sharing between an Okta SP and a third-party IdP. This section covers how to configure authentication claims sharing for this use case.

### Third-party IdP configuration

It's important to ensure that your third-party IdPs return Authentication Method Reference (AMR) claims in their responses. The client app used for authentication and authorizing users must send the `saml2:Attribute Name="session.amr"` key and value pair in the `saml2:AttributeStatement` section of the SAML response.

> **Note:** You can break a functioning flow with your third-party IdP. This happens after you enable **Third-party IdP claims sharing** in your Okta SP org. But, your third-party IdP isn't set up to return AMR claims. The user can't authenticate with the third-party IdP and the flow is broken.

#### Supported AMR values

The following table describes the AMR claims values that Okta supports. Okta ignores unsupported AMR values. See [Authentication Method Reference Values](https://datatracker.ietf.org/doc/html/rfc8176) for a description of each value type.

> **Note:** You must use a possession AMR value such as `hwk` with the biometric AMR values (`face`, `fpt`, `iris`, `retina`, `vbm`) to satisfy their method characteristics.

| AMR value     | Factor type       | Method characteristic   |
| :------------ | :---------------- | :-------------------------------- |
| `face`        | Biometric         | User presence, User verifying |
| `fpt`         | Biometric         | User presence, User verifying |
| `iris`        | Biometric         | User presence, User verifying |
| `retina`      | Biometric         | User presence, User verifying |
| `vbm`         | Biometric         | User presence, User verifying |
| `hwk`         | Possession        | User presence, Device-bound, Hardware-protected |
| `kba`         | Knowledge         | N/A  |
| `mfa`         | N/A               | N/A  |
| `otp`         | Possession        | User presence, Device-bound |
| `pwd`         | Knowledge         | N/A |
| `sc`          | Possession        | User presence, Device-bound |
| `sms`         | Possession        | User presence |
| `swk`         | Possession        | User presence, Device-bound |
| `tel`         | Possession        | User presence  |
| `pop`         | Possession        | User presence, Device-bound |

### Okta SP configuration

To use claims sharing, update the third-party IdP settings in your Okta SP org by adding the `trustClaims: true` key and value pair to your IdP PUT request. Alternatively, you can enable the **Trust claims from this identity provider** checkbox in the Admin Console. See <StackSnippet snippet="addanidp" inline />.

> **Note:** When **Third-party IdP claims sharing** and the legacy **AMR Claims Mapping** features are enabled in your SP org, claims sharing is the only feature considered. The `mapAMRClaims` property (**Trust AMR claims from this identity provider** checkbox in the Admin Console) is associated with the legacy claims mapping feature. If you include this property and the `trustClaims: true` property in your request, Okta only considers the `trustClaims` property.

#### Example Okta <StackSnippet snippet="idptype" inline /> IdP update request

<StackSnippet snippet="idpupdaterequest" />

#### Response example

> **Note:** This example is truncated for brevity.

<StackSnippet snippet="idpupdateresponse" />
