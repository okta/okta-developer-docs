#### Learning outcomes

Configure an IDV vendor so that your user’s identities are verified when they enroll a new authenticator.

> **Note:** This guide describes the process for setting up an IDV flow in a sandbox environment of a <StackSnippet snippet="idp" inline /> app. In a sandbox environment, there is no actual identity verification that verifies your user’s identities. You can use the same configuration process in a production environment in your <StackSnippet snippet="idp" inline /> app.

#### What you need

* [Okta Integrator Free Plan org](https://developer.okta.com/signup)
* An account with <StackSnippet snippet="idpaccount" inline /> with access to a sandbox environment
* A test [user account](https://help.okta.com/okta_help.htm?type=oie&id=ext-usgp-add-users) that you can use to enroll an authenticator
* A test [group](https://help.okta.com/okta_help.htm?type=oie&id=usgp-groups-create) in your org that the test user is added to
* A test [image](#test-image) to use as a proof of identity
