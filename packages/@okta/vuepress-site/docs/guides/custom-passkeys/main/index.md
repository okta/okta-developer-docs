---
title: Passkeys and custom domains
excerpt: Learn how to customize passkeys with custom domains.
layout: Guides
---

This guide explains different methods for configuring the Passkeys (FIDO2 WebAuthn) authenticator to allow a single passkey to be used across multiple domains. All passkeys must be registered (or re-registered) under the configured RP ID for cross-domain authentication to work.

---

#### Learning outcome

Learn how to configure passkeys with multiple domains.

#### What you need

* [Okta Integrator Free Plan org](https://developer.okta.com/signup)
* A valid and certified [custom domain](#how-to-configure-your-custom-domain-as-an-rp-id)
* The [Passkeys (FIDO2 WebAuthn) authenticator](https://help.okta.com/okta_help.htm?type=oie&id=csh-configure-webauthn) enabled for users in your org and assigned to an [app sign-in policy](/docs/guides/configure-signon-policy/main/#app-sign-in-policies)

> **Note:** As of the `2026.04.0` release, the FIDO2 (WebAuthn) authenticator is now called Passkeys (FIDO2 WebAuthn) and there are new settings and updates to the authenticator page layout. See [Passkeys and WebAuthn](/docs/guides/authenticators-web-authn/aspnet/main/#passkeys-and-okta).

---

## Passkeys and Okta overview

Passkeys are based on the [FIDO2 Web Authentication (WebAuthn) standard](https://fidoalliance.org/fido2-2/fido2-web-authentication-webauthn/). WebAuthn credentials can exist on multiple devices, such as phones, tablets, or laptops, and across multiple operating system platforms. The WebAuthn credentials include biometric data, such as fingerprints or facial recognition. Passkeys enable WebAuthn credentials to be backed up and synchronized across devices.

Passkey credentials are cryptographically bound to a specific domain, known as the [Relying Party ID (RP ID)](https://www.w3.org/TR/webauthn/#relying-party-identifier).

To create a seamless experience where one passkey can work across multiple domains, you can set up your org to use a single, unified RP ID and, for different custom domains, establish a trust relationship between them.

### Add the Passkeys authenticator to your org policies

Before configuring passkeys with the steps in this guide, ensure that the Passkeys (FIDO2 WebAuthn) authenticator is available in your org and added to your authenticator enrollment and app sign-in policies. Configuring the Passkeys authenticator in your policies enables users to register and sign in with passkeys.

1. [Add the Passkeys authenticator](https://help.okta.com/okta_help.htm?type=oie&id=csh-configure-webauthn) to your org.
1. Add the Passkeys authenticator to an [authenticator enrollment policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-mfa-policy) to allow users to register passkeys.
1. Include the Passkeys authenticator in an [app sign-in policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-auth-policy) to allow users to sign in with passkeys.

## Understand custom domains and passkeys

When you're configuring passkeys, there are two types of domains to consider:

* **Root domains**: A root domain is a registrable domain name that's used with a public suffix. For example, in `okta.com`, `okta` is the root domain and `.com` is the suffix. In the context of passkeys and WebAuthn, root domains serve as the RP ID, which is the domain that passkey credentials are cryptographically tied to. Your org's root domain is `okta.com` by default.
* **Subdomains**: Subdomains are domains that exist as a subset under a root domain. `okta.com` is your org's root domain, and your org subdomain typically follows this format: `companyname.okta.com`.

If a user creates a passkey while signing in at `companyname.okta.com`, that passkey is bound to `okta.com` as the RP ID and is only valid for `okta.com` and its subdomains, by default.

But, you can [create up to three custom domains](/docs/guides/custom-url-domain/main/#about-okta-domain-customization) to allow for [multibrand customizations](/docs/concepts/brands/#what-is-multibrand-customization). With a custom domain, you can replace the default Okta domain (`companyname.okta.com`) with a branded domain (`login.company.com`). You can use this branded custom domain as the RP ID for passkeys for your end users.

### How to configure an RP ID

Your custom domain is typically a subdomain of your root domain. For example, if your company's root domain is `globex.com`, you might set up a custom domain like `login.globex.com`. When you're [configuring a custom domain](/docs/guides/custom-url-domain/) you verify that you own the domain. You add TXT and CNAME records to your DNS provider to verify your ownership of the domain.

> **Note:** You can use your custom domain (`login.globex.com`, for example) as the RP ID for passkeys. If you use a verified custom domain as the RP ID, it's not necessary to verify it with the [Verify a Relying Party ID domain endpoint](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Authenticator/#tag/Authenticator/operation/verifyRpIdDomain).

When you want to use a root domain (`globex.com`) as the RP ID for passkeys, you need to verify that you own it. The process for verifying the root domain is different from verifying a custom domain.

Verifying the root domain to use it as an RP ID doesn't require a CNAME record. Instead, you verify the RP ID domain with a TXT record and by using the [Verify a Relying Party ID domain endpoint](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Authenticator/#tag/Authenticator/operation/verifyRpIdDomain). The TXT record is returned in the response when you [set the RP ID domain](#update-the-rp-id-for-the-passkeys-authenticator). The TXT record indicates that you own the root domain and allows you to use it as the RP ID for passkeys.

### Associated domains and passkeys

Associated domains establish a trust relationship between different root domains. When a root domain, such as `globex.com` has a `/.well-known/webauthn` JSON file that lists other associated domains, such as `globex-apac.com`, the browser allows passkeys created with the `globex.com` RP ID to be used on `globex-apac.com`. The `/.well-known/webauthn` JSON file is hosted on the RP ID domain and lists the associated domains that are trusted to use passkeys created with that RP ID.

Associated domains and the `/.well-known/webauthn` JSON file don't merge or bridge passkeys from different RP IDs. The passkey must already be registered under the RP ID configured for your org (for example, `globex.com`). Associated domains only allow the authenticator to present that credential on other origins. A passkey registered under a different RP ID (`okta.com`, for example) isn't usable on the associated domain.

#### Replace an existing RP ID with a new RP ID

Setting an RP ID enables users to register passkeys under that RP ID and use them in subdomains of the root domain. In that case, setting a new RP ID is straightforward because all your users register passkeys with that domain. However, you might be in a scenario where you want to set a new RP ID but still have existing users with passkeys registered under the old RP ID.

When you set a new RP ID, existing passkey enrollments aren't deleted. The enrollments remain in the system, but the browser won't present them at sign-in because the RP ID no longer matches. If you revert to the previous RP ID, those passkeys become usable again.

If you set the new RP ID before allowing users to enroll passkeys, all subsequent passkeys are registered under the new RP ID from the start and no migration is needed.

But, if users have already registered passkeys under the old RP ID, communicate the change and ask affected users to re-enroll. The browser doesn't present a passkey at sign-in if its RP ID doesn't match the current configuration. Users can sign in with another authentication method and then register a new passkey under the new RP ID.

Passkeys registered on the Okta domain (`companyname.okta.com`) are bound to `okta.com` as the RP ID. There's no way to configure `okta.com` as an associated domain for your custom RP ID domain, because `okta.com` is Okta's domain. Your custom domain can't be added to Okta's `/.well-known/webauthn` JSON file. These users must re-enroll their passkeys under the new RP ID.

## Set up passkeys for multiple domains in different ways

You can enable passkeys to work with multiple domains by using the following methods:

* [Configure an RP ID](#configure-an-rp-id): This enables end users to sign in with passkeys across subdomains of a single root domain.
* [Configure associated domains](#use-associated-domains-to-share-passkeys-between-root-domains): This enables end users to sign in with passkeys across different root domains.
* [Use a combination of both methods](#share-passkeys-across-okta-and-custom-domains): This enables end users to sign in with passkeys across all domains, including custom domains and Okta's default domains.

These methods configure where passkeys can be used. Only passkeys registered under the configured RP ID are usable across the associated domains. Passkeys registered under a different RP ID (such as `okta.com`) aren't presented by the browser during sign-in.

### Configure an RP ID

In this scenario, you want to enable users to sign in to `login.globex.com` and `support.globex.com` domains with a passkey. Create a new RP ID for the Passkeys authenticator that uses your root domain (`globex.com`). This RP ID works for all subdomains of `globex.com`.

There are three steps for creating an RP ID for your Passkeys authenticator:

1. [Set your root domain](#update-the-rp-id-for-the-passkeys-authenticator) (`globex.com`) as the RP ID for the Passkeys authenticator.
1. [Verify the RP ID domain](#verify-the-rp-id-domain). This guide assumes that you're using the root domain `globex.com` as your RP ID, instead of a previously verified custom domain.
1. [Enable the RP ID](#enable-the-rp-id-for-the-passkeys-authenticator) for your Passkeys authenticator after verification is complete.

> **Note:** When you set a new RP ID, existing passkey enrollments aren't deleted. However, passkeys registered under a different RP ID aren't presented by the user's authenticator during sign-in, making those enrollments unusable. Only passkeys enrolled under the same domain you're setting as the RP ID continue to work. Users who registered their passkeys with a different RP ID must re-enroll.

#### Update the RP ID for the Passkeys authenticator

Before you create an RP ID, review these steps:

1. Retrieve the `authenticatorId` of the Passkeys authenticator with the [List all authenticators endpoint](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Authenticator/#tag/Authenticator/operation/listAuthenticators).
1. Ensure that you've [set up a custom domain](/docs/guides/custom-url-domain/) that has a valid root domain to use as your RP ID.

> **Note:** When you use a root domain instead of a custom domain as an RP ID, the `/.well-known/webauthn` file must be hosted on the root domain. For example, when you set your RP ID as `globex.com`, the `/.well-known/webauthn` file must be hosted on `https://globex.com/.well-known/webauthn`.
>
> If you use associated domains to share passkeys across different root domains, the `/.well-known/webauthn` file only needs to be hosted on the root domain that you use as the RP ID.

Then, use the [Replace an authenticator method endpoint](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Authenticator/#tag/Authenticator/operation/replaceAuthenticatorMethod) to create an RP ID for the Passkeys authenticator. The response includes the TXT record value that you need to add to your DNS provider to verify ownership of the root domain.

1. Use the following request example as a template.
1. In the path parameters, set the following values:
   * Use the Passkeys `authenticatorId`.
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
        }
    }
}'
```

##### Use the response to create a TXT record

See the following response example. The response includes a `dnsRecord` object. That object contains the `fqdn` and `verificationValue` properties that you can use to create a TXT record in your DNS provider.

Go to your DNS provider and create a TXT record:

1. Use the `fqdn` (fully qualified domain name) value as the name or "Host" for the TXT record.
1. Use the `verificationValue` as the value or data for the TXT record.

After you set the TXT record in your DNS provider, wait for DNS propagation to complete before you [verify the RP ID domain](#verify-the-rp-id-domain). Typically, this takes one to five minutes (but it may take longer).

> **Note:** It may take up to 24 hours for your DNS changes to propagate. If your changes don't appear within 24 hours, return to this step and confirm your settings. Use a tool like [Dig](https://toolbox.googleapps.com/apps/dig/) to check your DNS records.

```json
{
  "type": "webauthn",
  "status": "ACTIVE",
  "settings": {
    "userVerification": "DISCOURAGED",
    "attachment": "ANY",
    "rpId": {
      "enabled": false,
      "domain": {
        "name": "globex.com",
        "validationStatus": "NOT_STARTED",
        "dnsRecord": {
          "recordType": "TXT",
          "fqdn": "_oktaverification.globex.com",
          "verificationValue": "5e2dc662c8ce4f4aa4cd1cd292490d35"
        }
      }
    }
  },
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/authenticators/aut1nd8PQhGcQtSxB0g4/methods/webauthn",
      "hints": {
        "allow": [
          "GET",
          "PUT"
        ]
      }
    },
    "verify-rp-id-domain": {
      "href": "https://{yourOktaDomain}/api/v1/authenticators/aut1nd8PQhGcQtSxB0g4/methods/webauthn/verify-rp-id-domain",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

#### Verify the RP ID domain

Use the [Verify a Relying Party ID domain endpoint](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Authenticator/#tag/Authenticator/operation/verifyRpIdDomain) to verify the RP ID domain. This endpoint checks that the domain is properly configured and that you own it.

After the RP ID domain is verified, you can [enable the RP ID](#enable-the-rp-id-for-the-passkeys-authenticator) for your Passkeys authenticator.

1. Use the following request example as a template.
1. In the path parameters, set the following values:
   * Use the Passkeys `authenticatorId`.
   * Set `webauthn` as the `webAuthnMethodType`.
1. Send the request.

```bash
curl -i -X POST \
  'https://subdomain.okta.com/api/v1/authenticators/{authenticatorId}/methods/{webAuthnMethodType}/verify-rp-id-domain' \
  -H 'Authorization: YOUR_AUTH_INFO_HERE' \
  -H 'Content-Type: application/json' \
  -d '{}'
```

The RP ID domain is verified and can be enabled if its `verificationStatus` is `VERIFIED`.

#### Enable the RP ID for the Passkeys authenticator

After the RP ID domain is verified, use the [Replace an authenticator method endpoint](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Authenticator/#tag/Authenticator/operation/replaceAuthenticatorMethod) again to enable the RP ID for your Passkeys authenticator.

1. Use the [previous request](#update-the-rp-id-for-the-passkeys-authenticator) when you created the RP ID as a template.
1. Set the `rpId.enabled` value to `true`.
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
            "enabled": true
        }
    }
}'
```

##### User experience

When a user signs in to `login.globex.com` and registers a passkey, the passkey is created with the RP ID of `globex.com`. When that user signs in to `support.globex.com`, for example, the browser sees that the passkey's RP ID (`globex.com`) matches the root domain of the subdomain (`support.globex.com`). The browser allows the authentication to proceed.

### Use associated domains to share passkeys between root domains

In this scenario, you want users with a passkey that's created with the `globex.com` RP ID to also be able to sign in to `globex-apac.com`. This method enables end users to sign in to those root domains with the same passkey.

Before you begin, review these steps:

* [Configure and enable a custom RP ID for your org](#configure-an-rp-id). Passkeys must be registered under this RP ID to work across associated domains.
* Retrieve the `brandId` for your primary brand.
* Confirm that all domains you want to associate are valid.

Then, use the [Associated Domain Customizations API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/AssociatedDomainCustomizations/) to configure your primary brand to trust another root domain.

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

When a user attempts to sign in to an app on the `globex-apac.com` domain with a passkey, the browser inspects the RP ID of the passkey. The browser requests the `/.well-known/webauthn` file of the RP ID domain. If `globex-apac.com` is listed in the file, then the user is able to sign in.

If the passkey's RP ID doesn't match the configured RP ID for the associated domain (for example, the passkey was registered under okta.com but the associated domain expects globex.com), the browser won't present the credential and authentication fails. The user must re-enroll their passkey under the correct RP ID.

### Share passkeys across Okta and custom domains

In this scenario, you want a single passkey to work for `globex.com` (custom root domain), `login.globex.com` and `support.globex.com` (subdomains), `globex-apac.com` (other custom root domain), and `globex.okta.com` (your org domain).

> **Note:** Adding `globex.okta.com` to the associated domains list allows passkeys registered under the `globex.com` RP ID to be presented when users visit `globex.okta.com`. It doesn't make passkeys that are previously registered under the `okta.com` RP ID (credentials enrolled at `globex.okta.com` before this configuration, for example), work on `globex.com` or its subdomains. Users with passkeys registered under the old RP ID must re-enroll.

Before you begin, ensure that you've done the following:

* [Set `globex.com` as your primary RP ID](#use-an-rp-id-to-share-passkeys-between-multiple-subdomains). Setting `globex.com` as your primary RP ID enables passkeys to work for all its subdomains (`login.globex.com`, for example).
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

* [About associated domains](/docs/guides/custom-well-known-uri/main/#about-associated-domains)
* [Customize domain and email address](/docs/guides/custom-url-domain/main/)
* [Associated Domain Customizations API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/AssociatedDomainCustomizations/)
* [Authenticator API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Authenticator/)
