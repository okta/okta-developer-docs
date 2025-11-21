``` bash
resource "okta_request_condition" "example" {
  resource_id="<resource_id>"
  approval_sequence_id="<approval_sequence_id>"
  name="<name>"
  access_scope_settings{
    type="RESOURCE_DEFAULT"
  }
  requester_settings{
    type="EVERYONE"
  }
}
``` 
