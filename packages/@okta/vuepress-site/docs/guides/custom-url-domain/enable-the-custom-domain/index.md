---
title: Enable the custom domain
---
Use the configuration wizard to walk through the steps to customize your Okta URL domain.

1. In the Developer Console, select **Customization**, and then **Domain Name**. In the Classic UI, select **Settings**, and then **Customization**.
2. In the **Custom URL Domain** box, click **Edit**.
3. Click **Get Started** to start the configuration wizard.
    * The **Continue** button appears if the configuration is incomplete.
    * The **Update Certification** button appears if a custom URL domain is already configured for your org. To delete the current configuration, click **Restore to default**.

### Add your subdomain information

On the Domain page of the configuration wizard, enter your subdomain name, for example, `login.example.com`, and then click **Next**. Verifying domain ownership is the next step in the configuration wizard.

### Create a DNS TXT record

You need to add a DNS TXT record to your domain to verify ownership of your domain with Okta before Okta can serve traffic over it. This record includes the Okta-generated values provided in the **Host** and **Data** columns of the table on the **Verify domain ownership page**. Okta verifies that you own your domain when it finds the TXT record that contains the generated value.

1. On the **DNS Records** page of the configuration wizard, copy the values of the **Host** and **Data** columns into a text file.

2. Sign in to your Domain Name registrar and locate the option to modify your DNS records.

3. Add a TXT record and paste the value that you copied from the **Host** column into the appropriate field, for example, the **Name** or **Host** field.

> **Note**: Depending on your registrar, you may only need to enter `_oktaverification` rather than `_oktaverification.login.example.com`. If your registrar doesn't support the value that you enter, verification fails and your custom URL domain configuration is incomplete.
>
> You can perform a DNS lookup of your `_oktaverification` DNS record to verify that it's correctly configured. For example, you might use Google's [Dig](https://toolbox.googleapps.com/apps/dig/) tool to check your `_oktaverification.login.example.com` DNS record.

4. Paste the value that you copied from the **Data** column into the appropriate field, for example, the **Record** or **Value** field.

5. Wait for the DNS record to propagate (typically one to five minutes, but it may take longer), and then return to Okta and click **Verify** to prove to Okta that you have rights to use the domain name.

> **Note:** It may take up to 24 hours for your DNS changes to propagate. If your changes don't appear within 24 hours, return to this step and confirm your settings. Use a tool like [Dig](https://toolbox.googleapps.com/apps/dig/) to check your DNS records.

6. If **Verified** appears, click **Next**. If an error occurs, possible issues may be that the TXT record may not have propagated yet or there may be a copy and paste issue with the values.

    Uploading your TLS certificate is the next step in the configuration wizard.

### Add the certificate details

Okta serves traffic over HTTPS (TLS) on your custom domain. Use this section to enter your TLS certificate, private key, and, if applicable, a certificate chain.

1. On the **Certification** page of the configuration wizard, paste your PEM-encoded public certificate for your subdomain in the **Certificate** field. Be sure to include the `----BEGIN CERTIFICATE----` and the `----END CERTIFICATE----` lines.
2. Paste your PEM-encoded private key for your subdomain in the **Private Key** field. Be sure to include the `-----BEGIN RSA PRIVATE KEY-----` and `-----END RSA PRIVATE KEY-----` lines.
3. We recommend that you enter a PEM-encoded certificate chain (if you have one) in the **Certificate Chain** field. Certificate chain files can contain keys that are up to 4096 bits. The order in which the root and intermediary certificates appear in the file matters. The intermediate CA certificate should be at the top and then the root CA certificate at the bottom.

    > **Note:** Android devices require a certificate chain. You must provide a certificate chain if you want your custom domain to work with apps on Android. For a list of trusted root certificates on Android, see [this article](https://www.digicert.com/blog/official-list-trusted-root-certificates-android/).

4. Click **Next**. Making your custom domain an alias for your Okta domain is the next step in the configuration wizard.

### Create a CNAME record for your subdomain

Before Okta can serve traffic over your domain, you need to add an alias from your custom domain to the Okta subdomain of your Okta organization. You do this by creating or modifying a CNAME record for your custom domain name.

1. Return to your Domain Name registrar and locate the option to modify your DNS records.
2. Create a new CNAME record and paste the value from the **Host** column in the **Create a DNS TXT record** section into the appropriate field at the registrar, for example, the **Name** or **Host** field.

> **Note:** Depending on your registrar, you may only need to enter the subdomain part. For example, if you picked the subdomain `id.example.com`, your registrar may only require you to create a CNAME record for `id` (because `.example.com` is implied). If you're not sure, check your registrar's documentation.

3. Paste the value from the **Data** column that you copied in the **Create a DNS TXT record** section into the appropriate field at the registrar, for example, the **Record** or **Value** field.
4. Save the record.

After the CNAME record is saved and confirmed by your registrar, you are done setting up a custom domain name for your Okta organization. Okta begins to serve traffic over your custom domain. It may take a few minutes to propagate the changes.

### Confirm that it works

Use the link that appears in the **Confirmation** section of the CNAME step to confirm that Okta is serving traffic over HTTPS (TLS) for your custom domain.

1. Click the link, for example, `https://login.example.com`. The Okta Sign-In page should appear.
2. Back at the CNAME step, click **Finish**.

It may take up to 48 hours for these changes to propagate. Warning notices may appear on your custom URL domain until propagation is finished. If your changes don't appear within 48 hours, return to the configuration wizard and confirm your settings.

You can also use a tool such as `dig` or `nslookup` to test and verify that your DNS is a properly configured domain.

1. In the terminal, use the following command: `dig login.mycompany.com` or `nslookup login.mycompany.com`.

2. Verify that the configured domain, for example, `org.Subdomain.customdomains.oktapreview.com` appears in the answer section of the output.

> **Note:** There are also external tool versions of [dig](https://toolbox.googleapps.com/apps/dig) and [nslookup](https://network-tools.com/nslookup/) that you can use to validate that your custom domain is configured correctly.

### Flush DNS cache

After you've changed your DNS records, old records may still be cached by DNS providers or your local machine. If you've verified that your records are correct, but your custom domain isn't working, you can flush the DNS cache.

There are websites available for flushing the caches for [Google DNS](https://google-public-dns.appspot.com/cache) and [Open DNS](https://cachecheck.opendns.com/).

<NextSectionLink/>
