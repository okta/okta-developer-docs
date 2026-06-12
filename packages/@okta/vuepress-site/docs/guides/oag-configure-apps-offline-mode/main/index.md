---
title: Add an app for Access Gateway offline mode
meta:
  - name: description
    content: Learn how to create a SAML or OIDC app for use with Access Gateway offline mode.
layout: Guides
---

<ApiLifecycle access="ea" />

This guide explains how to create a <StackSnippet snippet="apptype" inline /> app for use with Access Gateway offline mode.

> **Note:** The Access Gateway APIs used in this guide are available in a Limited Early Access program and may be updated or changed based on feedback.

---

#### Learning outcomes

<StackSnippet snippet="learningoutcomes" />

#### What you need

* Offline mode configured for Access Gateway. See [Configure offline mode for Access Gateway](/docs/guides/oag-offline-mode/main/).
* An identity provider (IdP) in your Access Gateway instance with failover mode set to `AUTOMATIC`.
* <StackSnippet snippet="wun" />

---

## About offline mode apps

By default, apps behind Access Gateway require a connection to Okta to authenticate users. If Okta is unreachable, authentication fails and users can't access the app.

Offline mode apps are configured with a local directory as a fallback authentication source. When Access Gateway detects that Okta is unavailable, it switches to offline mode and authenticates users against the local directory instead. From the user's perspective, the sign-in flow looks the same regardless of whether Okta is reachable.

Offline mode apps require the authentication service and directory sync to be configured before you create the app. See [Configure offline mode for Access Gateway](/docs/guides/oag-offline-mode/main/).

## Overview

<StackSnippet snippet="overview" />

## What to know before creating the app

<StackSnippet snippet="requirements" />

## Create the app

<StackSnippet snippet="procedure" />

## See also

* [Configure offline mode for Access Gateway](/docs/guides/oag-offline-mode/main/)
* [Access Gateway API documentation](https://developer.okta.com/docs/api/openapi/oag/guides/overview)
* [Okta Access Gateway documentation](https://help.okta.com/okta_help.htm?type=oag&id=ext_oag_main)
