---

title: Customize the end-user experience with Terraform

excerpt: Change the appearance of Okta sign-in pages, outgoing emails, and dashboard.

layout: Guides

---

Change the appearance of Okta sign-in pages, outgoing emails, and dashboard.

---

#### Learning outcomes

* Import Okta objects that control color, logos, and page styling into your Terraform configuration.

* Customize the appearance of sign-in pages, error pages, and the Okta end-user dashboard, including color, logos, and page styling.

* Customize email template content and appearance.

#### What you need

* Familiarity with the Terraform terms: configuration, resources, state, and commands. See the [Terraform overview](/docs/guides/terraform-overview).

* An Okta organization.

* A [Terraform configuration](/docs/guides/terraform-enable-org-access/main) that can access your Okta org.

* An Okta user account with the Super Administrator role.

* The ability to update the DNS records of your public custom domain to configure a custom email address from which Okta can send mail.

* Terraform 1.8.5 or later

* Okta Terraform provider 4.9.1 or later

## Overview

The Okta Brands feature enables you to customize parts of your org's end-user experience. For example, you can customize the colors and images on your Okta sign-in pages, error pages, and Okta End-User Dashboard. You can customize email templates in multiple languages and create custom email domains for outgoing Okta emails. For general information, see the [main article on brands](/docs/concepts/brands).

If your org is part of a paid Okta account, you can use Terraform to [customize the look and feel of sign-in pages and Okta templates for multiple brands](/docs/guides/terraform-customize-for-multiple-brands/main/). You can still modify the default brand if your organization doesn't support multibrand customization (such as Developer Edition orgs).

## Set up your configuration

### Check if your org supports multibrand customization

Confirm that your Okta org supports multibrand customization:

1. Log in to the Admin Console for your Okta org.

1. In the left navigation, click **Security.**

1. Review the items under **Security**.

    * If it includes **Brands**, your org supports multibrand customization.

    * If it includes **Branding**, your org does not support multibrand customization. Contact Okta Support about feature availability.

### Set up your Terraform files

