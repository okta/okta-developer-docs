---
title: Passkeys and custom domains
excerpt: Learn how to customize passkeys with custom domains.
layout: Guides
---

This guide explains different methods for configuring the FIDO2 (WebAuthn) authenticator to allow a single passkey to be used across multiple domains.

---

#### Learning outcome

Learn how to configure passkeys with multiple domains.

#### What you need

* [Okta Integrator Free Plan org](https://developer.okta.com/signup)
* A valid and certified [custom domain](/docs/guides/custom-url-domain)
* The [WebAuthn authenticator](https://help.okta.com/oie/en-us/content/topics/identity-engine/authenticators/configure-webauthn.htm) enabled for users in your org

---

## What are passkeys

Passkeys are based on the [FIDO2 Web Authentication (WebAuthn) standard](https://fidoalliance.org/fido2-2/fido2-web-authentication-webauthn/). WebAuthn credentials can exist on multiple devices, such as phones, tablets, or laptops, and across multiple operating system platforms. The WebAuthn credentials include biometric data, such as fingerprints or facial recognition. Passkeys enable WebAuthn credentials to be backed up and synchronized across devices.

Passkey credentials are cryptographically bound to a specific domain, known as the [Relying Party ID (RP ID)](https://www.w3.org/TR/webauthn/#relying-party-identifier).

> **Note:** You can use passkeys in your org through the [WebAuthn authenticator](https://help.okta.com/okta_help.htm?type=oie&id=csh-configure-webauthn).

To create a seamless experience where one passkey can work across multiple domains, you can set up your org to use a single, unified RP ID and, for different custom domains, establish a trust relationship between them.

## Understand custom domains and passkeys

When you're configuring passkeys, there are two types of domains to consider:

* **Root domains**: A root domain is a registrable domain name that's used with a public suffix. For example, in `okta.com`, `okta` is the root domain and `.com` is the suffix. In the context of passkeys and WebAuthn, root domains serve as the RP ID, which is the domain that passkey credentials are cryptographically tied to. Your org's root domain is `okta.com` by default.
* **Subdomains**: Subdomains are domains that exist as a subset under a root domain. `okta.com` is your org's root domain, and your org subdomain typically follows this format: `companyname.okta.com`.

If a user creates a passkey when their browser is on `okta.com`, that passkey is only valid for `okta.com`, by default.

But, you can [create up to three custom domains](/docs/guides/custom-url-domain/main/#about-okta-domain-customization) to allow for [multibrand customizations](/docs/concepts/brands/#what-is-multibrand-customization). With a custom domain, you can replace the default Okta domain (`companyname.okta.com`) with a branded domain (`login.company.com`). You can use this branded custom domain as the RP ID for passkeys for your end users.

## Set up passkeys for multiple domains in different ways

You can enable passkeys to work with multiple domains by using the following methods:

* [Configure an RP ID](#use-an-rp-id-to-share-passkeys-between-multiple-subdomains): This enables end users to sign in with passkeys across subdomains of a single root domain.
* [Configure associated domains](#use-associated-domains-to-share-passkeys-between-root-domains): This enables end users to sign in with passkeys across different root domains.
* [Use a combination of both methods](#share-passkeys-across-okta-and-custom-domains): This enables end users to sign in with passkeys across all domains, including custom domains and Okta's default domains.

### Use an RP ID to share passkeys between multiple subdomains

In this scenario, you want to enable users to sign in to `login.globex.com` and `support.globex.com` domains with a passkey. Create a new RP ID for the WebAuthn authenticator that uses your root domain (`globex.com`). This RP ID works for all subdomains of `globex.com`.

There are two steps for creating an RP ID for your WebAuthn authenticator:

1. Use the [Replace an authenticator method endpoint](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Authenticator/#tag/Authenticator/operation/replaceAuthenticatorMethod) to set your root domain (`globex.com`) as the RP ID for the WebAuthn authenticator.
2. Then, verify the domain ownership by using the [Verify RP ID domain endpoint](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Authenticator/#tag/Authenticator/operation/verifyRpIdDomain).

> **Note:** Changing the RP ID `domain` invalidates all existing passkeys for all users. You must notify your users that they need to re-enroll their passkeys if you replace an existing RP ID.

#### Update the RP ID for the WebAuthn authenticator

Before you create an RP ID, retrieve the `authenticatorId` of the WebAuthn authenticator with the [List all authenticators endpoint](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Authenticator/#tag/Authenticator/operation/listAuthenticators). Ensure that you also have the domain that you want to use as your RP ID set up as a [custom domain](/docs/guides/custom-url-domain).

Then, use the [Replace an authenticator method endpoint](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Authenticator/#tag/Authenticator/operation/replaceAuthenticatorMethod) to create an RP ID for the WebAuthn authenticator.

1. Use the following request example as a template.
1. In the path parameters, set the following values:
   * Use the WebAuthn `authenticatorId`.
   * Set `webauthn` as the `methodType`.
1. Set your domain name as the `rpId.domain.name`. For example, set the `name` as `globex.com`.
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
        "name": "globex.com"
      },
      "enabled": false
    },
    "enableAutofillUI": false
  }
}'
```

##### User experience

When a user signs in to `login.globex.com` and registers a passkey, the passkey is created with the RP ID of `globex.com`. When that user signs in to `support.globex.com`, for example, the browser sees that the passkey's RP ID (`globex.com`) matches the root domain of the subdomain (`support.globex.com`). The browser allows the authentication to proceed.

### Use associated domains to share passkeys between root domains

In this scenario, you want users with a passkey that's created with the `globex.com` RP ID to also be able to sign in to `globex-apac.com`. This method enables end users to sign in to those root domains with the same passkey.

Configure your primary brand to trust another domain using the [Associated Domain Customizations API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/AssociatedDomainCustomizations/). When a user attempts to authenticate on a secondary domain, the browser checks the `/.well-known/webauthn` file on your primary domain. If the secondary domain is listed, the authentication continues.

Before you begin, ensure that you have the `brandId` for your primary brand. Ensure that all domains you want to associate are valid.

Then, use the [Associated Domain Customizations API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/AssociatedDomainCustomizations/) to configure the other root domains.

1. Use the following request as a template.
1. In the path parameters, set the following values:
   * Set the value of `brandId` for your primary domain.
   * Set the value of `path` to `webauthn`.
1. Add the `https://globex-apac.com` domain to the `origins` array.
1. Send the request.

```bash
curl -i -X PUT \
  'https://subdomain.okta.com/api/v1/brands/{brandId}/well-known-uris/{path}/customized' \
  -H 'Authorization: YOUR_AUTH_INFO_HERE' \
  -H 'Content-Type: application/json' \
  -d '{
  "representation": {
    "origins": [
      "https://globex-apac.com",
    ]
  }
}'
```

#### User experience

When a user signs in to `globex-apac.com` with a passkey from `globex.com`, the browser checks the `/.well-known/webauthn` file on `globex.com`. If `globex-apac.com` is listed, then the user is able to sign in.

### Share passkeys across Okta and custom domains

In this scenario, you want a single passkey to work for `globex.com` (custom root domain), `login.globex.com` and `support.globex.com` (subdomains), `globex-apac.com` (other custom root domain), and `globex.okta.com` (your org domain).

Before you begin, ensure that you've done the following:

* [Set `globex.com` as your primary RP ID](#use-an-rp-id-to-share-passkeys-between-multiple-subdomains). Setting `globex.com` as your primary RP ID automatically covers `globex.com` and all its subdomains, like `login.globex.com`, for example.
* Ensure that you have the `brandId` for your primary brand and that all domains you want to associate are valid.

Then, use the [Associated Domain Customizations API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/AssociatedDomainCustomizations/) to add `globex.okta.com` as a trusted root domain.

1. Use the following request as a template.
1. In the path parameters, set the following values:
   * Set the value of `brandId` for your primary domain.
   * Set the value of `path` to `webauthn`.
1. Add `https://globex.okta.com` to the `origins` array.
1. Send the request.

```bash
curl -i -X PUT \
  'https://subdomain.okta.com/api/v1/brands/{brandId}/well-known-uris/{path}/customized' \
  -H 'Authorization: YOUR_AUTH_INFO_HERE' \
  -H 'Content-Type: application/json' \
  -d '{
  "representation": {
    "origins": [
      "https://globex.okta.com",
    ]
  }
}'
```

> **Note:** While you can explicitly add subdomains like `https://login.globex.com` to the `origins` list, it's not required. The browser's subdomain policy accepts those subdomains already because of the RP ID.

#### User experience

When a user registers a passkey on any of the listed domains, the passkey is created with the RP ID of `globex.com`. The browser recognizes that the passkey's RP ID matches the root domain for `login.globex.com` and trusts the other associated domains. `globex-apac.com` and `globex.okta.com` are trusted because they're listed in the `/.well-known/webauthn` file.

With this configuration, a single passkey registered with the `globex.com` RP ID is now trusted and can be used across your entire brand ecosystem.

## See also

* [Associated Domain Customizations API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/AssociatedDomainCustomizations/)
* [About associated domains](/docs/guides/custom-well-known-uri/main/#about-associated-domains)
* [Authenticator API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Authenticator/)
* [Configure a custom domain](https://developer.okta.com/docs/guides/custom-url-domain/main/)
