---
title: Custom Domain with Cloudflare
---
To use a custom domain with Okta, you need to have access to its DNS settings and create a TLS certificate.

Cloudflare makes this easy. [Sign up for Cloudflare](https://dash.cloudflare.com/sign-up) if you don't have an account.

Log in to Cloudflare and select **+Add Site**. It's best if you point a whole domain at Cloudflare. For example, `example.com`. The free plan is good enough for this tutorial.

After transferring your domain, you'll need to create an origin CA certificate.

1. Click the **SSL/TLS** app
2. Click the **Origin Server** tab
3. Click **Create Certificate** to open the **Origin Certificate Installation** window
4. Select **Let Cloudflare generate a private key and a CSR**
5. Change **Certificate Validity** to **1 year** (Okta will reject the certificates with a 15-year expiration)
6. Click **Next**

Copy the **Origin Certificate** to a `tls.cert` file on your hard drive. Copy the **Private key** to `private.key`.

In Okta, go to **Customization** > **Domain Name** > **Edit** > **Get Started**. Enter a subdomain name (e.g., `id.example.com`) and click **Next**. You'll be prompted to verify domain ownership. Add the specified `TXT` record on Cloudflare via the **DNS** > **+ Add record** option.

Click **Verify** > **Next** on Okta.

For the **Certificate** field, copy/paste the contents of `tls.cert`.

> On a Mac, you can use `cat tls.cert | pbcopy` in a terminal to copy the file to your clipboard.

Put the contents of `private.key` in the **Private key** box. Click **Next**.

You'll be prompted to add a CNAME record. Add this to your Cloudflare DNS. Click **Finish**.

**NOTE**: When you first try this, it's possible your network caches DNS entries, and you won't be able to get to `id.example.com`. As a workaround, you can tether with your phone, then graph the IP address and add it as an entry to your `hosts`.

Wait until `https://<id.domain.name>` resolves in your browser before continuing.

#### Configure a Custom Domain for Your Authorization Server

The OpenID Connect specification requires a `./well-known/openid-configuration` endpoint with metadata about your app's endpoints. You should be able to see yours at:

```
https://<id.domain.name>/oauth2/default/.well-known/openid-configuration
```

You might notice that it has your Okta `dev-*` domain, rather than your custom domain name.

You need to update your authorization server to use your custom domain to fix this. Log in to your Okta account and go to **API** > **Authorization Servers** > **default** > **Edit**. Change the **Issuer** to use **Custom URL**.

Try `./well-known/openid-configuration` again; it should have your custom domain now.
