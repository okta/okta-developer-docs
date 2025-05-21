---
title: Create a custom authorization server
excerpt: Configure Single Sign-On and control resource permissions for an OAuth app.
layout: Guides
---

Configure Single Sign-On and control resource permissions for an OAuth app.

---

#### Learning outcomes

* Why use an authorization server.
* When to use an org authorization server versus a custom authorization server.
* Create an authorization server using Terraform.

#### What you need

* Familiarity with the Terraform terms: configuration, resources, and commands. See the Terraform documentation [introductory concepts](https://www.terraform-best-practices.com/key-concepts) article. Also, see the [introduction page for Okta Terraform automation](/docs/guides/terraform-overview/main/).
* An Okta org and pricing plan that includes support for authorization servers. The [Okta Integrator Free Plan org](https://developer.okta.com/signup/) doesn't include [API Access Management](/docs/concepts/api-access-management/), which is required to use custom authorization servers.
* A [Terraform configuration](/docs/guides/terraform-enable-org-access/main) that can access your Okta org.
* Admin permissions that enable you to add a scope to your org.
* Understand your OAuth app's needs for proving identity and resource access.
* Familiarity with concepts and terminology of OAuth and OIDC, such as audience, scopes, claims, and grants. See [OAuth 2.0 and OpenID Connect overview](/docs/concepts/oauth-openid/).

---

## Overview

A web or mobile app must handle authentication (user identity) and authorization (resource access for each user). Whether you're developing an internal IT app for your employees, building a portal for your partners, or exposing custom APIs to users, you can use Okta to manage authentication and authorization.

OAuth 2.0 and OIDC are the industry standard user authentication and authorization protocols. See [OAuth 2.0 and OpenID Connect overview](/docs/concepts/oauth-openid/). Okta supports both protocols by checking user access and generating appropriate tokens.

You can implement SSO with Okta for OIDC apps to secure your APIs and provide user authorization for web services. This article describes how to create a custom authorization server to issue an OAuth identity token, an OAuth resource access token, or both types of tokens.

This article focuses on the most common use case: the [Authorization Code flow](/docs/concepts/oauth-openid/#authorization-code-flow-with-pkce-flow) with optional support for [Proof Key for Code Exchange](https://oauth.net/2/pkce/) (PKCE). If the request includes the PKCE challenge, no extra PKCE support is required in the configuration.

For related conceptual information, see [Authorization server overview](/docs/concepts/auth-servers/).

## Plan your implementation

There are two types of Okta authorization servers:

* **Org authorization server.** Every Okta org has a built-in authorization server called the org authorization server. The base URL for the org authorization server is `https://{yourOktaDomain}`. This server provides basic functionality for SSO using OIDC to apps or to get an access token that uses the Okta API scopes. You can't customize OAuth audience, claims, policies, or scopes, except [group claims](/docs/guides/customize-tokens-groups-claim/main/#add-a-groups-claim-for-the-org-authorization-server) and [user attributes](https://support.okta.com/help/s/article/How-to-add-custom-attributes-of-user-profile-as-claims-in-token?language=en_US).
* **Custom authorization server.** Create your own server to support custom OAuth scopes, rules for granting scopes, and customizing the claims and policies.

> **Note:** Okta creates a custom authorization server for every org named `default`. That default custom authorization server is **not** the org authorization server. Although it's possible to manage the **default custom authorization server** in Terraform using the resource `okta_auth_server_default`, this article focuses on creating a new custom authorization server. A new authorization server addresses a broader range of use cases and encourages complete resource lifecycle management in Terraform.

The first step is to understand your requirements for the custom server. These requirements include:

* An identity token (authentication), resource access token (authorization), or both types of tokens.
* Custom scopes for custom APIs or other private resources that are accessible by only some users.
* Access to pre-defined Okta API scopes.

See [Which authorization server should you use](https://developer.okta.com/docs/concepts/auth-servers/#which-authorization-server-should-you-use) for a comparison of the capabilities of the org authorization server and custom authorization servers.

The Okta Terraform provider only supports custom authorization servers because the org authorization server is not configurable.

If you decide to use the org authorization server rather than a custom authorization server, the rest of this article does not apply. Instead, see [OAuth 2.0 and OpenID Connect overview](/docs/concepts/oauth-openid/).

## Required Okta Terraform provider resources

To create a custom authorization server, you must create several types of Terraform resources:

* **Okta authorization server:** Mints new OAuth tokens. An authorization server is represented in Terraform by the [okta_auth_server](https://registry.terraform.io/providers/oktadeveloper/okta/latest/docs/resources/auth_server) resource. Create multiple authorization servers if you have multiple external OIDC apps with different authorization requirements.
* **OAuth claim:** One piece of relevant information about the end user who is requesting access. A claim must either be an identity claim (authentication) or a resource access claim (authorization). If you must mint both token types, create two claims with different `claim_type` attributes. A claim is represented in Terraform by the [okta_auth_server_claim](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/auth_server_claim) resource.
* **OAuth scope:** An access permission for a resource or class of resources. For a custom API with different levels of access by the user's group, create multiple scopes that represent different APIs or levels of access. A scope is represented in Terraform by the [okta_auth_server_scope](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/auth_server_scope) resource. The scopes granted by a custom authorization server may be different from the Terraform integration Service API app.
* **Okta authorization server policy:** A set of rules for minting tokens for one or more Okta apps. Okta recommends that an authorization server include at least one policy. Multiple policies are required if different OIDC apps require different behaviors. A policy is represented in Terraform by the [okta_auth_server_policy](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/auth_server_policy) resource. A policy requires one or more rules.
* **Okta authorization server policy rules:** A rule in a policy that describes the criteria for minting a token. Criteria can include group membership and other factors. APIs with different access levels include a rule for each unique granted scope. A policy rule is represented in Terraform by the [okta_auth_server_policy_rule](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/auth_server_policy_rule) resource.

For more information about OAuth claims and scopes, see the [introduction to OAuth article](/docs/concepts/oauth-openid/).

## Set up your Terraform files

For guidance on organizing your files, see [setting up a typical Okta Terraform configuration](/docs/guides/terraform-organize-configuration/main). Consider organizing your Terraform code to group related resources together. For example, create a file called `authorization.tf` that contains your authorization-related resources.

## Add or confirm the integration app scope

Your Terraform integration app must include the following API scope:

* `okta.authorizationServers.manage`

To grant scopes in the Okta Admin Console and include them in your Terraform code, see the articles on [enabling your API service application for Terraform access](/docs/guides/terraform-enable-org-access/main) and [setting up a typical Okta Terraform configuration](/docs/guides/terraform-organize-configuration/main).

These API scopes differ from the OAuth scopes that your custom authorization server grants.

## Set up an authorization server

Follow these steps to create an authorization server and the related objects in Terraform. The configuration examples in this section show minting OAuth resource access tokens for a custom API with three different types of operations. It includes policy rules that grant access to the scopes based on group membership.

### Add an authorization server

1. Create an `okta_auth_server` object.
1. Set its name and description in the `name` and `description` attributes.
1. Set the `audiences` array to the OAuth audience. The audiences identify the intended recipients of the identity and resource tokens. Each system that intends to process a token must identify itself with a value in the audience claim, which must match one element in this array. See the [RFC7519 definition of audience in JWT claims](https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.3).
1. Set `issuer_mode` to `DYNAMIC` for typical use. The issuer mode specifies the OAuth issuer on tokens based on the domain of the request, including support for custom domains. For more options, see the [provider documentation](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/auth_server).
1. Set the status to `ACTIVE`.

For example:

```hcl
resource "okta_auth_server" "api_server" {
  audiences   = ["api://api_server.mycompany.com"]
  description = "My Custom API Auth Server"
  name        = "api_server"
  issuer_mode = "DYNAMIC"
  status      = "ACTIVE"
}
```

An authorization server is created after you apply the changes. The server object now includes `kid` and `issuer,` two attributes that you use for integration. These may be used by other Terraform objects, by an external OAuth app, or both:

* `kid`: The ID of the JSON Web Key used for signing tokens issued by the authorization server. See, [Help an external OAuth app validate the token issuer](#help-an-external-oauth-app-validate-the-token-issuer).
* `issuer`: The complete URI for a custom authorization server that's required in requests to the server. This URI becomes the `iss` claim in a resource access token. You can also find the URI in the Admin Console in **Security** > **API** > **Authorization Servers**. Copy the value in the **Issuer URI** column next to the name of your authorization server.

### Add claims

Create `okta_auth_server_claim` resources. If you need both a resource access token and an identity token, create resources for both types of tokens.

For each claim:

1. Set `name` to a human-readable name.
1. Set `auth_server_id` to the ID of your authorization server.
1. Set `claim_type` to the desired claim type. Each claim can mint an identity token (`IDENTITY`) or a resource access token (`RESOURCE`). If you need both, create a claim for each of the different values of this attribute.

    > **Note:** The custom authorization server generates **OAuth refresh tokens**, which request extending the duration of access provided by a previous access token (the token type when the value of `claim_type` is `RESOURCE`). Okta mints the refresh tokens automatically and does not require additional Terraform claim resources. You can configure the timeouts for refresh token timeout values in your policy rules that use this claim.

1. For a resource token, set `scopes` to the array of granted OAuth scopes.
1. Set the `value` to the value that your OAuth app client expects for this claim, which could be dynamic expressions or based on group membership.

    * For a dynamic value from an expression, set the related field `value_type` to `EXPRESSION` (the default). Set `value` to a query string in [Okta Expression Language](/docs/reference/okta-expression-language/) that evaluates to the desired value. For example, this code snippet sets the value to `true` only if the user's email address matches the company's domain name:

      ``` hcl
       value_type = "EXPRESSION"
       value      = "String.substringAfter(user.email, \"@\\") ==
                      \\"mycompany.com\\""
      ```

    * To specify a list of user groups in the `value` field, set `value_type` to `GROUPS`. If you specify this value, set the related attribute `group_filter_type` to the type of filtering: the group name starts with this string (`STARTS_WITH`), matches the specified string (`EQUALS`), contains the specified string (`CONTAINS`), a regular expression that matches the group name (`REGEX`). Separate the groups with commas if there is more than one.

1. Set `always_include_in_token` to `true` if you want to include the claims in the token. Otherwise, set it to `false`.

For example:

```hcl
# access token
resource "okta_auth_server_claim" "example" {
  auth_server_id = okta_auth_server.api_server.id
  name           = "staff"
  value_type     = "EXPRESSION"
  value          = "String.substringAfter(user.email, \"@\") ==
                    \"mycompany.com\""
  scopes         = [
    okta_auth_server_scope.create_obj.name,
    okta_auth_server_scope.read_obj.name,
    okta_auth_server_scope.replace_obj.name,
  ]
  claim_type     = "RESOURCE"
}

# identity token
resource "okta_auth_server_claim" "example2" {
  auth_server_id = okta_auth_server.api_server.id
  name           = "staff"
  value_type     = "EXPRESSION"
  value          = "String.substringAfter(user.email, \"@\") ==
                    \"mycompany.com\""
  claim_type     = "IDENTITY"
}
```

### Add scopes

Create one or more `okta_auth_server_scope` resources for the claims returned by the server.

For each scope:

1. Set `name` to the name of the OAuth scope.
1. Set `auth_server_id` to the authorization server ID.
1. Set `metadata_publish` to `NO_CLIENTS` to prevent publishing the OIDC scope metadata for clients for this scope to the Okta-hosted [OIDC metadata](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata) for this authorization server. To publish OIDC scope metadata, set `metadata_publish` to `ALL_CLIENTS`. The URL, the issuer URI with a special suffix, is unique for each authorization provider on the Okta server. If you publish the metadata, the authorization server includes it in the metadata generated for the URI.

1. Set `consent` to `REQUIRED` to require the end user to approve granting the scope. Okta displays a consent dialog to allow the release of information. For example, when you sign in to a third-party app, Okta displays a consent prompt to enable the app access to details such as your email address. If the user chooses to opt out, authorization fails. To skip the consent dialog, set `consent` to `IMPLICIT`.

   Optionally, you can set `display_name` to the name of this scope that's displayed in the consent dialog. Otherwise the value of the `named` field is displayed.
1. Optionally set `default` to `true` to support requests with empty scope lists from the requestor. This adds the scope to an access token when the client omits the scope parameter in a token request. It also requires an authorization server policy rule that permits the behavior.
1. Set `optional` to `false` if this scope is required. Otherwise, set it to `true`.

    > **Tip:** It's unsupported to set both `optional` and `default` to `true`, as they are mutually exclusive.

This example creates three scopes for the API operations create, read, and replace:

```hcl
resource "okta_auth_server_scope" "create_obj" {
  auth_server_id = okta_auth_server.api_server.id
  metadata_publish = "NO_CLIENTS"
  name             = "apicreate"
  consent          = "REQUIRED"
}

resource "okta_auth_server_scope" "read_obj" {
  auth_server_id = okta_auth_server.api_server.id
  metadata_publish = "NO_CLIENTS"
  name             = "apiread"
  consent          = "REQUIRED"
}

resource "okta_auth_server_scope" "replace_obj" {
  auth_server_id = okta_auth_server.api_server.id
  metadata_publish = "NO_CLIENTS"
  name             = "apireplace"
  consent          = "REQUIRED"
}
```

### Add an authorization server policy

Create at least one policy that specifies how to mint the tokens with the correct scopes based on your defined rules.

Create an authorization server policy:

1. Create an `okta_auth_server_policy` resource.
1. Set `name` and `description` to the policy name and policy's description.
1. Set `auth_server_id` to your authorization server ID.
1. Set `status` to `ACTIVE`.
1. Set `client_whitelist` to an array of the client IDs that use this policy. Pass the special array value `["ALL_CLIENTS"]` to use with all apps. To enable different policies for different apps, create multiple authorization server policies.
1. If this is your only authorization server policy, set `priority` to `1`.

   For more than one authorization server policy, set the `priority` attribute to `1`, `2`, `3`, and so on. To ensure reliable deployment of multiple policies, you must force Terraform resource creation order to match the `priority` attribute. Add the `depends_on` Terraform meta attribute to the policy with priority `2` so it depends on the one with priority `1`, and so on. For more information, see [Managing policy and rule dependencies](/docs/guides/terraform-syntax-tips/main/#managing-policy-and-rule-dependencies).

For example:

```hcl
resource "okta_auth_server_policy" "example" {
  auth_server_id = okta_auth_server.api_server.id
  status           = "ACTIVE"
  name             = "My OIDC App Authorization Policy"
  description      = "example OIDC App Authorization Policy"
  priority         = 1
  client_whitelist = [okta_app_oauth.MyOIDCApp.id]
}
```

### Add authorization server policy rules

1. Create an `okta_auth_server_policy_rule` resource.
1. Set `name` to a human-readable rule name.
1. Set `auth_server_id` to the authorization server ID.
1. Set `policy_id` to the policy ID.
1. Set `status` to `ACTIVE`.
1. Set `scope_whitelist` to the list of allowed scopes for this rule's app. Specify them as an array of IDs in the scope resource.

   Optionally, you can pass the special value `["*"]` to grant all custom scopes defined in Terraform resources. Okta recommends using caution, especially if there may be multiple apps with different scopes in the future.

1. Define one or more criteria for granting a requestor the specified scopes. You can set several fields:

    * Set `group_whitelist` to the groups whose members are assigned the scopes listed in the `scope_whitelist` attribute. Specify as an array of Okta group IDs. A user must be a member of at least one of these groups to receive the scopes.
    * Set `group_blacklist` to the groups whose members aren't assigned the scopes listed in the `scope_whitelist` attribute. Specify as an array of Okta group IDs. If a user is a member of at least one of these groups, this rule blocks the user from getting scopes.
    * Set `user_whitelist` to the users who can receive the requested scopes. Specify these as an array of strings that contain email addresses. For example:

      ```hcl
      ["a@b.com", "[c@d.com]"]
      ```

    * Set `user_blacklist` to the users who can receive the requested scopes. Specify these as an array of strings containing email addresses, such as:
      ```hcl
      ["a@b.com", "[c@d.com]"]
      ```

   It's important to understand how these fields interact. All users are authorized unless you include both `user_whitelist` and `group_whitelist`. Otherwise, users are authorized if they are on the `user_whitelist` or in a group on the `group_whitelist`.

   Next, if the user is in an excluded group or the `user_blacklist`, they're excluded because exclusion takes precedence over inclusion. However, if the include group field explicitly includes the `"Everyone"` group, there's a special behavior. The rule applies to all users; adding excluded groups or users is ignored.

1. Set `grant_type_whitelist` to `authorization_code` for a typical OAuth app flow with optional PKCE verification. For grant types for other OAuth flows that are not described here in detail, see the [provider docs for this resource](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/auth_server_policy_rule).
1. Optionally set token timeouts for access tokens and refresh tokens. A refresh token is a type of access token that extends the lifetime of a previous access token request. Refresh tokens can be refreshed multiple times.

    * Set `access_token_lifetime_minutes` to the lifetime of an access token, specified as the number of minutes between `5` and `1440`. The default is `60`.
    * Set `refresh_token_lifetime_minutes` to the lifetime of a refresh token.
    * Set `refresh_token_window_minutes` to the maximum number of minutes for using a refresh token before it expires. Supported values are from `5` to `2628000` (five years). The default is `10080` (seven days). Using the token resets the timeout.

      > **Caution:** The `refresh_token_window_minutes` value must be between the values for the `access_token_lifetime_minutes` and `refresh_token_lifetime_minutes` arguments.

1. When Okta runs this rule as an optional advanced feature, it can contact an external system to enrich the newly minted token with another type of token from the external system. This is called an *inline hook*. To do this, you need to create another Terraform resource of type `inline_hook` and then set `inline_hook_id` to the ID of that resource. See the [provider documentation for inline hooks](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/inline_hook).
1. If this is your only authorization server policy rule, set `priority` to `1`. For more than one rule, set the `priority` attribute to `1`, `2`, `3`, and so on based on the desired order. To ensure reliable deployment of multiple rules, you must force the Terraform resource creation order to match the `priority` attribute.  Add the `depends_on` Terraform meta attribute to the rule with priority `2` so it depends on the one with priority `1`, and so on.  For more information, see [Managing policy and rule dependencies](/docs/guides/terraform-syntax-tips/main/#managing-policy-and-rule-dependencies).

The following example adds two rules. The first rule grants all claim scopes (plus the default `openid` scope) if the user is in the Okta group defined in Terraform with the name `writable_permissions_api`. The second rule specifies that users in the Okta group with the name `readonly_permissions_api` have access only to the `read_obj` scope (plus the default `openid` scope).

```hcl
# For users in group writable_permissions_api, grant ALL scopes
resource "okta_auth_server_policy_rule"
    "rule_for_staff_with_writable_permissions" {
  auth_server_id       = okta_auth_server.api_server.id
  policy_id            = okta_auth_server_policy.example.id
  status               = "ACTIVE"
  name                 = "rule_for_staff_with_writable_permissions"
  priority             = 1
  group_whitelist      = [ okta_group.writable_permissions_api.id ]
  grant_type_whitelist = ["authorization_code"]
  scope_whitelist      = ["*"]
}

# For users in group readonly_permissions_api, grant ONLY the readapi scope
resource "okta_auth_server_policy_rule"
    "rule_for_staff_with_readonly_permissions" {
  auth_server_id = okta_auth_server.api_server.id
  policy_id            = okta_auth_server_policy.example.id
  status               = "ACTIVE"
  name                 = "rule_for_staff_with_readonly_permissions"
  priority             = 2
  group_whitelist      = [ okta_group.readonly_permissions_api.id ]
  grant_type_whitelist = ["authorization_code"]
  scope_whitelist      = [ okta_auth_server_scope.read_obj.name , "openid"]
  depends_on = [
    okta_auth_server_policy_rule.rule_for_staff_with_writable_permissions ]
}
```

Because there's more than one rule, all rules with a `priority` greater than `1` must declare explicit creation order with the `depends_on` meta attribute. See [Managing policy and rule dependencies](/docs/guides/terraform-syntax-tips/main/#managing-policy-and-rule-dependencies)

### Help an external OAuth app validate the token issuer

For a production system, it is a best practice for an external app that receives the token to confirm that the right issuer issued the token.

There are multiple ways that external apps can verify that Okta minted the tokens:

* Use the Okta REST API to call the [authorization server introspect operation](/docs/reference/api/oidc/#introspect). The request takes an access token, ID token, refresh token, or device secret and returns a boolean that indicates whether the token is active.
* Get the public key from the Okta-published JWKS endpoint. The key ID is in the header of the JWTs that Okta issues.

### Test your external app with your authorization server

Test your external app with your new authorization server. For initial testing, you can use Okta sample code to implement OAuth. See the [sample page](/docs/guides/sampleapp-oie-redirectauth/go/main/) and choose the platform from the selector in the upper right.

The Okta configuration has no extra steps to support the [OAuth Authorization Code flow with Proof Key for Code Exchange](/docs/concepts/oauth-openid/#authorization-code-flow-with-pkce-flow) (PKCE). Okta handles PKCE automatically if the OAuth request includes the challenge. However, you must properly configure your external OAuth app to add the challenge field in the authorization request and validate it in the response.

Be sure to set the issuer correctly in the request from your OAuth app. The issuer is the complete URL for your custom authorization server, which is essential so that your external systems can include it in requests. If you use Okta custom domains, use the custom domains as appropriate to ensure that branding customizations occur.

You can get the issuer from the `issuer` attribute. After creating the resource, you can find it in the Terraform state file or create an output block to write it to the console. The issuer URI becomes the `iss` claim in a resource access token. You can also get this manually in the Admin Console in **Security** > **API** > **Authorization Servers**. Next to your authorization server name, copy the value in the **Issuer URI** column.

Your issuer URI includes your Okta domain and authorization server ID. It has the format `https://<okta-domain>/oauth2/<auth-server-ID>`. For the Okta domain, be careful to correctly set the base URL of your domain, which ends in `okta.com`, `oktapreview.com`, or `okta-emea.com`.

For servers that you create using the instructions in this article, the URI ends with the authorization server's ID. Note that this differs from issuer URIs that end in `default` to indicate the default custom authorization server. If you aren't using custom domains, the issuer might look like one of these examples:

* `https://mycompany.okta.com/oauth2/ause865vcvrGz6MxP1ee`
* `https://mycompany.oktapreview.com/oauth2/ause865vcvrGz6MxP1ee`
* `https://trial-12300000.okta.com/oauth2/ause865vcvrGz6MxP1ee`
If you use custom domains, use your custom domain in the issuer as the domain, for example:

* `https://sso.mycompany.com/oauth2/ause865vcvrGz6MxP1ee`

## Review resources in the Admin Console

You can confirm your authorization servers and their associated policies and rules in the Admin Console. In the Admin Console, go to **Security** > **API** > **Authorization servers**. Remember that if you manage these objects in Terraform, never modify authorization servers or related resources in the Admin Console. See [Avoid problems caused by configuration drift](/docs/guides/terraform-organize-configuration/main/#avoid-problems-caused-by-configuration-drift).

