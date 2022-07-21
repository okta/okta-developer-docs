---
title: Architectural factors
---
# Architectural factors

IAM is critical to how users perceive and use the applications they are interacting with. A good IAM experience is seamless, with the least user involvement with IAM that security permits when accessing an application. A poor IAM experience can result in users developing a poor opinion of the application or not using the application at all.

Identity or IAM is a collection of capabilities/building blocks that are essential for enabling your overall architecture and user experience. The success of your IAM solution depends on it meeting some strict architectural requirements. Following are specific architectural capabilities to consider for making your solution as robust as possible for your organization and as seamless as possible for your users. These capabilities are highly complex to build and integrate on your own if they aren't a core competency. It's much more efficient and effective to consider them in your high-level design as early in your solution's life cycle as possible. Failure to meet any of the capabilities can lead to reduced availability, higher support costs, business disruptions, erosion of trust, customer and user dissatisfaction, and damage to your reputation. In the worst case, they can lead to expensive breaches and lost business.

> **Note:** This list isn't exhaustive, and strategies for any of them are too numerous and complex to go into here. Our intent is to identify some of the more important Non-Functional Requirements (NFRs) for your IAM solution and illustrate a few possible strategies to address them.

See [**IAM Terminology**](/docs/concepts/iam-overview-iam-terminology/) for definitions of some terms and concepts used in this article.

## Availability

Design your IAM solution to be highly available. Consider strategies such as these to help meet your availability goals:

- Architect and design your solution with the collective availability requirements of your applications and customers in mind. Your objective is to meet or exceed their combined needs. Consider new availability requirements that are likely to emerge with business growth and other changes in the next few years.

- Provide redundancy, backup, monitoring, failure detection and recovery, notifications, and support procedures to avoid outages and recover quickly from planned or unplanned outages.

