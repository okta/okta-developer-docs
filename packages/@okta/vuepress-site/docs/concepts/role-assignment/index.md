---
title: Role Assignment
---

# Role assignment

Role assignment to principals makes them administrators of your org. Principals can be users or groups of users. When a role is assigned to a group, all members of the group automatically have the privileges granted by the role.
Roles can be one of the [standard roles](#standard-role-assignment) that are provided by default. Alternatively, you can create your own custom roles by choosing from the collection of available [permissions](#permission-types).
On this page, we discuss the concepts of role assignment through APIs. See [Custom administrator roles](https://help.okta.com/okta_help.htm?id=csh-cstm-admin-roles).

## Standard role assignment

### Standard role Types
The following role types are provided and supported:

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

### IAM-based standard role Types
<ApiLifecycle access="ea" />
We also support the following IAM-based standard roles:
| Role type                                                  | Label                               | Permissions                                   |
| :--------------------------------------------------------- | :---------------------------------- | :-------------------------------------------- |
| `ACCESS_CERTIFICATIONS_ADMIN` <ApiLifecycle access="ea" /> | Access Certifications Administrator | `okta.governance.accessCertifications.manage` |
| `ACCESS_REQUESTS_ADMIN`       <ApiLifecycle access="ea" /> | Access Requests Administrator       | `okta.governance.accessRequests.manage`       |
IAM-based standard roles could be assigned using [standard](#standard-role-assignment-steps) or [custom role](#custom-role-assignment) assignment operations.
Similar to other standard roles, these roles are also immutable and can't be updated or deleted.

### Standard Role Assignment steps
Perform standard role assignment in two steps:

1. Assign a role to a user or group. At this point, the admin has the supported privileges of the role over all resources across organization.
2. (Optional) If the role supports targets, use one of the [target operations](/docs/reference/api/roles/#role-target-operations) to indicate which specific resource the admin can manage.

Note that the entities involved in standard role assignment are:

* A role: Identified either by type or ID returned from the [listing API](/docs/reference/api/roles/#list-roles)
* A principal: Either a group or a user
* (Optional) A resource: When using [target operations](/docs/reference/api/roles/#role-target-operations) this can be either an App or a group

## Custom role assignment

Custom roles can be built by piecing [Permissions](/docs/reference/api/roles/#permission-types) together. After a custom role is built, you can use its `id` or `label` to assign to admins. The process is:

1. Build a custom role.
2. Build a set of resources.
3. Bind the admin with the role from step one that targets the resource set from step two.

An assignment of a role to an admin is called a [Binding](/docs/reference/api/roles/#binding-object). Conceptually, a Binding is identified by a unique ID, and represents a single unique combination of principal, resource set, and custom role. A given resource set can have multiple Bindings that allow for different combinations of principals and roles as necessary to grant permission to the encompassing resource.

Therefore, when dealing with custom roles, these three entities always exist:

* A role: Identified by its `label` or `id`
* A principal: Either a group or a user - known as a Member of the Binding
* A resource set: Identified by its `id`

### Custom role Assignment for IAM-based standard roles
<ApiLifecycle access="ea" />
When using IAM-based standard roles the same concepts as custom roles apply with the following distinctions:
1. IAM-based standard roles can only be used with predefined resource sets.
2. For both IAM-based standard roles and resource sets, there is a predefined constant `id`. This `id` is always the `type` of the role or resource set.

| Role id (type)                                          | Applicable Resource Set id (type)    |
| :------------------------------------------------------ | :----------------------------------- |
| `ACCESS_CERTIFICATIONS_ADMIN` <ApiLifecycle access="ea" /> | `ACCESS_CERTIFICATIONS_IAM_POLICY` |
| `ACCESS_REQUESTS_ADMIN`       <ApiLifecycle access="ea" /> | `ACCESS_REQUESTS_IAM_POLICY`       |

### Resource sets

A resource set is simply a collection of resources. There are two types of resource identifiers. Resources can either be identified by an Okta Resource Name (ORN) or by a REST URL format.

#### Okta Resource Name (ORN)

The primary resource identifier is the Okta Resource Name (ORN). ORNs uniquely identify Okta resources.

##### ORN format

ORN identifiers are in the following format:

`orn:${partition}:${service}:${tenantId}:${objectType}:${objectId}`

###### partition

The partition is specific to your Okta environment. The following are the supported partitions:

| Partition               |  ORN partition value  |
| ----------------------- | --------------------- |
| Preview environments    | `oktapreview`         |
| Production environments | `okta`                |

###### service

  The service that the resource belongs to. Each resource belongs to only one service.
  The following are the supported services:

| Service                                 |  ORN service value      |
| --------------------------------------- | ----------------------- |
| Directory                               | `directory`             |
| Identity Provider                       | `idp`                   |
| Workflow                                | `workflow`              |
| Governance <ApiLifecycle access="ea" /> | `governance`            |

###### tenantId

The identifier for the tenant that is using the service. This is typically your [org ID](/docs/reference/api/org/#org-setting-properties).

###### objectType

The object type that is specific to the service. For example, object types `groups` or `users` are used for the `directory` service. For examples of object types, see
[Supported resources](#supported-resources).

###### objectId

The object's identifier. For examples of object identifiers, see [Supported resources](#supported-resources).

###### contained_resources

`contained_resources` is an ORN property that indicates to target all resources within the container resource. For example:

`orn:${partition}:directory:${yourOrgId}:groups:123:contained_resources`

Group 123 is the example container resource. Since `:contained_resources` is specified, the resource includes the users in the group, rather than the group itself.

Not all resources support this property, see [Supported resources](#supported-resources) for container resources.
#### REST URL

If the resource has a corresponding Okta API, you can specify the resource by their REST URL. Use the [ORN format](#orn-format) to specify resources that don't have corresponding Okta APIs.

#### Supported resources

The following are the supported resources.

| Service                 | Resource                                                            |  ORN Identifier                                                               | REST URL                                                                                                                                                |
| :---------------------- | :------------------------------------------------------------------ | :---------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Directory               | All Users                                                           | `orn:${partition}:directory:${yourOrgId}:users`                                       | [`https://${yourOktaDomain}/api/v1/users`](/docs/reference/api/users/#list-users)                                                                       |
|                         | All Groups                                                          | `orn:${partition}:directory:${yourOrgId}:groups`                                      | [`https://${yourOktaDomain}/api/v1/groups`](/docs/reference/api/groups/#list-groups)                                                                    |
|                         | A specific Group                                                    | `orn:${partition}:directory:${yourOrgId}:groups:${groupId}`                           | [`https://${yourOktaDomain}/api/v1/groups/${groupId}`](/docs/reference/api/groups/#get-group)                                                           |
|                         | All Users within a specific Group                                   | `orn:${partition}:directory:${yourOrgId}:groups:${groupId}:contained_resources`       | [`https://${yourOktaDomain}/api/v1/groups/${groupId}/users`](/docs/reference/api/groups/#list-group-members)                                            |
| Identity Provider       | All Apps                                                            | `orn:${partition}:idp:${yourOrgId}:apps`                                              | [`https://${yourOktaDomain}/api/v1/apps`](/docs/reference/api/apps/#list-applications)                                                                  |
|                         | All Apps of a specific type                                         | `orn:${partition}:idp:${yourOrgId}:apps:${appType}`                                   | [`https://${yourOktaDomain}/api/v1/apps/?filter=name+eq+\"${targetAppType}\"`](/docs/reference/api/apps/#list-apps-by-name)                             |
|                         | A specific App                                                      | `orn:${partition}:idp:${yourOrgId}:apps:${appType}:${appId}`                          | [`https://${yourOktaDomain}/api/v1/apps/${appId}`](/docs/reference/api/apps/#get-application)                                                           |
|                         | All authorization servers                                           | `orn:${partition}:idp:${yourOrgId}:authorization_servers`                             | [`https://${yourOktaDomain}/api/v1/authorizationServers`](/docs/reference/api/authorization-servers/#list-authorization-servers)                        |
|                         | A specific authorization server                                     | `orn:${partition}:idp:${yourOrgId}:authorization_servers:${authorizationServerId}`    | [`https://${yourOktaDomain}/api/v1/authorizationServers/${authorizationServerId}`](/docs/reference/api/authorization-servers/#get-authorization-server) |
|                         | All customizations                                                  | `orn:${partition}:idp:${yourOrgId}:customizations`                                    |                                                                                                                                                         |
| Workflows               | All Delegated Flows                                                 | `orn:${partition}:workflow:${yourOrgId}:flows`                                        |                                                                                                                                                         |
|                         | A specific Delegated Flow                                           | `orn:${partition}:workflow:${yourOrgId}:flows:${flowId}`                              |                                                                                                                                                         |
| Governance              | All Access Certifications         <br><ApiLifecycle access="ea" />  | `orn:$partition$:governance:$orgId$:certifications`                                   |                                                                                                                                                         |
|                         | All Access Requests               <br><ApiLifecycle access="ea" />  | `orn:$partition$:governance:$orgId$:requests`                                         |                                                                                                                                                         |
> **Note:** If you use a role with permissions that don't apply to the resources in the resource set, it doesn't affect the admin role. For example, the `okta.users.userprofile.manage` permission gives the admin no privileges if it is granted to a resource set that only includes `https://${yourOktaDomain}/api/v1/groups/${targetGroupId}` resources. If you want the admin to be able to manage the users within the group, the resource set must include the corresponding `https://${yourOktaDomain}/api/v1/groups/${targetGroupId}/users` resource.

> **Note:** Governance resources are currently only supported as part of the [Standard Resource Sets](#standard-resource-sets). You can't use these to create or update other resource sets.

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

### Standard resource sets
<ApiLifecycle access="ea" />
The following resource sets are currently supported out of the box and can be used to assign admins only when used with
their associated roles. Standard resource sets and roles are always identified using their type as `id`.
| Resource Set id/type                                              | Applicable Role id/type    | Resources                                              |
| :---------------------------------------------------------------- | :------------------------- | ------------------------------------------------------ |
| `ACCESS_CERTIFICATIONS_IAM_POLICY` <ApiLifecycle access="ea" /> | `ACCESS_CERTIFICATIONS_ADMIN` | All Users, All Groups, All Apps, All Access Certifications    |
| `ACCESS_REQUESTS_IAM_POLICY`       <ApiLifecycle access="ea" /> | `ACCESS_REQUESTS_ADMIN`       | All Users, All Groups, All Access Requests, Access Request App |
Standard resource sets are managed by Okta only and can't be updated or deleted.

## Custom vs. standard

1. An admin can have both standard role assignments and custom role bindings. Note that privileges granted to an admin are an aggregate of:
    * Standard roles directly assigned
    * Standard roles granted through group membership
    * Custom roles directly assigned
    * Custom roles granted through group membership

    As a result, if an admin was granted a standard role that is limited to a single group, and at the same time received group management privileges on all groups in the org through a custom role, the ultimate outcome is group management on all groups.
2. You can't assign a custom role without a resource set. The custom role is applicable only to a subset of resources. Standard roles on the other hand, are initially granted to the entire org. They are only scoped to specific resources by subsequent invoking of the [target operations](/docs/reference/api/roles/#role-target-operations).

### Permission types

| Permission type                                             | Description                                                                                                                                           | Applicable resource types                    |
| :---------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------- |
| `okta.users.manage`                                         | Allows the admin to create and manage users and read all profile and credential information for users                                                | All Users, all Users within a specific Group |
| `okta.users.create`                                         | Allows the admin to create users. If the admin is also scoped to manage a Group, that admin can add the user to the Group on creation and then manage.| All Groups, a specific Group                 |
| `okta.users.read`                                           | Allows the admin to read any user's profile and credential information                                                                               | All Users, all Users within a specific Group |
| `okta.users.credentials.manage`                             | Allows the admin to manage only credential lifecycle operations for a user                                                                           | All Users, all Users within a specific Group |
| `okta.users.credentials.resetFactors`                       | Allows the admin to reset MFA authenticators for users                                                                                               | All Users, all Users within a specific Group |
| `okta.users.credentials.resetPassword`                      | Allows the admin to reset passwords for users                                                                                                        | All Users, all Users within a specific Group |
| `okta.users.credentials.expirePassword`                     | Allows the admin to expire a user’s password and set a new temporary password                                                                        | All Users, all Users within a specific Group |
| `okta.users.userprofile.manage`                             | Allows the admin to only do operations on the User object, including hidden and sensitive attributes                                                 | All Users, all Users within a specific Group |
| `okta.users.lifecycle.manage`                               | Allows the admin to perform any User lifecycle operations                                                                                            | All Users, all Users within a specific Group |
| `okta.users.lifecycle.activate`                             | Allows the admin to activate user accounts                                                                                                           | All Users, all Users within a specific Group |
| `okta.users.lifecycle.deactivate`                           | Allows the admin to deactivate user accounts                                                                                                         | All Users, all Users within a specific Group |
| `okta.users.lifecycle.suspend`                              | Allows the admin to suspend user access to Okta. When a user is suspended, their user sessions are also cleared.                                      | All Users, all Users within a specific Group |
| `okta.users.lifecycle.unsuspend`                            | Allows the admin to restore user access to Okta                                                                                                      | All Users, all Users within a specific Group |
| `okta.users.lifecycle.delete`                               | Allows the admin to permanently delete user accounts                                                                                                 | All Users, all Users within a specific Group |
| `okta.users.lifecycle.unlock`                               |	Allows the admin to unlock users who are locked out of Okta                                                                                    | All Users, all Users within a specific Group |
| `okta.users.lifecycle.clearSessions`                        | Allows the admin to clear all active Okta sessions and OAuth tokens for a user                                                                       | All Users, all Users within a specific Group |
| `okta.users.groupMembership.manage`                         | Allows the admin to manage a user's group membership (also need `okta.groups.members.manage` to assign to a specific group)                          | All Users, all Users within a specific Group |
| `okta.users.appAssignment.manage`                           | Allows the admin to manage a user's app assignment (also need `okta.apps.assignment.manage` to assign to a specific app)                             | All Users, all Users within a specific Group |
| `okta.groups.manage`                                        | Allows the admin to fully manage groups in your Okta organization                                                                                    | All Groups, a specific Group                 |
| `okta.groups.create`                                        | Allows the admin to create groups                                                                                                                    | All Groups                                   |
| `okta.groups.members.manage`                                | Allows the admin to only manage member operations in a group in your Okta org                                                                        | All Groups, a specific Group                 |
| `okta.groups.read`                                          | Allows the admin to only read information about groups and their members in your Okta organization                                                   | All Groups, a specific Group                 |
| `okta.groups.appAssignment.manage`                          | Allows the admin to manage a group's app assignment (also need `okta.apps.assignment.manage` to assign to a specific app)                            | All Groups, a specific Group                 |
| `okta.apps.read`                                            | Allows the admin to only read information about apps and their members in your Okta organization                                                     | All Apps, All apps of specific type, a specific App |
| `okta.apps.manage`                                          | Allows the admin to fully manage apps and their members in your Okta organization                                                                    | All Apps, All apps of specific type, a specific App |
| `okta.apps.assignment.manage`                               | Allows the admin to only manage assignment operations of an app in your Okta org                                                                     | All Apps, All apps of specific type, a specific App |
| `okta.profilesources.import.run`                            | Allows the admin to run imports for apps with a profile source, such as HRaaS and AD/LDAP apps. Admins with this permission can create users through the import. | All Apps, All apps of specific type, a specific App |
| `okta.authzServers.read`                                    | Allows the admin to read authorization servers                                                                                                      | All authorization servers, a specific authorization server |
| `okta.authzServers.manage`                                  | Allows the admin to manage authorization servers                                                                                                    | All authorization servers, a specific authorization server |
| `okta.customizations.read`                                  | Allows the admin to read customizations                                                                                                             | All customizations |
| `okta.customizations.manage`                                | Allows the admin to manage customizations                                                                                                           | All customizations |
| `okta.workflows.invoke`                                     | Allows the admin to view and run delegated flows                                                                                                    | All Delegated Flows, a specific Delegated Flow |
| `okta.governance.accessCertifications.manage` <br><ApiLifecycle access="ea" />  | Allows the admin to view and manage access certification campaigns                                                                  | All Certifications |
| `okta.governance.accessRequests.manage`  <br><ApiLifecycle access="ea" />  | Allows the admin to view and manage access requests                                                                                       | All Access Requests |
| `okta.apps.manageFirstPartyApps`  <br><ApiLifecycle access="ea" />  | Allows the admin to manage first-party apps                                                                                       | All Access Requests |
> **Note:** Governance permissions are currently only supported as part of the [Standard IAM-based Roles](#iam-based-standard-role-types). You can't use these to create or update other roles.
> **Note:** `okta.apps.manageFirstPartyApps` permission is currently only supported as part of some [Standard IAM-based Roles](/docs/concepts/role-assignment/#iam-based-standard-role-types). You can't use it to create or update other roles.
