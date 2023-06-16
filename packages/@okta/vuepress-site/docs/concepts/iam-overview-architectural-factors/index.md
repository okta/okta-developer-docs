---
title: Architectural factors
---
# Architectural factors

IAM is critical to how users perceive and interact with their applications. A good IAM experience is seamless, with the least user involvement with IAM that security permits when accessing an application. A poor IAM experience can result in users developing a poor opinion of the application or not using the application at all.

Identity or IAM is a collection of capabilities/building blocks essential for enabling your overall architecture and user experience. Your IAM solution's success depends on meeting some strict architectural requirements. This guide details specific architectural capabilities for making your solution as robust as possible for your organization and as seamless as possible for your users. These capabilities are highly complex to build and integrate on your own if they aren't a core competency. It's much more efficient and effective to consider them in your high-level design as early as possible in your solution's life cycle. Failure to meet any of the capabilities can lead to reduced availability, higher support costs, business disruptions, erosion of trust, customer and user dissatisfaction, and damage to your reputation. In the worst case, they can lead to expensive breaches and lost business.

> **Note:** This list isn't exhaustive, and strategies for any of them are too numerous and complex to go into here. We intend to identify some of the more critical Non-Functional Requirements (NFRs) for your IAM solution and illustrate a few possible strategies to address them.

See [**IAM Terminology**](/docs/concepts/iam-overview-iam-terminology/) for definitions of some terms and concepts used in this article.

## Availability

Design your IAM solution to be highly available. Consider strategies such as these to help meet your availability goals:

- Architect and design your solution with the collective availability requirements of your applications and customers in mind. Your objective is to meet or exceed their combined needs. Consider new availability requirements likely to emerge with business growth and other changes in the next few years.

- Provide redundancy, backup, monitoring, failure detection and recovery, notifications, and support procedures to avoid outages and recover quickly from planned or unplanned outages.

