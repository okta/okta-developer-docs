---
title: Enable Express Configuration
meta:
  - name: description
    content: Use this guide to enable Express Configuration for your Auth0-enabled OIN integration.
layout: Guides
---
<ApiLifecycle access="ie" />

This guide walks you through how to enable Express Configuration for your Auth0-enabled <StackSnippet snippet="protocol-name" inline/> OIN integration.

**Learning outcome**

* Understand how to enable Express Configuration for an Auth0-enabled <StackSnippet snippet="protocol-name" inline/> OIN integration.
* Verify and test the Express Configuration setup to ensure successful integration.

**What you need**

* An Okta Integrator Free Plan org
* An admin user in the org with either the super admin or the app and org admin roles
* Auth0-enabled SaaS app that supports OIDC capability
* Auth0 Enterprise subscription with the [Auth0 Organizations](https://auth0.com/docs/manage-users/organizations) feature enabled
* Auth0 [Command Line Interface](https://auth0.github.io/auth0-cli/)(CLI) permission

<StackSnippet snippet="notes" />

## Authenticate with Auth0 CLI

To enable Express Configuration, your first step is to [Authenticate with the Auth0 CLI](https://auth0.github.io/auth0-cli/auth0_login.html) to establish a connection between your app environment and your Auth0 tenant. Run the following command to authenticate with the Auth0 CLI with the appropriate scopes.

<StackSnippet snippet="authenticate-cli" />

<StackSnippet snippet="create-resource-server" />

## Configure roles and permissions

Follow these steps to configure the roles and permissions required for managing Express Configuration.

<StackSnippet snippet="create-role" />

### Assign permissions to the role

<StackSnippet snippet="assign-permission" />

### Create and assign Client Credentials

<StackSnippet snippet="create-client" />

### Assign Client Credentials to the Okta OIN Integration Client

Use the Client Credentials that you create in this step to authorize the `Okta OIN Integration Client` to access the Auth0 Management API with defined scopes. The OIN can use the token that's returned to create and manage connections on behalf of the orgs. The scopes (`create:connection`, `update:connection`, and so on) securely allows your Auth0 tenant's Management API to create and update [Okta Workforce connections](https://auth0.com/docs/authenticate/identity-providers/enterprise-identity-providers/okta).

<StackSnippet snippet="assign-client-grant" />

<StackSnippet snippet="actions-and-tenant-setting" />

<StackSnippet snippet="update-oin-submission" />

## Email the Okta Express Configuration team

Email the following information to the Okta Express Configuration team at [expressconfig@okta.com](mailto:expressconfig@okta.com):

* Confirmation that you completed all the steps in this guide and that your app is ready to support Express Configuration.
* Your app name in the OIN
* Okta OIN Integration Client app client ID

The Okta Express Configuration team configures your app in the OIN and then assigns it to your Integrator Free Plan org.

You can test the feature by creating an instance of your app in the OIN catalog.

# Verification and testing

Follow these steps to verify and test the Express Configuration feature:

1. Sign in to your [org](/login/) as a user with either the super admin (`SUPER_ADMIN`) role, or the app (`APP_ADMIN`) and org (`ORG_ADMIN`) admin [roles](https://developer.okta.com/docs/api/openapi/okta-management/guides/roles/#standard-roles).
1. Go to **Applications** > **Applications** in the Admin Console.

<StackSnippet snippet="verify-express-configuration" />

## Additional information

Admins use Express Configuration to set up <StackSnippet snippet="protocol-name" inline/> for an instance of your app in Okta. During this process, the following default configurations are applied to the newly created Okta Workforce Connection in Auth0.
<StackSnippet snippet="additional-info" />
