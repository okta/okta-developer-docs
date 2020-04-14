# ASA Models

The ASA uses a variety of objects in its API. The schemas are listed below

##  Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
## AuditEventV2Schema Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
| list   | array | The list of audit events. |
| related_objects   | object | All objects related to the audit events. |
## Client Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
| description   | string | A description of the client. |
| encrypted   | boolean | A boolean reflecting whether sft was able to determine that the client was encrypted. |
| hostname   | string | The hostname of the client. |
| id   | string | The UUID of the client. |
| os   | string | The OS of the client device. |
| state   | string | The state of the client. One of: `ACTIVE`, `PENDING`, or `DELETED`. |
| user_name   | string | The user to whom this client belongs. |
## ClientUpdateRequest Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
| state   | string | The state of the client. One of: `ACTIVE`, `PENDING`, or `DELETED`. |
| user_name   | string | The user to whom this client belongs. |
## EntitlementSudo Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
| add_env   | array | A list of env vars to include when running these commands (see https://www.sudo.ws/man/1.8.13/sudoers.man.html#Command_environment for more info). |
| description   | string | A description of the entitlement. |
| name   | string | A name for the entitlement. |
| opt_no_exec   | boolean | Whether to allow commands to execute child processes. |
| opt_no_passwd   | boolean | Whether or not to require a password when sudo is run (should generally not be used, as ASA accounts do not require a password). |
| opt_run_as   | string | A non-root user to run commands as. |
| opt_set_env   | boolean | Whether to allow overriding environment variables to commands. |
| structured_commands   | array | A list of commands to allow. |
| sub_env   | array | A list of env vars to ignore when running these commands (see https://www.sudo.ws/man/1.8.13/sudoers.man.html#Command_environment for more info) |
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
## Project Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
| create_server_users   | boolean | (Optional) Whether or not to create server users for users in this project. Defaults to `False`. If left false, the user is responsible for ensuring that users matching the server user names in ScaleFT exist on the server. |
| force_shared_ssh_users   | boolean | (Optional) If true, new server users will not be created for each user in the project. Instead they will share a single standard user and a single admin user. Defaults to `False`. |
| forward_traffic   | boolean | Whether or not to require all traffic in project to be forwarded through selected gateways. Defaults to `False`. |
| name   | string | The name of the project. |
| rdp_session_recording   | boolean | Whether or not to enable rdp recording on all servers in this project. Defaults to `False`. |
| require_preauth_for_creds   | boolean | (Optional) Whether or not to require preauthorization before a user can retrieve credentials to log in. Defaults to `False`. |
| shared_admin_user_name   | string | (Optional) The name for a shared admin user on servers in this project. If `force_shared_ssh_users` is `True`, this must be provided. |
| shared_standard_user_name   | string | (Optional) The name for a shared standard user on servers in this project. If `force_shared_ssh_users` is `True`, this must be provided. |
| ssh_session_recording   | boolean | Whether or not to enable ssh recording on all servers in this project. Defaults to `False`. |
## ProjectUpdate Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
| create_server_users   | boolean | (Optional) Whether or not to create server users for users in this project. Defaults to `False`. If left false, the user is responsible for ensuring that users matching the server user names in ScaleFT exist on the server. |
| forward_traffic   | boolean | (Optional) Whether or not to require all traffic in project to be forwarded through selected gateways. Defaults to `False`. |
| rdp_session_recording   | boolean | (Optional) Whether or not to enable RDP recording on all servers in this project. Defaults to `False`. |
| require_preauth_for_creds   | boolean | (Optional) Whether or not to require preauthorization before a user can retrieve credentials to log in. Defaults to `False`. |
| ssh_session_recording   | boolean | (Optional) Whether or not to enable SSH recording on all servers in this project. Defaults to `False`. |
## TeamGroupAttribute Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
| attribute_name   | string | One of: unix_group_name, unix_gid, windows_group_name |
| attribute_value   | object | The value of the attribute. Must be an integer for gid, a string for any other attribute type |
| id   | string | The unique identifier for the attribute. |
| managed   | boolean | Whether or not this attribute is being managed via SCIM or SAML. |
## TeamSettings Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
| approve_device_without_interaction   | boolean | If enabled, ASA with auto-approve devices for users authenticated into this team. |
| client_session_duration   | integer | Configure client session to be between 1 hour and 25 hours. |
| post_device_enrollment_url   | string | If configured, the URL a user will be directed to after enrolling a device in ASA. |
| post_login_url   | string | If configured, this is the URL a user who has not recently been authenticated will be directed to after being validated by their IDP in the course of getting credentials. |
| reactivate_users_via_idp   | boolean | If a disabled or deleted user is able to authenticate via the IDP, their ASA user will be re-enabled. |
| web_session_duration   | integer | Configure web session to be between 30 minutes and 25 hours. |
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
## User Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
| details   | object | An object with the following keys, the values of which are all strings: `first_name`, `last_name`, `full_name`, `email`. |
| name   | string | The name of the user. |
| status   | integer | One of `ACTIVE`, `DISABLED`, or `DELETED`. User cannot disable or delete their own user. |
## any Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
## custom Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
## directory Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
## executable Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
## gateway-agent Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
## gecos_field Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
## none Object

The  model defines several properties:

| Property | Type        | Description          |
|----------|-------------|----------------------|
## raw Object

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
