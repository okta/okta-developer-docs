---
title: Manage Terraform Okta Identity Governance resources
meta:
  - name: description
    content: Use this guide to manage Okta Identity Governance resources using Terraform.
layout: Guides
---
This guide provides instructions for developers on how to use the <StackSnippet snippet="resource-name" inline/> Terraform resource to manage entitlements within your Okta org.

#### Learning outcomes

- Define and create an entitlement resource using Terraform.
- Modify an existing entitlement managed by Terraform.
- Import an entitlement from Okta into your Terraform state.

#### What you need
- Familiarity with the Terraform terms, such as configuration, resources, state, and commands.
- An Okta org with the OIG SKU enabled.
- A Terraform configuration that can access your Okta org. See [Okta provider configuration]
- An Okta user account with the super administrator role.
- Terraform 1.8.5 or later.
- Okta Terraform provider 6.0.0 or later.

### Overview

<StackSnippet snippet="overview" inline/>

### Set up your Terraform files

For guidance on organizing your files, see setting up a typical Okta Terraform configuration. Consider organizing your Terraform code in a way that groups related resources together. For example, you could create a Terraform file called brands.tf that contains custom domains, brands, and themes.

#### Add or confirm the API scopes

Your Terraform integration requires the appropriate scopes that depend on what you're managing:

<StackSnippet snippet="scope" inline/>

To grant scopes in the Admin Console and to include them in your Terraform code, see the articles on enabling your API service app for Terraform access and create a basic Okta Terraform provider configuration.

### Okta provider configuration

Configure the Okta Terraform provider in your Terraform configuration files. This configuration involves setting up credentials (for example, API token) with relevant permissions to manage entitlements within your Okta org.

```bash

    terraform {
      required_providers {
        okta = {
          source  = "okta/okta"
          version = "~> 4.0" # Use a recent, compatible version
        }
      }
    }
    provider "okta" {
      org_name  = var.okta_org_name
      api_token = var.okta_api_token
    }
    variable "okta_org_name" {
      description = "Your Okta org name (e.g., 'trial-12345678.okta.com')."
      type        = string
      sensitive   = true
    }
    variable "okta_api_token" {
      description = "Your Okta API token with relevant permissions."
      type        = string
      sensitive   = true
    }
```

#### Configure Identity Governance on your Okta org
Before creating an entitlement, you must enable Identity Governance on the app in your Okta org.
1. In the Admin Console, go to your OIDC web app.
1. In the **General** tab, locate Identity Governance and select **Edit**.
1. Select **Enable** from the **Governance Engine** dropdown menu.
1. Select **Save**.

### Resource arguments

<StackSnippet snippet="arguments" inline/>

### Create a <StackSnippet snippet="resource-name" inline/> resource

1. Create a resource block in your Terraform configuration file. For example, this sample defines an access review <StackSnippet snippet="resource-name" inline/> for a specific app.

<StackSnippet snippet="create" inline/>

2. Run the ` terraform plan` command. The output of the command provides a preview of the changes Terraform makes to your infrastructure.

3. Run the `terraform apply` command. This command provisions the entitlement resource.

> **Note**: To apply only a new resource, run a targeted apply command. For example, `terraform apply -target <resource_name>`

4. Type `yes` when prompted to complete the resource creation.


#### Import existing objects to Terraform

You can import existing <StackSnippet snippet="resource-name" inline/> objects to Terraform using the import function. For more information on importing objects into Terraform, see Import existing Okta objects into Terraform.

**Note**: Ensure that you have the <StackSnippet snippet="resource-name" inline/> ID that you want to import.


1. Create a resource block to host the object you’re importing. The configuration must match the object in Okta.

2. Run the following command to import your existing <StackSnippet snippet="resource-name" inline/> object into your Terraform state.

<StackSnippet snippet="import" inline/>

3. Save the file, run `terraform plan`, and then run `terraform apply`.
4. Verify that the `terraform.tfstate` file is created on your Terraform working directory. This ensures that the Terraform resource creation was completed successfully. This file records the mapping between the resources defined in your configuration files and the objects in your Okta org.

#### Retrieve existing <StackSnippet snippet="resource-name" inline/>

To view a <StackSnippet snippet="resource-name" inline/>  that is already managed by Terraform, or any <StackSnippet snippet="resource-name" inline/>  in your org, you can use a data source.

<StackSnippet snippet="retrieve" inline/>

#### Modify existing <StackSnippet snippet="resource-name" inline/>

To modify a <StackSnippet snippet="resource-name" inline/>  that is already managed by Terraform, update the code in your configuration file. Terraform detects the change and applies it on the next run.
Save the file, run `terraform plan`, and then run `terraform apply` to apply the change to your <StackSnippet snippet="resource-name" inline/> in Okta.
