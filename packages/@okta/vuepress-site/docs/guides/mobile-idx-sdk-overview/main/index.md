---
title: Overview of the mobile Identity Engine SDK
---

Design the implementation of the sign-in flow for your mobile app by understanding the representation of the flow and the associated objects.

<ApiLifecycle access="ie" /><br>

## Introduction

Integrate the Okta sign-in flow into your app in one of two ways:

- Redirect the request to Okta which handles the flow in its own window (the redirect model).
- Handle each step in the flow by building the appropriate user interface elements, capturing the information, and updating Okta (the embedded model).

This guide is an overview of building your own user interface using the embedded model. For information on the redirect model, see <StackSnippet snippet="redirectquickstart" inline />.

## Sign-in flow

Okta supports many ways of authenticating the identity of a user during the sign-in flow. An Okta org administrator creates _policies_, different mixes of *authenticators*, or ways of verifying the identity of a user, and assigns them to apps, people, groups, and more. Policies also configure whether an authenticator is required or optional, as well as the minimum number of authenticators required for a successful sign-on. Many flows require multiple *factors* (multifactor authentication), the category of an authenticator. Factors include biometrics, such as a fingerprint, knowledge, such as a password, and more. This results in a many of possible combinations of the different authenticators, the steps in the sign-in flow.

The Android and iOS Identity Engine SDKs represent the sign-in flow as a state machine. You initialize the machine with the details of your Okta org app integration, request the initial step in the flow, and cycle through responding to steps until either the user signs in, cancels, or an error occurs.

<div class="three-quarter">

!["A diagram that shows the steps in a sign-in flow for a mobile app."](/img/mobile-sdk/mobile-idx-basic-flow.png)

</div>

Each sign-in step may include one or more possible user actions, such as:

- Choosing an authenticator, such as Okta Verify or security questions.
- Entering an OTP.
- Cancelling the sign-in flow.

## Sign-in objects

The SDK represents the sign-in flow using a number of different objects:

<div class="full">

!["A diagram that shows the SDK objects for the sign-in flow and the relationships between them."](/img/mobile-sdk/mobile-idx-basic-objects.png)

</div>

- **Response:** The top-level object that represents a step and contains all the other objects. It includes a property that indicates a successful sign-in and functions for cancelling the sign-in flow, or retrieving the access token after the sign-in flow succeeds. A response may contain multiple authenticators and remediations.
- **Remediation:** Represents the main user actions for a step, such as enrolling in an authenticator or entering an OTP. It includes a function for requesting the next step in the flow.
- **Authenticator:** Represents an authenticator that's used to verify the identity of a user, such as Okta Verify.
- **Method:** Represents a channel for an authenticator, such as using SMS or voice for an authenticator that uses a phone. An authenticator may have zero or more.
- **Capability:** A user action associated with a remediation, authenticator, or method, such as requesting a new OTP or a password reset.
- **Field:** Represents a UI element, either a static item, such as a label, or user input, such as a selection list. It includes properties for state information, such as whether the associated value is required. Properties also store the current value of user input field, such as the string for an OTP or the selected choice. Options, or lists of choices, are represented by a collection of fields. A field may contain a form that contains more fields.
- **Form:** Contains the fields that represent the user action for a remediation.
- **Configuration:** Contains the settings used by the SDK to connect to your Okta org app integration.
- **Client:** Represents the session during the sign-in flow.


## Objects and the flow

<div class="three-quarter">

!["A diagram that shows the main objects associated with each step in the sign-in flow."](/img/mobile-sdk/mobile-idx-objects-and-flow.png)

</div>

The main objects associated with each step in the flow are:

| Sign-in step                       | Objects                         |
| :--------------------------------- | :------------------------------ |
| Initialize SDK                     | Configuration <br/> Client      |
| Request initial step               | Client                          |
| Receive step                       | Response                        |
| Check completion, cancel, or error | Response <br/> Remediation      |
| Gather user input                  | Remediation <br/> Authenticator |
| Send input                         | Remediation                     |
| Done                               | Response                        |


## Common parts of the flow

Some parts of the sign-in flow are the same:

- Add the SDK to your app.
- Configure the SDK.
- Initialize the client and start the flow.
- Process the response.
- Request a token.
- Sign the user out.

### Add the SDK

<StackSnippet snippet="adddependency" />

### Create and manage configurations

The values for a configuration object are:

| Value         | Description |
| :------------ | :---------- |
| Issuer        | The OAuth 2.0 URL for the Okta org, such as `https://oie-123456.oktapreview.com/oauth2/default`. |
| Client ID     | The ID of the Okta app integration from the Okta Admin Console.  |
| Redirect URI  | A callback URI for launching the mobile app, such as `com.example.oie-123456:/callback`. |
| Scopes        | A space separated list of the requested access scopes for the app. For more information, see [Scopes in OpenID Connect & OAuth 2.0 API](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/overview/#scopes).|

The configuration information in a shipping app is usually static. You can initialize the configuration values directly in the code or read them from a file. During development you may want to provide a way to edit configuration values.

<StackSnippet snippet="loadingaconfiguration" />

### Start sign-in

Start the sign-in flow by creating an SDK client, and then requesting the first step.

<StackSnippet snippet="initializingsdksession" />

### Process the response

The steps for processing a response are:

1. Check for a successful sign-in flow.
1. Check for messages, such as an invalid password.
1. Check for remediations.
1. Process the remediations.
1. Process the authenticators.

After the user enters the required information, update the remediation and request the next step.

<StackSnippet snippet="processresponse" />

### Complete the sign-in flow

Check for a successful completion of the sign-in flow at each step, and in the case of success, exchange the remediation for an access token and exit the flow.

<StackSnippet snippet="gettingatoken" />

### Sign out a user

Sign out a user by revoking the access token granted when the user signed in, and by revoking a refresh token if one exists.

<StackSnippet snippet="signingout" />

## Sign-in flow UI

There are two general approaches for adding the sign-in flow to your app: add a fixed number of authentication methods, possibly in a fixed order, or generate the user interface dynamically based on the response at each step.

For a fixed number of methods (a static UI), you create appropriate views and populate them from the response. Using a static UI introduces risk as both the authentication methods and the order may be changed at any time by an administrator of your Okta org. There are three requirements to reduce that risk:

- Update the code in the app before policy changes are enabled.
- Distribute the updated app to users before the policy changes are enabled.
- Ensure all your users' devices use the updated.

The usual way to satisfy the last condition is with an enterprise-managed workforce app. Also note that there's additional risks as external events may require an immediate policy change that can result in the inability of mobile users to sign in.

For consumer apps, and to reduce the risk for enterprise apps, a safer choice is building the user interface from the current sign-in step, by presenting a dynamic UI.

For an example of implementing a dynamic UI, see <StackSnippet snippet="dynamicuisample" inline />.
