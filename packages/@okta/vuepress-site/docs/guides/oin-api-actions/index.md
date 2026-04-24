---
title: API Integration Actions
meta:
  - name: description
    content: Provides instruction on how to create and integration with API Integration Actions in the Workflows Integration Builder.
---

API Integration Actions enable ISVs to build Okta integrations with capabilities, such as provisioning, entitlement management, and Universal Logout. API Integration Actions are available through the low-code Workflows Integration Builder. These integrations are seamlessly called by Okta for actions like retrieving and updating entitlements or triggering risk-based logout.

The Workflows Integrator Builder is exclusively available in the Okta Integrator Free orgs, and integrates with the OIN wizard submission flow. You can define their your integration metadata in the OIN wizard, which directs you to a preset project within Integrator Builder to build your API integration action flows. After the action flows are defined, you can continue back to the OIN Wizard to validate the flows and submit the integration to the OIN for distrubtion.

After the OIN team validates your integration and publishes it in the OIN catalog, your customers can discover and configure it in their own Okta tenant org. Configuration is easy and consistent for your customers because you've already built the integration with the required configuration instructions. Customers trust that integrations in the OIN are secure and reliable because they're verified by Okta.

## Integration Builder

The Integration Builder is a low-code Workflow platform that allows you to build actions based on API request and responses to your app's resource server. This builder is part of the Workflows platform that's offered only to [Okta Integrator Free Plan org](/signup) admin users.

> **Note**: See [OIN submission requirements](/docs/guides/submit-app-prereq/main/) before using the OIN Wizard to submit your integration.

Okta recommends that you access the Integration Builder through the OIN Wizard, which shares the details of your integration so that you don't have to enter the same information twice.

### Process overview

1. Start your submission in the [OIN Wizard: Submit an integration](/docs/guides/submit-oin-app/wfactions/main/).
2. Build your API integration actions in the Integration Builder by following [Build an integration with API Integration Actions](/docs/guides/build-api-actions/main/) guide. This tool lets you define the action flows and connections to your app server.
3. Complete the definition and testing in the OIN Wizard after building your action flows. The actions you define in the Integration Builder become available in the OIN Wizard for real-time testing.
4. Submit for validation through the OIN Wizard once you are satisfied with your integration's functionality.

[OIN Wizard] -> [Integration Builder]->[OIN Wizard]

(Add integration details) -> (Configure the integration actions and flows) -> (Validate the flows and test the integration) -> (Submit your integration)

< -- Possibly add a process image here??? -- >

> **Note:** You can create an integration by navigating direcly to the Integration Builder in your Okta Integrator Free Plan org. However, you have to manually connect your API Integration Actions project to your OIN submissions afterwards.

## Next steps

Ready to get started? Sign up for a free [Okta Integrator Free Plan org](/signup) and see [OIN Wizard: Submit an integration](/docs/guides/submit-oin-app/wfactions/main/) with the API Integrations Action capability.

Post your questions on the [Okta Developer Forum](https://devforum.okta.com/c/questions/oin-submissions/19) if you need help or have an issue.
