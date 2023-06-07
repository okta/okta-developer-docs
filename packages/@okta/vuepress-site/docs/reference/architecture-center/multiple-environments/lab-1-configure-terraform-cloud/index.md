---
title: Configure your Terraform Cloud account
---

# Tutorial 1: Configure your Terraform Cloud account

First, connect your Terraform Cloud account to your Github repo and your development Okta org. Then you can configure it to react to changes in your Github repo (which implies that you require a change to your Okta org). To achieve this:

1. [Create an Okta API token for your development org](#create-an-okta-api-token)
2. [Create a Terraform account](#create-a-terraform-account)
3. [Connect Terraform to Github](#connect-terraform-to-github)
4. [Connect Terraform to Okta](#connect-terraform-to-okta)
5. [Verify that you can manually run a speculative Terraform plan](#verify-that-you-can-manually-run-a-speculative-plan)
6. [Verify that you can run and apply the changes in a plan](#verify-that-you-can-run-and-apply-the-changes-in-a-plan)
7. [Verify that a speculative plan runs automatically when you commit changes](#verify-that-a-speculative-plan-runs-automatically-when-you-commit-changes)
8. [Verify that plans are automatically applied if Auto apply is configured](#verify-that-plans-are-automatically-applied-if-auto-apply-is-configured)

## Create an Okta API token

It's good practice to create separate API access tokens for each client that wants to access an org. Create a token for Terraform to access the development org.

1. Open the Admin Console for your org.
1. Choose **Security** > **API** to view the API access management page.
1. Select **Tokens** to view the API token management tab.
1. Click **Create token** to open a **Create token** dialog.
1. Set a name for your token. For example, _Terraform Cloud access for development org_.
1. Click **Create token** to save a copy of the token. You won't be able to view it again.

> **Note:** You repeat this process for the production environment in tutorial 4.

## Create a Terraform account

To begin, you must create a free Terraform Cloud account.

1. Go to the [Terraform free account](https://app.terraform.io/public/signup/account) page.
2. Specify a unique username, password, and the same email address as your Okta account.
3. Agree to the terms of use, acknowledge the privacy policy, and click **Create account**. Terraform Cloud sends a confirmation email to the address you specify.
4. Click the link in the email message to open a **Welcome to Terraform Cloud** page.

## Connect Terraform to Github

Now that you have an account, connect Terraform to your Github repo.

1. On the **Welcome to Terraform Cloud** page, select **Start from scratch**.
1. On the **Create a new organization** page, set **Organization name** to your `${OKTA_DOMAIN_NAME}`.
1. Click **Create organization**.
1. On the **Create a new Workspace** page, select **Version control workflow** to declare that your configuration is saved in a version control system.
1. On the **Connect to VCS** tab, select **GitHub** > **GitHub.com**. These exercises use GitHub, but you can select a different VCS. This selection grants permission for Terraform Cloud to access your project.

   If a request permission dialog opens, click **Authorize Terraform Cloud**.

   > **Tip:** If necessary, configure your browser to allow pop-ups for `app.terraform.io`.

1. On the **Choose a repository** tab, select the repo you created in [A working Terraform repository](/docs/reference/architecture-center/multiple-environments/lab/#a-working-terraform-repository). This is where you intend to store your Terraform configurations.

   > **Tip:** Be sure the path is to your copy of the repo and not to the original one.

1. On the **Configure settings** tab:
   1. Give your new workspace a descriptive name. For example, _okta-terraform-ref-dev-environment_.
   2. Optional. Enter a description.
   3. Click **Advanced options**.
   4. Verify that **Terraform Working Directory** is blank to default to the root of your Terraform repository.
   5. Verify that **Apply Method** is set to **Manual apply** to require manual confirmation to apply changes.
   6. Verify that **Automatic Run Triggering** is set to **Always trigger runs** to have your repository trigger a Terraform planning run whenever you check in a change.
   7. Set **VCS branch** to **preview** to use your `preview` branch instead of the default (`prod`) branch.
   8. Verify that **Automatic speculative plans** is set in **Pull Requests** to trigger speculative plans (**Plan only**).
   9. Verify that **Include submodules on clone** is cleared in **Other Settings**.
   10. Click **Create workspace** to create the new workspace.

This opens a **Workspace created** page for you to configure Terraform variables.

## Connect Terraform to Okta

Finally, before you can test that Terraform is working, connect it to your Okta development org.

1. On the **Workspace created** page:
   1. Set **org_name** to your [${OKTA_DOMAIN_NAME}](/docs/reference/architecture-center/multiple-environments/lab/#values-and-variables).
   2. Set **api_token** to the token that you created earlier in [Create an API token](#create-an-okta-api-token).
   3. Set **base_url** to your org's base URL. For example, _okta.com_.

2. Click **Save variables**.
3. Mark your `api_token` variable as sensitive so it isn't exposed to anyone with access to your Terraform console.
   1. Navigate to your **Workspaces** page and select your workspace.
   2. Navigate to the **Variables** page.
   3. In the **Workspace variables** section, click the ellipses (`...`) for `api_token` and select **Edit** from the dropdown menu.
   4. For the `api_token` key, select the **Sensitive** checkbox.
   5. Click **Save variable**.

## Verify that you can manually run a speculative plan

In Terraform, a speculative plan checks the policies set for runs in general (sentinel policies) and shows a set of possible changes the run would create. It doesn't apply those changes. You can create speculative plans with a Terraform version that is different from the one currently selected for the workspace. This lets you check whether your configuration is compatible with a newer Terraform version without changing your workspace settings, or check whether there are any changes in your source.

> **Tip:** Unless instructed otherwise, use the latest version of Terraform Cloud. In all of these exercises, the plan should finish with no errors.

1. In your Terraform console, navigate to the **Overview** page.
2. Click **Actions** and select **Start new run**.
3. In the **Start a new run** dialog:
   1. Optional. Enter **Reason for starting run**. For example, _Test run_.
   1. For **Choose plan type**, select **Plan only**. The Plan only option creates a speculative plan.
   1. Click **Start run** to continue.
4. Review the results on the **Runs** page.

## Verify that you can run and apply the changes in a plan

If the plan works speculatively, you can now run it and apply those changes.

1. On the **Runs** page (which shows the results from the previous exercise), click **Actions** and select **Start new run**.
1. On the **Start a new run** dialog:
   1. Optional. Enter a **Reason for starting run**. For example, _Test run and apply_.
   1. Select **Plan and apply (standard)**.
   1. Click **Start run**.
1. If there are no errors, confirm and apply your changes:
   1. At the bottom of the **Runs** page, click **Confirm & Apply**.
   1. On the confirmation dialog, add a comment and click **Confirm Plan**.
   1. Verify that Apply completes successfully.

> **Note:** You can add comments to completed runs. This is useful for discussing configuration changes with your team. Configuration changes are recorded in the System Log. Click **Reports** > **System Log** in your Admin Console and scroll down to the latest log entry to see them.

### Handle locked workspaces

If a plan fails to complete, the workspace may be locked. This happens if another plan is running on your workspace or if the workspace is locked for maintenance or another reason. Workspace locking is independent of how the run is triggered. See Terraform's **Remote Operations** page for details.

To demonstrate this:

1. Click **Actions**, and then select **Start new run**.
1. Set **plan type** to **Plan & Apply**.
1. Wait for Terraform to wait for you to confirm and apply the results.
1. Instead of confirming the results, click **Actions**, and then select **Start new run** again.
1. Set **plan type** to **Plan & Apply**.

The second plan is queued because the first run is still active. To see if this is the case, navigate to the **Runs** page and see if one or more runs are **Pending**. If so, click **Pending** to see what's blocking the run. This opens a view similar to this:

<div class="full border">

![A pending Terraform run detail view](/img/architecture/multiple-environments/lab-1-clashing-runs.png)

  <!--
    Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?type=design&node-id=3971%3A40535&t=U52HeyImgt4pt3M2-1 lab-1-clashing-runs
  -->

</div>

From this view, you can:

1. Get more information about the blocking run, including its status, how it was initiated, and by whom.
1. Cancel the blocking run(s) and run the selected plan.
1. Get details about the selected plan.
1. Cancel the selected plan.
1. Add a comment to the selected plan without changing its state.

## Verify that a speculative plan runs automatically when you commit changes

You've now verified that Terraform runs a plan and applies changes on demand. To verify that Terraform runs automatically when you check in a change to your Github repo:

1. Navigate to the workspace **Overview** page.
2. In a new browser window, open your copy of the Okta Terraform repo in GitHub.
3. Select the `preview` branch.
4. Open one of the `.tf` files in your `okta-terraform-ref/modules` directory (such as `variables.tf`), add a comment line, and commit the change.
5. On your workspace **Overview** page, observe that the results are updated to show a new speculative plan running and then finishing. The **Resources to be changed** displays `+0 ~0 -0` to show that no resources were added, none were changed, and none were deleted.

## Verify that plans are automatically applied if Auto apply is configured

Finally, you can tell Terraform to apply changes automatically when a Terraform plan is successful by setting Auto Apply. Since the workspace is linked to version control for the preview branch, pushing to that branch triggers a plan that is automatically applied if the plan succeeds and there are changes.

1. On your workspace page, navigate to **Settings** > **Version Control**.
2. On the **Workspace Settings** page, select **Auto apply for Apply Method**.
3. Click **Update VCS settings** to apply the change.

To verify that Terraform runs and applies changes automatically when you check in a change.

1. Navigate to the workspace **Overview** page.
2. In a new browser window, open your copy of the Okta Terraform repo in GitHub.
3. Select the `preview` branch.
4. Open the `.tf` file that you added the comment line to in the previous exercise, remove the comment line that you added, and commit the change.
5. On your workspace **Overview** page, observe that the status changes to Planning, to Planned and finished, and **Resources to be changed** remains `+0 ~0 -0` (because the only change was to a comment line).
