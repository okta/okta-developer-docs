---
title: Detect drift between environments and correct it
---

# Managing multiple Okta environments tutorial 5: detect drift between environments and correct it

Drift occurs when an Okta object changes in the destination (production) environment and is out of sync with its source (development) environment. This situation can occur during an outage when changes are made quickly to a production environment to restore service.

In this exercise, you'll update a resource in production using the Okta Admin Console, and then run a Terraform plan to detect if an asset has changed. If so, this tells the admin that someone has made a change without going through Terraform, and it needs to be investigated.

1. Preparation
   1. Display your workspace Overview page in a browser window. The Latest Run panel should reflect the results of your most recent run in the previous exercise.

   <div class="full border">

   ![Latest run panel showing run trigged by ui is accepted](/img/architecture/mmod/figure-7-1.png)

   </div>

   1. In a second browser window, go to `https://${OKTA_DOMAIN}-admin.okta.com` to open the Okta Admin Console.

1. In the Okta Admin Console:
   1. Select **Directory > Groups**.
   1. In the **Groups** page, select **Renamed Test Group**.
   1. In the **Renamed Test Group page**, select the **Profile** tab.
   1. In the **Profile** panel, click **Edit**, set **Name** to **Newly Renamed Test Group**
   1. Click **Save**.

1. In the **Latest Run panel** of the workspace **Overview** page for your production workspace, observe that a plan is not run automatically.
1. In the workspace **Overview** page, click **Actions**, select **Start new run**, choose **Plan Only**, and click **Start run**.
1. Click **See details**; observe the plan running and finishing, and Terraform stopping with the Apply pending.
1. When the plan finishes, observe that the **Plan finished** panel shows that the `okta_group.test_group` has been changed.
1. In the workspace **Overview** page, observe that **Resources to be changed** shows that no resources would be added, one resource would be changed, and no resources would be deleted if the changes are applied.
1. Normally you would investigate the change and, if it is permitted, you would make sure it is reflected in GitHub if appropriate. In this case, if there are no errors, confirm and apply your changes:
   1. In the workspace **Runs** page, select the **Current Run** if necessary.
   2. At the bottom of the run page, click **Confirm & Apply**.
   3. In the confirmation dialog, add a comment and click **Confirm Plan**.
   4. Verify that Apply completes successfully.
