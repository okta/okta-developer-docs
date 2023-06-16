---
title: Deploy changes to production
---

# Tutorial 4: Deploy changes to production

In tutorials 2 and 3, you made changes in a preview environment that isn't available to most users. This makes it easy for developers, testers, and early adopters to test their changes without impacting production.

Now use Terraform to deploy your changes to another Okta org. This example of moving objects between two Okta orgs simulates moving objects between non-production and production environments. You can use this example to integrate into critical software development practices like change management and continuous integration and continuous deployment.

## Create an Okta API token

Create a token for Terraform to access the production org. Follow the same process to create an Okta API token as you did in tutorial 1.

1. Open the Admin Console for your **production** org.
1. Choose **Security** > **API** to view the API access management page.
1. Select **Tokens** to view the API token management tab.
1. Click **Create token** to open a **Create token** dialog.
1. Set a name for your token. For example, _Terraform Cloud access for production org_.
1. Click **Create token** to save a copy of the token. You can't view it again.

## Merge changes to production

Merge the changes in the `preview` branch into the `prod` branch in GitHub.

1. In your GitHub repository, select the `preview` branch, if necessary.
2. Click **Pull requests** in the menu bar to open the **Pull requests** page.
3. Click **New pull request** to open a **Comparing changes** page.
4. On the **Comparing changes** page:
   1. Set **base repository** to your repository.
   2. Set **base** to **prod**.
   3. Set **compare** to **preview**.
5. GitHub displays a summary of commits that were made to the original repo, if any, and your commits to the `preview` branch in the **Commits** tab. In the **Files changed** tab, GitHub shows the changes that were made to each affected file. Review the commits to see if you approve the changes or need to make more.
6. Click **Create pull request** to open the **Open a pull request** page.
7. Click **Create pull request** to determine if there are any merge conflicts. For this exercise, there shouldn't be.
8. If there are no merge conflicts, click **Merge pull request**, optionally enter a comment, and click **Confirm merge**.

### Create a production workspace in Terraform

In this exercise, you create a workspace in Terraform Cloud to represent the production environment. Target the same repository as in [Connect Terraform to GitHub](/docs/reference/architecture-center/multiple-environments/lab-1-configure-terraform-cloud/#connect-terraform-to-github), but select the `prod` branch. Also, set **Apply Method** in Terraform Cloud to **Manual apply** so you have to manually review and apply changes if the planning stage is successful.

1. In your browser, go to [app.terraform.io](app.terraform.io).
1. Click your profile picture in the sidebar. If the dropdown menu says you're signed in with any account other than your current Terraform user ID:
   1. Click **Sign out** in the menu.
   2. On the Terraform Cloud sign-in page, sign in with the sign-in credentials for your **production** org.
1. Navigate to the **Workspaces** page and click **+ New workspace**.
1. On the **Create a new Workspace** page, select **Version control workflow** to declare that your configuration is saved in a version control system.
1. On the **Connect to VCS** tab, select **GitHub** > **GitHub.com**. These exercises use GitHub, but you can select a different VCS. This selection grants permission for Terraform Cloud to access your project.
1. On the **Choose a repository** tab, select the repo that you created in [A working Terraform repository](/docs/reference/architecture-center/multiple-environments/lab/#a-working-terraform-repository).

   > **Tip:** Be sure that the path is to your copy of the repo and not to the original one.

1. On the **Configure settings** tab:
   1. Give your new workspace a descriptive name. For example, _okta-terraform-ref-production-environment_.
   2. Optional. Enter a description.
   3. Click **Advanced options**.
   4. Verify that **Terraform Working Directory** is blank.
   5. Verify that **Apply Method** is set to **Manual apply**.
   6. Verify that **Automatic Run Triggering** is set to **Always trigger runs**.
   7. Set **VCS branch** to **prod**.
   8. Verify that **Automatic speculative plans** is set in **Pull Requests**.
   9. Verify that **Submodules on clone** is cleared in **Other Settings**.
   10. Click **Create workspace** to create the new workspace.

1. On the **Workspace created** page:
   1. Set **org_name** to your `${OKTA_DOMAIN_NAME}` for the production org.
   2. Set **api_token** to the token that you created earlier in [Create an API token](#create-an-okta-api-token).
   3. Set **base_url** to your org's base URL. For example, _okta.com_.
1. Click **Save variables**.
1. Mark your `api_token` variable as sensitive.
   1. Navigate to your **Workspaces** page and select your workspace.
   2. Navigate to the **Variables** page.
   3. In the **Workspace variables** section, click the ellipses (`...`) for `api_token` and select **Edit** from the dropdown menu.
   4. For the `api_token` key, select the **Sensitive** checkbox.
   5. Click **Save variable**.

### Start and confirm your plan

Click **Start new plan** to replicate your Okta configuration from your first Okta org (`preview` branch) into the second Okta org (`prod` branch).

1. Navigate to your **Workspaces** page, and select your workspace.
2. On the **Overview** page, click **Actions** and select **Start new run** from the dropdown menu.
3. Optional. Specify a reason for starting the run, choose **Plan and apply**, and click **Start run**.
4. In the **Runs** page, verify that the plan finishes with no errors.

If there are no errors, confirm and apply your changes.

1. At the bottom of the Runs page, click **Confirm & Apply**.
2. In the confirmation dialog, add a comment and click **Confirm Plan**.
3. Verify that Apply completes successfully.
