---
layout: Landing
title: Create a Terraform Cloud workspace
---

# Create a Terraform Cloud workspace

Terraform Cloud allows you to efficiently create, manage, and update various infrastructure resources such as VMs, physical machines, and containers. In this exercise, you will:

* Create a free Terraform Cloud account.
* Connect to your Terraform Cloud account.
* Verify that you can run a speculative plan.

## Steps

### Create an Okta API token

If you have not yet created an Okta API token for the org you are Terraforming, or if a token you created earlier has expired, create a new one.

1. Go to `https://${yourOktaDomain}-admin.okta.com/admin/access/api/tokens` (for example, `https://dev-123456-admin.okta.com/admin/access/api/tokens`). This opens an **Okta API** tokens page.
2. Click **Create token** to open a **Create token** dialog. Specify a unique name and click **Create token** to display the token.
3. Save a copy of the token; you will not be able to view it again.

> **Note**: The recommended practice is to set up separate API tokens for different clients so you can revoke a token without impacting another  app.

### Create a Terraform account

1. Go to the [Terraform free account](https://app.terraform.io/public/signup/account) page.
2. Specify a unique username, password, and the same email address as for your Okta account
3. Agree to the terms of use, acknowledge the privacy policy, and click **Create account**. Terraform Cloud will send a confirmation email to the address you specify.
4. Click the link in the email message to open a **Welcome to Terraform Cloud** page.

### Set up terraform

1. In the **Welcome to Terraform Cloud** page, select **Start from scratch** as your **Choose your setup workflow** option.
2. In the **Create a new organization** page, enter your Okta org (for example, `dev-123456`), and click **Create organization**.
3. In the **Create a new Workspace** page, select **Version control workflow** in the **Choose Type** tab. These settings declare that your configuration will be saved in a version control system.
4. In the **Connect to VCS** tab, select **GitHub** as the type of version control system to use. These exercises use GitHub, but you can select a different VCS. This selection grants permission for Terraform Cloud to access your project.

   If a request permission dialog opens, click **Authorize Terraform Cloud**.

   > **Hint**: If necessary, configure your browser to allow pop-ups for `app.terraform.io`.

5. In the **Choose a repository** tab, select the repo you created in [Create a working Terraform repo](/architecture-center/create-terraform-repo/). This is where you intend to store your Terraform configurations.

   > **Hint**: Be sure the path is to your copy of the repo, and not to the original one.

6. In the **Configure settings** tab:

   1. Give your new workspace a descriptive name.

   > **Hint**: You are configuring a preview environment in this example, so append `-preview` to the repository’s name for clarity. For example, `okta-terraform-ref-preview`.

   2. Optionally enter a description.

   3. Click **Advanced options**.

   4. Leave **Terraform Working Directory** blank to default to the root of your Terraform repository.

   5. Leave **Apply Method** set to **Manual apply** to require manual confirmation to apply changes.

   6. Leave **Automatic Run Triggering** set to **Always trigger runs** to have your repository trigger a Terraform planning run whenever you check in a change.

   7. Enter `preview` for **VCS branch** to use your `preview` branch instead of the default (`prod`) branch.

   8. Leave **Automatic speculative plans** set in **Pull Requests** to trigger speculative plans (**Plan only**).

   9. Leave **Submodules on clone** reset in **Other Settings**.

   10. Click **Create workspace** to create the new workspace.

This opens a **Workspace created** page for you to configure Terraform variables.

### Configure your Terraform workspace

1. In the **Workspace created** page, enter the following data:

   * `org_name`: Your organization’s subdomain name. For example `dev-123456`.
   * `api_token`: Your Okta API token (as created earlier), for example `00abcdefghiYdjyNw0o-ABC1de-3yro4Lujw4NM6SQa`.
   * `base_url`: Your organization’s base URL. For example `okta.com`.

2. Click **Save variables**.

3. Mark your `api_token` variable as sensitive so it is not exposed to anyone with access to your Terraform console.

   1. Navigate to your **Workspaces** page and select your workspace.
   2. Navigate to the **Variables** page.
   3. In the **Workspace variables** section, click the ellipses (`...`) for `api_token` and select **Edit** from the dropdown menu.
   4. For the `api_token` key, select the **Sensitive** checkbox.
   5. Click **Save variable**.

4. Verify that you can manually run a speculative plan.

   1. Navigate to the **Overview** page.
   2. In the **Overview** page, click **Actions** and select **Start new plan**. This opens a **Start a new run** dialog.
   3. In the **Start a new run** dialog:
      1. Optionally enter **Reason for starting run** (for example, `First plan!`).
      2. For **Choose plan type**, select **Plan only**.
      3. Click **Start run** to continue.

    The **Plan only** option creates a speculative plan, which shows a set of possible changes and checks against Sentinel policies but without applying them. You can create speculative plans with a Terraform version that is different from the one currently selected for the workspace. This lets you check whether your configuration is compatible with a newer Terraform version without changing your workspace settings, or whether there have been any changes in your source. (Unless instructed otherwise, use the latest version of Terraform Cloud. In all of these exercises, the plan should finish with no errors.)

   4. Review the results in the **Runs** page.