1. Specify the following properties if you want to integrate Entitlement Management:

    > **Notes:**
    > * Entitlement Management is only supported for SCIM-based integrations.
    > * The SCIM entitlement management properties section only displays when you select **Entitlement Management** along with the protocols that your integration supports from the **Identity Lifecycle Management** section.

    | Property | Description |
    | --- | --- |
    | Resource type mapping | |
    | Resource type * | The name of the resource type. For example, Role or License. |
    | Endpoint * | Endpoint of the entitlement server. For example, /Roles |
    | Properties | <ul> <li>Required - This option makes an entitlement mandatory for user assignment. If an entitlement property is marked as Required, you can’t assign a user to the app without granting at least one entitlement from a category.</li><li>Multi-valued - This option determines if a user can be assigned multiple entitlements from the same category.</li></ul> |
    | Description | Description of the entitlement resource type. |
    | Schema mapping: Allows mapping the custom SCIM properties to the Okta SCIM URN. |  |
    | ID `*`| The attribute or column name for the ID of the entitlement. This appears as the **Value Name** field in the **Governance** tab. For example, `roleId`. |
    | Display Name `*` | The attribute or column name for the display name of the entitlement. This appears as the **Display Name** field in the **Governance** tab. For example, `roleName`. |
    | Description | The attribute or column name for the description of the entitlement. For example, `roleDesc`.  This appears as the **Description** field in the **Governance** tab. |

    `*` Required properties

1. Click **+ Add another** to add another resource type.
1. If you need to delete a resource type, click the delete icon

    ![trash can; delete icon](/img/icons/odyssey/delete.svg) next to it.
