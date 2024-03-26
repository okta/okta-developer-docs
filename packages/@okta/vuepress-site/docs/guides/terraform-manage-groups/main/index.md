---
title: Manage groups with Terraform
excerpt: Configure access to Okta applications and manage sign-in flows for groups of users.
layout: Guides
---

Use Terraform to configure access to Okta applications and manage sign-in flows for groups of users.

---

#### Learning outcomes

* Configure automatic group assignment for users in your org.
* Use groups to manage user access to Okta applications.
* Use groups to manage user sign-in flows.

#### What you need

* Familiarity with the Terraform terms: configuration, resources, state, and commands. See [Terraform overview](/docs/guides/terraform-overview).
* An [Okta Developer Edition organization](https://developer.okta.com/signup) or an Okta Identity Engine organization
* A Terraform configuration that can access your Okta org. See [Enable Terraform access for your Okta org](/docs/guides/terraform-enable-org-access).
---
## Overview

Groups enable you to manage access to Okta applications for many users. Group settings automatically apply changes to all users within that group, which simplifies managing large numbers of users.

Use groups by assigning users, applications, and policies to them. Users who are assigned to a group can access the applications by following the sign-in flows that the policies control. Assigned applications appear on the Okta End-User Dashboard for all users in the group.

## Automatically assign users to groups

Add an `okta_group_rule` resource to your Terraform configuration to assign new and existing users to groups based on their attributes. Use an IF condition in the group rule resource to select the users that Okta automatically assigns to a group.

Automatic assignment reduces the time required to manage users and helps with scaling the number of users in your org. It also reduces the number of resources in your configuration, which minimizes rate limit errors.

Create a “Business Technology” group and a group rule that automatically assigns users to that group:

1. In your `main.tf` Terraform configuration file, add an `okta_group` resource to create a group called “Business Technology”:

    ```hcl
    resource "okta_group" "business_technology_group" {
      name = "Business Technology"
    }
    ```


1. Add an `okta_group_rule` resource to create a group rule that automatically assigns users to the Business Technology group:

   * Set `group_assignments` to the Okta group ID of the Business Technology group.
   * Set `expression_value` to an IF condition to select users with the `department` attribute that contains the string “Business Technology”. Okta assigns all new and existing users that meet this condition to the Business Technology group.

  	> **Note:** Create an IF condition for the `expression_value` argument using the [Okta Expression Language](/docs/reference/okta-expression-language/).

   * Set `status` to `ACTIVE` to apply the rule to all users.

    ```hcl
    resource "okta_group_rule" "business_technology_group_rule" {
      name = "Business Technology Group Rule"
      status = "ACTIVE"
      group_assignments = [ okta_group.business_technology_group.id ]
      expression_value = "String.stringContains(user.department,\"Business Technology\")"
    }
    ```

1. Test the automatic assignment by adding an `okta_user` resource to create a user with a department value of `Business Technology`:

    ```hcl
    resource "okta_user" "business_technology_test_user_1" {
      first_name = "BusinessTechnology"
      last_name = "TestUser1"
      department = "Business Technology"
      login = "business_technology_user_1@example.com"
      email = "business_technology_user_1@example.com"
    }
    ```

Run the Terraform configuration to create the resources and test the group rule:

1. In a terminal, go to the directory that contains your Terraform configuration.
1. Run `terraform init` to initialize the Terraform configuration.
1. Run `terraform plan` to preview the changes to your Okta org. Check the plan to confirm that Terraform creates the resources that you added to the configuration and doesn't change any existing resources.
1. Run `terraform apply` to apply the changes to your org. Enter `yes` when prompted to confirm.
1. Check your Admin Console to confirm that Terraform created the resources.
1. Go to **Directory** > **Groups** in the Admin Console to confirm that Terraform created the resources.
1. Select the **Business Technology** group.
1. Check that **BusinessTechnology TestUser1** is a member of the group. You can also check the **Managed** column to see that the **Business Technology Group Rule** manages the user group assignment.

## Manually assign users to groups

When automatic assignment isn’t sufficient or required, you can assign individual users to groups in your Terraform configuration. For example, you can configure special access that applies to one user only.

There are two resources for manually assigning users:

* `okta_group_memberships` manages user assignments for one group.
* `okta_user_group_memberships` manages the assignment of one user to multiple groups.

Add an `okta_group_memberships` resource to the previous example to assign an example user to the Business Technology group:

1. In your `main.tf` Terraform configuration file, add an `okta_user` resource to create a test user to manually assign to the Business Technology group. Don’t set the `department` attribute to `Business Technology`. Otherwise, Okta automatically assigns the user based on the group rule from the previous example.

    ```hcl
    resource "okta_user" "business_technology_test_user_2" {
      first_name = "BusinessTechnology"
      last_name = "TestUser2"
      login = "business_technology_user_2@example.com"
      email = "business_technology_user_2@example.com"
    }
    ```

1. Add an `okta_group_memberships` resource to assign the user to the Business Technology group:

    ```hcl
    resource "okta_group_memberships" "business_technology_group_membership" {
      group_id = okta_group.business_technology_group.id
      users = [ okta_user.business_technology_test_user_2.id ]
    }
    ```

Run the Terraform configuration to create the resources:

1. In a terminal, go to the directory that contains your Terraform configuration.
1. Run `terraform init` to initialize the Terraform configuration.
1. Run `terraform plan` to preview the changes to your Okta org. Check the plan to confirm that Terraform creates the resources that you added to the configuration and doesn't change any existing resources.
1. Run `terraform apply` to apply the changes to your org. Enter `yes` when prompted to confirm.
1. Check your Admin Console to confirm that Terraform created the resources.
1. Go to **Directory** > **Groups** in the Admin Console to confirm that Terraform created the resources.
1. Select the **Business Technology** group.
1. Check that **BusinessTechnology TestUser2** is a member of the group. You can also check the **Managed** column to see that the user is managed **Manually**.

## Assign apps to groups

Use an `okta_app_group_assignment` resource to assign an Okta app to a group. Assigned apps appear on the Okta End-User Dashboard for all users in the group.

Assign an example Okta app to the Business Technology group:

1. In your `main.tf` Terraform configuration file, add an `okta_app_oauth` resource to create an example app in your org.

    ```hcl
    resource "okta_app_oauth" "example_app" {
      label = "Example App"
      type = "web"
      grant_types = ["authorization_code"]
      redirect_uris = ["https://example.com/"]
      response_types = ["code"]
    }
    ```

1. Add an `okta_app_group_assignments` resource to assign the example OAuth app to the Business Technology group.
1. Set `app_id` to the ID of the example app that you created.

    ```hcl
    resource "okta_app_group_assignments" "example_app_assignment" {
      app_id = okta_app_oauth.example_app.id
      group {
        id = okta_group.business_technology_group.id
        priority = 1
      }
    }
    ```

Run the Terraform configuration to create the resources:

1. In a terminal, go to the directory that contains your Terraform configuration.
1. Run `terraform init` to initialize the Terraform configuration.
1. Run `terraform plan` to preview the changes to your Okta org. Check the plan to confirm that Terraform creates the resources that you added to the configuration and doesn't change any existing resources.
1. Run `terraform apply` to apply the changes to your org. Enter `yes` when prompted to confirm.
1. Check your Admin Console to confirm that Terraform created the resources.
1. Go to **Directory** > **Groups** in the Admin Console to confirm that Terraform created the resources.
1. Select the **Business Technology** group, and then select **Applications**.
1. Check that your application is in the list of assigned applications.

## Assign policies to groups

Policies control sign-in flows for users, including the type and number of required authentication factors. Include group IDs in policy resources in your Terraform configuration to assign policies to groups. For a given policy type, the assigned policy with the highest priority applies to users in the group. For example, if a group has two assigned global session policies, the policy with the higher priority applies.

For examples of assigning policies to groups, see [Manage user access with Terraform](/docs/guides/terraform-manage-user-access).
