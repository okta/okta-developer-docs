---
title: Adding Basic Authorization and Body Parsing
---

The Glitch projects do not have any authorization or body parsing code by default. To include this content:

* Add the Body Parser and Basic Auth `npm` packages to your Glich project
* Add the code snippet below

To add the `npm` packages:

1. Click on the package.json file in the left-hand project menu.
2. From the “Add Package” drop-down, search for `express-basic-auth` and `body-parser` packages.
3. Click each package to add to your project.

After including the packages, add the following code snippet in your project.

As part of the configuration process, you add the authorization field and secret in your Okta org, which inputs this content into the Okta request header. The authorization and secret are authorized by your external service.

<StackSelector snippet="auth"/>