- Meet requirements in [Reliability](#reliability) and [Scalability](#scalability) below. Your solution is only available when it's operating correctly and can handle its workload.

- Provide a way to measure your solution's availability, report metrics for analysis, and verify that your solution meets its SLA availability requirements.

## Reliability

Design your IAM solution to be highly reliable with very high data integrity. Make sure every feature works correctly and can properly handle anomalies such as user and system errors. Consider strategies such as these to help achieve high reliability:

- Design and develop aggressive error detection and error handling techniques. Ideally, Architectural Factors you should validate every piece of incoming data that your solution uses and never assume any operation has succeeded without checking. Attempt to recover from errors that may be transient and tolerate unrecoverable errors and faults whenever possible.

- To the extent practical, design your solution to minimize opportunities for human errors and provide a way to quickly and easily recover when they happen.

- Provide facilities to log, track, and report errors, monitor error logs, and report metrics for analysis and handling. Additionally, verify that your solution meets its SLA reliability requirements.

## Performance

Design your IAM operations to complete quickly and have consistent and predictable response times with minimal overhead. If an operation takes longer than two or three seconds, let the user know it's still active and when it will complete. Consider strategies such as these to help meet your performance goals:

- Architect and design your solution with performance in mind. Develop an early understanding of your performance risks, establish performance targets, and factor performance into the design and implementation. Understand how your solution degrades under load.

- Choose infrastructure technologies, architecture models, identity storage design, and processing frameworks that can meet or exceed your long-term performance requirements.

- Provide a way to monitor your solution's performance, report metrics for analysis, and verify that your solution meets its SLA performance requirements.

## Scalability

Design your IAM solution to smoothly adapt to and handle rapid changes in workload caused by user growth, new use cases, and evolving business requirements. Keep the user experience consistent, seamless, and secure for everyone. Consider strategies such as these to help ensure that your solution scales smoothly without requiring design changes:

- Choose an architecture model that can accommodate your scaling requirements.

- Consider basing your solution on a cloud platform such as AWS, Azure, or Google Cloud Platform.

- Design your identity storage and infrastructure to scale to meet or exceed your performance goals as requirements change.

- Provide a way to monitor your solution's performance, report metrics for analysis, and verify that your solution meets its SLA performance requirements.

## Security

Your IAM solution is all about security. It's your application's guardian against unauthorized access and the problems that come with it. Design your solution to authenticate every user sign-in and access request reliably and only allow authenticated users to access the services and data for which they have permission. Consider strategies such as these to help ensure that your solution meets your security requirements:

- Don't use root access keys. Use other commonplace security measures to guard against unauthorized and inappropriate access to your applications, resources, and IAM facilities and data.

- Grant users and admins the lowest level of privilege they need to perform their tasks.

- Design and build your solution using Zero Trust principles.

- Require multifactor authentication for all users and configure strong password policies.

- Use customer-managed policies when appropriate, validate your policies, and regularly review and monitor them.

- Define conditions under which your policies allow access to resources.

- Perform thorough penetration testing to help detect exploitable vulnerabilities and evaluate the effectiveness of your security measures.

- Know all of your solution's open source and third-party components and libraries. Ensure that you are getting announcements about vulnerabilities from your vendors and communities. When they report a vulnerability, know how to resolve it.

- Make your solution highly reliable and employ techniques such as those listed in [Reliability](#reliability).

## Compliance

*Compliance* refers to procedures and facilities for ensuring that an application meets specific regulatory requirements for privacy and industry and local cybersecurity standards. Support for compliance is essential in any application that handles information that can identify an individual, such as healthcare patient records, or financial account data. Design your IAM solution to meet the applicable compliance requirements of every application it serves. Failure can lead to financial loss, security breaches, license revocations, business disruptions, erosion of trust, damage to your reputation, and lost business.

Consider strategies such as these to help ensure that your solution meets your compliance requirements:

- Understand which compliance regulations apply to the applications served by your IAM solution, how each affects your solution, and then design, build, and test your solution to meet them.

- Understand the privacy data retention requirements for the compliance policies you support, and factor them into your architecture and design. Be sure to consider a user's right to be forgotten in jurisdictions in which it applies.

- Allow admins to specify the compliance types for applications your solution serves, and a way to view and update those settings by those accounts with permission to do so.

- Keep all compliance-sensitive data, such as user identity information, in separate storage with appropriate access controls to limit access. Encrypt that storage for further security.

- Define special permissions for accessing compliance-sensitive data other than your own. Provide facilities for authorized admins to assign those permissions. Develop procedures for limiting the assignment and use of those permissions.

- Develop procedures or facilities to keep your solution up to date with the compliance requirements of the applications that it serves.

- Develop procedures to keep your solution up to date with any applicable regulatory requirements.

- Log all accesses to compliance-sensitive data and make the logs available for analysis and audits.

- Be prepared to demonstrate how your solution meets applicable regulatory compliance requirements and to work with application developers to help them meet their requirements.

## Maintainability

Ongoing maintenance typically accounts for most software costs. Design your solution to be straightforward to troubleshoot and resolve issues. Accommodate business, application, platform, technology, and security requirements changes. Apply patches to infrastructure software, rigorously test all elements of your solution, and deploy changes. Failure can result in application outages, degraded-mode operations, and higher development. Failure can also result in maintenance, support costs, delayed application releases, erosion of trust, and damage to your reputation.

Consider strategies such as these to help make your solution as maintainable as possible:

- Make your solution highly reliable and employ techniques such as those listed in [Reliability](#reliability).

- Make it easy for your DevOps, admin, and support teams to use your solution's features and keep it running smoothly. Additionally, make it easy for your engineers to test your solution and deploy updates.

- Assume many engineers will work on your solution over time. Make it easy for new engineers to understand your solution by avoiding complexity and modularizing your design. Be sure to document its design and implementation.

- Consider evolution in your design and plan for it. Make it easy to resolve issues and for engineers to adapt it to changing requirements, technologies, and security challenges.

## How Okta can help

Okta provides a customizable, secure drop-in solution for managing users, authenticating them, and authorizing and controlling their access to your applications and resources. It can substantially reduce the time, effort, cost, and risks to develop, field, and maintain an effective and efficient IAM solution.

- It's highly reliable, available, secure, scalable, and performant, with high data integrity.

- It's a cloud-based solution that allows your end users to access applications from any platform (desktop, laptop, mobile) and location. It enables your organization to implement services quickly, at a large scale, and at a low total cost.

- It quickly scales to handle changes in storage and processing requirements and traffic surges. Additionally it handles rapid changes in users and usage patterns and degrades smoothly and acceptably under load.

- You can have an unlimited number of users and concurrent sessions with a large fraction of them. See [Scaling Okta to 50 Billion Users](https://www.okta.com/resources/whitepaper/scaling-okta-to-billions-of-users/).

- It complies with various industry-standard compliance certifications, such as ISO 27001, FIPS 140-2, and APEC PRP. It can help you meet the European Union's [General Data Protection Regulation (GDPR)](https://gdpr-info.eu/), the Health Insurance Portability and Accountability Act (HIPAA), SOX, and other compliance requirements. See [Okta Service Certifications](https://trust.okta.com/compliance) for the current list.

- It's updated with the latest software versions and patches, evolving security challenges, mitigation strategies, standards, and technologies, so you don't have to.

- It's compatible with common network architectures and most popular SIEM systems, operating systems, and platform technologies (on-premises or cloud-based).

- It's compatible with and can support legacy on-premises apps, as well as new apps. Okta can bridge the gap toward digital modernization/transformation without disrupting your business and revenue. See [Secure Access to Legacy Web Applications with Okta](https://www.okta.com/resources/whitepaper/managing-access-legacy-web-apps/).

- You can use its admin interface to enroll, manage, and support users and customers within the scope of their authority quickly and efficiently.

- You can use its per-group administration to allow different admins to manage users in different domains. See [Universal Directory](https://www.okta.com/products/universal-directory/).

- It supports a Zero Trust security architecture. See [What is Zero Trust Security?](http://okta.com/blog/2019/01/what-is-zero-trust-security/)

- It logs events related to your organization to provide an audit trail that you can export to a SIEM system. You can then use this data for monitoring, troubleshooting, event analysis, and audit. See [System Log API](/docs/reference/api/system-log/).

- You can configure it to provide notifications of user authorization issues and proactively respond to such events by temporarily blocking suspicious accounts.

- You can use its user interface components as-is, customize them, or use your own for custom behavior and branding.

- You can allow users to register an identity, reset their password, request an app, and perform other self-service functions.

- Okta bases its identity storage, management, and communications on the SCIM standard. It provides a SCIM API for Okta and your apps to securely exchange user identity data with compatible Service and Identity Providers. See [SCIM](/docs/concepts/scim/) and [SCIM Protocol](/docs/reference/scim/).

- With our Terraform Okta Provider, your team can introduce or add to our Infrastructure as Code codebase and automated pipeline. See [What is Terraform?](https://www.terraform.io/intro) and [Okta Provider](https://registry.terraform.io/providers/okta/okta/latest/docs).

- You can use Okta's drop-in solutions and event-driven APIs and SDKs to integrate features with a wide range of applications in different ways and usage models. Tightly integrate Okta functions with your apps for optimal performance, flexibility, and user experience. See the [Reference](/docs/reference/) section in the Okta Developer Portal.

- Its online technical documentation helps your application developers use its APIs and SDKs.

Some of Okta's architectural properties, such as its high reliability, availability, security, data integrity, and performance, are must-haves for any solution. Other properties can affect your design choices, costs, risks, or customer satisfaction.
