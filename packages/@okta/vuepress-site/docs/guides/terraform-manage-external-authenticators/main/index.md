---
title: Manage authentication services with Terraform
excerpt: Enable users to sign in using a trusted external Identity Provider.
layout: Guides
---

Enable users to sign in using a trusted external Identity Provider.

---

#### Learning outcomes

* Configure an Identity Provider object to connect an external authentication service to your org.
* Specify which users can sign in to Okta with an external account.
* Configure automatic creation of an Okta account the first time a user signs in using an external account.

#### What you need

* Familiarity with the Terraform terms: configuration, resources, state, and commands. See the [Terraform overview](/docs/guides/terraform-overview).
* An [Okta Developer Edition organization](https://developer.okta.com/signup) or an Okta Identity Engine organization.
* A Terraform configuration that can access your Okta org. See [Enable Terraform access for your Okta org](/docs/guides/terraform-enable-org-access).
* An account with [Google](https://accounts.google.com/signup).
* Access to your [Google Admin Console](admin.google.com) for SAML IdP creation.

---

## Overview

You can configure trusted Identity Providers (IdPs) in your org to enable users with external accounts to sign in to your Okta org applications. Okta can use an IdP to verify a user’s identity when they sign in. Okta can also create an account automatically when the user first signs in with an IdP.

For more information on the functionality of an IdP, see [External Identity Providers](/docs/concepts/identity-providers/).

## Configure an external IdP

The Okta Terraform Provider supports three types of IdP objects:

* Social IdP: A preconfigured integration for a popular service, such as Google or Microsoft.
* OpenID Connect (OIDC) IdP: A service that supports the [OIDC specification](https://openid.net/developers/discover-openid-and-openid-connect/), such as Salesforce or your own custom IdP.
* SAML IdP: A service that supports the [SAML specification](http://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0.html), such as Google or your own custom IdP.

> **Note:** Before configuring a custom OIDC or SAML IdP in your org, check to see if Okta provides a social IdP for the desired service. Social IdPs are more simple and less time consuming to configure.

You can compare the configuration process for the different IdP types using the examples in this section. All three examples use Google as the IdP.

See [Identity Provider type](/docs/reference/api/idps/#identity-provider-type).

## Configure a social IdP object

Create a social IdP object in your org to connect one of the supported external services. See [Social Logins](/docs/guides/identity-providers/#social-logins) for a list of supported services.

To configure a Google social IdP, first create OAuth 2.0 credentials in your Google Developers Console to validate users signing in with Google:

1. Confirm that you can access the [Google Developers Console](https://console.developers.google.com/).
1. Create a project in the Google Developers Console or use an existing one.
1. Create OAuth 2.0 credentials by following the instructions in [Create authorization credentials](https://developers.google.com/identity/sign-in/web/sign-in#create_authorization_credentials).
1. Add the redirect URI for your Okta org using the following format: `https://${yourOktaDomain}.okta.com/oauth2/v1/authorize/callback`.

> **Note:** The default domain name of your Okta org is based on your company name. For example: `https://company.okta.com/oauth2/v1/authorize/callback`. If you’ve configured a custom domain in your Okta org, use that value to construct your redirect URI, such as `https://login.company.com/oauth2/v1/authorize/callback`.

Configure Google as a social IdP in your Terraform configuration:

1. In your `main.tf` configuration file, add a variable called `google_oidc_client_secret` that represents the client secret of the Google IdP:

    ```hcl
    variable "google_oidc_client_secret" {
      type = string
    }
    ```

1. Add an `okta_idp_social` [resource](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/idp_social) to configure the Google social IdP. Set the arguments to the following values:

| Argument              | Value                              | Description                                                                                                                                               |
| --------------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`                | `Google Social IdP`                | The name that appears in the Okta Admin Console                                                                                                           |
| `type`                | `GOOGLE`                           | The type of Social IdP. See [Identity Provider type](/docs/reference/api/idps/#identity-provider-type).                                                   |
| `protocol_type`       | `OIDC`                             | The protocol that Google uses as an IdP. See [Identity Provider type](/docs/reference/api/idps/#identity-provider-type)                                   |
| `client_id`           | ${client_id}                       | Client ID of the OAuth 2.0 credentials that you created in the Google Developer Console                                                                   |
| `client_secret`       | `var.google_oidc_client_secret`    | The variable that represents the client secret of the OAuth 2.0 credentials                                                                               |
| `scopes`              | `[ "openid", "email", "profile" ]` | The scopes that the Google social IdP requires. See [Identity Provider type](https://developer.okta.com/docs/reference/api/idps/#identity-provider-type). |
| `username_template`   | `idpuser.email`                    | Okta uses the email of the Google user to check for matching Okta users                                                                                   |
| `subject_match_type`  | `EMAIL`                            | Okta uses the emails of Okta users to match the Google user with an Okta user                                                                             |
| `account_link_action` | `AUTO`                             | Okta links the IdP user to the existing Okta user if the two users have matching emails                                                                   |
| `provisioning_action` | `AUTO`                             | Okta creates a user if the IdP user email doesn’t match an existing Okta user email                                                                       |

This code shows a generic example:

```hcl
resource "okta_idp_social" "google_social_idp" {
  name = "Google Social IdP"
  type = "GOOGLE"
  protocol_type = "OIDC"
  client_id = "${googleClientId}"
  client_secret     = var.google_oidc_client_secret
  scopes = [ "openid", "email", "profile" ]
  username_template = "idpuser.email"
  subject_match_type = "EMAIL"
  account_link_action = "AUTO"
  provisioning_action = "AUTO"
}
```

1. Run the following command to create the Google OIDC IdP in your org:
`terraform apply -var google_oidc_client_secret="${google_oauth_client_id}"`.
1. Create routing rules in your org to enable external users to sign in with the Google IdP. See [Control use of external authentication services](#control-use-of-external-authentication-services).

## Configure an OpenID Connect IdP object

Create an OIDC IdP object in your org to connect an external service that supports the OIDC protocol.

To configure a Google OIDC IdP, first create OAuth 2.0 credentials in your Google API Console to validate users signing in with Google:

1. Confirm that you can access the [Google Developers Console](https://console.developers.google.com/).
1. Create a project if you don’t already have one.
1. Create OAuth 2.0 credentials by following the instructions in [Create authorization credentials](https://developers.google.com/identity/sign-in/web/sign-in#create_authorization_credentials).
1. Add the redirect URI for your Okta org. For example, `https://${yourOktaDomain}.okta.com/oauth2/v1/authorize/callback`.

> **Note:** The default domain name of your Okta org is based on your company name. For example: `https://company.okta.com/oauth2/v1/authorize/callback`. If you’ve configured a custom domain in your Okta Org, use that value to construct your redirect URI, such as `https://login.company.com/oauth2/v1/authorize/callback`.

Configure Google as an OIDC IdP in your Terraform configuration:

1. In your `main.tf` configuration file, add a variable called `google_oidc_client_secret` that represents the client secret of the Google IdP.

    ```hcl
    variable "google_oidc_client_secret" {
      type = string
    }
    ```

1. Add an `okta_idp_oidc` [resource](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/idp_oidc) to create the Google OIDC IdP. Set the arguments to the following values:

| Argument                  | Value                                              | Description                                                                                                                                 |
| ------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`                    | `Google OIDC IdP`                                  | The name that appears in the Okta Admin Console                                                                                             |
| `scopes`                  | `["openid", "email", "profile"]`                   | The Google OIDC IdP requires these scopes for authorization. See [Identity Provider type](/docs/reference/api/idps/#identity-provider-type) |
| `client_id`               | ${client_id}                                       | Client ID of the OAuth 2.0 credentials that you created in the Google Developer Console                                                     |
| `client_secret`           | `var.google_oidc_client_secret`                    | The variable that represents the client secret of the OAuth 2.0 credentials                                                                 |
| `status`                  | `ACTIVE`                                           | Activates the IdP                                                                                                                           |
| `authorization_url`       | `https://accounts.google.com/o/oauth2/v2/auth`     | Corresponding values from the [Google OIDC discovery document](https://accounts.google.com/.well-known/openid-configuration)                |
| `issuer_url`              | `https://accounts.google.com`                      | Corresponding values from the [Google OIDC discovery document](https://accounts.google.com/.well-known/openid-configuration)                |
| `jwks_url`                | `https://www.googleapis.com/oauth2/v3/certs`       | Corresponding values from the [Google OIDC discovery document](https://accounts.google.com/.well-known/openid-configuration)                |
| `token_url`               | `https://oauth2.googleapis.com/token`              | Corresponding values from the [Google OIDC discovery document](https://accounts.google.com/.well-known/openid-configuration)                |
| `user_info_url`           | `https://openidconnect.googleapis.com/v1/userinfo` | Corresponding values from the [Google OIDC discovery document](https://accounts.google.com/.well-known/openid-configuration)                |
| `authorization_binding`   | `HTTP-REDIRECT`                                    | The method of making an authorization request                                                                                               |
| `jwks_binding`            | `HTTP-REDIRECT`                                    | The method of making a request for the OIDC JWKS                                                                                            |
| `token_binding`           | `HTTP-POST`                                        | The method of making a token request                                                                                                        |
| `user_info_binding`       | `HTTP-REDIRECT`                                    | The method of making a user info request                                                                                                    |
| `request_signature_scope` | `NONE`                                             | Sends unsigned requests                                                                                                                     |
| `username_template`       | `idpuser.email`                                    | Okta uses the email of the IdP user to check for matching Okta users                                                                        |
| `subject_match_type`      | `EMAIL`                                            | Okta uses the emails of Okta users to match the IdP user with an Okta user                                                                  |
| `account_link_action`     | `AUTO`                                             | Okta links the IdP user to the existing Okta user if the two users have matching emails                                                     |
| `provisioning_action`     | `AUTO`                                             | Okta creates a user if the IdP user email does not match an existing Okta user email                                                        |

This code shows a generic example:

```hcl
resource "okta_idp_oidc" "google_oidc_idp" {
  name = "Google OIDC IdP"
  scopes = ["email", "openid", "profile"]
  client_id = "${googleClientId}"
  client_secret = var.google_oidc_client_secret
  status = "ACTIVE"
  authorization_url = "https://accounts.google.com/o/oauth2/v2/auth"
  authorization_binding = "HTTP-REDIRECT"
  issuer_url = "https://accounts.google.com"
  jwks_binding = "HTTP-REDIRECT"
  jwks_url = "https://www.googleapis.com/oauth2/v3/certs"
  token_binding = "HTTP-POST"
  token_url = "https://oauth2.googleapis.com/token"
  user_info_binding = "HTTP-REDIRECT"
  user_info_url = "https://openidconnect.googleapis.com/v1/userinfo"
  request_signature_scope = "NONE"
  username_template = "idpuser.email"
  subject_match_type = "EMAIL"
  account_link_action = "AUTO"
  provisioning_action = "AUTO"
}
```

Run the following command to create the Google OIDC IdP in your org:
`terraform apply -var google_oidc_client_secret="${google_oauth_client_id}"`

Create routing rules in your org to enable external users to sign in with the Google IdP. See [Control use of external authentication services](#control-use-of-external-authentication-services).

## Configure a SAML IdP object

Create a SAML IdP object in your org to connect an external service that supports the SAML 2.0 protocol.

To configure a Google SAML IdP, first create a SAML web app in your Google Admin Console:

1. Confirm that you can access the [Google Admin Console](https://admin.developers.google.com/).
1. Add a custom SAML web app.
1. Enter a name for the web app.
1. Download the SAML certificate.
1. Copy the SSO URL and the Entity ID. You use these when you add a SAML IdP resource to your Terraform configuration.

Configure Google as a SAML IdP in your Terraform configuration:

1. In your `main.tf` configuration file, add a variable called `saml_certificate` that represents the SAML certificate that you downloaded in a previous step. This variable lets you securely provide the SAML certificate when you run your configuration.

    ```hcl
    variable "saml_certificate" {
      type = string
    }
    ```

1. Add an `okta_idp_saml_key` [resource](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/idp_saml_key) to upload the SAML certificate. Set the `x5c` argument to the SAML certificate variable. Don’t store your certificate as plain text in your configuration.

    ```hcl
    resource "okta_idp_saml_key" "google_saml_idp_key" {
      x5c = [var.saml_certificate]
    }
    ```

1. Add an `okta_idp_saml` [resource](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/idp_saml) to create the Google SAML IdP. Set the arguments to the following values:

| Argument                       | Value                                       | Description                                                                               |
| ------------------------------ | ------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `name`                         | `Google SAML IdP`                           | The name that appears in the Okta Admin Console                                           |
| `status`                       | `ACTIVE`                                    | Activates the IdP in your org                                                             |
| `sso_url`                      | ${sso_url}                                  | **SSO URL** of the web app in your Google Admin Console that you created previously       |
| `issuer`                       | ${entity_id}                                | **Entity ID** of the web app in your Google Admin Console.                                |
| `sso_binding`                  | `HTTP-POST`                                 | The method of making an SSO request.                                                      |
| `kid`                          | `okta_idp_saml_key.google_saml_idp_key.kid` | References the SAML certificate you uploaded to Okta in a previous step                   |
| `request_signature_scope`      | `NONE`                                      | Okta sends unsigned requests                                                              |
| `response_signature_scope`     | `ANY`                                       | Verifies SAMLResponse messages and Assertion elements                                     |
| `response_signature_algorithm` | `SHA-256`                                   | The minimum signature algorithm for verifying SAMLResponse messages or Assertion elements |
| `acs_type`                     | `ORG`                                       | Uses an org-wide assertion consumer service (ACS) URL, rather than an IdP-specific URL    |
| `username_template`            | `idpuser.email`                             | Okta uses the email of the IdP user to check for matching Okta users                      |
| `subject_match_type`           | `EMAIL`                                     | Okta uses the emails of Okta users to match the IdP user with an Okta user                |
| `account_link_action`          | `AUTO`                                      | Okta links the IdP user to the existing Okta user if the two users have matching emails   |
| `provisioning_action`          | `AUTO`                                      | Okta creates a user if the IdP user email does not match an existing Okta user email      |

This code shows a generic example:

```hcl
resource "okta_idp_saml" "google_saml_idp" {
  name = "Google SAML IdP"
  status = "ACTIVE"
  sso_url = "${google_sso_url}"
  issuer = "${google_entity_id_url}"
  sso_binding = "HTTP-POST"
  kid = okta_idp_saml_key.google_saml_idp_key.kid
  request_signature_scope = "NONE"
  response_signature_algorithm = "SHA-256"
  response_signature_scope = "ANY"
  acs_type = "ORG"
  username_template = "idpuser.subjectNameId"
  subject_match_type = "EMAIL"
  account_link_action = "AUTO"
  provisioning_action = "AUTO"
}
```

Run your configuration to create the Google SAML 2.0 IdP in your org and to get values for the SAML web app in your Google Admin Console:

1. In a terminal, go to your Terraform configuration directory.
1. Run `terraform plan` to preview the changes to your org.
1. Run `terraform apply -var saml_certificate="${saml_certificate_contents}"` to create the SAML IdP and upload the SAML certificate. This command assigns the contents of the SAML certificate to the `saml_certificate` variable in your configuration.
1. Enter `yes` when prompted.
1. Run `terraform state show okta_idp_saml.google_saml_idp` to see the attributes of the Google SAML IdP that you created with Terraform.
1. Copy the value of the `audience` attribute. You use this value to finish creating your SAML web app in your Google Admin Console.

Finish creating the SAML web app in your Google Admin Console:

1. Return to your Google Admin Console.
1. Enter `https://${yourOktaDomain}.okta.com/sso/saml2` in the **SSO URL** box.
1. Enter the value of the `audience` attribute that you copied in a previous step in the **Entity ID** box. For example: `https://www.okta.com/saml2/service-provider/spvsvyjdmwomeipztdxp`.
1. Map the following attributes from the Google user profile to the attributes of the Okta user profile:

   * **Primary email**: **userName**
   * **Primary email**: **subjectNaId**
   * **Primary email**: **email**
   * **First name**: **firstName**
   * **Last name**: **lastName**

Create routing rules in your org to enable external users to sign in with the Google IdP. See [Control use of external authentication services](#control-use-of-external-authentication-services).

## Control use of external authentication services

Create rules that control the external IdP that a user can use to sign in to an Okta application. You can set rules based on the users' location, their device, their Okta attributes, and the application that they’re accessing. The rules are added to the single IdP Discovery policy in your Okta org.

When a user attempts to sign in, the active rules are evaluated in order of priority, and the first one that the user matches is applied. See [Manage priority order with Terraform](/docs/guides/terraform-manage-user-access#manage-priority-order-with-terraform) in [Manage user access with Terraform](/docs/guides/terraform-manage-user-access).

For example, create a routing rule that requires users with a specific email domain to sign in with a Google IdP:

1. In your `main.tf` configuration file, add an `okta_policy` data source to get the policy ID for the IdP routing rules. You use this ID in the following step to create a rule.

    ```hcl
    data "okta_policy" "idp_discovery_policy" {
      name = "Idp Discovery Policy"
      type = "IDP_DISCOVERY"
    }
    ```

1. Add an `okta_policy_rule_idp_discovery` [resource](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/policy_rule_idp_discovery) to create a routing rule for the IdPs in your org. Set the arguments to the following values:

| Argument                    | Value                                                | Description                                                                     |
| --------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------- |
| `name`                      | `Google Social IdP Rule`                             | The name that appears in the Okta Admin Console                                 |
| `policy_id`                 | `data.okta_policy.idp_discovery_policy.id`           | The policy ID from a previous step                                              |
| `idp_id`                    | `okta_idp_social.test_google_social.id`              | ID of the IdP object in Okta that you want to use                               |
| `idp_type`                  | `GOOGLE`                                             | Type of the IdP you want to use                                                 |
| `status`                    | `ACTIVE`                                             | Activates the rule after you run your Terraform configuration                   |
| `network_connection`        | `ANYWHERE`                                           | Applies this rule to users from any network                                     |
| `user_identitier_type`      | `ATTRIBUTE`                                          | Applies this rule only to users based on a specified attribute                  |
| `user_identifier_attribute` | `email`                                              | Specifies email as the attribute that controls which users this rule applies to |
| `user_identifier_patterns`  | {`match_type`: `CONTAINS`, `value`: ${email domain}} | Applies the routing rule to users with that email domain                        |

This code shows a generic example:

```hcl
resource "okta_policy_rule_idp_discovery" "social_idp_rule" {
  name = "Google Social IdP Rule"
  policy_id = data.okta_policy.idp_discovery_policy.id
  idp_id = okta_idp_social.test_google_social.id
  idp_type = "GOOGLE"
  priority = 1
  status = "ACTIVE"
  network_connection = "ANYWHERE"
  user_identifier_type = "ATTRIBUTE"
  user_identifier_attribute = "email"
  user_identifier_patterns {
    match_type = "CONTAINS"
    value = "${yourGoogleAccountDomain}"
  }
}
```

1. Run your Terraform configuration with `terraform apply` to create and activate the routing rule.
