Before you create the app, ensure that you have the following information:

* The redirect URI for your client app.
* The `applicationType` for your client app (`web`, `native`, or `spa`). This determines which OAuth 2.0 flows are supported and whether a client secret is required.

Review the following sections to understand the requirements for your app and how to configure the app settings in Access Gateway when you create it.

### Scopes and claims

Access Gateway supports the `openid`, `profile`, and `email` scopes.

The following claims are included in tokens based on the granted scopes:

| Claim | Scope | Description |
| --- | --- | --- |
| `sub` | `openid` | Subject identifier |
| `name` | `profile` | Full name of the user |
| `email` | `email` | Email address of the user |
| `job_title` | `profile` | Job title of the user |
| `groups` | `profile` | Group memberships of the user |

### Token lifetimes and behavior

You can configure access token and refresh token lifetimes per app using `accessTokenLifetime` and `refreshTokenLifetime` in the request body when you create the app. If you omit these fields, the following default settings apply:

| Token | Default lifetime |
| --- | --- |
| Access token | 15 minutes |
| Refresh token | 7 days |

Also note that refresh tokens are mode-specific. A refresh token that's issued in online mode can't be used after Access Gateway switches to offline mode. When a mode transition occurs, users must re-authenticate.

### Types of OIDC apps

You can create three different types of OIDC apps. The `applicationType` determines which OAuth 2.0 flows are supported and whether a client secret is required.

| App type | Supported flows | Client secret |
| --- | --- | --- |
| `web` (server-side web apps) | Authorization Code + PKCE, client credentials, refresh token | Required |
| `native` (mobile or desktop apps) | Authorization Code + PKCE, refresh token; device grant optional | Optional |
| `spa` (single-page apps) | Authorization Code + PKCE only | Not used |
