#### Dynamic properties with Okta Expression Language

 The OIN Wizard supports [Okta Expression Language](/docs/reference/okta-expression-language/#reference-user-attributes) to generate dynamic properties, such as URLs or URIs, based on your customer tenant. You can specify dynamic strings for your <StackSnippet snippet="protocol-name" inline/> properties in the OIN Wizard:

1. Add your [tenant settings](#tenant-settings) in the OIN Wizard. These settings become fields for customer admins to enter during your OIN integration installation to identify their tenant.

2. Use the tenant setting variables with the Expression Language format in your integration properties for dynamic values based on customer information.