---
layout: Landing
title: Managing Multiple Okta Deployments
---

# Managing Multiple Okta Deployments

Managing Multiple Okta Deployments (MMOD) architectures provide solutions for deploying and managing multiple application environments via [Terraform](https://www.terraform.io/). Okta applications typically have separate production, staging, and development environments and commonly support multiple customer domains, all of which need to be quickly and accurately updated and maintained. Whatever your needs, combining Okta's cloud-based deployment solutions with Terraform allows you to efficiently and reliably create, manage, and update your infrastructure resources.

## Background

Okta is a secure, cloud-based identity management service that can be used as the single identity store of user and group data for your organization. Ensuring that the right person gets access to the right services requires designing and implementing sign-in flows and access management that usually involves integrating complex functionality into many areas of your applications.

Okta applications commonly have complex configurations as well as stringent requirements for reliability, availability, and security. Your administrators can configure settings through either an Admin UI or an API. To streamline your administration, you can easily integrate Okta into your continuous integration, continuous delivery, and development pipelines using Terraform

Terraform can create, manage, and update a wide variety of infrastructure resources, including Okta. This allows you to make your Okta and application infrastructure more predictable, easier to maintain, and deterministic. You spend less time managing Okta when on-boarding new applications, reduce risk by defining configuration information in source files, and can rapidly detect and recover from changes to your infrastructure.

## Prerequisites

This resource is intended for admins with Okta experience who have already purchased Okta and have multiple orgs. It assumes you have previous knowledge of Okta but not necessarily about Terraform Cloud. For more information on:

* Okta and IAM, see [Identity and Access Management (IAM) overview](https://developer.okta.com/docs/concepts/iam-overview/)
* Terraform Cloud, see [What is Terraform Cloud?](https://developer.hashicorp.com/terraform/cloud-docs)

Make sure you've got the following environment prerequisites in place. If you've already got the prerequisites in place, move on to our [Use cases](#use-cases).

1. You need to be running a Linux, macOS, or Windows device to build the examples on.
2. Some resources in scripts used by these exercises only work in [Okta Identity Engine](https://developer.okta.com/docs/concepts/oie-intro/) environments. This affects Okta Classic engine customers who are using their own environments.
3. You'll need a GitHub account. Visit [https://github.com/oktadev/okta-terraform-ref](https://github.com/oktadev/okta-terraform-ref) to find all the exercises files for this reference architecture.
4. Two free Okta production accounts. You can create a free developer account by visiting [https://developer.okta.com/signup/](https://developer.okta.com/signup/) and specifying your first and last names, a unique email address, and a country. For the second free account, you can use the same name and password, but you must specify a different username and email address.

   For each account, Okta returns an activation email. Click **Activate** and provide a username and password to have Okta create an Okta Org URL in a form similar to `https://dev-123456.okta.com`. Make note of your org (for example `dev-123456`), and use it wherever you see `dev-123456` in Exercises 1-5. You need the second free Okta account for Exercises 6 and beyond. Use the second Okta org whenever you see for example `dev-987654` in Exercises 6-8.

> **Note**: In general, if an exercise fails, simply correct the issue and rerun the plan. If any of these exercises don’t work or you get what appears to be an unrecoverable error, reach out to your customer account team for assistance.

## Use cases

The exercises here are designed to be run from beginning to end, with each exercise starting from the results of the one before.

1. In [Create a working Terraform repo](/architecture-center/create-terraform-repo/), you create a private copy of an example Terraform script in GitHub.
2. In [Create a Terraform Cloud workspace](/architecture-center/create-terraform-workspace/), you create a free Terraform Cloud account, connect to your Terraform Cloud account, and verify that you can run a speculative plan for the preview branch.
3. In [Configure auto-plan on check-in](/architecture-center/terraform-autoplan-checkin/), you configure Terraform Cloud to listen for changes to the preview branch in your GitHub repo, and automatically run a plan when changes are checked in.
4. In [Create resources via Terraform](/architecture-center/create-resources-terraform/), you create new resources by adding to ones that are already available.
5. In [Update resources via Terraform](/architecture-center/update-resources-terraform/), you update an existing resource in GitHub to see the effect in the Okta GUI.
6. In [Deploy resources to production via Terraform](/architecture-center/deploy-to-production-terraform/), you deploy your changes to the production environment. This environment is managed in a separate Okta org.
7. In [Change asset and rerun plan in production to simulate drift](/architecture-center/simulate-drift-terraform/), you update a resource in production outside of Terraform, and then run a Terraform plan to detect if an asset has changed.
8. In [Add workflow to trigger daily production plan run via terraform (optional)](/architecture-center/trigger-daily-production-plan-terraform/), you create a workflow to automatically run a speculative plan daily in production to detect drift.

## Resources

* [Get Started with Terraform Cloud](/blog/2020/02/03/managing-multiple-okta-instances-with-terraform-cloud#get-started-with-terraform-cloud)
* [Managing Multiple Okta Instances with Terraform Cloud](/blog/2020/02/03/managing-multiple-okta-instances-with-terraform-cloud)
* [Configuring Workspace VCS Connections](https://www.terraform.io/cloud-docs/workspaces/settings/vcs)
* [Okta Provider](https://registry.terraform.io/providers/okta/okta/latest/docs)
* [Okta organizations](/docs/concepts/okta-organizations/)
* [Automate infrastructure provisioning at any scale](https://cloud.hashicorp.com/products/terraform) and [Terraform Cloud Getting Started](https://learn.hashicorp.com/collections/terraform/cloud-get-started?utm_source=WEBSITE&utm_medium=WEB_IO&utm_offer=ARTICLE_PAGE&utm_content=DOCS)