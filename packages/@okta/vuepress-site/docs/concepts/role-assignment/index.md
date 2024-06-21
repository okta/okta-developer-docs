---
title: Role Assignment
---

# Role assignment

As a super admin, you can assign admin permissions to principals so they're able to perform tasks and access resources. Principals can be users, groups of users, or client apps. You can assign standard roles, or create custom roles that limit an admin’s access to a subset of permissions and resources.

Role assignment to principals makes them administrators of your org. Principals can be users or groups of users. When a role is assigned to a group, all members of the group automatically have the privileges granted by the role.

Roles can be one of the [standard roles](#standard-role-assignment) that are provided by default. Alternatively, you can create your own custom roles by choosing from the collection of available [permissions](#permission-types).

This page discusses the concepts of role assignment through APIs. See [Custom administrator roles](https://help.okta.com/okta_help.htm?id=ext-cstm-admin-roles).

## Standard role assignment

### Standard role types

The following role types are provided and supported:

| Role type                               | Label                               | Optional targets                      |
| :-------------------------------------- | :---------------------------------- | :------------------------------------ |
| `API_ACCESS_MANAGEMENT_ADMIN`           | API Access Management administrator |                                       |
| `APP_ADMIN`                             | Application administrator           | Apps                                  |
| `GROUP_MEMBERSHIP_ADMIN`                | Group membership administrator      | [Groups](/docs/reference/api/groups/) |
| `HELP_DESK_ADMIN`                       | Help desk administrator             | [Groups](/docs/reference/api/groups/) |
| `MOBILE_ADMIN`                          | Mobile administrator                |                                       |
| `ORG_ADMIN`                             | Organization administrator        |                                       |
| `READ_ONLY_ADMIN`                       | Read-only administrator             |                                       |
| `REPORT_ADMIN`                          | Report administrator                |                                       |
| `SUPER_ADMIN`                           | Super administrator                 |                                       |
| `USER_ADMIN`                            | Group administrator                 | [Groups](/docs/reference/api/groups/) |

### IAM-based standard role Types
<ApiLifecycle access="ea" />

Okta also supports the following IAM-based standard roles:
| Role type                                                  | Label                               | Permissions                                   |
| :--------------------------------------------------------- | :---------------------------------- | :-------------------------------------------- |
| `ACCESS_CERTIFICATIONS_ADMIN` <ApiLifecycle access="ea" /> | Access certifications administrator | `okta.governance.accessCertifications.manage` |
| `ACCESS_REQUESTS_ADMIN`       <ApiLifecycle access="ea" /> | Access requests administrator       | `okta.governance.accessRequests.manage`       |

You can assign IAM-based standard roles using [standard](#standard-role-assignment-steps) or [custom role](#custom-role-assignment) assignment operations. These roles are immutable and can't be updated or deleted.

### Standard Role Assignment steps

Perform a standard role assignment:

1. Assign a role to a user or group. The user now has access to the admin permissions and resources for the role.
2. (Optional) If the role supports targets, use one of the [target operations](/docs/reference/api/roles/#role-target-operations) to indicate which specific resource the admin can manage.

The following are the entities involved in a standard role assignment:

* Role: Identified either by type or ID returned from the [listing API](/docs/reference/api/roles/#list-roles)
* Principal: Either a group or a user
* Resource (optional): When using [target operations](/docs/reference/api/roles/#role-target-operations), the resource can be either an app or a group

## Custom role assignment

You can build custom roles by selecting [Permissions](/docs/reference/api/roles/#permission-types). After a custom role is built, you can use its `id` or `label` to assign to admins:

1. Create a custom role.
2. Create a resource set.
3. Bind the admin with the role from step one that targets the resource set from step two.

An assignment of a role to an admin is called a [Binding](/docs/reference/api/roles/#binding-object), which you can identify by its unique ID. A binding represents a single unique combination of principal, resource set, and custom role. A given resource set can have multiple bindings. The resource allows for different combinations of principals and roles to grant permissions to the encompassing resource.

Therefore, when dealing with custom roles, these three entities always exist:

* Role: Identified by its `label` or `id`
* Principal: Either a group or a user - known as a member of the binding
* Resource set: Identified by its `id`

### Custom role assignment for IAM-based standard roles

<ApiLifecycle access="ea" />

When using IAM-based standard roles the same concepts as custom roles apply with the following distinctions:

* IAM-based standard roles can only be used with predefined resource sets.
* For both IAM-based standard roles and resource sets, there’s a predefined constant `id`. This `id` is always the `type` of the role or resource set.

| Role id (type)                                          | Applicable resource set id (type)    |
| :------------------------------------------------------ | :----------------------------------- |
| `ACCESS_CERTIFICATIONS_ADMIN` <ApiLifecycle access="ea" /> | `ACCESS_CERTIFICATIONS_IAM_POLICY` |
| `ACCESS_REQUESTS_ADMIN`       <ApiLifecycle access="ea" /> | `ACCESS_REQUESTS_IAM_POLICY`       |

### Resource sets

A resource set is simply a collection of resources. There are two types of resource identifiers. Resources can either be identified by an Okta Resource Name (ORN) or by a REST URL format.

#### Okta Resource Name (ORN)

The primary resource identifier is the ORN. ORNs uniquely identify Okta resources.

##### ORN format

ORN identifiers are in the following format:

`orn:{partition}:{service}:{tenantId}:{objectType}:{objectId}`

###### Partitions

The partition is specific to your Okta environment. The following are the supported partitions:

| Partition               |  ORN partition value  |
| ----------------------- | --------------------- |
| Preview environments    | `oktapreview`         |
| Production environments | `okta`                |

###### Service

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

The `contained_resources` ORN property indicates to target all resources within the container resource. For example:

`orn:{partition}:directory:{yourOrgId}:groups:123:contained_resources`

Group 123 is the example container resource. Since `:contained_resources` is specified, the resource includes the users in the group, rather than the group itself.

Not all resources support this property, see [Supported resources](#supported-resources) for container resources.

#### REST URL

If the resource has a corresponding Okta API, you can specify the resource by its REST URL. Use the [ORN format](#orn-format) to specify resources that don't have corresponding Okta APIs.

#### Supported resources

| Service                 | Resource                                                            |  ORN identifier                                                               | REST URL                                                                                                                                                |
| :---------------------- | :------------------------------------------------------------------ | :---------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Directory               | All users                                                           | `orn:{partition}:directory:{yourOrgId}:users`                                       | [`https://{yourOktaDomain}/api/v1/users`](/docs/reference/api/users/#list-users)                                                                       |
|                         | All groups                                                          | `orn:{partition}:directory:{yourOrgId}:groups`                                      | [`https://{yourOktaDomain}/api/v1/groups`](/docs/reference/api/groups/#list-groups)                                                                    |
|                         | A specific group                                                    | `orn:{partition}:directory:{yourOrgId}:groups:{groupId}`                           | [`https://{yourOktaDomain}/api/v1/groups/{groupId}`](/docs/reference/api/groups/#get-group)                                                           |
|                         | All users within a specific group                                   | `orn:{partition}:directory:{yourOrgId}:groups:{groupId}:contained_resources`       | [`https://{yourOktaDomain}/api/v1/groups/{groupId}/users`](/docs/reference/api/groups/#list-group-members)                                            |
|                         | All devices     <br><ApiLifecycle access="ea" />                                                     | `orn:{partition}:directory:{yourOrgId}:devices`                                     | [`https://{yourOktaDomain}/api/v1/devices`](/docs/reference/api/devices)                                            |
| Identity Provider       | All apps                                                            | `orn:{partition}:idp:{yourOrgId}:apps`                                              | [`https://{yourOktaDomain}/api/v1/apps`](/docs/reference/api/apps/#list-applications)                                                                  |
|                         | All apps of a specific type                                         | `orn:{partition}:idp:{yourOrgId}:apps:{appType}`                                   | [`https://{yourOktaDomain}/api/v1/apps/?filter=name+eq+\"{targetAppType}\"`](/docs/reference/api/apps/#list-apps-by-name)                             |
|                         | A specific app                                                      | `orn:{partition}:idp:{yourOrgId}:apps:{appType}:{appId}`                          | [`https://{yourOktaDomain}/api/v1/apps/{appId}`](/docs/reference/api/apps/#get-application)                                                           |
|                         | All authorization servers                                           | `orn:{partition}:idp:{yourOrgId}:authorization_servers`                             | [`https://{yourOktaDomain}/api/v1/authorizationServers`](/docs/reference/api/authorization-servers/#list-authorization-servers)                        |
|                         | A specific authorization server                                     | `orn:{partition}:idp:{yourOrgId}:authorization_servers:{authorizationServerId}`    | [`https://{yourOktaDomain}/api/v1/authorizationServers/{authorizationServerId}`](/docs/reference/api/authorization-servers/#get-authorization-server) |
|                         | All customizations                                                  | `orn:{partition}:idp:{yourOrgId}:customizations`                                    |                                                                                                                                                         |
| Workflows               | All delegated flows                                                 | `orn:{partition}:workflow:{yourOrgId}:flows`                                        |                                                                                                                                                         |
|                         | A specific delegated flow                                           | `orn:{partition}:workflow:{yourOrgId}:flows:{flowId}`                              |                                                                                                                                                         |
| Governance              | All access certifications         <br><ApiLifecycle access="ea" />  | `orn:partition:governance:orgId:certifications`                                   |                                                                                                                                                         |
|                         | All access requests               <br><ApiLifecycle access="ea" />  | `orn:partition:governance:orgId:requests`                                         |                                                                                                                                                         |
> **Note:** If you use a role with permissions that don't apply to the resources in the resource set, it doesn't affect the admin role. For example, the `okta.users.userprofile.manage` permission gives the admin no privileges if it’s granted to a resource set that only includes `https://{yourOktaDomain}/api/v1/groups/{targetGroupId}` resources. If you want the admin to be able to manage the users within the group, the resource set must include the corresponding `https://{yourOktaDomain}/api/v1/groups/{targetGroupId}/users` resource.

> **Note:** Governance resources are currently only supported as part of the [Standard Resource Sets](#standard-resource-sets). You can't use these to create or update other resource sets.

#### Binding member identifiers

To specify binding members, use the REST URL of the corresponding Okta API:

* [A specific user](/docs/reference/api/users/#get-user)

  ```bash
  https://{yourOktaDomain}/api/v1/users/{memberUserId}
  ```

* [A specific group](/docs/reference/api/groups/#get-group)

  ```bash
  https://{yourOktaDomain}/api/v1/groups/{memberGroupId}
  ```

<ApiLifecycle access="ea" />
* [A specific client application](/docs/reference/api/oauth-clients/#get-an-oauth-client)

  ```bash
  https://{yourOktaDomain}/oauth2/v1/clients/{clientId}
  ```

<ApiLifecycle access="ea" />

The following resource sets are currently supported out of the box and can be used to assign admins only when used with
their associated roles. Standard resource sets and roles are always identified using their type as `id`.
| Resource set id/type                                              | Applicable role id/type    | Resources                                              |
| :---------------------------------------------------------------- | :------------------------- | ------------------------------------------------------ |
| `ACCESS_CERTIFICATIONS_IAM_POLICY` <ApiLifecycle access="ea" /> | `ACCESS_CERTIFICATIONS_ADMIN` | All users, all groups, all Apps, all access certifications    |
| `ACCESS_REQUESTS_IAM_POLICY`       <ApiLifecycle access="ea" /> | `ACCESS_REQUESTS_ADMIN`       | all users, all groups, all access requests, access request app |
Standard resource sets are managed by Okta only and can't be updated or deleted.

## Custom vs. standard

* An admin can have both standard role assignments and custom role bindings. Privileges granted to an admin are an aggregate of the following:
  * Standard roles directly assigned
  * Standard roles granted through group membership
  * Custom roles directly assigned
  * Custom roles granted through group membership

  As a result, if an admin was granted a standard role that is limited to a single group, and received group management privileges on all groups in the org through a custom role, the ultimate outcome is group management on all groups.

* You can't assign a custom role without a resource set. The custom role is applicable only to a subset of resources. Standard roles, however, are initially granted to the entire org. You can only scope standard roles to specific resources by invoking [target operations](/docs/reference/api/roles/#role-target-operations).

### Permission types

| Permission type                                             | Description                                                                                                                                           | Applicable resource types                    |
| :---------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------- |
| `okta.users.manage`                                         | Allows the admin to create and manage users and read all profile and credential information for users. Delegated admins with this permission can only manage user credential fields and not the credential values themselves. | All users, all users within a specific group |
| `okta.users.create`                                         | Allows the admin to create users. If the admin is also scoped to manage a group, that admin can add the user to the group on creation and then manage.| All groups, a specific group                 |
| `okta.users.read`                                           | Allows the admin to read any user's profile and credential information. Delegated admins with this permission can only manage user credential fields and not the credential values themselves. | All users, all users within a specific group |
| `okta.users.credentials.manage`                             | Allows the admin to manage only credential lifecycle operations for a user                                                                           | All users, all users within a specific group |
| `okta.users.credentials.resetFactors`                       | Allows the admin to reset MFA authenticators for users                                                                                               | All users, all users within a specific group |
| `okta.users.credentials.resetPassword`                      | Allows the admin to reset passwords for users                                                                                                        | All users, all users within a specific group |
| `okta.users.credentials.expirePassword`                     | Allows the admin to expire a user’s password and set a new temporary password                                                                        | All users, all users within a specific group |
| `okta.users.userprofile.manage`                             | Allows the admin to only do operations on the user object, including hidden and sensitive attributes                                                 | All users, all users within a specific group |
| `okta.users.lifecycle.manage`                               | Allows the admin to perform any user lifecycle operations                                                                                            | All users, all users within a specific group |
| `okta.users.lifecycle.activate`                             | Allows the admin to activate user accounts                                                                                                           | All users, all users within a specific group |
| `okta.users.lifecycle.deactivate`                           | Allows the admin to deactivate user accounts                                                                                                         | All users, all users within a specific group |
| `okta.users.lifecycle.suspend`                              | Allows the admin to suspend user access to Okta. When a user is suspended, their user sessions are also cleared.                                      | All users, all users within a specific group |
| `okta.users.lifecycle.unsuspend`                            | Allows the admin to restore user access to Okta                                                                                                      | All users, all users within a specific group |
| `okta.users.lifecycle.delete`                               | Allows the admin to permanently delete user accounts                                                                                                 | All users, all users within a specific group |
| `okta.users.lifecycle.unlock`                               |	Allows the admin to unlock users who are locked out of Okta                                                                                    | All users, all users within a specific group |
| `okta.users.lifecycle.clearSessions`                        | Allows the admin to clear all active Okta sessions and OAuth tokens for a user                                                                       | All users, all users within a specific group |
| `okta.users.groupMembership.manage`                         | Allows the admin to manage a user's group membership (also need `okta.groups.members.manage` to assign to a specific group)                          | All users, all users within a specific group |
| `okta.users.appAssignment.manage`                           | Allows the admin to manage a user's app assignment (also need `okta.apps.assignment.manage` to assign to a specific app)                             | All users, all users within a specific group |
| `okta.groups.manage`                                        | Allows the admin to fully manage groups in your Okta organization                                                                                    | All groups, a specific group                 |
| `okta.groups.create`                                        | Allows the admin to create groups                                                                                                                    | All groups                                   |
| `okta.groups.members.manage`                                | Allows the admin to only manage member operations in a group in your Okta org                                                                        | All groups, a specific group                 |
| `okta.groups.read`                                          | Allows the admin to only read information about groups and their members in your Okta org                                                  | All groups, a specific group                 |
| `okta.groups.appAssignment.manage`                          | Allows the admin to manage a group's app assignment (also need `okta.apps.assignment.manage` to assign to a specific app)                            | All groups, a specific group                 |
| `okta.apps.read`                                            | Allows the admin to only read information about apps and their members in your Okta org                                                    | All Apps, all apps of a specific type, a specific App |
| `okta.apps.manage`                                          | Allows the admin to fully manage apps and their members in your Okta org                                                                   | All apps, all apps of a specific type, a specific app |
| `okta.apps.assignment.manage`                               | Allows the admin to only manage assignment operations of an app in your Okta org                                                                     | All apps, all apps of a specific type, a specific app |
| `okta.profilesources.import.run`                            | Allows the admin to run imports for apps with a profile source, such as HRaaS and AD/LDAP apps. Admins with this permission can create users through the import. | All apps, all apps of a specific type, a specific app |
| `okta.authzServers.read`                                    | Allows the admin to read authorization servers                                                                                                      | All authorization servers, a specific authorization server |
| `okta.authzServers.manage`                                  | Allows the admin to manage authorization servers                                                                                                    | All authorization servers, a specific authorization server |
| `okta.customizations.read`                                  | Allows the admin to read customizations                                                                                                             | All customizations |
| `okta.customizations.manage`                                | Allows the admin to manage customizations                                                                                                           | All customizations |
| `okta.identityProviders.read` <ApiLifecycle access="ea" />  | Allows the admin to read Identity Providers                                                                                                           | All Identity Providers |
| `okta.identityProviders.manage` <ApiLifecycle access="ea" />  | Allows the admin to manage Identity Providers                                                                                                           | All Identity Providers |
| `okta.workflows.read`                                       | Allows the admin to view delegated flows                                                                                                    | All delegated flows, a specific delegated flow |
| `okta.workflows.invoke`                                     | Allows the admin to view and run delegated flows                                                                                                    | All delegated flows, a specific delegated flow |
| `okta.governance.accessCertifications.manage` <br><ApiLifecycle access="ea" />  | Allows the admin to view and manage access certification campaigns                                                                  | All certifications |
| `okta.governance.accessRequests.manage`  <br><ApiLifecycle access="ea" />  | Allows the admin to view and manage access requests                                                                                       | All access requests |
| `okta.apps.manageFirstPartyApps`  <br><ApiLifecycle access="ea" />  | Allows the admin to manage first-party apps                                                                                       | All Access Requests |
| `okta.devices.manage`  <br><ApiLifecycle access="ea" />  | Allows the admin to manage devices and perform all device lifecycle operations                                                                                       | All devices |
| `okta.devices.lifecycle.manage`  <br><ApiLifecycle access="ea" />  | Allows the admin to perform any device lifecycle operations                                                                                    | All devices |
| `okta.devices.lifecycle.activate` <br><ApiLifecycle access="ea" />                            | Allows the admin to activate devices                                                                                                           | All devices
| `okta.devices.lifecycle.deactivate` <br><ApiLifecycle access="ea" />                          | Allows the admin to deactivate devices. When you deactivate a device, it loses all device user links.                                                                                                        | All devices
| `okta.devices.lifecycle.suspend` <br><ApiLifecycle access="ea" />                             | Allows the admin to suspend device access to Okta                                      | All devices
| `okta.devices.lifecycle.unsuspend` <br><ApiLifecycle access="ea" />                           | Allows the admin to unsuspend and restore device access to Okta                                                                                                      | All devices
| `okta.devices.lifecycle.delete` <br><ApiLifecycle access="ea" />                              | Allows the admin to permanently delete devices                                                                                                 | All devices
| `okta.devices.read` <br><ApiLifecycle access="ea" />                              | Allows the admin to read device details                                                                                                 | All devices |
| `okta.iam.read` | Allows the admin to view roles, resources, and admin assignments                                                                  | All Identity and access management resources |

> **Note:** Governance permissions are currently only supported as part of the [Standard IAM-based Roles](#iam-based-standard-role-types). You can't use these to create or update other roles.

> **Note:** The `okta.apps.manageFirstPartyApps` permission is only supported as part of some [Standard IAM-based Roles](/docs/concepts/role-assignment/#iam-based-standard-role-types). You can't use it to create or update other roles.

> **Note:** The `okta.devices.*` permissions are self-service Early Access. Turn on the **Enable custom admin roles for device permissions** feature from the **Settings** > **Feature** page in the Admin Console to access these permissions. See [Manage Early Access and Beta features](https://help.okta.com/okta_help.htm?id=ext_Manage_Early_Access_features).