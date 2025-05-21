---
title: Customize domain and email address
excerpt: Learn how to setup a custom domain and a custom email address.
layout: Guides
---

This guide explains how to customize your Okta org with your custom domain. It also explains how to configure a custom email address so that you can present a branded experience to your end users.

> **Note:** Some orgs support [DNSSEC (Domain Name System Security Extensions)](https://datatracker.ietf.org/doc/html/rfc9364) and need to point their custom domain to `example.okta-dnssec.com`, instead of `example.okta.com`. This value appears for all new and existing custom domains and allows you to be DNSSEC compliant. See [Supportability for DNSSEC in Okta Organizations](https://support.okta.com/help/s/article/supportability-for-dnssec-in-okta-organizations?language=en_US).

---

#### Learning outcomes

* Customize the Okta subdomain (using an Okta-managed certificate or using your own Transport Layer Security (TLS) certificate)
* Configure a custom email address

#### What you need

For customizing an Okta-managed domain or using your own TLS certificate:

* A domain that you own, for example, `example.com`
* A subdomain that you want to use, for example, `login.example.com`

For customizing a domain using your own TLS certificate:

* A valid TLS certificate for your subdomain (2048 bits, 3072 bits, or 4096 bits) (PEM-encoded)
* A private key (2048 bits, 3072 bits, or 4096 bits) (PEM-encoded)

For configuring a custom email address:

* Access to the DNS records of your public custom domain
* If you use a custom email provider, you need to configure the Sender Policy Framework (SPF) and DomainKeys Identified Mail (DKIM). See [Use your own email provider](https://help.okta.com/oie/en-us/content/topics/settings/custom-email-provider.htm).

---

## About Okta domain customization

You can customize your Okta organization by replacing the Okta domain name with your own domain name. Your customized domain allows you to create a seamless branded experience for your users so that all URLs look like your app.

For example, you use Okta as a user store for your apps, but you don't want your users to know that the app uses Okta as its host. Okta orgs can host pages on subdomains such as `example.okta.com`. You can create a [CNAME record](https://datatracker.ietf.org/doc/html/rfc1035#section-3.2.2) for the Okta domain, allowing you to alias it to another subdomain that you own, like `login.example.com`.

> **Note:** Set up a [custom domain](/docs/guides/custom-url-domain/main/) and customize your [CSP (Content security policy)](https://content-security-policy.com/) if you also want to customize the [sign-in page](/docs/guides/custom-widget/main/#content-security-policy-csp-for-your-custom-domain) and [error pages](/docs/guides/custom-error-pages/main/#content-security-policy-csp-for-your-custom-domain).

Okta serves pages on your custom domain over HTTPS. To set up this feature, you need to provide a TLS certificate that is valid for your domain. See [Validate your TLS certificate](#validate-your-tls-certificate).

You can also [configure a custom email address](#about-custom-email-addresses) to present a branded experience to your end users.

> **Note:** When you create a custom domain, the Okta domain (`company.okta.com`) still works.

### Multibrand and custom domains

You can create up to three custom domains with multibrand customizations and up to 200 custom domains by contacting support to increase your limit.

You can only preview or visit a branded page after you map it to a custom domain. For example, you can only view brand assets applied to the Okta-hosted sign-in page after you map it to a custom domain. After you create a brand, map it to a custom domain. Then you can make further customizations, preview them, and publish them.

#### Redirect URIs

Multibrand orgs use dynamic issuer mode for IdP. As a result, Okta uses the domain from the authorize request as the domain for the redirect URI when returning the authentication response. The Admin Console UI displays the org's Okta subdomain when the org has multiple custom domains configured.

URIs that you use in the following settings revert to the Okta subdomain:

* [SAML apps](https://help.okta.com/okta_help.htm?id=ext-apps-about-saml)
* [OIDC app integration settings&#8212;redirect URI](https://help.okta.com/okta_help.htm?id=ext_Apps_App_Integration_Wizard-oidc)
* [Authorization server settings](/docs/guides/customize-authz-server/main/)

You can replace the base path with a custom domain and Okta uses the brand associated with the domain.

#### Branding and the Sign-In Widget (third generation)

The third generation of the Okta Sign-In Widget doesn’t guarantee the stability of CSS selectors. Instead, customization in the third generation gets better support through branding. See [Style the Sign-In Widget (third generation)](/docs/guides/custom-widget-gen3/).

### Caveats

* You must provide a subdomain for customizing the Okta org domain. Okta doesn't support the use of a root domain name.

* If you use an Okta-managed TLS certificate, you don't need a [Certificate Authority Authorization (CAA)](https://datatracker.ietf.org/doc/html/rfc6844) record. However, if you do have a CAA record, consider the following:

  * If it's your first time setting up a custom domain with an Okta-managed certificate, you need to add `letsencrypt.org` to the issuers list or Okta can't get the TLS certificate. See [Let's Encrypt - Using CAA](https://letsencrypt.org/docs/caa/).

  * If you have an Okta-managed certificate and you later get a CAA record, Okta can't renew your certificate. You must either add `letsencrypt.org` to the issuers list or remove the CAA record.

* If you use an Okta-managed certificate, you need to remove [network zones](https://help.okta.com/okta_help.htm?id=ext-network-zones) from your org. If you can't remove network zones, you can create a custom domain using your own TLS certificate. See [Use your own TLS certificate](#use-your-own-tls-certificate).

* You can't sign in to [Okta Workflows](https://help.okta.com/okta_help.htm?type=wf&id=ext-Okta-workflows) through a custom domain (Okta-managed or using your own TLS certificate). Sign in through your default [Okta domain](/docs/guides/find-your-domain/main/).

* If you use your own TLS certificate, consider the following:

  * It can be 2048 bits, 3072 bits, or 4096 bits.

  * It should be signed with the SHA-256 hash algorithm.

  * It must not be expired.

  * Its start date must not be in the future.

  * Its expiration date can't be further than 10 years from now.

  * It mustn't be self-signed.

  * It must be a certificate for the actual domain.

  * The public key must use the RSA algorithm.

  * The public key isn't from a certificate authority (CA).

* Any DNS text (`TXT`) and `CNAME` record names and values included in your domain configuration must be resolvable and contain the values provided by Okta. You can validate these names and values with a DNS query tool, such as [dig](https://bind9.readthedocs.io/en/latest/manpages.html?highlight=#dig-dns-lookup-utility).

* Okta supports 2048, 3072, and 4096-bit keys for the private key that you upload. However, your certificate chain can use keys of any size.

* If you configure any SAML or WS-Fed integrated apps in your org, review the setup instructions for [SAML SSO](/docs/guides/build-sso-integration/saml2/main/) or [WS-Fed SSO](https://help.okta.com/okta_help.htm?id=ext_Apps_Configuring_WS_Federation). Update those SAML or WS-Fed Service Provider integrations to use the new custom URL in the metadata. Your customers then see the new custom domain rather than the Okta org domain.

* If you sign a user in with your new custom domain, they may need to sign in more than once. If your user tries to SSO into previous OIDC integrations that are made with the org domain, they're prompted to sign in again. To avoid this, you need to change the issuer in these integrations to your custom URL in both the Okta dashboard and your codebase.

* When you implement a custom domain, users aren't automatically rerouted from the original URL to the new custom URL. Be sure to communicate the new custom domain to your users.

* If you configure the [FIDO2 (WebAuthn) authenticator](https://help.okta.com/okta_help.htm?type=oie&id=csh-configure-webauthn) in your org and create a custom domain, your users first need to sign in with an authenticator that they're already enrolled in. Then, your users can re-enroll with WebAuthn.

  * Communicate the new URL to your users so that Okta prompts them to re-enroll.
  * Every domain that a user accesses requires re-enrollment because each set of their credentials is scoped to a separate domain.

* When an admin signs in to the custom domain and then accesses the Admin Console from their user dashboard, the org domain changes from the custom domain to the Okta domain.

* If you disable a custom domain, the `issuerMode` for Identity Providers, authorization servers, and OpenID Connect apps is set back to `ORG_URL`.

## Use an Okta-managed certificate

This method of configuring a custom domain is recommended because Okta manages your certificate renewals in perpetuity. Okta manages certificate renewals through an integration with Let's Encrypt, which is a free certificate authority. The certificate procurement process is free, and also faster and easier than configuring a custom domain with your own TLS certificate.

> **Note:** If your custom domain uses your own TLS certificate and you want to migrate to an Okta-managed certificate, contact [Support](https://support.okta.com/help/s/opencase).

> **Note:** You don't need a [Certificate Authority Authorization (CAA)](https://datatracker.ietf.org/doc/html/rfc6844) record to use an Okta-managed TLS certificate. However, if you do have a CAA record, keep the following in mind:
>
>  * If it's your first time setting up a custom domain with an Okta-managed certificate, you need to add `letsencrypt.org` to the issuers list or Okta can't get the TLS certificate. See [Let's Encrypt - Using CAA](https://letsencrypt.org/docs/caa/).
>
>  * If you have an Okta-managed certificate and you later get a CAA record, Okta can't renew your certificate. You must either add letsencrypt.org to the issuers list or remove the CAA record.

1. In the Admin Console, go to **Customizations** > **Brands**, and then select the brand you want.

2. On the **Domains** tab in the **Custom domain** section, click **Add domain**.

3. On the **Add domain** page of the configuration wizard, enter a subdomain name, and then select **Okta-managed (faster and easier)**.

4. Click **Next**.

### Update your DNS TXT

You need to add DNS TXT and CNAME records for your domain to prove ownership of your domain with Okta. You must prove your ownership of the domain before Okta can serve traffic over it. DNS TXT and CNAME records include the values provided in the **Host** and **Value** columns of the table on the **Update your DNS** page. Okta verifies that you own your domain when it finds the records that contain the required values.

> **Note:** Some orgs support [DNSSEC](https://datatracker.ietf.org/doc/html/rfc9364) and need to point their custom domain to `example.okta-dnssec.com`, instead of `example.okta.com`. This value appears for all new and existing custom domains and allows you to be DNSSEC compliant. See [Supportability for DNSSEC in Okta Organizations](https://support.okta.com/help/s/article/supportability-for-dnssec-in-okta-organizations?language=en_US).

1. On the **Update your DNS** page of the configuration wizard, copy the values of the **Host** and **Value** columns into a text file.

2. Sign in to your Domain Name registrar and locate the option to modify your DNS records.

3. Add a TXT record and paste the value that you copied from the **Host** column into the appropriate field. For example, paste the value into the **Name** or **Host** fields.

    > **Note**: Depending on your domain provider, you may only need to enter `_acme-challenge.login` rather than `_acme-challenge.login.example.com`. If your domain provider doesn't support the value that you enter, verification fails and your custom URL domain configuration is incomplete.
    >
    > You can perform a DNS lookup of your `_acme-challenge` DNS record to verify that it's correctly configured. For example, you might use Google's [Dig](https://toolbox.googleapps.com/apps/dig/) tool to check your `_acme-challenge.login.example.com` DNS record.

4. Paste the value that you copied from the **Value** column into the appropriate field, for example, the **Record** or **Value** field.

5. Repeat Steps 3 and 4 for the CNAME record.

6. Wait for the DNS record to propagate. Typically, this takes one to five minutes (but it may take longer). Then, return to Okta and click **Next** to prove to Okta that you have the rights to use the domain name.

    > **Note:** It may take up to 24 hours for your DNS changes to propagate. If your changes don't appear within 24 hours, return to this step and confirm your settings. Use a tool like [Dig](https://toolbox.googleapps.com/apps/dig/) to check your DNS records.

7. If **Certificate issued** appears, click **Finish**.

After you click **Finish**, it may take several minutes before your custom domain is ready.

> **Note:** If an error occurs, the cause may be one of the following:
    >   * The TXT or CNAME record may not have propagated yet.
    >   * There may be a copy and paste issue with the values.
    >   * There may be an operational issue with Let's Encrypt that you can check with [https://letsencrypt.status.io/](https://letsencrypt.status.io/). After you configure your DNS records you might click **Next** too quickly to verify the records. In that case, it's possible that the DNS records are verifiable by Okta but not yet by Let's Encrypt. The result is a failed authorization. A warning notification appears: `A new TXT value has been generated. Update your DNS record with the new TXT value, wait for it to propagate, and then return here to verify.`

## Use your own TLS certificate

### Validate your TLS certificate

Before starting, make sure that you have the TLS certificate (PEM-encoded) for your subdomain and the private key (2048, 3072, or 4096-bits) (PEM-encoded).

Okta performs validation checks on the certificate that you upload. If your TLS certificate is a wildcard certificate, it must include the full URL in the Common Name (CN) or Subject Alternative Name (SAN) when it’s generated. Otherwise, the following error occurs when you attempt to upload the certificate:

`The specified certificate does not match your Custom URL Domain.`

If you receive the previous error, determine whether your TLS certificate is a wildcard certificate. Consult with the person in your organization responsible for generating certificates.

### Use the configuration wizard

1. In the Admin Console, go to **Customizations** > **Domain**.

2. In the **Custom URL Domain** box, click **Edit**.

3. Click **Get started**.

4. On the **Add domain** page of the configuration wizard, in the **Certificate management** section, select **Bring your own certificate (advanced)**.
    * The **Next** button appears if the configuration is incomplete.
    * The **Update Certification** button appears if a custom domain is already configured for your org. To delete the current configuration, click **Restore to default**.

### Add your subdomain information

On the Domain page of the configuration wizard, enter your subdomain name, for example, `login.example.com`, and then click **Next**. Verifying your ownership of the domain is the next step in the configuration wizard.

### Update your DNS TXT and CNAME record

If you use your own TLS certificate, you need to add a DNS TXT record and create a CNAME record.

#### Update your DNS TXT

Add a DNS TXT record to your domain to verify ownership of your domain with Okta. You must verify that you own the domain before Okta can serve traffic over it. This record includes the Okta-generated values provided in the **Host** and **Data** columns of the table on the **Verify domain ownership page**. Okta verifies that you own your domain when it finds the TXT record that contains the generated value.

1. On the **DNS Records** page of the configuration wizard, copy the values of the **Host** and **Data** columns into a text file.

2. Sign in to your Domain Name registrar and locate the option to modify your DNS records.

3. Add a TXT record and paste the value that you copied from the **Host** column into the appropriate field. For example, paste the value into the **Name** or **Host** fields.

    > **Note**: Depending on your domain provider, you may only need to enter `_oktaverification` rather than `_oktaverification.login.example.com`. If your domain provider doesn't support the value that you enter, the verification fails and your custom URL domain configuration is incomplete.
    >
    > You can perform a DNS lookup of your `_oktaverification` DNS record to verify that it's correctly configured. For example, you might use Google's [Dig](https://toolbox.googleapps.com/apps/dig/) tool to check your `_oktaverification.login.example.com` DNS record.

4. Paste the value that you copied from the **Data** column into the appropriate field, for example, the **Record** or **Value** field.

5. Wait for the DNS record to propagate (typically 10–15 minutes, but it may take longer).

    > **Note:** It may take up to 24 hours for your DNS changes to propagate. If your changes don't appear within 24 hours, return to this step and confirm your settings. Use a tool like [Dig](https://toolbox.googleapps.com/apps/dig/) to check your DNS records.

6. Return to Okta and click **Verify** to prove to Okta that you have ownership of the domain name.

7. If **Verified** appears, click **Next**. If an error occurs, possible issues may be that the TXT record hasn't propagated yet or a field was entered incorrectly.

### Create a CNAME record for your subdomain

Before Okta can serve traffic over your domain, add an alias from your custom domain to the Okta subdomain of your Okta organization. You do this by creating or modifying a CNAME record for your custom domain name.

1. Return to your Domain Name registrar and locate the option to modify your DNS records.

1. Paste the CNAME **Host** URL into the appropriate field at the registrar, for example, the **Name** or **Host** field. Often a registrar creates an A record automatically when you create a subdomain. Make sure that the CNAME record and the A record don't have the same name.

> **Note:** Depending on your registrar, you may only need to enter the subdomain part. For example, if you picked the subdomain `id.example.com`, your registrar may only require you to create a CNAME record for `id` (because `.example.com` is implied). If you're not sure, check your registrar's documentation.

1. Paste the CNAME **Value** into the appropriate field at the registrar, for example, the **Record** or **Value** field.

1. Save the record.

Uploading your TLS certificate is the next step in the configuration wizard.

### Provide a TLS certificate

Okta serves traffic over HTTPS (TLS) on your custom domain. Use this section to enter your TLS certificate, private key, and a certificate chain.

1. On the **Certificate** page of the configuration wizard, paste your PEM-encoded public certificate for your subdomain in the **Certificate** field. Be sure to include the `----BEGIN CERTIFICATE----` and the `----END CERTIFICATE----` lines.

2. Paste your PEM-encoded private key for your subdomain in the **Private key** field. Be sure to include the `-----BEGIN RSA PRIVATE KEY-----` and `-----END RSA PRIVATE KEY-----` lines.

3. Enter a PEM-encoded certificate chain in the **Certificate chain** field. Certificate chain files can contain keys that are up to 4096 bits. The order in which the root and intermediary certificates appear in the file matters. The intermediate CA certificate should be at the top and then the root CA certificate at the bottom.

4. Click **Finish**.

> **Note:** After you click **Finish**, it can take up to 15 minutes for the domain and certificate to be ready and testable.

## Confirm that your custom domain works

Refer to the link that appears in the **Confirmation** section of the CNAME step. Open it to confirm that Okta is serving traffic over HTTPS (TLS) for your custom domain.

> **Note:** It can take up to 15 minutes for the domain and certificate to be ready and testable.

1. Click the link, for example, `https://login.example.com`. The Okta Sign-In page should appear.

2. Back at the CNAME step, click **Finish**.

It may take up to 48 hours for these changes to propagate. Warning notices may appear on your custom domain until propagation is finished. If your changes don't appear within 48 hours, return to the configuration wizard and confirm your settings.

You can also use a tool such as `dig` or `nslookup` to test and verify that your DNS is a properly configured domain.

1. In the terminal, use the following command: `dig login.mycompany.com` or `nslookup login.mycompany.com`.

2. Verify that the configured domain, for example, `org.Subdomain.customdomains.oktapreview.com` appears in the answer section of the output.

> **Note:** There are also external tool versions of [dig](https://toolbox.googleapps.com/apps/dig) and [nslookup](https://www.nslookup.io/) that you can use to validate that your custom domain is configured correctly.

### Flush the DNS cache

After you've changed your DNS records, DNS providers or your local machine may cache old records. If you've verified that your records are correct, but your custom domain isn't working, try flushing the DNS cache.

There are websites available for flushing the caches for [Google DNS](https://google-public-dns.appspot.com/cache) and [Open DNS](https://cachecheck.opendns.com/).

## Update other Okta settings

After you add your custom domain, some features or APIs require extra configuration to reflect that change.

> **Note:** Some orgs support [DNSSEC (Domain Name System Security Extensions)](https://datatracker.ietf.org/doc/html/rfc9364) and need to point their custom domain to `example.okta-dnssec.com`, instead of `example.okta.com`. This value appears for all new and existing custom domains and allows you to be DNSSEC compliant. See [Supportability for DNSSEC in Okta Organizations](https://support.okta.com/help/s/article/supportability-for-dnssec-in-okta-organizations?language=en_US).

### Update custom authorization server

After you customize your Okta domain, existing [custom authorization servers](/docs/concepts/auth-servers/) continue to use the Okta org URL until you change it. All new custom authorization servers use the custom domain by default.

You need to update existing custom authorization servers to return the custom domain as the `issuer` value:

1. In the Admin Console, go to **Security** > **API**.

1. On the **Authorization Servers** tab, select the custom authorization server that you want to update.

1. Click **Edit** on the custom authorization server that you selected.

1. From the **Issuer** dropdown box, select the custom URL and click **Save**.

### Update issuer for OpenID Connect apps

Also, you may want to change the issuer for your OpenID Connect apps that are using the org authorization server.

1. In the Admin Console, go to **Applications** > **Applications**.

1. Click the OpenID Connect app that you want to update.

1. Select the **Sign On** tab, scroll to the **OpenID Connect ID Token** section, and then click **Edit**.

1. From the **Issuer** dropdown box, select the custom URL and click **Save**.

### Update app endpoints

If you have apps that use Okta endpoints with the uncustomized URL domain, update them to use the custom URL domain.

### Configure a custom domain for your authorization server

The OpenID Connect specification requires a `./well-known/openid-configuration` endpoint with metadata about your app's endpoints. You should be able to see yours at:

```
https://<id.domain.name>/oauth2/default/.well-known/openid-configuration
```

You might notice that the URL has your Okta `dev-*` domain or `trial-*` domain, rather than your custom domain name.

To fix this, update your authorization server to use your custom domain:

1. Sign in to your Okta account and go to **Security** > **API** > **Authorization Servers**.

1. Locate the default** custom authorization server, and then click **Edit**.

1. In the **Settings** section, click **Edit**.

1. Change the **Issuer** to **Dynamic (based on request domain)**.

1. Make another request to `./well-known/openid-configuration`. Your custom domain is returned.

## About custom email addresses

A custom email address allows you to present a branded experience to your end users. Emails that Okta sends to your end users appear to come from your custom email address instead of `noreply@okta.com`. You can switch to a different custom email address or revert to the default Okta domain, but you can use only one email domain at a time.

Okta sends your super admins a confirmation email after your custom email address is configured and operating correctly. To ensure continuous operation, Okta polls your custom email domain once every 24 hours. If a problem occurs, Okta alerts super admins by email, and Okta-generated emails are sent from the default address `noreply@okta.com` until the problem is resolved.

### Use the Brands API

The [Email Domains API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/EmailDomain/) is a feature that allows you to create, update, and delete email domains for your organization.

### Configure a custom email address

1. In the Admin Console, go to **Customizations** > **Brands**, and then select the brand you want.

2. On the **Domains** tab > **Emails** section, click **Add domain**.

3. In the **Email address** field, enter the email address that you want to send the system notification emails from. This email address appears in the emails sent to your users.

4. Enter the sender name in the **Name of email sender** field. This name appears as the sender of the emails sent to your users.

5. Click **Continue**.

6. Update your DNS records using the provided values.

7. After you've updated your DNS records through your domain provider, click **Verify**. Okta begins polling your DNS records until it detects your updates (this may take up to 24 hours). Your configuration is pending until the DNS updates are detected.

> **Note:** If you use the default Okta email provider, [SPF and DKIM records](https://support.okta.com/help/s/article/spf-and-dkim-for-custom-email-senders?language=en_US) are automatically generated. If you use a custom email provider, you need to configure the SPF and DKIM. See [Use your own email provider](https://help.okta.com/okta_help.htm?type=oie&id=csh-email-provider-main).

### Known Issues

- You can't configure Okta to send emails through a domain that uses [SendGrid](https://sendgrid.com/). Instead, configure a subdomain with your DNS provider for custom Okta emails.
- - You can't have more than 10 DNS lookups in your SPF record.

## Next steps

The following customization options require a custom URL domain:

* [Style the Okta-hosted Sign-In Widget](/docs/guides/custom-widget/main/#style-the-okta-hosted-sign-in-widget)
* [Customize the Okta-hosted error pages](/docs/guides/custom-error-pages/)

The following customization options don't require a custom URL domain:

* [Customize SMS messages](/docs/guides/custom-sms-messaging/)
* [Customize email notifications](/docs/guides/custom-email/)
