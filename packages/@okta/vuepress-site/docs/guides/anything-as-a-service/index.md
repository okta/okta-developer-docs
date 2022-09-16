---
title: Add an Anything-as-a-source custom client
meta:
  - name: description
    content: Anything-as-a-source custom client developer guide to synchronize any HR source with Okta user profiles.
---

This guide outlines how to develop a custom client to manage an identity source with Okta for the Anything-as-a-Source (XaaS) integration. The custom client can be a standalone app or a component of an existing app that drives the synchronization between the HR source (the identity source) and the Okta Universal Directory.

---

**Learning outcomes**

* Learn how to structure your custom client to manage a Custom Identity Source integration with Okta.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup/)
* Okta Developer Edition organization
* [A Custom Identity Source](https://okta.github.io/doc_reviews/en-us/Content/Topics/users-groups-profiles/usgp-anything-as-a-source.htm) integration configured in your Okta org
* [An Okta API token](https://developer.okta.com/docs/guides/create-an-api-token/main/) to make secure API calls
* An HR source from which you want to synchronize user data with Okta
* A custom client to add XaaS API integration

---

## Overview

The Okta Anything-as-a-Source (XaaS) solution provides your organization the ability to integrate any HR source into your Okta org. The HR source acts as a source-of-truth and users are pushed and mapped to Okta user profiles in the Okta Universal Directory. There are two methods to implement the XaaS integration:

* using Okta Workflows

or

* developing a custom client

With either method, you need to first define your HR source in your Okta org. This is referred to as the Custom Identity Source integration. Okta provides you with a Custom Identity Source unique identifier that you can use in your Okta Workflow or custom client to identify the HR source. See Configuration of a Custom Identity Source in  [Using anything as a source](https://help.okta.com/okta_help.htm?type=wf).

This guide outlines the XaaS API flow so that you can develop your custom client for the XaaS integration. For XaaS integrations using Okta Workflows, see [Okta Workflows](https://help.okta.com/okta_help.htm?type=wf).

To make secure API calls from your custom client, obtain an API token from Okta. See [Create an API token](https://developer.okta.com/docs/guides/create-an-api-token/main/).


