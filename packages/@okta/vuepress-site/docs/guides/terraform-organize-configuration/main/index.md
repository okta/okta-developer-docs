---
title: Organize your Terraform configuration
excerpt: Create and update the source files for your automation scripts to make them more secure and easier to maintain.
layout: Guides
---

Create and update the source files for your automation scripts to make them more secure and easier to maintain.

---

#### Learning outcomes

* Configure a Terraform project to automate an Okta org

* Organize your Terraform scripts based on their purpose

* Create reusable code with modules

* Store secrets securely

* Avoid problems related to configuration drift

#### What you need

* Familiarity with the Terraform terms: configuration, resources, state, and commands. See the [Terraform overview](/docs/guides/terraform-overview).

* An Okta organization.

* A [Terraform configuration](/docs/guides/terraform-enable-org-access/main) that can access your Okta org.

* An Okta user account with the Super Administrator role.

## Overview

Maintaining your Terraform configuration can become more challenging as the amount of code increases. Follow the best practices in this article to create more concise code that's easier to understand and maintain, reduces the risk of errors, and increases security.

## Organize files by resource type and purpose

To increase the maintainability of your Terraform configuration, instead of using one file, use one Terraform script file for each resource type or related purpose. For example, define device assurance policies in a file called `Devices.tf`.

Some benefits of using multiple files for your Terraform configuration are:

* **Industry best practices support maintainability.** Use Terraform industry standards to ensure your Terraform files are easy for you and others to understand and maintain.

* **Support separation by personnel role.** Team members may create and maintain different parts as the configuration becomes more complex. For example, one person may manage group membership while another updates security policies. Separating files by resource type and purpose reduces the risk of accidental changes to unrelated resources.

* **Reduce error risks.** A maintainable configuration decreases the risk of errors, which lowers the chance of security breaches or other problems.

* **Clean version control history.** Organizing your Terraform files in a version control system (such as GitHub) makes it easier to see the modification history for each resource type.

## Modularize files for reuse and maintainability

