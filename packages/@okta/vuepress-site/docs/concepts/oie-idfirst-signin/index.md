---
title: Okta Identity Engine identifier-first sign-in experience
description: Learn how Identity Engine recognizes a user before it selects the next authentication step.
---

# Okta Identity Engine identifier-first sign-in experience

Identity Engine introduces a sign-in pattern that many teams notice immediately after upgrading from Classic Engine.

Instead of asking for the username/password on one page, the sign-in flow can ask who you are first, and then decide how you prove it. This is the identifier-first sign-in pattern.

This guide explains what the identifier-first sign-in experience is. And then it defines what Identity Engine identifies first. And then defines how Identity Engine uses the identifier to choose the next authentication step and whether the behavior is required or configurable.

## A definition of the identifier-first sign-in experience

In a password-first experience, the Sign-In Widget shows the username field and the password field on the same page. The user supplies both at once. This is the traditional flow that Classic Engine uses.

In an identifier-first experience, the Sign-In Widget shows the username field first. The user enters an identifier, which is typically the full username (email), and continues. Identity Engine then presents the appropriate next step on a following page.

The difference isn't only visual. Asking for the identifier first lets Identity Engine make a runtime decision about how a specific user should authenticate before it prompts for any credential.

## How identifier-first works in Identity Engine

Identity Engine is an authentication pipeline. When a user starts a sign-in flow, Identity Engine evaluates the global session policy. It then evaluates the app sign-in policy, and other relevant policies, to determine what the user must do next. In an identifier-first experience, that evaluation happens after the identifier is known and before a credential is requested.

The sequence is similar to the following steps:

1. The user opens your sign-in page and the Sign-In Widget shows a username field.
2. The user enters an identifier and continues.
3. Identity Engine evaluates the applicable policies for that user and app.
4. Identity Engine presents the next step. For example: a password, a specific authenticator, a passwordless option, or a redirect to a federated identity provider

This step-by-step evaluation is the same idea that underpins the Identity Engine remediation model: a user can start a flow by entering only a username, which prompts Identity Engine to request whatever additional information the policies require next. Each step is decided at runtime, so the experience can differ by user, group, context, app, and available authenticators.

## What Identity Engine identifies first

The “identifier” is the value that the user enters to declare who they are. By default, this is the full username, which includes the domain. Orgs that enable multiple identifiers can let users enter an alternative configured identifier (such as s phone number) instead of the username.

Identifying the user first rather than collecting a password first is what makes the subsequent step adaptive. After Identity Engine knows the user, it can route them to the right authenticator or identity provider without assuming everyone authenticates the same way.

## Is identifier-first required or configurable?

The identifier-first sign-in experience is conditional and configurable, not mandatory and not universally on by default. Whether a user sees a password-first or an identifier-first experience depends on how the global session policy is configured:

* **Password-first experience:** If a global session policy rule establishes the user session with a password, the username and password appear on the same page. This is the Classic Engine-style experience.

* **Identifier-first experience:** If a global session policy rule establishes the user session with any authentication factor, the username prompt appears first. Accepted factors include passwords, identity providers, or any other factors allowed by app sign-in rules.

Because the behavior follows policy, an administrator can choose it. To keep (or return to) a single-page password-first experience, an org ensures that it doesn’t require a specific identity provider for authentication. It then sets all global session policy rules to establish the session with a password. Conversely, configuring the global session policy to accept any allowed factor produces the identifier-first experience.

## Why identifier-first matters

The identifier-first sign-in experience exists because modern customer authentication is no longer “everyone enters a password.” Different users may authenticate with a password, a passkey, an enterprise identity provider, or a passwordless factor. By learning who the user is before prompting for a credential, Identity Engine can provide these capabilities:

* Present only the authentication options that apply to that user.
* Route federated users to the correct identity provider instead of collecting an Okta password.
* Offer passwordless and passkey options where the policy allows them.
* Apply the right global session and app sign-in policy at runtime.

The result is a single sign-in entry point that adapts per user, rather than a fixed username-and-password form.

## How identifier-first supports passwordless, passkeys, and federated sign-in flows

Knowing the identifier first is what makes these patterns possible from one entry point:

* **Passwordless and passkeys:** After the identifier is known, Identity Engine can offer a passkey or other passwordless authenticator instead of a password when the sign-on policy allows it. When the policies permit a biometric authenticator, the identifier-first page can also surface an optimized Okta FastPass option alongside the username field.
* **Federated identity providers:** When the identifier indicates a user who should authenticate through an external identity provider, Identity Engine routes the user to that provider. No Okta credential prompt is required.
* **Adaptive authenticator selection:** On the step after the identifier, Identity Engine presents the primary authenticator options allowed by the combined global session and app sign-in policy.

In each case, the identifier is the signal that lets Identity Engine pick the right next step.

## How identifier-first differs from Classic Engine sign-in flows

| Aspect | Classic Engine | Identity Engine |
|--------|---|---|
| Credential collection | Username and password collected together on one page | Identifier collected first. Next step chosen afterward (when configured for identifier-first) |
| Who decides the next step | Largely fixed sign-in form | Policies evaluated at runtime after the identifier is known |
| Authenticator flexibility | Limited by Classic Engine patterns | Password, passwordless, passkeys, Okta FastPass, or federated routing based on policy |
| Configurability of the flow shape | N/A | Determined by the global session policy’s “establish the session with” setting |

The move to identifier-first reflects Identity Engine evaluating policy at runtime instead of presenting one static form to everyone.

## What the identifier-first sign-in experience doesn't cover

This concept covers how Identity Engine recognizes a user and selects the next step. The following topics are outside of the identifier-first scope:

* Step-by-step Admin Console configuration of policies or org security settings
* App code, SDK, or widget implementation
* Planning, testing, customizing, or communicating the sign-in UX change to end users
* Troubleshooting specific sign-in errors

## Related resources

* [How Identity Engine drives step-by-step remediation after the identifier is known](/docs/concepts/interaction-code/)
* [Where the sign-in experience is hosted](/docs/concepts/redirect-vs-embedded/)
* [The component that renders the identifier-first experience](/docs/concepts/sign-in-widget/)
* [Global session and app sign-in policies that determine the next step](/docs/concepts/policies/)
* [Admin-facing description of password-first and identifier-first flows](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-sign-in-flows)
