---
title: Automate org management with Terraform
excerpt: Configure and maintain your Okta org with code instead of the Admin Console by using Terraform.
layout: Guides
---

Terraform is a tool that uses code to describe your desired Okta org configuration instead of the Admin Console. Managing your org with code allows you to preview the results of a configuration before you apply it. Terraform enables you to automate the creation of groups and policies, assigning users to groups, associating policies with applications, and much more.

Some of the features of managing your Okta org with Terraform include:
* Previewing changes before committing them
* Creating repeatable changes
* Integrating with Continuous Integration (CI) and Continuous Delivery (CD) for automating updates
* Sharing configurations with other administrators
* Auditing changes that are made outside of Terraform

## Get started

Terraform uses plugins called Providers to communicate with a managed service. To automate your Okta org, you use the Okta Terraform Provider.

Start with the [Terraform overview](/docs/guides/terraform-overview), and then see [Enable Terraform access](/docs/guides/terraform-enable-org-access) to set up Terraform with your Okta org.

## Automate management

After you've enabled access for Terraform, find details on automating different parts of your org in these guides:

* [Manage user access](/docs/guides/terraform-manage-user-access)**:** Automate the policies that control how end users authenticate to and access Okta applications.
* [Manage groups of users](/docs/guides/terraform-manage-groups)**:** Configure access to Okta applications and manage sign-in flows for groups of users.
* [Manage external authentication services](/docs/guides/terraform-manage-external-authenticators)**:** Enable users to sign in using a trusted external Identity Provider.
* [Customize the end-user experience](/docs/guides/terraform-manage-end-user-experience)**:** Edit email templates and change the appearance of your sign-in pages and Okta End-User Dashboard with Terraform.

## Best practices

Use best practices to keep your Terraform automations efficient by following these guides:

* [Control Terraform access to Okta](/docs/guides/terraform-design-access-security)**:** Maintain security when using Terraform to automate your Okta org.
* [Minimize Terraform rate limit errors](/docs/guides/terraform-design-rate-limits)**:** Optimize your configuration to reduce the number of API calls that Terraform makes, and set custom rate limits to stop Terraform before you reach your org’s rate limits.

## Reference documentation

Detailed information for the Okta Terraform Provider objects and commands that you use to manage your Okta org are available in the entry for the [Okta Provider in the Terraform Registry](https://registry.terraform.io/providers/okta/okta/latest/docs).
