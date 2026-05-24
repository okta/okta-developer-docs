---
title: Manage identity source
meta:
  - name: description
    content: Learn how to use Terraform to manage users, groups, and memberships within an Okta identity source.
layout: Guides
---

Learn how to use Terraform to manage users, groups, and memberships within an Okta identity source. This guide shows you how to use Terraform for retrieving data, managing individual records, and performing bulk operations.

---

#### Learning outcomes

* Retrieve identity source users, groups, and memberships using data sources.
* Manage individual user and group records directly.
* Perform bulk upsert and delete operations using a single import resource.
* Run complete import jobs without managing separate staging sessions.

#### Prerequisites

* An Okta Identity Engine organization.
* Terraform CLI version 1.0 or later.
* Okta Terraform provider version 6.6.0 or later.
* The specific `identity_source_id` for your integration. See, [API](https://developer.okta.com/docs/api/openapi/okta-management/management/tags/identitysource/identitysource) documentation.

## Overview

Managing an Okta identity source involves two primary workflows:

* Direct management: Create or update individual user, group, or membership records directly in the identity source. This method updates the target system immediately at a single-record level.

* Bulk management: Combine multiple create, update, or delete commands into a single batch operation using a unified import resource.

To manage an identity source in Okta, you must follow a structured workflow that starts with verifying your current data and ends with applying your configuration to the environment.

Perform the following steps to complete the management process:

1. Retrieve existing data: Look up your current users and groups.
2. Manage individual records: Update specific users or memberships directly.
3. Run bulk operations: Group large batches of data changes inside a single import resource.

## 1. Retrieve existing data

Before you make changes, use data sources to look up existing information about your users, groups, and sessions. This ensures you have the correct external IDs to use in your configuration.

Example: Look up a user and group memberships

Terraform
```bash
# Look up a user by external ID
data "okta_identity_source_users" "user_example" {
  identity_source_id = "<identity-source-id>"
  external_id        = "USEREXT123456EXAMPLE"
}


# Retrieve members of a specific group
data "okta_identity_source_group_memberships" "group_members" {
  identity_source_id = "<identity-source-id>"
  group_external_id  = "GROUPEXT123456EXAMPLE"
}
```

## 2. Manage individual records

To update a specific record without affecting other data, use standard resource blocks to interact with the identity source directly. This method is best for isolated, standalone changes.

Example: Manage a single user and group membership

```bash
# Manages an individual user in an Okta Identity Source
resource "okta_identity_source_user" "example" {
  identity_source_id = "<identity-source-id>"
  id                 = "USEREXT123456EXAMPLE"

  profile {
    user_name  = "jdoe@example.com"
    email      = "jdoe@example.com"
    first_name = "Jane"
    last_name  = "Doe"
  }
}

# Manages a group within an Okta Identity Source
resource "okta_identity_source_group" "example" {
  identity_source_id = "<identity-source-id>"
  external_id        = "GRPEXT123456EXAMPLE"

  profile {
    display_name = "Engineering"
    description  = "Engineering team group"
  }
}

# Manages a single group membership within an Okta Identity Source
resource "okta_identity_source_group_membership" "example" {
  identity_source_id   = "<identity-source-id>"
  group_or_external_id = "GRPEXT123456EXAMPLE"
  member_external_id   = "USEREXT123456EXAMPLE"
}
```

## 3. Perform bulk operations

To manage large sets of data efficiently, use the okta_identity_source_import resource. This resource streamlines the process by automatically creating an import session, staging your batch data, and running the final import in a single configuration block.

Example: Bulk user adjustments and group management inside a single job

```bash
resource "okta_identity_source_import" "example" {
  identity_source_id = "<identity-source-id>"


  # Upsert users and group memberships
  upsert_users {
    entity_type = "USERS"


    profiles {
      external_id = "USEREXT_NEW"


      profile {
        user_name  = "new.user@example.com"
        email      = "new.user@example.com"
        first_name = "New"
        last_name  = "User"
      }
    }
  }


  upsert_group_memberships {
    memberships {
      group_external_id   = "GROUPEXT001"
      member_external_ids = ["USEREXT_NEW"]
    }
  }


  # Upsert and delete in the same job
  delete_users {
    entity_type = "USERS"


    profiles {
      external_id = "USEREXT_OLD"
    }
  }


  upsert_groups {
    profiles {
      external_id = "GROUPEXT001"


      group_profile {
        display_name = "Engineering"
        description  = "Engineering team"
      }
    }
  }


  delete_groups {
    external_ids = ["GROUPEXT_DEPRECATED"]
  }
}
```

## Best practices

* Use the unified import resource: Do not manually configure resource dependencies or use `depends_on` blocks for bulk workflows. The `okta_identity_source_import` resource automatically creates the session, uploads data, and starts the import.

* Avoid rate limits: Okta allows only one active import session per identity source every five minutes. If a configuration fails during execution, the provider deletes the incomplete session automatically so that future `terraform apply` runs are not blocked.

* Understand permanent actions: The import process sends standalone data updates to Okta. Removing an `okta_identity_source_import` block from your configuration later does not undo or remove the entries created during the initial run.

## Troubleshooting

* Resource deletion: Removing optional blocks (such as a `delete_users` array) from your import configuration after an apply takes no action in Okta. To trigger a new import when your data parameters remain the same, change a resource attribute to force a new configuration cycle.

* Session monitoring: You can verify processing updates or errors by checking the `session_status` read-only attribute in your state file or by reviewing your operational log outputs.
