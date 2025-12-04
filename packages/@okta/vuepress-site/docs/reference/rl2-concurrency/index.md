---
title: Concurrency limits
category: rate limits
---

# Concurrency limits

Concurrency limits control how many requests your organization can have processing at the same time&mdash;not over time, and not per second or minute. Unlike per-minute rate limits, which measure the total number of requests over a time window, concurrency limits are enforced in real-time to ensure system stability. Okta processes most requests in a matter of milliseconds so that you can sustain thousands of requests per minute without ever exceeding concurrency limits.

Concurrency is tracked across three separate areas: agent traffic, Microsoft Office 365 traffic, and all other traffic (including API requests). Each area has a default limit of 75 simultaneous transactions for Okta Workforce and Customer Identity orgs. We’ve selected these default concurrency limits to align with the expected volume of traffic for a given org. Concurrency limits are increased for any tenant with an active rate limit multiplier (DynamicScale or Workforce).

| Integrator Free plan | Okta Customer Identity | Okta Workforce Identity |
| :------------------: | :--------------------: | :---------------------: |
| 35                   | 75                     | 75                      |

While typical user-driven traffic rarely hits these limits, they become a critical consideration in two key scenarios:

* During an Okta service incident: In rare cases, a degradation API performance may cause you to see `core.concurrency.org.limit.violation` events in your System Log. This is for your awareness only. These events typically resolve quickly as our systems recover.

* When designing and running automation: If you're running high-volume scripts or integrations (like bulk user imports, sync jobs, Terraform plans, and so on), the concurrency limit is an important design parameter. By designing your automation to honor the available concurrency, you can ensure smooth and predictable performance for your bulk operations. Configurable token and OAuth 2.0 app rate limits can also be used to limit the number of concurrent threads consumed by any given token or app.

## Calculate your concurrency needs

Concurrency is a function of both request volume and duration. If your API calls are fast, you can achieve high throughput with relatively low concurrency.

For example:

* For API requests that take an average of 400 ms, a workload of 1,500 calls per minute (spread out evenly) only uses about 10 concurrent requests.

* For faster API calls of 250 ms, a workload of 1,500 calls per minute only uses about 6 concurrent requests.

You can estimate your own needs using the following formula:

```bash
Concurrency = (RPM / 60) * (avgRequestDurationMillis / 1000)
```

or

```sh
Concurrency = (RPM * avgRequestDurationMillis) / 60,000
```

## Graceful degradation and retries

To minimize customer impact, Okta has a built-in resiliency mechanism. For many endpoints, when an HTTP 429 error occurs due to a concurrency limit, Okta automatically retries it on separate app services before returning an error to your client. This is a fallback mechanism for graceful degradation that often resolves temporary spikes in a few seconds or minutes without any perceived impact.

If a 429 error is received due to a concurrency limit, the System Log will show a `core.concurrency.org.limit.violation` event. More information is available in [Monitoring and Troubleshooting](/docs/reference/rl2-monitor/).
