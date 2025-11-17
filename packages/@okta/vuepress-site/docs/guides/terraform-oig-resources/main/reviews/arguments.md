The following table details the configurable arguments for the Entitlement resource. These resources in the Okta Terraform provider are used to define and manage entitlements within your Okta org.

| Argument Name | Description | Type | Required |
| --- | --- | --- | --- |
| `items_reviewed` | A list of resource or entitlement identifiers (e.g., Okta User IDs) that are subject to this review. These are the specific items being assessed. | list(string) | Yes |
| `reviewers` | A list of Okta User IDs or primary email addresses of individuals designated to perform the review. | list(string) | Yes |
| `review_type` | The type of review being conducted. Common values include ACCESS_REVIEW or ENTITLEMENT_REVIEW. Always check the Terraform Registry for the most up-to-date and supported enumeration values. | string | Yes |
| `description` | A human-readable description of the review, explaining its purpose and scope. | string | No |
| `start_date` | The ISO 8601 formatted timestamp indicating when the review period begins. The timestamp start immediately or based on Okta default scheduling| string | No |
| `end_date` | The ISO 8601 formatted timestamp indicating when the review period officially ends. | string | No |
| `due_date` | The deadline by which reviewers must complete their assessments for this review. | string | No |
| `status` | The current state of the review. This is often read-only and managed by Okta. Valid values might include DRAFT, ACTIVE, COMPLETED, CLOSED. Consult the Registry for definitive values and writability. | string | No |
| `campaign_id` | The unique identifier of the parent Okta IGA Campaign to which this review belongs. Used for grouping and management. | string | No |
| `auto_remediate` | A boolean flag indicating whether remediation actions (e.g., revoking access) should be automatically applied based on reviewer decisions. Note: Verify if this parameter is directly supported and its exact behavior in the Registry. | boolean | No |
| `send_notifications` | A boolean flag to enable or disable email notifications to reviewers and stakeholders regarding the review process. Note: Verify if this parameter is directly supported and its exact behavior in the Registry. | boolean | No |
| `reviewer_settings` | A nested block to configure advanced reviewer behaviors, such as reminders and auto-approval thresholds. | object({...}) | No |
