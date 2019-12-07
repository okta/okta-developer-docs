---
title: Troubleshooting
---
If you don't see the consent prompt when expected:

* Verify that you haven't already provided consent for that combination of app and scope(s). Use the [`/grants` endpoint](/docs/reference/api/users/#list-grants) to see which grants have been given, and to revoke grants.
* Check the settings for `prompt`, `consent`, and `consent_method` in the [Apps API table of values](/docs/reference/api/apps/#add-oauth-20-client-application).
* Make sure that in your app configuration, the `redirect_uri` is an absolute URI and that it is whitelisted by specifying in Trusted Origins.
* If you aren't using the `default` authorization server, check that you've created at least one policy with one rule that applies to any scope or the scope(s) in your test.
