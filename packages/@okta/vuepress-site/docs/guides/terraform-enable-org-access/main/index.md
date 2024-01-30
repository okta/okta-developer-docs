---
title: Enable Terraform access for your Okta org
excerpt: Create an Okta application and credentials that Terraform uses to manage the objects in your org.
layout: Guides
---

Create an Okta application and credentials that Terraform uses to manage the objects in your org.

---

**Learning outcomes**

* Authorize Terraform to automate your Okta org
* Create the authorization credentials used by Terraform
* Test that Terraform can access your org

**What you need**

* Familiarity with Terraform terms: configuration, resources, state, and commands. See [Terraform overview](/docs/guides/terraform-overview).
* [Okta Developer Edition organization](https://developer.okta.com/signup)
* [Super admin permissions](https://help.okta.com/okta_help.htm?id=ext_superadmin)
* [OpenSSL command line program](https://github.com/openssl/openssl#download). Some operating systems already include `openssl` or `openssl-rsa`.
* [A Terraform installation](https://www.terraform.io/)

---

## Overview

Terraform is a tool that allows admins to automate your Okta org. Terraform requires an appropriate level of access to make changes to your org. You provide that access with an Okta service app, which is the app type required for machine-to-machine communication.

An Okta service app uses the OAuth 2.0 [Client Credentials authorization flow](https://developer.okta.com/docs/guides/implement-oauth-for-okta-serviceapp/main/) to authorize Terraform. You create a public/private key pair as the client credentials for this flow. Okta stores the public key, and Terraform uses the private key in the configuration for access to your org.

In the service app, you specify the Okta objects that Terraform can access using scopes. Every action Terraform makes on an Okta object requires a specific scope. For example, the Terraform configuration in this guide creates a test group in Okta that requires the `okta.groups.manage` scope.

> **Note:** See [Control Terraform access to Okta](/docs/guides/terraform-design-access-security).

## Create an app for Terraform access

Create an Okta service app that authorizes Terraform to make changes to your org:

1. In the Admin Console, select **Applications** > **Applications**.
1. Click **Create App Integration**, and then select **API Services**.
1. Click **Next**.
1. Enter a name for the app, and then click **Save**.

## Grant scopes to the app

Specify the Okta objects that Terraform can access by adding the appropriate scopes to your service app. The Terraform resources that you use in your configuration determine the required scopes.

> **Note:** Only the Super Admin role has permissions to grant scopes to a service app.

1. Open the service app that you created in the previous section and select **Okta API Scopes**.
1. Find the `okta.groups.manage` scope, and click **Grant**.
1. Click **Grant Access**.

> **Note:** The example Terraform configuration used in this guide requires only the `okta.groups.manage` scope. If required, you can also grant additional scopes.

## Create access credentials

The credentials used are a public/private key pair. Store the public key in the service app, and use the private key later when you create a Terraform configuration.

> **Note:** If you use an external tool to generate a key pair, audit the code beforehand to maintain org security.

This guide uses Okta to generate the public/private key pair:

1. In the Admin Console, open the service app and select **General**.
1. In the **Client Credentials** section, click **Edit** to change the client authentication method.
1. Select **Public key / Private key** as the **Client authentication** method.
1. Click **Add key**.
1. In the Add a public key dialog, click **Generate new key**.
1. In the **Private key** section, click **PEM**.
1. Copy the PEM private key and save it as a `.key` file.

   > **Note:** The private key only appears in this dialog once. Losing the private key requires generating a new pair of keys.
1. Click **Done**, **Save**, and then **Save** again.

> **Note:** Set the status of any public key currently used by Terraform to **Active**, and set the status of the other public keys to **Inactive**.

Check that the generated private key is in PKCS#1 format, which is the format required by the Okta Terraform Provider. In that format, the file that contains the private key begins with `-----BEGIN RSA PRIVATE KEY-----`.

If the key isn't in the right format, convert it to the correct format using the OpenSSL command line program:

1. In a terminal, go to the file path where you saved the original private key.
1. Run OpenSSL to convert the key. One of the following command lines should work depending on your operating system and version of OpenSSL:
`openssl rsa -in {ORIGINAL_PRIVATE_KEY} -out {CONVERTED_PRIVATE_KEY} -traditional`
`openssl rsa -in {ORIGINAL_PRIVATE_KEY} -out {CONVERTED_PRIVATE_KEY}`
`openssl-rsa -in {ORIGINAL_PRIVATE_KEY} -out {CONVERTED_PRIVATE_KEY}`

   * `ORIGINAL_PRIVATE_KEY`: The file that contains the key generated earlier.
   * `CONVERTED_PRIVATE_KEY`: The file that contains the converted key.

> **Note:** The file that contains the converted private key must begin with `-----BEGIN RSA PRIVATE KEY-----`. If not, try step two again.

## Assign admin roles

Limit the access of the service app to your org by assigning it one or more admin roles. This increases the security of your org by defining which resources are accessible.

1. In the Admin Console, open the service app and select **Admin roles**.
2. Click **Edit assignments**.
3. In the **Complete the assignment** section, for **Role** select **Group Administrator**.
4. Click **Save Changes**.

> **Note:** The example Terraform configuration in this guide requires only the `Group Administrator` role. Create an appropriate custom role your own service app.

For more information on admin roles, see [Assign admin roles to the OAuth 2.0 service app](/docs/guides/secure-oauth-between-orgs/main/#assign-admin-roles-to-the-oauth-2-0-service-app).

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
      org_name = "${yourOktaOrg}"
      base_url = "okta.com"
      client_id   = "${yourClientID}"
      scopes = ["okta.groups.manage"]
      private_key = ${privateKey}
    }
    ```

   In the previous code sample, add your values to the following fields:

   * `org_name`: Your Okta org name. For example, `exampleOrgName` from the full domain `https://exampleOrgName.okta.com`.
   * `base_url`: Your Okta org domain
   * `client_id`: The client ID of the service app that you created in an earlier step.
   * `private_key`: Either the path to the private key file or the private key itself. Okta recommends storing the key in a separate location and using a secrets and encryption management system, such as Hashicorp Vault.
   * `scopes`: A list of scopes required by the Terraform configuration. This example uses the `okta.groups.manage` scope.

For more information on declaring the Okta Provider in your Terraform configuration, see the [Okta Provider documentation](https://registry.terraform.io/providers/okta/okta/latest/docs).

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
