---
title: Manage multiple Okta environments Lab overview
---

# Manage multiple Okta environments: Lab overview

> **Note:** This area is a work in progress. Please leave feedback on the content and format of this new type of architecture article by posting comments in the [Architecture area of the developer forums](https://devforum.okta.com/c/questions/architecture/24).

Before incorporating Terraform into a company's continuous deployment architecture, there isn't a way to create, rebuild, or update an Okta environment consistently. Nor is it easy to determine if one environment has changed - for example, a group updated, a new autentication policy - and to synchronize the others with it. This is known as analysing drift between environments.

This lab is intended for admins with Okta experience who have multiple orgs. It assumes that you have previous knowledge of Okta, but not necessarily about Terraform Cloud. For more information on:

* Okta and IAM, see [Identity and Access Management (IAM) overview](https://developer.okta.com/docs/concepts/iam-overview/).
* Terraform Cloud, see [What is Terraform Cloud?](https://developer.hashicorp.com/terraform/cloud-docs).

The tutorials in this lab are designed to run sequentially, with each tutorial starting with the results on the one before:

[Prerequisites](/architecture-center/tutorials/mmoe/lab-prerequisites)

1. In [How to configure Terraform Cloud](/architecture-center/tutorials/mmoe/lab-1-configure-terraform-cloud), you create a free Terraform Cloud account, connect it to your Github account and development Okta org. Then, you configure it to react to changes in your Github repo.
1. In [How to create resources for your environment](/architecture-center/tutorials/mmoe/lab-2-create-resources), you use Terraform to create the resources required to make your org functional.
1. In [How to change an object in that environment](/architecture-center/tutorials/mmoe/lab-3-rename-a-group), you use Terraform to update the name of an existing group in the new org.
1. In [How to move objects between environments](/architecture-center/tutorials/mmoe/lab-4-deploy-changes-to-production), you deploy your changes from the development environment to a separate production environment.
1. In [How to detect drift between environments and correct it](/architecture-center/tutorials/mmoe/lab-5-detect-drift), you update a resource in production outside of Terraform, and then run a Terraform plan to detect if an asset is changed.
1. In [How to schedule drift detection daily](/architecture-center/tutorials/mmoe/lab-6-synchronize-environments-daily), you create a workflow to automatically run a speculative plan daily in production to detect drift.