For guidance on organizing your files, see [Configure a basic Okta Terraform configuration](/docs/guides/terraform-organize-configuration/main/#configure-a-basic-okta-terraform-configuration). Consider organizing your Terraform code in a way that groups related resources together. For example, you could create a Terraform file called `brands.tf` that contains brands and themes.

### Add or confirm the API scopes

Your Terraform integration must have the following API scopes for specific tasks:

* `okta.brands.manage` — Manage brands and themes

* `okta.templates.manage` — Customize email templates

* `okta.domains.manage` — Add custom email domains

* `okta.emailDomains.manage` — Add custom email domains

To grant scopes in the Admin Console and to include them in your Terraform code, see the articles on [enabling your API service application for Terraform access](/docs/guides/terraform-enable-org-access/main) and [Configure a basic Okta Terraform configuration](/docs/guides/terraform-organize-configuration/main/#configure-a-basic-okta-terraform-configuration).

## Create or import the brand resource

There are two primary customization resources from Terraform:

* **Brand**: A high-level resource that contains some settings, such as a custom privacy policy. It is associated with a custom domain. See the [main article about brands](/docs/concepts/brands/).

* **Theme:** Settings that change the appearance of the user sign-in widget, such as the logo, background image, colors, and how to apply the colors. Each brand has exactly one theme, which Okta creates when Okta creates the brand resource.

    The instructions for working with these in Terraform differ if your org type supports multibrand customization.

* Okta recommends [creating custom domains](/docs/guides/terraform-customize-for-multiple-brands/main/#create-a-custom-domain-resource) first, and then [new brand resources](#create-a-new-brand-requires-multibrand-customization) if your organization supports multibrand customization. However, you can modify the default brand to support application integrations that don't use a custom domain.

* You must modify the default brand if your org doesn't support multibrand customization (such as Developer Edition orgs).

### Create a new brand (requires multibrand customization)

1. Create new custom domains as described in (TO BE PUBLISHED link to Customize Okta for multiple brands using Terraform).

1. Create a brand resource, for example:

    ```hcl
    resource "okta_brand" "A" {
      name = "A"
      agree_to_custom_privacy_policy = true
      custom_privacy_policy_url = "http://a.com/privacy"
    }
    ```

1. Run a `terraform apply` command. To apply only the new resource at this time, run a *targeted apply* command:

    ```sh
    terraform apply -target okta_brand.A
    ```

1. In your domain definition, set the `brand_id` to the ID of your new brand:

    ```hcl
    resource "okta_domain" "A" {
      name = "a.example.com"
      certificate_source_type = "OKTA_MANAGED"
      brand_id = okta_brand.A.id
    }
    ```

1. Due to how the core Okta Administration API works, Terraform resources don't directly create the theme object. Instead, your Terraform code gets the theme from the already-created brand object. Your new brand automatically creates an associated theme object on the server. Modifying the theme object from Terraform requires using the Terraform feature called [import](https://developer.hashicorp.com/terraform/tutorials/state/state-import). The import process allows you to get the theme and change its one theme in place.

    There are several ways to import objects. The most common ways are the `terraform import` CLI and the `import` block syntax (requires Terraform 1.5 or later). The following example shows how to use Terraform import block syntax to get the theme. It looks up the theme based on the associated brand, passing the ID to the import command in the format "`<brand-id>/<theme-id>`". In your theme object, include the required fields with `_variant` suffix, as shown in the example.

    ```hcl
    import {
      to = okta_theme.theme_A
      id = "${okta_brand.A.id}/${tolist(data.okta_themes.list_of_themes_A.themes)[0].id}"
    }
    ```

1. Create a Terraform resource that gets a list of themes for a brand. It takes brand ID and returns a list of themes. A brand just contains one theme, so its array of themes always has exactly one element.

    ```hcl
    data "okta_themes" "list_of_themes_A" {
      brand_id = okta_brand.A.id
    }
    ```

1. Create a new `okta_theme` resource:

    1. Set the `brand_id` to the ID of your brand.

    1. Set the theme ID using this syntax, which uses the data source you created in the previous step:

        ```hcl
        import {
          to = okta_brand.default_brand
          id = "${data.okta_brand.data_default_brand.id}"
        }
        ```

    1. Set the required arguments for colors. Set `primary_color_hex` and `secondary_color_hex` to the hex values of the desired colors for your org's primary and secondary colors.

    1. Set the required arguments for visual variants. For now, set `sign_in_page_touch_point_variant`, `end_user_dashboard_touch_point_variant`, `error_page_touch_point_variant`, and `email_template_touch_point_variant` to `"OKTA_DEFAULT"`. See the [okta_theme](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/theme) resource for the definitions and other variants you can use.

The following example shows the code for the domain, the import, and the theme declaration.

```hcl
  resource "okta_domain" "A" {
  name = "a.example.com"
  certificate_source_type = "OKTA_MANAGED"
  brand_id = okta_brand.A.id
}

# Create a list of themes for our brand.
# In practice, this list contains exactly one theme.
data "okta_themes" "list_of_themes_A" {
  brand_id = okta_brand.A.id
}

import {
  to = okta_theme.theme_A
  id = "${okta_brand.A.id}/${tolist(data.okta_themes.list_of_themes_A.themes)[0].id}"
}

resource "okta_theme" "theme_A" {
  brand_id = okta_brand.A.id
  theme_id = tolist(data.okta_themes.list_of_themes_A.themes)[0].id

  primary_color_hex    = "#880808"
  secondary_color_hex  = "#880808"

  sign_in_page_touch_point_variant       = "OKTA_DEFAULT"
  end_user_dashboard_touch_point_variant = "OKTA_DEFAULT"
  error_page_touch_point_variant         = "OKTA_DEFAULT"
  email_template_touch_point_variant     = "OKTA_DEFAULT"
}
```

### Modify the default brand (for all org types)

This section is for orgs that don't support multibrand customization, such as Developer Edition organizations. For information on multibrand customization, see (TO BE PUBLISHED link to Customize Okta for multiple brands using Terraform).

Use Terraform `import` blocks to import Okta objects and automatically generate the corresponding resources in your Terraform configuration.

1. In your `main.tf` Terraform configuration file, add an `okta_brands` data source. This data source gets a list of existing brands in your org.

    ```hcl
    data "okta_brands" "all_brands" {}
    ```

1. Import the default brand. Terraform doesn't directly create the default brand object. Use the Terraform `import` block to get it from the associated brand on the server.

    ```hcl
    import {
      to = okta_brand.default_brand
      id = "${data.okta_brand.data_default_brand.id}"
    }
    ```

1. Declare the brand resource imported in the previous step. The name field is the only required field. If you set this to something other than its current name, Okta changes the visible name of the default brand on the server.

    ```hcl
    resource "okta_brand" "default_brand" {
    name = "default_brand"
    }
    ```

1. Add an `okta_brand` data source to get the ID of the default brand. For single-brand customization, use the first brand in the array.

    ```hcl
    data "okta_brand" "data_default_brand" {
      brand_id = tolist(data.okta_brands.all_brands.brands)[0].id
    }
    ```

1. Import the default theme. Terraform doesn't directly create the default theme object. Use Terraform import to get it from the associated brand on the server.

    ```hcl
    import {
      to = okta_theme.theme_default
      id = "${data.okta_brand.data_default_brand.id}/${tolist(data.okta_themes.data_list_themes_for_default_brand.themes)[0].id}"
    }
    ```

1. Declare the theme resource imported in the previous step. The following shows how to set up the brand and theme IDs. All fields shown in this example are required:

    * Set `primary_color_hex` and `secondary_color_hex` to the hex values of the colors that you want to use for your org (the example for this step shows the default values.)

    * Set `sign_in_page_touch_point_variant`, `end_user_dashboard_touch_point_variant`, `error_page_touch_point_variant`, and `email_template_touch_point_variant` to `"OKTA_DEFAULT"`. See the [okta_theme](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/theme) resource for the definitions of other user interface customization.

      ```hcl
      resource "okta_theme" "theme_default" {
        brand_id = data.okta_brand.data_default_brand.id
        theme_id = tolist(data.okta_themes.data_list_themes_for_default_brand.themes)[0].id
        primary_color_hex    = "#1662dd"
        secondary_color_hex  = "#ebebed"
        sign_in_page_touch_point_variant = "OKTA_DEFAULT"
        end_user_dashboard_touch_point_variant ="OKTA_DEFAULT"
        error_page_touch_point_variant = "OKTA_DEFAULT"
        email_template_touch_point_variant = "OKTA_DEFAULT"
      }
      ```

1. Run `terraform apply`.

For additional customization with optional arguments, see the following sections.

## Customize optional brand settings

You can customize the appearance and behavior of the site using optional brand arguments. These include the locale, privacy policy, removing the text "Powered by Okta", and setting the default Okta app integration.

### Set the language

To change the language for a brand, set the `locale` argument to the [BCP 47 format](https://www.rfc-editor.org/info/bcp47) for the locale. The following example sets the language to French.

```hcl
resource "okta_brand" "name_of_brand" {
  name = "name_of_brand
  locale = "fr"
}
```

### Set the privacy policy

To use a custom privacy policy in the footer of your Okta pages for a brand, set `agree_to_custom_privacy_policy` to `true` and `custom_privacy_policy_url`.  The following example sets a custom privacy policy.

```hcl
resource "okta_brand" "name_of_brand" {
  name = "name_of_brand"
  agree_to_custom_privacy_policy = true
  custom_privacy_policy_url = "https://example.com/policy.html"
}
```

### Remove "Powered by Okta"

To remove "Powered by Okta" from the sign-in page, set `remove_powered_by_okta` to `true`.

```hcl
resource "okta_brand" "name_of_brand" {
  name = "name_of_brand"
  remove_powered_by_okta = true
}
```

### Set the default Okta application integration

Set the default brand by setting `default_app_app_instance_id` to an Okta application instance ID. This enables you to customize the application name displayed in any links. Set the `default_app_app_link_name` to the customer-facing name for the application integration.

```hcl
resource "okta_brand" "name_of_brand" {
  name = "name_of_brand"
  default_app_app_instance_id = okta_app_oauth.my_oauth_app.id
  default_app_app_link_name = "Corporate mail"
}
```

## Customize optional theme settings

### Set logos and background images

You can customize the following types of brand images. Set the value theme argument of the following of the related variable to the URL of the local image:

| Image type | Theme variable |
| ---------- | -------------- |
| Authentication dialog logo | logo |
| Favorite icon (favicon) | favicon |
| Background image | background_image |


For example, add this code to the configuration script for your theme to customize all of them.

```hcl
logo                     = "{URL-for-logo-image}"
favicon                  = "{URL-for-favicon-image}"
favbackground_image      = "{URL-for-background-image}"
```

### Set contrast colors

You set the primary color settings in the theme resource in the required fields `primary_color_hex` and `secondary_color_hex`.

Additionally, you can set the contrast colors. For the primary contrast, set the color in the argument `primary_color_contrast_hex`. For the secondary color contrast, set `secondary_color_contrast_hex`.

```hcl
...
primary_color_contrast_hex                     = "0x121212"
secondary_color_contrast_hex                   = "0x575757"
```

For more information about how Okta uses colors and the customizations in the color variant option fields, see the [provider for the theme resource](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/theme).

## Email template customization

Use the `okta_email_customization` resource to create customized email templates. You specify the type of email in the `template_name` attribute, such as `"ForgotPassword"` for the one sent to reset a forgotten password. See the [Okta Terraform provider documentation](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/email_customization) for the list of supported email templates.

You can also provide multiple template versions for different languages by setting the `language` attribute to the desired locale.

1. Add the required template management scope if it's not already granted. Do this by adding the `okta.templates.manage` scope to your configuration to the Okta API service app Terraform uses. For more information on adding scopes in Okta, see [Add or confirm the API scopes](#add-or-confirm-the-api-scopes).

1. Create a new `okta_email_customization` resource.

1. Set its `brand_id` field to the ID of your brand.

    ```hcl
    brand_id      = okta_brand.A.id
    ```

1. Use the `is_default` attribute if you create multiple languages for the same template. Add `is_default` set to `true` in the template with the default language. The server must first create the default language template. Add a `depends_on` attribute set to the resource for the default template to the other languages.

    ```hcl
    depends_on = [
        okta_email_customization.forgot_password_en
    ]
    ```

1. Set the `subject` and `body` fields to the subject and body text.

Use two dollar signs (`$$`) before any Okta variables in the HTML to escape the string interpolation in your configuration file — for example, `$${brand.theme.primaryColor}`. Otherwise, with only one dollar sign `$`, Terraform tries to interpolate those variables. See the provider documentation for the complete list of Okta variables that you can use.

Some types of templates have required variables. For example, the reset password template must contain `$$resetPasswordLink` or `$$oneTimePassword`. For the list of variables for each template name, see [Velocity variables](https://help.okta.com/en-us/content/topics/settings/velocity-variables.htm).

```hcl
resource "okta_email_customization" "forgot_password_en" {
  brand_id      = okta_brand.A.id
  template_name = "ForgotPassword"
  language      = "en"
  is_default    = true
  subject       = "Account password reset"
  body          = "Hi $$user.firstName,<br/><br/>Click this link to reset your password: $$resetPasswordLink"
}

resource "okta_email_customization" "forgot_password_es" {
  brand_id      = okta_brand.A.id
  template_name = "ForgotPassword"
  language      = "es"
  subject       = "Restablecimiento de contraseña de cuenta"
  body          = "Hola $$user.firstName,<br/><br/>Haga clic en este enlace para restablecer tu contraseña: $$resetPasswordLink"

  depends_on = [
    okta_email_customization.forgot_password_en
  ]
}
```

### Use HTML in an email template

You can use HTML in your email templates. Use heredoc syntax to use multiline HTML. The initial `HTMLDELIMITER` in the example body text is an arbitrary delimiter string you define. See [Heredoc Strings](https://developer.hashicorp.com/terraform/language/expressions/strings#heredoc-strings) for the syntax.

For example:

```hcl
resource "okta_email_customization" "user_activation_en" {
  brand_id      = okta_brand.A.id
  template_name = "UserActivation"
  language = "en"
  is_default = true
  subject = "Activate your new Okta account!"
  body = <<HTMLDELIMITER
  <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
  <html>
  <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  </head>
  <body>
  <div style="background-color: $${brand.theme.secondaryColor}; margin: 0">
  <table style="font-family: 'Proxima Nova', 'Century Gothic', Arial, Verdana, sans-serif; font-size: 14px; color: #5e5e5e; width:98%; max-width: 600px; float: none; margin: 0 auto;" border="0" cellpadding="0" cellspacing="0" valign="top" align="left">
    <tr align="middle"><td style="padding-top: 30px; padding-bottom: 32px;"><img src="$${brand.theme.logo}" height="37"></td></tr>
    <tr bgcolor="#ffffff"><td>
      <table bgcolor="#ffffff" style="width: 100%; line-height: 20px; padding: 32px; border: 1px solid; border-color: #f0f0f0;" cellpadding="0">
          <tr>
              <td style="color: #5e5e5e; font-size: 22px; line-height: 22px;">
              $${org.name} - Welcome to Okta!
              </td>
          </tr>
          <tr>
              <td style="padding-top: 24px; vertical-align: bottom;">
                  Hi $!{StringTool.escapeHtml($!{user.profile.firstName})},
              </td>
          </tr>
          <tr>
              <td style="padding-top: 24px">
                  Your organization is using Okta to manage your web applications. You can access all your applications through one secure home page. Watch this short video to learn more: <a href="https://www.okta.com/intro-to-okta/" style="color: #007dc1; text-decoration: none;"><span style="color: #007dc1; text-decoration: none;">https://www.okta.com/intro-to-okta/</span></a>
              </td>
          </tr>
          <tr>
              <td style="padding-top: 24px;">
                  Your system administrator has created an Okta user account for you.<br/>
                  <strong>Click the following link to activate your Okta account:</strong>
              </td>
          </tr>
          <tr>
              <td align="center">
                  <table border="0" cellpadding="0" cellspacing="0" valign="top">
                    <tr>
                     <td align="center" style="height: 39px; padding-top: 24px; padding-bottom: 8px;"><a id="reset-password-link" href="$$activationLink" style="text-decoration: none;"><span style="display: block; padding: 9px 32px 7px 31px; border: 1px solid; text-align: center; cursor: pointer; color: #fff; border-radius: 3px; background-color: $${brand.theme.primaryColor}; border-color: $${brand.theme.primaryColor}; box-shadow: $${brand.theme.primaryColor} 0 1px 0;">Reset Okta Account</span></a>
                          </td>
                      </tr>
                      <tr>
                          <td align="center" style="color: #999;">
                              This link expires in $${f.formatTimeDiffHoursNowInUserLocale($${org.activationTokenExpirationHours})}.
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
          <tr>
              <td style="padding-top: 24px;">
                  Your username is <strong>$${user.profile.login}</strong><br/>
                  Your organization's sign-in page is <a href="$${baseURL}" style="color: #007dc1; text-decoration: none;"><span style="color: #007dc1; text-decoration: none;">$${baseURL}</span></a>
              </td>
          </tr>
          <tr>
              <td style="padding-top: 24px;">
                  If you experience difficulties accessing your account, send a help request to your system administrator using the link: <a href="$${baseURL}/help/login" style="color: #007dc1; text-decoration: none;"><span style="color: #007dc1; text-decoration: none;">$${baseURL}/help/login</span></a>
              </td>
          </tr>
      </table>
    </td></tr>
    <tr>
      <td>
          <table style="width: 100%; line-height: 20px; padding: 32px;" cellpadding="0">
              <tr>
                  <td style="font-size: 12px; padding-top: 24px; color: #999;">
                      This email was automatically sent using <a href="https://www.okta.com" style="color:#616161">Okta's service</a>. Replies are not monitored or answered. Okta has can't see who receives these emails, and is not responsible for, and disclaims any and all liability associated with, this email's content. <br/><br/>The sender may have customized the contents of the email. If you would like to notify Okta of anything suspicious, report it to security@okta.com.
                  </td>
              </tr>
          </table>
      </td>
    </tr>
  </table>
  </div>
  </body>
  </html>
  HTMLDELIMITER
}
```

The following image shows an example of an email generated using the template:

![A screenshot that shows an activation email with personal information and URLs hidden by gray rectangles.](/img/terraform/activate-email.png)

## Email domain customization

Use a custom domain for emails sent from Okta instead of [noreply@okta.com](mailto:noreply@okta.com), which is the default email address.

Okta polls your custom domain once daily to confirm its operational status. If the poll fails, Okta alerts the super administrators by email. It also starts using [noreply@okta.com](mailto:noreply@okta.com) until the issue is resolved.

Okta recommends that your domain implement the [Sender Policy Framework (SPF) ](https://tools.ietf.org/html/rfc7208)to prevent sender address forgery. If you have already implemented SPF in your custom domain, update the SPF record to include Okta's mail servers.

To set up an email domain in Terraform, follow these high-level steps: create a domain object, update DNS records, and request Okta verify the DNS record changes.

Okta sends a confirmation email to your super administrators once your custom email domain is configured and working.

There are two limitations to email domain customization:

* Okta can't send an email from a domain that uses [SendGrid.](https://sendgrid.com/) You can configure a subdomain with your DNS provider for custom Okta emails.

* There's a maximum of DNS lookups in an SPF record.

To set up an email domain, follow the steps in the following sections.

### Create an email domain resource

1. Create an [email_domain](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/email_domain) resource. Set the `brand_id` to your brand's ID. For multibrand customization, set the `brand_id` argument to the ID for the brand to associate with the new email domain.

    ```hcl
    data "okta_brands" "test" {
    }

    resource "okta_email_domain" "mymail" {
      brand_id     = tolist(data.okta_brands.test.brands)[0].id
      domain       = "mail.example.com"
      display_name = "mymail"
      user_name    = "admin"
    }
    ```

1. Use `terraform plan` and `terraform apply` to deploy the custom domain to Okta. At this point, Okta knows the name of your custom domain but has not verified that you control its DNS records, so as a security precaution, you cannot yet use it with Okta.

1. Add this `output` block to print the set of required DNS records, which you can get from the email domain resource after it's created on the Okta server.

    ```hcl
    output email_dns_records_to_update_company1 {
      value = okta_email_domain.mymail.dns_validation_records
    }
    ```

1. Run `terraform apply`.

1. Review the output for your `output` block. Save this information to another file for your records. The output in your console looks similar to the following. For each array element, the `record_type` field indicates the type of DNS record and what fields to set. There will be one `TXT` record and three `CNAME` records.

    ```hcl
    email_dns_records_to_update_company1 = tolist([
      {
        "expiration" = ""
        "fqdn" = "_oktaverification.mail.example.com"
        "record_type" = "TXT"
        "value" = "9da4ac4cb6ca4bb3b78934f91ed4c60b"
      },
      {
        "expiration" = ""
        "fqdn" = "mail.mail.example.com"
        "record_type" = "cname"
        "value" = "u17770251.wl002.sendgrid.net"
      },
      {
        "expiration" = ""
        "fqdn" = "p03._domainkey.mail.example.com"
        "record_type" = "cname"
        "value" = "p03.domainkey.u17770251.wl002.sendgrid.net"
      },
      {
        "expiration" = ""
        "fqdn" = "p032._domainkey.mail.example.com"
        "record_type" = "cname"
        "value" = "p032.domainkey.u17770251.wl002.sendgrid.net"
      },
    ])
    ```

### Update your domain with new CNAME and TXT records

1. In your domain provider for your custom domain, create the four CNAME and TXT records based on the output saved in the last step of [Create an email domain resource](#create-an-email-domain-resource).

1. If your domain provider supports a Terraform provider, you can also automate this in your configuration. See your domain service provider's documentation for their Terraform syntax. The following example describes how to do this manually.

1. Add the SPF record to your DNS zone (the root domain). An SPF record specifies the mail servers authorized by your organization to send mail from your domain. If your root domain already has an SPF record, the following update can prevent spoofers from sending mail that mimics your domain. For example, if you only send mail from Microsoft Office 365, your SPF record has an include statement similar to:

    ```
    example.com TXT    v=spf1 include:spf.protection.outlook.com -all
    ```

   You must add another include statement that specifies your email domain. In the previous example, that would be `mail.example.com`.  If you combine the new include statement with the previous SPF example, it looks similar to this:

    ```
    example.com TXT    v=spf1 include:mail.example.com include:spf.protection.outlook.com -all
    ```

1. Wait until the DNS records propagate.

    > **Important:** DNS records could take as little as 15 minutes to propagate but may take up to 24 hours. Return to this section and confirm your settings if your DNS changes don't appear within 24 hours. Use a tool like [Dig](https://toolbox.googleapps.com/apps/dig/) to check your DNS records.

### Request email domain verification

1. Add a new email domain verification resource that references your `email_domain_id` object:

    ```hcl
    resource "okta_email_domain_verification" "example" {
      email_domain_id = okta_email_domain.mymail.id
    }```

1. Run `terraform apply`.

Wait up to 15 minutes for the Okta server to verify the DNS changes. If the terraform apply command fails (if it times out), wait a few minutes and try again.

### Test your email domain

Test your email domain integration by triggering an Okta email. See the [reference of situations that cause emails to be sent](https://support.okta.com/help/s/article/how-when-are-the-email-sent-to-users?language=en_US).

If everything works correctly, consider commenting out the output block that extracts the set of DNS records that require changing.

## Error page content cannot be changed in Terraform

Although the color/image usage for error pages is customizable in the brand, the actual content of [error pages](/docs/guides/custom-error-pages/main/#edit-the-error-page) is unavailable to customize using Terraform.

