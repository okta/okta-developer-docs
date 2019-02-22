---
title: Okta API Products Change Log
excerpt: Summary of changes to the Okta Platform since Release 2017.02
---

## 2017.03

### Advance Notice: API Rate Limit Improvements

We are making rate limits more granular and will roll the changes out over the next few months:

1. Shortly after February 8, 2017, we'll provide system log alerts to let you know that you would have exceeded any of these new API rate limits.
2. Sometime in February, 2017, we'll treat authenticated end-user interactions on a per-user basis. Interactions like SSO after login won't apply to your org-wide API rate limits.
3. Shortly after March 8, 2017, the new, more granular rate limits will be enforced. At that point, the warnings in the System Log will change to error notifications.

Of course, as each change is released, we'll announced the change here.

For a full description of the rate limit changes, see [API Rate Limits](/docs/api/getting_started/rate-limits).<!-- OKTA-110472 -->

### Feature Improvements

#### Search for Authorization Servers by Name or Resource URI

You can now search (exact match) for an authorization server name or resource URI:
To see the new search box, log into your Okta org, click the **Admin** button, and visit **Security > API > Authorization Servers**.
<!-- OKTA-97833 -->

![Search box for authorization servers](/assets/img/release_notes/rn-search-as.png "Search box for authorization servers")

#### Manual Key Rotation (Key Pinning)

In the administrator UI, you can set an authorization server to manually rotate keys.
Keys are rotated automatically by default.

>Important: Automatic key rotation is more secure than manual key rotation. Use manual key rotation only if you can't use automatic key rotation.

To change an authorization server configuration to use manual key rotation:

1. Log into the Okta org.
2. Choose **Admin**.
3. Choose **Security** > **API**.
4. Open an authorization server for editing.
5. Change the value of **Signing Key Rotation** to Manual and save.
6. In the authorization server Settings tab, click the **Rotate Signing Keys** button to rotate the keys manually. This button doesn't display when **Signing Key Rotation** is set to Automatic.
<!-- OKTA-110682 -->

### Platform Bugs Fixed

* Requesting an authorization code with `response_mode` set to `okta_post_message` failed to return
the error message ("The authorization server does not support the requested response mode") in the
response. Instead it redirected the error response to the URI specified in `redirect_uri`. (OKTA-103437)
* The one-time `sessionToken` in the response from the POST `/api/v1/authn` request with username
and password was valid for two hours after issuance. It is now valid for 5 minutes for added security. (OKTA-109907)
* Modifying the rule conditions (attributes) of a default rule that affects policy
evaluation didn't return a read-only attribute error.
If you modified one of these read-only attributes previously, and need to change the attribute back to its initial value,
contact [Support](https://support.okta.com/help/open_case). (OKTA-110155)
* Using the `search` parameter with GET `/api/v1/users` when the user is federated returned an incorrect
value for `provider`. (OKTA-110929)
* When authentication fails because of the user's sign-on policy, the HTTP code returned was 403
but is now 401. (OKTA-111888)
