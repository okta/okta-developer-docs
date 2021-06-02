---
title: Implement Authorization flow
---

Select the Authorization grant type flow to implement: [Stack selector for:]
* Authorization Code
* Authorization Code with PKCE
* Implicit (Hybrid)
* Client Credentials
* Resource Owner Password

### Overview

- Overview stack selector for grant type description
When do we use this type of grant? (which sign-on method and app type, service?)

<StackSnippet snippet="overview" />

### Prerequisites

- Prerequisite stack selector for grant type description and prerequisites

### Grant Type Flow

Sequence diagram stack selector for:

* Authorization Code
* Implicit
* Authorization Code with PKCE
* Client Credentials
* Resource Owner Password

<StackSnippet snippet="use-flow" />

### Set up your app

- Link to App Wizard for instructions to create an app.

<StackSnippet snippet="setup-app" />

- Stack selector for App Wizard settings

| Parameter | Description        |
| --------- | ----------- |
| Sign-on method  | xxx |
| App type  | xxx |
| Grant type | xxx |
| Sign-in redirect URIs | xxx |


### Install an Okta SDK

- stack selector for which SDK you can use for the grant type
- this could be links to other actions from the Sign-in guides

### Redirect to Auth Server for code

- stack selector for info on how to implement redirect to auth server for code
- this could be links to other actions from the Sign-in guides

### Exchange authorization code for token

- stack selector for info on how to implement redirect to auth server for token, if required
- this could be links to the Sign-in guides

### Scopes

- stack selector for scope instructions, if required

### Get access token

- stack selector for get access token instructions, if required

### Next steps

Now that you have implemented your Authentication flow, you can add features such as

* Self-service enrollment
* MFA
* Authentication recovery
* Progressive profiling
