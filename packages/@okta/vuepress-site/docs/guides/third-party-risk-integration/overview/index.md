---
title: Overview
---

<ApiLifecycle access="beta" /> This is a beta feature guide.

[Overview blurb on Risk Integration, Risk Providers, and Risk Signals, and overall configuration. Discussion on risk authtenticaion and analysis. Okta version and then extension.

This guide provides an example third-party Risk Provider implementation]

### Prerequisites
To use this guide, you need the following:

- An Okta developer org. [Create an org for free](/signup/).
- Enable your Okta developer org with the following feature flags (FF): `RISK_SCORING` and `CONSUME_EXTERNAL_RISK_SIGNALS`. Contact your Okta customer support representative to enable these features.
- A [Postman client](https://www.postman.com/downloads/) to configure and test the Risk Provider integration. See [Get Started with the Okta APIs](/code/rest/) for information on setting up Postman.
- Download the Risk API Collection:
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/1c449b51a4a0adf90198)

### High-level Configurations
Creating a third-party Risk Provider integration follows the general configurations for creating an OAuth service application using the OAuth client credentials grant flow, which can be reviewed in [Implement OAuth for Okta with a Service App](/docs/guides/implement-oauth-for-okta-serviceapp/overview/). The service application provides an integration for the default Risk Provider and the Okta Risk Engine, and Risk Event API calls can test for a successful setup. Follow the high-level steps below, documented in the subsequent three sections.

1. Create self-service application for the Risk Provider
2. Update the default Risk Provider (only three, default name )
3. Test the integration


### See also
- risk provider api
- risk events api
- client credentials flow link

<NextSectionLink/>