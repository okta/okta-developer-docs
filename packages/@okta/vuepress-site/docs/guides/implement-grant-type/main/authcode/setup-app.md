See [Create an Okta app integration](/docs/guides/sign-into-web-app/-/create-okta-application/) for step-by-step instructions to create an app integration with the following parameters for Authorization Code flow:

 Parameter | Required Value for Authorization Code flow       |
| --------- | ----------- |
| Sign-in method  | **OIDC - OpenID Connect** |
| Application type  | **Web Application**  |
| Grant type | **Authorization Code** |
| Sign-in redirect URIs | Specify the callback location to redirect the user with their authorization code. |
