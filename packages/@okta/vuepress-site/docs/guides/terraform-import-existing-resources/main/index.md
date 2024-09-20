---
title: Import existing Okta objects into Terraform
excerpt: Configure a resource created without Terraform
layout: Guides
---

Configure a resource created outside of Terraform.

---

#### Learning outcomes

* Import existing Okta objects into Terraform.

* Generate Terraform code for imported resources.

#### What you need

* Familiarity with the Terraform terms: configuration, resources, state, and commands. For more information, see the [Terraform overview](/docs/guides/terraform-overview).

* An Okta organization.

* A [Terraform configuration](/docs/guides/terraform-enable-org-access/main) that can access your Okta org.

* Terraform 1.8.5 or later.

## Overview

It is easiest to manage Okta resources from Terraform if you fully manage the lifecycle of resources from Terraform. However, in some cases, your Okta org may have resources created in the admin console or with other automation tools. You can use several techniques to import these resources into a Terraform configuration.

## What does import mean?

Terraform supports managing existing infrastructure. Importing resources into Terraform allows you to manage your infrastructure using a consistent workflow.

An object you create in Terraform includes default values for each field. Imported objects may have values that are different from the default. To start managing the imported object, you first must determine and set the current state.

There are different approaches to accomplishing this. This article uses the `import` block feature introduced in Terraform 1.5, instead of the older `terraform import` CLI command. Even with the `import` block, there are two strategies that you can choose from.

* **Minimal import:** Import an object in your Terraform configuration and set the value of any desired fields. You must also set the value of fields that differ from the Terraform provider defaults.

* **Import and generate configuration:** Generate a separate Terraform configuration with all the fields for the imported object and copy it into your main configuration. This approach enables auditing the current state of your Okta org.

## Avoid importing user objects with Terraform

An imported Okta user object is much larger than other types of objects. The users' group memberships and app assignments add more size. In most circumstances, the best practice is to avoid importing users.

Group resources are much smaller. Importing those into your configuration lets you use group names and IDs for other Terraform contexts. For example, [defining group assignments by ID for access to an Okta application](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/app_group_assignment).

## Find the ID of an existing object

To import an object, Terraform requires the Okta ID of the existing infrastructure resource. For example, if you plan to import an Okta application integration of type `okta_app_oauth`, you must find its ID before importing it.

There are several approaches to find the ID:

* Find the ID from the URL of an admin console page.

* Find the ID with the REST API.

* Find the ID using some other Okta SDK.

The following subsections describe the first two approaches.

### Find an ID in an admin console page URL

For most types of objects, you can get their ID by using the Okta admin console, navigating to the resource's detail page, and extracting the ID from the URL. The ID is a long string of alphanumeric characters before the `#` symbol.

For example, navigate to the details page for an app of type `oidc_client`. Its URL has the form:

```http
https://{domain}/admin/app/oidc_client/client/0oaf9phym0JffFbdo1d7#tab-general
```

In this example, the ID is `0oaf9phym0JffFbdo1d7`.

This technique does **not** work for policy rules or networks. In those cases, the URL contains the ID for the parent object but not the individual rule, even if it's being edited. You must use the Okta REST API SDK to get the ID for these object types. See, [Find an ID with the REST API](#find-an-id-with-the-rest-api).

Some imported Okta objects are represented by only a single instance, such as the health insights and general settings. These singletons don't have an associated ID. To import these objects, specify the fake ID `singleton`, the period (`.`) symbol, or an underscore (`_`) instead of a regular ID.

Note that the object for Okta feature settings can't be imported into Terraform.

### Find an ID with the REST API

You can also find IDs by using the Okta Core REST API. Using the REST API instead of the admin console to get the IDs may be preferable if you have many Okta objects to import using automation. You must use the REST API approach if you need to import policy rules or networks that don't expose their IDs in the URLs in the admin console.

1. Review the [Okta Core REST API](/docs/reference/) for the desired resource type.

1. Use the `LIST` operation for each resource type REST API endpoint to get a list of those objects, from which you can extract the relevant IDs from the JSON response.

For example, to get the list of Okta apps:

```curl
curl -v -X GET \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "Authorization: SSWS ${api_token}" \
  [https://${yourOktaDomain}/api/v1/apps](https://${yourOktaDomain}/api/v1/apps)
```

This is an example of the return value from the API:

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

Use the name field to confirm which object it is. When you find it, copy the value of the `id` field to use as the object's ID.

## Minimal import

The simplest import approach involves the following steps:

1. Identify the existing infrastructure you want to import.

