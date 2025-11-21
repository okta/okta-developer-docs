
**Note**: Ensure that you have the resource ID and request condition ID to import an existing request condition object into Terraform. You can retrieve this ID in either the Admin Console or using the [Request Conditions API](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v2/tag/Request-Conditions/#tag/Request-Conditions/operation/getResourceRequestConditionV2).

``` bash
terraform import okta_request_condition.example <resource_id>/<request_condition_id>
```