---
title: Implementing OAuth 2.0 Authentication
excerpt: How to implement an OAuth 2.0 flow in Okta
---

# Implementing OAuth 2.0 Authentication

This section covers the steps required to integrate an OAuth 2.0 authentication flow into your application, using Okta as your authorization server.

Before you can use OAuth 2.0 flows with Okta, you will need to configure an Authorization Server in Okta. If you have an Okta Developer Account, you already have a default Authorization Server created for you.

If you don't have an existing authorizations server, or would like to create a new one, then you can find out how to do that in the [Setting up an Authorization Server](set-up-authz-server) section.

Once you have an authorization server, you can then implement an OAuth 2.0 flow.

The table below shows you which OAuth 2.0 flow to use for the type of application that you are building. If you'd like more information on which flow to use, see [Choosing an OAuth 2.0 flow](/authentication-guide/auth-overview/#choosing-an-oauth-20-flow).


| Type of Application     | OAuth 2.0 Flow                                      |
| ----------------------- | --------------------------------------------------- |
| Server-side (AKA Web)   | [Authorization Code Flow](auth-code)                |
| Single-Page Application | [Implicit Flow](implicit)                           |
| Native                  | [Authorization Code Flow with PKCE](auth-code-pkce) |
| Trusted                 | [Resource Owner Password Flow](password)            |
| Service                 | [Client Credentials](client-creds)                  |
