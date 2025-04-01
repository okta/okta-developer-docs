The **Third-Party IdP + Claims Sharing** feature enables claims sharing between an Okta SP and a third-party IdP. This section covers how to configure authentication claims sharing for this use case.

### Third-party IdP configuration

It's important to ensure that your third-party IdPs return Authentication Method Reference (AMR) claims. The client app used for authenticating and authorizing users must send an `amr` array with AMR claims in the OpenID Connect ID token (`id_token`).

> **Note:** You can break a functioning flow with your third-party IdP. This happens after you enable **Third-Party IdP + Claims Sharing** in your Okta SP org, but your third-party IdP isn't set up to return AMR claims. The user can't authenticate with the third-party IdP and the flow is broken.

#### Supported AMR values

The following table describes the AMR values that Okta supports. Okta ignores unsupported AMR values.

| AMR value    | AMR description                                | Factor satisfied   | Possession constraint satisfied   |
| :------------| :--------------------------------------------- | :----------------  | :-------------------------------- |
| `face`       | Biometric authentications: facial recognition  | INHERENCE          | userPresence<br> userVerification |
| `fpt`        | Biometric authentications: fingerprint         | INHERENCE          | userPresence<br> userVerification |
| `iris`       | Biometric authentications: iris scan           | INHERENCE          | userPresence<br> userVerification |
| `retina`     | Biometric authentications: retina scan         | INHERENCE          | userPresence<br> userVerification |
| `vbm`        | Biometric authentications: voiceprint          | INHERENCE          | userPresence<br> userVerification |
| `hwk`        | Proof-of-Possession (PoP) of a hardware-secured key. See Appendix C of [RFC4211](https://datatracker.ietf.org/doc/html/rfc4211#appendix-C) for a discussion on PoP.| POSSESSION             |  userPresence<br>deviceBound<br>hardwareProtected      |
| `kba`        | Knowledge-based authentication | KNOWLEDGE | N/A  |
| `mfa`        | Multiplefactor authentication: When this is present, specific authentication methods used may also be included. | N/A | N/A |
| `otp`        | One-time passcode | POSSESSION    | userPresence<br>deviceBound |
| `pwd`        | Password-based authentication | KNOWLEDGE | N/A |
| `sc`         | Smart card  | POSSESSION | userPresence<br>deviceBound |
| `sms`        | Confirmation using SMS text message to the user at a registered number  | POSSESSION | userPresence |
| `swk`        | Proof-of-Possession (PoP) of a software-secured key. See Appendix C of [RFC4211](https://datatracker.ietf.org/doc/html/rfc4211#appendix-C) for a discussion on PoP. | POSSESSION | userPresence<br>deviceBound |
| `tel`        | Confirmation by telephone call to the user at a registered number. This authentication technique is sometimes also referred to as "call back". | POSSESSION  | userPresence  |
| `pop`        | Proof-of-possession of a key. Unlike the existing `hwk` and `swk` methods, it's unspecified whether the proof-of-possession key is hardware-secured or software-secured.  | POSSESSION  | userPresence<br>deviceBound |

### Okta SP configuration

To use claims sharing, update the third-party IdP settings in your Okta SP org by adding the `trustClaims: true` key and value pair to your IdP PUT request. Alternatively, you can enable the **Trust claims from this identity provider** checkbox in the Admin Console. See <StackSnippet snippet="addanidp" inline />.

> **Note:** When **Third-Party IdP + Claims Sharing** and the legacy **AMR Claims Mapping** features are enabled in your SP org, claims sharing is the only feature considered. The `mapAMRClaims` property (**Trust AMR claims from this identity provider** checkbox in the Admin Console) is associated with the legacy claims mapping feature. If you include this property and the `trustClaims: true` property in your request, Okta only considers the `trustClaims` property.

#### Example Okta <StackSnippet snippet="idptype" inline /> IdP update request

<StackSnippet snippet="idpupdaterequest" />

#### Response example

> **Note:** This example is truncated for brevity.

<StackSnippet snippet="idpupdateresponse" />
