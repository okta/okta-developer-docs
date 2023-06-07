---
title: Lab overview and prerequisites
---

# Lab overview and prerequisites

Before incorporating Terraform into a company's continuous deployment architecture, there isn't a way to create, rebuild, or update an Okta environment consistently. Nor is it easy to determine if one environment has changed - for example, a group updated, a new authentication policy - and to synchronize the others with it. This is known as analyzing drift between environments.

This lab is intended for admins with Okta experience who have multiple orgs. It assumes that you have previous knowledge of Okta, but not necessarily about Terraform Cloud. For more information on:

* Okta and IAM, see [Identity and Access Management (IAM) overview](https://developer.okta.com/docs/concepts/iam-overview/).
* Terraform Cloud, see [What is Terraform Cloud?](https://developer.hashicorp.com/terraform/cloud-docs)

The tutorials in this lab are designed to run sequentially, with each tutorial starting with the results on the one before:

1. In [Configure Terraform Cloud](/docs/reference/architecture-center/multiple-environments/lab-1-configure-terraform-cloud), you create a free Terraform Cloud account, connect it to your GitHub account and development Okta org. Then, you configure it to react to changes in your GitHub repo.
1. In [Create resources for your environment](/docs/reference/architecture-center/multiple-environments/lab-2-create-resources), you use Terraform to create the resources required to make your org functional.
1. In [Change an object in that environment](/docs/reference/architecture-center/multiple-environments/lab-3-rename-a-group), you use Terraform to update the name of an existing group in the new org.
1. In [Move objects between environments](/docs/reference/architecture-center/multiple-environments/lab-4-deploy-changes-to-production), you deploy your changes from the development environment to a separate production environment.
1. In [Detect drift between environments and correct it](/docs/reference/architecture-center/multiple-environments/lab-5-detect-drift), you update a resource in production outside of Terraform, and then run a Terraform plan to detect if an asset is changed.
1. In [Synchronize environments daily](/docs/reference/architecture-center/multiple-environments/lab-6-synchronize-environments-daily), you create a workflow to automatically run a speculative plan daily in production to detect drift.

## Prerequisites

You'll need to set up the following to complete the tutorials in this lab.

## Applications

This lab uses [Okta CLI](https://cli.okta.com/) to create Okta developer accounts quickly.

> **Tip:** Before running Okta CLI, consider adding the directory path to its executable to your `PATH` environment variable.

## Two Okta developer accounts

This lab requires two Okta developer accounts, one to represent a development environment, and one to act as a production environment. Both accounts must use **Okta Identity Engine**.

> **Tip:** If you're using existing accounts and want to check the org is running Okta Identity Engine rather than Okta Classic Engine, check the footer on any page of the Admin Console for that org. The version number is appended with **E** for Identity Engine orgs and **C** for Classic Engine orgs.

Okta CLI is the quickest way to create an Okta org, so we recommend using it to create both new orgs. Alternatively, you can manually sign up instead.

1. Open your terminal.
2. Run `okta register`, and enter your First name, Last name, Email address, and Country.
3. Click or tap **Activate** in the account activation email that is sent to the email address that you provided.

   > **Tip:** If you don't receive the confirmation email sent as part of the creation process, check your spam filters for an email from `noreply@okta.com`.

4. After your domain is registered, look for output similar to this:

   ```txt
   Your Okta Domain: https://dev-xxxxxxx.okta.com
   To set your password open this link:
   https://dev-xxxxxxx.okta.com/welcome/xrqyNKPCZcvxL1ouKUoh
   ```

5. Set the password for your Okta developer org by opening the link and following the instructions.
6. After you enter your password, your Okta domain is returned, similar to the following. Make note of it. This is your development domain.

   ```txt
   New Okta Account created!
   Your Okta Domain: https://dev-xxxxxxx.okta.com
   ```

7. Repeat steps 1–6 to create a second Okta domain. This is your production domain.

> **Note:** If you're using an existing org and want to use Okta CLI in this lab, check API Access Management is enabled: Open your Admin Console, go to **Security** > **API**, and verify you have an **Authorization Servers** tab. If not, you can:
>
> * Create a new developer account and org with Okta CLI.
> * Contact your support team to enable the feature in your org.
> * Use the Admin Console to create your app integrations manually instead of the CLI.
>
> All accounts created with Okta CLI are developer accounts.

## Okta Workflows

Tutorial 6 requires your production org to have [Okta Workflows](https://www.okta.com/platform/workflows/) enabled. To determine if it's enabled:

1. Open the Admin Console for your production org.
2. Choose **Workflow** from the menu.
3. If the menu doesn't include a `Workflows console` option, this feature isn't enabled. Contact your customer account team to enable Workflows for your account.

## A Slack channel

Tutorial 6 uses Slack as the target for its workflow notification messages. To create a free trial Slack instance and channel:

1. Visit [slack.com](https://slack.com), and click **TRY FOR FREE**.
2. Supply your email address and click **Continue**.
3. Enter the 6-digit code that's sent to your email address.
4. Click **Create a Workspace** to create a Slack workspace.
5. Specify your company name, identify other team members to invite to the workspace (if any), and enter a short name used as the name of the channel. For example, _Terraform Drift_.

## A working Terraform repository

You need to create a copy of an example Terraform script in your GitHub repository.

1. Open `https://github.com/oktadev/okta-reference-multi-org-terraform-example` in a browser.
2. Click **Fork** to create a copy for your project in GitHub.
3. In the **Create a new fork** page
   1. **Clear** the **Copy the prod branch only** checkbox.
   1. Click **Create fork**.

The repository you're forking has two branches: `preview` and `prod`. If not, you must create these branches. The `preview` branch is pre-populated and is used in tutorials 2–3. The `prod` branch is empty and used to promote code in tutorials 4–6.

## Terraform Cloud account

Terraform provides two options to build your automations. The first is available for free through a Command Line Interface (CLI). Another option is through their paid SaaS offering, [Terraform Cloud](https://cloud.hashicorp.com/products/terraform), which is free to try. In this lab, you use an instance of Terraform Cloud. Tutorial 1 covers how to create and configure your account.

## Values and variables

Connect Terraform to Okta using the following values:

* `${OKTA_DOMAIN}`: The full URL of your Okta developer org.
   For example, `https://dev-133337.okta.com`.
* `${OKTA_DOMAIN_NAME}`: The subdomain of your Okta developer org.
   For example, `dev-133337`.

To find these settings in the Admin Console, see [Configuration Settings](/docs/guides/oie-embedded-common-download-setup-app/java/main/#configuration-settings).
