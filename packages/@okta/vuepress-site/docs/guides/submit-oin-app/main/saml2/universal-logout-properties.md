#### Universal logout properties

| <div style="width:150px">Property</div> | Description  |
| ----------------- | ------------ |
| **Global token revocation endpoint** `*` | Specify your global token revocation endpoint. If your endpoint URL is dynamic, use the variables specified in the Integration variables section. For example: `https://{app.subdomain}.example.org/strawberry/login`. See [Dynamic properties with Okta Expression Language](#dynamic-properties-with-okta-expression-language).<br>The maximum field length is 1024 characters.|
| **Authentication method** | Specify the authentication method for your app. For example: `SIGNED_JWT`|
| **Subject format** | Specify the subject format for your app. For example: `Email` or `Issuer and Subject identifier`|
| **Partial support** | Specify any partial support for your app.|

`*` Required properties
