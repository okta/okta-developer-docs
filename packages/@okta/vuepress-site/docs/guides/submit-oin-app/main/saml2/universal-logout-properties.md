> **Note:** The **Universal logout properties** section only displays when you select **Universal Logout** along with the protocols that your integration supports from the **Select protocol** section.

1. Specify the following properties if you want to integrate Universal Logout:

| <div style="width:150px">Property</div> | &nbsp; | Description  |
| ----------------- | --: | ------------ |
| **Global token revocation endpoint** `*` | |Specify your [Global Token Revocation (GTR)](https://www.ietf.org/archive/id/draft-parecki-oauth-global-token-revocation-04.html) endpoint. If your endpoint URL is dynamic, use the variables that are specified in the **Integration variables** section. For example: `https://' + app.subdomain + '.example.org/strawberry/login`. See [Dynamic properties with Okta Expression Language](https://developer.okta.com/docs/guides/submit-oin-app/scim/main/#dynamic-properties-with-okta-expression-language).<br>The maximum field length is 1024 characters.|
| **Authentication method** | | Specifies the authentication method that's used for Universal Logout. Okta only supports `SIGNED_JWT`.|
| **Subject format** | | Specify how the user is identified in the logout request for your app. The default value is **Email**.|
| | **Email** | Your integration uses the email address of the user. |
| | **Issuer and Subject identifier** | Your integration uses the user identifier. |
| **Partial support** | | Select if you only require partial universal logout support for your app. <br> **Note**: If you select this option, while clearing the user's session from Okta, the app only revokes the user's refresh tokens, which prevents the user from getting new access in the future. However, the existing user sessions aren't terminated until the user's existing access tokens expire or the user signs out of an app. </br>|

`*` Required properties
1. Click **Get started with testing** to save your edits and move to the testing section, where you need to enter your integration test details.