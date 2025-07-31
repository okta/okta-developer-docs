---
title: Enable Express Configuration
meta:
  - name: description
    content: Use this guide to enable Express Configuration for your Auth0-enabled <StackSnippet snippet="protocol-name" inline/> OIN integration.
layout: Guides
---
<ApiLifecycle access="ie" />

# Enable Express Configuration

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

> **Notes:** Ensure that you first complete the [Express Configuration for OIDC integration](https://developer.okta.com/docs/guides/enable-express-configuration/main/) before proceeding with the steps in this guide.

## Authenticate with Auth0 CLI

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

# Verification and testing

Follow these steps to verify and test the Express Configuration feature:

1. Sign in to your [org](/login/) as a user with either the super admin (`SUPER_ADMIN`) role, or the app (`APP_ADMIN`) and org (`ORG_ADMIN`) admin [roles](https://developer.okta.com/docs/api/openapi/okta-management/guides/roles/#standard-roles).
1. Go to **Applications** > **Applications** in the Admin Console.
<StackSnippet snippet="verify-express-configuration" />

<StackSnippet snippet="additional-info" />