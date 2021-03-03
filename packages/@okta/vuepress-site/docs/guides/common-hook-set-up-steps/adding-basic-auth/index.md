---
title: Adding Basic Authorization and Body Parsing
---

The default, new Glitch projects do not have any authorization or body parsing code. To include this content:

* Add the Body Parser and Basic Auth `npm` packages to your Glitch project
* Add the code snippet below

If you copied a Glitch project (re-mixed it), the packages and code are already included.

To add the `npm` packages:

1. Click on the `package.json` file in the left-hand project menu.
2. From the `Add Package` drop-down, search for the `express-basic-auth` and `body-parser` packages.
3. Click each package to add to your project.

The Inline Hook examples use [HTTP Basic Authentication](/books/api-security/authn/api-authentication-options/#http-basic-authentication) to authenticate the Okta Inline Hook API calls by your Glitch external service. The user and password credential pair, stored in your Glitch application, must be encoded in Base64 and added as the Authentication secret when you activate the Inline Hook on your Okta org. Ensure you add the scheme `Basic` as a prefix to the authentication secret value.

For example, the credential pair used in the Inline Hook examples is `admin:supersecret`, which encoded in Base64 is `YWRtaW46c3VwZXJzZWNyZXQ= `. Adding the scheme to this value, creates the Inline Hook Authentication secret value: `Basic YWRtaW46c3VwZXJzZWNyZXQ=`.

After including the `npm` packages, above, add the following code snippet in your project.

<StackSelector snippet="auth"/>

<NextSectionLink/>