- Meet requirements in [Reliability](#reliability) and [Scalability](#scalability) below. Your solution is only available when it's operating correctly and can handle its workload.

- Provide a way to measure your solution's availability, report metrics for analysis, and verify that your solution meets its SLA availability requirements.

## Reliability

Design your IAM solution to be highly reliable and dependable with very high data integrity. Make sure that every feature works correctly and is capable of properly handling anomalies such as user and system errors. Consider strategies such as these to help achieve high reliability:

- Design and develop aggressive error detection and error handling techniques. Ideally, you should validate every piece of incoming data that your solution uses and never assume any operation has succeeded without checking. Attempt to recover from errors that may be transient and tolerate unrecoverable errors and faults whenever possible.

- To the extent practical, design your solution to minimize opportunities for human errors, and provide a way to quickly and easily recover when they happen.

- Provide facilities to log, track, and report errors, monitor error logs, and report metrics for analysis and handling. Additionally, verify that your solution meets its SLA reliability requirements.

## Performance

Design your IAM operations to complete quickly and have consistent and predictable response times with minimal overhead. If an operation takes longer than two or three seconds, let the user know it's still active and when it will complete. Consider strategies such as these to help meet your performance goals:

- Architect and design your solution with performance in mind. Develop an early understanding of your performance risks, establish performance targets, and factor performance into the design and implementation. Understand how your solution degrades under load.

- Choose infrastructure technologies, architecture models, identity storage design, and processing frameworks that can meet or exceed your long-term performance requirements.

- Provide a way to monitor your solution's performance, report metrics for analysis, and verify that your solution meets its SLA performance requirements.

## Scalability

Design your IAM solution to smoothly adapt to and handle rapid changes in workload caused by user growth, new use cases, and evolving business requirements. Keep the user experience consistent, seamless, and secure for everyone. Consider strategies such as these to help ensure that your solution scales smoothly without requiring design changes:

- Choose an architecture model that can accommodate your scaling requirements.

- Consider basing your solution on a cloud platform such as AWS, Azure, or GCP.

- Design your identity storage and infrastructure to smoothly scale to meet or exceed your performance goals as requirements change.

- Provide a way to monitor your solution's performance, report metrics for analysis, and verify that your solution meets its SLA performance requirements.

## Security

Your IAM solution is all about security. It's your application's guardian against unauthorized access and the problems that come with it. Design your solution to reliably authenticate every user sign-in and access request, and only allow authenticated users to access services and data for which they are authorized. Consider strategies such as these to help ensure that your solution meets your security requirements:

- Don't use root access keys. Use other commonplace security measures to guard against unauthorized and inappropriate access to your applications, resources, and IAM facilities and data.

- Grant users and admins the lowest level of privilege they need to perform their tasks.

- Design and build your solution using Zero Trust principles.

- Require multifactor authentication for all users and configure strong password policies.

- Use customer managed policies when appropriate, validate your policies, and regularly review and monitor them.

- Define conditions under which your policies allow access to resources.

- Perform thorough penetration testing to help detect exploitable vulnerabilities and evaluate the effectiveness of your security measures.

- Know all of the open source and third-party components and libraries that your solution is built on. Know how and when to upgrade your solution when a vulnerability is reported. Ensure that you are getting announcements about vulnerabilities from your vendors and communities. Resolve vulnerabilities when they are reported.

- Make your solution highly reliable and employ techniques such as those listed in [Reliability](#reliability).

## Compliance

*Compliance* refers to procedures and facilities for ensuring that an application meets specific regulatory requirements for privacy and with industry and local cybersecurity standards. It's essential for applications that handle personally identifiable information, healthcare patient records, financial account data, and other sensitive information, and for facilities like your solution that support them. Design your IAM solution to meet the applicable compliance requirements of every application it serves. Failure can lead to financial loss, security breaches, license revocations, business disruptions, erosion of trust, damage to your reputation, and lost business.

Consider strategies such as these to help ensure that your solution meets your compliance requirements:

- Understand which compliance regulations apply to the applications your IAM solution serves, how each affects your solution, and then design, build, and test your solution to meet them.

- Understand the privacy data retention requirements for the compliance policies you support, and factor them into your architecture and design. Be sure to consider the right of users to be forgotten in jurisdictions in which it applies.

- Provide facilities for admins to specify the compliance types for applications your solution serves, and a way for elements of your IAM solution and other consumers to view and update those settings if authorized.

- Keep all compliance-sensitive data, such as user identity information, in separate storage with appropriate access controls to limit access, and encrypt that storage for further security.

- Define special permissions for accessing compliance-sensitive data other than your own, provide facilities for authorized admins to assign those permissions, and develop procedures for limiting assignment and use of these permissions.

- Develop procedures or facilities to keep up to date on the compliance requirements of the applications your solution serves, and keep your solution up to date.

- Develop procedures to keep up to date on changes to applicable regulatory requirements in order to detect any changes that affect your solution, and keep your solution up to date.

- Log all accesses to compliance-sensitive data, and make the logs available for analysis and audits.

- Be prepared to demonstrate how your solution meets applicable regulatory compliance requirements, and to work with application developers to help them meet their requirements.

## Maintainability

Ongoing maintenance normally accounts for most software costs. Design your solution to be straightforward to troubleshoot and resolve issues. Accommodate changes to business, application, platform, technology, and security requirements. Apply patches to infrastructure software, rigorously test all elements of your solution, and deploy changes. Failure can result in application outages, degraded-mode operations, and higher development. Additionally, failure can result in maintenance, and support costs, delayed application releases, erosion of trust, and damage to your reputation.

Consider strategies such as these to help make your solution as maintainable as possible:

- Make your solution highly reliable and employ techniques such as those listed in [Reliability](#reliability).

- Make it easy for your devops, admin, and support teams to use your solution's features and keep it running smoothly. Additionally, make it easy for your engineers to test your solution and deploy updates.

- Assume many engineers will work on your solution over time. Make it easy for new engineers to understand your solution by avoiding complexity and modularizing your design. Be sure to clearly document its design and implementation.

- Consider evolution in your design and plan for it. Make it easy to resolve issues and for engineers to adapt it to changing requirements, technologies, and security challenges.

## How Okta can help

Okta provides a customizable, secure, drop-in solution for managing users, authenticating them, and authorizing and controlling their access to your applications and resources. It can substantially reduce the time, effort, cost, and risks to develop, field, and maintain an effective and efficient IAM solution.

- It's highly reliable, available, secure, scalable, and performant, with high data integrity.

- It's a cloud-based solution that allows your end users to access applications from any platform (desktop, laptop, mobile) and location. It allows your organization to implement services quickly, at large scale, and at a low total cost.

- It quickly scales to handle changes in storage and processing requirements and handles traffic surges. Additionally it handles rapid changes in users and usage patterns, and degrades smoothly and acceptably under load.

- You can have an unlimited number of users and have concurrent sessions with a very large fraction of them. See [Scaling Okta to 50 Billion Users](https://www.okta.com/resources/whitepaper/scaling-okta-to-billions-of-users/).

- It complies with a range of industry standard compliance certifications, such as ISO 27001, FIPS 140-2, and APEC PRP. It can help you meet GDPR, HIPAA, SOX, and other compliance requirements. See [Okta Service Certifications](https://trust.okta.com/compliance) for the current list.

- It's kept up to date with the latest software versions and patches, evolving security challenges, mitigation strategies, standards, and technologies so you don't have to.

- It's compatible with common network architectures and most popular SIEM systems, operating systems, and platform technologies (on-premise or cloud-based).

- It's compatible with and can support legacy on-premise apps, as well as new apps. Okta is able to bridge the gap toward digital modernization/transformation without disrupting your business and revenue. See [Secure Access to Legacy Web Applications with Okta](https://www.okta.com/resources/whitepaper/managing-access-legacy-web-apps/).

- Your admins can use its admin interfaces to efficiently enroll, manage, and support users and customers within the scope of their authority.

- You can use its per-group administration to allow different admins to manage users in different domains. See [Universal Directory](https://www.okta.com/products/universal-directory/).

- It supports a Zero Trust security architecture. See [What is Zero Trust Security?](http://okta.com/blog/2019/01/what-is-zero-trust-security/)

- It logs events that are related to your organization to provide an audit trail that you can export to a SIEM system. You can then use this data for monitoring, troubleshooting, event analysis, and audit. See [System Log API](/docs/reference/api/system-log/).

- You can configure it to provide notifications of user authorization issues and proactively respond to such events by temporarily blocking suspicious accounts.

- You can use its user interface components as-is, customize them, or use your own for custom behavior and branding.

- You can allow your users to register an identity, reset their password, request an app, and perform other self-service functions.

- Okta bases its identity storage, management, and communications on the SCIM standard. It provides a SCIM API, for Okta and your apps to securely exchange user identity data with compatible Service and Identity Providers. See [SCIM](/docs/concepts/scim/) and [SCIM Protocol](/docs/reference/scim/).

- With our Terraform Okta Provider, your team can introduce or add to our Infrastructure as Code codebase and automated pipeline. See [What is Terraform?](https://www.terraform.io/intro) and [Okta Provider](https://registry.terraform.io/providers/okta/okta/latest/docs).

- You can use Okta's drop-in solutions and event-driven APIs and SDKs to integrate features with a wide range of applications in different ways and usage models. This allows you to tightly integrate Okta functions with your apps for optimal performance, flexibility, and user experience. See the [Reference](/docs/reference/) section in the Okta Developer Portal.

- Its online technical documentation helps your application developers use its APIs and SDKs.

Some of Okta's architectural properties, such as its high reliability, availability, security, data integrity, and performance, are must-haves for any solution. Other properties can affect your design choices, costs, risks, or customer satisfaction.
