---
title: Overview
---

## What Is a Refresh Token?

A refresh token is a special token that is used to generate additional access tokens. This allows you to have short-lived access tokens without having to collect credentials every single time one expires. You request this token alongside the access and/or ID tokens as part of a user's initial authentication flow.

## Setting Up Your Application

Refresh tokens are available for a subset of Okta OAuth 2.0 Client Applications, specifically web or native applications. For more about creating an OpenID Connect application see our [OAuth 2.0 and OIDC overview](/docs/concepts/auth-overview/#recommended-flow-by-application-type).

After you have an application, you need to make sure that the "Allowed grant types" include "Refresh Token".

<NextSectionLink/>
