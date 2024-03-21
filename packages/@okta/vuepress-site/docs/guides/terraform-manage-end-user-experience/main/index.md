---
title: Customize the end-user experience with Terraform
excerpt: Edit email templates and change the appearance of your sign-in pages and Okta End-User Dashboard with Terraform.
layout: Guides
---

Edit email templates and change the appearance of your sign-in pages and Okta End-User Dashboard with Terraform.

---

#### Learning outcomes

* Import the Okta objects that control color, logos, and page styling into your Terraform configuration.
* Change the appearance of sign-in pages, error pages, and the Okta End-User Dashboard for your end users, including color, logos, and page styling.
* Customize the content, layout, logos, colors, fonts, and languages of email templates for your org.

#### What you need

* Familiarity with the Terraform terms: configuration, resources, state, and commands. See [Terraform overview](/docs/guides/terraform-overview).
* An [Okta Developer Edition organization](https://developer.okta.com/signup) or an Okta Identity Engine organization
* A Terraform configuration that can access your Okta org. See [Enable Terraform access to your Okta org](/docs/guides/terraform-enable-org-access).

## Overview

The Okta Brands feature enables customizing parts of the end-user experience for your org. This includes the colors and images on your Okta sign-in pages, error pages, and Okta End-User Dashboard. It also includes customizing email templates in multiple languages.

To customize the appearance of your org with Terraform, you must first import existing brand and theme objects into your configuration from your org. Then, you can edit the values in your configuration to change the colors, logos, and other visual aspects of your org.

See [Brands](https://developer.okta.com/docs/concepts/brands/).

## Import brand and theme objects to Terraform

To change how Okta appears to your end users on their sign-in pages and emails, create brand and theme objects in the Admin Console. Manage these objects with Terraform by importing them into your configuration.

There are two methods to import objects into your Terraform configuration:

* Use Terraform `import` blocks to import Okta objects and automatically generate the corresponding resources in your Terraform configuration.
* Import Okta objects using the Terraform `import` command and manually add the corresponding resources to your Terraform configuration.

## Import objects and automatically add them to your configuration

Use `import` blocks in your Terraform script to import existing brand and theme objects from your Okta org. This method adds existing resources to your Terraform state file and generates a corresponding resource block in your configuration with auto-filled argument values. Using Terraform to generate the resource blocks for imported resources simplifies the process and reduces the risk of accidental changes to your org.

> **Note:** The `import` block and configuration generation are experimental Terraform features at the time that this article is published. Check the Terraform documentation for updated instructions and limitations. See [Import](https://developer.hashicorp.com/terraform/language/import) in the Terraform documentation.

This example imports the existing default brand object and its associated theme object using `import` blocks. Importing objects into Terraform requires their respective IDs. First, use data sources to expose the IDs of the default brand and theme objects in your Terraform configuration:

1. In your `main.tf` Terraform configuration file, add an `okta_brands` data source. This data source gets a list of existing brands in your org.

    ```hcl
    data "okta_brands" "all_brands" {}
    ```

1. Add an `okta_brand` data source to retrieve the default brand from the list of brands.

   > **Note:** The default brand might not be the first in the list. Confirm the ID of the brand in your Admin Console: Go to **Customizations** > **Brands** and select the default brand. The brand ID is at the end of the URL for this page.

    ```hcl
    data "okta_brand" "data_default_brand" {
      brand_id = tolist(data.okta_brands.all_brands.brands)[0].id
    }
    ```

1. Add an `okta_themes` data source to get a list of existing themes associated with the default brand.

    ```hcl
    data "okta_themes" "data_list_themes" {
      brand_id = data.okta_brand.data_default_brand.id
    }
    ```

1. Add an `okta_theme` data source to get the theme ID of the default brand.

    ```hcl
    data "okta_theme" "data_default_brand_theme" {
      brand_id = data.okta_brand.data_default_brand.id
      theme_id = tolist(data.okta_themes.data_list_themes.themes)[0].id
    }
    ```

Run your configuration, and use Terraform commands to get the IDs of the default brand and theme objects:

1. In a terminal, go to your Terraform configuration directory.
1. Run `terraform init` to initialize your configuration directory and to confirm that you’ve downloaded all required providers and modules.
1. Run `terraform plan` to confirm that there are no planned changes. Adding data sources to your configuration doesn’t add, change, or destroy existing resources. If there are planned changes, see [Reduce automatic corrections to objects](/docs/guides/terraform-design-rate-limits/main/#reduce-automatic-corrections-to-objects).
1. Run `terraform apply` and enter `yes` when prompted.
1. Run `terraform show` to find the IDs of the default brand and its associated theme.

   * Search for `data_default_brand` to find the data source for the default brand. The `id` argument contains the default brand ID.
   * Search for `data_default_brand_theme` to find the data source for the default theme. The `id` argument contains the theme ID for the default brand.

Use the IDs of the default brand and its associated theme to prepare your configuration for importing the resources:

1. Create a configuration file called `import.tf` in your Terraform configuration directory.
1. In the `import.tf` configuration file, add an `import` block that imports the default brand. Use the ID of the `data_default_brand` data source in the `id` argument.

    ```hcl
    import {
      to = okta_theme.resource_default_brand
      id = "${default_brand_id}"
    }
    ```

1. Add another `import` block to import the theme for the default brand. Use the ID of the `data_default_brand_theme` data source in the `id` argument.

    ```hcl
    import {
      to = okta_theme.resource_default_theme
      id = "${default_brand_id}/${default_theme_id}"
    }
    ```

Import the default brand and its theme to your state file and generate the resource blocks in a separate configuration file:

1. In a terminal, go to your Terraform configuration directory.
1. Run `terraform plan -generate-config-out=”generated_brand.tf”`. This command generates a configuration file called `generated_brand.tf` that contains the imported resource blocks. The plan includes **2 to import** for the default brand and theme resources.
1. Run `terraform apply` to import the default brand and theme into your state file.
1. Run `terraform show` to examine your state file. Search for `okta_brand.resource_default_brand` and `okta_theme.resource_default_theme` to confirm that Terraform successfully imported the two resources.

> **Note:** After you import your resources, you can delete the `import.tf` file or leave it in the configuration as a record of importing the resources.

This example imports only the default brand and its associated theme. You can use the same steps to import other existing brands, themes, email customizations, and more into your Terraform configuration.

## Import objects and manually add them to your configuration

Import brand and theme objects to your Terraform state file using the `terraform import` command.

This method requires that you manually create corresponding brand and theme resources in your configuration. Provide values for the arguments in these resources that reflect the current state of the objects in your Okta org. If you provide values that are different from the current state, Terraform updates the objects in Okta with the values in your configuration.

This example imports the default brand and theme objects into your configuration using the `terraform import` command.  Importing objects into Terraform requires their respective IDs. First, use data sources to get the IDs of the default brand and its associated theme:

1. In your `main.tf` Terraform configuration file, add an `okta_brands` data source. This data source gets a list of existing brands in your org.

     ```hcl
     data "okta_brands" "all_brands" {}
     ```

1. Add an `okta_brand` data source to retrieve the default brand from the list of brands.

   > **Note:** The default brand might not be the first in the list. Confirm the brand ID in your Admin Console: Go to **Customizations** > **Brands** and select the default brand. The brand ID is at the end of the URL for this page.

    ```hcl
    data "okta_brand" "data_default_brand" {
      brand_id = tolist(data.okta_brands.all_brands.brands)[0].id
    }
    ```

1. Add an `okta_themes` data source to get a list of existing themes associated with the default brand.

    ```hcl
    data "okta_themes" "data_list_themes" {
      brand_id = data.okta_brand.data_default_brand.id
    }
    ```

1. Add an `okta_theme` data source to get the theme ID of the default brand.

    ```hcl
    data "okta_theme" "data_default_brand_theme" {
      brand_id = data.okta_brand.data_default_brand.id
      theme_id = tolist(data.okta_themes.data_list_themes.themes)[0].id
    }
    ```

Run your configuration and use Terraform commands to get the IDs of the default brand and theme objects:

1. In a terminal, go to your Terraform configuration directory.
1. Run `terraform init` to initialize your configuration directory and to confirm that you’ve downloaded all required providers and modules.
1. Run `terraform plan` to confirm that there are no planned changes. Adding data sources to your configuration doesn’t add, change, or destroy existing resources. If there are planned changes, see [Reduce automatic corrections to objects](/docs/guides/terraform-design-rate-limits/main/#reduce-automatic-corrections-to-objects).
1. Run `terraform apply` and enter `yes` when prompted.
1. Run `terraform show` to find the IDs of the default brand and its associated theme.

   * Search for `data_default_brand` to find the data source for the default brand. The `id` argument contains the default brand ID.
   * Search for `data_default_brand_theme` to find the data source for the default theme. The `id` argument contains the theme ID for the default brand.

Add `okta_brand` and `okta_theme` resources to your configuration before you import the existing resources:

1. In your `main.tf` configuration file, add an `okta_brand` resource. This resource represents the existing default brand after you import it in later steps.

   > **Note:** Provide values for the arguments that match the existing state of the brand in your org. If you provide values that are different from the existing state in your org, Terraform updates the brand object in your org when you import the brand. This includes `null` values.

    ```hcl
    resource "okta_brand" "resource_default_brand" {
      agree_to_custom_privacy_policy = null
      custom_privacy_policy_url = null
      remove_powered_by_okta = false
    }
    ```

1. Add an `okta_theme` resource that represents the existing theme for the default brand. Set `brand_id` to the ID of the `resource_default_brand` resource that you added in the previous step.

    ```hcl
    resource "okta_theme" "resource_default_brand_theme" {
      brand_id = okta_brand.manual_default_brand.id
      logo = "${path_to_your_logo}"
      favicon = "${path_to_your_favicon}"
      background_image = "${path_to_your_background_image}"
      primary_color_hex = "#1662dd"
      secondary_color_hex = "#ebebed"
      sign_in_page_touch_point_variant = "OKTA_DEFAULT"
      end_user_dashboard_touch_point_variant = "OKTA_DEFAULT"
      error_page_touch_point_variant = "OKTA_DEFAULT"
      email_template_touch_point_variant = "OKTA_DEFAULT"
    }
    ```

Import the default brand and its associated theme into your Terraform state file using the `terraform import` command:

1. In a terminal, go to your Terraform configuration directory.
1. Run `terraform import okta_brand.resource_default_brand "${default_brand_id}"` to import the default brand.
1. Run `terraform import okta_theme.resource_default_brand_theme "${default_brand_id}/${default_theme_id}" to import the theme for the default brand.

## Customize the appearance of your org

Change the colors, logo, and background image of your sign-in page, Okta End User Dashboard, and error pages. Use the `okta_brand` and `okta_theme` resources that you imported into your Terraform configuration.

To customize the appearance of your org:

1. Modify the argument values in the `okta_brand` resource.

   * Set `agree_to_custom_privacy_policy` to `true` and `custom_privacy_policy_url` to use your own privacy policy in the footer of your Okta pages. This replaces the default private policy link.
   * Set `remove_powered_by_okta` to `true` to remove “Powered by Okta” from the sign-in page.

    ```hcl
    resource "okta_brand" "resource_default_brand" {
      agree_to_custom_privacy_policy = true
      custom_privacy_policy_url = "${private_policy_url}"
      remove_powered_by_okta = true
    }
    ```

1. Modify the argument values in the `okta_theme` resource.

   * Set `logo`, `favicon`, and `background_image` to the path of the images that you want to use for your org.
   * Set `primary_color_hex` and `secondary_color_hex` to the hex values of the colors that you want to use for your org.
   * Set `sign_in_page_touch_point_variant`, `end_user_dashboard_touch_point_variant`, `error_page_touch_point_variant`, and `email_template_touch_point_variant` to the different possible variants. For information about the variants, see the `okta_theme` [resource](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/theme).

    ```hcl
    resource "okta_theme" "resource_default_brand_theme" {
      brand_id = okta_brand.manual_default_brand.id
      logo = "${path_to_your_logo}"
      favicon = "${path_to_your_favicon}"
      background_image = "${path_to_your_background_image}"
      primary_color_hex = "#1882ff"
      secondary_color_hex = "#ababad"
      sign_in_page_touch_point_variant = "BACKGROUND_IMAGE"
      end_user_dashboard_touch_point_variant = "FULL_THEME"
      error_page_touch_point_variant = "BACKGROUND_IMAGE"
      email_template_touch_point_variant = "FULL_THEME"
    }
    ```

## Customize email templates

Edit the subject and body of the email templates in your org. Okta uses email templates to send end users automated emails for various reasons, such as end-user account activation and forgotten password. See [Customize email notifications](https://developer.okta.com/docs/guides/custom-email/main/#about-email-customization).

Each brand object in your org has a set of associated email templates. You can create customizations for a given email template using the `okta_email_customization` resource. You can also modify existing customizations by first importing them using the same techniques described in [Import brand and theme objects to Terraform](#import-brand-and-theme-objects-to-terraform).

Separate email customizations for a given email template represent different languages. Set the `language` argument for an email customization to one of the [supported languages](/docs/reference/api/brands/#supported-languages). An email template can have only one customization for each language.

This example creates a default English email customization and a secondary Spanish customization for the User Activation email template:

1. In the `main.tf` configuration file, add an `okta_email_customization` resource to create the default email customization for the User Activation template.

   * Set `brand_id` to the ID you retrieved when importing the brand. See [Import brand and theme objects to Terraform](#import-brand-and-theme-objects-to-terraform).
   * Set `template_name` to `UserActivation` to edit the User Activation email template.
   * Set `language` to `en` for English.
   * Set `is_default` to `true` to set the English email customization as the default for the User Activation email template.
   * Set `subject` to `Activate your new Okta account!` or a subject that you want to use for the email.
   * Set `body` to the HTML included in the example or custom HTML that you want to use. Use heredoc syntax to use multiline HTML. See [Heredoc Strings](https://developer.hashicorp.com/terraform/language/expressions/strings#heredoc-strings) in the Terraform documentation.

   > **Note:** Use two dollar signs `$$` before any Okta variables in the HTML to escape the string interpolation in your configuration file. For example, `$${brand.theme.primaryColor}`. Otherwise with only one dollar sign `$`, Terraform tries to interpolate those variables.

    ```hcl
    resource "okta_email_customization" "user_activation_en" {
      brand_id = okta_brand.resource_default_brand.id
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
                      Your organization is using Okta to manage your web applications. This means you can conveniently access all the applications you normally use, through a single, secure home page. Watch this short video to learn more: <a href="https://www.okta.com/intro-to-okta/" style="color: #007dc1; text-decoration: none;"><span style="color: #007dc1; text-decoration: none;">https://www.okta.com/intro-to-okta/</span></a>
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
                              <td align="center" style="height: 39px; padding-top: 24px; padding-bottom: 8px;"><a id="reset-password-link" href="$${activationLink}" style="text-decoration: none;"><span style="display: block; padding: 9px 32px 7px 31px; border: 1px solid; text-align: center; cursor: pointer; color: #fff; border-radius: 3px; background-color: $${brand.theme.primaryColor}; border-color: $${brand.theme.primaryColor}; box-shadow: $${brand.theme.primaryColor} 0 1px 0;">Activate Okta Account</span></a>
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
                      If you experience difficulties accessing your account, you can send a help request to your system administrator using the link: <a href="$${baseURL}/help/login" style="color: #007dc1; text-decoration: none;"><span style="color: #007dc1; text-decoration: none;">$${baseURL}/help/login</span></a>
                  </td>
              </tr>
          </table>
        </td></tr>
        <tr>
          <td>
              <table style="width: 100%; line-height: 20px; padding: 32px;" cellpadding="0">
                  <tr>
                      <td style="font-size: 12px; padding-top: 24px; color: #999;">
                          This email was automatically sent by someone using <a href="https://www.okta.com" style="color:#616161">Okta's service</a>. Replies are not monitored or answered. Okta has no visibility over who receives these emails, and is not responsible for, and disclaims any and all liability associated with, this email's content. <br/><br/>The sender may have customized the contents of the email. If you would like to notify Okta of anything suspicious, you may report it to security@okta.com.
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

1. Add another `okta_email_customization` resource to create a second email customization for spanish-language users.

   * Set `brand_id` to the ID you retrieved when importing the brand. See [Import brand and theme objects to Terraform](#import-brand-and-theme-objects-to-terraform).
   * Set `template_name` to `UserActivation` to edit the User Activation email template.
   * Set `language` to `es` for Spanish.
   * Set `is_default` to `false`. Each email template can have one default customization.
   * Use the `depends_on` meta-argument to ensure that the Spanish email customization is created after the default English email customization. Terraform must create the default email customization first because Okta always requires a default email customization.
   * Set `subject` to `¡Bienvenido(a) a Okta!` or a subject that you want to use for the email.
   * Set `body` to the HTML included in the example or custom HTML that you want to use. Use heredoc syntax to use multiline HTML. See [Heredoc Strings](https://developer.hashicorp.com/terraform/language/expressions/strings#heredoc-strings).

    ```hcl
    resource "okta_email_customization" "user_activation_es" {
      brand_id = okta_brand.resource_default_brand.id
      template_name = "UserActivation"
      language = "es"
      is_default    = true
      depends_on = [okta_email_customization.user_activation_es]
      subject = "¡Bienvenido(a) a Okta!"
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
                        $${org.name} - ¡Bienvenido(a) a Okta!
                    </td>
                </tr>
                <tr>
                    <td style="padding-top: 24px; vertical-align: bottom;">
                        Hola $!{StringTool.escapeHtml($!{user.profile.firstName})}:
                    </td>
                </tr>
                <tr>
                    <td style="padding-top: 24px">
                        Su empresa utiliza Okta para administrar sus aplicaciones web. Esto significa que puede acceder de forma sencilla a todas las aplicaciones que utiliza normalmente mediante una única página de inicio segura. Vea este vídeo corto para obtener más información: <a href="https://www.okta.com/intro-to-okta/" style="color: #007dc1; text-decoration: none;"><span style="color: #007dc1; text-decoration: none;">https://www.okta.com/intro-to-okta/</span></a>
                    </td>
                </tr>
                <tr>
                    <td style="padding-top: 24px;">
                        Su administrador del sistema ha creado una cuenta de usuario de Okta para usted.<br/>
                        <strong>Haga clic en el siguiente enlace para activar su cuenta de Okta.</strong>
                    </td>
                </tr>
                <tr>
                    <td align="center">
                        <table border="0" cellpadding="0" cellspacing="0" valign="top">
                            <tr>
                                <td align="center" style="height: 39px; padding-top: 24px; padding-bottom: 8px;"><a id="reset-password-link" href="$${activationLink}" style="text-decoration: none;"><span style="display: block; padding: 9px 32px 7px 31px; border: 1px solid; text-align: center; cursor: pointer; color: #fff; border-radius: 3px; background-color: $${brand.theme.primaryColor}; border-color: $${brand.theme.primaryColor}; box-shadow: ${brand.theme.primaryColor} 0 1px 0;">Activar cuenta de Okta</span></a>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="color: #999;">
                                    Este enlace caduca en $${f.formatTimeDiffHoursNowInUserLocale($${org.activationTokenExpirationHours})}.
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="padding-top: 24px;">
                        Su nombre de usuario es <strong>$${user.profile.login}</strong><br/>
                        La página de inicio de su empresa es <a href="$${baseURL}" style="color: #007dc1; text-decoration: none;"><span style="color: #007dc1; text-decoration: none;">$${baseURL}</span></a>
                    </td>
                </tr>
                <tr>
                    <td style="padding-top: 24px;">
                        Si experimenta dificultades para acceder a su cuenta, puede enviar una solicitud de ayuda al administrador de su sistema mediante el siguiente enlace: <a href="$${baseURL}/help/login" style="color: #007dc1; text-decoration: none;"><span style="color: #007dc1; text-decoration: none;">$${baseURL}/help/login</span></a>
                    </td>
                </tr>
            </table>
          </td></tr>
          <tr>
            <td>
                <table style="width: 100%; line-height: 20px; padding: 32px;" cellpadding="0">
                    <tr>
                        <td style="font-size: 12px; padding-top: 24px; color: #999;">
                          Este correo electrónico fue enviado automáticamente por alguien que utiliza el <a href="https://www.okta.com" style="color:#616161">servicio de Okta</a>. Las respuestas no se monitorean ni se responden. Okta no tiene visibilidad de quién recibe estos correos electrónicos, y no es responsable de, y rechaza cualquier y toda responsabilidad asociada con, el contenido de este correo electrónico. <br/><br/>El remitente puede haber personalizado el contenido de este correo electrónico. Si desea notificar a Okta algo sospechoso, puede comunicarlo a security@okta.com.
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

1. Continue adding email customizations to the User Activation email template using supported languages.

1. Run your Terraform configuration to create the email customizations in your org.
