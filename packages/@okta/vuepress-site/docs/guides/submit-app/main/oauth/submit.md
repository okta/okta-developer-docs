#### OAUTH settings

<ApiLifecycle access="ea" />

#### Register your integration

1. Go to the [OIN Manager](https://oinmanager.okta.com/) and log in with the credentials of the Okta org you will use to build and submit your integration.
1. Click **Add New Submission** or **Edit** an existing submission.
1. On the **OAuth** tab, toggle on **OAUTH Support**.
1. Under **Enable scopes**, click **Add Another**.
1. Enter the name of a scope you would like to request from Okta admins. A scope corresponds to a resource you would like to access in the Okta API (users, logs, etc) and a level of access (read or manage). [A full list of scopes is here](/docs/guides/implement-oauth-for-okta/main/). The sections below have more information about scopes.
1. Repeat steps 4 and 5 above for each scope you would like to access.

#### Selecting scopes

There are two types of scope: read and manage. Read scopes can only view resources, while manage scopes can read, create, update, and delete resources. Because manage scopes include read access, if you do not need to request a read scope in addition to a manage scope.

| Action    | Read scopes           | Manage scopes   |
| ----------- | -------------- | ------------- |
| Read | Yes | Yes |
| Create | No | Yes |
| Update | No | Yes |
| Delete | No | Yes |
