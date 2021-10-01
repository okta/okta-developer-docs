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

To enable a more customized user authentication experience, Okta has introduced an addition to the [OAuth 2.0 and OpenID Connect](/docs/concepts/oauth-openid) standard called the Interaction Code grant type. This grant type allows apps to manage user interaction with Okta without a browser. This is useful when the client has a particular way that it wants to interact with the user and doesn’t need to share an authenticated session with other applications.

The Interaction Code flow consists of a series of interactions between the user and an Okta org, facilitated by the client. Each interaction is called a remediation step and corresponds to a piece of user data required by the Okta org for authentication. The client obtains these remediation steps from the Identity Engine component of the Okta org and prompts the user for the required data to continue the flow. Each step of the remediation is a criteria of assurance for authenticating the user, and is evaluated at runtime based on predefined Okta org and application sign-on policies and rules. The number and nature of remediation steps are configurable in the policies with minimal disruption to the running application. This allows the authentication experience to differ based on user, group, context, application, available factors, and so on.

For example, a user could start an authentication flow by entering only a username, and this flow would prompt the client to request more information, or remediation, as required. Remediation is the direct communication between the client and the Identity Engine that can be achieved either without a browser redirect or with a browser redirect when the remediation transitions through a push authorization request. An example of a remediation step is the client prompting the user for a password or to add a second factor and then sending that information directly to the Identity Engine component of the Okta org for verification. Each form of remediation that the user must supply is dictated by the evaluated policies between the Okta org and the app. When the remediation steps are completed, the Identity Engine provides the client with an Interaction Code that is then used to exchange for tokens by an [Okta Authentication Server](/docs/concepts/auth-servers/), following [OAuth 2.0 and OpenID Connect](/docs/concepts/oauth-openid) standards.

The Interaction Code grant is intended for developers who want a step-by-step remediation user experience without redirecting to an authorization server. This grant type enables developers to include [Identity Engine features](https://help.okta.com/okta_help.htm?type=oie&id=ext-features) in their app, such as passwordless authentication and progressive profiling. The Interaction Code flow can use policy-driven remediation steps not only for authentication, but also for registration and account recovery. See [Redirect authentication vs. embedded authentication](/docs/concepts/redirect-vs-embedded/) for Identity Engine authentication deployment models and [Identity Engine deployment guides](/docs/guides/oie-intro/) for detailed deployment use cases.

## The Interaction Code flow

The Interaction Code flow is similar to the [OAuth 2.0 Authorization Code flow with PKCE](/docs/concepts/oauth-openid/#authorization-code-flow-with-pkce). All clients are required to pass along a client ID, as well as a Proof Key for Code Exchange (PKCE), to keep the flow secure. Confidential clients such as web apps must also pass a client secret in their authorization request. The user can start the authorization request with minimal information, relying on the client to facilitate the interactions with the Okta org to progressively authenticate the user. The series of interactions, which could include multifactor authentication steps, is secured using the `interaction_handle`. After successfully completing the remedial interactions, the client receives an `interaction_code` that they can then redeem for tokens from an Okta Authorization Server with the [`/token`](/docs/reference/api/oidc/#token) endpoint.

The Interaction Code flow is supported by Okta's two authorization server types: the [Org Authorization Server](/docs/concepts/auth-servers/#org-authorization-server) and [Custom Authorization Server](/docs/concepts/auth-servers/#custom-authorization-server). These Okta Authorization Servers must have the Interaction Code grant type configured in their Access Policy Rule to accept Interaction Code requests.

The following table describes the parameters introduced for the Interaction Code grant type flow:

| Interaction Code grant parameter           | Description   |
| --------------------------------           | -----------   |
| `interaction_code` |  The `interaction_code` is a one-time use, opaque code that the client can exchange for tokens using the Interaction Code grant type. This code enables a client to redeem a completed Identity Engine interaction for tokens without needing access to an authorization server’s session. |
| `interaction_handle` | The `interaction_handle` is an opaque, immutable value that is provided by an Okta Authorization Server. The client can use the `interaction_handle` to interact with the Identity Engine component of the Okta org directly. The client is responsible for saving the `interaction_handle` and using it to hold the state of the transaction during remediation. Any public/confidential client that is configured to use the Interaction Code grant type can obtain an `interaction_handle`. If all the remediation steps are successfully performed, an `interaction_code` is returned as part of the success response.            |

The following sequence of steps is a typical Interaction Code flow with the Identity Engine:

<!--
See http://www.plantuml.com/plantuml/uml/

@startuml
skinparam monochrome true
actor "Resource Owner (User)" as user
participant "Client" as client
participant "Authorization Server (Okta)" as okta
participant "Identity Engine (Okta)" as oie
participant "Resource Server (Your App)" as app

user -> client: Start auth with user info
client -> client: Generate PKCE code verifier & challenge
client -> okta: Authorization request w/ code_challenge, client ID, scopes, and user info
okta -> okta: Remediation required
okta -> client: Sends interaction_handle in response (for required interaction)
user <-> client: Remedial interaction
client <-> oie: Remedial interaction w/ interaction_handle
note right: Possible multiple remedial steps required
user <-> client: Remedial interaction
client -> oie: Remedial interaction w/ interaction_handle
oie -> oie: Remedial steps completed
oie -> client: Send interaction_code in response
client -> okta: Send interaction_code, client ID, code_verifier to /token
okta -> okta: Evaluates PKCE code
okta -> client: Access token (and optionally refresh token)
client -> app: Request with access token
app -> client: Response
@enduml

 -->

![Interaction Code flow sequence diagram](/img/authorization/interaction-code-grant-flow.png)

* The Interaction Code flow can start with minimal user information. For example, the user (resource owner) may only provide the client app with their username. Alternatively, the client can also begin the flow without any user information for a passwordless sign-in experience.

* The client app generates the PKCE code verifier & code challenge.

  > **Note:** To use the Interaction Code flow, both the client app and the Okta Authorization Server must have the Interaction Code grant type enabled in the Okta org.

* The client app begins interaction with an [Okta Authorization Server](/docs/concepts/auth-servers/) (Org or Custom), providing any context it may have, such as a login hint, as well as sending the code challenge in a request for authorization of certain scopes to the Okta Authorization Server.

  > **Note:** A confidential client authenticates with the Okta Authorization Server while a public client (like the Sign-In Widget) identifies itself to the Okta Authorization Server. Both must provide the PKCE code challenge.

* The Okta Authorization Server sends the `interaction_handle` parameter in the body of a response to the client app.

  > **Note:** The `interaction_handle` is used to continue the interaction directly with the Identity Engine. This is why the client, either confidential or public, needs to be registered with the Identity Engine to perform this direct interaction.

* The client sends the `interaction_handle` to the Identity Engine and in return, the Identity Engine sends any required remediation steps to the client. The client begins an interactive flow with the Identity Engine and the resource owner, handling any type of interaction required by the Identity Engine (the remedial information is provided by the user to the client).

* When the remediation steps are completed, the Identity Engine sends back a success response and includes the `interaction_code` to the client.

  > **Note:** The Interaction Code has a maximum lifetime of 60 seconds.

* The client sends the code verifier and the `interaction_code` to the Okta Authorization Server to exchange for tokens.

  > **Note:** The `interaction_code` indicates that the client (and user) went through all of the necessary interactions and received a successful response from Identity Engine.

* The Okta Authorization Server authenticates the client and validates the `interaction_code`. If the code is valid, the Authorization Server sends the tokens (access, ID, and/or refresh) that were initially requested.

* The client makes a request with the access token to your app.

* Your app sends a response to the client.
