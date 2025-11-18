1. Specify the following properties if you want to integrate Entitlement Management:

    > **Notes:**
    > * Entitlement Management is only supported for SCIM and is currently available as an early access feature.
    > * The **SCIM Entitlement Management properties** section only appears when you select **Entitlement Management** from the **Identity Lifecycle Management** section. This selection must be made along with the protocols that your integration supports.

    | Property | Description |
    | --- | --- |
    | Resource type mapping | |
    | Resource type * | The name of the resource type. For example, Role or License. |
    | Endpoint * | Endpoint of the entitlement server. For example, /Roles. |
    | Properties | <ul> <li>Required: This option makes an entitlement mandatory for user assignment. If an entitlement property is required, you can’t assign a user to the app without granting at least one entitlement from a category.</li><li>Multi-valued: This option determines if a user can be assigned multiple entitlements from the same category.</li></ul> |
    | Description | Description of the entitlement resource type. |
    | Schema mapping: Allows mapping the custom SCIM properties to the Okta SCIM URN. |  |
    | ID `*`| The attribute or column name for the ID of the entitlement. This appears as the **Value Name** field on the **Governance** tab. For example, `roleId`. |
    | Display Name `*` | The attribute or column name for the display name of the entitlement. This appears as the **Display Name** field on the **Governance** tab. For example, `roleName`. |
    | Description | The attribute or column name for the description of the entitlement. For example, `roleDesc`.  This appears as the **Description** field on the **Governance** tab. |

    `*` Required properties

1. Click **+ Add another** to add another resource type.
1. To delete a resource type, click the delete icon <span style="height: 12px;display:inline-block;    transform:translateY(-12px);">![trash can; delete icon](/img/icons/odyssey/delete.svg)</span>.