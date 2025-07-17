#### Universal logout properties

> Note: The **Universal logout properties** section only displays when you select the **Universal Logout** along with the protocols that your integration supports from the **Select protocol** section.

| <div style="width:150px">Property</div> | &nbsp; | Description  |
| ----------------- | --: | ------------ |
| **Global token revocation endpoint** `*` | |Specify your global token revocation endpoint. If your endpoint URL is dynamic, use the variables specified in the **Integration variables** section. For example: `https://{app.subdomain}.example.org/strawberry/login`. See [Dynamic properties with Okta Expression Language](#dynamic-properties-with-okta-expression-language).<br>The maximum field length is 1024 characters.|
| **Authentication method** | |Specify the authentication method for your app. For example: `SIGNED_JWT`|
| **Subject format** | | Specify the subject format for your app.|
| | **Email** | Your integration uses the email address of the user. |
| | **Issuer and Subject identifier** | Your integration uses the user identifier. |
| **Partial support** | | Select if you require partial support for your app. |
> Note: If you select this option, user sessions aren't terminated until the user's existing access tokens expire or the user signs out of an application.|

`*` Required properties
