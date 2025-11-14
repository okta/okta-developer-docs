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
- Familiarity with the Terraform terms: configuration, resources, state, and commands.
- An Okta org with the OIG SKU enabled.
- A Terraform configuration that can access your Okta org. See [Okta provider configuration]
- An Okta user account with the super administrator role.
- Terraform 1.8.5 or later.
- Okta Terraform provider 6.0.0 or later.

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

### Overview

<StackSnippet snippet="overview" inline/>

### Set up your Terraform files

For guidance on organizing your files, see setting up a typical Okta Terraform configuration. Consider organizing your Terraform code in a way that groups related resources together. For example, you could create a Terraform file called brands.tf that contains custom domains, brands, and themes.

#### Add or confirm the API scopes

Your Terraform integration requires the appropriate scopes that depend on what you're managing:

<StackSnippet snippet="scope" inline/>

To grant scopes in the Admin Console and to include them in your Terraform code, see the articles on enabling your API service app for Terraform access and Create a basic Okta Terraform configuration.

#### Configure Identity Governance on your Okta org
Before creating an entitlement, you must enable Identity Governance on the target application in your Okta org.
1. In the Admin Console, navigate to your OIDC web app.
1. In the **General** tab, locate Identity Governance and select **Edit**.
1. Select **Enable** from the **Governance Engine** drop-down menu.
1. Select **Save**.

### Resource arguments

<StackSnippet snippet="arguments" inline/>

### Manage resource

<StackSnippet snippet="manage" inline/>
