---
layout: Landing
title: Add workflow to trigger daily production plan run via terraform (optional)
---

# Add workflow to trigger daily production plan run via terraform (optional)

In this exercise, you create a workflow to automatically run a speculative plan daily to detect changes.

The example workspace and workflow are configured to run a Terraform speculative plan in production and, if any changes are detected, to send a notification message to a Slack channel. It is scheduled to run at 9am Eastern time daily.

> **Note**: You have a variety of options for where to send the notification. This example uses Slack. If you don’t have Slack, it’s easy to create a trial account if you want to follow along, or you can choose a different destination and use this example as a guide.

## Prerequisites

Okta Workflows needs to be enabled for your tenant (see [Okta Workflows](https://help.okta.com/wf/en-us/Content/Topics/Workflows/workflows-main.htm)). To determine if it is enabled:

1. In your Okta Admin console, navigate to **Workflow**.

<div class="half border">

![Okta admin console with Workflows console option highlighted](/img/ra/mmod/figure-8-1.png)

</div>

2. If there is no **Workflows console** item under **Workflow**, then Workflows must be enabled for the Okta account you are using. Reach out to your customer account team to have this done.


## Steps

### Preparation

1. Download the example workflow:
   1. Go to [https://drive.google.com/file/d/1IKhg65fHCSbp9qXYBxB2r2zxmsTcdWOu](https://drive.google.com/file/d/1IKhg65fHCSbp9qXYBxB2r2zxmsTcdWOu).
   2. In the **No preview available** panel in the page that opens, click **Download** to download the example workflow.
2. Create a Team API token in Terraform Cloud. (See [Team API Tokens](https://developer.hashicorp.com/terraform/cloud-docs/users-teams-organizations/api-tokens#team-api-tokens).)
   1. Go to your top-level **Workspaces** page.
   2. Navigate to **Settings > Teams**.
   3. In the **Team API Token** section, click **Create a team token** to generate and display the token.

   > **Important**: Save a copy of the token; you will not be able to view it again.

   <div class="full border">

   ![Teams menu option showing Team API token window, with Create a team token highlighted](/img/ra/mmod/figure-8-2.png)

   </div>

3. Note the ID of your workspace for use below. (You can find it under your workspace’s name in your workspace’s **Overview** page.)

<div class="full border">

![Workspace overview page](/img/ra/mmod/figure-8-3.png)

</div>

4. Create or set up a Slack channel for your workflow notification messages. To create a free trial Slack instance and channel:

   1. Visit [slack.com](http://slack.com), and click **TRY FOR FREE**.
   2. Supply your email address and click **Continue**.
   3. Enter the 6-digit code that’s sent to your email address.
   4. Click **Create a Workspace** to create a Slack workspace.
   5. Specify your company name, identify other team members to invite to the workspace (if any), and enter a short name to be used as the name of the channel (for example, `Terraform Drift`).

### Create a workflow

To begin, sign into the Okta Admin dashboard, and navigate to **Workflow > Workflows** console to open a **Welcome to Workflows** page.

Import the example workflow.

1. In the **Welcome to Workflows** page, click the **Flows** tab.

   <div class="full border">

   ![Okta workflows landing page, with Flows option highlighted](/img/ra/mmod/figure-8-4.png)

   </div>

2. In the sidebar, click the **+** icon to add a new folder, enter a descriptive name (for example, `Okta Configuration Drift`) in the **New Folder Name** dialog, and click **Save**.

   <div class="full border">

   ![Okta workflows new folder name dialog box](/img/ra/mmod/figure-8-5.png)

   </div>

3. Click the name of your new folder in the sidebar to open it.

4. Import the workflow.
   1. Click the gear icon next to your folder name in the sidebar to open a dropdown menu.

      <div class="full border">

      ![Okta workflows folders list with gear menu icon highlighted](/img/ra/mmod/figure-8-6.png)

      </div>

   2. Select **Import** in the menu to open an **Import** page.
   3. Select the file pack that you downloaded in [Preparation](#Preparation) to import the example workflow.

5. In your new folder, observe that you've imported one flow, it’s a Scheduled flow, and it is turned off.

   <div class="full border">

   ![Okta configuration drift folder config page showing scheduled flow imported](/img/ra/mmod/figure-8-7.png)

   </div>

### Update the workflow

Update the workflow before you run it.

1. Click the flow line to open the flow.
2. In the **Compose Post Body** card, change the value of the `id` attribute to be the ID of your Terraform workspace that you noted in [Prepatation](#Preparation).

   <div class="full border">

   ![Okta workflows compose post body card with id highlighted](/img/ra/mmod/figure-8-8.png)

   </div>

3. In the **Start a Run** card, authorize the Terraform Cloud connection.
   1. Click **Choose Connection**.
   2. Click **+ New Connection** to open a **New Connection** dialog.
   3. In the **New Connection** dialog:
      1. Optionally enter a new name for **Connection Nickname** (for example, `Terraform Cloud`).
      2. Select **Custom for Auth Type**.
      3. Enter `Authorization` for **Header Name**.
      4. Enter `Bearer` followed by a space and the Terraform Team API token from [Preparation](#Preparation) for **Header Value**.
      5. Click **Create**.

         <div class="three-quarter border">

         ![Okta workflows new connection dialog showing terraform cloud connection details](/img/ra/mmod/figure-8-9.png)

         </div>

4. In the **Send Message to Channel** card, configure the output channel to be used for notifications when drift is detected.
   1. Click **Choose Connection**, select the channel you set up in [Preparation](#Preparation), and select your desired input and output fields.
   2. Click **Options** to choose your channel options (for example, select your channel ID for **Channel** and **Yes** for **send as bot**), and click **Save**.
   3. Pick a name for your Slack bot (for example, `Terraform-drift-bot`), which is shown as the originator of the drift notification.
   4. Click **Save** to save your workflow.

      <div class="full border">

      ![Okta workflow with send message to channel card highlighted](/img/ra/mmod/figure-8-10.png)

      </div>

This example demonstrates the process for Slack, but you can choose from many connection types. To select a different destination:

1. Navigate to **Workflows > Workflow** console to open the **Workflows** home page.
2. Click the **Connections** tab in the **Workflows** home page and click **New Connection** to open a **New Connection** page that shows your connection options.
3. Choose the desired connection type (such as **Slack**), specify a nickname (such as `Terraform Drift`), and configure and authenticate the connection as required. 

   > **Hint**: Use the search field in the **New Connection** page to quickly find the best destination for you.

   The name of the connection is added to the **Connections** tab for the workflow.

### Test your changes

1. In the **Flows** tab, click the **ON/OFF** toggle to enable the workflow.
2. Select your workflow, and click **Test** to run through the flow. The **Flow History** panel on the right shows the results.

<div class="full border">

![Okta workflow showing flow history panel, with succcess highlighted](/img/ra/mmod/figure-8-11.png)

</div>

3. If the result is **Success**, congratulations! If the result is an error, see the associated card for error information. Click the **ON/OFF** toggle to disable the flow, resolve the issue, and return to the first step in this section to retry the test. Repeat until the most recent (top) results are **Success**.