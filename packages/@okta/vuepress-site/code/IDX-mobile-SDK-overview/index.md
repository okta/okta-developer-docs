---
title: Overview of the mobile Identity Engine SDK
integration: mobile
meta:
  - name: description
    content: Understand how the mobile IDX SDK... **TODO**
---

**TODO** Abstract goes here

## Introduction

Integrate the Okta sign-in flow into your app in one of two ways: redirect the request to Okta which handles the flow in it's own window, or handle each step in the flow by building the appropriate user interface elements, capturing the information, and updating the Okta.

This guide covers the second case. For information on the redirect model, see the quickstart for [Android](/docs/guides/sign-into-mobile-app-redirect/android/main/) or [iOS](/docs/guides/sign-into-mobile-app-redirect/ios/main/).

## Sign-in flow

Okta supports many ways of authenticating the identity of a user during sign-in. An Okta org administrator creates *policies*, different mixes of authentication methods (also called factors), and assigns them to apps, people, groups, and more. Policies also configure how many authentications methods are required (multifactor), and which methods are optional. This results in a large number of possible combinations of different steps to complete the sign-in flow.

The Android and iOS Identity Engine SDKs represent the sign-in flow as a state machine. You initialize the machine with the details of your Okta Application Integration, request the initial step in the flow, and cycle through responding to steps until either the user is signed in, cancels, or an error occurs.

<div class="common-image-format">

![A diagram showing the sign-in flow.](/img/sdk/mobile-idx-basic-flow.png "A diagram that shows the sign-in flow.")

</div>

Each sign-in step may contain one or more *remediations*, the different user actions that are possible. Some examples of remediations are:
- Choosing an authenticator, such as Okta Verify or WebAuthN
- Entering a One Time Passcode (OTP)
- Cancelling the sign-in

### Dynamic UI

There are two approaches to adding the sign-in flow to an app: add a fixed number of authentication methods possibly in a fixed order, or generate the user interface dynamically based on the response at each step of the sign-in flow.

Three conditions are required for using fixed methods:
- The code in the app can be updated before policy changes are enabled.
- The updated app can be distributed to users before the policy changes are enabled.
- You can ensure that the app is updated on all your users' devices.

The usual way to satisfy the last condition is with a workforce app that's managed by the enterprise. Also note that there's additional risk as external events may require an immediate policy change that can result in the inability of mobile users to sign-in.

For consumer apps, and to reduce the risk for enterprise apps, a safer choice is building the user interface from the current sign-on step, of presenting a dynamic UI.

## Sign-in objects

Each step in the flow is represented by a *Response* which contains the information used to create the UI, general state information, and is used to cancel the sign-in or retrieve the token after sign-in succeeds. 

The UI information is divided between two objects in the response. An *Authenticator* represents a type, or factor for verifying the identity of a user, such as a username and password, or Okta Verify. A *Method* represents a channel for using or enrolling in an Authenticator, such as using email or SMS for an OTP. An Authenticator may have multiple methods. A *Remediation* represents a user action and usually contains most of the information for a step.

Each response may contain multiple remediations and authenticators.

Some common types of user action are represented by a *Capability*. These include requesting a new OTP, or a password reset request. Remediations, authenticators, and methods may contain capabilities.

A *Form* inside the remediation represents the user action in a collection of *Fields*. Most fields represent something that's displayed in the UI, either a static element or a user input, such as a selection list. The field also contains state information, such as whether the associated value is secret, such as a password. Options, or lists of choices, are represented by a collection of fields. A Field may also contain an form.

<div class="common-image-format">

![A diagram showing the SDK objects and their relationships.](/img/sdk/mobile-idx-objects.png "A diagram that shows the SDK objects for the sign in flow and the relationships between them.")

</div>


## Start sign-in

(initializing the client from a configuration and requesting the first remediation)


## Process sign-in steps


(The main sign-in flow. Creating the dynamic UI from the server response (this is light content in phase 1). Handing polling, messages, and errors.)


## Completing sign-in

(success, error)	