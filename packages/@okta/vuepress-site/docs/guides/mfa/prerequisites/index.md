---
title: Prerequisites
---

It is quickly becoming the standard for application developers and organizations to implement multifactor authentication (MFA) to add an extra layer of security to their applications. In this guide, we provide an example of how to use Okta's Factors API to add an additional factor for a user. How you actually make the HTTPS calls depends on the programming language and web framework that your app uses.

Okta gives you the flexibility to deploy our built-in factors or integrate with existing tokens. Native factors include
SMS and the Okta Verify app for iOS and Android. Integrations include Google Authenticator, RSA SecurID, Symantec VIP, and Duo Security.

If you are writing code in .NET or Java, [Okta has helper libraries](/docs/) that make it easy to add support for Okta to your app
in an idiomatic way.

This guide assumes that you have:

* An Okta Developer Edition organization. Don't have one? [Create one for free](https://developer.okta.com/signup)
* [Postman configured](/code/rest/) to make API requests to your Developer Edition org
* The Users API and Factors API [Postman collections](/docs/reference/postman-collections/)
* [Created an API token](/docs/guides/create-an-api-token/) for your Okta org

## Support

If you need help or have an issue, post a question on the [Okta Developer Forum](https://devforum.okta.com).

<NextSectionLink/>
