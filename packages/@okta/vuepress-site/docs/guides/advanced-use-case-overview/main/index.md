---
title: Overview
---

<ApiLifecycle access="ie" /><br>

Okta's Embedded solutions support various architectures, use cases, and customization needs. These guides cover the more advanced use cases, where you may have specific requirements for your system architecture and overall user experience.

## Custom password recovery

Okta's embedded solutions allow you to customize your authentication use cases with full support for theming, branding, and extensive ways to control the user experience. The <StackSnippet snippet="customsspr" inline /> covers customizations for one particular use case, self-service password recovery, where an email authenticator is used to verify the user before they can reset their password.

## Email magic link

The Okta email authenticator supports two methods for users to validate their credentials. In both methods, Identity Engine sends an email to their primary email address, and either:

1. The user copies a One-Time Password (OTP) from the email to your application and submits it to Identity Engine for authentication.
1. The user clicks an embedded email link that submits the OTP directly to Identity Engine for authentication.

The <StackSnippet snippet="emloverview" inline /> demonstrates the difference between the two methods, and how to integrate EML into an application that uses the Embedded Sign-In Widget or a supported Embedded SDK.