Use [Terraform resource modules](https://developer.hashicorp.com/terraform/language/modules/syntax) to group related resources and facilitate reuse. Design self-contained modules that focus on a single task or area. For example, when multiple Okta orgs use the same corporate branding assets, you can create a shared module that contains those assets. See the [Terraform article on developing modules](https://developer.hashicorp.com/terraform/language/modules/develop).

You can write one script that works in multiple places by using input and output variables. For example, a script for adding groups can use a variable for the list of group names. You can also use variables to create shared modules for different Terraform configurations. See the [Terraform article on input and output variables](https://developer.hashicorp.com/terraform/language/values/variables).

The benefits of modularized projects include:

* A shared configuration for different use cases.

* Reuse code in different contexts as part of a larger deployment architecture.

* Ensure consistency across different deployments.

* Simplify upgrades: update a module and apply changes across all instances.

Use modules for various types of use cases:

* **Separate non-Okta resources from Okta resources.** Enforce clean separation of purpose by separating files into different directories, which can improve maintainability.

* **Strategic re-use.** Consolidate configurations for different resources that contain only minor differences. Do this by creating a module that defines common resources and identical lines. Use Terraform input and output variables for the parts of the configuration that differ. For more information, see [the Terraform documentation](https://developer.hashicorp.com/terraform/language/modules/syntax).

* **Organize files based on departmental needs or security requirements.** For example, create modules for different divisions with distinct security needs, such as a default configuration module and another for HIPAA compliance.

* **Consolidate resources that use the same management API calls for efficient code.** Consolidation avoids unnecessary API calls, reducing the risk of triggering rate limits.

A module can be stored as a separate source code repository in GitHub or the Terraform Registry. Multiple configurations can use the same module without duplicating code. Reference the remote module in Terraform using its remote source URL and set any input variables:

```hcl
module "hipaa" {
  source = "git::https://github.com/myorg/tf-module-hipaa.git?ref=v1.0.0"

  # Other parameters…
  my_org_name = "foo"
  number_of_servers = 5
}
```

Consider identifying specific versions of your modules using branches or version tags. Explicit versioning reduces the risk of importing unexpected and untested changes from the remote module.

## Securely store secrets and credentials

Store credentials and other secrets securely. This section describes some best practices for handling these values.

* Use separate files for your global variables and their values. See [Organize files by resource type and purpose](#organize-files-by-resource-type-and-purpose).

* Identify sensitive fields in variable definitions with the `sensitive` keyword so that it doesn't appear in the Terraform output:

```hcl
variable "private_key" {
  description = "Client authentication information"
  sensitive = true
}
```

Note that tagging a variable as sensitive prevents you from using it in loops with the `for_each `command. For more information, see (TO BE PUBLISHED Terraform syntax tips for Okta automation/#reduce-code-duplication-with-loops).

* Don’t put secret values in a git repository or other source code control system. Anyone with access to a clone of the repository can access the secrets. To prevent saving secrets to the repository, add files that contain secrets to the git ignore file (`.gitignore`).

* Don’t store secrets in plaintext in variable values files.

    * Use key vault solutions that integrate with Terraform, such as the key vaults for each cloud provider or other key management products.

    * Define secrets in system environment variables and reference them from Terraform. Set a system environment variable in a setup script with the prefix `TF_VAR_`. For related information, see [the Terraform article on environment variables](https://developer.hashicorp.com/terraform/cli/config/environment-variables).

For example, for a variable `private_key`:

```sh
export TF_VAR_private_key=My_Example_Key_Value
```

Define a variable with an empty value, then reference it from the environment variable using the standard syntax: the `var` keyword followed by a period, followed by the variable name:

```hcl
variable "private_key" {}
provider "okta" {
  org_name = var.okta_org_name
  base_url = var.base_url
  client_id = var.client_id
  scopes = var.scopes
  private_key = var.private_key
}
```

* Don’t store Terraform state files locally, which is the default. These generated files can leak your credentials. Instead, use remote cloud storage. See the [Terraform documentation about remote backends](https://developer.hashicorp.com/terraform/language/settings/backends/configuration).

For more strategies for secret storage in Terraform, see this [third-party article](https://blog.gruntwork.io/a-comprehensive-guide-to-managing-secrets-in-your-terraform-code-1d586955ace1).

On a related note, several ways of performing authentication with Okta from Terraform and other SDKs exist. Okta recommends using key pairs. See [Enable Terraform access for your Okta org](/docs/guides/terraform-enable-org-access/main). Although Okta provides a feature called API keys, which work for authentication from external tools, Okta strongly recommends using key pairs instead. Store the private key securely with one of the mechanisms described in this article to reduce the risk of unauthorized access. For related discussion, see [Why You Should Migrate to OAuth 2.0 From Static API Tokens](https://developer.okta.com/blog/2023/09/25/oauth-api-tokens).

## Avoid problems caused by configuration drift

The real-world state of your infrastructure can differ from the updated state files updated during a `terraform apply` command. When this occurs, it's called configuration drift.

Configuration drift usually occurs when an organization uses multiple strategies or tools to modify resources. External factors can also cause drift. These include a resource unexpectedly terminating, failing, or being out of sync with the Terraform-based resource definitions and state files.

For Okta resources you manage with Terraform, never modify them with Admin Console or other APIs.

## Configure a basic Okta Terraform configuration

A basic configuration includes the following files in the root of your Terraform directory.

### Set up the Okta provider in your main configuration file

Set up your Terraform provider for your project with code such as the following.

```hcl
terraform {
  required_providers {
    okta = {
      source = "okta/okta"
      version = "~&gt; 4.1.0"
    }
  }
}

provider "okta" {
  org_name = var.okta_org_name
  base_url = var.base_url
  client_id = var.client_id
  scopes = var.scopes
  private_key = var.private_key
}
```

This example sets the required major and minor release version of the Okta Terraform provider using the `~>` operator in the `version` statement. Terraform supports automatic upgrades based on the build number. Using an explicit version number avoids unexpected Terraform provider upgrades. After each release, choose when to upgrade your configuration with the latest Okta Terraform provider. See the [Version Constraints guide for Terraform](https://developer.hashicorp.com/terraform/language/expressions/version-constraints).

### Use variables and variable values

Variable values can be set in multiple ways to make them available in your Terraform files. For example, you can set OS environment variables, just-in-time variable drop-ins, or variables in container tools, such as Docker. This article demonstrates using standard Terraform variable definitions with their values in `.tfvars` files. This approach is typical for initial work with Terraform but isn't recommended for sensitive values. Always follow your organization's best practices for securely setting Terraform variables for production systems and values for sensitive fields.

> **Caution** Including sensitive values in your `.tf` files, such as provider details or private keys, is a significant security risk. See [Securely store secrets and credentials](#securely-store-secrets-and-credentials).

#### Set global variables

Save your global variables in a file named `variables.tf` in the same folder as your `main.tf` file:

```hcl
variable "OKTA_ORG_NAME" {
  description = "Name of Okta org"
  type = string
}

variable "client_id" {
  description = "Client ID value"
  sensitive = true
}

variable "private_key" {
  description = "Client authentication information"
  sensitive = true
}

variable "scopes" {
  description = "Scopes for the client"
  type = list(string)
}
```

#### Set global variable values in .auto.tfvars files

Save your global values in a file named `values.auto.tfvars` in the same folder as your `main.tf` file. To avoid using a special CLI attribute for your Terraform commands to load the files, use the `.auto.tfvars` suffix instead of just `.tfvars`. For example, `values.auto.tfvars`.

These files can assign variables with a straightforward syntax. See the [Terraform article on variables](https://developer.hashicorp.com/terraform/language/values/variables). For example:

```hcl
client_id = "my-example-client-id"
OKTA_ORG_NAME = "ExampleOrg"
```

Take extra steps to secure variables that hold secrets and credentials. See [Securely store secrets and credentials](#securely-store-secrets-and-credentials).

#### Use variables

Reference a variable by its name in other places in your configuration with the `var.` prefix, for example:

```hcl
resource "okta_group" "Finance" {
  name        = "${var.OKTA_ORG_NAME}-Finance"
  description = "Finance"
}
```

### Manage your list of API scopes

Your Terraform configuration must include a list of the Okta API scopes required to perform the associated tasks. For example, Terraform needs the `okta.groups.manage` API scope to create an Okta group in the Okta org’s directory. See the [scopes reference](/docs/api/oauth2/) for more information.

1. Define a `scopes` variable in your `main.tf` file:

```hcl
variable "scopes" {
  description = "Scopes for the client"
  type = list(string)
}
```

2. In your `values.auto.tfvars` file, set the `scopes` variable value to the scopes you need, for example:

```hcl
# This list of scopes must match the set of scopes required to manage the included Okta resource types
scopes = [
  "okta.groups.manage",
  "okta.users.manage",
  "okta.apps.read",
  "okta.policies.manage",
  "okta.authenticators.manage"
]
```

3. In your Okta Terraform provider setup, reference your `var.scopes` variable:

```hcl
provider "okta" {
  org_name = "exampleorg"
  base_url = "oktapreview.com"
  client_id = "0oae98s6dfnqwkj1sa1d7"
  scopes = var.scopes
  private_key = "./keys/terraform-app-private-key.pem"
}
```

As you add other resource types to Terraform, make changes in multiple places:

1. Review the [reference of Okta admin scopes](/docs/api/oauth2/). Look for scopes that mention that resource. For full read/write access, choose the scope with `manage` in the name. For example, add `okta.groups.manage` to manage groups.

2. Enable new scopes on your the application that controls your Terraform integration:

    1. Open the Admin Console for your organization.

    2. Open the Okta API Service application that controls your Terraform integration.

    3. Click **Okta API Scopes**.

   4. Find the new scope. If it hasn't already been granted, click **Grant** and then click **Grant Access**.

3. Update the requested Okta API OAuth 2.0 scopes list in your `values.auto.tfvars` file.

4. You may also need to add admin roles to Terraform's API service app. Enable groups of permissions by department or role in the organization. Use the Admin Console to apply common permissions groups by assigning built-in admin roles, such as Organization Admin or Super Administrator. For fine-grained access control, create a custom role and include only the minimal set of permissions. Note that Okta admin roles (which encapsulate permissions) differ from the Okta API scopes. For instructions, see [Enable Terraform access for your Okta organization](/docs/guides/terraform-enable-org-access/main/).

