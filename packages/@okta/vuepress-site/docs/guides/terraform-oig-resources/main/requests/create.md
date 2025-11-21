``` bash
resource "okta_request_v2" "test"
{
  requested
  {
    type = "CATALOG_ENTRY"
    entry_id = "<entry_id>"
  }
  requested_for
  {
    type = "OKTA_USER"
    external_id = "<user_id>"
  }
}
```
