---
title: Concurrency limits
category: rate limits
---

# Concurrency limits

Concurrency limits control how many transactions your organization can have in-flight at the same time. Unlike per-minute rate limits, which measure the total number of requests over a time window, concurrency limits are enforced in real-time to ensure system stability.

Concurrency is tracked across three separate areas: agent traffic, Microsoft Office 365 traffic, and all other traffic (including API requests), which has a default limit of 75 simultaneous transactions for Okta Workforce Identity (OWI) customers.

| Integrator Free Plan | Okta Customer Identity | Okta Workforce Identity |
| :------------------: | :--------------------: | :---------------------: |
| 35                   | 75                     | 75                      |

While typical user-driven traffic rarely hits these limits, they become a critical consideration in two key scenarios:

* During an Okta service incident: In rare cases, a degradation in Okta's API performance may cause you to see `core.concurrency.org.limit.violation` events in your System Log. This is for your awareness only. These events typically resolve quickly as our systems recover.

* When designing and running automation: If you're running high-volume scripts or integrations (like bulk user imports, sync jobs, or Terraform plans), the concurrency limit is an important design parameter. The limit exists to protect the platform from being overwhelmed by more simultaneous requests than our servers have threads available to handle. By designing your automation to honor the available concurrency, you can ensure smooth and predictable performance for your bulk operations. Configurable token and OAuth 2.0 application rate limits can also be used to limit the number of concurrent threads consumed by any given token or application.

## Calculating your concurrency needs

Concurrency is a function of both request volume and duration. If your API calls are fast, you can achieve high throughput with relatively low concurrency.

For example:

* For API requests that take an average of 400ms, a workload of 1,500 calls per minute (spread out evenly) would only use about 10 concurrent requests.

* For faster API calls of 250ms, a workload of 6,000 calls per minute only uses about 25 concurrent requests.

You can estimate your own needs using the following formula:

```sh

Concurrency = (Requests per Minute / 60) * (Avg. Request Duration in ms / 1000)

or

Concurrency = (RPM*Avg. Request Duration in ms)/60,000

```

## Graceful degradation and retries

To minimize customer impact, Okta has a built-in resiliency mechanism. For many endpoints, when a 429 error occurs due to a concurrency limit, our load balancer intercepts the request and automatically retries it on separate application services before returning an error to your client. This is a fallback mechanism for graceful degradation that often resolves temporary spikes in a few seconds or minutes without any perceived impact. A prolonged state of retries may indicate a more serious underlying issue.

### Increasing concurrency limits

Your organization's concurrency limit can be increased with the DynamicScale add-on or with a workforce multiplier. The increased limits are:

| Multiplier | Concurrency Limit |
| :--------: | :---------------: |
| 1x         | 75                |
| 5x         | 125               |
| 10x        | 200               |
| 50x        | 375               |

