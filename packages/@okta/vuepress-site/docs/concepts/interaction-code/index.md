---
title: Interaction Code grant type
meta:
  - name: description
    content: An overview of the Interaction Code grant type for Okta Identity Engine.
---

# Interaction Code grant type

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" /><br>

## Overview

To enable a more customized user authentication experience, Okta has introduced an extension to the [OAuth 2.0 and OpenID Connect](/docs/concepts/oauth-openid) standard called the Interaction Code grant type. This grant type allows native, SPA, and web apps to manage user interactions with the authorization server directly, rather than relying on a browser-based redirect to an authentication component (such as the Okta Sign-In Widget). This is useful when the client app (client) has a particular way that it wants to interact with the user and doesn’t need to share an authenticated session with other applications.

The Interaction Code flow consists of a series of interactions between the user and the authorization server, facilitated by the client. Each interaction is called a remediation step and corresponds to a piece of user data required by the authorization server. The client obtains these remediation steps from the Identity Engine component of the [Okta Authorization Server](/docs/concepts/auth-servers/) and prompts the user for the required data at each step to continue the flow. Each step of the remediation is a criteria of assurance for authenticating the user, and is evaluated at runtime based on predefined Okta Authorization Server and app sign-on policies. The number and nature of remediation steps are configurable in the policies with minimal disruption to the running app. This allows the authentication experience to differ based on user, group, context, app, available factors, and so on.

Remediation is the direct communication between the client and the Identity Engine that can be achieved either without a browser redirect or with a browser redirect when the remediation transitions through a push authorization request. For example, a user could start an authentication flow by entering only a username, and this flow would prompt the client to request more information, or remediation, as required. A follow-up remediation step might involve the client prompting the user for a password or to add a second factor, and then sending that information directly to the Identity Engine component for verification. Each form of remediation that the user must supply is dictated by the evaluated policies between the Okta Authorization Server and the app. When the remediation steps are complete, the Identity Engine component provides the client with an Interaction Code that is exchanged for tokens by the Okta Authentication Server, following [OAuth 2.0 and OpenID Connect](/docs/concepts/oauth-openid) standards.

The Interaction Code grant is intended for developers who want to control the step-by-step remediation user experience without using a web browser to redirect the authentication experience. This grant type enables developers to include [Identity Engine features](https://help.okta.com/okta_help.htm?type=oie&id=ext-features) in their app, such as passwordless authentication and progressive profiling. The Interaction Code flow can use policy-driven remediation steps not only for authentication, but also for registration and account recovery. See [Redirect authentication vs. embedded authentication](/docs/concepts/redirect-vs-embedded/) for Identity Engine authentication deployment models. Also, see the embedded authentication use cases in the [Identity Engine deployment guides](/docs/guides/oie-intro/) for detailed Interaction Code flow implementations.

## The Interaction Code flow

The Interaction Code flow is similar to the [OAuth 2.0 Authorization Code flow with PKCE](/docs/concepts/oauth-openid/#authorization-code-flow-with-pkce). All clients are required to pass a client ID, as well as a Proof Key for Code Exchange (PKCE), to keep the flow secure. Confidential clients such as web apps must also pass a client secret in their authorization request. The user can start the authorization request with minimal information, relying on the client to facilitate the interactions with the Identity Engine component of the Okta Authorization Server to progressively authenticate the user. The series of interactions is managed using the `interaction_handle`, which acts as a state handle for each transaction. After successfully completing the remedial interactions, the client receives an `interaction_code` that they can redeem for tokens from an Okta Authorization Server with the [`/token`](/docs/reference/api/oidc/#token) endpoint.

The Interaction Code flow is supported by Okta's two authorization server types: the [Org Authorization Server](/docs/concepts/auth-servers/#org-authorization-server) and the [Custom Authorization Server](/docs/concepts/auth-servers/#custom-authorization-server). These Okta Authorization Servers must have the Interaction Code grant type configured in their [access policy rule](/docs/guides/customize-authz-server/create-access-policies/) to accept Interaction Code requests.

The following table describes the parameters introduced for the Interaction Code grant type flow:

| Interaction Code grant parameter           | Description   |
| --------------------------------           | -----------   |
| `interaction_handle` | The `interaction_handle` is an opaque, immutable value that is provided by the Identity Engine component of an Okta Authorization Server. The client can use the `interaction_handle` to interact with the Identity Engine component directly. The client is responsible for saving the `interaction_handle` and using it to hold the state of the transaction during remediation. Any public/confidential client that is configured to use the Interaction Code grant type can obtain an `interaction_handle`. If all the remediation steps are successfully performed, an `interaction_code` is returned as part of the success response.            |
| `interaction_code` |  The `interaction_code` is a one-time use, opaque code that the client can exchange for tokens using the Interaction Code grant type. This code enables a client to redeem a completed Identity Engine interaction for tokens without needing access to an authorization server’s session. |

The following sequence of steps is a typical Interaction Code flow:

<!--
See http://www.plantuml.com/plantuml/uml/

@startuml
skinparam monochrome true
actor "Resource Owner (User)" as user
participant "Client" as client
participant "Authorization Server (Okta)" as okta
participant "Resource Server (Your App)" as app

user -> client: Start auth with user info
client -> client: Generate PKCE code verifier & challenge
client -> okta: Authorization request w/ code_challenge, client ID, scopes, and user info
okta -> okta: Remediation required
okta -> client: Send interaction_handle in response (for required interaction)
client <-> okta: Remediation steps w/ interation_handle
user <-> client: Remediation
note right: Possible multiple remediation steps required
client -> okta: Complete remediation steps w/ interaction_handle
okta -> client: Send interaction_code in response
client -> okta: Send interaction_code, client ID, code_verifier to /token
okta -> okta: Evaluates PKCE code
okta -> client: Access token (and optionally refresh token)
client -> app: Request with access token
app -> client: Response
@enduml

 -->

![Interaction Code flow sequence diagram](/img/authorization/interaction-code-grant-flow.png)
