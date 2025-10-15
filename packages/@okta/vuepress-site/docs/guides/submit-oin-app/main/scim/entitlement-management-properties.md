> **Notes**:
    * Entitlement Management is only supported for SCIM-based integrations.
    * The SCIM entitlement management properties section only displays when you select Entitlement Management along with the protocols that your integration supports from the Identity Lifecycle Management section.

| Property |  | Description |
| --- | --- | --- |
| Resource type mapping |
| Resource type * |  | The name of the resource type. For example, Role or License. |
| Endpoint * |  | Endpoints of the entitlement server. For example, /Roles |
| Properties |  | Required - ​​This option makes an entitlement mandatory for user assignment. If an entitlement property is marked as Required, you can’t assign a user to the app without granting at least one entitlement from a category.Multi-valued - This option determines if a user can be assigned multiple entitlements from the same category. |
| Description |  | Description of the entitlement resource type. |
| Schema mapping: Allows mapping the custom SCIM properties to the Okta SCIM URN. |
|  | ID * | The attribute or column name for the ID of the entitlement. For example, roleId. |
|  | Display Name * | The attribute or column name fo the display name of the entitlement. For example, roleName. |
|  | Description | The attribute or column name for the description of the entitlement. For example, roleDesc. This appears in the Governance tab. |

\* Required properties