---
title: Manage Okta Identity Governance Resources using Terraform
meta:
  - name: description
    content: Learn how to create, import, and modify Okta Identity Governance (OIG) resources using Terraform automation.
layout: Guides
---
Learn how to create, import, and modify Okta Identity Governance (OIG) resources using Terraform automation.

#### Learning outcomes

- Define and create OIG resources using Terraform.
- Modify existing OIG resources that are managed by Terraform.
- Import existing OIG resources from Okta into your Terraform state.


#### What you need
- Familiarity with the Terraform terms, such as configuration, resources, state, and commands.
- An Okta org that's subscribed to [Okta Identity Governance](https://www.okta.com/products/identity-governance/).
- A Terraform configuration that can access your Okta org. See [Okta provider configuration](#okta-provider-configuration).
- An Okta user account with the super admin role.
- Terraform 1.8.5 or later.
- Okta Terraform provider 6.2.0 or later.

### Overview

Okta Identity Governance (OIG) allows stakeholders to manage user resources like apps and groups through features such as Access Requests, access certification campaigns, and entitlements. Using Terraform, you can automate the lifecycle of these resources to ensure that users have the right level of access when they need it. 

**Note**: You can only manage Generally Available (GA) OIG resources using Terraform. Beta and Early Access (EA) resources aren’t supported.

### Set up your Terraform files

For guidance on organizing your files, see [setting up a typical Okta Terraform configuration](/docs/guides/terraform-organize-configuration/main/#configure-a-basic-okta-terraform-configuration). Consider organizing your Terraform code in a way that groups related resources together. For example, you could create a Terraform file called `governance.tf` that contains your apps, bundles, or entitlement definitions.

#### Add or confirm the API scopes

Your Terraform integration requires the appropriate OAuth scopes for the resource that you’re managing. The scopes that are required for each resource are listed in the Okta [Identity Governance API documentation](https://developer.okta.com/docs/api/iga/).

In this sample, the scopes required for managing campaigns include:
- okta.governance.accessCertifications.manage
- okta.governance.accessCertifications.read

**Note**: To grant scopes in the Admin Console and include them in your Terraform code, see the guides on [enabling your API service app for Terraform access](/docs/guides/terraform-enable-org-access/) and [setting up a typical Okta Terraform configuration](/docs/guides/terraform-organize-configuration/).

### Okta provider configuration

Configure the Okta Terraform provider in your Terraform configuration files. This configuration involves setting up credentials with relevant permissions to manage entitlements within your Okta org.

```bash

    terraform {
      required_providers {
        okta = {
          source  = "okta/okta"
          version = ">= 6.0.0"
      }
    }
    provider "okta" {
      org_name  = var.okta_org_name
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

### Prepare your Okta Org
**Note**: This section is applicable only if you’re managing app-specific resources, such as entitlements.

Before creating app-specific resources, you must enable **Entitlement Management** on the target app in your Okta org:

1. In the Admin Console, go to **Applications** > **Applications**.
2. Select the relevant app.
3. In the **General** tab, locate **Identity Governance** and select **Edit**.
4. Select **Enable** from the **Entitlement Management** dropdown menu.
5. Select **Save**.


### Manage Resources

#### Resource arguments

Use the relevant resource schema, in this sample, the [Campaigns schema](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/campaign#schema), to create and update relevant resources. See the **Schema** section of the relevant resources in the [Okta Terraform Provider Registry documentation](https://registry.terraform.io/providers/okta/okta/latest).

#### Create a resource

1. Create a resource block in your Terraform configuration file. The following sample defines an access review campaign for a specific app.

```bash
resource "okta_campaign" "example" {
  name          = "Monthly access review of sales team"
  description   = "Multi app campaign"
  campaign_type = "RESOURCE"

  schedule_settings {
    type             = "ONE_OFF"
    start_date       = "2025-10-04T13:43:40.000Z"
    duration_in_days = 21
    time_zone        = "America/Vancouver"
  }

  resource_settings {
    type                                    = "APPLICATION"
    include_entitlements                    = true
    individually_assigned_apps_only         = false
    individually_assigned_groups_only       = false
    only_include_out_of_policy_entitlements = false
    target_resources {
      resource_id                          = "0oao01ardu8r8qUP91d7"
      resource_type                        = "APPLICATION"
      include_all_entitlements_and_bundles = true
    }
    target_resources {
      resource_id                          = "0oanlpd3xkLkePi3W1d7"
      resource_type                        = "APPLICATION"
      include_all_entitlements_and_bundles = false
    }
  }

  principal_scope_settings {
    type                      = "USERS"
    include_only_active_users = false
  }

  reviewer_settings {
    type                   = "USER"
    reviewer_id            = okta_user.test.id
    self_review_disabled   = true
    justification_required = true
    bulk_decision_disabled = true
  }

  notification_settings {
    notify_reviewer_when_review_assigned      = false
    notify_reviewer_at_campaign_end           = false
    notify_reviewer_when_overdue              = false
    notify_reviewer_during_midpoint_of_review = false
    notify_review_period_end                  = false
  }

  remediation_settings {
    access_approved = "NO_ACTION"
    access_revoked  = "NO_ACTION"
    no_response     = "NO_ACTION"
  }
}
```
> **Note**: For resource-specific examples, see the [Example Usage](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/campaign#example-usage) page for the resource.
2. Run the `terraform plan` command. The output provides a preview of your infrastructure's Terraform changes.
3. Run the `terraform apply` command to provision the resource.
4. Type `yes` when prompted to complete the creation.

#### Import existing objects to Terraform

You can import existing OIG objects into Terraform using the import function. For more information on importing objects into Terraform, see [Import existing Okta objects into Terraform](https://developer.okta.com/docs/guides/terraform-import-existing-resources/main/).

**Note**: Ensure that you have the ID of the resource you want to import. You can retrieve this ID from the Admin Console or by using the [Okta Identity Governance API](https://developer.okta.com/docs/api/iga/).
1. Create a resource block in your Terraform file to host the object that you want to import. The configuration must match the state of the object in Okta.
2. Open the **Example Usage** page for the resource (for example: [Import Campaigns](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/campaign#import)) and scroll to the **Import** section. Run the command line that it provides.
3. Run `terraform plan` to verify the import, and then `terraform apply` to update your state file.

### Retrieve existing resources
To view a resource that is already managed by Terraform, or any OIG resource in your org, you can use a data source. For example, you can retrieve a campaign using [Data Source: okta_campaign](https://registry.terraform.io/providers/okta/okta/latest/docs/data-sources/campaign) in the [Okta Terraform Provider Registry documentation](https://registry.terraform.io/providers/okta/okta/latest).

### Modify existing resources
To modify a resource already managed by Terraform:
1. Update the code in your `.tf` configuration file.
2. Run `terraform plan` to view the detected changes.
3. Run `terraform apply` to push the changes to your Okta org.
