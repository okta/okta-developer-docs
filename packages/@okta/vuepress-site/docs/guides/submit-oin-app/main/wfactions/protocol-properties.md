| <div style="width:150px">Property</div> | Description  |
| ----------------- | ------------ |
| **User query** `*` | Flows that allow Okta to read and import users from your app |
| List users | Specify the flow to list users. |
| Get user by ID | Specify the flow to retrieve a user by their ID. |
| Get user by username | Specify the flow to retrieve a user by their username. |
| **User schema discovery** `*` | Flows that allow Okta to retrieve your app's user schema and the available attribute values |
| List user schema | Specify the flow to list your user schema. |
| List user schema property values | Specify the flow to list your user schema and the available attribute values.        |
| **User operations** | Flows that define the user lifecycle management actions that Okta can perform in your app. Each user operation is optional. You can specify a subset of these operations. |
| Create user (Optional) | Specify the flow for Okta to create a user in your app. |
| Update user (Optional) | Specify the flow for Okta to update a user in your app. |
| Update user password (Optional) | Specify the flow for Okta to update a user password in your app. |
| Activate user (Optional) | Specify the flow for Okta to activate a user in your app. |
| Deactivate user (Optional) | Specify the flow for Okta to deactivate a user in your app. |
| **Group query** `*` | Flows that allow Okta to read and import groups from your app |
| List groups | Specify the flow to list the groups in your app. |
| Get group by ID | Specify the flow to retrieve a group by their ID. |
| **Group operations** | Flows that allows Okta to read and manage groups in your app |
| Enable group operations | Enable group operations. You must specify flows for all group operations if you enable this feature. |
| List groups by display name | Specify the flow to list groups in your app based on the group display name. |
| Create group  | Specify the flow to create a group in your app. |
| Update group  | Specify the flow to update a group in your app. |
| Remove group  | Specify the flow to remove a group in your app. |
| **Group Membership** | Flows that allows Okta to read and manage group memberships in your app |
| Enable group membership | Enable group membership operations. You must specify flows for all group membership operations if you enable this feature. |
| List group members | Specify the flow to list group members in your app. |
| Add group members | Specify the flow to add members to a group in your app. |
| Remove group members | Specify the flow to remove members from a group in your app. |

`*` Required properties
