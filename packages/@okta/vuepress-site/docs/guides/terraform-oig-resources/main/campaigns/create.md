
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
