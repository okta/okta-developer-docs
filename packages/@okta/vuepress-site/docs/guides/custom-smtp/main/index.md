---
title: Custom email providers with OAuth 2.0
excerpt: Learn how to create custom SMTP email providers with OAuth 2.0 authentication.
layout: Guides
---

This guide explains how to configure a custom email provider with OAuth 2.0 authentication and provides some example configurations for Google and Microsoft SMTP services.

---

#### Learning outcome

* Learn how to configure custom email providers with OAuth 2.0.
* Learn how to set up Google and Microsoft SMTP services as custom email providers.

#### What you need

* [Okta Integrator Free Plan org](https://developer.okta.com/signup)
* A valid and certified [custom domain](#how-to-configure-your-custom-domain-as-an-rp-id)
* Access to your DNS provider to add TXT and CNAME records
* For Google SMTP, you need a [Google Workspace](https://workspace.google.com/) account with admin privileges
* For Microsoft SMTP, you need a [Microsoft 365](https://www.microsoft.com/en-us/microsoft-365) account with admin privileges

---

While OAuth 2.0 standards theoretically allow both methods for both providers, **Google and Microsoft have different architectural requirements for server-to-server (2-legged) authentication.**

* **Microsoft (Exchange):** Flexible. You can use **either** Method 1 (Client Credentials with Secret) or Method 2 (Client Credentials with Certificate/JWT).
* **Google (Gmail):** Strict. You **must** use Method 2 (JWT Bearer Token) for Service Accounts. Method 1 (Client Credentials with Secret) does not support Domain-Wide Delegation, which is required to send email as a specific user without a browser sign-in.

Here is the updated outline integrating this nuance.

***

## Understand custom email providers and OAuth 2.0

Okta sends system notifications—such as password resets and activation emails—using a default sender address (`noreply@okta.com`). To maintain sender reputation and provide a fully branded experience, configure a custom email provider. This routes Okta-generated emails through your organization's mail servers, such as Google Gmail or Microsoft Exchange Online, using your own domain.

### The shift to OAuth 2.0
Google and Microsoft have deprecated Basic Authentication (username and password) for SMTP due to security vulnerabilities. You must now use OAuth 2.0 authentication.

In this model, Okta does not log in as a specific user with a password. Instead, Okta authenticates as a secure application—a **machine identity**—authorized to send mail on behalf of your domain. This method relies on secure token exchanges rather than exposed static credentials.

### Key concepts
Familiarize yourself with these terms before configuration:

* **Machine Identity:** A non-human account created in your provider's cloud console that represents the Okta application.
    * **Google:** Called a **Service Account**.
    * **Microsoft:** Called an **App Registration**.
* **Scopes:** Granular permissions granted to the machine identity. You use scopes to restrict the identity to only send mail (e.g., `Mail.Send` or `https://mail.google.com/`) without granting full administrative access to your tenant.
* **Impersonation & Delegation:** Since the machine identity typically does not have its own mailbox, it must be authorized to send email "as" a real user in your organization (the sender address).
    * **Google:** Uses **Domain-Wide Delegation** to allow the Service Account to impersonate a workspace user.
    * **Microsoft:** Uses **Application Access Policies** to restrict which users the app can impersonate.

Here is the draft content for the **Prepare your domain and DNS records** section.

## Prepare your domain and DNS records

Before configuring OAuth credentials, prepare your domain's DNS records. While OAuth handles the secure connection between Okta and your email provider, DNS records authorize the provider to deliver email on behalf of your domain. Improper DNS configuration results in delivery failures or emails marked as spam.

### Verify domain ownership
To configure a custom email provider, you must possess administrative access to your domain's DNS records (for example, via GoDaddy, Cloudflare, or AWS Route53). You cannot verify ownership or configure security protocols without the ability to add `TXT` and `CNAME` records.

Confirm that you can update records for the specific domain or subdomain you intend to use as the "From" address.

### Configure SPF and DKIM
Recipient email servers perform checks to verify that an incoming email is legitimate. Update your DNS records to authorize your provider.

* **Sender Policy Framework (SPF):** An SPF record lists the IP addresses and domains authorized to send mail for your domain. Update your existing SPF record to include your provider's mechanism.
    * **Google:** `include:_spf.google.com`
    * **Microsoft:** `include:spf.protection.outlook.com`
* **DomainKeys Identified Mail (DKIM):** DKIM adds a cryptographic signature to emails, verifying that the message was not altered in transit. Generate DKIM keys in your email provider's admin console and add the resulting `TXT` records to your DNS configuration.

### Choose a domain strategy
Okta supports two types of custom domains. While distinct, they often function together to create a unified brand experience.

* **Custom URL Domain:** Aliases your Okta org URL (e.g., `login.company.com`).
* **Custom Email Domain:** Aliases the "From" address for system emails (e.g., `notifications@company.com`).

**Note:** If your root domain (e.g., `company.com`) already authenticates high-volume marketing or transactional emails via services like SendGrid, use a dedicated subdomain for Okta (e.g., `notifications@auth.company.com`). This isolates sender reputation and prevents DNS record conflicts.

Here is the draft content for the **Configure the OAuth 2.0 connection** and **Apply provider-specific configurations** sections, adhering to the Okta developer documentation style.

## Configure the OAuth 2.0 connection

There are two industry-standard methods for configuring OAuth 2.0 authentication. Select the method that aligns with your email provider's security requirements.

### Method 1: OAuth with Client Credentials
The Client Credentials flow uses a shared secret to authenticate. The application (Okta) identifies itself using a Client ID and a Client Secret string, similar to a username and password for the application itself.

* **Best for:** Microsoft Exchange Online (Standard configuration).
* **Key attribute:** Simplicity. Requires managing a static secret string that implies a specific expiration period.
* **Required information:**
    * **Client ID:** The unique public UUID for the application.
    * **Client Secret:** The private secret key generated by the provider.
    * **Token Endpoint URL:** The provider URL used to exchange the secret for an access token (e.g., `https://login.microsoftonline.com/.../token`).
    * **Scope:** The permissions requested (e.g., `https://outlook.office.com/SMTP.Send`).

### Method 2: OAuth with JWT Bearer Token
The JWT Bearer Token flow uses asymmetric cryptography for authentication. Instead of a shared secret, the application signs a JSON Web Token (JWT) with a private key. The provider verifies the signature using the corresponding public key.

* **Best for:** Google Workspace (Required) and Microsoft Exchange Online (High Security).
* **Key attribute:** Security. Eliminates the risk of shared secrets being intercepted.
* **Required information:**
    * **Private Key:** The RSA private key used to sign the JWT.
    * **Issuer (iss):** The email address of the service account or Client ID.
    * **Subject (sub):** The email address of the user to impersonate.
    * **Audience (aud):** The authorization server URL.
    * **Scope:** The specific API permissions requested.

## Apply provider-specific configurations

Implement the configuration steps specific to your email provider.

### Google Workspace (Requires Method 2)
Google Service Accounts must use the **JWT Bearer Token** flow to perform Domain-Wide Delegation. This delegation is strictly required to allow the service account to send email as a specific user.

1.  **Create a Service Account:** In the Google Cloud Console, create a Service Account and enable the **Gmail API**.
2.  **Delegate Authority:** In the Google Admin Console, grant Domain-Wide Delegation to the Service Account's Client ID for the scope `https://mail.google.com/`.
3.  **Generate Keys:** Generate and download the JSON key file for the Service Account.
4.  **Configure Okta:** Upload the JSON key file in the Okta SMTP settings. Okta parses the file to extract the private key and issuer.

### Microsoft Exchange Online (Supports Method 1 or 2)
Microsoft Exchange Online supports both methods, but defaults to the **Client Credentials** flow for ease of implementation.

1.  **Register Application:** Create an App Registration in Microsoft Entra ID.
2.  **Grant Permissions:** Add the `Mail.Send` permission for the **Microsoft Graph API**.
3.  **Grant Admin Consent:** You must click **Grant admin consent** for your tenant to activate the permissions.
4.  **Generate Secret (Method 1):** Create a Client Secret in the Certificates & secrets blade. Copy the value immediately.
5.  **Restrict Access (Recommended):** By default, `Mail.Send` allows sending as *any* user. Use a PowerShell Application Access Policy to restrict the app to specific mailboxes.
