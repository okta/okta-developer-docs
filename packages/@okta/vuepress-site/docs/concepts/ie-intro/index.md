---
title: Identity engine
meta:
  - name: description
    content: Identity engine offers customizable building blocks that can support dynamic, app-based user journeys. Find out more about Identity engine, why you would use it, and how to upgrade your org.
---

# Identity engine

## About Identity engine

Identity engine allows organizations to customize their Okta cloud components to satisfy an unlimited number of identity use cases. Instead of a reliance on pre-defined behavior for authentication, authorization, and enrollment, Identity engine offers customizable building blocks that can support dynamic, app-based user journeys.

Identity engine provides greater fine-grained control when compared to traditional access flows. It enforces custom requirements at every point in the end user's sign-in experience &mdash; from registration and authentication to enrollment and authorization.

Using the Admin Console, you can direct the user experience based on user type, group membership, and target application. Since Identity engine can execute Okta Hooks or redirect to external services, you can also extend that experience further within the security guardrails of Okta.

## Why use Identity engine?

Identity engine is built around three major tenets:

* Passwordless authentication

  Admins can enable the email authenticator now with the addition of a magic link in the email notification sent to end users. When policies are configured to include non-password authenticators, end users may sign in to their account using factors that do not require use of a password. For more information, see [Configure passwordless authentication with email magic link](https://help.okta.com/en/oie/Content/Topics/identity-engine/procedures/configure-passwordless-auth.htm).

* Progressive Profiling

  Update an existing user's profile by prompting them for additional sign-in information when they advance to designated points. For more information, see [Create a Profile Enrollment policy for progressive profiling](https://help.okta.com/en/oie/Content/Topics/identity-engine/policies/create-profile-enrollment-policy-pp.htm).

* App-level policies

  App sign-on policies define the full requirements for an app. Admins can configure Okta Sign-on policies to use App-level policies instead &mdash; making it easier to manage your apps. For more information, see [App sign-on policies](https://help.okta.com/en/oie/Content/Topics/identity-engine/policies/about-app-sign-on-policies.htm).

## New concepts and terminology

Identity engine introduces new concepts and terminology.

* Assurance

  Assurance is the degree of confidence that an end user signing in to an application is the same end user who previously signed in to the application, and the use of one or more authenticators (see below) and its characteristics determine an assurance level. For example, an end user who authenticates with a knowledge factor and a possession factor has a higher assurance level than one who can only authenticate with one factor.

  Assurance is enforced by sign-on policies. OIE requires that the assurance specified in the Okta and app sign-on policies are satisfied before it allows the end user to access an app. This is a change from the traditional model of authentication, which evaluates one policy depending on whether the user signs in to the org or directly through the app.

* Authenticators

  Authenticators are credentials owned or controlled by an end user which can be verified by an application or service. Passwords, answers to security questions, phones (SMS or voice), and authentication apps like Okta Verify are examples of authenticators.

* Factor Types

  Okta is changing its definition of authenticators and factors in order to provide an industry-standard differentiation:

  * Factors are different categories that define how authentication takes place and the means in which they are controlled by end users.
  * Authenticators are used to verify one or more multiple factors such as Knowledge (for example, passwords and security questions), Possession (for example, Email, SMS, Okta Verify, and hardware tokens), and Inherence/Biometrics (for example, fingerprints and facial recognition).
  * A sign-on policy with two-factor authentication requires two distinct factors. Two authenticators of the same factor (Knowledge, Possession, or Inherence) will not be accepted.

* Okta sign-on policies

  Okta sign-on policies are globally applied to all applications in the tenant, and specify actions to take, such as allowing access, prompting for a challenge, setting the time before prompting for another challenge, and expiring a session. For more information, see [Okta sign-on policies](https://help.okta.com/en/oie/Content/Topics/identity-engine/policies/about-okta-sign-on-policies.htm).

* App sign-on policies

  App sign-on policies enforce authentication when an end user attempts to access an application. Each application is assigned one app sign-on policy (with multiple rules that may be ordered). For more information, see [App sign-on policies](https://help.okta.com/en/oie/Content/Topics/identity-engine/policies/about-app-sign-on-policies.htm).

## Enable Identity engine for your organization

To upgrade to Identity engine, please reach out to your account manager. If you do not have an account manager, please reach out to oie@okta.com for more information.

* The v1 API will continue to work as before until you're ready to use new Identity engine functionality.
* The existing Okta-hosted widget will continue to work after upgrading your org.
* Upgrade your SDK as you would normally do with other SDK updates.
