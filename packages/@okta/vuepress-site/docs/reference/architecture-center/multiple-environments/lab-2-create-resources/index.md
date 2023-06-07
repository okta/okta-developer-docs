---
title: Create resources for your environment
---

# Tutorial 2: Create resources for your environment

In this tutorial, you use Terraform to create the resources required to make your org functional in the **preview** branch in GitHub. The tutorial takes you through creating the resources, applying the plan, and demonstrating the functions of the newly created org. You can apply this when adding new environments like a staging environment or provisioning a new tenant.

For each of the following cases, you:

1. Select the `preview` branch in GitHub, if necessary.
2. Edit one or more existing `.tf` files in your GitHub repo.
3. Add new resources to the files.
4. Commit your changes in GitHub.
5. Verify that the plan runs automatically on your workspace **Overview** page.

In this tutorial, you:

* [Add a new User Schema property resource](#add-a-new-user-schema-property-resource)
* [Add new group and group rules resources](#add-new-group-and-group-rules-resources)
* [Add a new customer application portal resource](#add-a-new-customer-application-portal-resource)
* [Add a new authentication policy resource](#add-a-new-authentication-policy-resource)
* [Add a new Authorization Server, custom scopes and claims resources](#add-a-new-authorization-server-custom-scopes-and-claims-resources)

> **Note**: For more information about Okta's Terraform providers, resources, and data, see [Okta Provider](https://registry.terraform.io/providers/okta/okta/latest/docs).

The workspace configuration you set up in the previous tutorial causes your plan to run automatically and apply changes when you check in your changes.

## Add a new User Schema property resource

Administrators can define custom User profiles in [Universal Directory](https://www.okta.com/products/universal-directory/) using a custom JSON schema. The [Okta Schemas API](/docs/reference/api/schemas/) provides operations to manage custom User profiles.

Use a [User Schema property resource](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/user_schema_property) to create and configure a custom user schema property. User Schema property resources are defined in `userschema.tf`.

In this exercise, you add a new User Schema property to the workspace, commit your changes, and verify the results in your Terraform workspace **Overview** page.

1. Append the following to `userschema.tf` in GitHub, then commit your changes:

   ```hcl
   resource "okta_user_schema_property" "crn_extension" {
     index  = "customer_reference_number"
     title  = "Customer Reference Number"
     required = false
     type   = "string"
     master = "PROFILE_MASTER"
   }
   ```

2. On your workspace **Overview** page, observe that a new plan runs, changes are applied automatically, and **Resources changed** shows `+1 ~0 -0` to reflect the added resource. The **Latest Run** status is **Applied**.

   <div class="full border">

     ![An updated run showing a modified userschema.tf](/img/architecture/multiple-environments/lab-2-latest-run-applied.png)

   </div>

## Add new Group and Group Rules resources

Groups are commonly used for [Okta Single Sign-On (SSO)](/docs/guides/build-sso-integration/openidconnect/main/) access and to provision users to apps with specific entitlements. Group rules simplify group administration and help you manage application access, application roles, and security policies. Use rules to populate groups based on attributes to achieve attributed-based access control. Create rules using single or multiple attributes, single or multiple groups, or combinations of attributes and groups. See [About group rules](https://help.okta.com/okta_help.htm?type=oie&id=ext_Group_Rules).

Use an [Okta Group resource](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/group) to create and configure an Okta Group. Group resources are defined in `groups.tf`.

In this exercise, you add an Okta Group, confirm your changes, and verify the results on your workspace **Overview** page. Then, you repeat the process for the associated Group Rule resources. This ensures that the new Group is available when you add the Group Rule.

1. Append the following to `groups.tf` in GitHub, then commit your changes.

   ```hcl
   resource "okta_group" "test_group" {
     name        = "Test Group"
     description = "For testing and demonstration"
   }
   ```

2. On your workspace **Overview** page, observe that a new plan runs, changes are applied automatically, and **Resources changed** shows `+1 ~0 -0` to reflect the added resource. The **Latest Run** status is **Applied**.

3. Append the following to `grouprules.tf` in GitHub, then commit your changes.

   ```hcl
   resource "okta_group_rule" "test_rule" {
     name              = "Test Rule"
     status            = "ACTIVE"
     group_assignments = ["${okta_group.test_group.id}"]
     expression_type   = "urn:okta:expression:1.0"
     expression_value  = "String.startsWith(user.firstName,\"somename\")"
   }
   ```

4. On your workspace **Overview** page, observe that a new plan runs, changes are applied automatically, and **Resources changed** shows `+1 ~0 -0` to reflect the added resource. The **Latest Run** status is **Applied**.

## Add a new customer application portal resource

Okta is a customizable, secure, drop-in solution to add authentication and authorization services to your applications. You can connect any application on any device and define how you want your users to sign in. A customer portal is an interface through which your customers access your application.

Use customer portal resources to create and configure different portals. They're defined in `modules/applications/customer-portal.tf`.

In this exercise, you add a new [OpenID Connect (OIDC) application portal](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/app_oauth) and verify the results on your workspace **Overview** page.

1. Append the following to `modules/applications/customer-portal.tf` in GitHub, then commit your changes.

   ```hcl
   resource "okta_app_oauth" "example" {
     status         = "ACTIVE"
     label          = "Example Portal"
     type           = "web"
     redirect_uris  = ["https://localhost:44378/signin-oidc", "https://localhost:44378/Customer", "https://oauth.pstmn.io/v1/callback"]
     post_logout_redirect_uris = ["https://localhost:44378/signout-callback-oidc"]
     login_uri      = "https://localhost:4437811/signin-oidc"
     grant_types    = ["client_credentials", "authorization_code", "refresh_token"]
     response_types = ["code"]
     consent_method = "TRUSTED"
     refresh_token_rotation = "ROTATE"
     skip_users = true
     skip_groups = true
   }
   ```

2. On your workspace **Overview** page, observe that a new plan runs, changes are applied automatically, and **Resources changed** shows `+1 ~0 -0` to reflect the added resource. The **Latest Run** status is **Applied**.

## Add a new authentication policy resource

[Authentication policies](/docs/guides/configure-signon-policy/main/) control access to applications. Use them to configure more granular access to the app than are permitted by default. Also, use authentication policies to selectively apply conditions like limiting access to certain users and/or groups, and the network or network zone that they connect from.

An [authentication policy resource](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/app_signon_policy) allows you to create and configure a sign-on policy for the application. Sign-on policies are defined in `modules/applications/app_signon_policies.tf`.

In this exercise, you add a new authentication policy resource, and verify the results on your workspace **Overview** page.

1. Append the following to `modules/applications/app_signon_policies.tf` in GitHub, then commit your changes.

   ```hcl
   resource "okta_app_oauth" "my_app" {
     label                     = "My App"
     type                      = "web"
     grant_types               = ["authorization_code"]
     redirect_uris             = ["http://localhost:3000"]
     post_logout_redirect_uris = ["http://localhost:3000"]
     response_types            = ["code"]
     // this is needed to associate the application with the policy
     authentication_policy     = okta_app_signon_policy.my_app_policy.id
   }

   resource "okta_app_signon_policy" "my_app_policy" {
     name        = "My App Sign-On Policy"
     description = "Authentication Policy to be used on my app."
   }
   ```

2. On your workspace **Overview** page, observe that a new plan runs and changes are applied automatically. Also, **Resources changed** shows `+2 ~0 -0` to show that two resources were added. The **Latest Run** status is **Applied**.

## Add a new authorization server, custom scopes, and claims resources

An [authorization server](/docs/concepts/auth-servers/) is an engine for minting OpenID Connect or OAuth 2.0 tokens, and is also used to apply access policies. Scopes specify which access privileges are requested as part of an authorization. For example, the email scope requests access to a user's email address. Claims are pieces of information that describe some aspect of a given identity. They're held in authentication tokens. That is, you can think of tokens as envelopes that contain claims about users. Custom Okta authorization servers allow you to add custom scopes and claims to tokens.

Use an [Authorization Server resource](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/auth_server) to create and configure an authorization server. Use an [Authorization Server Scope resource](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/auth_server_scope) to create and configure an authorization server scope. Use an [Authorization Server Claim resource](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/auth_server_claim) to create and configure an authorization server claim.

Authorization Server, Authorization Server Scope, and Authorization Server Claim resources are defined in `modules/auth-servers/customer-portal.tf`.

In this example, you add an Authorization Server resource and associated Authorization Server Scope and Authorization Server Claim resources, and verify the results on your workspace **Overview** page. Add the resources separately, in that order, so the new resources are available when you need them.

1. Append the following to `modules/auth-servers/customer-portal.tf` in GitHub, then commit your changes.

   ```hcl
   resource "okta_auth_server" "test_server" {
     audiences   = ["api://iatcore.com"]
     description = "Auth Server that handles test apps"
     name        = "Test Server"
     issuer_mode = "ORG_URL"
     status      = "ACTIVE"
   }
   ```

2. On your workspace **Overview** page, observe that a new plan runs, changes are applied automatically, and **Resources changed** shows `+1 ~0 -0` to reflect the added resource. The **Latest Run** status is **Applied**.

3. Append the following to `modules/auth-servers/customer-portal.tf` in GitHub, then commit your changes.

   ```hcl
   resource "okta_auth_server_scope" "test_scope" {
     auth_server_id = okta_auth_server.test_server.id
     description    = "This allows the test server to view your IATCore account information."
     name           = "iat.account.read"
   }
   ```

4. On your workspace **Overview** page, observe that a new plan runs, changes are applied automatically, and **Resources changed** shows `+1 ~0 -0` to reflect the added resource. The **Latest Run** status is **Applied**.

5. Append the following to `modules/auth-servers/customer-portal.tf` in GitHub, then commit your changes.

   ```hcl
   resource "okta_auth_server_claim" "test_claim" {
     auth_server_id = okta_auth_server.test_server.id
     name           = "Type"
     value          = "user.userType"
     scopes         = [ okta_auth_server_scope.test_scope.name ]
     claim_type     = "IDENTITY"
   }
   ```

6. On your workspace **Overview** page, observe that a new plan runs, changes are applied automatically, and **Resources changed** shows `+1 ~0 -0` to reflect the added resource. The **Latest Run** status is **Applied**.
