| <div style="width:150px">Property</div> | &nbsp; | Description  |
| ----------------- | --: | ------------ |
|**Provide your default URL** `*` | | Specify the default Assertion Consumer Service (ACS) URL. If you're using a per tenant design, include the variable names that you created in your URL. For example: `https://${org.subdomain}.example.org/strawberry/login`<br>The maximum field length is 1024 characters. |
|**Provide any additional ACS URL** | | If your integration supports multiple ACS URLs where the SAML response can be sent, click the **+** icon to add another URL.<br>Adding an ACS URL is optional, but if you add one, both `ACS URL` and `Index` properties are required.|
| | **ACS URL** `*` | Specify another ACS URL.<br>The maximum field length is 1024 characters. |
| | **Index** `*` | Specify the index for the corresponding additional ACS URL. The index must be an integer between 0 and 65535. |
|**Provide your entity ID or audience restriction** `*` | | Specify your SAML entity ID or the audience restriction.  |
|**Provide the attribute names and values of your claims** | | Specify the attribute name and values of your claim. Click the **+ Add another** to add another claim. <br>Adding a claim is optional, but if you add one, both `Name` and `Value` properties are required.|
| | **Name** `*` | Specify the claim name. |
| | **Value** `*` | Specify a comma-separated list of values for the claim. |
|**Provide your group attributes** | | Specify your group attribute statements if your app supports receiving SAML group attribute statements. For more details on configuring attribute statements in SAML integrations, see [Create a SAML integration using AIW](https://help.okta.com/okta_help.htm?id=ext_Apps_App_Integration_Wizard-saml). |
|**Link to configuration guide** `*` | | Specify the URL link to your customer-facing instructions on how to configure SSO between Okta and your app. See [Customer configuration document guidelines](/docs/guides/submit-app-prereq/main/#customer-configuration-document-guidelines).|

`*` Required properties