1. Find the Okta ID for each imported objects. See [Find the ID of an existing object](#find-the-id-of-an-existing-object).

1. Add a Terraform resource for each object.

1. Add `import` blocks that specify each resource type, ID, and the name of the Terraform resource. See [the Terraform documentation](https://developer.hashicorp.com/terraform/tutorials/state/state-import) for details.

For example, to import an OAuth app integration object:

1. Identify the existing resource's type and name. This example imports an `okta_app_oauth` resource with the name `AppCreatedInUI`.

1. Follow the instructions in [Find the ID of an existing object](#find-the-id-of-an-existing-object). You can extract the ID from the URL using the admin console approach. In this example, the ID is `0oaf9phym0JffFbdo1d7`.

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

    In the rare case that you are using an Okta settings object with no ID because there is only one of them, just specify the ID as the fake ID `singleton`, the period (`.`) symbol, or an underscore (`_`).

1. Run `terraform plan`.

1. Carefully review all the output for any fields that Terraform identified as changed. Look for the characters at the start of each line that indicate added (`+`), removed (`-`), or changed (`~`) fields.

    The right-arrow characters (`->`) identify values that Terraform will change on the remote. For example, the following line indicates that the remote server uses issuer mode `DYNAMIC`, but your configuration indicates that it should be changed to `ORG_URL`.

    ```hcl
    issuer_mode  = "DYNAMIC" -> "ORG_URL"
    ```

    The problem may be that a field was changed in the admin console or other automation tool, so it no longer has the default value. It's also possible that the default field value when using the admin console or other tools differs from the same value used in the Okta Terraform provider. Review the [Okta provider documentation](https://registry.terraform.io/providers/okta/okta/latest/docs/) as needed.

    Modify your configuration to match the remote server for all unexpected added, removed, or updated fields. You might need to add multiple resource arguments to ensure that your local configuration matches the server:

    ```hcl
    resource "okta_app_oauth" "AppCreatedInUI" {
      label = "AppCreatedInUI"
      type = "web"
      issuer_mode = "DYNAMIC"
      response_types = ["code"]
      redirect_uris = ["http://localhost:8080/authorization-code/callback"]
      consent_method = "REQUIRED"
      grant_types = ["authorization_code"]
      post_logout_redirect_uris = ["http://localhost:8080"]
    }
    ```

1. Continue to run `terraform plan` and make minor changes until there are no changed values in the output for the `import` command.

    > **Important:** Skipping this step can cause unexpected changes that may reduce the reliability and security of your org.

1. Run `terraform apply`.

## Import the generated configuration

Terraform can generate Terraform configuration code for the resources you define in import blocks that do not already exist in your configuration. Terraform produces [code in the HCL syntax](https://developer.hashicorp.com/terraform/language/syntax/configuration) that is Terraform's best guess at the appropriate value for each resource argument to match the remote configuration.

For complete instructions, [see the Terraform documentation](https://developer.hashicorp.com/terraform/language/import/generating-configuration).

You must include the `-generate-config-out={newConfigurationFile}` option when you run `terraform plan`. For example:

```sh
terraform plan -generate-config-out=generated_resources.tf
```

> **Important:** `{newConfigurationFile}` must be a new file path. Terraform throws an error if you specify an existing file.

This technique involves the following steps:

1. Identify the existing infrastructure you will import.

1. Get the Okta IDs for all imported objects. See [Find the ID of an existing object](#find-the-id-of-an-existing-object).

1. Define an `import` block for the resources.

1. Run `terraform plan` with the `-generate-config-out=<filename>` flag.

1. Copy the generated code to your configuration.

1. Prune the generated configuration to include only the required arguments.

1. Fix raw full IDs that reference other declared objects to use a more maintainable syntax instead.

1. Run `terraform plan` to confirm no changes to the remote server.

1. Run `terraform apply` to bring the resource into your Terraform state file.

For example, to import an OAuth app integration object:

1. Identify the existing resource's type and name. This example imports an `okta_app_oauth` resource with the name `AppCreatedInUI`.

1. Follow the instructions in [Find the ID of an existing object](#find-the-id-of-an-existing-object). You can extract the ID from the URL using the admin console approach. In this example, it is `0oaf9phym0JffFbdo1d7`.

1. Add an `import` block. Set the `to` argument to reference your new resource. Choose an appropriate name for the resource even though this Terraform resource does not yet exist. Set the ID for the existing object in the `id` argument. For example:

    ```hcl
    import {
      id = "0oaf9phym0JffFbdo1d7"
      to = okta_app_oauth.AppCreatedInUI
    }
    ```

    In the rare case that you are using an Okta settings object with no ID because there is only one of them, just specify the fake ID `singleton`, the period (`.`) symbol, or an underscore (`_`).

1. Run this command:

    ```sh
    terraform plan -generate-config-out=generated_resources.tf
    ```

1. Review the generated code in the `generated_resources.tf` file.

    You might notice that it is verbose and includes all fields, including ones that match the Terraform provider default values for optional fields.

    ```hcl
    # Please review these resources and move them into your main configuration files.

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
      post_logout_redirect_uris      = ["http://localhost:8080"]
      profile                        = null
      redirect_uris                  = ["http://localhost:8080/authorization-code/callback"]
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

1. Trim the generated code to **omit** optional fields using the Terraform provider defaults.

1. Change fields that use a raw ID to reference another object to increase maintainability. Set them to the name of the desired object.

    For example, suppose an object has an ID field such as:

    ```hcl
    policy_id = "a786sdfas675f57asdf5s6"
    ```

    Change the raw ID to reference the object by name:

    ```hcl
    policy_id = okta_policy.my_policy.id
    ```

1. Move the generated code where you defined the import command.

1. Delete the `generated_resources.tf` file so you do not duplicate the generated resources.

1. Run `terraform plan` and review all the output for any fields that Terraform identified as changed. Look for the `+` (added), `-` (removed), or `~` (changed) characters at the beginning of each line.

    Because Terraform got the state information from the remote server, there should be no changes. Review your configuration and modify it to match the remote server state for all unexpected added, removed, or updated fields.

1. Continue to run `terraform plan` and make minor changes until the console indicates no fields changed in the new object.

    > **Important:** Skipping this step can cause unexpected changes that may reduce the reliability and security of your org.

1. Run `terraform apply`.

