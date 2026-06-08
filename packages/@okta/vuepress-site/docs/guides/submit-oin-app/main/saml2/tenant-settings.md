#### Tenant settings

Configure integration variables if your URLs are dynamic for each tenant. The variables are for your customer admins to add their specific tenant setting values during installation. See [Dynamic properties with Okta Expression Language](#dynamic-properties-with-okta-expression-language).

2. In the **Tenant settings** section, specify the name and label for each tenant setting variable:

    | <div style="width:100px">Property</div> | Description  |
    | --------------- | ------------ |
    | **Label** `*`  | The tenant setting label that's displayed when admins install your app integration. For example: `Subdomain` or `Tenant name` |
     | **Name** `*`  | Specify the tenant setting variable name. This variable name is used to construct dynamic URLs or other app properties that are dependent on the tenant. It's hidden from admins and is only used to pass tenant details to your external app.<br>String is the only variable type supported.<br>**Note:** Use alphanumeric lowercase and underscore characters for the variable name field. The first character must be a letter and the maximum field length is 1024 characters. For example: `subdomain_div1` |

     `*` This section is optional, but if you specify a variable, both `Label` and `Name` properties are required.

1. Click **+ Add another** to add another variable. You can add up to eight variables.

   > **Note:**  Apps that are migrated from the OIN Manager and that have more than eight variables can retain those variables, but you can't add new ones. However, you can update or delete the existing variables.

1. If you need to delete a variable, click the delete icon (![trash can; delete icon](/img/icons/odyssey/delete.svg)) next to it.
<!--Odyssey icons sourced from: https://github.com/okta/odyssey/blob/main/packages/odyssey-icons/src/figma.generated/ -->