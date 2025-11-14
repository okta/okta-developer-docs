---
title: Passkeys and custom domains
excerpt: Learn how to customize passkeys with custom domains.
layout: Guides
---

This guide explains how to configure the FIDO2 (WebAuthn) authenticator to allow a single passkey to be used across multiple domains.

---

#### Learning outcomes

Learn how to configure passkeys with multiple domains.

#### What you need

* [Okta Integrator Free Plan org](https://developer.okta.com/signup)
* A valid and certified [custom domain](/docs/guides/custom-url-domain)
* The [WebAuthn authenticator](https://help.okta.com/oie/en-us/content/topics/identity-engine/authenticators/configure-webauthn.htm) enabled for users in your org

---

## Passkeys and custom domains

Passkeys are based on the [FIDO2 Web Authentication (WebAuthn) standard](https://fidoalliance.org/fido2-2/fido2-web-authentication-webauthn/). WebAuthn credentials can exist on multiple devices, such as phones, tablets, or laptops, and across multiple operating system platforms. Passkeys enable WebAuthn credentials to be backed up and synchronized across devices.

Passkey credentials are cryptographically bound to a specific domain, known as the [Relying Party ID (RP ID)](https://www.w3.org/TR/webauthn/#relying-party-identifier).

> **Note:** You can use passkeys in your org through the [WebAuthn authenticator](https://help.okta.com/okta_help.htm?type=oie&id=csh-configure-webauthn).

### Why use passkeys

For orgs that operate multiple brands or have different subdomains for their apps, passkeys can provide a streamlined sign-in experience for end users. For example, your users can access various apps with a passkey when they set up a passkey with the `example.com` domain. However, if a user needs to access another app associated with a subdomain, `app1.example.com`, for example, that same passkey won't work by default. The original passkey is only valid for the domain where it was created.

To create a seamless experience where one passkey works across multiple domains, you can set up your org to use a single, unified RP ID and, for different custom domains, establish a trust relationship between them.

You can enable passkey sharing by [configuring an RP ID](#use-an-rp-id-for-subdomains) or by using [associated domains](#use-associated-domains-for-different-root-domains).

## Use an RP ID for subdomains

This method allows you to share passkeys between subdomains. For example, you can use an RP ID to support passkeys for the `app1.example.com` and `app2.example.com` domains.

Configure your WebAuthn authenticator to use your root domain (`example.com`) as its RP ID. When a user registers a passkey on any subdomain, the passkey is stamped with the `example.com` RP ID.

Before you create an RP ID, retrieve the `authenticatorId` of the WebAuthn authenticator with the [List all authenticators](hhttps://developer.okta.com/docs/api/openapi/okta-management/management/tag/Authenticator/#tag/Authenticator/operation/listAuthenticators) endpoint. Ensure that you also have the domain that you want to use as your RP ID set up as a [custom domain](/docs/guides/custom-url-domain).

Then, use the [Replace an authenticator method endpoint](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Authenticator/#tag/Authenticator/operation/replaceAuthenticatorMethod) to create an RP ID for the WebAuthn authenticator.

1. Use the following request example as a template.
1. In the path parameters, set the following values:
   * Use the WebAuthn `authenticatorId`.
   * Set `webauthn` as the `methodType`.
1. Set your domain name as the `rpId.domain.name`. For example, `example.com`.
1. Send the request.

```bash
curl -i -X PUT \
  'https://subdomain.okta.com/api/v1/authenticators/{authenticatorId}/methods/{methodType}' \
  -H 'Authorization: YOUR_AUTH_INFO_HERE' \
  -H 'Content-Type: application/json' \
  -d '{
  "status": "ACTIVE",
  "type": "webauthn",
  "settings": {
    "userVerification": "DISCOURAGED",
    "attachment": "ANY",
    "rpId": {
      "domain": {
        "name": "example.com"
      },
      "enabled": false
    },
    "enableAutofillUI": false
  }
}'
```

### User experience

When a user registers a passkey on any subdomain (`app1.example.com`, for example), the passkey is created with the RP ID of `example.com`. When that user signs in to another subdomain (`app2.example.com`, for example), the browser sees that the passkey's RP ID (`example.com`) matches the root domain of the subdomain (`app2.example.com`). The browser allows the authentication to proceed.

## Use associated domains for different root domains

This method lets you share passkeys between different root domains, such as `example.com`, `examplegames.com`, or your org domain (`example.okta.com`).

Configure your primary brand to trust additional domains using the [Associated Domain Customizations API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/AssociatedDomainCustomizations/). When a user attempts to authenticate on a secondary domain, the browser checks the `/.well-known/webauthn` file on your primary domain. If the secondary domain is listed, the authentication continues.

Before you begin, make sure you have the `brandId` for your primary brand. Ensure that all domains you want to associate are valid.

Then, use the Associated Domain Customizations API to add trusted domains.

1. Use the following request as a template.
2. In the path parameters, set the value of `brandId` for your primary domain.
3. Add all trusted domains to the `origins` array.
4. Send the request.

```bash
curl -i -X PUT \
  'https://your-org.okta.com/api/v1/brands/{brandId}/well-known-uris/webauthn/customized' \
  -H 'Authorization: YOUR_AUTH_INFO_HERE' \
  -H 'Content-Type: application/json' \
  -d '{
  "representation": {
    "origins": [
      "https://examplegames.com",
      "https://example.okta.com"
    ]
  }
}'
```

### User experience

When a user presents a passkey from `example.com` on `examplegames.com`, the browser checks the `/.well-known/webauthn` file on `example.com`. If `examplegames.com` is listed, then the user is able to sign in.

## Use cases for associated domains and RP IDs

Follow the scenario that matches your organization's needs:

* [Share passkeys between multiple subdomains](#share-passkeys-between-multiple-subdomains): This use case lets you share passkeys between subdomains of a single root domain.
* [Share passkeys between different root domains](#share-passkeys-between-different-root-domains): This use case lets you share passkeys between different root domains, such as `example.com` and `examplegames.com`.
* [Share passkeys across Okta and custom domains](#share-passkeys-across-okta-and-custom-domains): This use case lets you share passkeys across all domains, including custom domains and Okta's default domains.

### Share passkeys between multiple subdomains

In this scenario, you want a passkey to work for both `app1.example.com` and `app2.example.com`. You only need to set the Custom RP ID to your root domain.

> **Note:** Changing the RP ID `domain` invalidates all existing passkeys for all users. You must notify your users that they will need to re-enroll their passkeys.

### Share passkeys between different root domains

In this scenario, you want a passkey to work for both `atko.com` and `atkogames.com`.

This requires using Associated Domains. This guide assumes `atko.com` is your primary brand and login domain.

1. First, complete all steps from **Scenario 1** to set `atko.com` as your primary RP ID.
1. Find the `brandId` associated with your primary domain (`atko.com`).
1. Send a `PUT` request to the Associated Domain Customizations API, listing your other root domain in the `origins` array.

```json
{
  "representation": {
    "origins": [
      "https://atkogames.com"
    ]
  }
}
```

Now, when a user on `atkogames.com` tries to authenticate, your app will request a passkey for `rpId: "atko.com"`. The browser will check `https.://atko.com/.well-known/webauthn`, see `atkogames.com` in the `origins` list, and allow the authentication.

### Share passkeys across Okta and custom domains

In this scenario, you want a single passkey to work for `atko.com` (root), `app1.atko.com` (subdomain), `atkogames.com` (different root), and `atko.okta.com` (your org domain).

This is a comprehensive solution that combines the previous two scenarios.

1. First, complete all steps from **Scenario 1** to set `atko.com` as your primary RP ID. This step automatically covers `atko.com` and all its subdomains (like `app1.atko.com`).
1. Find the `brandId` associated with your primary domain (`atko.com`).
1. Send a `PUT` request to the Associated Domain Customizations API, listing all other domains that are *not* subdomains of your primary RP ID.

```json
{
  "representation": {
    "origins": [
      "https://atkogames.com",
      "https://atko.okta.com"
    ]
  }
}
```

> **Note:** While you can explicitly add subdomains like `https://app1.atko.com` to the `origins` list, it's not required. The browser's native subdomain policy (from Step 1) already covers them.

With this configuration, a single passkey registered with the `atko.com` RP ID is now trusted and can be used across your entire brand ecosystem.

## See also

* [Associated Domain Customizations API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/AssociatedDomainCustomizations/)
* [Authenticator API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Authenticator/)
* [Configure a custom domain](https://developer.okta.com/docs/guides/custom-url-domain/main/)
