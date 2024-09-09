---
title: Enable Terraform access for your Okta org
excerpt: Create an Okta app and credentials that Terraform uses to manage the objects in your org.
layout: Guides
---

Create an Okta application and credentials that Terraform uses to manage the objects in your organization.

---

#### Learning outcomes

* Authorize Terraform to automate your Okta org.
* Create the authorization credentials used by Terraform.
* Test that Terraform can access your org.

#### What you need

* Familiarity with Terraform terms: configuration, resources, state, and commands. See [Terraform overview](/docs/guides/terraform-overview).
* [Okta Developer Edition organization](https://developer.okta.com/signup)
* [Super admin permissions](https://help.okta.com/okta_help.htm?id=ext_superadmin)
* [OpenSSL command line program](https://github.com/openssl/openssl#download). Some operating systems already include `openssl` or `openssl-rsa`.
* [A Terraform installation](https://www.terraform.io/)

---

## Overview

Terraform is a tool that allows admins to automate your Okta org. Terraform requires an appropriate level of access to make changes to your org. You provide that access with an Okta API service app, which is the app type required for machine-to-machine communication.

An Okta API service app uses the OAuth 2.0 [Client Credentials authorization flow](/docs/guides/implement-oauth-for-okta-serviceapp/main/) to authorize Terraform. You create a public/private key pair as the client credentials for this flow. Okta stores the public key, and Terraform uses the private key in the configuration for access to your org.

In the Okta API service app that controls your Terraform integration, you specify the Okta objects that Terraform can access using API scopes. Scopes are like permissions to do a certain action on a type of resource. For example, the Terraform configuration in this article creates a test group in Okta, which requires the `okta.groups.manage` API scope.

One way to determine the required scopes for the service app is to determine which actions an admin needs to perform the same kind of action. Next, find the corresponding scopes in the list of [OAuth Admin Management scopes](/docs/api/oauth2/#okta-admin-management) and add them to your service app. For example, adding a group in the Okta Admin console requires the `groups.manage` action. In the table, the corresponding scope is `okta.groups.manage`. Add the same scopes to your Terraform configuration.

Separate from granting API scopes, you must assign admin permissions to the app through groups of permissions called admin roles.

> **Note:** See [Control Terraform access to Okta](/docs/guides/terraform-design-access-security).

## Create an API service app to manage Terraform access

Create an Okta service app that authorizes Terraform to update your org:

1. In the Admin Console, select **Applications** > **Applications**.
1. Click **Create App Integration**, and then select **API Services**.
1. Click **Next**.
1. Enter a name for the app, and then click **Save**.
1. Select your application in the list.

## Assign admin roles

To use the Okta Terraform provider, you must update your Okta API service app to enable some admin permissions that correspond to the resources and actions you manage in Terraform. Some admin permissions apply to the whole organization. Some admin permissions can be assigned to specific users and groups.

The example in this article for initial testing creates an Okta group using Terraform. To run this example code, add the **Organization Administrator** admin role to your API service app.

To simplify assigning sets of admin permissions, Okta provides built-in admin roles that encapsulate permissions with a similar purpose. For example, the Organization Admin role includes commonly required admin permissions for org administrators, including adding new groups. Just as you would add the admin role to a person or group that you're onboarding for admin tasks, assign the Organization Admin role to the API service app for your Terraform integration to allow it to control Okta.

For improved security on production systems, create a custom role and narrow the set of admin permissions to only those that relate to what you control in Terraform.

You may need to add more permissions or roles to your service app as you add more functionality to your Terraform scripts.

For a list of admin permissions and which built-in roles include them, see [the admin role and permission comparison page](https://help.okta.com/okta_help.htm?type=oie&id=ext-administrators-admin-comparison).

Use a built-in admin role to assign permissions:

1. In the Admin Console, open the service app and select **Admin roles**.
1. Click **Edit assignments**.
1. Click **Add assignment**.
1. In the **Complete the assignment** section, for **Role** select **Organization Administrator*** or  **Superuser Admin**.
1. Click **Save Changes**.

For more information on custom roles, see [Custom admin roles](https://help.okta.com/okta_help.htm?type=oie&id=ext-cstm-admin-roles).


## Grant API scopes

Okta _API scopes_ define permissions for an external API client like Terraform. For a full reference, see [the Okta list of Auth 2.0 API scopes](/docs/api/oauth2/#oauth-20-scopes).

> **Note:** Granting new API scopes to a service app requires that the admin has Super Administrator permission.

1. Open the Okta API service app that you created in the previous section.
1. Click the **Okta API Scopes** tab.
1. Find the desired scope. For this example, find `okta.groups.manage`.
1. Click **Grant** for the desired scope.
1. For some scopes, Okta requests confirmation. To confirm, click **Grant Scope**.

Repeat these steps for any other desired API scopes.

> **Caution**: When you add other resource types to your Terraform configuration, you must make several changes. Grant the new API scopes to the app. Modify your Terraform provider setup to request the new API scopes. Depending on your existing setup, you may need to add more admin roles to the app. See [Assign admin roles](#assign-admin-roles).

## Create access credentials

Use a public/private key pair to control access to the service app used by Terraform. Store the public key in the API service app, and use the private key in your Terraform configuration. You can use either Okta or an external tool to generate the public/private key pair.

> **Caution:** Choose an access method based on the level of security required for your service app.

### Use Okta to generate the keys

1. In the Admin Console, open the service app and select **General**.
1. In the **Client Credentials** section, click **Edit** to change the client authentication method.
1. Select **Public key / Private key** as the **Client authentication** method.
1. Click **Add key**.
1. In the Add a public key dialog, click **Generate new key**.
1. In the **Private key** section, click **PEM** to show the PEM format (not JSON) format of the private key.
1. Copy the PEM private key and save it as a `.key` file.
   > **Caution:** The private key appears in this dialog only once. Losing the private key requires generating a new key pair.
1. Save your new key: click **Done**, **Save**, and then **Save** again.
1. If you created multiple keys in this application, set the status of any public key currently used by Terraform to **Active**. Set the status of the other public keys to **Inactive**.
1. For a production deployment, securely store the private key in a Terraform secrets management system or other key management system.

### Use an external tool to generate the keys

Audit your external tool to generate a key pair for security. Follow organization best practices and audit any code beforehand to maintain org security. Never use an untrusted third-party web site to generate keys for production systems.

Check that the generated private key is in **PKCS#1** format, which is the format required by the Okta Terraform provider. In that format, the file that contains the private key begins with `-----BEGIN RSA PRIVATE KEY-----`. If the key isn't in the right format, convert it to the correct format using the OpenSSL command line program:

1. In a terminal, go to the file path where you saved the original private key.
1. Run OpenSSL to convert the key. One of the following command lines should work depending on your operating system and version of OpenSSL:
   * `openssl rsa -in {ORIGINAL_PRIVATE_KEY} -out {CONVERTED_PRIVATE_KEY} -traditional`
   * `openssl rsa -in {ORIGINAL_PRIVATE_KEY} -out {CONVERTED_PRIVATE_KEY}`
   * `openssl-rsa -in {ORIGINAL_PRIVATE_KEY} -out {CONVERTED_PRIVATE_KEY}`

   In this command:
   * Set `{ORIGINAL_PRIVATE_KEY}` to the file path of the original key.
   * Set `{CONVERTED_PRIVATE_KEY}` to the file path for the converted key.
1. Confirm the converted key begins with `-----BEGIN RSA PRIVATE KEY-----`. If not, try these steps again.
1. Save the converted private key file. By convention, the file extension for a private key file is `.pem`.
1. For a production deployment, securely store the private key in a Terraform secrets management system or other key management system.

Add a key created externally to Okta:

1. In the Admin Console, open your service app and select the **General** tab.
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
   * `base_url`: Your Okta org domain. This is the end part of your domain URL: `okta.com`, `oktapreview.com`, or `okta-emea.com`.
   * `client_id`: The client ID of the API service app that you created. In the Admin Console, click **Applications**, then click the name of your API service app. In the app editor, click **General**. Under **Client Credentials**, copy the **Client ID** value.
   * `private_key`: Either the path to the private key file or the private key itself. Okta recommends storing the key in a separate location and using a secrets and encryption management system, such as HashiCorp Vault.
   * `scopes`: The list of API scopes required by your Terraform configuration. The following example creates a group, which requires the `okta.groups.manage` scope.

     > **Note:** Grant the same API scopes to the service app you created for Terraform. In the Admin Console view your app, click the **API Scopes** tab, and grant the desired scopes from the list.

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
