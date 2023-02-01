---
title: Schedule drift detection daily
---

# Managing multiple Okta environments tutorial 6: Schedule drift detection daily

In the previous tutorial, you learned how to detect changes in the production environment and synchronize those changes back to your development environment. Now you'll add a workflow to trigger a daily plan run through Terraform. Specifically, you'll create a workflow to run a speculative plan to detect changes in the production environment daily at 0900 EST.

If any changes are detected, it will send a notification message to a Slack channel.

> **Note:** You have various options for where to send the notification. This example uses Slack. If you don't have Slack, it's easy to create a trial account if you want to follow along, or you can choose a different destination and use this example as a guide.

This simulates an enterprise transforming to fully automated processes for detecting drift in your environments.

## Configure Terraform

To enable the Terraform workflow, you must create a [Team API token](https://developer.hashicorp.com/terraform/cloud-docs/users-teams-organizations/api-tokens#team-api-tokens) to allow it access to both workspaces. You also need your workspace ID for the workflow.

To create a Team API token in Terraform Cloud:

1. Go to your top-level Terraform Workspaces page.
1. Navigate to **Settings > Teams**.
1. In the Team API Token section, click **Create a team token** to generate and display the token; you'll not be able to see it again.

To find your Terraform workspace ID:

1. Go to your top-level Workspaces page.
1. Find the ID under your workspace's name.

<div class="full border">

![Workspace overview page](/img/architecture/mmod/figure-8-3.png)

</div>

## Create a workflow

1. Download the example workflow:
   1. Go to `https://drive.google.com/file/d/1IKhg65fHCSbp9qXYBxB2r2zxmsTcdWOu`.
   1. In the No preview available panel in the page that opens, click **Download** to download the example workflow.

1. Open the Okta Admin Console for your production org.
1. Choose **Workflow > Workflows** to show the Welcome to Workflows page.
1. Select the **Flows** tab.
1. In the sidebar, click the **+** icon to add a new folder.
1. Set a folder name; for example, _Okta Configuration Drift_.
1. Click **Save** to finish creating the folder.

   <div class="full border">

   ![Okta workflows new folder name dialog box](/img/architecture/mmod/figure-8-5.png)

   </div>

1. Click the name of your new folder in the sidebar to open it.
1. Import the workflow.
   1. Click the gear icon next to your folder name in the sidebar.

   <div class="full border">

   ![Okta workflows folders list with gear menu icon highlighted](/img/architecture/mmod/figure-8-6.png)

   </div>

   1. Select **Import** in the menu to open an **Import** page.
   1. Select the file pack that you downloaded to import the example workflow.
1. In your new folder, observe that you've imported one flow, it's a scheduled flow, and it's turned off.

<div class="full border">

![Okta configuration drift folder config page showing scheduled flow imported](/img/architecture/mmod/figure-8-7.png)

</div>

## Update the workflow

Update the workflow before you run it.

1. Click the flow line to open the flow.
2. In the **Compose Post Body** card, set the `id` attribute to the Terraform workspace ID that you noted in [Configure Terraform](#configure-terraform).

   <div class="full border">

   ![Okta workflows compose post body card with id highlighted](/img/architecture/mmod/figure-8-8.png)

   </div>

3. In the **Start a Run** card, authorize the Terraform Cloud connection.
   1. Click **Choose Connection**.
   2. Click **+ New Connection**.
   3. In the **New Connection** dialog:
      1. Optionally enter a new name for **Connection Nickname**; for example, _Terraform Cloud_.
      2. Select **Custom for Auth Type**.
      3. Set **Header Name** to **Authorization**.
      4. Set **Header Value** to **Bearer** followed by a space and the Terraform Team API token you created in [Configure Terraform](#configure-terraform).
      5. Click **Create**.

         <div class="three-quarter border">

         ![Okta workflows new connection dialog showing terraform cloud connection details](/img/ra/mmod/figure-8-9.png)

         </div>

4. In the **Send Message to Channel** card, configure the output channel to be used for notifications when drift is detected.
   1. Click **Choose Connection**, select the channel you set up in [A Slack channel](/docs/reference/architecture-center/mmod/lab-prerequisites/#a-slack-channel), and select your desired input and output fields.
   2. Click **Options** to choose your channel options (for example, select your channel ID for **Channel** and **Yes** for **send as bot**), and click **Save**.
   3. Pick a name for your Slack bot; for example, _Terraform-drift-bot_. This is used as the originator of the drift notification.
   4. Click **Save** to save your workflow.

      <div class="full border">

      ![Okta workflow with send message to channel card highlighted](/img/architecture/mmod/figure-8-10.png)

      </div>

This exercise demonstrates the process for Slack, but you can choose from many connection types. To select a different destination:

1. Open the Okta Admin Console for your production org.
1. Choose **Workflows > Workflow console** to view the Workflows home page.
1. Select the **Connections** tab.
1. Click **+ New Connection** to open a **New Connection** page.
1. Select the desired connection type; for example, **Slack**.
1. Give the connection a nickname; for example, _Terraform Drift_.
1. Click **Create**.
1. Click **Allow** to give Slack access to the workflow.

   > **Tip:** Use the search field in the **New Connection** page to quickly find the best destination for you.

The connection is added to the **Connections** tab for the workflow.

## Test your changes

1. In the **Flows** tab, click the **ON/OFF** toggle to enable the workflow.
2. Select your workflow, and click **Test** to run through the flow. The **Flow History** panel on the right shows the results.

   <div class="full border">

   ![Okta workflow showing flow history panel, with succcess highlighted](/img/architecture/mmod/figure-8-11.png)

   </div>

3. If the result is **Success**, congratulations! If the result is an error, see the associated card for error information. Click the **ON/OFF** toggle to disable the flow, resolve the issue, and return to the first step in this section to retry the test. Repeat until the most recent (top) results are **Success**.
