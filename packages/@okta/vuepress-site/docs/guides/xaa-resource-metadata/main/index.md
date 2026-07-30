---
title: Expose XAA metadata for your resource app
excerpt: Expose XAA discovery metadata for your resource app
layout: Guides
---

Expose standard metadata so that requesting apps can discover information required to interact with your protected resource app and its authorization server for Cross App Access (XAA).

---

#### Learning outcomes

* Understand what’s required for two well-known discovery metadata URIs for your resource app and its authorization server:
  * Authorization server metadata discovery URI: .well-known/oauth-authorization-server
  * Protected resource metadata discovery URI: .well-known/oauth-protected-resource

#### What you need

* A resource app that provides an API server service
* An authorization server that protects your resource app and is configured to issue scoped access tokens for your app.

---

