---
title: Migrate your brand customizations with automation
excerpt: Migrate your brand customizations from a test to production org using Terraform, PowerShell, or Go automation.
layout: Guides
---

This guide details how to automate copying custom brand settings from an Okta test environment to a live production environment. This migration includes CSS, email content, and error page HTML for Terraform, Powershell CLI, and the Okta APIs. Switch between these three using the dropdown list on the right.

---

#### Learning outcomes

Configure and run a brand customization synchronization from a test or preview environment to a production environment using automated tools.

#### What you need

* A branded Okta test or preview org and a production Okta org

* Automated tooling (Terraform provider, PowerShell module, or Okta CLI client)
* Okta Terraform provider 4.9.1 or later (for Terraform users)
* PowerShell 7.0+ and Okta.PowerShell module v2.0.2+ (for PowerShell users)
* Go-based okta-cli-client (for CLI users - currently in Beta, requires source compilation)

---

## Prerequisites

This guide assumes that you have already registered and verified separate custom domains for your test and production environments (for example, `test.example.com` and `portal.example.com`). Okta also assumes that your Terraform or CLI tools are fully authenticated and configured.

> **Important**: You can create brands programmatically, but themes are automatically generated when a brand is created. Import existing themes before you manage them with automation tools. This guide demonstrates the proper import workflow.

**New to these tools?** If you haven’t configured authentication or installed the necessary SDKs (Terraform provider, PowerShell module, Okta Go CLI), refer to the introductory guides on the respective GitHub repositories before proceeding.

### Limitations

* The Okta Management API doesn't provide endpoints to customize the generic, system-generated SMS messages (such as those used for MFA codes). This functionality remains limited to the Admin Console interface.
* You can't create or delete themes programmatically, each brand automatically receives exactly one theme that can only be read and updated.
* You can't modify custom error page HTML content when multibrand customization is enabled in your org.

## Tool setup

<StackSnippet snippet="toolsetup" />

## Define reusable branding content

All customization logic is centralized into reusable blocks (content strings) that are applied identically across both environments.

<StackSnippet snippet="reuseable" />

## Synchronize branding metadata

This step ensures that the core brand object exists and is correctly linked to the custom domain of the target environment (test or production).

<StackSnippet snippet="synchronize" />

## Apply Sign-In Widget customization

**Important:** Themes are automatically created when a brand is created. Import existing themes before managing them.

<StackSnippet snippet="siwcustom" />

## Apply email template customization

Synchronizes the email content defined in the [Define reusable branding content](#define-resuable-branding-content) section for key templates.

<StackSnippet snippet="emailcustom" />

## Apply error page customization

**Important:** You can't modify custom error page HTML if multibrand customization is enabled in your org. This section only applies to orgs without multibrand.

<StackSnippet snippet="errorcustom" />

## Final synchronization step

After the content is defined in the script or configuration file:

1. Run against the test environment: Execute your chosen tool (Terraform `apply`, PowerShell script, or cURL commands) using the test environment variables or context.
1. Verify: Manually test the customization on your test custom domain (`https://test.example.com/login/default`).
1. Run against production: Change your environment variables (or tool configuration) to target production and re-run the exact same script or configuration. The code is designed to be idempotent and creates the brand in production using the production domain ID.
