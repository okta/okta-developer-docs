---
title: API Gateways
---
# API Gateways {#gateways}

<div class="chapter-author">By Keith Casey</div>

An API gateway is a firewall that sits between your API and your users. They range from the simplest proxies which apply throttling and IP address allowing/blocking to fully configurable platforms with fine-grained access mapping individual permissions to specific HTTP verbs and endpoints. Realistically, using an API gateway is not necessary but it makes some things faster, easier, and more reliable, which allows you to focus on your API.

The most prominent gateways are [Google's Apigee](https://apigee.com/api-management/), [Salesforce's MuleSoft](https://www.mulesoft.com/), the [AWS API Gateway](https://aws.amazon.com/api-gateway/), [Microsoft Azure's API Management](https://azure.microsoft.com/en-us/services/api-management/), and the [Kong API Gateway](https://konghq.com/) but the most appropriate gateway for your project will vary depending on context, use cases, and budget.

*This section does not make a recommendation for a particular gateway but describes the process and use cases where one may fit.*

Most API gateway vendors call themselves API management platforms because gateways are just one part of an overarching API management strategy. With that in mind, there are five key things that most API management platforms provide: Lifecycle management, interface management, access management, consumption tracking, and business goals.

When you're building and deploying your API, you need to address each of these five areas, which is one of the main reasons API management platforms have taken off in recent years: they make solving these problems tangibly easier.





<section class="chapter-subsection-list"><ul><li><a href="/books/api-security/gateways/management-platform">The Role of an API Management Platform</a></li><li><a href="/books/api-security/gateways/solutions">Solutions Provided by an API Management Platform</a></li><li><a href="/books/api-security/gateways/problems-they-will-not-solve">Problems Your API Management Platform Won't Solve</a></li><li><a href="/books/api-security/gateways/comparison">API Management Platform Comparison</a></li></ul></section>
