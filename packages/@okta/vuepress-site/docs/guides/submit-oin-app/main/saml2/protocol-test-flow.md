| <div style="width:150px">Property</div> | &nbsp; | Description  |
| ----------------- | --: | ------------ |
| **Supported sign-in flows** | | Indicate which sign-in flow your integration supports. |
| | **IdP** | Sign-in flow is initiated from the Okta End-User Dashboard. This sign-in flow must be supported by all SSO integrations. Therefore, it's always selected. |
| | **SP** | Sign-in flow is initiated from your app sign-in page. This sign-in flow is optional. |
| **Supports Just-In-Time provisioning?** `*` | | Indicate if your integration supports Just-In-Time (JIT) provisioning. With JIT provisioning, you can use a SAML assertion to create users the first time they try to sign in. This eliminates the need to create user accounts in advance. |
| | **Yes** | Your integration supports JIT. |
| | **No** | Your integration doesn't support JIT. |
| **SP Initiate URL** | | Specify the URL for SP-initiated sign-in flows. This URL is required for the SP flow.<br>The maximum URL length is 512 characters.  |
| **SP Initiate description** | | Provide instructions on how to sign in to your app using the SP-initiated flow.<br>The maximum description length is 2048 characters. |

`*` Required properties
