---
title: Manage multiple Okta environments
excerpt: Create solutions for deploying and Manage multiple application Okta environments with Terraform.
---

# Manage multiple Okta environments

> **Note:** This area is a work in progress. Please leave feedback on the content and format of this new type of architecture article by posting comments in the [Architecture area of the developer forums](https://devforum.okta.com/c/questions/architecture/24).

Create solutions for deploying and managing multiple application Okta environments with Terraform.

## Introduction

Use Terrafrom to make managing complex Okta org configurations easier. By incorporating [Terraform](https://www.terraform.io/) into your continuous integration, continuous delivery, and development pipelines, you can define a configuration once and apply it to all environments.

Terraform can create, manage, and update various infrastructure resources, including Okta. This allows you to make your Okta org and application infrastructure more predictable, easier to maintain, and deterministic. You spend less time managing Okta when onboarding new applications, reduce risk by defining configuration information in source files, and can rapidly detect and recover from changes to your infrastructure.

Use this architecture to:

* Include Okta org configurations in your Continuous Integration / Deployment processes
* Configure multiple Okta orgs to the same standards
* Detect changes between Okta orgs and resynchronising them

Upon completing the lab, you should have a firm understanding of how to automate Okta and keep environments in sync.

## Lab

* [Prerequisites](/architecture-center/reference-architectures/mmoe/lab-prerequisites)
* Tutorial 1. [How to configure Terraform Cloud](/architecture-center/reference-architectures/mmoe/lab-1-configure-terraform-cloud)
* Tutorial 2. [How to create resources for your environment](/architecture-center/reference-architectures/mmoe/lab-2-create-resources)
* Tutorial 3. [How to change an object in that environment](/architecture-center/reference-architectures/mmoe/lab-3-rename-a-group)
* Tutorial 4. [How to move objects between environments](/architecture-center/reference-architectures/mmoe/lab-4-deploy-changes-to-production)
* Tutorial 5. [How to detect drift between environments and correct it](/architecture-center/reference-architectures/mmoe/lab-5-detect-drift)
* Tutorial 6. [How to schedule drift detection daily](/architecture-center/reference-architectures/mmoe/lab-6-synchronize-environments-daily)
* [More Resources](/architecture-center/reference-architectures/mmoe/resources)

## What Okta technologies are used?

[Okta Terraform Provider](https://registry.terraform.io/providers/okta/okta/latest/docs)
