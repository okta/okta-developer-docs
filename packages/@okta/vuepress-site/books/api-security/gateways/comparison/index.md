---
title: API Management Platform Comparison - API Gateways
---

<div style="font-size: 0.9em; margin-bottom: -20px;"><a href="/books/api-security/gateways/">&larr; API Gateways</a></div>

## API Management Platform Comparison {#gateways-comparison}

This is a much more complex question and depends on your use case, budget, and familiarity. If your infrastructure is entirely on AWS, Azure, or Google Cloud, using their respective gateways is a safe choice.

If you are like most organizations and have various components and systems in various places, the decision becomes more challenging. Mulesoft has its roots in the Enterprise Service Bus (ESB) area, so it is ideal when you have to wrap existing systems and orchestrate components into a single interface. Apigee was born and lives entirely in the cloud so if your architecture is entirely in the cloud or you're just starting, it may be a better fit. Alternatively, Kong and Tyk.io are self-hosted open source gateways which will allow you to deploy them on nearly any architecture. If you're deep into microservices, they may be a better approach to embed directly into the microservice.

Regardless, the original constraints around access management don't go away. Having a central place to create, manage, audit, and deploy access and security policies is key to knowing your people and systems have the right access to the right systems for the right reasons for the right amount of time. Distributing that aspect across servers, teams, and codebases is confusing at best and catastrophic at worst.

