---
title: Control Terraform access to Okta
excerpt: Maintain security when using Terraform to automate your Okta org.
layout: Guides
---

Terraform requires permissions to read and manage objects in your org. You can configure these permissions in multiple ways, depending on what you want Terraform to automate.

Be deliberate with Terraform permissions to keep your org secure. Terraform doesn’t need access to your entire org. Instead, limit Terraform to access only the Okta objects that you want Terraform to manage. This is known as *least-privilege* access, which reduces the risk of unintended changes and misuse.

## Select an authorization method to control access

Okta offers multiple ways to authorize Terraform. Okta recommends using the most secure method that works for your use case.

### OAuth 2.0

The OAuth 2.0 protocol provides a high level of security for authorizing Terraform. With OAuth 2.0, you can customize granular access to Okta resources, limit the time of access, and revoke access. These features give you control over your org’s security.

See [OAuth 2.0 and OpenID Connect overview](/docs/concepts/oauth-openid/).

### API tokens

API tokens are easy to implement but can reduce your org security. The permissions of an API token are the same as those of the admin that creates it. The permissions for an API token can't be changed after it's created. Also, you must manually delete a token. This combination leaves API tokens vulnerable to misuse and exploitation.

If you use API tokens, create the token with a service account that has only the permissions required for your Terraform configuration.

This guide focuses only on OAuth 2.0 authorization, because of the security benefits.

## Authorize Terraform with OAuth 2.0

Configure OAuth 2.0 access by creating an Okta app that's used by Terraform.

