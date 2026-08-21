---
title: Proximity authentication
meta:
  - name: description
    content: An overview of proximity authentication in Okta and how the NFC authenticator enables secure sign-in for shared device environments.
---

# Proximity authentication

<ApiLifecycle access="ea" />

Proximity authentication verifies a user's identity by detecting the physical proximity of a paired card, token, or other device to a host system. Implementations vary in the detection mechanism and token type that they use to establish proximity. Some systems verify a user's palm or face as they approach a reader, rather than requiring a physical card or token.

In Okta, the [NFC authenticator](https://help.okta.com/okta_help.htm?type=oie&id=configure-nfc-authenticator) implements proximity authentication by using NFC cards. A user taps an NFC card to a compatible reader, and Okta Verify reads the card and identifies the user. The Sign-In Widget then prompts the user to enter a PIN. The NFC authenticator is the only proximity authenticator that Okta currently supports.

The NFC authenticator is suited to shared device environments where workers don't use personal devices. For example, it can be used by workers on factory floors, in retail locations, in warehouses, or in hospitality settings. In those environments, traditional authentication methods like passwords or personal device-based MFA create operational friction or aren't practical.

## How proximity authentication fits in Okta

Proximity authentication works within Okta's standard authenticator and authentication policy framework. `proximity` is the authenticator type for physical proximity-based authenticators. The key for the NFC authenticator is `nfc_pin` and it's currently the only supported proximity authenticator. See [Understand authenticator terminology with Okta APIs](/docs/concepts/mfa/#understand-authenticator-terminology-with-okta-apis).

Like other Okta authenticators, you configure the NFC authenticator at the org level and assign it to authentication policies.

The NFC authenticator satisfies two factor types simultaneously:

* **Possession:** The physical NFC card proves that the user has a specific object in their control.
* **Knowledge:** The PIN proves that the user knows a secret value.

A single sign-in with the NFC authenticator can satisfy an MFA requirement without requiring other authenticators. The assurance level that it contributes to a session depends on the NFC tag type. Hardware-protected NFC tags require a mutual authentication step. Mutual authentication is a process where both the card and Okta verify each other's identity using cryptographic keys. This step proves that the physical card is present and contributes to the `hwk` AMR claim. See [Authentication assurance](#authentication-assurance).

## How NFC authentication works

Proximity authentication using the NFC authenticator involves the following three components:

* **Okta Verify**: Okta Verify is an app that's installed on the workstation. It acts as the proximity agent and handles all NFC hardware interaction between the device, the reader, and the card.
  > **Note:** Only managed Okta Verify installations on Windows desktop devices can participate in NFC authentication, currently. See [Configure the NFC authenticator](https://help.okta.com/okta_help.htm?type=oie&id=configure-nfc-authenticator) for prerequisites and setup steps.
* **Sign-In Widget**: The Sign-In Widget is the browser-based authentication interface. It presents the sign-in flow to the user, initiates the NFC interaction by contacting Okta Verify, and collects the PIN when Okta sends a challenge. You can customize and embed the Sign-In Widget in your app. See [Sign-In Widget (third generation)](/docs/guides/custom-widget-gen3/main/).
* **Okta**: Okta creates and manages enrollment records, generates and stores cryptographic material for hardware-protected tags, and identifies the user during verification.

Because Okta Verify runs on the device and not in a browser, it doesn't handle PIN entry. The PIN challenge is always routed to the Sign-In Widget.

> **Note:** A managed Okta Verify installation is registered to a single Okta org. In an [Org2Org](https://help.okta.com/okta_help.htm?type=oie&id=ext-org2org-intg) (hub-and-spoke) configuration, a user signs in to a target org through an Org2Org IdP. NFC authentication is available only for the org that the device's Okta Verify installation is registered to, not for a target org reached from that device. As a result, in a multi-org deployment, a worker on a shared device can use NFC authentication only for the device's registered org.

The NFC card's role in proximity authentication depends on how authentication data is stored on it. Every NFC card has a unique identifier (UID) assigned by the manufacturer. During enrollment, Okta reads this UID and stores a record that links it to a user. Cards without hardware protection expose their UID as plain, readable data. Those cards are typically low-cost and easy to reuse and reassign between users. The PIN is the primary security control.

Hardware-protected cards store encryption keys in a secure element, a chip designed so that the keys can't be read or removed. A copy of the card doesn't contain those keys and can't be assigned to another user for authentication. See [Proximity provider types](#proximity-provider-types) and [Authentication assurance](#authentication-assurance).

### Enroll an NFC authenticator

The following steps describe the enrollment process for a user with a new NFC card:

1. The Sign-In Widget contacts Okta Verify through a deep link to initiate the NFC read.
1. The user taps their NFC card on the reader.
1. Okta Verify reads the card's unique identifier (UID) and sends it to Okta. Okta uses this UID during verification to look up the user's enrollment record and confirm that the card is registered to a user.
1. For hardware-protected tags only, Okta generates cryptographic keys, and Okta Verify writes them to the card's secure element. This step also locks the card, which prevents any entity other than Okta from writing to it. Factory-fresh hardware-protected cards can be provisioned without admin intervention.
1. Okta creates the enrollment record.
1. The Sign-In Widget prompts the user to enter and confirm a PIN.
1. The PIN is hashed and stored server-side and isn't written to the card.

See [End-user experience for the NFC authenticator](https://help.okta.com/okta_help.htm?type=oie&id=nfc-end-user-experience).

### Sign in with an NFC authenticator

The following steps describe the sign-in process for a user with an enrolled NFC card:

1. If enabled for your org, the Sign-In Widget shows a **Sign in with NFC** button on managed devices. The user can select this button, or NFC authentication can trigger automatically after they enter their username, depending on your authentication policy. Okta Verify launches automatically in the background when possible. If it isn't running, the user must launch it manually.
1. The user taps their NFC card on the reader.
1. Okta Verify reads the card.
1. For hardware-protected tags only, Okta and the NFC card authenticate each other in a challenge-response exchange relayed through Okta Verify. The card sends Okta an encrypted challenge, and Okta responds with its own. Each side verifies the other before Okta accepts the card as genuine. A copied identifier alone can't pass this exchange.
1. Okta identifies the user from their enrollment record and sends a PIN challenge to the Sign-In Widget.
1. The user enters their PIN in the browser to complete their sign-in.

See [End-user experience for the NFC authenticator](https://help.okta.com/okta_help.htm?type=oie&id=nfc-end-user-experience).

## Proximity provider types

Okta maintains a catalog of supported proximity provider types and their items. Use the Retrieve the supported items for a proximity provider type [endpoint](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/proximityprovider/other/getbyproximityprovidertype) to retrieve the catalog of items for a given provider type, such as the NFC tags supported by the NFC authenticator. Each item in the catalog includes an `id`, a display `name`, and an `authenticatorCharacteristics` object containing a `hardwareProtected` boolean.

* `authenticatorCharacteristics.hardwareProtected: true`: For NFC tags, the card contains a secure element that stores cryptographic keys. During verification, Okta and the card perform a mutual authentication exchange: each side proves it holds the correct keys through a challenge-response sequence. Because the keys exist only inside the secure element and can't be read or extracted, a copied card fails this exchange.
* `authenticatorCharacteristics.hardwareProtected: false`: For NFC tags, the card exposes its UID as plain data that Okta reads during authentication. The UID has no cryptographic protection and can be copied to a blank card using any NFC reader app. An attacker with a cloned card can attempt to authenticate as the original owner. The PIN is the only control against unauthorized sign-in.

For supported hardware models and procurement guidance, see [Supported NFC card types](https://help.okta.com/okta_help.htm?type=oie&id=nfc-supported-cards).

## Authentication assurance

Authentication assurance differs by tag type. The `authenticatorCharacteristics.hardwareProtected` value in the API response maps directly to whether the `hwk` AMR claim is present after a successful sign-in.

| Tag type | `hardwareProtected` | Factor class | AMR values |
| --- | --- | --- | --- |
| Non-hardware-protected (NTAG) | `false` | Possession and knowledge | `user`, `pin`, `kba`, `mfa` |
| Hardware-protected (DESFire) | `true` | Possession and knowledge | `user`, `pin`, `kba`, `hwk`, `mfa` |

The `hwk` claim indicates that the possession factor required a physical device with a secure element. The mutual authentication step during verification proves that the physical card is authentic, and not only that someone has the right identifier. Use this claim when configuring authenticator assurance policies that require hardware-bound authentication.

## See also

* [Authenticators API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Authenticator/)
* [Proximity Providers API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ProximityProvider/)
* [Multifactor authentication](/docs/concepts/mfa/)
