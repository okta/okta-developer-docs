See [Create an Okta app integration](/docs/guides/sign-into-spa/-/create-okta-application/) for step-by-step instructions to create an app integration with the following parameters for Implicit flow:

 Parameter | Required Value for Implicit flow       |
| --------- | ----------- |
| Sign-in method  | **OIDC - OpenID Connect** |
| Application type  | **Single-Page Application**  |
| Grant type | **Implicit (Hybrid)** |
| Sign-in redirect URIs | Specify the callback location where the user agent is directed to along with the access token. |

   > **Note:** It is important to choose the appropriate application type for apps that are public clients. Failing to do so may result in Okta API endpoints attempting to verify an app's client secret, which public clients are not designed to have, and would break the sign-in or sign-out flow.
