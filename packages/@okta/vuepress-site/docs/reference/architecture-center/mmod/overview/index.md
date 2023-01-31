---
title: Managing Multiple Okta Environments
---

# Managing Multiple Okta Environments

Create solutions for deploying and managing multiple application Okta environments with Terraform.

## Introduction

Creating and maintaining complex Okta org configurations across separate production, staging and development environments is error-prone and inefficient when done manually. By incorporating [Terraform](https://www.terraform.io/) it into your continuous integration, continuous delivery, and development pipelines, you can define a configuration once and apply it to all environments.

Terraform can create, manage, and update various infrastructure resources, including Okta. This allows you to make your Okta and application infrastructure more predictable, easier to maintain, and deterministic. You spend less time managing Okta when onboarding new applications, reduce risk by defining configuration information in source files, and can rapidly detect and recover from changes to your infrastructure.

Use this architecture for:

* Including Okta org configuration in your Continuous Integration / Deployment processes
* Configuring multiple Okta orgs to the same standards
* Detecting changes between Okta orgs and resynchronising them

Upon completing the lab, you will have a firm understanding of how to automate Okta and keep environments in sync.

## What Okta technologies are used?

[Okta Terraform Provider](https://registry.terraform.io/providers/okta/okta/latest/docs)
