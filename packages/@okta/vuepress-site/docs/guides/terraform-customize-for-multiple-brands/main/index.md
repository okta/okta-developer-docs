---
title: Customize Okta for multiple brands using Terraform
excerpt: Create different user experiences for multiple websites that share an Okta org.
layout: Guides
---

Create different user experiences for multiple websites that share an Okta org.

---

#### Learning outcomes

* Learn about multibrand customization.

* Add a custom domain for each brand.

#### What you need

* Familiarity with Terraform terms: configuration, resources, and commands. For more information, see the [Terraform overview](/docs/guides/terraform-overview).

* An Okta organization that uses the Okta Identity Engine (the default for newer Okta accounts).

* A [Terraform configuration](/docs/guides/terraform-enable-org-access/main) that can access your Okta org.

* An Okta pricing plan that includes multibrand customization. To test your organization, see [Confirm your org supports multibrand customization](#confirm-your-org-supports-multibrand-customization).

* An Okta user account with the Super Administrator role.

* An ability to view and change the DNS records for domains, such as `example.com`, and subdomains, such as `my-brand.example.com`, used for your Okta org.

* A valid 2048-bit PEM-encoded TLS certificate for your subdomain.

* Terraform 1.8.5 or later.

* Okta Terraform provider 4.9.1 or later.

## Overview

The Okta brands feature allows customizing the look and feel of pages and templates for the hosted domain. The *multibrand** customization* feature enables customizing multiple domains and subdomains using one org.

Each brand is associated with a custom domain name that you manage. Your customized domain allows you to create a seamless branded experience for your users so that all URLs look like your app. For example, you can change the URL domain from the default of `example-org.okta.com` to `example-org.okta.com`.

You can create up to three custom domains. You can contact Okta Support to request an increase in the limit.

For general information, see the [main article for brands](/docs/concepts/brands). For more custom domain options and certificate information, see the [article for brand customization in the UI](https://developer.okta.com/docs/guides/brand-and-customize/). You can manage all these customizations using the Okta Terraform provider.

After you follow the instructions in this article to create custom domains, create resources that encapsulate your customizations. For more information on creating brand resources, see [Customize the end-user experience with Terraform](/docs/guides/terraform-manage-end-user-experience/main/).

### Confirm your org supports multibrand customization

Your Okta org pricing plan must include multibrand customization to complete all the steps in this article. To check if your Okta org supports multibrand customization:

1. Log in to the Admin Console for your Okta organization.

1. In the left navigation, click **Security.**

1. Review the items under **Security**.

    * If it includes **Brands**, your org supports multibrand customization.

    * If it includes **Branding**, your org does not support multibrand customization. Contact Okta Support about feature availability. However, you can customize the *default brand*. See [Customize the end-user experience with Terraform](/docs/guides/terraform-manage-end-user-experience/main/).

### Set up your Terraform files

For guidance on organizing your files, see [setting up a typical Okta Terraform configuration](/docs/guides/terraform-organize-configuration/main/#configure-a-basic-okta-terraform-configuration). Consider organizing your Terraform code in a way that groups related resources together. For example, you could create a Terraform file called `brands.tf` that contains custom domains, brands, and themes.

## Add or confirm the API scopes

Your Terraform integration must have the following API scopes to manage domains:

* `okta.domains.manage`

To grant scopes in the Admin Console and to include them in your Terraform code, see the articles on [enabling your API service application for Terraform access](/docs/guides/terraform-enable-org-access/main) and [setting up a typical Okta Terraform configuration](/docs/guides/terraform-organize-configuration/main).

Note that to manage brands, themes, and email templates, your Terraform integration must also have the following API scopes: `okta.brands.manage` and `okta.templates.manage`, For more information, see [Add or confirm the API Scopes in Customize the end-user experience with Terraform](/docs/guides/terraform-manage-end-user-experience/main/#add-or-confirm-the-api-scopes).

## Add a custom domain in Terraform

Creating a custom domain consists of three high-level steps: create an `okta-domain` resource, update your domain to include new `CNAME` and `TXT` records, and then request domain verification. See the following subsections for each step:

1. Create a custom domain resource.

1. Update your domain to include new `CNAME` and `TXT` records.

1. Request domain verification.

1. Confirm that your custom domain triggers Okta sign-in.

1. Update other objects and systems to use your new domain.

### Create a custom domain resource

1. Create a custom domain in Okta using an [okta-domain](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/domain) Terraform resource.

1. Specify its name in the `name` field.

1. Set the certificate source type:

   * It is recommended to enable Okta management of the certificate by setting the source-type attribute:

      `certificate_source_type = "OKTA_MANAGED"`

    Some organizations and pricing options do not support certificates managed by Okta. If you are unsure or want to migrate a manual certificate to an Okta-managed certificate, contact Okta Support.

    The following code shows an example resource for an Okta-managed certificate for the brand `company1`:

    ```hcl
    resource "okta_domain" "company1" {
      name = "company1.letsauth0.com"
      certificate_source_type = "OKTA_MANAGED"
    }
    ```

> **Note:** If you maintain the custom domain's [Certificate Authority Authorization (CAA)](https://datatracker.ietf.org/doc/html/rfc6844) record, add `letsencrypt.org` to the issuers list. This enables Okta to obtain and renew the TLS certificate. You must also do this if you start maintaining the CAA record after first only using the Okta certificate. For more information, see [Let's Encrypt—Using CAA](https://letsencrypt.org/docs/caa/).

* To provide your own certificate, set the source type as follows:

```hcl
  certificate_source_type = "MANUAL"
```

The TLS certificate for your subdomain must be PEM-encoded and use a 2048-bit PEM-encoded private key.

Okta performs validation checks on the certificate that you upload. If your TLS certificate is a wildcard certificate, it must include the full URL in the Common Name (CN) or Subject Alternative Name (SAN) when generated. Otherwise, the following error occurs when you attempt to upload the certificate: "The specified certificate does not match your Custom URL Domain." If you receive this error, ask the person in your organization responsible for generating certificates to determine whether your TLS certificate is a wildcard certificate.

Add a `domain_certificate` resource that links to the certificate to upload the file. For details on this resource, see [the provider documentation for certificates](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/domain_certificate). Be sure to include the` ----BEGIN CERTIFICATE----` and the `----END CERTIFICATE----` lines.

1. Use `terraform plan` and `terraform apply` to deploy the custom domain to Okta.

    > **Note:** The Okta org must verify that you control the DNS records for this domain before you can use it in your Terraform configuration. Follow the steps in [Update your domain to include new `CNAME` and `TXT` records], [Request domain verification], and [Confirm that your custom domain triggers Okta sign-in] to verify the domain.

1. Add this `output` block to print the set of required DNS records available from the custom domain resource after creation on the Okta server.

    ```hcl
      output dns_records_to_update_company1 {
      value = okta_domain.company1.dns_records
    }
    ```

1. Run `terraform apply`.

1. Review the JSON output for your `output` block. Save this information to another file for your records. The JSON looks similar to the following. For each array element, the `record_type` field indicates the DNS record type.

  ```json
      "dns_records_to_update_company1" = [
        {
          "expiration": "2024-05-03T00:01:38.000Z",
          "fqdn": "_acme-challenge.company1.letsauth0.com",
          "record_type": "TXT",
          "values": [
            "NNQY-CZHKKHLKJKZODDYZOT5ZV3a7gM8-bxHc9o"
          ]
        },
        {
          "expiration": "",
          "fqdn": "company1.letsauth0.com",
          "record_type": "CNAME",
          "values": [
            "example-org.customdomains.oktapreview.com"
          ]
        }
      ]
  ```

### Update your domain to include new CNAME and TXT records

To do this step, you must have administrative access to your domain provider to add DNS records to the custom domain. If you do not have this access, contact your system administrator.

You could automate this in Terraform if you have a domain provider who supplies a Terraform provider. See your domain service provider's documentation for their Terraform syntax. The following example demonstrates how to do this manually in any domain provider.

Use the JSON output from the previous step to create two DNS records:

1. Log into your domain provider for your custom domain and navigate to the domain record editor.

1. Create a `CNAME` record that maps your custom brand to a domain that Okta creates just for this custom domain.

    1. For the `CNAME` record's `FQDN` (fully qualified domain name) field, paste the value from the `fqdn` field from the JSON output from the previous step in the array item for record type `CNAME`. This matches your custom domain.

    1. For the `CNAME` record's value field, use the text from the `values` array from the previous step for the `CNAME` record type. This matches your Okta organization domain. In the last example, this is `example-org.customdomains.oktapreview.com`.

    1. Save the new record in your ISP's control panel for DNS records.

1. Create a `TXT` record to support Okta domain verification.

    1. For the `TXT` record's `FQDN` field, paste the value from the `fqdn` field from the JSON output from the previous step in the array item for record type `TXT`. In the last example, this is `_acme-challenge.my-brand1.letsauth0.com`. Include the underscore character at the beginning of the `FQDN` value.

    1. For the `TXT` record's value, use the text from the `values` array from the previous step for the `TXT` record type. In the last example, it's `NNQY-CZHKKHLKJKZODDYZOT5ZV3a7gM8-bxHc9o`**.**

    1. Save the new record in your ISP's control panel for DNS records.

1. Wait until the DNS records propagate. It could take as little as 15 minutes, but it may take up to 24 hours for your DNS changes to propagate. If your changes don't appear within 24 hours, return to this step and confirm your settings. Use a tool to check your DNS records, such as [Dig](https://toolbox.googleapps.com/apps/dig/).

### Request domain verification

After you confirm that your DNS changes have propagated across the internet, you can request Okta domain verification using Terraform. Domain verification means that Okta checks the DNS records of your domain to confirm if the `TXT` record contains the special Okta-generated value that proves that you control that domain. If you're using an Okta-managed certificate, the domain verification includes checking if the new `CNAME` record appears correct. If you provide your own certificate, only the `TXT` record is verified.

1. Add an [okta_domain_verification](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/domain_verification) Terraform resource.

1. Set its `domain_id` attribute to your domain's ID:

    ```hcl
      resource "okta_domain_verification" "verify_okta" {
      domain_id = okta_domain.brand1.id
    }
    ```

1. Use `terraform plan` and `terraform apply` to deploy the domain verification resource. Okta may take up to fifteen minutes to check your domain. If the `terraform apply` command succeeds, verification succeeded, and you can proceed to the next step. If the command fails, wait a few minutes and try again.

### Confirm that your custom domain triggers Okta sign-in

In your browser, go to your custom domain. The Okta Sign-In page should appear. If this fails, DNS providers or your local machine may be caching old records. If you verified that your records are correct, but your custom domain isn't working, flush the DNS cache. Websites are available to flush the caches for [Google DNS ](https://google-public-dns.appspot.com/cache)and [Open DNS](https://cachecheck.opendns.com/).

When everything works correctly, comment out the `output` block that extracts the DNS records that need changing.

### Update other objects and systems to use your custom domain

#### Update the issuer for any OpenID Connect (OIDC) apps

Also, consider changing the issuer URL for your OpenID Connect apps that use the built-in org authorization server. See the provider for [details about the app_oauth resource](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/app_oauth).

Set the `issuer_mode` attribute to one of the following choices. For typical use, set to `DYNAMIC` to use the organization URL or the custom domain URL based on the system's domain that requests the connection. Another `issuer_mode` option called `CUSTOM_URL` enables a custom URL, but only when there's one brand. See [Custom URL is not Showing in the Issuer in the Custom Authorization Server Settings](https://support.okta.com/help/s/article/custom-issuer-url-is-not-showing-in-the-custom-server-settings?language=en_US).

For example:

```hcl
resource "okta_app_oauth" "MyApp" {
  label                      = "MyApp"
  type                       = "web"
  redirect_uris              = ["http://MyApp.example.com/authorization-code/callback"]
  response_types             = ["code"]
  grant_types                = ["authorization_code", "refresh_token", "client_credentials"]
  token_endpoint_auth_method = "private_key_jwt"

  implicit_assignment = true
  login_mode = "DISABLED"
  login_uri = "http://MyApp.example.com"

  …

  issuer_mode = CUSTOM_URL
}
```

#### Update the issuer for any custom authorization servers

After you customize your Okta domain, existing [custom authorization servers](/docs/concepts/auth-servers/) continue to use the Okta org URL until you change it. All new custom authorization servers use the custom domain by default.

Update existing custom authorization servers to return the custom domain as the issuer value.

For typical use, set the `issuer_mode` attribute to `DYNAMIC` to use the organization URL or the custom domain URL based on the system's domain that requests the connection. Another `issuer_mode` option called `CUSTOM_URL` enables a custom URL, but only when there's one brand. See [Custom URL is not Showing in the Issuer in the Custom Authorization Server Settings](https://support.okta.com/help/s/article/custom-issuer-url-is-not-showing-in-the-custom-server-settings?language=en_US).

```hcl
resource "okta_auth_server" "example" {
  audiences   = ["api://example"]
  description = "My Example Auth Server"
  name        = "example"
  issuer_mode = "CUSTOM_URL"
  status      = "ACTIVE"
}
```

#### Update external applications that connect to Okta

If you have external apps that use Okta endpoints with the uncustomized URL domain, update them to use the custom URL domain.

## Customize the look and the behavior of your brands

You can customize the look and the behavior of your brands. There are two main customization resources available to you in the Okta Terraform provider:

* **Brand**: A high-level resource that contains some settings, such as a custom privacy policy, is associated with a custom domain. See the [main article about brands](/docs/concepts/brands/).

* **Theme: **Settings that change the appearance of the user sign-in widget, such as the logo, background image, colors, and how the colors are applied. Each brand has only one theme, which Okta creates automatically when the brand is created.

To create brand and theme customizations, see [Customize the end-user experience with Terraform](/docs/guides/terraform-manage-end-user-experience/main).

## Custom email domains

To configure a brand to send mail using a custom email address, create a different type of domain resource in Okta called an email domain. See [Customize the end-user experience with Terraform](/docs/guides/terraform-manage-end-user-experience/main/#email-template-customization).

