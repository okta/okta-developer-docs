``` bash
resource "okta_request_setting_resource" "test"
{
  resource_id="<resource_id>"
  risk_settings
  {
    default_setting
    {
      request_submission_type= "ALLOWED_WITH_OVERRIDES"
      approval_sequence_id="<approval_sequence_id>"
    }
  }
  request_on_behalf_of_settings
  {
    allowed = true
  }
}
```
