---
title: OIN integration best practices
---

### Software development kits

Due to the OIN restrictions of using an org authorization server and the authorization code flow, the SDKs provided by Okta should not be used for app integration development, since they cannot validate the access tokens.

### Logos

A clear and well-designed logo helps customers find your app integration in the OIN and ensures that your brand is well represented. When you create your app submission in the OIN manager, be sure to upload a graphic that your customers will instantly recognize.

The logo file must be smaller than 1 MB in size and be in either PNG, JPG, or GIF file format. For best results, use a PNG image with a transparent background, a landscape orientation, and use a minimum resolution of 420 x 120 pixels to prevent any unsightly upscaling.

### Rate restrictions

When constructing your OIDC application, you want to be aware of the limits on calls to the Okta API. For reference on the categories and cumulative rate limits, see [Rate limits overview](/docs/reference/rate-limits/). In order to monitor your calls to the API, Okta provides three headers in each response to report on both concurrent and org-wide rate limits.

For org-wide rate limits, the three headers show the limit that is being enforced, when it resets, and how close you are to hitting the limit:

* `X-Rate-Limit-Limit` &mdash; the rate limit ceiling that applies to the current request
* `X-Rate-Limit-Remaining` &mdash; the number of requests left for the current rate-limit window
* `X-Rate-Limit-Reset` &mdash; the time when the rate limit resets, specified in UTC epoch time

To be sure about org-wide rate limits, include code in your application to check the relevant headers in the response.

For concurrent rate limits, the three headers behave a little differently: when the number of unfinished requests is below the concurrent rate limit, request headers only report org-wide rate limits. After you exceed a concurrent rate limit, the headers report that the limit has been exceeded. When you drop back down below the concurrent rate limit, the headers switch back to reporting the time-based rate limits. The first two header values are always `0` for concurrent rate limit errors. The third header reports an estimated time interval when the concurrent rate limit may be resolved. The `X-Rate-Limit-Reset` time for concurrent rate limits is only a suggested value. There's no guarantee that enough requests will complete for the requests to go below the concurrent rate limit at the time indicated.

The error condition resolves itself as soon as there is another concurrent thread available. Normally no intervention is required. However, if you notice frequent bursts of HTTP 429 errors, or if the concurrent rate limit doesn’t resolve quickly, then you may be exceeding the concurrent rate limit. Examine activity in the log before the burst of HTTP 429 errors appeared. If you can't identify what is causing you to exceed the limit, contact [Okta Support](mailto:support@okta.com).

You can request a temporary rate limit increase if you anticipate a large number of requests over a specified time period. Contact [Okta Support](mailto:support@okta.com) to open a ticket to permit the exception.

>**Note:** The following public metadata endpoints aren't subjected to rate limiting.
>
>* `/oauth2/v1/keys`
>* `/.well-known/openid-configuration`
>* `/.well-known/oauth-authorization-server`

<NextSectionLink/>
