---
title: Terraform syntax tips for Okta automation
excerpt: Control the creation order of resources and reduce code in your Terraform configuration.
layout: Guides
---

Control the creation order of resources and reduce code in your Terraform configuration.

---

#### Learning outcomes

* Declare dependencies for objects such as policies and rules

* Manage large lists of resources using loops

#### What you need

* Familiarity with the Terraform terms: configuration, resources, state, and commands. See the [Terraform overview](/docs/guides/terraform-overview).

* An Okta organization

* A [Terraform configuration](/docs/guides/terraform-enable-org-access/main) that can access your Okta org.

## Overview

Resource definitions usually contain enough information for Terraform to create or destroy objects. However, some Okta resources, such as policies or rules, require creating or modifying other objects first.

Use the `depends_on` Terraform attribute in your configuration to define these explicit dependencies.

> *Note:* that HashiCorp recommends only [using depends_on in the rare cases that require it](https://developer.hashicorp.com/terraform/language/meta-arguments/depends_on).

### Managing policy and rule dependencies

Terraform doesn't create policy and rule resources in the order specified in the `priority` field. This non-deterministic creation order may result in incorrect deployment behavior.

Add a `depends_on` field to each policy or rule with a priority lower than `1`. Set the field's value to a resource with the next highest priority.

For example, [Okta policy rules](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/auth_server_policy_rule) can include a priority field. All rules in the same policy with a priority greater than `1` must include a `depends_on` declaration:

```hcl
resource "okta_auth_server_policy_rule" "rule_1" {
  # Your policy rule code goes here

  priority   = 1
}
resource "okta_auth_server_policy_rule" "rule_2" {
  # Your policy rule code goes here

  priority   = 2
  depends_on = [okta_auth_server_policy_rule.rule_1]
}
resource "okta_auth_server_policy_rule" "rule_3" {
  # Your policy rule code goes here

  priority   = 3
  depends_on = [okta_auth_server_policy_rule.rule_2]
}
```

### Managing email customization

The email customization resource also requires using `depends_on` when multiple email templates use the same `template_name`. This usually occurs when there are localized versions of the template. When that happens, create the default template with `is_default set` to `true` first. For more information, see [the Okta email customization resources](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/email_customization).

## Reduce code duplication with loops

Consider using a Terraform loop when your code assigns different values to the same kind of resource, such as creating multiple groups. The Terraform meta-argument `for_each` iterates over multiple values that you specify. You can perform the same statements using each value in the set. See [the Terraform documentation](https://developer.hashicorp.com/terraform/language/meta-arguments/for_each) for this feature.

Using a loop enables you to reduce duplication of your Terraform code. This approach makes your Okta Terraform code readable, maintainable, and less prone to deployment errors and inconsistencies.

Within a resource definition, set the `for_each` meta-argument to a set or map of your list-like data.

After assigning the `for_each` meta-argument, use the special phrase `each.value` to represent the current item in the loop across the input map or set. Set properties on each object, such as `each.value.name`.

> **Note**: Attribute values tagged as sensitive aren't permitted as arguments to `for_each`. See [Store secrets and credentials securely](/docs/guides/terraform-organize-configuration/main/#store-secrets-and-credentials-securely).

This example creates groups from a list of group names:

1. In your Terraform file for groups, define a variable for your group definitions. For this example, assume this is in a file called `users_and_groups.tf`:

    ```hcl
    variable "groups_to_create" {
      description = "List of group objects"
      type = list(object({
        name = string
        description = string
       }))
    }
    ```

1. Create a file for variable values, in this case, a list of group objects to create. If you aren't using the central `terraform.tfvars` file to set variable values, name the file with the suffix `.auto.tfvars`. For example, `users_and_groups.auto.tfvars`.

   Add this example to the file:

    ```hcl
    groups_to_create = [
      {
        "name": "Group 1",
        "description": "Group 1 description"
      },
      {
        "name": "Group 2",
        "description": "Group 2 description"
      },
      {
        "name": "Group 3",
        "description": "Group 3 description"
      }
    ]
    ```

1. In your original Terraform `.tf` file, create a group resource definition:

    ```hcl
    resource "okta_group" "group_create_using_list" {

    }
    ```

1. In that resource definition, set `for_each` to a map or set. You can convert array content to a map before setting the meta-argument:

    ```hcl
    for_each = { for group in var<your-variable-name>
      : group.name => group}
    ```

   Using the previous examples:

    ```hcl
    for_each = { for group in var.groups_to_create
      : group.name => group}
    ```

1. Add additional lines where you use `each.value` to access the current group in the loop.

Here is an example of the resource definition that creates one group for each member of the original list:

```hcl
resource "okta_group" "group_create_using_list" {

  # Convert the array to a map
    for_each = { for group in var.groups_to_create
    : group.name => group}
   # Use `each.value` to access each member of your list
  name        = each.value.name
  description = each.value.description
}
```

### Avoid rate limit errors from loops

Remember that Terraform uses the Okta Management APIs when you design loops. Follow the guidance in the related article [optimizing your Terraform deployment to avoid hitting rate limits](/docs/guides/terraform-design-rate-limits/main/).

For example, the following loop iterates through the users in the Everyone group. This results in iterating through all users in the system, something that's likely to result in a rate limit error:

```hcl
# Assign every user to an app
data "okta_group" "everyone_group" {
  name = "Everyone"
  include_users = "true"
}

data "okta_app" "test_application" {
  label = "Test Application"
}

resource "okta_app_user" "by_resource" {
  for_each = { for user_ref in data.okta_group.everyone_group.users : user_ref =&gt; user_ref }
  app_id = data.okta_app.test_application.id
  user_id = each.value
}
```

Instead, Okta recommends managing objects, such as apps, using groups rather than users. This version of the code uses a group rule. It runs faster and has a lower risk of resulting in an API rate limit error:

```hcl
# Create a group resource
resource "okta_group" "employee_group" {
  name = "Employee Group"
}

# Create a group rule
resource "okta_group_rule" "employee_group_rule" {
  name = "Employee Group Rule"
  status = "ACTIVE"
  group_assignments = [ okta_group.passwordless_group.id ]
  expression_value = "String.stringContains(user.department,\"Employees\")"
}

# Find the target app
data "okta_app" "okta_terraform_app" {
  label = "Okta Terraform App"
}

# Assign groups to the app
resource "okta_app_group_assignment" "example" {
  app_id   = data.okta_app.okta_terraform_app.id
  group_id = okta_group.employee_group.id
}
```

