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
* A valid and certified [custom domain](/docs/guides/custom-url-domain/main/) for sending emails
* Access to your DNS provider to add TXT and CNAME records
* For Google SMTP, you need a [Google Workspace](https://workspace.google.com/) account with admin privileges
* For Microsoft SMTP, you need a [Microsoft 365](https://www.microsoft.com/en-us/microsoft-365) account with admin privileges

---

## Understand custom email providers and OAuth 2.0

Okta sends system notifications such as password resets and activation emails using an Okta-managed SMTP server and a default sender address (`noreply@okta.com`).

To maintain sender reputation and provide a fully branded experience, you can configure a custom email provider. This routes Okta-generated emails through your organization's mail servers, such as Google Gmail or Microsoft Exchange Online, using your own domain.

For information about custom email providers, see [Use your own email provider](https://help.okta.com/okta_help.htm?type=oie&id=csh-email-provider-main).

### SMTP terms and concepts

Familiarize yourself with these terms before configuration:

* **SMTP:** Simple Mail Transfer Protocol, the standard protocol for sending email across the Internet.
* **Email provider:** A service that offers SMTP servers for sending email. Common providers include Google Workspace (Gmail), Microsoft Exchange Online (Outlook), SendGrid, and MailGun.
* **Machine identity:** A non-human account created in your provider's cloud console that represents your app. For Google, this is called a **Service Account**. For Microsoft, it's an **App Registration**.
* **Scopes:** Granular permissions granted to the machine identity. You use scopes to restrict the identity to only send mail (e.g., `Mail.Send` or `https://mail.google.com/`) without granting full administrative access to your tenant.
* **Impersonation & Delegation:** Since the machine identity typically does not have its own mailbox, it must be authorized to send email as a real user in your org.
  * Google uses **Domain-Wide Delegation** to allow the Service Account to impersonate a Google workspace user.
  * Microsoft uses **Application Access Policies** to restrict which users the app can impersonate.

### Secure SMTP with OAuth 2.0

Google and Microsoft are deprecating or have already deprecated Basic Authentication (username and password) for their SMTP servers due to security vulnerabilities. OAuth 2.0 authentication is the recommended authentication method for those SMTP services.

For SMTP, OAuth 2.0 authentication means that Okta does not sign in as a specific user with a password. Instead, Okta authenticates as a secure application (a machine identity) that's authorized to send mail on behalf of your domain. Okta and your SMTP service exchange OAuth tokens to establish a secure connection.

In your org, there are two methods for configuring OAuth 2.0 authentication for email providers:

* **OAuth 2.0 client credentials flow**: This flow uses a shared secret to authenticate the application.
* **OAuth 2.0 JWT bearer token flow**: This flow uses asymmetric cryptography to authenticate the application without a shared secret.

## Set up your custom email provider for OAuth 2.0

Before you connect your org to your email provider, complete the following setup steps.

1. Create a custom email domain
1. Verify domain ownership
1. Set up your email domain with your email provider

After you've completed these steps, proceed to configure the OAuth 2.0 connection and apply provider-specific configurations.

### Create a custom email domain

Ensure that you have already set up a [custom URL domain](/docs/guides/custom-url-domain/main/) in your org before creating a custom email domain.

With your preferred DNS provider, create a custom email domain that matches your org's branding. You can use this domain as the "From" address for system-generated emails that Okta sends.

For example, if you have `login.mycompany.com` as a custom domain in your org, you can create `notifications.mycompany.com` as a custom email domain.

See [Configure a custom email address](/docs/guides/custom-url-domain/main/#configure-a-custom-email-address).

You need the CNAME and TXT records that are generated during this process to verify domain ownership in the next step.

### Verify domain ownership

Confirm that you can update records for the subdomain that you intend to use as the "From" address, `notifications.mycompany.com`, for example.

To configure a custom email provider, you must possess administrative access to your domain's DNS records. For example, if you're using Cloudflare or AWS Route53 you must have the necessary permissions to add and modify `TXT` and `CNAME` records.

While OAuth 2.0 handles the secure connection between Okta and your email provider, DNS records authorize the provider to deliver email on behalf of your domain. Improper DNS configuration can cause delivery failures or emails marked as spam.

### Set up your email domain with your email provider

After you've created your custom email domain, configure it with your email provider. This typically involves adding DNS records to authorize the provider to send email on behalf of your domain.

The process can vary depending on your email provider. Refer to your provider's documentation for specific instructions.

## Connect your org to your email provider

At this point, you have created and verified a custom email domain. And you have configured your email provider to send email on behalf of that domain.

Now, you can configure the OAuth 2.0 connection between your org and your email provider.

The following examples are based on two common OAuth 2.0 flows for SMTP authentication. The steps are meant to provide a baseline for your configuration. Refer to your email provider's documentation for more detailed instructions and information.

### OAuth 2.0 client credentials flow

The **OAuth 2.0 client credentials flow** uses a shared secret to authenticate. The app (Okta) identifies itself using a client ID and a client secret string, similar to a username and password for the app itself.

When you use this flow, you create or configure:

* An application registered in your email provider's cloud console that provides a client ID.
* A client secret generated for the application.
* A scope that's granted to your app that authorizes it to send email.
* An account that the app can impersonate to send email.
* The hostname and port for the SMTP server.

#### Microsofot Exchange Online SMTP example

This example uses the **OAuth 2.0 client credentials flow** to connect your org to Microsoft Exchange Online SMTP. The following steps summarize the required configuration and provide links to more detailed instructions and information when needed.

##### Create client ID and client secret

1. Go to the [Microsoft Azure](https://portal.azure.com/) and create a new **App registration**.
1. Name the application "Okta SMTP app" and set it as a "Single tenant". See [Register an application](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app#register-an-application).
1. Create a client secret for the app. See [Add a credential to your application](https://learn.microsoft.com/en-us/entra/identity-platform/how-to-add-credentials?tabs=client-secret#add-a-credential-to-your-application). Ensure that you follow the steps to create a client secret and not a certificate.
1. Name the client secret and set an expiration date.
1. Copy the "Application (client ID)" and the Directory (tenant ID)" values from the app overview page.
1. Copy the client secret value.
1. Go to enterprise apps.
1. Find your newly created app and open it.
1. Copy the **Object ID** to use later.

###### Grant email sending scope

1. In your Microsoft app, add an API permission. See [Add permissions to access your web API](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-configure-app-access-web-apis#add-permissions-to-access-your-web-api).
1. In the **Request API permissions dialog**, select **APIs my organization uses**.
1. Then, select **Office 365 Exchange Online** > **Application permissions**.
1. Check the **SMTP.SendAsApp** permission.
1. Ensure that you click **Grant admin consent for [your app]** to activate the permission.

###### Enable your app to send email as a specific user

1. Go to `https://admin.microsoft.com/` and sign in with your admin account.
1. Open **Users** > **Active users**.
1. Select the user that you want your app to send email as.
   * The Username is used as the From address in Okta system emails and is also used to authenticate the SMTP connection.
1. In the user's Mail settings, enable SMTP authentication for the user. See [Use the Microsoft 365 admin center to enable or disable SMTP AUTH on specific mailboxes](https://learn.microsoft.com/en-us/exchange/clients-and-mobile-in-exchange-online/authenticated-client-smtp-submission#use-the-microsoft-365-admin-center-to-enable-or-disable-smtp-auth-on-specific-mailboxes).

###### Connect your app registration to Microsoft Exchange Online

1. [Install PowerShell](https://learn.microsoft.com/en-us/powershell/scripting/install/install-powershell?view=powershell-7.5).
1. Open PowerShell and install the Exchange Online Management module with the following command:

   ```powershell
   Import-Module ExchangeOnlineManagement
   ```

1. Then run the following command to connect to Exchange Online using your app registration. Replace the placeholders with your values.

   ```powershell
   Connect-ExchangeOnline
   ```

1. Connect to Exchange Online using the following command. Replace the placeholders with your values.

   ```powershell
    $ClientID = "{ClientID}"
    $EnterpriseObjectID = "{EnterpriseObjectID}"
    $SenderEmail = "sender@yourdomain.com"

    # Register the app in Exchange Online
    New-ServicePrincipal -AppId $ClientID -ServiceId $EnterpriseObjectID -DisplayName "{AppName}"

    # Grant permissions
    Add-MailboxPermission -Identity $SenderEmail -User $EnterpriseObjectID -AccessRights FullAccess
   ```

###### Configure your org's SMTP settings

After you've created your app registration and granted the necessary permissions, you can connect your org to Microsoft Exchange Online SMTP.

See [Configure a custom email provider](https://help.okta.com/okta_help.htm?type=oie&id=csh-email-provider-main#configure-a-custom-email-provider) and use the OAuth 2.0 client credentials flow settings.

### OAuth 2.0 JWT bearer token flow

The **OAuth 2.0 JWT bearer token flow** uses asymmetric cryptography to authenticate the application without a shared secret. The app (Okta) uses a private key to sign a JSON Web Token (JWT) that asserts its identity. The provider verifies the signature using a public key.

When you use this flow, you create or configure:

* An application registered in your email provider's cloud console.
* A public/private key pair for the application.
* A scope that's granted to your app that authorizes it to send email.
* An account that the app can impersonate to send email.
* The hostname and port for the SMTP server.

The public/private key pair generates various properties, including a client ID and private key value.

#### Google Workspace SMTP example

This example uses the **OAuth 2.0 JWT bearer token flow** to connect your org to Google Workspace SMTP. The following steps summarize the required configuration and provide links to more detailed instructions and information when needed.

##### Create service account and generate keys

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
1. Create a new project.
1. Enable the **Gmail API** for your project. See [Enabling an API](https://docs.cloud.google.com/endpoints/docs/openapi/enable-api) and [Enable the Gmail API](https://developers.google.com/gmail/api/quickstart/js#enable_the_gmail_api).
1. Go to **APIs & Services** > **Credentials**.
1. Create a new **Service Account**. See [Creating and managing service accounts](https://cloud.google.com/iam/docs/creating-managing-service-accounts).
1. Copy the client ID for the service account.
1. Create a new key for the service account.
1. Select **JSON** as the key type.
1. Click **Create** to download the JSON key file. Keep this file secure, as it contains your private key.

##### Grant email sending scope

1. Sign in to the [Google Admin Console](https://admin.google.com/) with your admin account.
1. Go to **Domain-wide Delegation**. See [Set up domain-wide delegation for a client](https://support.google.com/a/answer/162106?sjid=6859758194021594224-NA#zippy=%2Cset-up-domain-wide-delegation-for-a-client)
1. Enter the service account's client ID.
1. In the OAuth scopes field, enter `https://mail.google.com/`.
1. Click **Authorize**.

You have now granted the service account permission to send email on behalf of users in your Google Workspace domain. Use the information in the private key in the JSON file to configure the SMTP settings in your org.

##### Configure your org's SMTP settings

After you've created your service account and granted the necessary permissions, you can connect your org to Google Workspace SMTP.

Open the JSON file that you downloaded earlier and extract the following values:

* **Client ID:** The `client_id` value from the JSON file.
* **Private Key:** The `private_key` value from the JSON file.
* **Key ID:** The `private_key_id` value from the JSON file.
* **Token endpoint URL:** `https://oauth2.googleapis.com/token`
* Issuer: The `client_email` value from the JSON file.
* Subject: The email address of the user that the service account will impersonate to send email.
* Audience: `https://oauth2.googleapis.com/token`
* Scope: `https://mail.google.com/`

```json
{
  "type": "service_account",
  "project_id": "{ProjectName}",
  "private_key_id": "XXXXXXXXXXXXXXXXX",
  "private_key": "-----BEGIN PRIVATE KEY-----\\nXXXXXXXXXXX==\n-----END PRIVATE KEY-----\n",
  "client_email": "{username}@{project_id}.iam.gserviceaccount.com",
  "client_id": "{ClientId}",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/{username}@{project_id}.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
```

Use these values to configure the SMTP settings in your org. See [Configure a custom email provider](https://help.okta.com/okta_help.htm?type=oie&id=csh-email-provider-main#configure-a-custom-email-provider) and use the OAuth 2.0 JWT bearer token flow settings.


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





Add this content to email or domains guide:

### Configure SPF and DKIM
Recipient email servers perform checks to verify that an incoming email is legitimate. Update your DNS records to authorize your provider.

* **Sender Policy Framework (SPF):** An SPF record lists the IP addresses and domains authorized to send mail for your domain. Update your existing SPF record to include your provider's mechanism.
    * **Google:** `include:_spf.google.com`
    * **Microsoft:** `include:spf.protection.outlook.com`
* **DomainKeys Identified Mail (DKIM):** DKIM adds a cryptographic signature to emails, verifying that the message was not altered in transit. Generate DKIM keys in your email provider's admin console and add the resulting `TXT` records to your DNS configuration.