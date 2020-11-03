---
title: Troubleshooting
---
If you don't see the consent prompt when expected:

* Verify that you haven't already provided consent for that combination of app and scope(s). Use the [`/grants` endpoint](/docs/reference/api/users/#list-grants) to see which grants have been given and to revoke grants.
* Check the settings for `prompt`, `consent`, and `consent_method` in the [Apps API table](/docs/reference/api/apps/#add-oauth-20-client-application).
* Make sure that in your app configuration, the `redirect_uri` is an absolute URI and that it is allow listed by specifying it in [Trusted Origins](/docs/reference/api/trusted-origins/).
* If you aren't using the `default` [authorization server](/docs/concepts/auth-servers/), check that you've created at least one policy with one rule that applies to any scope or the scope(s) in your test.
* Check the [System Log](/docs/reference/api/system-log/) to see what went wrong.
