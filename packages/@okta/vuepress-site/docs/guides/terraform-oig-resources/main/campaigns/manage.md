#### Create a campaign resource

Create a resource block in your Terraform configuration file. For example, this sample defines an access review campaign for a specific app.

```shell

resource "okta_campaign" "example" {
  name        = "Example Campaign"
  description = "An example campaign for resource access reviews."
  
  // This campaign targets a specific application
  app_id   = "0oao01ardu8r8qUP91d7" // Change this to your app's ID
  app_type = "APP"
  
  // This campaign reviews app-level resources
  review_type = "RESOURCE"
  
  // Schedule settings
  schedule        = "CRON"
  cron_expression = "0 0 * * 0" // Runs every Sunday at midnight
  start_time      = "2024-01-01T00:00:00.000Z"
  duration        = "P1W" // Campaign lasts for 1 week
  
  // Reviewer settings
  reviewers {
    type = "MANAGER" // Assigns the review to the user's manager
  }
  
  // Remediation settings
  remediation_options {
    no_decision = "DENY" // If no decision is made, deny access
  }
}

```

1. Run the `terraform plan` command. The output of the command provides a preview of the changes Terraform makes to your infrastructure.

```shell
terraform plan 
```

2. Run the `terraform apply` command. To apply only a new resource, run a targeted apply command:

```shell

terraform apply

```

#### Import existing objects to Terraform

You can import existing campaign objects to Terraform using the import function. For more information on importing objects into Terraform, see Import existing Okta objects into Terraform.
<br>

**Note**: Ensure you have the Campaign ID that you want to import. </br>

<br> </br>

1. Create a resource block, for example, okta_campaign.example, to host the object you’re importing. The configuration must match the object in Okta.

2. Run the following command to import your existing campaign object into your Terraform state.

```shell

terraform import okta_campaign.example <campaign_id>

```

#### Retrieve existing campaigns

To view a campaign that is already managed by Terraform, or any campaign in your org, you can use a data source.

```shell

data "okta_campaign" "example_lookup" {
  id = "enb11ndt4yZ27Rp4z1d7" // Use the ID of the campaign you want to read
}

output "campaign_details" {
  value = data.okta_campaign.example_lookup
}

```

#### Modify existing campaigns

To modify a campaign that is already managed by Terraform, update the code in your configuration file. Terraform detects the change and applies it on the next run.
Save the file, run `terraform plan`, and then run `terraform apply` to apply the change to your campaign in Okta.
