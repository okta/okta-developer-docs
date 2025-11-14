#### Create an entitlement resource

1. Create a resource block in your Terraform configuration file. For example, this sample defines an entitlement bundle with two values.

```shell
resource "okta_entitlement" "test" {
  name           = "Entitlement Bundle"
  external_value = "Entitlement Bundle"
  description    = "Some license entitlement"
  multi_value    = true
  data_type      = "array"

  parent {
    external_id = "0oao01ardu8r8qUP91d7"
    type        = "APPLICATION"
  }

  values {
    name           = "value1"
    description    = "description for value1"
    external_value = "value_1"
  }

  values {
    name           = "value2"
    description    = "description for value2"
    external_value = "value_2"
  }
}
```

2. Run the following command.

```shell
terraform plan
```

The output of the command provides a preview of the changes Terraform makes to your infrastructure.

3. Run the following command. This command provisions the entitlement resource.

```shell
terraform apply -target okta_entitlement.test
```

4. Type `yes` when prompted to complete the resource creation.

#### Import existing objects to Terraform

If you've entitlements created manually on your org, you can import and manage them using Terraform using the Terraform import function. For more information on importing objects into Terraform, see Import existing Okta objects into Terraform.

**Note**: You will need the entitlement ID to import an existing entitlement object into Terraform. You can find this ID in either the Okta Admin Console (**Applications** > **Applications** > **[Your app]** > **Entitlements** tab).

1. Create a resource, for example, okta_entitlement.example, to host the object you are importing.

2. Run the following command to import your existing entitlement object into your Terraform state.

```shell
terraform import okta_entitlement.example <entitlement_id>
```

3. Save the file, run `terraform plan`, and then run `terraform apply`.

#### Retrieve existing entitlements

To view an entitlement that is already managed by Terraform, run the following command:

```shell
data "okta_entitlement"  test {
  id="enb11ndt4yZ27Rp4z1d7"
}
output "test" {
  value = data.okta_entitlement.test

}
```

#### Modify existing entitlements

**Note**: List all features that are not supported in the Terraform provider

To modify an entitlement that is already managed by Terraform, update the code in your configuration file. Terraform detects the change and applies it on the next run.
Save the file, run `terraform plan`, and then run `terraform apply` to apply the change to your entitlement in Okta.
