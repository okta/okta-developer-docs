---
title: Manage user access with Terraform
excerpt: Automate the policies that control how end users authenticate to and access Okta applications.
layout: Guides
---

Automate the policies that control how end users authenticate to and access Okta applications.

---

#### Learning outcomes

* Configure a passwordless sign-in flow using the Okta Terraform Provider
* Configure multifactor authentication (MFA) with Okta Verify using the Okta Terraform Provider
* Enforce priority order for policies and rules

#### What you need

* Familiarity with the Terraform terms: configuration, resources, state, and commands. See the [Terraform overview](/docs/guides/terraform-overview).
* [Okta Developer Edition organization](https://developer.okta.com/signup) or an Okta Identity Engine organization
* A Terraform configuration that can access your Okta org. See [Enable Terraform access for your Okta org](/docs/guides/terraform-enable-org-access).
---
## Overview

Users must sign in to access Okta applications. The requirements for signing in are specified using policies. Okta uses several [policy types](https://developer.okta.com/docs/concepts/policies/#policy-types) for controlling user access. Policies apply to Okta groups and applications, depending on the policy type. You can use Terraform to manage these policies by adding them to your configuration.

Policies contain rules that specify a set of conditions and the resulting actions if those conditions are met. For example, you can create a rule for an authentication policy that requires users from a certain country to use two authentication factors when signing in to an Okta application. You can also create a second rule that requires only one authentication factor for known devices.

Many policies and their rules have priority orders that determine the order in which Okta applies them. When a user signs in to your org, Okta checks policies in order of priority and applies the first policy that matches the user. After applying a policy, Okta then checks the rules for that policy in order of priority and applies the first rule that matches the user.

> **Note:** Explicitly set priority values when using Terraform to manage your policies and rules. Otherwise, the configuration might create an unintended priority order, which changes how users access Okta and might reduce org security. For example, if a catch-all rule for the Everyone group unintentionally has the highest priority, none of the other rules apply to users. See [Manage priority order with Terraform](#manage-priority-order-with-terraform).

## Policies for user sign-in flows

Configure the authentication and authorization experience for users signing in to Okta. Policies set the conditions and required actions for authentication and the limits of authorization.

> **Note:** This guide uses policies available with the Okta Identity Engine.

### Global session policies

Use global session policies to specify the requirements for establishing an Okta session, the first step in the sign-in process. With global session policies, you control who can establish a session, how they establish a session, and how long their session lasts. Use the [`okta_policy_signon`](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/policy_signon) and [`okta_policy_rule_signon`](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/policy_rule_signon) resources to manage global session policies with Terraform.

You assign global session policies to one or more groups. The policies apply to those groups in order of priority. All orgs have a default global session policy that has the lowest priority and applies to the Everyone group. This default policy acts as a catch-all for your org.

> **Note:** It’s possible to accidentally block users with global session policies. For example, if a global session policy requires a user to enter a password, passwordless users can’t sign in. Test your global session policies in a development environment before deploying to production.

For more information on global session policies, see [Sign-on policies](/docs/concepts/policies/#sign-on-policies).

### Authentication policies

Use authentication policies to specify the requirements for accessing applications after a user has established an Okta session. With authentication policies, you customize the required authentication factors used for each application in your org. Use the [`okta_app_signon_policy`](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/app_signon_policy) and [`okta_app_signon_policy_rule`](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/app_signon_policy_rule) resources to manage authentication policies with Terraform.

Authentication policies have no priority order, because every application in your org uses exactly one authentication policy. Multiple apps can use the same authentication policy. Okta provides some preset policies with standard sign-in requirements, including a default policy automatically assigned to new apps.

Rules within an authentication policy have a priority order. Each authentication policy has a default, catch-all rule that applies to all users. This default rule has the lowest priority.

For more information on global session policies, see [Sign-on policies](/docs/concepts/policies/#sign-on-policies).

### Authenticator enrollment policies

Use authenticator enrollment policies to allow users to set up different authenticators for their sign-in flows. Authenticator enrollment policies configure whether each authenticator in your org is required, optional, or disabled. Use the [`okta_policy_mfa`](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/policy_mfa) and [`okta_policy_rule_mfa`](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/policy_rule_mfa) resources to manage authenticator enrollment policies with Terraform.

You assign authenticator enrollment policies to one or more groups. A group uses the highest priority policy assigned to it. Every Okta org has a default authenticator enrollment policy that has the lowest priority and applies to the Everyone group.

For more information on authenticator enrollment policies, see [Enrollment policies](https://developer.okta.com/docs/concepts/policies/#enrollment-policies).

## Configure a passwordless sign-in flow

Create and manage an authentication process that requires users to use an email authenticator instead of a password. Passwordless sign-in flows eliminate the risk of passwords and reduces sign-up time for users.

Add resources to your Terraform configuration for the authenticators, policies, rules, groups, and users required for a passwordless sign-in flow. Use a Terraform configuration that has access to your org. See [Enable Terraform access for your Okta org](/docs/guides/terraform-enable-org-access).

This example requires the `okta.apps.read`, `okta.policies.manage`,  `okta.groups.manage`, `okta.authenticators.manage`, and `okta.users.manage` scopes.

Configure the email authenticator and then create a group, global session policy, authenticator enrollment policy, and user for a passwordless sign-in flow:

1. In the `main.tf` Terraform configuration file, add an `okta_authenticator` resource to configure email as an authenticator.

   1. Set `key` to `okta_email`.
   1. Set `status` to `ACTIVE`.
   1. Set `allowedFor` in the `settings` argument to `any`, which configures the email authenticator for authentication and recovery.


    ```hcl
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
    ```

1. Add an `okta_group` resource to create a group for passwordless users.

    ```hcl
    resource "okta_group" "passwordless_group" {
      name = "Passwordless Group"
    }
    ```

   > **Note:** Use groups to configure sign-in flows for users. This helps you control org security, and prevents you from locking yourself out of your org.

1. Add an `okta_policy_signon` resource to create a global session policy.

   1. Set `status` to `ACTIVE`.
   1. Set `priority` to `1` if you don’t have existing global session policies. Otherwise, set the priority to a value that works for your existing priority order. See [Manage priority order with Terraform](#manage-priority-order-with-terraform).
   1. Set `groups_included` to the passwordless group ID.

    ```hcl
    resource "okta_policy_signon" "passwordless_global_session_policy" {
      name = "Passwordless Global Session Policy"
      status = "ACTIVE"
      priority = 1
      groups_included = [ okta_group.passwordless_group.id ]
    }
    ```

1. Add an `okta_policy_rule_signon` to create a rule for the global session policy.

   1. Set the `policy_id` to the global session policy ID that you created in the previous step.
   1. Set `status` to `ACTIVE`.
   1. Set `access` to `ALLOW`.
   1. Set the `primary_factor` argument to `PASSWORD_IDP_ANY_FACTOR`. This allows users to establish a session with any factor that satisfies the authentication policy for the application they’re accessing.

    ```hcl
    resource "okta_policy_rule_signon" "passwordless_global_session_policy_rule" {
      name = "Global Session Policy Rule"
      policy_id = okta_policy_signon.passwordless_global_session_policy.id
      priority = 1
      status = "ACTIVE"
      access = "ALLOW"
      primary_factor = "PASSWORD_IDP_ANY_FACTOR"
    }
    ```

1. Add an `okta_policy_mfa` resource to create an authenticator enrollment policy.

   1. Set `status` to `ACTIVE`.
   1. Set `groups_included` to the passwordless group ID.
   1. Set `okta_email` to `REQUIRED` to require users to enroll in the email authenticator.
   1. Set `okta_password` to `NOT_ALLOWED` to prevent users from enrolling in the password authenticator.
   1. Set `is_oie` to `true`. Okta Classic Engine supports only setting `okta_password` to `REQUIRED`.

    ```hcl
    resource "okta_policy_mfa" "passwordless_authenticator_enrollment_policy" {
      name = "Passwordless Authenticator Enrollment Policy"
      status = "ACTIVE"
      is_oie = true
      groups_included = [ okta_group.passwordless_group.id ]
      okta_password = {enroll = "NOT_ALLOWED"}
      okta_email = {enroll = "REQUIRED"}
      priority = 1
    }
    ```

1. Add an `okta_policy_rule_mfa` resource to configure a rule for the authenticator enrollment policy.

   1. Set `policy_id` to the ID of the authenticator enrollment policy that you created in the previous step.
   1. Set `status` to `ACTIVE`.
   1. Set `enroll` to `LOGIN` to allow users to set up required or optional authenticators when signing in to your org.

    ```hcl
    resource "okta_policy_rule_mfa" "passwordless_authenticator_enrollment_policy_rule" {
      name = "Passwordless Authenticator Enrollment Policy Rule"
      policy_id = okta_policy_mfa.passwordless_authenticator_enrollment_policy.id
      status = "ACTIVE"
      enroll = "LOGIN"
      priority = 1
    }
    ```

1. Add an `okta_user` resource to create a user for testing the passwordless sign-in flow. Use an email address that you can access. When you test the passwordless sign-in flow, you receive an email to sign in to Okta.

    ```hcl
    resource "okta_user" "passwordless_test_user" {
      first_name = "Passwordless"
      last_name = "TestUser"
      login = "passwordlesstestuser@example.com"
      email = "passwordlesstestuser@example.com"
    }
    ```

1. Add an `okta_user_group_memberships` to assign the user to the group for passwordless users.

    ```hcl
    resource "okta_user_group_memberships" "passwordless_user_assignment" {
      user_id = okta_user.passwordless_test_user.id
      groups = [ okta_group.passwordless_group.id ]
    }
    ```

Now that you’ve created policies that control access to your org, create an authentication policy that controls access to Okta apps. This example creates an authentication policy for the Okta End-User Dashboard, an application built into your Okta org that displays Okta apps to end users.

Built-in Okta applications require a special technique to assign authentication policies using Terraform. You add rules to an existing authentication policy that’s assigned to the app, instead of controlling the app settings directly.

> **Note:** For applications that aren’t built into Okta, add an authentication policy using the  `okta_app_signon_policy` resource and assign the policy to an app using the appropriate app resource for your app type. For example, use the `okta_app_oauth` resource for an OAuth app.

This next example adds a rule to the authentication policy that’s already assigned to the End-User Dashboard. Before you run your Terraform configuration, check to see if other applications use this authentication policy. This new rule affects those applications.

Configure a passwordless sign-in flow for the End-User Dashboard app:

1. In your Terraform configuration, add an `okta_app` data source to get the attributes of the End-User Dashboard app. This data source contains the app ID of the End-User Dashboard for the next step.

    ```hcl
    data "okta_app" "okta_dashboard" {
      label = "Okta Dashboard"
    }
    ```

1. Add an `okta_app_signon_policy` data source to get the attributes of the authentication policy assigned to the End-User Dashboard app. This data source contains the policy ID for the End-User Dashboard for the next step.

   1. Set `app_id` to the End-User Dashboard ID using the data source that you created in the previous step.
   1. Set `depends_on` to the data source that you created in the previous step. This requires that Terraform creates the End-User Dashboard data source first.

    ```hcl
    data "okta_app_signon_policy" "okta_dashboard_authentication_policy" {
      app_id = data.okta_app.okta_dashboard.id
      depends_on = [
        data.okta_app.dashboard
      ]
    }
    ```

1. Add an `okta_app_signon_policy_rule` resource to create a rule for the End-User Dashboard authentication policy.

   1. Set `policy_id` to the authentication policy ID of the End-User Dashboard. The data source that you created in the last step contains this ID.
   1. Set `access` to `ALLOW`.
   1. Set `factor_mode` to `1FA` to allow users to use any factor to sign in. Assign the group for passwordless users to the rule.
   1. Set `groups_included` to the passwordless group ID.

    ```hcl
    resource "okta_app_signon_policy_rule" "passwordless_authentication_policy_rule" {
      name = "Passwordless Authentication Policy Rule"
      policy_id = data.okta_app_signon_policy.okta_dashboard_authentication_policy.id
      access = "ALLOW"
      factor_mode = "1FA"
      groups_included = [ okta_group.passwordless_group.id ]
      priority = 1
    }
    ```

Run the Terraform configuration to apply the changes to your org:

1. In a terminal, go to the directory that contains your Terraform configuration.
1. Run `terraform init` to initialize the Terraform configuration.
1. Run `terraform plan` to preview the changes to your Okta org. Check the plan to confirm that Terraform creates the resources that you added to the configuration and doesn't change any existing resources.
1. Run `terraform apply` to apply the changes to your org. Enter “yes” when prompted to confirm.
1. Check your Admin Console to confirm that Terraform created the resources:
   1. Go to **Security** > **Authenticators** to check that the email authenticator is enabled.
   1. Go to **Directory** > **Groups** to check the passwordless group. Click the group to check that the passwordless test user is a member.
   1. Go to **Security** > **Global Session Policy** to check the global session policy.
   1. Go to **Security** > **Authenticators** and click **Enrollment** to check the authenticator enrollment policy.
   1. Go to **Directory** > **People** to check the passwordless test user.
   1. Go to **Security** > **Authentication Policies** and click the authentication policy assigned to the End-User Dashboard app to check the authentication policy rule.

Test the passwordless sign-in flow with the user that you created:

1. In a private browsing session, go to your Okta org.
1. On the sign-in page, enter the email of the passwordless test user in the **Username** field.
1. Click **Next** to go to the verification page.
1. Click **Send me an email** to send a verification email to the passwordless test user.
1. In the email of your passwordless test user, copy the one-time passcode.
1. On the Okta verification page, click **Enter a verification code instead**.
1. Paste the one-time passcode into the **Enter Code** field.
1. Click **Verify** to sign in to your End-User Dashboard. If you can access the dashboard, you successfully configured a passwordless sign-in flow using Terraform.

## Configure a multifactor sign-in flow

Create and manage an authentication process that requires a password and Okta Verify for a user sign-in flow. Requiring users to verify their identity in two different ways increases org security. See [Multifactor authentication](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-authenticators).

This example configuration builds on the earlier configuration of a passwordless sign-in flow. It uses the same global session policy but adds new policies, rules, authenticators, groups, and test users. The example configuration uses the recommended techniques for managing priority order with multiple policies and rules of the same type. See [Manage priority order with Terraform](#manage-priority-order-with-terraform).

If you want to configure a multifactor sign-in flow without following the passwordless sign-in example, adjust the priority values and create a global session policy.

This example requires the same scopes as the passwordless sign-in example: `okta.apps.read`, `okta.policies.manage`,  `okta.groups.manage`, `okta.authenticators.manage`, and `okta.users.manage`.

1. In the `main.tf` Terraform configuration file, add an `okta_group` resource to create a group for multifactor users.

    ```hcl
    resource "okta_group" "multifactor_group" {
      name = "Multifactor Group"
    }
    ```

   > **Note:** Use groups to configure sign-in flows for users. This helps you control org security and prevents you from locking yourself out of your org.

1. Add an `okta_authenticator` resource to configure Okta Verify as an authenticator.

   1. Set `key` to `okta_verify`.
   1. Set `status` to `ACTIVE`.
   1. Set the `allowedFor` field in the `settings` argument to `any`. This configures Okta Verify for both authentication and recovery.

    ```hcl
    resource "okta_authenticator" "okta_verify_authenticator" {
      name = "Okta Verify Authenticator"
      key = "okta_verify"
      status = "ACTIVE"
      settings = jsonencode(
        {
          "allowedFor" : "any"
        }
      )
    }
    ```

1. Add an `okta_policy_mfa` resource to create an authenticator enrollment policy.

   1. Set `status` to `ACTIVE`.
   1. Set `groups_included` to the multifactor group ID.
   1. Set `okta_email` to `REQUIRED` to require users to enroll in the email authenticator.
   1. Set `okta_verify` to `OPTIONAL` to allow users to enroll in Okta Verify.
   1. Set `okta_password` to `OPTIONAL` to allow users to enroll in the password authenticator.
   1. Set `is_oie` to `true`. Okta Classic supports only setting `okta_password` to `REQUIRED`.
   1. Set `priority` and `depends_on` according to the guidelines in [Manage priority order with Terraform](#manage-priority-order-with-terraform).

    ```hcl
    resource "okta_policy_mfa" "multifactor_authenticator_enrollment_policy" {
      name = "Multifactor Authenticator Enrollment Policy"
      status = "ACTIVE"
      is_oie = true
      groups_included = [ okta_group.multifactor_group.id ]
      okta_email = {enroll = "REQUIRED"}
      okta_password = {enroll = "OPTIONAL"}
      okta_verify = {enroll = "OPTIONAL"}
      priority = 2
      depends_on = [ okta_policy_mfa.passwordless_authenticator_enrollment_policy ]
    }
    ```

1. Add an `okta_policy_rule_mfa` resource to configure a rule for the authenticator enrollment policy.

    ```hcl
    resource "okta_policy_rule_mfa" "multifactor_authenticator_enrollment_policy_rule" {
      name = "Multifactor Authenticator Enrollment Policy Rule"
      policy_id = okta_policy_mfa.multifactor_authentication_enrollment_policy.id
      status = "ACTIVE"
      enroll = "LOGIN"
      priority = 1
    }
    ```

1. Add an `okta_user` resource to create a user for testing the multifactor sign-in flow. Use an email address that you can access. When you test the multifactor sign-in flow, you receive an email to activate your account.

    ```hcl
    resource "okta_user" "multifactor_user" {
      first_name = "Multifactor"
      last_name = "TestUser"
      login = "multifactortestuser@example.com"
      email = "multifactortestuser@example.com"
    }
    ```

1. Add an `okta_user_group_memberships` to assign the user to the group of multifactor users.

    ```hcl
    resource "okta_user_group_memberships" "multifactor_user_assignment" {
      user_id = okta_user.multifactor_user.id
      groups = [ okta_group.multifactor_group.id ]
    }
    ```

1. Add an `okta_app_signon_policy_rule` resource to create a rule for the End-User Dashboard authentication policy.

   1. Set `policy_id` to the authentication policy ID of the End-User Dashboard.
   1. Set `access` to `ALLOW`.
   1. Set `factor_mode` to `2FA` to require any two factors for the sign-in flow. Assign the group for multifactor users to the rule.
   1. Set `groups_included` to the multifactor group ID.
   1. Set `priority` and `depends_on` according to the guidelines in [Manage priority order with Terraform](#manage-priority-order-with-terraform).

    ```hcl
    resource "okta_app_signon_policy_rule" "multifactor_authentication_policy_rule" {
      name = "Multifactor Authentication Policy Rule"
      policy_id = data.okta_app_signon_policy.okta_dashboard_authentication_policy.id
      access = "ALLOW"
      factor_mode = "2FA"
      groups_included = [ okta_group.multifactor_group.id ]
      priority = 2
      depends_on = [ okta_policy_mfa.multifactor_authenticator_enrollment_policy ]
    }
    ```

Run the Terraform configuration to apply the changes to your org:

1. In a terminal, go to the directory that contains your Terraform configuration.
1. Run `terraform init` to initialize the Terraform configuration.
1. Run `terraform plan` to preview the changes to your Okta org. Check the plan to confirm that Terraform creates the resources that you added to the configuration and doesn't change any existing resources.
1. Run `terraform apply` to apply the changes to your org. Enter **yes** when prompted to confirm
1. Check your Admin Console to confirm that Terraform created the resources.
   1. Go to **Security** > **Authenticators** to check that the email authenticator is enabled.
   1. Go to **Directory** > **Groups** to check the passwordless group. Click the group to check that the passwordless test user is a member.
   1. Go to **Security** > **Global Session Policies** to check the global session policy.
   1. Go to **Security** > **Authenticators** and click **Enrollment** to check the authenticator enrollment policy.
   1. Go to **Directory** > **People** to check the passwordless test user.
   1. Go to **Security** > **Authentication Policies** and click the authentication policy assigned to the End-User Dashboard app to check the authentication policy rule.

Test the multifactor sign-in flow:

1. Open the welcome email Okta sent to your multifactor user and copy the activation link.
1. In a private browsing session, paste the activation link to activate the multifactor test user.
1. On the sign-in page, click **Set up** for the password security method.
1. Enter and re-enter a password for the multifactor user, and then click **Next**. You now have both email and password as MFA factors.
1. (Optional) Click **Set up** for the Okta Verify security method. Follow the instructions for setting up Okta Verify with a mobile device.

If you can access the dashboard with the multifactor user, you successfully configured MFA using Terraform.

## Manage priority order with Terraform

Use Terraform to control the order in which Okta applies policies and rules that use priority. Managing the priority order is a complex but vital part of managing policies with Terraform. It’s important that the policies and rules that you create apply to the right users.

To ensure a specific priority order and to avoid errors, follow these guidelines:

* For any given policy type, use unique priority values for each policy, starting with a priority value of 1 (highest priority) and incrementing the priority value by 1 for each subsequent policy. A default policy automatically takes on the highest priority value (lowest priority).
* For a set of rules within a policy, use unique priority values for each rule, starting with a priority value of 1 (highest priority) and incrementing priority by 1 for each subsequent rule. A default rule automatically has the highest priority value (lowest priority).
* Use the “depends_on` meta-argument to force Terraform to create and modify resources in the order of priority. Set the resource with a priority of 2 to depend on the resource with a priority of 1, the resource with a priority of 3 to depend on the resource with a priority of 2, and so on.
* Use only Terraform to manage policies and rules.

For example, specify the priority order of three global session policies:

```hcl
resource "okta_policy_signon" "example_global_session_policy1" {
  name = "Global Session Policy 1"
  priority = 1
}

resource "okta_policy_signon" "example_global_session_policy2" {
  name = "Global Session Policy 2"
  priority = 2
  depends_on = [ okta_policy_signon.example_global_session_policy1 ]
}

resource "okta_policy_signon" "example_global_session_policy3" {
  name = "Global Session Policy 3"
  priority = 3
  depends_on = [ okta_policy_signon.example_global_session_policy2 ]
}
```
