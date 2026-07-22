---
title: Proximity authentication
meta:
  - name: description
    content: An overview of proximity authentication in Okta and how the NFC authenticator enables secure sign-in for shared device environments.
---

# Proximity authentication

<ApiLifecycle access="ea" />

Proximity authentication is a possession-based authentication approach that requires users to tap a physical card to a near-field communication (NFC) reader to prove their identity. When combined with a PIN, it satisfies both possession and knowledge factor requirements in a single sign-in step without requiring a username.

In Okta, the [NFC authenticator](https://help.okta.com/en/proximity-authentication) implements this approach using NFC cards. A user taps an NFC card to a compatible reader, Okta Verify reads the card and identifies the user. The Sign-In Widget then prompts the user to enter a PIN.

The NFC authenticator is suited to shared device environments where workers don't use personal devices. For example, it can be used by workers in factory floors, retail locations, warehouses, and healthcare settings. In those environments, traditional authentication methods like passwords or personal device-based MFA create operational friction or aren't practical.

## How proximity authentication fits in Okta

Proximity authentication works within Okta's standard authentication policy framework. Like other Okta authenticators, you configure the NFC authenticator at the org level and assign it to authentication policies.

The NFC authenticator satisfies two factor types simultaneously:

* **Possession:** The physical NFC card proves that the user has a specific object in their control.
* **Knowledge:** The PIN proves that the user knows a secret value.

A single sign-in with the NFC authenticator can satisfy an MFA requirement without requiring other authenticators. The assurance level that it contributes to a session depends on the NFC tag type. Hardware-protected NFC tags require a mutual authentication step. Mutual authentication is a process where both the card and Okta verify each other's identity using cryptographic keys. This step proves that the physical card is present and contributes the `hwk` AMR claim. See [Authentication assurance](#authentication-assurance).

`proximity` is the authenticator type for physical proximity-based authenticators. The key for the NFC authenticator is `nfc_pin` and it’s currently the only supported proximity authenticator. See [Understand authenticator terminology with Okta APIs](/docs/concepts/mfa/#understand-authenticator-terminology-with-okta-apis).

## How proximity authentication works

Proximity authentication involves the following three components:

* **Okta Verify**: Okta Verify is an app that's installed on the Windows device. It acts as the proximity agent and handles all NFC hardware interaction between the device, the reader, and the card.
  > **Note:** NFC authentication can only be used with Okta Verify on Windows devices currently.
* **Sign-In Widget**: The Sign-In Widget is the browser-based authentication interface. It presents the sign-in flow to the user, initiates the NFC interaction by contacting Okta Verify, and collects the PIN when Okta sends a challenge. You can customize and embed the Sign-In Widget in your app. See [Sign-In Widget (third generation)](/docs/guides/custom-widget-gen3/main/).
* **Okta**: Okta creates and manages enrollment records, generates and stores cryptographic material for hardware-protected tags, and identifies the user during verification.

Because Okta Verify runs on the device and not in a browser, it doesn't handle PIN entry. The PIN challenge is always routed to the Sign-In Widget. Users enter their PIN in the browser, not in the Okta Verify app.

The NFC card's role in proximity authentication depends on how authentication data is stored on it. During enrollment, Okta writes a unique enrollment identifier to the NFC card that links it to a user. Cards without hardware protection store this identifier as plain data. Those cards are typically low cost and easy to reuse and reassign between users. The PIN is the primary security control.

Hardware-protected cards store encryption keys in a secure element, a chip designed so that the keys can't be read or removed. A copy of the card doesn't contain those keys and can't be assigned to another user for authentication. See [Proximity provider types](#proximity-provider-types) and [Authentication assurance](#authentication-assurance).

## Managed device requirement

Okta Verify must be installed on a managed Windows device and configured to handle proximity authentication through your mobile device management (MDM) platform. This ensures that only organizationally managed Okta Verify installations can participate in NFC authentication.

For prerequisites and setup steps, see [Configure the NFC authenticator](https://help.okta.com/okta_help.htm?type=oie&id=nfc-configure).

## Enroll an NFC authenticator

The following steps describe the enrollment process for a user with a new NFC card:

1. The Sign-In Widget contacts Okta Verify through a deep link to initiate the NFC read.
1. The user taps their NFC card to the reader.
1. Okta Verify reads the card and writes a unique enrollment identifier to it. Okta uses this identifier during verification to look up the user's enrollment record and confirm that the card is registered to a user.
1. For hardware-protected tags only, Okta generates cryptographic keys and Okta Verify writes them to the card's secure element, locking the card against tampering. Factory-fresh hardware-protected cards can be provisioned without admin intervention.
1. Okta creates the enrollment record.
1. The Sign-In Widget prompts the user to enter and confirm a PIN.
1. The PIN is hashed and stored server-side and isn't written to the card.

See [End-user experience for the NFC authenticator](https://help.okta.com/okta_help.htm?type=oie&id=nfc-enroll).

## Sign in with an NFC authenticator

The following steps describe the sign-in process for a user with an enrolled NFC card:

1. The Sign-In Widget shows a **Sign in with NFC** button on managed devices where Okta Verify is configured for proximity authentication. Okta Verify launches automatically in the background when possible. If it isn't running, the user selects **Sign in with NFC** to launch it manually.
1. The user taps their NFC card to the reader.
1. Okta Verify reads the card.
1. For hardware-protected tags only, Okta Verify relays a cryptographic challenge between Okta and the card. The card must prove it holds the correct keys from its secure element before Okta accepts the authentication. This confirms that the physical card is present. A copied identifier alone can’t pass this check.
1. Okta identifies the user from their enrollment record and sends a PIN challenge to the Sign-In Widget.
1. The user enters their PIN in the browser to complete their sign-in.

See [End-user experience for the NFC authenticator](https://help.okta.com/okta_help.htm?type=oie&id=nfc-signin).

## Proximity provider types

Okta maintains a catalog of supported proximity provider types and their items. Use the Retrieve the supported items for a proximity provider type [endpoint](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/proximityprovider/other/getbyproximityprovidertype) to retrieve the catalog of NFC tags for the NFC authenticator. Each item in the catalog includes an `id`, a display `name`, and an `authenticatorCharacteristics` object containing a `hardwareProtected` boolean.

* `authenticatorCharacteristics.hardwareProtected: true`: The card contains a secure element that stores cryptographic keys. During verification, Okta and the card perform a mutual authentication exchange: each side proves it holds the correct keys through a challenge-response sequence. Because the keys exist only inside the secure element and can't be read or extracted, a copied card fails this exchange.
* `authenticatorCharacteristics.hardwareProtected: false`: The card stores a plain identifier that Okta reads during authentication. The identifier has no cryptographic protection and can be copied to a blank card using any NFC reader app. An attacker with a cloned card can attempt to authenticate as the original owner. The PIN is the only control against unauthorized sign-in.

For supported hardware models and procurement guidance, see [Supported NFC card types](https://help.okta.com/okta_help.htm?type=oie&id=nfc-hardware).

## Authentication assurance

Authentication assurance differs by tag type. The `authenticatorCharacteristics.hardwareProtected` value in the API response maps directly to whether the `hwk` AMR claim is present after a successful sign-in.

| Tag type | `hardwareProtected` | Factor class | AMR values |
| --- | --- | --- | --- |
| Non-hardware-protected (NTAG) | `false` | Possession and knowledge | `user`, `pin`, `kba`, `mfa` |
| Hardware-protected (DESFire) | `true` | Possession and knowledge | `user`, `pin`, `kba`, `hwk`, `mfa` |

The `hwk` claim indicates that the possession factor required a physical device with a secure element. The mutual authentication step during verification proves that the physical card is authentic, not only that someone has the right identifier. Use this claim when configuring authenticator assurance policies that require
hardware-bound authentication.

## See also

* [Authenticators API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Authenticator/)
* [Proximity Providers API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ProximityProvider/)
* [Multifactor authentication](/docs/concepts/mfa/)
