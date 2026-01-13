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

## Secure SMTP with OAuth 2.0

SMTP with OAuth 2.0 authentication provides a more secure way to connect your org to your email provider.

[Google](https://support.google.com/a/answer/14114704?hl=en) and [Microsoft](https://learn.microsoft.com/en-us/exchange/clients-and-mobile-in-exchange-online/deprecation-of-basic-authentication-exchange-online) are deprecating or have already deprecated Basic Authentication (username and password) for their SMTP servers due to security vulnerabilities. OAuth 2.0 authentication is the recommended authentication method for those SMTP services.

> **Note:** Not all email providers support OAuth 2.0 authentication for SMTP. Check with your email provider to confirm that they support OAuth 2.0 for SMTP. This guide only applies to providers that support OAuth 2.0.

For SMTP, OAuth 2.0 authentication means that Okta does not sign in as a specific user with a password. Instead, Okta authenticates as a secure app (a machine identity) that's authorized to send mail on behalf of your domain. Okta and your SMTP service exchange OAuth tokens to establish a secure connection.

In your org, there are two methods for configuring OAuth 2.0 authentication for email providers:

* **OAuth 2.0 client credentials flow**: This flow uses a shared secret to authenticate the app that sends emails through your SMTP service.
* **OAuth 2.0 JWT bearer token flow**: This flow uses asymmetric cryptography to sign JWTs to authenticate the app that sends emails through your SMTP service.

### Choose the right OAuth 2.0 method for your email provider

Consider the following differences when choosing which OAuth 2.0 flow to use for your email provider.

| Category           | Client credentials flow  | JWT bearer token flow |
|--------------------|--------------------------|-----------------------|
| Security model     | Uses a shared secret. <br></br>The app uses a client secret string that functions like a password. If this string is intercepted, an attacker can authenticate as the app until you rotate the secret. | Uses asymmetric cryptography. <br></br>The app uses a private key to sign requests. The private key never leaves your secure environment because only the signed token is transmitted. |
| Identity assertion | The app acts as itself. <br></br>The app authenticates as a standalone machine identity. It relies on app permissions granted by an admin to access the target mailbox. | The app impersonates a user. <br></br>The app generates a token that claims to be a specific user, using the `sub` field. This mechanism is sometimes referred to as "Domain-wide delegation". |

## Set up your custom email provider for OAuth 2.0

The following steps explain how to set up a custom email provider with OAuth 2.0 authentication. You must use an email provider that supports OAuth 2.0 for SMTP authentication to use these instructions.

Before you connect your org to your email provider, complete the following setup steps.

1. [Create a custom email domain](#create-a-custom-email-domain)
1. [Verify domain ownership](#verify-domain-ownership)
1. [Set up your email domain with your email provider](#set-up-your-email-domain-with-your-email-provider)

After you've completed these steps, you can then [configure the OAuth 2.0 connection](#configure-the-oauth-2-0-settings-for-your-custom-email-provider) for your custom email provider.

### Create a custom email domain

Ensure that you have already set up a [custom URL domain](/docs/guides/custom-url-domain/main/) in your org before creating a custom email domain.

With your preferred DNS provider, create a custom email domain that matches your org's branding. You can use this domain as the "From" address for system-generated emails that Okta sends. After you've created the custom email domain with your DNS provider, add it to your custom brand and domain in your org. See [Configure a custom email address](/docs/guides/custom-url-domain/main/#configure-a-custom-email-address).

For example, if you have `login.mycompany.com` as a custom domain in your org, you can create `notifications.mycompany.com` as a custom email domain. You need the CNAME and TXT records that are generated during this process to verify domain ownership in the next step.

### Verify domain ownership

Confirm that you can update records for the subdomain that you intend to use as the "From" address for your email provider (`notifications.mycompany.com`, for example).

To configure a custom email provider, you must have admin access to your domain's DNS records. For example, if you're using Cloudflare or AWS Route53 you must have the necessary permissions to add and modify `TXT` and `CNAME` records.

DNS records authorize the email provider to deliver email on behalf of your domain. Improper DNS configuration can cause email delivery failures or emails to be marked as spam.

### Set up your email domain with your email provider

After you've created your custom email domain, configure it with your email provider. This typically involves adding DNS records to authorize the provider to send email on behalf of your domain.

The process for adding DNS records to your email provider can vary depending the provider. Refer to your provider's documentation for specific instructions.

## Configure the OAuth 2.0 settings for your custom email provider

At this point, you have created and verified a custom email domain. And you have configured your email provider to send email on behalf of that domain. Now, you can configure the OAuth 2.0 connection between your org and your email provider.

The following examples ([Microsoft](#oauth-2-0-client-credentials-flow) and [Google](#oauth-2-0-jwt-bearer-token-flow)) are based on two common OAuth 2.0 flows for SMTP authentication. The steps are meant to provide a baseline for your configuration. Refer to your email provider's documentation for more detailed instructions and information.

This table highlights common components of each flow and how they're used.

| Component           | Client credentials flow                | JWT bearer token flow                        |
|---------------------|----------------------------------------|----------------------------------------------|
| Authentication type | Shared secret (symmetric)              | Asymmetric cryptography (private/public key) |
| Email provider app  | Required (generates client ID)         | Required (generates client ID)               |
| Credential          | Client secret (string)                 | Private key (JSON/certificate)               |
| Permission          | Scope that grants permission to access email server | Scope that grants permission to access email server |
| Sender identity     | Designated user account                | Impersonated user account, using the `sub` claim  |

### OAuth 2.0 client credentials flow

The **OAuth 2.0 client credentials flow** uses a shared secret to authenticate. Your Okta app identifies itself using a client ID and a client secret string, similar to a username and password for the app itself. The app acts on its own behalf. It has "Application Permissions" to access specific mailboxes.

When you use this flow, you create or configure the following settings:

* You create an app with your email provider that provides a client ID.
* You create a client secret for the app.
* You designate a valid user account that the app is authorized to send email from. This is typically the email address used in the "From" field of the email.
* You assign a scope to your app and account that grants them the authorization to send email.

#### Microsoft Exchange Online SMTP example

This example uses the **OAuth 2.0 client credentials flow** to connect your org to Microsoft Exchange Online SMTP. The following steps summarize the required configuration and provide links to more detailed instructions and information when needed.

For more information about OAuth 2.0 for Microsoft SMTP, see:

* [Authenticate an IMAP, POP or SMTP connection using OAuth](https://learn.microsoft.com/en-gb/exchange/client-developer/legacy-protocols/how-to-authenticate-an-imap-pop-smtp-application-by-using-oauth)
* [Register an application in Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app)

##### Create a client ID and client secret

1. Go to [Microsoft Azure](https://portal.azure.com/) and create a new **App registration**.
1. Name the app "Okta SMTP app" and set it as a "Single tenant". See [Register an application](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app#register-an-application).
1. Create a client secret for the app. See [Add a credential to your application](https://learn.microsoft.com/en-us/entra/identity-platform/how-to-add-credentials?tabs=client-secret#add-a-credential-to-your-application). Ensure that you follow the steps to create a client secret and not a certificate.
1. Name the client secret and set an expiration date.
1. Copy the **Application (client ID)** and the **Directory (tenant ID)** values from the app overview page.
1. Copy the client secret value.
1. In Microsoft Azure, go to **Enterprise applications**.
1. Find your newly created app and open it.
1. Copy the **Object ID** to use it in a [later step](#connect-your-app-registration-to-microsoft-exchange-online).

##### Grant an email sending scope

1. In your Microsoft app, add an API permission. See [Add the POP, IMAP, or SMTP permissions to your Microsoft Entra application](https://learn.microsoft.com/en-gb/exchange/client-developer/legacy-protocols/how-to-authenticate-an-imap-pop-smtp-application-by-using-oauth#add-the-pop-imap-or-smtp-permissions-to-your-microsoft-entra-application).
1. Check the **SMTP.SendAsApp** permission. This enables the app to send email as any user in the organization.
1. After you've confirmed the permission, ensure that you click **Grant admin consent for [your app]** to activate the permission.

##### Enable your app to send email as a specific user

1. Go to `https://admin.microsoft.com/` and sign in with your admin account.
1. Open **Users** > **Active users**.
1. Select the user that you want your app to send emails from.
   * The **Username** is used as the "From" address in Okta system emails and is also used to authenticate the SMTP connection.
1. In the user's **Mail** settings, enable SMTP authentication for the user. See [Use the Microsoft 365 admin center to enable or disable SMTP AUTH on specific mailboxes](https://learn.microsoft.com/en-us/exchange/clients-and-mobile-in-exchange-online/authenticated-client-smtp-submission#use-the-microsoft-365-admin-center-to-enable-or-disable-smtp-auth-on-specific-mailboxes).

##### Connect your app registration to Microsoft Exchange Online

1. [Install PowerShell](https://learn.microsoft.com/en-us/powershell/scripting/install/install-powershell?view=powershell-7.5).
1. Open a PowerShell terminal and install the [Exchange Online Management module](https://learn.microsoft.com/en-us/powershell/exchange/exchange-online-powershell-v2?view=exchange-ps) with the following command:

   ```powershell
   Import-Module ExchangeOnlineManagement
   ```

1. Then, run the following command to sign in to Microsoft.

   ```powershell
   Connect-ExchangeOnline
   ```

1. Connect to Exchange Online using the following command. Replace the placeholders with your values.

* **Client ID:** The **Application (client ID)** value from your app registration.
* **Enterprise Object ID:** The **Object ID** value from your app registration.
* **Sender Email:** The email address of the user that you designated in the [previous step](#enable-your-app-to-send-email-as-a-specific-user).
* **App-Name:** The display name of your app in Exchange Online.

   ```powershell
    $ClientID = "{YourClientID}"
    $EnterpriseObjectID = "{YourEnterpriseObjectID}"
    $SenderEmail = "sender@example.com"

    # Register the app in Exchange Online
    New-ServicePrincipal -AppId $ClientID -ServiceId $EnterpriseObjectID -DisplayName "{App-Name}"

    # Grant permissions
    Add-MailboxPermission -Identity $SenderEmail -User $EnterpriseObjectID -AccessRights FullAccess
   ```

##### Configure your org's SMTP settings

After you've created your app registration and granted the necessary permissions, you can connect your org to Microsoft Exchange Online SMTP.

See [Configure a custom email provider](https://help.okta.com/okta_help.htm?type=oie&id=csh-email-provider-main#configure-a-custom-email-provider) and use the **OAuth 2.0 client credentials flow** settings.

* **Client ID:** The **Application (client ID)** value from your app registration.
* **Client secret:** The client secret value that you created for your app registration.
* **Scope:** `https://outlook.office.com/.default`
* **Token endpoint URL:** `https://login.microsoftonline.com/{TenantID}/oauth2/v2.0/token` and replace `{TenantID}` with your **Directory (tenant ID)** value.
* **Token endpoint authentication method:** Either **CLIENT_SECRET_POST** or **CLIENT_SECRET_BASIC** is acceptable.
* **Hostname:** `smtp.office365.com`
* **Port:** `587`
* **Username:** The email address of the user that you designated in the [previous step](#enable-your-app-to-send-email-as-a-specific-user).

### OAuth 2.0 JWT bearer token flow

The **OAuth 2.0 JWT bearer token flow** uses asymmetric cryptography to authenticate the app without a shared secret. The app (Okta) uses a private key to sign a JSON Web Token (JWT) that asserts its identity. The provider verifies the signature using a public key.

The app creates a token that explicitly claims to be a specific user (the sub field). This is known as "impersonation" or "delegation."

When you use this flow, you create or configure the following settings:

* You create an app with your email provider that provides a client ID.
* You create a public/private key pair for the app.
* You assign a scope that authorizes your app to send email.
* You create or designate an account that the app can impersonate to send email.

The public/private key pair generates various properties, including a client ID and private key value.

#### Google Workspace SMTP example

This example uses the **OAuth 2.0 JWT bearer token flow** to connect your org to Google Workspace SMTP. The following steps summarize the required configuration and provide links to more detailed instructions and information when needed.

For more information about OAuth 2.0 for Google Workspace SMTP, see:

* [IMAP, POP, and SMTP](https://developers.google.com/workspace/gmail/imap/imap-smtp)
* [Domain-wide delegation](https://support.google.com/a/answer/162106)
* [Service accounts overview](https://docs.cloud.google.com/iam/docs/service-account-overview)

##### Create service account and generate key pair

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
1. Create a new project.
1. Enable the **Gmail API** for your project. See [Enabling an API](https://docs.cloud.google.com/endpoints/docs/openapi/enable-api) and [Enable the Gmail API](https://developers.google.com/gmail/api/quickstart/js#enable_the_gmail_api).
1. Go to **APIs & Services** > **Credentials**.
1. Create a new **Service Account**. See [Creating and managing service accounts](https://cloud.google.com/iam/docs/creating-managing-service-accounts).
1. Copy the client ID for the service account.
1. Create a new key for the service account. See [Create a service account key](https://docs.cloud.google.com/iam/docs/keys-create-delete#iam-service-account-keys-create-console).
1. Select **JSON** as the key type.
1. Click **Create** to download the JSON key file. Keep this file secure, as it contains your private key.

##### Grant email sending scope

1. Sign in to the [Google Admin Console](https://admin.google.com/) with your admin account.
1. Go to **Domain-wide Delegation**. See [Set up domain-wide delegation for a client](https://support.google.com/a/answer/162106?sjid=6859758194021594224-NA#zippy=%2Cset-up-domain-wide-delegation-for-a-client)
1. Enter the service account's client ID.
1. In the OAuth scopes field, enter `https://mail.google.com/`.
1. Click **Authorize**.

You have now granted the service account permission to send email on behalf of users in your Google Workspace domain.

##### Configure your org's SMTP settings

After you've created your service account and granted the necessary permissions, you can connect your org to Google Workspace SMTP. Use the information in the private key in the JSON file to configure the SMTP settings in your org.

Open the JSON file that you [downloaded previously](#create-service-account-and-generate-key-pair). It contains the private key and other necessary information in the following format:

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

Use these values to configure the SMTP settings in your org. See [Configure a custom email provider](https://help.okta.com/okta_help.htm?type=oie&id=csh-email-provider-main#configure-a-custom-email-provider) and use the **OAuth 2.0 JWT bearer token flow** settings.

* **Client ID:** The `client_id` value.
* **Token endpoint URL:** The `token_uri` value.
* **Signing algorithm:** `RS256`
* **Key ID:** The `private_key_id` value.
* **Issuer:** The `client_email` value.
* **Subject:** The email address of a user in your Google Workspace domain.
* **Audience:** The `token_uri` value.
* **Private key:** The `private_key` value.
* **Scope:** `https://mail.google.com/`
* **Private key:** The `private_key` value from the JSON file. Ensure that you preserve the line breaks (`\n`) in the key.
* **Hostname:** `smtp.gmail.com`
* **Port:** `587`
* **Username:** The same email address used in the **Subject** field.

### Configure SPF and DKIM

Ignore for now

Add this content to email or domains guide:


Recipient email servers perform checks to verify that an incoming email is legitimate. Update your DNS records to authorize your provider.

* **Sender Policy Framework (SPF):** An SPF record lists the IP addresses and domains authorized to send mail for your domain. Update your existing SPF record to include your provider's mechanism.
    * **Google:** `include:_spf.google.com`
    * **Microsoft:** `include:spf.protection.outlook.com`
* **DomainKeys Identified Mail (DKIM):** DKIM adds a cryptographic signature to emails, verifying that the message was not altered in transit. Generate DKIM keys in your email provider's admin console and add the resulting `TXT` records to your DNS configuration.