---
title: Configure Single Logout
excerpt: Configure Single Logout for your apps or identity providers.
layout: Guides
---

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="ea" />

This guide discusses how to configure the Single Logout (SLO) feature for your <StackSnippet snippet="aori" inline />.

---

#### Learning outcome

Understand the purpose of Single Logout (SLO) and set it up for your <StackSnippet snippet="aori" inline />.

#### What you need

* [Okta Integrator Free Plan org](https://developer.okta.com/signup)
* Existing <StackSnippet snippet="appidp" inline /> to update for SLO. See <StackSnippet snippet="appidp" inline /> if you don’t have one configured.
* <StackSnippet snippet="feature" inline />.

---

## Overview

<StackSnippet snippet="overview" />

### <StackSnippet snippet="sloorsloidp" inline /> diagram



## Configure <StackSnippet snippet="sloorsloidp" inline />

<StackSnippet snippet="intro" />

<StackSnippet snippet="updateapporidp" />

## Events

After Okta initiates the outbound logout request to <StackSnippet snippet="downup" inline />, Okta includes the number of OIDC and SAML app logouts that occurred with SLO. Those numbers are found in the System Log event `user.session.end` under `DebugData`:

* `TotalOidcLogoutRequests`: Lists the total number of logout requests for OIDC apps
* `TotalSamlLogoutRequests`: Lists the total number of logout requests for SAML apps

## See also

* Okta developer blog that explains an [inbound single logout request using Spring Boot for an OIDC app](https://developer.okta.com/blog/2020/03/27/spring-oidc-logout-options)
* Spring Boot offers a [Spring Security SAML Extension](https://docs.spring.io/spring-security-saml/docs/current/reference/htmlsingle/#configuration-logout-global) that's configured for global logout.
