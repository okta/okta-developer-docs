---
title: Rename a group
---

# Manage multiple Okta environments tutorial 3: Rename a group

> **Note:** This area is a work in progress. Please leave feedback on the content and format of this new type of architecture article by posting comments in the [Architecture area of the developer forums](https://devforum.okta.com/c/questions/architecture/24).

In this tutorial, you use Terraform to update the name of an existing group in GitHub and see the effect in the Admin Console. This simulates changing a resource with the Okta Terraform Provider and applying the change in a destination org.

1. Display your workspace **Overview** page in a browser window. The **Latest Run** panel should reflect the results of your most recent update in [the previous exercise](/docs/reference/architecture-tutorials/create-resources-terraform/).

   <div class="full border">

   ![FILL IN ALT TEXT](/img/architecture/mmod/figure-5-1.png)

   </div>

2. In a different browser window, open your working copy of the Okta Terraform repo in GitHub and select the `preview` branch.

3. In GitHub, click `groups.tf` to open it and click the edit (pencil) icon to switch to edit mode.

4. Change the name property for `test_group` from "Test Group" to "Renamed Test Group".

   <div class="full border">

   ![Latest run panel, showing updated customer-portal.tf](/img/architecture/mmod/figure-5-2.png)

   </div>

5. Scroll down to the **Commit changes** panel, add a title and description for the change, make sure **Commit directly to the preview branch** is selected, and click **Commit changes**.

   <div class="full border">

   ![groups.tf code, showing highlighted name = test group](/img/architecture/mmod/figure-5-3.png)

   </div>

6. Monitor the status in the **Latest Run** panel of your workspace **Overview** page. You should see the title change to the title in your GitHub commit panel. You should also see the state change from **Applied**, to **Planning**, to **Applying**, to **Applied** when the run completes.

   <div class="full border">

   ![Commit changes dialog showing Update groups.tf change summary](/img/architecture/mmod/figure-5-4.png)

   </div>

   As before, the results are applied. The three values for **Resources changed** (`+0 ~1 -0`) show that no resources were added, one resource was updated, and no resources were deleted.

7. Click **See details**, expand the **Apply finished** panel, and observe that the `okta_group.test_group` resource was updated.

8. Also observe that you can add comments to the run for feedback and discussion.
