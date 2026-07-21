---
title: Proximity authentication
meta:
  - name: description
    content: An overview of proximity authentication in Okta and how the NFC authenticator enables secure sign-in for shared device environments.
---

# Proximity authentication

<ApiLifecycle access="ea" />

Proximity authentication is a possession-based authentication approach that requires users to tap a physical token to a near-field communication (NFC) reader to prove their identity. When combined with a PIN, it satisfies both possession and knowledge factor requirements in a single sign-in step without requiring a username.

In Okta, the NFC authenticator implements this approach using NFC cards. A user taps an NFC card to a compatible reader, Okta Verify reads the card and identifies the user, and the Sign-In Widget prompts for a PIN.

The NFC authenticator is suited to shared device environments where workers don't use personal devices. For example, it can be used by workers in factory floors, retail locations, warehouses, and healthcare settings. In those environments, traditional authentication methods like passwords or personal device-based MFA create operational friction or aren't practical.

## How proximity authentication fits in Okta

Proximity authentication works within Okta's standard authentication policy framework. Like other Okta authenticators, you configure the NFC authenticator at the
org level and assign it to authentication policies.

The NFC authenticator satisfies two factor types simultaneously:

* **Possession:** The physical NFC token proves that the user has a specific object in their control.
* **Knowledge:** The PIN proves that the user knows a secret value.

A single sign-in with the NFC authenticator can satisfy an MFA requirement without requiring additional authenticators. The assurance level it contributes to
a session depends on the type of token used. Hardware-protected tokens add a mutual authentication step that proves the physical card is authentic and contribute
the `hwk` AMR claim. See [Authentication assurance](#authentication-assurance).

`proximity` is the authenticator type for physical proximity-based authenticators. The key for the NFC authenticator is `nfc_pin` and it is currently the only supported proximity authenticator.

## How proximity authentication works

Proximity authentication involves the following three components:

* **Okta Verify**: Okta Verify is an app that's installed on the Windows device. It acts as the proximity agent and handles all NFC hardware interaction between the device, the reader, and the token.
  > **Note:** NFC authentication can only be used with Okta Verify on Windows devices at this time.
* **Sign-In Widget**: The Sign-In Widget is the browser-based authentication interface. It presents the sign-in flow to the user, initiates the NFC interaction by contacting Okta Verify, and collects the PIN when Okta sends a challenge.
* **Okta backend**: Okta creates and manages enrollment records, generates and stores cryptographic material for hardware-protected tokens, and identifies the user during verification.

Because Okta Verify runs on the device and not in a browser, it doesn't handle PIN entry. The PIN challenge is always routed to the Sign-In Widget. Users enter their PIN in the browser, not in the Okta Verify app.

## Managed device requirement

Okta Verify must be installed on a managed Windows device and configured to handle proximity authentication through your mobile device management (MDM) platform.
This requirement ensures that only organizationally managed Okta Verify installations can participate in NFC authentication.



See [Configure NFC](https://help.okta.com/okta_help.htm?type=oie&id=nfc-configure)<!-- link TBD -->.

## Enrollment

When a user enrolls the NFC authenticator, the Sign-In Widget contacts Okta Verify through a deep link. Okta Verify reads the token and writes an enrollment
identifier to it. The Okta backend creates the enrollment record. The Sign-In Widget then prompts the user to enter and confirm a PIN. The PIN is hashed and stored
server-side and isn't written to the token.

For hardware-protected tokens, Okta Verify completes a provisioning phase before the PIN step. Okta generates cryptographic keys and Okta Verify writes them to the
token's secure element, locking the token against tampering. Factory-fresh hardware-protected tokens can be provisioned and enrolled by the user without admin
intervention.

See [Enroll in NFC](https://help.okta.com/okta_help.htm?type=oie&id=nfc-enroll)<!-- link TBD -->.

## Verification

The Sign-In Widget shows a **Sign in with NFC** button on managed devices where Okta Verify is configured for proximity authentication. Okta Verify launches
automatically in the background when possible. If it isn't running, the user clicks **Sign in with NFC** to launch it manually.

Okta Verify reads the token. For hardware-protected tokens, Okta Verify participates in a mutual authentication exchange between the token and the Okta backend.
This step proves the physical token is authentic, not only that someone possesses an identifier that matches an enrollment record.

After the token is verified, the Okta backend identifies the user from their enrollment record and sends a PIN challenge to the Sign-In Widget. The user enters
their PIN in the browser to complete sign-in.

See [Sign in with NFC](https://help.okta.com/okta_help.htm?type=oie&id=nfc-signin)<!-- link TBD -->.

## Proximity provider types

Okta maintains a catalog of supported proximity provider types and their items. Use `GET /api/v1/proximity-providers/nfc_pin` to retrieve the catalog for NFC. Each
item in the catalog includes a display name and a `hardwareProtected` boolean.

* `hardwareProtected: true`: the token uses a secure element and requires mutual authentication during verification. The token can't be practically cloned.
* `hardwareProtected: false`: the token stores a plain identifier. The identifier can be physically copied to another token.

For supported hardware models and procurement guidance, see [NFC hardware requirements](https://help.okta.com/okta_help.htm?type=oie&id=nfc-hardware)<!-- link TBD -->.

## Authentication assurance

Authentication assurance differs by token type. The `hardwareProtected` value maps directly to whether the `hwk` AMR claim is present after a successful sign-in.

| Token type | `hardwareProtected` | Factor class | AMR values |
| --- | --- | --- | --- |
| Non-hardware-protected (NTAG) | `false` | Possession and Knowledge | `user`, `pin`, `kba`, `mfa` |
| Hardware-protected (DeSFire) | `true` | Possession and Knowledge | `user`, `pin`, `kba`, `hwk`, `mfa` |

The `hwk` claim indicates that the possession factor required a physical device with a secure element. The mutual authentication step during verification proves the
physical token is authentic, not only that someone has the right identifier. Use this claim when configuring authenticator assurance policies that require
hardware-bound authentication.

## See also

* [Authenticators API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Authenticator/)
* [Proximity Providers API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ProximityProvider/)
* [Multifactor authentication](/docs/concepts/mfa/)
