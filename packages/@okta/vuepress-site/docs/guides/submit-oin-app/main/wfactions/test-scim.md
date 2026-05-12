### Validate API integration action flows

You must validate all active flows from your Integration Builder project before you can submit your integration.

1. Click **Validate flows** to validate all your API integration action flows.
1. Resolve any errors from the validation.

> **Note:** The validation process from the OIN Wizard validates all the active flows that you have in your Integration Builder project. This includes active flows from different folders in the project.

### Test API integration action provisioning

Okta recommends that you run manual provisioning tests in your Okta org with your generated test app instance.

Use the [Okta Provisioning Test Plan](/standards/SCIM/SCIMFiles/okta_actions_test_plan_provisioning.xlsx) for guidance. The test plan provides test cases for full provisioning support. Skip the test cases for the features that your integration doesn't support.

Ensure that all the supported test cases pass before you submit your provisioning integration.
