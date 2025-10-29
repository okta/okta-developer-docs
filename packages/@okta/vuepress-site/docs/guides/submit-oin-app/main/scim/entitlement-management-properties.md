| Property |  | Description |
| --- | --- | --- |
| Resource type mapping |
| Resource type * |  | The name of the resource type. For example, Role or License. |
| Endpoint * |  | Endpoint of the entitlement server. For example, /Roles |
| Properties |  | <br> <ul><li>Required - ​​This option makes an entitlement mandatory for user assignment. If an entitlement property is marked as Required, you can’t assign a user to the app without granting at least one entitlement from a category. <br> <ul><li>Multi-valued - This option determines if a user can be assigned multiple entitlements from the same category.</br> |
| Description |  | Description of the entitlement resource type. |
| Schema mapping: Allows mapping the custom SCIM properties to the Okta SCIM URN. |
|  | ID `*`| The attribute or column name for the ID of the entitlement. This appears as the **Value Name** field in the **Governance** tab. For example, `roleId`. |
|  | Display Name `*` | The attribute or column name for the display name of the entitlement. This appears as the **Display Name** field in the **Governance** tab. For example, `roleName`. |
|  | Description | The attribute or column name for the description of the entitlement. For example, `roleDesc`.  This appears as the **Description** field in the **Governance** tab. |

`*` Required properties