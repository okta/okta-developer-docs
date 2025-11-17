
```bash

data "okta_entitlement"  test {
  id="enb11ndt4yZ27Rp4z1d7"
}
output "test" {
  value = data.okta_entitlement.test

}
```
