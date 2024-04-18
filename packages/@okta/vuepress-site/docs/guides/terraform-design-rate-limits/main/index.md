---
title: Optimize Terraform access to Okta APIs
excerpt: Optimize your configuration to reduce the number of API calls that Terraform makes, and set custom rate limits to stop Terraform before you reach your org's rate limits.
layout: Guides
---

Optimize your configuration to reduce the number of API calls that Terraform makes, and set custom rate limits to stop Terraform before you reach your org's rate limits.

---

#### Learning outcomes

* Optimize the number of API calls in your Terraform configuration.
* Set a maximum rate for Terraform API usage.
* Set custom rate limits in the Okta service app used by Terraform.

---

## Overview

API rate limits in Okta protect the service for all customers by restricting the rate of API calls to your org. Terraform can reach rate limits quickly when it makes many API calls in a short period.

The rate limits for an org vary by API endpoint. Reaching the rate limit for an endpoint temporarily pauses actions that make API calls to that endpoint. This can include Terraform automation, user sign-in flows, and more.

You can view the rate limits and API use of your org on the **Reports** > **Rate Limits** page in the Admin Console. See [Rate limits overview](/docs/reference/rate-limits/).

When a Terraform request exceeds a rate limit, Okta returns an `HTTP 429 Too Many Requests` error, and Terraform stops running your configuration. There are several preventative methods of reducing rate limit errors to keep your org running smoothly.

## Optimize resources in your configuration

The first step in minimizing rate limit issues is to reduce inefficiencies in your configuration. Unused and incorrectly formatted resources contribute to API use.

### Remove unnecessary resources

Identify resources that don't impact org functionality or user experience, and remove them from your Terraform configuration. For example, if you create a new high-priority policy for the same groups as existing low-priority policies, remove the low-priority policies that no longer apply to those groups.

Removing unnecessary resources from your configuration reduces the number of API calls made by Terraform. When you run your configuration, Terraform makes API calls to read the real-world state of resources, including unnecessary resources. Terraform can make additional API calls if you modify an unnecessary resource.

### Reduce automatic corrections to objects

Configure your resources with sufficient and accurate information such that Okta doesn't automatically adjust the objects. Okta can automatically change the objects created by Terraform in these cases:

* When you don't specify enough information in a resource, Okta fills in the missing information.
* When you specify conflicting information, Okta adjusts the values to resolve the conflict.

These automatic changes make the state of your org different from what's described in your Terraform configuration. This is known as configuration drift. When you run your configuration again, Terraform tries to fix this drift, resulting in unnecessary API calls.

For example, the following process is an example of configuration drift:

1. You run a configuration that creates an authenticator enrollment policy without a group assignment.
1. Okta automatically assigns the Everyone group to the policy because policies must have an assigned group. The real-world state of your org has drifted from what your configuration describes.
1. When you run the configuration again, Terraform removes the Everyone group assignment, because your configuration doesn't specify a group assignment.
1. Okta automatically re-assigns the Everyone group to the policy, and the real-world state has drifted again.

This looping sequence means that every time you run your configuration, Terraform makes more API calls. You can resolve this by specifying a group in the authenticator enrollment policy resource.

Another example of configuration drift occurs when you assign priority values incorrectly to policies, for example:

1. You run a configuration that contains multiple policies with the same priority value.
1. Okta resolves the conflict by assigning unique priority values. The real-world state of your org has drifted from what your configuration describes.
1. When you run the configuration again, Terraform tries to assign the priority values that you specified in the configuration.
1. Okta updates the priority values as it did in step 2.

