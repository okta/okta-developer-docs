# ASA Models

The ASA uses a variety of objects in its API. The schemas are listed below


## APIServerUser Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `admin`   | boolean | True if Server User has sudo. |
| `id`   | string | UUID of Server User API object. |
| `server_user_name`   | string | The username that will be realized on Unix servers. |
| `status`   | string | Status of the User. |
| `type`   | string | Whether this is a service or human user. |
| `unix_gid`   | integer | Unix GID of the Server User. |
| `unix_uid`   | integer | Unix UID of the Server User. |
| `user_name`   | string | The username. |
| `windows_server_user_name`   | string | The username that will be realized on Windows servers. |

## AuditEventV2Schema Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `list`   | array | The list of audit events. |
| `related_objects`   | object | All objects related to the audit events. |

## AuthTokenResponse Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `bearer_token`   | string | The JSON Web Token used to authenticate against the ASA API. |
| `expires_at`   | string | The time at which the token expires, formatted with ISO 8601. |
| `team_name`   | string | The name of the Team this token is for. |

## Client Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `description`   | string | A description of the client. |
| `encrypted`   | boolean | A boolean reflecting whether sft was able to determine that the client was encrypted. |
| `hostname`   | string | The hostname of the client. |
| `id`   | string | The UUID of the client. |
| `os`   | string | The OS of the client device. |
| `state`   | string | The state of the client. One of: `ACTIVE`, `PENDING`, or `DELETED`. |
| `user_name`   | string | The user to whom this client belongs. |

## ClientConfigOption Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `config_key`   | string | The Client Configuration Option to change. |
| `config_value`   | object | The value to be applied to Clients' configurations. |
| `id`   | string | The UUID of the Client Configuration Option. |

## ClientUpdateRequest Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `state`   | string | The state of the client. One of: `ACTIVE`, `PENDING`, or `DELETED`. |
| `user_name`   | string | The user to whom this client belongs. |

## CreateServerBody Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `access_address`   | string | The access address of the Server. |
| `alt_names`   | array | (Optional) Alternative names of the Server. |
| `hostname`   | string | The hostname of the Server. |

## CreateServiceUserBody Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `name`   | string | The name of the Service User. |

