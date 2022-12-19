---
layout: Landing
title: Configure auto-plan on check-in
---

# Configure auto-plan on check-in

In this exercise, you will configure Terraform Cloud to listen to your GitHub repo and automatically run a plan when source changes are checked in to the preview branch. Continuing from [Create a Terraform Cloud workspace](/architecture-center/create-terraform-workspace/) you will:

* Verify that you can run and apply a plan.
* Verify that a speculative plan runs automatically when you commit changes.
* Verify that plans are automatically applied if Auto apply is configured.


## Steps

### Rerun the plan

1. In the **Runs** page (which shows the results from the previous exercise), click **Actions** and select **Start new run**.
2. In the **Start a new run** dialog:
   1. Optionally enter **Reason for starting run**.
   2. Select **Plan and apply (standard)**.
   3. Click **Start run**.

   This reruns the plan and provides an opportunity for you to review the results and apply them.

#### Handling locked workspaces

If a plan fails to complete, the workspace may be locked. This can happen if another plan is running in your workspace or the workspace is locked for maintenance or other reasons, and is independent of how the run is triggered. See Terraform’s [Remote Operations](https://developer.hashicorp.com/terraform/cloud-docs/run/remote-operations) page for details.

To demonstrate this:

1. Click **Actions**, select **Start new run**, select **Plan & Apply** for plan type, and wait for Terraform to wait for you to confirm and apply the results.
2. Instead of confirming the results, click **Actions**, select **Start new run** again, and select **Plan & Apply** for plan type again.

The second plan is queued because the first run is still active. To see if this is the case, navigate to the **Runs** page and see if one or more runs are **Pending**. If so, the associated entry looks something like this:

<div class="full border">

![A pending teraform run summary](/img/ra/mmod/figure-3-1.png)

</div>

Click **Pending** to see what’s blocking the run. This opens a view similar to this:

<div class="full border">

![A pending teraform run detail view](/img/ra/mmod/figure-3-2.png)

</div>

From this view, you can:

* Get more information about the blocking run, including its status, how it was initiated, and by whom.
* Cancel the blocking run(s) and run the selected plan.
* Get details about the selected plan.
* Cancel the selected plan.
* Add a comment to the selected plan without changing its state.

### Confirm and apply changes

If there are no errors, confirm and apply your changes:

1. At the bottom of the **Runs** page, click **Confirm & Apply**.
2. In the confirmation dialog, add a comment and click **Confirm Plan**.
3. Verify that Apply completes successfully.

> **Note**: You can add comments to completed runs. This can be useful for discussing configuration changes with your team. Configuration changes are recorded in the system log. Click **Reports > System Log** in your Okta Admin Console and scroll down to the latest log entry to see them.

### Verify automatic runs

Verify that Terraform runs automatically when you check in a change:

1. In your workspace window, navigate to the **Overview** page.
2. In a new browser window, open your copy of the Okta Terraform repo in GitHub.
3. Select the `preview` branch.
4. Open one of the `.tf` files in your `okta-terraform-ref/modules` directory (such as `variables.tf`), add a comment line, and commit the change.
5. In your workspace **Overview** page, observe that the results are updated to show a new speculative plan running and then finishing, and **Resources to be changed** shows `+0 ~0 -0` to show that no resources were added, none were changed, and none were deleted.

### Automatically apply updates

Configure Terraform to automatically apply updates if the plan succeeds:

1. In your workspace page, navigate to **Settings > Version** Control.
2. In the **Workspace Settings** page, select **Auto apply for Apply Method**.
3. Click **Update VCS settings** to apply the change.

This tells Terraform to automatically apply changes when a Terraform plan is successful. Since the workspace is linked to version control for the `preview` branch, pushing to that branch triggers a plan that is automatically applied if the plan succeeds and there are changes.

### Verify automatic apply changes

Verify that Terraform runs and applies changes automatically when you check in a change.

1. In your workspace window, navigate to the **Overview** page.
2. In a new browser window, open your copy of the Okta Terraform repo in GitHub.
3. Select the `preview` branch.
4. Open the `.tf` file, to which you added the comment line in [Verify automatic runs](#verify-automatic-runs), remove the comment line that you added, and commit the change.
5. In your workspace **Overview** page, observe that the status changes to Planning, to Planned and finished, and **Resources to be changed** remains `+0 ~0 -0` (because the only change was to a comment line).