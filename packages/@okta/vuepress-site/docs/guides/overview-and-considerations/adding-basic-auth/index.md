---
title: Adding Basic Authorization
---

The Glitch projects do not have any authorization code by default. To include basic authorization:

* Add the Basic Auth npm package to your Glich project
* Add the Basic Auth code snippet below

To add the Basic Auth npm package:

1. Click on the package.json file in the left-hand project menu.
2. From the “Add Package” drop-down, search for “express-basic-auth" and click the package to add to your project.

After including the Basic Auth package, include the following code snippets in your project.

As part of the configuration process, you will add the authorization field and secret in your Okta org, which inputs this content into the Okta request header. The authorization and secret are authorized by your external service.

<StackSelector snippet="auth"/>