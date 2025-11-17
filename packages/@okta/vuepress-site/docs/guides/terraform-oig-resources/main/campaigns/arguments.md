The following table details the configurable arguments for the Campaigns resource. These resources in the Okta Terraform provider are used to define and manage campaigns within your Okta org.

| Argument Name   | Description | Type | Required |
| :------------------ | :------------ | :----------- | :------- |
| `name` | The display name of the campaign | string | Yes |
| `description` | Detailed description of the campaign's purpose and scope | string | Yes |
| `campaign_type` | Type of campaign (e.g., ACCESS_REVIEW, CERTIFICATION) | string | Yes |
| `start_date` | ISO 8601 timestamp for campaign start | string | No |
| `end_date` | ISO 8601 timestamp for campaign end | string | No |
| `status` | Campaign status (ACTIVE, DRAFT, COMPLETED) | string | No |