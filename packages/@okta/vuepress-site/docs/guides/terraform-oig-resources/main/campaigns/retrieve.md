
```bash

data "okta_campaign" "example_lookup" {
  id = "enb11ndt4yZ27Rp4z1d7" // Use the ID of the campaign you want to read
}

output "campaign_details" {
  value = data.okta_campaign.example_lookup
}

```