
**Note**: Ensure that you have the resource ID and request sequence ID to import an existing request sequence object into Terraform. You can retrieve this ID in either the Admin Console or using the [Request Sequences API](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v2/tag/Request-Sequences/).

``` bash
terraform import okta_request_condition.example <resource_id>/<request_sequence_id>
```

