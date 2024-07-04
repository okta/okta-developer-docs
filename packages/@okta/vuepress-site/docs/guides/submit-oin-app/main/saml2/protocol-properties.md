| <div style="width:150px">Property</div> | &nbsp; | Description  |
| ----------------- | --: | ------------ |
| **Provide your default ACS URL** `*` | | Specify the default Assertion Consumer Service (ACS) URL. If you're using a per tenant design, include the variable names that you created in your URL. For example: `https://${org.subdomain}.example.org/strawberry/login`.  See [Dynamic properties with OEL](#dynamic-properties-with-oel).<br>The maximum field length is 1024 characters. |
| **Provide any additional ACS URLs** | | Provide an indexed ACS URL if your integration supports multiple ACS URLs where Okta can send the SAML response.<br>Adding an ACS URL is optional, but if you add one, both `ACS URL` and `Index` properties are required.<br>Click **+ Add another** to add another URL.|
| | **ACS URL** `*` | Specify another ACS URL.  See [Dynamic properties with OEL](#dynamic-properties-with-oel).<br>The maximum field length is 1024 characters. |
| | **Index** `*` | Specify the index for the corresponding additional ACS URL. You can't reuse the same index in the list, and the index must be an integer 0&ndash;65535. |
|**Provide your entity ID or audience restriction** `*` | | Specify your SAML entity ID or the audience restriction.  |
| **Provide the attribute names and values of your claims** | | Specify the attribute name and values of your claim. <br>Adding a claim is optional, but if you add one, both `Name` and `Value` properties are required.<br>Click **+ Add another** to add another claim.|
| | **Name** `*` | Specify the claim name. |
| | **Value** `*` | Specify a comma-separated list of values for the claim. |
| **Provide your group attributes** | | Specify your group attribute statements if your app supports receiving SAML group attribute statements. See [Define attribute statements](https://help.okta.com/okta_help.htm?type=oie&id=ext-define-attribute-statements) and [Define group attribute statements](https://help.okta.com/okta_help.htm?type=oie&id=ext-define-group-attribute-statements) for details on configuring attribute statements.<br>Click **+ Add another** to add more statements. |
| **Link to configuration guide** `*` | | Specify the URL link to your customer-facing instructions on how to configure SSO between Okta and your app with SAML. See [Customer configuration document guidelines](/docs/guides/submit-app-prereq/main/#customer-configuration-document-guidelines).|

`*` Required properties
