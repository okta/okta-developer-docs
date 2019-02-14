---
title: Problems Your API Management Platform Won't Solve - API Gateways
---

<div style="font-size: 0.9em; margin-bottom: -20px;"><a href="/books/api-security/gateways/">&larr; API Gateways</a></div>

## Problems Your API Management Platform Won't Solve {#gateways-problems-they-will-not-solve}

An API management platform does not design your API. You still need to understand your users, their goals, and the best way to accomplish those goals. That will require you to determine which use cases you are and are not solving with your API. Further, you have to decide the name and structure of appropriate endpoints and what is required to interact with them.

An API management platform is also not a universal security solution. While it limits your attack surface to pre-defined endpoints with specified parameters, those endpoints still need adhere to security practices regarding data filtering, rate limiting, authentication, and authorization. Various API breaches - such as Equifax and Panera - resulted from attackers using published endpoints in unexpected ways to download entire customer lists, transaction history, and complete credit reports. Rate limiting would have slowed these attacks and monitoring may have detected them, but only strongly defined and enforced authentication and authorization could have stopped them.

The success of your API is also not driven by your API management platform. From a technical perspective, your API still has to be stable and reliable. From a product/market fit perspective, your API still has to solve an important problem for a measurable customer base. And finally, from a user experience perspective, your customers need to find your API and be able to get started quickly enough to solve their problem.

And finally, an API management platform will not establish governance policies for you. When large companies begin an API program or begin to coordinate API efforts, you have to create and enforce policies for tracking APIs lifecycle and development, consistent and predictable naming of endpoints and parameters, understanding and applying security procedures, and publishing them for each audience. These are all leadership and management issues you need to consider in addition to API gateway.
