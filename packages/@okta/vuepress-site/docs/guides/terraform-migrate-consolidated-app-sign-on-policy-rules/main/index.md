---
title: Migrate to consolidated app sign-on policy rules
excerpt: Learn how to migrate your configuration from individual resources to a consolidated resource.
layout: Guides
---

Learn how to migrate your configuration from individual `okta_app_signon_policy_rule` resources to the consolidated `okta_app_signon_policy_rules` resource.

#### Learning outcomes

* Document your existing sign-on policy rules.
* Remove individual resources from your Terraform state without affecting your Okta environment.
* Configure and import the new consolidated resource.
* Verify your plan and resolve common "positional diff" issues.

#### What you need

* An Okta org that has an Okta tenant with Identity Engine enabled
* Terraform CLI 1.0 or later
* Okta Terraform provider 6.6.0 or later
* Administrative access with permissions to manage policies and apps
* A backup copy of your terraform.tfstate file

## Overview

Using individual `okta_app_signon_policy_rule` resources often leads to priority drift. Priority drift means that the actual order of rules in Okta has moved away from your desired configuration in Terraform. This occurs when Terraform processes rules in an unpredictable order, causing Okta to assign priorities differently than intended. As a result, your Terraform plans might show "perpetual diffs" that never resolve.

The consolidated `okta_app_signon_policy_rules` resource prevents this by managing all rules for a policy as a single atomic unit, ensuring they’re always applied in the correct, intended order.

## Migration steps

### Step 1: Document existing rules

First, list the rules that belong to the policy you want to migrate. Note the name, priority, and configuration settings for each.

Example of an existing individual configuration:

```hcl
resource "okta_app_signon_policy_rule" "rule1" {
  name               = "MFA-Required"
  policy_id          = okta_app_signon_policy.my_policy.id
  priority           = 1
  status             = "ACTIVE"
  factor_mode        = "2FA"
  network_connection = "ANYWHERE"
  constraints = [jsonencode({
    "authenticationMethods" : [
      {
        "key" : "okta_verify",
        "method" : "signed_nonce"
      }
    ]
  })]
}

resource "okta_app_signon_policy_rule" "rule2" {
  name               = "Password-Only"
  policy_id          = okta_app_signon_policy.my_policy.id
  priority           = 2
  status             = "ACTIVE"
  factor_mode        = "1FA"
  network_connection = "ANYWHERE"
  constraints = [jsonencode({
    "authenticationMethods" : [
      {
        "key" : "okta_password",
        "method" : "password"
      }
    ]
  })]
}
```

### Step 2: Remove old resources from the state

You must stop Terraform from tracking these rules as individual resources. You can remove the old resources from the state using the following options:

#### Option A: Use the command line

Run the following command for each rule:

```bash
terraform state rm okta_app_signon_policy_rule.mfa_rule
terraform state rm okta_app_signon_policy_rule.password_rule
```

In your Terraform configuration, comment out or remove the old `okta_app_signon_policy_rule` resources:

```hcl
# COMMENTED OUT - Migrated to okta_app_signon_policy_rules
# resource "okta_app_signon_policy_rule" "rule1" {
#   ...
# }
# resource "okta_app_signon_policy_rule" "rule2" {
#   ...
# }
```

#### Option B: Version-controlled approach (Recommended for Terraform 1.7+)

Instead of manual command-line instructions, replace the old resource blocks with `removed` blocks in your configuration:

```hcl
removed {
  from = okta_app_signon_policy_rule.rule1
  lifecycle {
    destroy = false
  }
}

removed {
  from = okta_app_signon_policy_rule.rule2
  lifecycle {
    destroy = false
  }
}
```

Note: Okta recommends option B because it’s version-controlled. This approach allows your team to review the changes in a pull request and use the standard `terraform plan` and `apply` Workflow. It also prevents errors that can occur when running manual CLI commands in the wrong order or workspace.

### Step 3: Create the consolidated resource

Replace your individual resource blocks with one `okta_app_signon_policy_rules` resource. Move your previous settings into `rule` blocks inside this new parent resource.

```hcl
resource "okta_app_signon_policy_rules" "my_policy_rules" {
  policy_id = okta_app_signon_policy.my_policy.id

  rule {
    name               = "MFA-Required"
    priority           = 1
    status             = "ACTIVE"
    factor_mode        = "2FA"
    network_connection = "ANYWHERE"
    constraints = [jsonencode({
      "authenticationMethods" : [
        {
          "key" : "okta_verify",
          "method" : "signed_nonce"
        }
      ]
    })]
  }

  rule {
    name               = "Password-Only"
    priority           = 2
    status             = "ACTIVE"
    factor_mode        = "1FA"
    network_connection = "ANYWHERE"
    constraints = [jsonencode({
      "authenticationMethods" : [
        {
          "key" : "okta_password",
          "method" : "password"
        }
      ]
    })]
  }
}
```

