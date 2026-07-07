#### Identity Verification integration properties

> **Note:** The instructions on this page are for **Identity Verification integrations**.
> If you want to change the instructions that you see on this page, select a different option from the **Instructions for** dropdown list.

1. Specify the following properties:

    | Property | Description |
    | --- | --- |
    | Issuer URL * | Checks if the identity verification token that's received from the provider is from the expected issuer platform. |
    | PAR URL * | The endpoint for Pushed Authorization Requests (PAR) that's used during the authorization process. |
    | Authorization URL * | The endpoint where the request URL that was obtained during the PAR process is appended to retrieve the verification code. |
    | Token URL * | The endpoint Okta uses to exchange the authorization code for a token from the identity verification provider. |
    | JWKS URL * | The URL hosted by the vendor that provides the JSON Web Key Set (JWKS) to cryptographically verify token signatures. |
    | **End user experience properties** ||
    | End user license agreement URL * | The link to your end user License Agreement (EULA) or terms of use that's displayed on the Okta Sign-In Widget. |
    | Privacy statement URL * | The link to your privacy policy that's displayed on the Okta Sign-In Widget. |
    | Configuration guide URL * | Step-by-step instructions for customer administrators on how to obtain their client ID and client secret keys from your service platform. |

    `*` Required properties