## EntitlementSudo Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `add_env`   | array | A list of env vars to include when running these commands (see https://www.sudo.ws/man/1.8.13/sudoers.man.html#Command_environment for more info). |
| `description`   | string | A description of the entitlement. |
| `name`   | string | A name for the entitlement. |
| `opt_no_exec`   | boolean | Whether to allow commands to execute child processes. |
| `opt_no_passwd`   | boolean | Whether or not to require a password when sudo is run (should generally not be used, as ASA accounts do not require a password). |
| `opt_run_as`   | string | A non-root user to run commands as. |
| `opt_set_env`   | boolean | Whether to allow overriding environment variables to commands. |
| `structured_commands`   | array | A list of commands to allow. |
| `sub_env`   | array | A list of env vars to ignore when running these commands (see https://www.sudo.ws/man/1.8.13/sudoers.man.html#Command_environment for more info) |

## Group Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `federated_from_team`   | string | (Optional) The name of the team from which to federate the group. |
| `name`   | string | The name of the group. |
| `roles`   | array | A list of roles for the group. Options are access_user, access_admin and reporting_user. |

## GroupUpdate Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `roles`   | array | A list of roles for the group. Options are `access_user`, `access_admin` and `reporting_user`. |

## IssueServiceTokenRequestBody Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `key_id`   | string | The ID of the API key. |
| `key_secret`   | string | The secret associated with the API key. |

## Project Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `create_server_users`   | boolean | (Optional) Whether or not to create server users for users in this project. Defaults to `False`. If left false, the user is responsible for ensuring that users matching the server user names in ASA exist on the server. |
| `force_shared_ssh_users`   | boolean | (Optional) If true, new server users will not be created for each user in the project. Instead they will share a single standard user and a single admin user. Defaults to `False`. |
| `forward_traffic`   | boolean | Whether or not to require all traffic in project to be forwarded through selected gateways. Defaults to `False`. |
| `name`   | string | The name of the project. |
| `rdp_session_recording`   | boolean | Whether or not to enable rdp recording on all servers in this project. Defaults to `False`. |
| `require_preauth_for_creds`   | boolean | (Optional) Whether or not to require preauthorization before a user can retrieve credentials to log in. Defaults to `False`. |
| `shared_admin_user_name`   | string | (Optional) The name for a shared admin user on servers in this project. If `force_shared_ssh_users` is `True`, this must be provided. |
| `shared_standard_user_name`   | string | (Optional) The name for a shared standard user on servers in this project. If `force_shared_ssh_users` is `True`, this must be provided. |
| `ssh_session_recording`   | boolean | Whether or not to enable ssh recording on all servers in this project. Defaults to `False`. |

## ProjectCloudAccount Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `account_id`   | string | The provider-specific account ID. |
| `description`   | string | (optional) Human readable description of the account. |
| `id`   | string | UUID of the Cloud Account. |
| `provider`   | string | A provider. For now, only accepts `aws` or `gce`, case sensitive. |

## ProjectGroup Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `create_server_group`   | boolean | True if the Group is being created on the Project servers. |
| `deleted_at`   | string | Time of removal from the Project. Null if not removed. |
| `group_id`   | string | The UUID that corresponds to the Group. |
| `name`   | string | The name of the Group. |
| `server_access`   | boolean | True if the Group has access to the Project servers. |
| `server_admin`   | boolean | True if the Group has admin on the Project servers. |
| `server_group_name`   | string | If create_server_group is true, the name of the Group on the server. |
| `unix_gid`   | integer | If create_server_group is true, the GID of the Group created. |

## ProjectGroupWithProfileAttributes Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `create_server_group`   | boolean | True if the Group is being created on the Project servers. |
| `deleted_at`   | string | Time of removal from the project. Null if not removed. |
| `group_id`   | string | The UUID that corresponds to the Group. |
| `name`   | string | The name of the Group. |
| `profile_attributes`   | string | If create_server_group is true, the attributes that will be synced to the server. |
| `server_access`   | boolean | True if the Group has access to the Project servers. |
| `server_admin`   | boolean | True if the Group has admin on the Project servers. |
| `server_group_name`   | string | If create_server_group is true, the name of the Group on the server. |
| `unix_gid`   | integer | If create_server_group is true, the GID of the Group created. |

## ProjectUpdate Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `create_server_users`   | boolean | (Optional) Whether or not to create server users for users in this project. Defaults to `False`. If left false, the user is responsible for ensuring that users matching the server user names in ASA exist on the server. |
| `forward_traffic`   | boolean | (Optional) Whether or not to require all traffic in project to be forwarded through selected gateways. Defaults to `False`. |
| `rdp_session_recording`   | boolean | (Optional) Whether or not to enable RDP recording on all servers in this project. Defaults to `False`. |
| `require_preauth_for_creds`   | boolean | (Optional) Whether or not to require preauthorization before a user can retrieve credentials to log in. Defaults to `False`. |
| `ssh_session_recording`   | boolean | (Optional) Whether or not to enable SSH recording on all servers in this project. Defaults to `False`. |

## Server Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `alt_names`   | array | Any alternative hostnames of the Server. |
| `bastion`   | string | Specifies the bastion-host Clients will automatically use when connecting to this host. |
| `canonical_name`   | string | Specifies the name Clients should use/see when connecting to this host. Overrides the name found with hostname. |
| `cloud_provider`   | string | The cloud provider of the Server, if one exists. |
| `deleted_at`   | string | The time the Server was deleted from the Project. |
| `hostname`   | string | The hostname of the Server. |
| `id`   | string | The UUID corresponding to the Server. |
| `instance_details`   | object | Information the cloud provider provides of the Server, if one exists. |
| `last_seen`   | string | The last time the Server made a request to the ASA platform. |
| `managed`   | boolean | True if the Server is managed by SFTD. Unmanaged Servers are used in configurations where users may have a bastion, for example, that they don't want/can't connect to through SFTD. With an Unmanaged Server record to represent this box, ASA will know it exists and to use it as a bastion hop. |
| `os`   | string | The particular OS of the Server. |
| `os_type`   | string | Can either be Linux or Windows. |
| `project_name`   | string | The Project that the Server belongs to. |
| `registered_at`   | string | The time the Server was registered to the Project. |
| `services`   | array | Can either be ssh or rdp. |
| `sftd_version`   | string | The version of SFTD the Server is running. |
| `ssh_host_keys`   | array | The host keys used to authenticate the Server. |
| `state`   | string | Can be either `ACTIVE` or `INACTIVE`. |
| `team_name`   | string | The name of the Team. |

## ServerEnrollmentToken Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `created_by_user`   | string | The User that created the Server Enrollment Token. |
| `description`   | string | A description of why this Server Enrollment Token was created. |
| `id`   | string | The UUID that corresponds to the Server Enrollment Token. |
| `issued_at`   | string | Time of creation. |
| `token`   | object | A token used to enroll a server. |

## ServiceUserKey Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `expires_at`   | string | The expiration time of the key. |
| `id`   | string | The UUID of the API key |
| `issued_at`   | string | The time at which the key was issued. |
| `last_used`   | string | The last time the key was used against Advanced Server Access. |

## ServiceUserKeyWithSecret Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `expires_at`   | string | The expiration time of the key. |
| `id`   | string | The UUID of the API key |
| `issued_at`   | string | The time at which the key was issued. |
| `last_used`   | string | The last time the key was used against Advanced Server Access. |
| `secret`   | string | The secret of the API key. This is used to authenticate the Service User. Do not share. |

## TeamGroupAttribute Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `attribute_name`   | string | One of: `unix_group_name`, `unix_gid`, `windows_group_name`. |
| `attribute_value`   | object | The value of the attribute. Must be an integer for gid, a string for any other attribute type. |
| `id`   | string | The unique identifier for the attribute. |
| `managed`   | boolean | Whether or not this attribute is being managed via SCIM or SAML. |

## TeamSettings Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `approve_device_without_interaction`   | boolean | If enabled, ASA with auto-approve devices for users authenticated into this team. |
| `client_session_duration`   | integer | Configure client session to be between 1 hour and 25 hours. |
| `post_device_enrollment_url`   | string | If configured, the URL a user will be directed to after enrolling a device in ASA. |
| `post_login_url`   | string | If configured, this is the URL a user who has not recently been authenticated will be directed to after being validated by their IDP in the course of getting credentials. |
| `reactivate_users_via_idp`   | boolean | If a disabled or deleted user is able to authenticate via the IDP, their ASA user will be re-enabled. |
| `web_session_duration`   | integer | Configure web session to be between 30 minutes and 25 hours. |

## TeamUserAttribute Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `attribute_name`   | string | One of: `unix_user_name`, `unix_uid`, `unix_gid`, `windows_user_name`. |
| `attribute_value`   | object | The value of the attribute. Must be an integer for uid/gid, a string for any other attribute type. |
| `id`   | string | The unique identifier for the attribute. |
| `managed`   | boolean | Whether or not this attribute is being managed via SCIM or SAML. |

## UpdateAttribute Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `attribute_name`   | string | One of: `unix_group_name`, `unix_gid`, `windows_group_name`. |
| `attribute_value`   | object | The value of the attribute. Must be an integer for gid, a string for any other attribute type. |

## UpdateGroupAttribute Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `attribute_name`   | string | Accepted names include unix_group_name, windows_group_name, and unix_gid. |
| `attribute_value`   | object | Accepted values are 0 to 255, 0 to 255, and 100 to 2147483647, respectively. |

## User Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `details`   | object | An object with the following keys, the values of which are all strings: `first_name`, `last_name`, `full_name`, `email`. |
| `name`   | string | The name of the user. |
| `status`   | integer | One of `ACTIVE`, `DISABLED`, or `DELETED`. User cannot disable or delete their own user. |

## any Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|

## aws Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `public_ip_v4`   | string | IP Address |

## azure Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `external_ip_v4`   | string | IP Address |
| `internal_ip_v4`   | string | IP Address |

## custom Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|

## directory Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|

## executable Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|

## forward_client_trust.enable Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|

## gateway-agent Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|

## gce Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|
| `external_ip`   | string | IP Address |
| `internal_ip`   | string | IP Address |

## gecos_field Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|

## none Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|

## raw Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|

## ssh.insecure_forward_agent Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|

## ssh.port_forward_method Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|

## unix_gid Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|

## unix_group_name Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|

## unix_uid Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|

## unix_user_name Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|

## user_home_dir Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|

## user_shell Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|

## windows_group_name Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|

## windows_user_name Object

The  model defines several properties:

| Parameter | Type        | Description          |
|----------|-------------|----------------------|
