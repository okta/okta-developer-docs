---
title: Customize the Domain of Emails sent by Okta
excerpt: Learn how to add set the email domain used by Okta.
---

A custom email domain allows you to present a branded experience to your end users. Email that Okta sends to your end users appears to come from your custom email domain instead of `noreply@okta.com`. You can switch to a different custom domain or revert to the default Okta domain, but you can use only one email domain at a time.

Okta sends your super admins a confirmation email after your custom domain is configured and operating correctly. To ensure continuous operation, Okta polls your custom email domain once every 24 hours. If a problem occurs, Okta alerts super admins by email, and Okta-generated emails are sent from the default domain `noreply@okta.com` until the problem is resolved.

## Prerequisites

* Only qualified administrators with access to the DNS records of your public custom domain should attempt these procedures.
* Okta strongly recommends that your organization implement the [Sender Policy Framework](https://www.proofpoint.com/us/blog/user-protection/what-sender-policy-framework-spf) (SPF) to prevent sender address forgery. If you already implement SPF in your custom domain, be aware that you must [update the SPF record](https://help.okta.com/en/prod/Content/Topics/Settings/Settings_Configure_A_Custom_Email_Domain.htm#An).

## Configure A Custom Email Domain

1. In the Admin Console, go to **Settings** > **Email & SMS**.
1. Click the **Sender** link.

    ![okta-email-config:](/img/custom-email-sender-link.png "Screenshot of Okta Admin Console email configuration")

1. Select a sender in the **Configure Email Sender** dialog box.

    ![okta-email-config-details:](/img/custom-email-dns-records.png "Screenshot of Okta Admin Console email configuration details")

    If you select **Custom email domain**, enter or edit information in the following fields:
      1. Email address to send from
      1. Name of sender
      1. Mail domain to send from.
      **Note:** You must enter a unique mail domain that your organization has dedicated for Okta to send mail from. Later in this procedure, you will add this mail domain to your SPF record as an include-statement to show that you allow Okta to send mail from this domain.
1. Save your changes.
    * The **Save** button appears if you chose `noreply@okta.com`, or if you chose a custom email domain and your org's DNS records do not need to be updated. You are finished after you click **Save**.
    * The **Save & View Required DNS Records** button appears if you chose a custom email domain and your org's DNS records need to be updated before your settings can take effect. After you click the button, the DNS records that you need to update are shown.
1. Update your DNS records using the provided values.

    ![okta-email-config-details:](/img/custom-email-sender-config.png "Screenshot of Okta Admin Console email configuration details")

1. Click a DNS update option:
    * **I've updated the DNS records** — Okta begins polling your DNS records until it detects your updates (up to 24 hours). Your configuration is pending until the DNS updates are detected.
    * **I will update the DNS records later** — Your records are not polled and your configuration is incomplete until you update the relevant DNS records and click I've updated the DNS records. You can view the list of records that require an update at any time.
1. Add the [SPF](https://www.proofpoint.com/us/blog/user-protection/what-sender-policy-framework-spf) record to your DNS zone (root domain).
    If your root domain already has an SPF record, the following update can prevent spoofers from sending mail that mimics your domain.
    An SPF record specifies the mail servers that your organization has authorized to send mail from your domain.
    For example, if you only send mail from **Microsoft Office 365**, your SPF record has an include-statement like this:
    ```txt
    example.com TXT      v=spf1 include:spf.protection.outlook.com -all
    ```
    To complete this procedure, you must add another include-statement that specifies the host shown in the first CNAME row in the **Configure Email Sender** dialog box. (This is also the mail domain that you specified in the Mail domain to send from field.)

    ![okta-email-config-details:](/img/custom-email-dns-hostname.png "Screenshot of Okta Admin Console email configuration details")

    Add the host to the existing record to configure a combined SPF record like this:
    ```txt
    example.com TXTv=spf1 include:oktamail.example.com include:spf.protection.outlook.com -all
    ```

## Known Issues:
* You can't configure Okta to send emails through a domain that uses SendGrid. Instead, configure a subdomain on your DNS provider for custom Okta emails.
* You can't have more than 10 DNS lookups in your SPF record.
