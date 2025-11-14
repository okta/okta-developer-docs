The following table details the configurable arguments for the Entitlement resource. These resources in the Okta Terraform provider are used to define and manage entitlements within your Okta org.

| Argument Name   | Description                             | Type         | Required | Example                                      |
| :------------------ | :------------------------------------------------------------------------------------------------------------- | :----------- | :------- | :------------------------------------------- |
| `name`              | The unique name of the entitlement. This is displayed in the Admin Console.                          | `string`     | Yes      | `"Salesforce Read-Only"`                     |
| `description`       | A description of the entitlement, explaining its purpose and scope.                             | `string`     | No       | `"Grants read-only access to Salesforce data."` |
| `app_id`            | The Okta `application ID` of the application to which this entitlement belongs.                                | `string`     | Yes      | `"0oapx123abcXYZ789"`                        |
| `permission_type`   | The type of permission the entitlement represents. Common values are `APP` (application-specific) or `RESOURCE`. | `string`     | Yes      | `"APP"`                                      |
| `resource_name`     | Required if `permission_type` is `RESOURCE`. Specifies the name of the resource that the entitlement applies to.    | `string`     | No       | `"Production Database"`                      |
| `is_hidden`         | If `true`, the entitlement is hidden from end-users in the Okta End-User Dashboard.                       | `boolean`       | No       | `false`                                      |
| `default_assignment`| If `true`, this entitlement is automatically assigned to all users who are assigned to the app.   | `boolean`       | No       | `false`                                      |