Terraform makes API calls to return your org to the conflicted state when Okta automatically adjusts policy priorities to resolve conflicts. You can avoid this situation by correctly assigning priority values. See [Manage priority order with Terraform](/docs/guides/terraform-manage-user-access/main/#manage-priority-order-with-terraform).

Use `terraform plan` to identify configuration drift. If a plan contains a change to a resource that you didn't modify, you've found an instance where Okta is automatically changing your resources after you apply the configuration.

## Minimize read requests

Terraform makes requests to refresh the state file with the current state of your org each time you run the `terraform plan` and `terraform apply` commands. These refresh requests can cause your org to reach a rate limit.

Although refreshing the state file is important for Terraform automation, it might not be necessary to refresh the state with every `plan` and `apply` command. The techniques described in the following sections reduce the number of refresh requests made by Terraform.

### Save Terraform plans

Run your configuration with a saved plan to refresh the state file only once. When you save a plan, Terraform refreshes the state file. When you run the saved plan, Terraform uses that refreshed state file and doesn't make more refresh requests.

> **Note:** If admins and other apps manage your org, apply the saved plan shortly after creating it. This reduces errors by minimizing configuration drift.

To save a Terraform plan:

1. Open a terminal, and then go to your configuration directory.
1. Run `terraform plan -out=${examplePlanName}` to build the plan and save it to the `examplePlanName` file.

   > **Note:** Use a filename without a file extension or with a file extension that Terraform doesn't recognize. For example, if you use a `.tf` file extension, Terraform tries to include the file as part of the configuration.

1. Verify that the plan includes the desired org changes.
1. Run `terraform apply ${examplePlanName}` to apply the changes from the saved plan.

### Disable refresh requests

The `terraform plan` and `terraform apply` commands have a `refresh=false` option that runs the commands without refresh requests. When this option is used, the commands run using the existing state file.

> **Note:** Run your configuration without refreshing only if admins and other apps aren't managing your org. Otherwise, configuration drift can occur and cause errors.

Use the `refresh=false` option to apply a Terraform configuration:

1. Open a terminal, and then go to your configuration directory.
1. Run `terraform plan` to build the plan and verify the changes to your org. This command refreshes the state file with the current state of your org to prevent configuration drift.
1. Verify that the plan includes the desired org changes.
1. Run `terraform apply -refresh-false` to apply the configuration based on the existing state file. This command doesn't refresh the state file again.

## Set custom rate limits

Protect operations in your org by stopping Terraform before it reaches a rate limit for your org.

### Set a custom rate limit in your configuration

Pause Terraform execution when it reaches a custom rate limit. Use the `max_api_capacity` [argument](https://registry.terraform.io/providers/okta/okta/latest/docs#max_api_capacity) in the Okta Terraform Provider to pause Terraform until the request use is below the custom rate limit.

> **Note:** Terraform uses headers returned by Okta to determine when it reaches the `max_api_capacity` limit. See [Check your rate limits with Okta's rate limit headers](https://developer.okta.com/docs/reference/rl-best-practices/#check-your-rate-limits-with-okta-s-rate-limit-headers).

The following example demonstrates using the `max_api_capacity` argument in your configuration:

```hcl
provider "okta" {
  org_name = "${yourOktaDomain}"
  base_url = "okta.com"
  client_id   = "${applicationClientID}"
  scopes = ["okta.groups.manage"]
  private_key = ${privateKey}
  max_api_capacity = 50
}
```

The value of `max_api_capacity` is a percentage of your org's total rate limits. For example, a value of `50` limits Terraform to half of the total rate limits. If you set too low of a percentage, your configuration runs slowly.

Test the `max_api_capacity` value in a development environment to find a balance between Terraform running at a reasonable speed and not interrupting other requests to your org.

### Set a custom rate limit in the Okta service app

Terminate Terraform execution when it reaches a custom rate limit. Use the **Application Rate Limits** tab in the OAuth 2.0 service app to set custom rate limits. If Terraform reaches one of the app rate limits, Okta returns an `HTTP 429` error, and Terraform stops running.

> **Note**: All client apps that the service app authorizes, including Terraform, share the app rate limit.

To set app rate limits for your service app:

1. In the Admin Console, go to **Applications** > **Applications**.
1. Select the app that authorizes Terraform.
1. Click the **Application Rate Limits** tab.
1. Click **Edit**.
1. Use the slider to set custom app rate limits. This value is a percentage of your org's total rate limits.
1. Click **Save**.

## Request rate limit increases

Proactively request a temporary increase to your rate limits if you're planning a one-time action that requires many API calls. For example, if you're rolling out a new set of policies and are reassigning your groups and users, you can request a temporary increase for the time you run your configuration. For more information, see [Request exceptions](https://developer.okta.com/docs/reference/rl-best-practices/#request-rate-limit-exceptions).

If you're expecting sustained higher rate limits for your org, you can purchase DynamicScale, which increases your default rate limits for many API endpoints. See [DynamicScale rate limits](https://developer.okta.com/docs/reference/rl-dynamic-scale/).
