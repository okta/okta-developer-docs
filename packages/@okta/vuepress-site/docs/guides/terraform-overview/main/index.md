---
title: Terraform overview
excerpt: Automate managing your Okta org using scripts and the command line with Terraform instead of using the Admin Console.
layout: Guides
---

Terraform uses code to manage Okta orgs in both development and production environments. Managing with code enables you to:

* Apply oversight and auditing to changes in your orgs
* Control access to Okta objects and changes
* Implement best practices for operations, such as source control and automated deployment

You write code in Terraform that describes the desired state of your Okta org, including groups, policies, apps, and more. Terraform uses that description to examine the current state of your org and then creates a plan with the appropriate changes. You can check the plan, modify your description as needed, and run the plan to make the changes.

## Okta plugin for Terraform

Terraform uses plugins called Providers to automate different types of services and applications. The Okta Provider is the plugin for Workforce Identity Cloud (WIC) that enables you to manage your Okta org with Terraform. The provider contains many components that provide the functionality to manage parts of your org, such as groups and applications. In Terraform, these components are identified as resources and data sources. You use resources to describe the desired state of objects in your org and data sources to read the state of objects in your org.

For example, you can include an `okta_groups` resource in your Terraform code to create and update a group. Similarly, you can include an `okta_policy` data source for Terraform to read the information for a policy.

> **Note:** Okta recommends managing a type of object in your org using either Terraform or the Admin Console. Managing the same objects, such as groups or policies, with multiple methods can introduce synchronization issues and increases the risk of errors.

The Okta Provider interacts with your org by making API calls using the Okta Go SDK. Each resource and data source makes calls to different APIs to read and manage the objects in your org. Some resources and data sources make more than one API call when you run your Terraform code. See [Minimize Terraform rate limit errors](/docs/guides/terraform-design-rate-limits) for tips on managing the number of API calls that Terraform makes.

For a closer look at how resources and data sources call the API, see the [terraform-provider-okta](https://github.com/okta/terraform-provider-okta) GitHub repository.

> **Note:** To use Terraform to automate your Customer Identity Cloud (CIC), use the Auth0 Provider.

## Manage with code

You write Terraform code that uses resources, data sources, and other items to describe the desired state of your org. The code is organized in one or more configuration files, ones that end in `.tf`. Using multiple configuration files gives you flexibility in how you group your resources and data sources.

Terraform uses all files in a single directory, the configuration directory, to build the plan. The collection of Terraform files in the directory is called a configuration.

Okta recommends using one configuration per Okta org. This reduces the risk of conflicts and errors when managing your org.

See [Files and Directories](https://developer.hashicorp.com/terraform/language/files) in the Terraform documentation.

## Synchronize Terraform and your org

Terraform tracks the state of managed objects to make changes to your org. When you run your configuration, Terraform uses this information to find the differences between the current and desired state. Terraform can then apply the required changes to reach the desired state.

Terraform stores the current state of your org in a JSON state file, which is named `terraform.tfstate` by default. When you run your configuration, Terraform makes API calls to refresh the state file before applying changes.

> **Note:** Okta recommends storing the state file remotely, such as with a cloud provider. This helps you version, encrypt, and share the state file.

See [State](https://developer.hashicorp.com/terraform/language/state) in the Terraform documentation.

## Run Terraform with the command line

Terraform includes a command-line interface (CLI) that you use to interact with and run your configuration. The CLI includes many useful commands, but there are three key commands that you use to run any configuration:

* `terraform init`: Initializes your configuration's directory by downloading the required provider plugins, installs modules used in the configuration, and configures the Terraform backend for storing state. See [Command: init](https://developer.hashicorp.com/terraform/cli/commands/init) in the Terraform documentation.
* `terraform plan`: Generates a preview of the resources that Terraform creates, changes, and removes when you apply the configuration. See [Command: plan](https://developer.hashicorp.com/terraform/cli/commands/plan) in the Terraform documentation.
* `terraform apply`: Creates, changes, and removes objects in your org according to the plan. See [Command: apply](https://developer.hashicorp.com/terraform/cli/commands/apply) in the Terraform documentation.

You usually run the commands in the following order: `init`, `plan`, and `apply`. This order ensures that Terraform is ready to run and gives you an opportunity to preview the changes before Terraform makes them.

See [Use the Command Line Interface](https://developer.hashicorp.com/terraform/tutorials/cli) in the Terraform documentation.

## Get started

Start automating your org by configuring Terraform access and managing users with groups and policies:

1. [Install Terraform](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli)
1. [Enable Terraform access for your Okta org](/docs/guides/terraform-enable-org-access)
1. [Manage groups of users with Terraform](/docs/guides/terraform-manage-groups)
1. [Manage user access with Terraform](/docs/guides/terraform-manage-user-access)
