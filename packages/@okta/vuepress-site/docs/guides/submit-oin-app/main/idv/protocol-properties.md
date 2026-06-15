#### Identity Verification integration properties

> **Note:** The instructions on this page are for **Identity Verification integrations**.
> If you want to change the instructions that you see on this page, select a different option from the **Instructions for** dropdown list.

1. Specify the following properties:

    | Property | Description |
    | --- | --- |
    | Issuer URL * | Used to check if the identity verification token received from the provider is from the expected issuer platform. |
    | PAR URL * | The endpoint for Pushed Authorization Requests (PAR) that is used during the authorization process. |
    | Authorization URL * | The endpoint where the request URL obtained during the PAR process is appended to retrieve the verification code. |
    | Token URL * | The endpoint Okta uses to exchange the authorization code for a token from the identity verification provider. |
    | JWKS URL * | The URL hosted by the vendor that provides the JSON Web Key Set (JWKS) to cryptographically verify token signatures. |
    | **End user experience properties** ||
    | End user license agreement URL * | The link to your end user License Agreement (EULA) or terms of use that is displayed directly within the Okta Sign-In Widget. |
    | Privacy statement URL * | The link to your privacy policy that is displayed to users within the Okta Sign-In Widget environment. |
    | Configuration guide URL * | The public link containing step-by-step instructions for customer administrators on how to obtain their client ID and client secret keys from your service platform. |

    `*` Required properties
