---
layout: Landing
title: Create a working Terraform repo
---

# Create a working Terraform repo

In this exercise, you'll create a private copy of an example Terraform script in GitHub.

## Steps

1. In a browser, go to [https://github.com/oktadev/okta-terraform-ref](https://github.com/oktadev/okta-terraform-ref).

2. Click **Fork** to create a copy for your project in GitHub.

3. In the **Create a new fork** page, optionally add or update **Description**, deselect (uncheck) the **Copy the prod branch only** checkbox, and click **Create fork**. This creates a copy in your GitHub repository.

The repository you are forking has two branches: `prod` and `preview`. The `preview` branch should be populated and is the one you will work with at the beginning; the `prod` branch should be empty. In Exercises 1-5, you'll update source modules in the `preview` branch. In Exercise 6 onwards, you'll promote your code to `prod` and then use the `prod` branch for the remaining exercises.