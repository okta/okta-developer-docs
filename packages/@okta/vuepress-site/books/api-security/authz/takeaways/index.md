---
title: Key Takeaways - Authorization
---

<div style="font-size: 0.9em; margin-bottom: -20px;"><a href="/books/api-security/authz/">&larr; Authorization</a></div>

## Key Takeaways {#authz-takeaways}

In closing, here's some simple advice on how to think about authorization in your APIs:

* Estimate the scopes or permissions required for your users to accomplish the use cases your API addresses early on
* Keep things simple. Don't overwhelm yourself or your app with unnecessary overhead. Most applications don't have complex authorization needs
* Building authorization is hard. For simple scenarios with a few user types and authorization decisions, your impulse will be to build it yourself. Unfortunately, requirements and policies almost always get more complex so this becomes less sustainable over time. Use a third-party authorization service, like Okta, whenever possible
* Even with a third party provider in place, it's still important to understand authorization so you can make good decisions on how to architect your application
* RBAC is enough for many use cases. ABAC is the next step
* OAuth 2.0 is an authorization framework that you can leverage for most scenarios
* Log everything. Authorization decisions must be reviewed and adjusted based on new use cases, usage patterns, and bad actors. Auditing becomes more important as you grow

