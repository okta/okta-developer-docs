---
title: Role Assignment
---

# Role assignment

Role assignment to principals makes them administrators of your org. Principals can be Users or Groups of Users. When a Role is assigned to a Group, all members of the Group automatically have the privileges granted by the Role.
Roles can be one of the [standard Roles](#standard-role-assignment) that are provided by default. Alternatively, you can create your own Custom Roles by choosing from the collection of available [permissions](#permission-types).
On this page, we discuss the concepts of Role assignment through APIs. See [Custom Admin Roles Help](https://help.okta.com/okta_help.htm?id=csh-cstm-admin-roles).

## Standard Role assignment

The following Role types are provided and supported:

| Role type                               | Label                               | Optional targets                      |
| :-------------------------------------- | :---------------------------------- | :------------------------------------ |
| `API_ACCESS_MANAGEMENT_ADMIN`           | API Access Management Administrator |                                       |
| `APP_ADMIN`                             | Application Administrator           | Apps                                  |
| `GROUP_MEMBERSHIP_ADMIN`                | Group Membership Administrator      | [Groups](/docs/reference/api/groups/) |
| `HELP_DESK_ADMIN`                       | Help Desk Administrator             | [Groups](/docs/reference/api/groups/) |
| `MOBILE_ADMIN`                          | Mobile Administrator                |                                       |
| `ORG_ADMIN`                             | Organizational Administrator        |                                       |
| `READ_ONLY_ADMIN`                       | Read-Only Administrator             |                                       |
| `REPORT_ADMIN`                          | Report Administrator                |                                       |
| `SUPER_ADMIN`                           | Super Administrator                 |                                       |
| `USER_ADMIN`                            | Group Administrator                 | [Groups](/docs/reference/api/groups/) |

Perform standard role assignment in two steps:

1. Assign a Role to a User or Group. At this point, the admin has the supported privileges of the Role over all resources across organization.
2. (Optional) If the Role supports targets, use one of the [target operations](/docs/reference/api/roles/#role-target-operations) to indicate which specific resource the admin can manage.

Note that the entities involved in standard Role assignment are:

* A Role: Identified either by type or ID returned from the [listing API](/docs/reference/api/roles/#list-roles)
* A principal: Either a Group or a User
* (Optional) A resource: When using [target operations](/docs/reference/api/roles/#role-target-operations) this can be either an App or a Group

## Custom Role assignment
<ApiLifecycle access="ea" />

Custom Roles can be built by piecing [Permissions](/docs/reference/api/roles/#permission-types) together. After a Custom Role is built, you can use its `id` or `label` to assign to admins. The process is:

1. Build a Custom Role.
2. Build a set of resources.
3. Bind the admin with the Role from step one that targets the Resource Set from step two.

An assignment of a Role to an admin is called a [Binding](/docs/reference/api/roles/#binding-object). Conceptually, a Binding is identified by a unique ID, and represents a single unique combination of principal, Resource Set, and Custom Role. A given Resource Set can have multiple Bindings that allow for different combinations of principals and Roles as necessary to grant permission to the encompassing resource.

Therefore, when dealing with Custom Roles, these three entities always exist:

* A Role: Identified by its `label` or `id`
* A principal: Either a Group or a User - known as a Member of the Binding
* A Resource Set: Identified by its `id`

### Resource sets
<ApiLifecycle access="ea" />

A Resource Set is simply a collection of resources. The following resources are currently supported:

* All Users
* All Groups
* A specific Group
* All Users within a specific Group

### Identifiers
<ApiLifecycle access="ea" />

#### Resource identifiers

To specify a resource targeted by a Resource Set, you can use the REST URL of the corresponding Okta API:

* [All Users](/docs/reference/api/users/#list-users)

  ``` http
  https://${yourOktaDomain}/api/v1/users
  ```

* [All Groups](/docs/reference/api/groups/#list-groups)

  ``` http
  https://${yourOktaDomain}/api/v1/groups
  ```

* [All Apps](/docs/reference/api/apps/#list-applications)

  ``` http
  https://${yourOktaDomain}/api/v1/apps
  ```

* [A specific Group](/docs/reference/api/groups/#get-group)

  ``` http
  https://${yourOktaDomain}/api/v1/groups/${targetGroupId}
  ```

* [All Users within a specific Group](/docs/reference/api/groups/#list-group-members)

  ``` http
  https://${yourOktaDomain}/api/v1/groups/${targetGroupId}/users
  ```

* [All Apps of specific type](/docs/reference/api/apps/#list-apps-by-name)

  ``` http
  https://${yourOktaDomain}/api/v1/apps/?filter=name+eq+\"${targetAppType}\"
  ```

* [A specific App](/docs/reference/api/apps/#get-application)

  ``` http
  https://${yourOktaDomain}/api/v1/apps/${targetAppId}
  ```

> **Note:** If you use a Role with permissions that don't apply to the resources in the Resource Set, it doesn't affect the admin Role. For example, the `okta.users.userprofile.manage` permission gives the admin no privileges if it is granted to a Resource Set that only includes `https://${yourOktaDomain}/api/v1/groups/${targetGroupId}` resources. If you want the admin to be able to manage the Users within the group, the Resource Set must include the corresponding `https://${yourOktaDomain}/api/v1/groups/${targetGroupId}/users` resource.

#### Binding member identifiers

To specify Binding Members, use the REST URL of the corresponding Okta API:

* [A specific User](/docs/reference/api/users/#get-user)

  ``` http
  https://${yourOktaDomain}/api/v1/users/${memberUserId}
  ```

* [A specific Group](/docs/reference/api/groups/#get-group)

  ``` http
  https://${yourOktaDomain}/api/v1/groups/${memberGroupId}
  ```

## Custom vs. standard

1. An admin can have both standard Role assignments and Custom Role Bindings. Note that privileges granted to an admin are an aggregate of:
    * Standard Roles directly assigned
    * Standard Roles granted through group membership
    * Custom Roles directly assigned
    * Custom Roles granted through group membership

    As a result, if an admin was granted a standard Role that is limited to a single Group, and at the same time received group management privileges on all Groups in the org through a Custom Role, the ultimate outcome is group management on all Groups.
2. <ApiLifecycle access="ea" />You can't assign a Custom Role without a Resource Set. The Custom Role is applicable only to a subset of resources. Standard Roles on the other hand, are initially granted to the entire org. They are only scoped to specific resources by subsequent invoking of the [target operations](/docs/reference/api/roles/#role-target-operations).

### Permission types
<ApiLifecycle access="ea" />

| Permission type                     | Description                                                                                                                         | Applicable resource types                    |
| :---------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------- |
| `okta.users.manage`                 | Allows the admin to create and manage Users and read all profile and credential information for Users                               | All Users, all Users within a specific Group |
| `okta.users.create`                 | Allows the admin to create Users. If the admin is also scoped to manage a Group, that admin can add the User to the Group on creation and then manage | All Groups, a specific Group                 |
| `okta.users.read`                   | Allows the admin to read any User's profile and credential information                                                              | All Users, all Users within a specific Group |
| `okta.users.credentials.manage`     | Allows the admin to manage only credential lifecycle operations for a User                                                          | All Users, all Users within a specific Group |
| `okta.users.userprofile.manage`     | Allows the admin to only do operations on the User Object, including hidden and sensitive attributes                                | All Users, all Users within a specific Group |
| `okta.users.lifecycle.manage`       | Allows the admin to perform any User lifecycle operations                                                                           | All Users, all Users within a specific Group |
| `okta.users.groupMembership.manage` | Allows the admin to manage a User's group membership (also need `okta.groups.members.manage` to assign to a specific Group)         | All Users, all Users within a specific Group |
| `okta.users.appAssignment.manage`   | Allows the admin to manage a User's app assignment (also need `okta.apps.assignment.manage` to assign to a specific App)            | All Users, all Users within a specific Group |
| `okta.groups.manage`                | Allows the admin to fully manage Groups in your Okta organization                                                                   | All Groups, a specific Group                 |
| `okta.groups.create`                | Allows the admin to create Groups                                                                                                   | All Groups                                   |
| `okta.groups.members.manage`        | Allows the admin to only manage member operations in a Group in your Okta org                                                       | All Groups, a specific Group                 |
| `okta.groups.read`                  | Allows the admin to only read information about Groups and their members in your Okta organization                                  | All Groups, a specific Group                 |
| `okta.groups.appAssignment.manage`  | Allows the admin to manage a Group's app assignment (also need `okta.apps.assignment.manage` to assign to a specific App)           | All Groups, a specific Group                 |
| `okta.apps.read`                    | Allows the admin to only read information about Apps and their members in your Okta organization                                    | All Apps, All apps of specific type, a specific App |
| `okta.apps.manage`                  | Allows the admin to fully manage Apps and their members in your Okta organization                                                   | All Apps, All apps of specific type, a specific App |
| `okta.apps.assignment.manage`       | Allows the admin to only manage assignment operations of an App in your Okta org                                                    | All Apps, All apps of specific type, a specific App |
