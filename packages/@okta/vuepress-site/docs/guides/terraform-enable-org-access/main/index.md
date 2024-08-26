---
title: Enable Terraform access for your Okta org
excerpt: Create an Okta application and credentials that Terraform uses to manage the objects in your organization.
layout: Guides
---

Create an Okta application and credentials that Terraform uses to manage the objects in your organization.

---

#### Learning outcomes

* Authorize Terraform to automate your Okta org.
* Create the authorization credentials used by Terraform.
* Test Terraform access to your org.

#### What you need

* Familiarity with Terraform terms: configuration, resources, state, and commands. See [Terraform overview](/docs/guides/terraform-overview).
* [Okta Developer Edition organization](https://developer.okta.com/signup)
* [Super admin permissions](https://help.okta.com/okta_help.htm?id=ext_superadmin)
* [OpenSSL command line program](https://github.com/openssl/openssl#download). Some operating systems already include `openssl` or `openssl-rsa`.
* [A Terraform installation](https://www.terraform.io/)

---

## Overview

Terraform is a tool that allows admins to automate your Okta org. Terraform requires an appropriate level of access to make changes to your org. You provide that access with an Okta API service app, which is the app type required for machine-to-machine communication.

An Okta API service app uses the OAuth 2.0 [Client Credentials authorization flow](https://developer.okta.com/docs/guides/implement-oauth-for-okta-serviceapp/main/) to authorize Terraform. You create a public/private key pair as the client credentials for this flow. Okta stores the public key, and Terraform uses the private key in the configuration for access to your org.

You assign scopes to the API service app to control the objects that are accessible by Terraform. A scope is like a permission to perform an action on a resource type. For example, the Terraform configuration in this article creates a test group in Okta, which requires the `okta.groups.manage` API scope.

One way to determine the required scopes is to consider which ones an admin needs to perform the same kind of action. Next, find the corresponding scopes in the list of [OAuth Admin Management scopes](https://developer.okta.com/docs/api/oauth2/#okta-admin-management) and add them to your service app. For example, adding a user in the Okta Admin console requires the `users.manage`. In the table, the corresponding scope is `okta.users.manage`.

You'll also add any required scopes to your Terraform configuration.

Separate from granting API scopes, you must assign admin permissions to the app through groups of permissions called admin roles.

> **Note:** See [Control Terraform access to Okta](/docs/guides/terraform-design-access-security).

## Create an API service app to manage Terraform access

Create an Okta service app that authorizes Terraform to make changes to your org:

1. In the Admin Console, select **Applications** > **Applications**.
1. Click **Create App Integration**, and then select **API Services**.
1. Click **Next**.
1. Enter a name for the app, and then click **Save**.
1. Click on your application in the list.

## Assign admin permissions

To use the Okta Terraform provider, you must update your Okta API service app to enable some admin permissions that correspond to the resources and actions you will manage in Terraform. Some admin permissions apply to the whole organization. Some admin permissions can be assigned to specific users and groups.

To simplify assigning sets of admin permissions, Okta provides built-in admin roles that encapsulate permissions with a similar purpose. For example, the Organization Admin role includes admin permissions that are commonly needed by org administrators, including adding new groups. Just as you would add the admin role to a person or group that you're onboarding for admin tasks, assign the Organization Admin role to the API service app for your Terraform integration to allow it to control Okta.

For improved security on production systems, create a custom role and narrow the set of admin permissions to only those that relate to what you control in Terraform.

You may need to add more permissions or roles to your service app as you add more functionality to your Terraform scripts.

For a list of admin permissions and which built-in roles include them, see [the admin role and permission comparison page](https://help.okta.com/okta_help.htm?type=oie&id=ext-administrators-admin-comparison).

The example in this article creates an Okta group using Terraform. To run this example code, add the `Organization Administrator` admin role to your API service app. To manage other Terraform resource types, your app might need additional roles.

Use a built-in admin role to assign permissions:

1. In the Admin Console, open the service app and select **Admin roles**.
1. Click **Edit assignments**.
1. Click **Add assignment**.
1. In the **Complete the assignment** section, for **Role** select **Organization Administrator*** or  **Superuser Admin**.
1. Click **Save Changes**.

For more information on custom roles, see [Custom admin roles](https://help.okta.com/okta_help.htm?type=oie&id=ext-cstm-admin-roles).

Admin roles are separate from API scopes, which are discussed in the following section. To manage resources in Terraform, you need to assign admin roles and also grant API scopes to the application.

## Grant the service app API scopes

_API scopes_, also called _scopes_, define permissions for an external API client, such as Terraform. Determine which Okta resources and which operations you need from Terraform, and use the names of the scopes to match which resources and actions you need. The name of the scope indicates the resouce type and level of access. For a full reference, see [the Okta list of Auth 2.0 API scopes](https://developer.okta.com/docs/api/oauth2/). The example Terraform code used in this article requires only the `okta.groups.manage` scope to create a group, but other resource types require other scopes.

> **Note:** Only admin users with the Super Administrator role have the permission to grant new API scopes to a service app.

1. Open the Okta API service app that you created in the previous section.
1. Click **Okta API Scopes**.
1. Find the desired scope. Using our example, find `okta.groups.manage`.
1. Next to that item, click **Grant**.
1. For some scopes, Okta requests confirmation. To confirm, click **Grant Scope**.

To add other API scopes, repeat these steps with the desired scopes.

> **Important**: When you add other resource types to your Terraform configuration, you must update scopes in both your service app and in your Terrform provider script. Also, you may need to add more admin roles to the app. For more information, see [Assign admin permissions](#assign-admin-permissions)

## Create access credentials

Okta recommends using a public/private key pair for credentials to control access from Terraform to Okta. Store the public key in the API service app, and use the private key in your Terraform configuration. You can use Okta to generate the public/private key pair or use an external tool to create the key pair.

> **Important:** Key pair authentication is the most secure option. Use other options such as API tokens only when the tradeoff of decreased security is worth it to you.

### Use Okta to generate the public/private key pair

1. In the Admin Console, open the service app and select **General**.
1. In the **Client Credentials** section, click **Edit** to change the client authentication method.
1. Select **Public key / Private key** as the **Client authentication** method.
1. Click **Add key**.
1. In the Add a public key dialog, click **Generate new key**.
1. In the **Private key** section, click **PEM** to show the PEM format (not JSON) format of the private key.
1. Copy the PEM private key and save it as a `.key` file.
   > **Important:** The private key appears in this dialog only once. Losing the private key requires generating a new pair of keys.
1. Save your new key: click **Done**, **Save**, and then **Save** again.
1. If you created multiple keys in this application, set the status of any public key currently used by Terraform to **Active**. Set the status of the other public keys to **Inactive**.
1. For a production deployment, securely store the private key in a Terraform secrets management system or other key management system.

### Use an external tool to generate the keys

Make sure that an external tool meets your security and trust requirements. Check that the tool generates a key in PKCS#1 format, which is required by the Okta Terraform provider. In this format the private key file begins with `-----BEGIN RSA PRIVATE KEY-----`. If the key isn't in the right format, convert it to the correct format using the `OpenSSL` command line program:

1. In a terminal, go to the file path where you saved the original private key.
1. Run OpenSSL to convert the key. One of the following command lines should work depending on your operating system and version of OpenSSL:
   `openssl rsa -in {ORIGINAL_PRIVATE_KEY} -out {CONVERTED_PRIVATE_KEY} -traditional`
   `openssl rsa -in {ORIGINAL_PRIVATE_KEY} -out {CONVERTED_PRIVATE_KEY}`
   `openssl-rsa -in {ORIGINAL_PRIVATE_KEY} -out {CONVERTED_PRIVATE_KEY}`

   In this command:
   * `ORIGINAL_PRIVATE_KEY`: Set this to the file path of the original key.
   * `CONVERTED_PRIVATE_KEY`: Set this to the file path for the converted key.
1. Confirm the converted key begins with `-----BEGIN RSA PRIVATE KEY-----`. If not, try these steps again.
1. Save the converted private key file. By convention, the file extension for a private key file is `.pem`.
1. For a production deployment, securely store the private key in a Terraform secrets management system or other key management system.

Add an externally-created key to Okta:

1. In the Admin Console, open your service app and select **General**.
1. In the **Client Credentials** section, click **Edit** to change the client authentication method.
1. Select **Public key / Private key** as the **Client authentication** method.
1. Click **Add key**.
1. Paste in your public key.
1. Save your changes: click **Done**, **Save**, and then **Save** again.


## Add credentials to Terraform

Create a Terraform configuration that uses the credentials that you created earlier:

1. In an empty directory on your computer, create a Terraform configuration file called `main.tf`.
1. In the `main.tf` file, list Okta as a required Provider:

    ```hcl
    terraform {
      required_providers {
        okta = {
          source = "okta/okta"
        }
      }
    }
    ```

1. Add the Okta provider to the `main.tf` file:

    ```hcl
    provider "okta" {
      org_name = "{yourOktaOrg}"
      base_url = "okta.com"
      client_id   = "{yourClientID}"
      scopes = ["okta.groups.manage"]
      private_key = {privateKey}
    }
    ```

   In the previous code sample, add your values to the following fields:

   * `org_name`: Your Okta org name, which is the first part of your organization's Okta domain before `.okta.com`, `.oktapreview.com`, or `.okta-emea.com`. For example, if your Okta domain is `example-org.oktapreview.com`, the org name is `example-org`. Don't include the `-admin` suffix, which corresponds to your Admin Console URL. To confirm your Okta domain in the Admin Console, click your username in the upper-right corner and look for the text below your email address. An Okta Developer org has an org name with the form `dev-<number>`, such as `dev-000001`.
   * `base_url`: Your Okta org domain. This is the end part of your domain URL: `.okta.com`, `.oktapreview.com`, or `.okta-emea.com`.
   * `client_id`: The client ID of the API service app that you created. In the Admin Console, click **Applications**, then click the name of your API service app. In the app editor, click **General**. Under **Client Credentials**, copy the **Client ID** value.
   * `private_key`: Either the path to the private key file or the private key itself. Okta recommends storing the key in a separate location and using a secrets and encryption management system, such as HashiCorp Vault.
   * `scopes`: The list of API scopes required by your Terraform configuration. The example below creates a group, which requires the `okta.groups.manage` scope.
     >**Note:** Grant the same API scopes to the service app you created for Terraform. In the Admin Console view your app, click the **API Scopes** tab, and grant the desired scopes from the list.

For more information on configuring the Okta Terraform provider, see the [Okta Provider documentation](https://registry.terraform.io/providers/okta/okta/latest/docs).

## Test Terraform access

Check whether Terraform can manage Okta objects by running a configuration. This example creates a group in your org:

1. Add the `okta_group` resource in the `main.tf` file:

    ```hcl
    resource "okta_group" "example_group" {
      name = "Example Group"
    }
    ```

1. In a terminal, go to the directory that contains `main.tf`.
1. Run `terraform init` to initialize the Terraform configuration.
1. Run `terraform plan` to preview the changes to your Okta org.
1. Run `terraform apply` to apply the changes to your org. Enter "yes" when prompted to confirm.
1. In your Okta org, check **Directory** > **Groups** to view the group created by Terraform. If the group exists, you successfully authorized Terraform to access your org.

The `terraform.tfstate` file in the Terraform configuration directory stores the group information. Terraform uses this information when you modify and apply your configurations:

```json
"resources": [
  {
    "mode": "managed",
    "type": "okta_group",
    "name": "example_group",
    "provider": "provider[\"registry.terraform.io/okta/okta\"]",
    "instances": [
      {
        "schema_version": 0,
        "attributes": {
          "custom_profile_attributes": "{}",
          "description": "",
          "id": "{groupID}",
          "name": "Example Group",
          "skip_users": false,
          "users": null
        },
        "sensitive_attributes": [],
        "private": "bnVsbA=="
      }
    ]
  }
]
```

After testing Terraform access, clean up your org by deleting the test group that you created:

1. In a terminal, go to the directory that contains `main.tf`.
1. Run `terraform destroy` to delete the group and the other resources in your configuration. Enter **yes** when prompted to confirm.
1. Delete the `example_group` resource from your `main.tf` configuration file.
