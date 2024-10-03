---
title: Import existing Okta objects into Terraform
excerpt: Configure a resource created without Terraform.
layout: Guides
---

Configure a resource created outside of Terraform.

---

#### Learning outcomes

* Import existing Okta objects into Terraform.

* Generate Terraform code for imported resources.

#### What you need

* Familiarity with the Terraform terms: configuration, resources, state, and commands. See the Terraform documentation [introductory concepts](https://www.terraform-best-practices.com/key-concepts). Also, see the [introduction page for Okta Terraform automation](/docs/guides/terraform-overview/main/).

* An Okta org

* A [Terraform configuration](/docs/guides/terraform-enable-org-access/main) that can access your Okta org

* Terraform 1.8.5 or later

## Overview

Your goal may be to use Terraform to manage all or most of your infrastructure. This may require managing resources that were created in the Admin Console or by some other method. You can use several techniques to import these resources into your Terraform configuration.

## Types of import

An object you create in Terraform includes default values for each field. This includes imported objects. Set the value for any fields that are different from the default.

There are different approaches to accomplishing this. This article uses the `import` block feature introduced in Terraform 1.5, instead of the older `terraform import` CLI command. Even with the `import` block, there are two strategies:

* **Minimal import:** Import an object in your Terraform configuration and set the value of any desired fields. You must also set the value of fields that differ from the Terraform provider defaults.

* **Import and generate configuration:** Generate a separate Terraform configuration with all the fields for the imported object and copy it into your main configuration. This approach enables auditing of the current state of your Okta org.

## Avoid importing user objects with Terraform

An imported Okta user object is much larger than other types of objects. A users' group memberships and app assignments add more size. In most circumstances, the best practice is to avoid importing users.

Group resources are much smaller. Importing those into your configuration enables using group names and IDs for other Terraform contexts. For example, [defining group assignments by ID for access to an Okta app](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/app_group_assignment).

## Find the ID of an existing object

To import an object, Terraform requires the Okta ID of the existing infrastructure resource. For example, if you plan to import an Okta app integration of type `okta_app_oauth`, you must find its ID before importing it.

There are several approaches to find the ID:

* Examine the URL of an Admin Console page.

* Use the REST API.

* Use some other Okta SDK.

The following subsections describe the first two approaches.

### Find an ID in an Admin Console page URL

For most object types you can navigate to their detail page in the Admin Console. The ID is in the URL for the detail page. It's a long string of alphanumeric characters that occurs before the pound (`#`) symbol.

For example, navigate to the details page for an app of type `oidc_client`. Its URL has the form:

```http
https://{yourOktaOrgDomain}/admin/app/oidc_client/client/0oaf9phym0JffFbdo1d7#tab-general
```

In this example, the ID is `0oaf9phym0JffFbdo1d7`.

> **Important:** Don't use the ID in the URL for policy rules and networks, even when you're editing them. It's the ID of the parent object, not the individual rule. You must use the Okta REST API SDK to find the ID for these object types. See [Find an ID with the REST API](#find-an-id-with-the-rest-api).

Some imported Okta objects are represented by only a single instance, such as health insights and general settings. These singletons don't have an associated ID. To import these objects, specify the fake ID `singleton`, the period (`.`) symbol, or an underscore (`_`) instead of a regular ID.

> **Note:** You can't import the object for Okta feature settings into Terraform.

### Find an ID with the REST API

You can also find IDs by using the core Okta API. This method enables you to write code to automate the import of many Okta objects. You must use the REST API to find the ID for policy rules or networks.

1. Review the [core Okta API](https://developer.okta.com/docs/api/) for the desired resource type.

1. Use the `LIST` operation for each resource type endpoint to return a list of those objects. The IDs are in the JSON response.

For example, this call requests a list of Okta apps:

```bash
curl -v -X GET \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "Authorization: SSWS ${api_token}" \
  https://{yourOktaDomain}/api/v1/apps
```

The return value is an array of JSON objects, one for each app. This example shows an app object (though not the enclosing array):

```json
{
  "id": "0oa1gjh63g214q0Hq0g4",
  "name": "myapp",
  "label": "Custom Saml 2.0 App",
  "status": "ACTIVE",
  "lastUpdated": "2016-08-09T20:12:19.000Z",
  "created": "2016-08-09T20:12:19.000Z",
  "accessibility": {
  "selfService": false,
  "errorRedirectUrl": null,
  "loginRedirectUrl": null
}
```

Use the `name` field to find the desired object. The `id` fields contains the ID of the object.

## Minimal import

The simplest method is to import an object into a separate file and then copy it into your configuration:

1. Identify the existing infrastructure that you want to import.

1. Find the Okta ID for each imported object. See [Find the ID of an existing object](#find-the-id-of-an-existing-object).

1. Add a Terraform resource for each object.

1. Add `import` blocks that specify each resource type, ID, and the name of the Terraform resource. See [the Terraform documentation](https://developer.hashicorp.com/terraform/tutorials/state/state-import).

For example, to import an OAuth 2.0 app integration object:

1. Find the existing resource's type and name. This example imports a resource named `AppCreatedInUI` of type `okta_app_oauth`. These are used as part of creating the object.

1. Find the ID in the Admin Console detail URL or the OAuth 2.0 app. The ID used in this example is `0oaf9phym0JffFbdo1d7`.

1. Create a Terraform resource manually and include all required arguments. For initial testing, always use the same values as the existing resource. In this example:

    ```hcl
    resource "okta_app_oauth" "AppCreatedInUI" {
      label = "AppCreatedInUI"
      type = "web"
    }
    ```

1. Add an `import` block. Set the `to` argument to reference your new resource. Set the ID for the existing object in the `id` argument. For example:

    ```hcl
    import {
      id = "0oaf9phym0JffFbdo1d7"
      to = okta_app_oauth.AppCreatedInUI
    }
    ```

    If the object is a singleton with no ID, set `id` to one of `singleton`, a period (`.`) symbol, or an underscore (`_`).

1. Run `terraform plan`.

1. Carefully review all the output for any fields that Terraform identified as changed. Look for the characters at the start of each line that indicate a field that was added (`+`), removed (`-`), or changed (`~`).

    The right-arrow characters (`->`) identify values that Terraform will change on the remote server. For example, the following line indicates that the remote server uses issuer mode `DYNAMIC`, but your configuration indicates that it should be changed to `ORG_URL`.

    ```hcl
    issuer_mode  = "DYNAMIC" -> "ORG_URL"
    ```

    Fields in the output may contain values that you don't expect. One possibility is that the field was changed from the default value in the Admin Console or other automation tool. Another is that the default field value set in the Admin Console or other tool differs from the one used in the Okta Terraform provider. You can find the default values for the Okta Terraform provider in the [Okta provider documentation](https://registry.terraform.io/providers/okta/okta/latest/docs/).

1. Modify the values for fields in your configuration to match those on the server. You may need to add multiple resource arguments to ensure that your local configuration matches the server:

    ```hcl
    resource "okta_app_oauth" "AppCreatedInUI" {
      label = "AppCreatedInUI"
      type = "web"
      issuer_mode = "DYNAMIC"
      response_types = ["code"]
      redirect_uris = ["http://{yourOktaDomain}/authorization-code/callback"]
      consent_method = "REQUIRED"
      grant_types = ["authorization_code"]
      post_logout_redirect_uris = ["http://{yourOktaDomain}"]
    }
    ```

1. Continue to run `terraform plan` and make minor changes until there are no changed values in the output for the `import` command.

    > **Important:** Skipping this step can cause unexpected changes that may reduce the reliability and security of your org.

1. Run `terraform apply`.

## Import the generated configuration

If a resource defined in an import block doesn't already exist in your configuration, Terraform can generate the [code in the HCL syntax](https://developer.hashicorp.com/terraform/language/syntax/configuration). For complete instructions, [see the Terraform documentation](https://developer.hashicorp.com/terraform/language/import/generating-configuration).

To generate the code, include the `-generate-config-out={newConfigurationFile}` option when you run `terraform plan`. For example:
```sh
terraform plan -generate-config-out=generated_resources.tf
```

> **Important:** `{newConfigurationFile}` must be a new file path. Terraform throws an error if you specify an existing file.

To generate and import an object, follow these steps:

1. Identify the desired objects for importing into your configuration.

1. Find and note down the Okta IDs for each imported object. See [Find the ID of an existing object](#find-the-id-of-an-existing-object).

1. Define an `import` block for the resources in your configuration.

1. Run `terraform plan` with the `-generate-config-out=<filename>` flag.

1. Copy the generated code into your configuration.

1. Prune the generated configuration to include only the required arguments.

1. Fix raw full IDs that reference other declared objects to use a more maintainable syntax instead. Usually this is using the object name.

1. Run `terraform plan` to confirm no changes to the remote server.

1. Run `terraform apply` to bring the resource into your Terraform state file.

For example, to import an OAuth 2.0 app integration object:

1. Find the existing resource's type and name. This example imports a resource named `AppCreatedInUI` of type `okta_app_oauth`. These are used as part of creating the object.

1. Find the ID in the Admin Console detail URL or the OAuth 2.0 app. The ID used in this example is `0oaf9phym0JffFbdo1d7`.

1. Add an `import` block. Set the `to` argument to reference your new resource. Set the ID for the existing object in the `id` argument. For example:

    ```hcl
    import {
      id = "0oaf9phym0JffFbdo1d7"
      to = okta_app_oauth.AppCreatedInUI
    }
    ```

    If the object is a singleton with no ID, set `id` to one of `singleton`, a period (`.`) symbol, or an underscore (`_`).

1. Run this `terraform plan` to generate an output file with the imported resources:

    ```sh
    terraform plan -generate-config-out=generated_resources.tf
    ```

1. Review the generated code in the `generated_resources.tf` file.

    The output may be quite extensive with values for all fields, This may include fields that match the Terraform provider default values for optional fields.

    ```hcl
    # Review these resources and move them into your main configuration files.

    # __generated__ by Terraform from "0oaf9ssdg32FqXwNN1d7"
    resource "okta_app_oauth" "AppCreatedInUI" {
      accessibility_error_redirect_url = null
      accessibility_login_redirect_url = null
      accessibility_self_service       = false
      admin_note                       = null
      app_links_json = jsonencode({
        oidc_client_link = true
      })
      app_settings_json              = jsonencode({})
      authentication_policy          = "rste7a3fcyoGpHRAu1d7"
      auto_key_rotation              = true
      auto_submit_toolbar            = false
      client_basic_secret            = null # sensitive
      client_id                      = "0oaf9ssdg32FqXwNN1d7"
      client_uri                     = null
      consent_method                 = "REQUIRED"
      enduser_note                   = null
      grant_types                    = ["authorization_code"]
      hide_ios                       = true
      hide_web                       = true
      implicit_assignment            = false
      issuer_mode                    = "DYNAMIC"
      jwks_uri                       = null
      label                          = "AppCreatedInUI"
      login_mode                     = "DISABLED"
      login_scopes                   = []
      login_uri                      = null
      logo                           = null
      logo_uri                       = null
      omit_secret                    = null
      pkce_required                  = false
      policy_uri                     = null
      post_logout_redirect_uris      = ["http://{yourOktaDomain}"]
      profile                        = null
      redirect_uris                  = ["http://{yourOktaDomain}/authorization-code/callback"]
      refresh_token_leeway           = null
      refresh_token_rotation         = null
      response_types                 = ["code"]
      status                         = "ACTIVE"
      token_endpoint_auth_method     = "client_secret_basic"
      tos_uri                        = null
      type                           = "web"
      user_name_template             = "$${source.login}"
      user_name_template_push_status = null
      user_name_template_suffix      = null
      user_name_template_type        = "BUILT_IN"
      wildcard_redirect              = "DISABLED"
    }
    ```

1. Delete optional fields that are set to the Terraform provider defaults.

1. Change fields that use a raw ID to reference another object to the name of the desired object. This update increases maintainability.

    For example, suppose an object has an ID field such as:

    ```hcl
    policy_id = "a786sdfas675f57asdf5s6"
    ```

    Change the raw ID to reference the object by name:

    ```hcl
    policy_id = okta_policy.my_policy.id
    ```

1. Copy the modified code into your configuration.

1. Delete the `generated_resources.tf` file so you don't duplicate the generated resources.

1. Run `terraform plan` and review all the output for any fields that Terraform identified as changed. Look for the `+` (added), `-` (removed), or `~` (changed) characters at the beginning of each line.

    Review your configuration for all unexpected added, removed, or updated fields
    and modify it to match the state of the remote server.

1. Continue to run `terraform plan` and make minor changes until the console indicates no fields changed in the new object.

    > **Important:** Skipping this step can cause unexpected changes that may reduce the reliability and security of your org.

1. Run `terraform apply`.

