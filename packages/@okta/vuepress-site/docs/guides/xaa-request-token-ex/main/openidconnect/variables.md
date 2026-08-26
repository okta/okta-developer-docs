| Variable | Description |
|---|---|
| `{yourOktaDomain}` | Your Okta org domain. For example, `integrator-1234567.okta.com`. |
| `{clientId}` | The AI agent assumes the role of the client, so this is the AI agent's client ID. You can find this value in the AI agent's **Client registration** tab. The OIDC app instance that's bound to the AI agent share the same client ID. For example, `wlpa0eiuaoCNrpoaE0g7`. |
| `{clientKey}` | The agent assumes the role of the client, so this is the AI agent's client private key. You can find this value in the AI agent's **Client registration** tab. The OIDC app instance that's bound to the AI agent share the same client private key. |
| `{clientAuthScopes}` | Scopes required for the authorization request. For example, `openid`. |
| `{id_token}` | The ID token returned from the IdP after the user successfully authenticates using OIDC. |
| `{idJagScopes}` | The scopes for the ID-JAG token. These are the scopes that the AI agent wants to access in the resource server. For example, `my.xaa.a.read my.xaa.b.manage`. |
| `{resourceAud}` | The resource's authorization server issuer URI. This is the resource audience where the client intends to send the ID-JAG. For example, `https://as.myresource.com`. |
| `{resourceTokenUrl}` | The resource token URL. For example, `https://as.myresource.com/oauth/v1/token` |
| `{resourceApiUrl}` | The resource server's API base URL. For example, `https://myresource.example.com/api/v1/` |
| `{resourceClientId}` | The resource server's client ID. If you've registered the resource server in Okta, this is the resource app's client ID value. |
| `{resourceClientSecret}` | The resource server's client secret. If you've registered the resource server in Okta, this is the resource app's client secret value. |

Some values are obtained after you register your agentic requesting app and resource server in your Okta org.

1. See [Configure the AI agent (requesting app)](/docs/guides/xaa-agent-to-app/main/#configure-the-ai-agent-requesting-app) to register your agentic requesting app in Okta. At the end of this process, you have two objects and the following variables to pass to your app:
    1. AI agent: `{clientId}` as the AI agent's client ID, `{clientKey}` as the AI agent's client private key. For AI Agents registering with an OIDC app, the AI agent's ID and the OIDC app instance's client ID are the same value.
    [[style="list-style-type:lower-alpha"]]
    1. The OIDC app integration instance: `{clientId}` as the client ID, `{clientKey}` as the client private key.
1. See [Configure the resource app](/docs/guides/xaa-agent-to-app/main/#configure-the-resource-app) to register your resource server in Okta. At the end of this process, you have an app integration instance and the following variables to pass to your app:
    1. App integration instance : `{resourceAud}` as the resource audience, `{resourceTokenUrl}` as the resource token URL, and `{resourceApiUrl}` as the resource API URLs your AI agent wants to access.
    [[style="list-style-type:lower-alpha"]]
