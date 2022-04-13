---
title: Overview of the mobile Identity Engine SDK
---

<!-- <div class="oie-embedded-sdk"> -->

<ApiLifecycle access="ie" /><br>

**TODO** Abstract goes here

## Introduction

Integrate the Okta sign-in flow into your app in one of two ways: redirect the request to Okta which handles the flow in it's own window, or handle each step in the flow by building the appropriate user interface elements, capturing the information, and updating Okta.

This guide covers the second case. For information on the redirect model, see the quickstart for [Android](/docs/guides/sign-into-mobile-app-redirect/android/main/) or [iOS](/docs/guides/sign-into-mobile-app-redirect/ios/main/).

## Sign-in flow

Okta supports many ways of authenticating the identity of a user during sign-in. An Okta org administrator creates *policies*, different mixes of authentication methods (also called factors), and assigns them to apps, people, groups, and more. Policies also configure how many authentication methods are required (multifactor), and which methods are optional. This results in a large number of possible combinations for the different factors and steps to complete the sign-in flow.

The Android and iOS Identity Engine SDKs represent the sign-in flow as a state machine. You initialize the machine with the details of your Okta Application Integration, request the initial step in the flow, and cycle through responding to steps until either the user is signed in, cancels, or an error occurs.

<div class="common-image-format">

![A diagram showing the sign-in flow.](/img/mobile-sdk/mobile-idx-basic-flow.png "A diagram that shows the sign-in flow.")

</div>

Each sign-in step may contain one or more *remediations*, or possible user actions. Some examples of remediations are:
- Choosing an authenticator, such as Okta Verify or WebAuthN
- Entering a One Time Passcode (OTP)
- Cancelling the sign-in

## Sign-in objects

Each step in the flow is represented by a *Response* which contains the information used for creating the UI, general state information. The response is also used to cancel the sign-in or retrieve the token after the sign-in succeeds.

The UI information is divided between two objects in the response. An *Authenticator* represents a type, or factor for verifying the identity of a user, such as a username and password, or Okta Verify. A *Method* represents a channel for an Authenticator, such as using email or SMS for an OTP. An authenticator may have multiple methods. A *Remediation* represents a user action and usually contains most of the information for a step. Each response may contain multiple remediations and authenticators.

Some common types of user action are represented by a *Capability*. These include requesting a new OTP, or a password reset request. Remediations, authenticators, and methods may contain capabilities.

A *Form* inside the remediation represents the user action in a collection of *Fields*. Most fields represent something that's displayed in the UI, either a static element or a user input, such as a selection list. The field also contains state information, such as whether the associated value is required or secret. Options, or lists of choices, are represented by a collection of fields. A field may also contain a form which contains more fields.

<div class="common-image-format">

![A diagram showing the SDK objects and their relationships.](/img/mobile-sdk/mobile-idx-objects.png "A diagram that shows the SDK objects for the sign in flow and the relationships between them.")

</div>

## Common parts of the flow

Some parts of the sign-in flow are the same:
- Configure the SDK
- Initialize the client and start the flow
- Request a token
- Show a fatal error
- Sign-out the user


### Create and manage configurations

A *configuration* contains the settings used by the SDK to connect to the Okta Application Integration:

| Value         | Description  |
|:--------------|:----------|
| Issuer        | The Oauth2 URL for the Okta Org, such as `https://oie-123456.oktapreview.com/oauth2/default`. |
| Client ID     | The ID of the Okta Application Integration. |
| Client secret | An optional shared secret for accessing the Application Integration. |
| Redirect URI  | A callback URL for launching the app, such as `com.example.oie-123456:/callback`.|
| Scopes        | A space separated list of the requested access scopes for the app. |


<StackSnippet snippet="loadingaconfiguration" />

<!-- ANDROID: load from code, see the dynamic-app for an exmaple -->
<!-- iOS: using the plist (configuring and loading from), load from code -->

### Start sign-in

Start the sign-in flow by first creating an SDK client using a configuration, and then requesting the first step.


<StackSnippet snippet="initializingsdksession" />

<!-- ANDROID: See dynamic app for an example -->
<!-- iOS: see my sample code -->


### Completing sign in


Check the response for a successful sign-in at each step of the flow. On a success, exchange the session token for an authorization token.

<StackSnippet snippet="gettingatoken" />

Any call to process a step may result in a fatal error. When one occurs, inform the user and finish the sign-in attempt.

<StackSnippet snippet="signinerror" />


### Sign out a user

Sign out a user by revoking the access and refresh tokens.

<StackSnippet snippet="signingout" />


## Sign-in flow UI

There are two general approaches for adding the sign-in flow to your app: add a fixed number of authentication methods possibly in a fixed order, or generate the user interface dynamically based on the response at each step.

For a fixed number of methods, you create appropriate views and populate them from the response. Using fixed methods does introduce risk as authentication methods may be added or removed by the Okta administrator. There are three requirements to reduce that risk:
- The code in the app can be updated before policy changes are enabled.
- The updated app can be distributed to users before the policy changes are enabled.
- You can ensure that the app is updated on all your users' devices.

The usual way to satisfy the last condition is with an enterprise managed workforce app. Also note that there's additional risk as external events may require an immediate policy change that can result in the inability of mobile users to sign-in.

For consumer apps, and to reduce the risk for enterprise apps, a safer choice is building the user interface from the current sign-on step, of presenting a dynamic UI.


<!--
## Process a response

Start each new step by checking the response for a successful login unless an error stops the sign-in. Next process each remediation. In general, the first remediation is the main action, such as enrolling in an authenticator. Other remediations represent optional actions, such as selecting a different authenticator for enrollment. During the flow, there's usually a remediation for cancelling the sign-in attempt.

Messages in a remediation usually indicate a non-fatal issue, such as an incorrect username or password. Display the messages as appropriate.

The type of remediation
capabilities
authenticators
fields
	label
	type - set value or look at options for the choices
	?mutable?
	required
	secret
-->


