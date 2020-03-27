# ASA Models

The ASA uses a variety of objects in its API. The schemas are listed below

## APIServerUser Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
## AuthTokenResponse Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
## Client Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
| description   | string | A description of the client. |
| encrypted   | boolean | A boolean reflecting whether sft was able to determine that the client was encrypted. |
| hostname   | string | The hostname of the client. |
| id   | string | The uuid of the client. |
| os   | string | The OS of the client device. |
| state   | string | The state of the client. One of: ACTIVE, PENDING, or DELETED. |
| user_name   | string | The user to whom this client belongs. |
## ClientConfigOption Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
## ClientUpdateRequest Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
| state   | string | The state of the client. One of: ACTIVE, PENDING, or DELETED. |
| user_name   | string | The user to whom this client belongs. |
## CreateServerBody Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
## GatewayAgent Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
| description   | string | (Optional) The description of the gateway |
| id   | string | The id of the gateway. |
| labels   | object | The labels associated with the gateway, used by projects to select gateways |
| name   | string | The name for the gateway. |
| refuse_connections   | boolean | (Optional) Whether or not the gateway should refuse (new?) connections. Defaults to `False`. |
## GatewayAgentPolicyDetails Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
| labels   | object | (Optional) Gateway labels |
## GatewayStatusReport Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
| active_connections   | integer | The number of clients that are actively connected to the gateway |
| gateway_id   | string | The gateway id for the status report. |
| status   | string | The status of the gateway |
| total_storage_bytes   | integer | The total amount in bytes of storage space that can be used by the gateway |
| used_storage_bytes   | integer | The amount in bytes of storage space being used by the gateway |
## Group Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
| federated_from_team   | string | (Optional) The name of the team from which to federate the group. |
| name   | string | The name of the group. |
| roles   | array | A list of roles for the group. Options are access_user, access_admin and reporting_user. |
## GroupUpdate Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
| roles   | array | A list of roles for the group. Options are `access_user`, `access_admin` and `reporting_user`. |
## IssueServiceTokenRequestBody Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
## Project Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
| create_server_users   | boolean | (Optional) Whether or not to create server users for users in this project. Defaults to `False`. If left false, the user is responsible for ensuring that users matching the server user names in ScaleFT exist on the server. |
| force_shared_ssh_users   | boolean | (Optional) If true, new server users will not be created for each user in the project. Instead they will share a single standard user and a single admin user. Defaults to `False`. |
| name   | string | The name of the project. |
| require_preauth_for_creds   | boolean | (Optional) Whether or not to require preauthorization before a user can retrieve credentials to log in. Defaults to `False`. |
| shared_admin_user_name   | string | (Optional) The name for a shared admin user on servers in this project. If `force_shared_ssh_users` is `True`, this must be provided. |
| shared_standard_user_name   | string | (Optional) The name for a shared standard user on servers in this project. If `force_shared_ssh_users` is `True`, this must be provided. |
## ProjectCloudAccount Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
## ProjectGroup Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
| group   | string | Add the group with this name to the project. |
| server_access   | boolean | Whether users in this group have access permissions on the servers in this project. |
| server_admin   | boolean | Whether users in this group have sudo permissions on the servers in this project. |
## ProjectServerGroup Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
## ProjectUpdate Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
| create_server_users   | boolean | (Optional) Whether or not to create server users for users in this project. Defaults to `False`. If left false, the user is responsible for ensuring that users matching the server user names in ScaleFT exist on the server. |
| require_preauth_for_creds   | boolean | (Optional) Whether or not to require preauthorization before a user can retrieve credentials to log in. Defaults to `False`. |
## RegistrationPolicy Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
| description   | string | (Optional) The description for this registration policy. |
| details   | object | (Optional) Details . |
| external_id   | string | (Optional) The external id for this policy.  |
| id   | string | The id for this registration policy. |
## ServerEnrollmentToken Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
## TeamGroupAttribute Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
| attribute_name   | string | One of: unix_group_name, unix_gid, windows_group_name |
| attribute_value   | object | The value of the attribute. Must be an integer for gid, a string for any other attribute type |
| id   | string | The unique identifier for the attribute. |
| managed   | boolean | Whether or not this attribute is being managed via SCIM or SAML. |
## TeamUserAttribute Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
| attribute_name   | string | One of: unix_user_name, unix_uid, unix_gid, windows_user_name |
| attribute_value   | object | The value of the attribute. Must be an integer for uid/gid, a string for any other attribute type |
| id   | string | The unique identifier for the attribute. |
| managed   | boolean | Whether or not this attribute is being managed via SCIM or SAML. |
## UpdateAttribute Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
| attribute_name   | string | One of: unix_group_name, unix_gid, windows_group_name |
| attribute_value   | object | The value of the attribute. Must be an integer for gid, a string for any other attribute type |
## UpdateGroupAttribute Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
| attribute_name   | string | Accepted names include unix_group_name, windows_group_name, and unix_gid |
| attribute_value   | object | Accepted values are 0 to 255, 0 to 255, and 100 to 2147483647, respectively |
## UpdateServerBody Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
## User Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
| details   | object | An object with the following keys, the values of which are all strings: `first_name`, `last_name`, `full_name`, `email`. |
| name   | string | The name of the user. |
| status   | integer | One of `ACTIVE`, `DISABLED`, or `DELETED`. User cannot disable or delete their own user. |
## gateway-agent Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
## gecos_field Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
## unix_gid Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
## unix_group_name Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
## unix_uid Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
## unix_user_name Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
## user_home_dir Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
## user_shell Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
## windows_group_name Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
## windows_user_name Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