> **Note:** Not every resource in the Okta Provider supports OAuth 2.0. See the [Okta Terraform Provider documentation](https://registry.terraform.io/providers/okta/okta/latest/docs).

To implement OAuth 2.0 authorization for Terraform, see [Enable Terraform access for your Okta org](/docs/guides/terraform-enable-org-access).

### Configure an app for authorization

Use an Okta API service app for machine-to-machine communication with Terraform. A service app authorizes Terraform using the [Client Credentials flow](/docs/guides/implement-grant-type/clientcreds/main/).

With this flow, Terraform uses credentials to request access to your org. The service app verifies the credentials and authorizes Terraform access to Okta.

The credentials used for this flow are a public/private key pair. Okta stores the public key in the service app, and Terraform uses the private key in the configuration. You can [generate the key pair](/docs/guides/implement-oauth-for-okta-serviceapp) in the Okta service app or with your own secure internal methods. See [Create access credentials](/docs/guides/terraform-enable-org-access/main/#create-access-credentials).

> **Note:** The Okta Terraform Provider requires the private key to use PKCS#1 encoding.
You may have to use the following command to convert the key to a 'traditional' RSA format `openssl pkey -in {ORIGINAL_PRIVATE_KEY} -out {CONVERTED_PRIVATE_KEY} -traditional`
Okta recommends storing the private key in a separate and secure location and using a secrets and encryption management system, such as Hashicorp Vault. You can use input variables and environment variables to provide credentials to Terraform.

> **Note:** Don't store credentials as plain text in your Terraform configuration.

For example, this configuration uses an input variable with no default value for the private key:

```hcl
provider "okta" {
  org_name = "{org_name}"
  base_url = "okta.com"
  client_id   = "{client_id}"
  private_key = var.private_key
  scopes = ["okta.groups.manage", "okta.groups.read"]
}

variable "private_key" {
  type = string
  description = "Private Key"
}
```

You can pass the credentials to Terraform by setting the private key to an environment variable and running the following command:

`terraform apply -var="private_key=${PRIVATE_KEY_ENVIRONMENT_VARIABLE}"`

### Grant permissions to Terraform

With the Client Credentials flow, scopes define what resources are accessible to Terraform.

A scope defines an action on an object in your org. For example, the `okta.groups.read` scope allows Terraform to read group details, while the `okta.groups.manage` scope allows Terraform to create, change, or remove groups.

Some objects in your org don’t have a corresponding scope. For example, there’s no scope for managing scopes. For a list of scopes and their corresponding access, see [OAuth 2.0 Scopes](https://developer.okta.com/docs/api/oauth2/).

> **Note:** Terraform resources and data sources might require more than one scope.

You use scopes in both your Okta org and your Terraform configuration. In Okta, you grant scopes to the API service app in your org. The app authorizes Terraform to access objects defined by those scopes.

In a Terraform configuration, you list scopes in the Okta Provider. When you apply the configuration, Terraform requests access to only these scopes. For example, this configuration requests the `okta.groups.manage` and `okta.groups.read` scopes:

```hcl
provider "okta" {
  org_name = "{org_name}"
  base_url = "okta.com"
  client_id   = "{client_id}"
  private_key = var.private_key
  scopes = ["okta.groups.manage", "okta.groups.read"]
}
```

The list of scopes in the configuration must satisfy the following conditions:

* Contains all scopes required by the resources and data sources in the configuration
* Contains only scopes that are also granted to the service app

The Okta objects that Terraform reads and manages determine the scopes required for the configuration. For example, this configuration sets up a passwordless sign-in flow for the Okta End-User Dashboard:

```hcl
resource "okta_group" "passwordless_group" {
  name = "Passwordless Group"
}

resource "okta_authenticator" "email_authenticator" {
  name = "Email Authenticator"
  key = "okta_email"
  status = "ACTIVE"
  settings = jsonencode(
    {
      "allowedFor" : "any"
    }
  )
}

resource "okta_app_signon_policy_rule" "passwordless_authentication_policy_rule" {
  name = "Passwordless Authentication Policy Rule"
  policy_id = data.okta_app_signon_policy.okta_dashboard_authentication_policy.id
  access = "ALLOW"
  factor_mode = "1FA"
  groups_included = [ okta_group.passwordless_group.id ]
  priority = 1
}

data "okta_app" "okta_dashboard" {
  label = "Okta Dashboard"
}

data "okta_app_signon_policy" "okta_dashboard_authentication_policy" {
  app_id = data.okta_app.okta_dashboard.id

  depends_on = [
    data.okta_app.okta_dashboard
  ]
}

resource "okta_policy_signon" "passwordless_global_session_policy" {
  name = "Global Session Policy"
  status = "ACTIVE"
  priority = 1
  groups_included = [ okta_group.passwordless_group.id ]
}

resource "okta_policy_rule_signon" "passwordless_global_session_policy_rule" {
  name = "Global Session Policy Rule"
  policy_id = okta_policy_signon.passwordless_global_session_policy.id
  priority = 1
  status = "ACTIVE"
  access = "ALLOW"
  primary_factor = "PASSWORD_IDP_ANY_FACTOR"
}

resource "okta_policy_mfa" "passwordless_authentication_enrollment_policy" {
  name = "Passwordless Auth Enrollment Policy"
  status = "ACTIVE"
  is_oie = true
  groups_included = [ okta_group.passwordless_group.id ]
  okta_password = {enroll = "NOT_ALLOWED"}
  okta_email = {enroll = "REQUIRED"}
  priority = 1
}

resource "okta_policy_rule_mfa" "passwordless_authentication_enrollment_policy_rule" {
  name = "Passwordless Auth Enrollment Policy Rule"
  policy_id = okta_policy_mfa.passwordless_authentication_enrollment_policy.id
  status = "ACTIVE"
  enroll = "LOGIN"
}

resource "okta_user" "passwordless_test_user" {
  first_name = "Passwordless"
  last_name = "TestUser"
  login = "passwordlesstestuser@example.com"
  email = "passwordlesstestuser@example.com"
}

resource "okta_user_group_memberships" "passwordless_user_assignment" {
  user_id = okta_user.passwordless_test_user.id
  groups = [ okta_group.passwordless_group.id ]
}
```

This configuration uses these scopes for the following actions:

* `okta.apps.read`: Reads app information of the Okta End-User Dashboard
* `okta.authenticators.manage`: Enables the email authenticator for authentication and recovery
* `okta.authenticators.read`: Reads email authenticator information
* `okta.groups.manage`: Creates a group for passwordless users
* `okta.groups.manage`: Reads group information
* `okta.policies.manage`: Creates global session policies, authentication policies, and authentication enrollment policies
* `okta.policies.manage`: Reads policy information
* `okta.users.manage`: Creates a user that doesn’t require a password
