---
title: Manage multiple Okta environments
excerpt: Create solutions for deploying and managing multiple Okta environments with Terraform.
---

# Manage multiple Okta environments

Create solutions for deploying and managing multiple Okta environments with Terraform.

## Introduction

Use Terraform to make managing complex Okta org configurations easier. By incorporating [Terraform](https://www.terraform.io/) into your continuous integration, continuous delivery, and development pipelines, you can define a single configuration once and apply it to all environments.

Terraform can create, manage, and update various infrastructure resources, including Okta. This allows you to make your Okta org and application infrastructure more predictable, easier to maintain, and deterministic. You spend less time managing Okta when onboarding new applications, reduce risk by defining configuration information in source files, and can rapidly detect and recover from changes to your infrastructure.

Use this architecture to:

* Include Okta org configurations in your Continuous Integration / Deployment processes
* Configure multiple Okta orgs to the same standards
* Detect changes between Okta orgs and resynchronizing their configurations.

Upon completing the lab, you should understand how to automate Okta and keep environments in sync.

## Lab

The tutorials in this lab are designed to run sequentially, with each tutorial starting with the results on the one before:

* [Overview and prerequisites](/docs/reference/architecture-center/multiple-environments/lab)
* Tutorial 1: [Configure Terraform Cloud](/docs/reference/architecture-center/multiple-environments/lab-1-configure-terraform-cloud)
* Tutorial 2: [Create resources for your environment](/docs/reference/architecture-center/multiple-environments/lab-2-create-resources)
* Tutorial 3: [Change an object in that environment](/docs/reference/architecture-center/multiple-environments/lab-3-rename-a-group)
* Tutorial 4: [Move objects between environments](/docs/reference/architecture-center/multiple-environments/lab-4-deploy-changes-to-production)
* Tutorial 5: [Detect drift between environments and correct it](/docs/reference/architecture-center/multiple-environments/lab-5-detect-drift)
* Tutorial 6: [Synchronize environments daily](/docs/reference/architecture-center/multiple-environments/lab-6-synchronize-environments-daily)

## What Okta technologies are used?

[Okta Terraform Provider](https://registry.terraform.io/providers/okta/okta/latest/docs)

### Further reading

From Okta

* [Get Started with Terraform Cloud](/blog/2020/02/03/managing-multiple-okta-instances-with-terraform-cloud#get-started-with-terraform-cloud)
* [Manage multiple Okta instances with Terraform Cloud](/blog/2020/02/03/managing-multiple-okta-instances-with-terraform-cloud)
* [Okta organizations](/docs/concepts/okta-organizations/)

From Hashicorp, makers of Terraform

* [Automate infrastructure provisioning at any scale](https://cloud.hashicorp.com/products/terraform)
* [Terraform Cloud Getting Started](https://learn.hashicorp.com/collections/terraform/cloud-get-started?utm_source=WEBSITE&utm_medium=WEB_IO&utm_offer=ARTICLE_PAGE&utm_content=DOCS)
* [Configuring Workspace VCS Connections](https://www.terraform.io/cloud-docs/workspaces/settings/vcs)
* [Okta Provider](https://registry.terraform.io/providers/okta/okta/latest/docs)