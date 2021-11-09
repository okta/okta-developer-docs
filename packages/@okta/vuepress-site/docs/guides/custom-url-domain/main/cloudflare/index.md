---
title: Create a custom domain with Cloudflare
---

This page covers the steps to quickly set up a custom domain using CloudFlare. To use a custom domain with Okta, you need to have access to its DNS settings, and you need to create a TLS certificate. Cloudflare makes this easy.

Already set everything up using the manual steps on the previous pages? Move on to the <GuideLink link="../next-steps">Next steps</GuideLink> page.

## Transfer your domain and create a certificate

> **Note:** [Sign up for Cloudflare](https://dash.cloudflare.com/sign-up) if you don't have an account.

Sign in to Cloudflare and select **+Add Site**. It's best if you point an entire domain at Cloudflare. For example, `example.com`. The free plan is good enough for these steps.

After transferring your domain, you need to create an origin CA certificate:

1. Select the **SSL/TLS** app, and then click **Origin Server**.
2. Click **Create Certificate** to open the **Origin Certificate Installation** dialog box.
3. Select **Let Cloudflare generate a private key and a CSR**.
4. Change **Certificate Validity** to **1 year** (Okta rejects certificates with a 15-year expiration), and then click **Next**.
5. Copy the **Origin Certificate** to a `tls.cert` file on your hard drive, and then copy the **Private key** to `private.key`.
6. In Okta, go to **Customization** > **Domain Name** > **Edit** > **Get Started**.
7. Enter a subdomain name (for example: `id.example.com`) and click **Next**. You are prompted to verify domain ownership.
8. In Cloudflare, add the specified `TXT` record using the **DNS** > **+ Add record** option.
9. In Okta, select **Verify** > **Next**.
10. In the **Certificate** box, copy/paste the contents of `tls.cert`.

    > **Note:** On a Mac you can use `cat tls.cert | pbcopy` in a terminal to copy the file to your clipboard.

11. Paste the contents of `private.key` in the **Private key** box. Click **Next**.
12. You are prompted to add a [CNAME record](https://en.wikipedia.org/wiki/CNAME_record). Add this to your Cloudflare DNS, and then click **Finish**.
13. Wait until `https://<id.domain.name>` resolves in your browser before you continue.

> **Note:** When you first try this, it's possible that your network caches DNS entries, and you won't be able to get to `id.example.com`. As a workaround, you can tether with your phone, then graph the IP address and add it as an entry to your `hosts`.

## Configure a custom domain for your Authorization Server

The OpenID Connect specification requires a `./well-known/openid-configuration` endpoint with metadata about your app's endpoints. You should be able to see yours at:

```
https://<id.domain.name>/oauth2/default/.well-known/openid-configuration
```

You might notice that it has your Okta `dev-*` domain, rather than your custom domain name.

You need to update your Authorization Server to use your custom domain to fix this:

1. Sign in to your Okta account and go to **API** > **Authorization Servers**.
2. Select the  **default** Custom Authorization Server, and then click **Edit**.
3. Change the **Issuer** to use **Custom URL**.
4. Try `./well-known/openid-configuration` again. It should now display your custom domain.

<NextSectionLink>Next steps</NextSectionLink>
