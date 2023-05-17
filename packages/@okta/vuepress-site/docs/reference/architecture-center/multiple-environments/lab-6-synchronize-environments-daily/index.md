---
title: Synchronize environments daily
---

# Tutorial 6: Synchronize environments daily

In the previous tutorial, you learned how to detect changes in the production environment and synchronize those changes back to your development environment. Now add a workflow to trigger a daily plan run through Terraform. Specifically, create a workflow to run a speculative plan to detect changes in the production environment daily at 0900 EST.

If any changes are detected, it sends a notification message to a Slack channel.

> **Note:** You have various options for where to send the notification. This example uses Slack. If you don't have Slack, you can create a trial account, or you can choose a different destination and use this example as a guide.

This simulates an enterprise that transforms to fully automated processes for detecting drift in your environments.

## Create A Slack channel

This tutorial uses Slack as the target for its workflow notification messages. To create a free trial Slack instance and channel:

1. Visit [slack.com](https://slack.com), and click **TRY FOR FREE**.
2. Enter an email address and click **Continue**.
3. Enter the 6-digit code that's sent to your email address.
4. Click **Create a Workspace** to create a Slack workspace.
5. Specify your company name, identify other team members to invite to the workspace (if any), and enter a short name used as the name of the channel. For example, _Terraform Drift_.

## Configure Terraform

To enable the Terraform workflow, you must create a [Team API token](https://developer.hashicorp.com/terraform/cloud-docs/users-teams-organizations/api-tokens#team-api-tokens) to allow access to both workspaces. You also need your workspace ID for the workflow.

To create a Team API token in Terraform Cloud:

1. Go to your top-level Terraform Workspaces page.
1. Navigate to **Settings > Teams**.
1. In the Team API Token section, click **Create a team token** to generate and display the token. You can't see it again.

To find your Terraform workspace ID:

1. Go to your top-level Workspaces page.
1. Find the ID under your workspace's name.

## Create a workflow

1. Open the Admin Console for your production org.
1. Choose **Workflow** > **Workflows console** to show the **Welcome to Workflows** page.
1. Select the **Flows** tab.
1. In the sidebar, click the **+** icon to add a new folder.
1. Set a folder name, for example, _Okta Configuration Drift_.
1. Click **Save** to finish creating the folder.

   <div class="full border">

   ![Okta Workflow's new folder name dialog box](/img/architecture/multiple-environments/lab-6-new-workflow-folder.png)

   <!--
      Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?type=design&node-id=3971%3A40537&t=U52HeyImgt4pt3M2-1 lab-6-new-workflow-folder
   -->

   </div>

1. Click the name of your new folder in the sidebar to open it.
1. Import the workflow.
   1. Click the icon next to your folder name in the sidebar.
   1. Select **Import** in the menu to open an **Import** page.
   1. Navigate to your local copy of the GitHub repo for this tutorial. Select `workflow/executeTerraformPlanToDetectDrift.flow` to import the example workflow.
1. In your new folder, observe that you imported one flow, it's a scheduled flow, and it's turned off.

<div class="full border">

![Okta configuration drift folder config page showing scheduled flow imported](/img/architecture/multiple-environments/lab-6-scheduled-flow.png)

<!--
   Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?type=design&node-id=3971%3A40539&t=U52HeyImgt4pt3M2-1 lab-6-scheduled-flow
-->

</div>

## Update the workflow

Update the workflow before you run it.

1. Click the flow line to open the flow.
2. In the **Compose Post Body** card, set the `id` attribute to the Terraform workspace ID that you noted in [Configure Terraform](#configure-terraform).

   <div class="full border">

   ![Okta workflows compose post body card with id highlighted](/img/architecture/multiple-environments/lab-6-compose-post-body.png)

   <!--
      Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?type=design&node-id=3971%3A40538&t=U52HeyImgt4pt3M2-1 lab-6-compose-post-body
   -->
   </div>

3. In the **Start a Run** card, authorize the Terraform Cloud connection.
   1. Click **Choose Connection**.
   2. Click **+ New Connection**.
   3. In the **New Connection** dialog:
      1. Optional. Enter a new name for **Connection Nickname**, for example, _Terraform Cloud_.
      2. Set **Auth Type** to **Custom**.
      3. Set **Header Name** to **Authorization**.
      4. Set **Header Value** to **Bearer** followed by a space and the Terraform Team API token that you created in [Configure Terraform](#configure-terraform).
      5. Click **Create**.

4. In the **Send Message to Channel** card, configure the output channel used for notifications when drift is detected.
   1. Click **Choose Connection**, select the channel you set up in [a Slack channel](/docs/reference/architecture-center/multiple-environments/lab/#a-slack-channel), and select your desired input and output fields.
   2. Click **Options** to choose your channel options (for example, select your channel ID for **Channel** and **Yes** for **send as bot**), and click **Save**.
   3. Pick a name for your Slack bot, for example, _Terraform-drift-bot_. This is used as the originator of the drift notification.
   4. Click **Save**.

      <div class="half border">

      ![Okta workflow with send message to channel card highlighted](/img/architecture/multiple-environments/lab-6-slack-channel.png)

      </div>

This exercise demonstrates the process for Slack, but you can choose from many connection types. To select a different destination:

1. Open the Admin Console for your production org.
1. Choose **Workflows** > **Workflow console** to view the Workflows home page.
1. Select the **Connections** tab.
1. Click **+ New Connection** to open a **New Connection** page.
1. Select the desired connection type, for example, **Slack**.
1. Give the connection a nickname, for example, _Terraform Drift_.
1. Click **Create**.
1. Click **Allow** to give Slack access to the workflow.

   > **Tip:** Use the search field in the **New Connection** page to quickly find the best destination for you.

The connection is added to the **Connections** tab for the workflow.

## Test your changes

1. On the **Flows** tab, click the **ON/OFF** toggle to enable the workflow.
2. Select your workflow, and then click **Test** to run through the flow. The **Flow History** panel shows the results.
3. If the result is **Success**, well done. If the result is an error, see the associated card for error information. Click the **ON/OFF** toggle to disable the flow, resolve the issue, and return to the first step in this section to retry the test. Repeat until the most recent (top) results are **Success**.
