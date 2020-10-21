---
title: The Role of an API Management Platform - API Gateways
---

<div style="font-size: 0.9em; margin-bottom: -20px;"><a href="/books/api-security/gateways/">&larr; API Gateways</a></div>

## The Role of an API Management Platform {#gateways-management-platform}

### Lifecycle Management

Effective API management begins long before your first HTTP request. In fact, it likely begins in a document or at a whiteboard with a simple requirement and business needs. It quickly turns into a specification and then a workflow and then a data and interaction model. Eventually, it probably turns into an Open API specification, deployable code, and metrics that are carefully tracked by the team.

The key technical aspect of this entire process is understanding what stage the API is in, how and where it's deployed, and how it's maintained. As a result, many of the gateways integrate with the cloud hosting services blend directly into your devops processes. Further, the process and these integrations are the same whether the APIs are destined for internal, partner, or even consumer use. In this area, that distinction is irrelevant.

### Interface Management

While it's pedantic to note, the "I" in API stands for Interface, and it's the only interface our users will ever interact with. A full discussion of API design is beyond the scope of this book, but the result will always be individual URLs or endpoints we need to support, which HTTP verbs are applied and how, and what parameters or properties are required for each.

API management platforms do not help you choose specific endpoints or which verb is best. Instead, once you've made those decisions, the API gateway will allow you to map external URLs to specific endpoints in your API and explicitly allow specific HTTP verbs, parameters, and even datatypes each endpoint supports. As the first line of defense, this is one of the subtly powerful aspects of a gateway because it limits the surface area where your API can be attacked. That said, all the standard data sanitization practices still apply.

More advanced API management platforms go a step further. Instead of merely configuring the available endpoints via a web interface or even an API, you can upload your API specification document - like Open API, Blueprint, or RAML - and the gateway will parse the document and configure the external interface. You may even be able to integrate this with your continuous integration system to automatically deploy your API into staging, perform the appropriate checks, and prepare to deploy to production.

### Access Management

Access management in an API management platform is where things begin to get more complex. Until this point, the platform has dealt with deeply technical challenges the solutions to which are expressed entirely in code. Access management - both authentication and authorization - is a combination of code, the context of the user and their use case, and business policies and practices. This makes it fundamentally more complicated.

At the simplest level, every gateway can use an API key that is checked on every request. While this works, it lacks the fine-grained access most security and compliance teams require.

As an alternative, many API gateways also include a basic OAuth 2.0 server. Your users perform a simple OAuth user flow, receive an access token, and can then use the API. There are two significant drawbacks to this approach. First, the gateway has to keep its own list of users and activate or deactivate them as employees come and go. As yet another independent system, it's easy for this information to get out of sync. The second drawback is that security teams can't review, audit, and validate the security policies implemented by the gateway. For some organizations, this is troubling at best and catastrophic at worst.

The final approach gateways take is to provide a pluggable interface for an external Identity Provider (IdP). Using an IdP is an easy way to integrate user management with a more extensive system such as Active Directory or Okta's Universal Directory. The single biggest benefit is simplicity: users are activated or deactivated in the API gateway as they are activated or deactivated in the directory. For internal or employee-oriented scenarios, this resolves a major security requirement. Further, by centralizing the issuance of access tokens, the security team can audit and even control the policies independent of API development.

### Consumption Tracking

As we move further away from the hard technical implementation and into the business concerns and requirements, the next area is consumption management, or more fundamentally onboarding and engagement. To expose these functions, most API management platforms include a developer portal for documentation and samples, a logging page to show usage and errors for debugging, and sample code to show how to use the API. Every component here has exactly one goal: How can a developer get started with and use your API successfully?

### Business Goals

The final aspect that an API management platform addresses are the business goals. On a technical layer, this overlaps with the consumption aspects to track overall API usage but provides a more detailed look at business analytics. Therefore, it's not just overall API consumption but identifying which API calls are the most and least important and how they map to revenue. The most advanced gateways will also include integration with web analytics platforms to track and understand where your users are struggling on setup and configuration.
