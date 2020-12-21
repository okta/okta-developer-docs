---
title: Sign users in without redirection
---

This guide shows you how to use Okta as the user store for your web application and sign users in using the interact code grant type.

> **Note:** This functionality requires the usage of the Okta Identity Engine. This functionality is in general availability but is being gradually rolled out to customers. If you want to request to gain access to the Okta Identity Engine, please reach out to your account manager. If you do not have an account manager, please reach out to <oie@okta.com> for more information.

#### Interaction Code overview

To enable a more customized user authentication experience, Okta has introduced an addition to the OIDC standard, called the "Interaction Code" grant type. This grant type allows Web Apps and SPAs to manage the user interaction with the Okta authorization server directly, rather than redirecting to the authorization server. This is useful when the client has a particular way that it wants to interact with the user and does not need to share an authenticated session with other applications. This interaction flow consists of a series of "remediation" steps, each of which corresponds to a required piece of user data.

For example, a user could start an authentication flow by entering only a username, and this flow would  prompt the client to request more information, or "remediation", as required. An example of remediation step is prompting the user for a password or to add a second factor. Remediation allows the client to kick off authentication requests from users with no prior data entered, and to respond to those requests with a back-and-forth interaction flow.

The Interaction Code grant is intended for developers who want a step-by-step remediation user experience without redirecting to an authorization server. Customers using SPAs should use the [Sign-in Widget](/docs/guides/migrate-to-oie/), while those with Web Apps should use one of our [IDX SDKs](/docs/guides/sign-into-web-app-remediation/go/next-steps/#sdks). All clients are required to pass along a Client ID, as well as a Proof Key for Code Exchange (PKCE) to keep the flow secure. Confidential clients such as web apps must also pass a Client Secret in their token request.

The Interaction Code flow starts when the client makes a request to the Okta authorization server. The authorization server then responds with an Interaction Handle, which the client passes on to the Okta Identity Engine. The Identity Engine responds with one or more remediation requirements that the client should act on and return the result to the Okta Identity Engine. Once the remediation requirements have been fulfilled, the Identity Engine returns a short-lived, one-time Interaction Code, which the client passes to the authorization server. The authorization server then responds with the requested tokens.

![Interact Code Flow](/img/oauth_interact_code_flow.png "Flowchart that displays the back and forth between the resource owner, authorization server, and resource server for Auth Code Flow with PKCE")

<!--
@startuml
skinparam monochrome true

actor "Resource Owner (User)" as user
participant "Client" as client
participant "Authorization Server (Okta)" as okta
participant "Resource Server (Your App)" as app
participant "Okta Identity Engine" as oie

user -> client: (Optional) Login hint
client -> client: Generate PKCE code verifier & challenge
client -> okta: Access token request + code_challenge
okta -> okta: Remediation required
okta -> client: Success response with interaction_handle
client -> oie: Interaction Handle
oie -> client: Remediation steps
client <-> user: Remediation
client -> oie: Completed remediation steps
oie -> client: Success result with Interaction Code
client -> okta: Interaction Code
okta -> client: Success response with access token
client -> app: Request with access token
app -> client: Response
@enduml
-->

#### Get started

If you are building a single-page (browser) app, we recommend that you use the Okta Sign-In Widget. See [our Sign-In Widget OIE migration guide](/docs/guides/migrate-to-oie/).

This guide assumes that you:

* Have Okta Identity Engine enabled for your org. If you'd like to get it enabled, please contact your account manager. If you do not have an account manager, please reach out to <oie@okta.com> for more information.
* Know the basics of building web applications.
* Have a project or application that you want to add authentication to.
* Are building a web app that's rendered by a server.

If you don't have an existing app, or are new to building apps, start with this documentation:

<StackSelector snippet="create-app"/>

#### Support

If you need help or have an issue, please [contact Support](https://support.okta.com/help/s/opencase).

<NextSectionLink/>
