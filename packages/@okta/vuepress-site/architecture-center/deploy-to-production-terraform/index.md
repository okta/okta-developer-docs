---
layout: Landing
title: Deploy resources to production via Terraform
---

# Deploy resources to production via Terraform

Up to now, you have made changes in a `preview` environment that is not available to most end-users. This makes it easy for developers, testers, and early adopters to test their changes without impacting production.

In this exercise, you deploy your changes to the production environment (`prod`). This environment is managed in a separate Okta org.

## Steps

### Merge changes to production

In this section you will merge your changes in the `preview` branch into the `prod` branch in GitHub.

1. In your GitHub repository, select the `preview` branch if necessary.
2. Click **Pull requests** in the top menu bar to open the **Pull requests** page.
3. In the **Pull requests** page, click **New pull request** to open a **Comparing changes** page.
4. In the **Comparing changes** page:
   1. Click **base repository** and select your repository from the dropdown menu.
   2. Click **base** and select `prod` from the dropdown menu if necessary.
   3. Click **compare** and select `preview` from the dropdown menu.
5. GitHub displays a summary of commits that were made to the original repo, if any, and your commits to the `preview` branch in the **Commits** tab. In the **Files changed** tab, GitHub shows the changes that were made to each affected file. Review the commits to see if you approve the changes or need to make more.
6. Click **Create pull request** to open the **Open a pull request** page.
7. In the **Open a pull request** page, enter a comment and click **Create pull request** to determine if there are any merge conflicts. (For this exercise, there shouldn’t be.)
8. If there are no merge conflicts, click **Merge pull request**, optionally enter a comment, and click **Confirm merge**.

### Create a second Okta org and API token

If you don’t yet have a second Okta org, visit [https://developer.okta.com/signup/](https://developer.okta.com/signup/) to create one. Specify your first and last names, a unique email address, and a country.

> **Note**: You can use the same first and last name as you used for your first Okta account, but you must specify a different username and email address.

Okta returns an activation email. Click **Activate** and provide a username and password to have Okta create a new Okta Org URL, such as `https://dev-987654.okta.com`. Make note of this second org and use it wherever you see `dev-987654` in Exercises 6-8.

If you don’t have an API token for this Okta org, create one.

1. Go to `https://${yourOktaDomain}-admin.okta.com/admin/access/api/tokens` (for example, `https://dev-987654-admin.okta.com/admin/access/api/tokens`). This opens an Okta API tokens page.
2. Click **Create token** to open a **Create token** dialog. Specify a unique name and click **Create token**.

   >**Important**: Save a copy of the new token; you will not be able to view it again.

### Create a production workspace in Terraform

In this section you'll create a new workspace in Terraform Cloud to represent the production environment. You'll target the same repository as in [Configure auto-plan on check-in](/architecture-center/terraform-autoplan-checkin/), but select the `prod` branch. You'll also set **Apply Method** in Terraform Cloud to **Manual apply** so you have to manually review and apply changes if the planning stage is successful.

1. In your browser, go to [app.terraform.io](app.terraform.io).
2. Click your profile picture in the sidebar. If the dropdown menu says you are signed in with any account other than your current Terraform user ID:
  1. Click **Sign out** in the menu.
  2. In the Terraform Cloud sign-in page, sign in with the sign-in credentials you specified in [Create a second Okta org and API token](#create-a-second-okta-org-and-api-token).
3. Navigate to the **Workspaces** page and click **+ New workspace**.
4. In the **Create a new Workspace** page, select **Version control workflow** in the **Choose Type** tab.
5. In the **Connect to VCS** tab, select **GitHub** or the same type of version control system as you used before, if it was different.
6. In the **Choose a repository** tab, select the repo you created in [Create a working Terraform repo](/architecture-center/create-terraform-repo/).

   > **Caution**: Be sure the path is to your copy of the repo rather than to the original one.

7. In the **Configure settings** tab:
   1. Give your new workspace a descriptive name.

      > **Tip**: You’re configuring a production environment this time, so append `-prod` to the repository’s name for clarity, for example `okta-terraform-ref-prod`.
   
   2. Optionally enter a description.
   3. Click **Advanced options**.
   4. Leave **Terraform Working Directory** blank.
   5. Leave **Apply Method** set to **Manual apply**.
   6. Leave **Automatic Run Triggering** set to **Always trigger runs**.
   7. Enter `prod` for **VCS branch**.
   8. Leave **Automatic speculative plans** set in **Pull Requests**.
   9. Leave **Submodules on clone** reset in **Other Settings**.
   10. Click **Create workspace** to create the new workspace.

8. In the **Workspace created** page, enter the following data and click **Save variables**.
   * `org_name`: Your new subdomain name, for example `dev-987654`.
   * `api_token`: Your new Okta API token, for example as created in [Create a second Okta org and API token](#create-a-second-okta-org-and-api-token) above. It should look something like `001122334455SOddRRomngm21dcXyzbgZ566778899`
   * `base_url`: Your new organization’s base URL, for example `okta.com`.

9. Mark your new `api_token` variable as sensitive:
   1. Navigate to your **Workspaces** page and select your workspace.
   2. Navigate to the **Variables** page.
   3. In the **Workspace variables** section, click the ellipses for `api_token` and select **Edit** from the dropdown menu.
   4. For the `api_token` key, select the **Sensitive** checkbox.
   5. Click **Save variable**.

### Start and confirm your plan

Click **Start new plan** to replicate your Okta configuration from your first Okta org (`preview` branch) into the second Okta org (`prod` branch).

1. Navigate to your **Workspaces** page, and select your workspace.
2. In the **Overview** page, click **Actions** and select **Start new run** from the dropdown menu.
3. Optionally specify a reason for starting the run, choose **Plan and apply**, and click **Start run**.
4. In the **Runs** page, verify that the plan finishes with no errors.

If there are no errors, confirm and apply your changes.

1. At the bottom of the Runs page, click **Confirm & Apply**.
2. In the confirmation dialog, add a comment and click **Confirm Plan**.
3. Verify that Apply completes successfully.
