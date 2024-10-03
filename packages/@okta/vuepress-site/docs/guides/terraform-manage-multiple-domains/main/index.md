---
title: Manage custom domains with Terraform
excerpt: Create and manage multiple domain names in your Okta org.
layout: Guides
---

Create and manage multiple domain names in your Okta org.

---

#### Learning outcomes

Add a custom domain to your org.

#### What you need

* Familiarity with Terraform terms: configuration, resources, and commands. See the Terraform documentation [introductory concepts](https://www.terraform-best-practices.com/key-concepts). Also, see the [introduction page for Okta Terraform automation](/docs/guides/terraform-overview/main/).

* An Okta org that uses the Okta Identity Engine (the default for newer Okta accounts)

* A [Terraform configuration](/docs/guides/terraform-enable-org-access/) that can access your Okta org

* An Okta user account with the Super Administrator role

* An ability to view and change the DNS records for domains, such as `example.com`, and subdomains, such as `my-brand.example.com`, used for your Okta org

* A valid 2048-bit PEM-encoded TLS certificate for your subdomain

* Terraform 1.8.5 or later

* Okta Terraform provider 4.9.1 or later

## Overview

You can customize the domain name of your Okta org. You can also create up to three custom domains if your org includes the multibrand feature. See [About Okta domain customization](/docs/guides/custom-url-domain/main/#about-okta-domain-customization) in [Customize domain and email address](/docs/guides/custom-url-domain/).

Your customized domain enables you to create a seamless branded experience for your users so that all URLs look like your app. For example, you can change the URL domain from the default to `my-example-org.com`.

The multibrand customization feature enables customizing multiple domains and subdomains in addition to a hosted org. To manage branding for a custom domain in Terraform, first follow the instructions in this article to create custom domains and create resources that encapsulate your customizations. Then [create a new brand](docs/guides/terraform-manage-end-user-experience/main/#create-a-new-brand-requires-multibrand-customization) and add your customizations.

### Set up your Terraform files

For guidance on organizing your files, see [setting up a typical Okta Terraform configuration](/docs/guides/terraform-organize-configuration/main/#configure-a-basic-okta-terraform-configuration). Consider organizing your Terraform code in a way that groups related resources together. For example, you could create a Terraform file called `brands.tf` that contains custom domains, brands, and themes.

## Add or confirm the API scopes

To manage domains, the API scopes in your Terraform integration must include `okta.domains.manage`.

To grant scopes in the Admin Console and to include them in your Terraform code, see the articles on [enabling your API service app for Terraform access](/docs/guides/terraform-enable-org-access/) and [setting up a typical Okta Terraform configuration](/docs/guides/terraform-organize-configuration/).

## Add a custom domain in Terraform

Creating and adding a custom domain takes several steps that you must complete in order. At least one of the steps may require waiting for up to a day. The steps are:

1. [Create an okta-domain resource](#create-a-custom-domain-resource).

1. [Update the domain with the `CNAME` and `TXT` records](#update-the-domain-with-the-cname-and-txt-records).

1. [Request domain verification](#request-domain-verification).

1. [Confirm your that custom domain triggers an Okta sign-in flow](#confirm-that-your-custom-domain-triggers-an-okta-sign-in-flow).

1. [Update other objects and systems to use your custom domain](#update-other-objects-and-systems-to-use-your-custom-domain).

### Create a custom domain resource

1. Add an [okta-domain](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/domain) Terraform resource to your configuration for the new domain.

1. Set the `name` field to the domain name, such as `"example.com"`.

1. Set the certificate source type:

    It's recommended to enable Okta management of the certificate by setting the source-type attribute:

      `certificate_source_type = "OKTA_MANAGED"`

    Some orgs and pricing options don't support certificates managed by Okta. If you are unsure or want to migrate a manual certificate to an Okta-managed certificate, contact Okta Support.

    The following code shows an example resource for an Okta-managed certificate for the domain `company1.example.com` of company1:

    ```hcl
    resource "okta_domain" "company1" {
      name = "company1.letsauth0.com"
      certificate_source_type = "OKTA_MANAGED"
    }
    ```

> **Note:** If you maintain the custom domain's [Certificate Authority Authorization (CAA)](https://datatracker.ietf.org/doc/html/rfc6844) record, add `letsencrypt.org` to the issuers list. This enables Okta to obtain and renew the TLS certificate. You must also do this if you initially used only the Okta certificate, but are now maintaining the CAA record. See [Let's Encrypt—Using CAA](https://letsencrypt.org/docs/caa/).

* To provide your own certificate, set the source type as follows:

    ```hcl
      certificate_source_type = "MANUAL"
    ```

The TLS certificate for your subdomain must be PEM-encoded and use a 2048-bit PEM-encoded private key.

Okta performs validation checks on the certificate that you upload. If your TLS certificate is a wildcard certificate, it must include the full URL in the Common Name (CN) or Subject Alternative Name (SAN) when generated. Otherwise, the following error occurs when you attempt to upload the certificate: "The specified certificate does not match your Custom URL Domain." If you receive this error, ask the person in your organization responsible for generating certificates to determine whether your TLS certificate is a wildcard certificate.

Add a `domain_certificate` resource that links to the certificate to upload the file. For details on this resource, see [the provider documentation for certificates](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/domain_certificate). Be sure to include the` ----BEGIN CERTIFICATE----` and the `----END CERTIFICATE----` lines.

1. Use `terraform plan` and `terraform apply` to deploy the custom domain to Okta.

    > **Note:** The Okta org must verify that you control the DNS records for this domain before you can use it in your Terraform configuration. Follow the steps in [Update the domain with the `CNAME` and `TXT` records](#update-the-domain-with-the-cname-and-txt-records), [Request domain verification](#request-domain-verification), and [Confirm that your custom domain triggers an Okta sign-in flow](#confirm-that-your-custom-domain-triggers-an-okta-sign-in-flow) to verify the domain.

1. Add this `output` block to print the set of DNS records required for the domain.

    ```hcl
      output dns_records_to_update_company1 {
      value = okta_domain.company1.dns_records
    }
    ```

1. Run `terraform apply`.

1. Run `terraform output -json {outputVariableName}` to view the configuration information in JSON format. Okta recommends saving the output to a file for your records. For example, the command line for an output variable of `email_dns_records_to_update_company1` is:

    ```sh
    terraform output -json dns_records_to_update_company1 > dns_records.json
    ```

1. Review the JSON file for the required content: one object with a `record_type` attribute of `TXT` and another with a `record_type` attribute of `CNAME`. Use this output in the next section.

   The content looks similar to the following:

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

### Update the domain with the CNAME and TXT records

This step requires adding DNS records to the custom domain using your domains' service provider. This usually requires administrative access. If you don't have this access, contact your system administrator.

The specific user interface or commands for adding the `CNAME` and `TXT` records depends on your service provider. Some may include automation using Terraform.

The following are the generic steps to add the records. The specific interface varies.

1. Locate the JSON output from the [Create a custom domain resource](#create-a-custom-domain-resource).

1. Sign in to your domain provider for your custom domain and navigate to the domain record editor.

1. Create a `CNAME` record that maps your custom brand to a domain that Okta creates just for this custom domain. The values that you need for this step are in the object in the JSON output with a `record_type` of `"CNAME"`.

    1. Set the fully qualified domain name (FQDN) of the `CNAME` record to the value of the `fqdn` field in the JSON output.

    1. Set the value of the `CNAME` record to the string in the `values` array of the JSON output. This is the name for your custom domain, such as `example-org.customdomains.oktapreview.com`.

    1. Save the new record in your ISP's control panel for DNS records.

1. Create a `TXT` record to support Okta domain verification. The values you need for this step are in the object in the JSON output with a `record_type` of `"TXT"`.

    1. Set the fully qualified domain name (FQDN) of the `TXT` record to the value of the `fqdn` field in the JSON output. Include any underscores that are at the start of the value.

    1. Set the value of the `TXT` record to the string in the `values` array of the JSON output. In the previous example of a JSON record, this value is `NNQY-CZHKKHLKJKZODDYZOT5ZV3a7gM8-bxHc9o`.

    1. Save the new record in your ISP's control panel for DNS records.

1. Wait until the DNS records propagate. This step may take up to 24 hours, though could take as little as 15 minutes. Check if your DNS records are available using a tool, such as [Dig](https://toolbox.googleapps.com/apps/dig/).

### Request domain verification

Request Okta domain verification after the DNS changes have propagated. Okta confirms that the `TXT` records for your domain contain the Okta-generated value proving that you control the domain. In addition, Okta checks the `CNAME` record if you're using an Okta-managed certificate.

1. Add an [okta_domain_verification](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/domain_verification) Terraform resource to your configuration.

1. Set the `domain_id` attribute to your domain's ID:

    ```hcl
    resource "okta_domain_verification" "verify_okta" {
      domain_id = {okta_domain.brand1.id}
    }
    ```

1. Use `terraform plan` and `terraform apply` to deploy the domain verification resource. Okta may take up to fifteen minutes to check your domain. If the `terraform apply` command succeeds, verification succeeded, and you can proceed to the next step. If the command fails, wait a few minutes and try again.

### Confirm that your custom domain triggers an Okta sign-in flow

Open your custom domain in your browser. The Okta sign-in page should appear. If the page doesn't appear, it may be because your machine or DNS providers are caching the old records. You can try flushing the DNS cache using a tool such as [Google DNS ](https://google-public-dns.appspot.com/cache) or [Open DNS](https://cachecheck.opendns.com/).

When everything works correctly, comment out the `output` block in your configuration that's used to return the DNS records that need changing.

### Update other objects and systems to use your custom domain

Update any of your apps and authorization servers to use the desired custom domain.

#### Update the issuer for any OpenID Connect (OIDC) apps

Consider changing the issuer URL for your OpenID Connect apps that use the built-in org authorization server. See the provider for [details about the app_oauth resource](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/app_oauth).

Choose a setting for the `issuer_mode` attribute. The most common setting is `DYNAMIC`. This uses either the org URL or the custom domain URL depending on the domain of the system that requests the connection. The `CUSTOM_URL` setting enables a custom URL, but only when there's one brand. See [Custom URL is not showing in the Issuer in the Custom Authorization Server Settings](https://support.okta.com/help/s/article/custom-issuer-url-is-not-showing-in-the-custom-server-settings?language=en_US).

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

Existing [custom authorization servers](/docs/concepts/auth-servers/) continue to use the Okta org URL unless you change it. All new custom authorization servers use the custom domain by default.

Update existing custom authorization servers to return the custom domain as the issuer value. The choices for the `issuer_mode` attribute are the same as those for [OIDC apps](#update-the-issuer-for-any-openid-connect-oidc-apps).

```hcl
resource "okta_auth_server" "example" {
  audiences   = ["api://example"]
  description = "My Example Auth Server"
  name        = "example"
  issuer_mode = "CUSTOM_URL"
  status      = "ACTIVE"
}
```

#### Update external apps that connect to Okta

If you have external apps that use Okta endpoints with the uncustomized URL domain, update them to use the custom URL domain.

## Customize the look and the behavior of your brands

You can customize the look and the behavior of your brands. There are two main customization resources available to you in the Okta Terraform provider:

* **Brand**: A high-level resource that contains some settings, such as a custom privacy policy, is associated with a custom domain. See [Brands](/docs/concepts/brands/).

* **Theme:** Settings that change the appearance of the Okta Sign-In Widget, such as the logo, background image, colors, and how the colors are applied. Each brand has only one theme, which Okta creates automatically when the brand is created.

To create brand and theme customizations, see [Manage branding with Terraform](/docs/guides/terraform-manage-end-user-experience/).

## Custom email domains

To configure a brand to send mail using a custom email address, create a different type of domain resource in Okta called an email domain. See [Create a custom email domain in Manage branding with Terraform](/docs/guides/terraform-manage-end-user-experience/main/#create-a-custom-email-domain).