### Step 4: Import existing rules

Sync your local state with Okta by running the import command. Replace `$policy_id` with your actual policy ID.

```bash
terraform import okta_app_signon_policy_rules.my_app_policy_rules $policy_id
```

### Step 5: Run Terraform plan

Run a plan to see how Terraform interprets the new structure:

```bash
terraform plan
```

## Understand "Positional Diffs"

You might see names "swapping" in the plan (for example, the name: "Rule2" -> "Rule1"). This is just a display artifact. Terraform compares lists by position rather than by name.

* When it's safe: If the settings (like status or constraints) match the correct rule name in your code, you can safely apply.

* When to double-check: If you see configuration details moving to the wrong rule name, ensure that your code names match the names in Okta exactly.

If the plan looks correct, apply the changes:

```bash
terraform apply
```

## Best practices

* Ensure unique names: Every rule within a policy must have a unique name. The provider uses these names to match your configuration to existing Okta rules.
* Order by priority: For the clearest plan output, list your `rule` blocks in your configuration file in ascending order of priority (1, 2, 3...).
* Allow for priority gaps: Okta rules don’t require consecutive numbers. You can use priorities like 1, 3, and 5 without issue.
* Manage changes easily:
  * To add a rule: Add a `rule` block with a unique name.
  * To delete a rule: Simply remove the `rule` block from your configuration.

## Troubleshooting

* "Inconsistent result after apply": This typically happens if rule IDs in the plan don't match what is returned after the apply, often due to mismatched ordering. To resolve this, remove the resource from your state (`terraform state rm`), re-import it, and run apply again.

* "Empty sets" (`[] -> null`): You might see changes where optional fields (like `groups_excluded`) move from `[]` to `null`. This is expected behavior and occurs because the imported state includes empty sets that your config doesn't specify. This resolves after the first successful apply.

## Rollback procedure

If you need to return to individual resources, follow these steps:

1. Remove the consolidated resource from your state:

    ```bash
    terraform state rm okta_app_signon_policy_rules.my_policy_rules
    ```

1. Uncomment your original `okta_app_signon_policy_rule` definitions.

1. Import each rule individually using the policy ID and rule ID:

    ```bash
    terraform import okta_app_signon_policy_rule.rule1 <policy_id>/<rule_id>
    ```

## Example: Complete migration

Before (old method)

```hcl
resource "okta_app_signon_policy" "my_app_policy" {
  name        = "My App Policy"
  description = "Policy for my application"
}

resource "okta_app_signon_policy_rule" "mfa_rule" {
  name               = "Require-MFA"
  policy_id          = okta_app_signon_policy.my_app_policy.id
  priority           = 1
  factor_mode        = "2FA"
  constraints = [jsonencode({
    "authenticationMethods": [{"key": "okta_verify", "method": "signed_nonce"}]
  })]
}

resource "okta_app_signon_policy_rule" "password_rule" {
  name               = "Password-Fallback"
  policy_id          = okta_app_signon_policy.my_app_policy.id
  priority           = 2
  factor_mode        = "1FA"
  constraints = [jsonencode({
    "authenticationMethods": [{"key": "okta_password", "method": "password"}]
  })]
}
```

After (new method)

```hcl
resource "okta_app_signon_policy" "my_app_policy" {
  name        = "My App Policy"
  description = "Policy for my application"
}

resource "okta_app_signon_policy_rules" "my_app_policy_rules" {
  policy_id = okta_app_signon_policy.my_app_policy.id

  rule {
    name        = "Require-MFA"
    priority    = 1
    factor_mode = "2FA"
    constraints = [jsonencode({
      "authenticationMethods": [{"key": "okta_verify", "method": "signed_nonce"}]
    })]
  }

  rule {
    name        = "Password-Fallback"
    priority    = 2
    factor_mode = "1FA"
    constraints = [jsonencode({
      "authenticationMethods": [{"key": "okta_password", "method": "password"}]
    })]
  }
}
```

## Migration commands

```bash
# 1. Backup state
cp terraform.tfstate terraform.tfstate.backup

# 2. Remove old resources from state
terraform state rm okta_app_signon_policy_rule.mfa_rule
terraform state rm okta_app_signon_policy_rule.password_rule

# 3. Update your .tf files (replace old resources with new consolidated resource)

# 4. Import existing rules into new resource
terraform import okta_app_signon_policy_rules.my_app_policy_rules <policy_id>

# 5. Plan and apply
terraform plan
terraform apply
```

## Support

If you encounter issues during migration:

* Review the Terraform provider for Okta documentation.
* Search existing GitHub issues for similar problems.
* If you open a new issue, include your provider and Terraform versions, the full error message, and a sanitized version of your configuration.