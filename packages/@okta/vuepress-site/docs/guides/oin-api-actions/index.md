---
title: API Integration Actions
meta:
  - name: description
    content: Provides instruction on how to create and integration with API Integration Actions in the Workflows Integration Builder.
---

API Integration Actions enable ISVs to build Okta integrations with capabilities, such as provisioning, entitlement management, and Universal Logout. API Integration Actions are available through the low-code Workflows Integration Builder. These integrations are seamlessly called by Okta for actions like retrieving and updating entitlements or triggering risk-based logout.

## Integration Builder

The Integration Builder is a low-code Workflow platform that allows you to build actions based on API request and responses to your app's resource server. The Workflows Integrator Builder is exclusively available in the [Okta Integrator Free Plan orgs](/signup), and integrates with the OIN wizard submission flow.

You can define their your integration details in the OIN wizard, which directs you to a preset project, within Integrator Builder, to build your API Integration Actions. After the action flows are built, you can continue back to the OIN Wizard to validate the flows and submit the integration to the OIN for distrubtion.

> **Note**: See [OIN submission requirements](/docs/guides/submit-app-prereq/main/) before using the OIN Wizard to submit your integration.

Okta recommends that you access the Integration Builder through the OIN Wizard, which shares the details of your integration so that you don't have to enter the same information twice.

### Process overview

1. Start your submission in the [OIN Wizard: Submit an integration](/docs/guides/submit-oin-app/wfactions/main/).
2. Build your API integration actions in the Integration Builder by following [Build an integration with API Integration Actions](/docs/guides/build-api-actions/main/) guide. This tool lets you define the action flows and connections to your app server.
3. Complete the definition and testing in the OIN Wizard after building your action flows. The actions you define in the Integration Builder become available in the OIN Wizard for real-time testing.
4. Submit for validation through the OIN Wizard once you're satisfied with your integration's functionality.

<div>

![ISV API Integration Actions submission process flow](/img/oin/3pSubmission.svg)

<!-- Generated using http://www.plantuml.com/plantuml/uml/

@startuml
skinparam ParticipantPadding 10
skinparam BoxPadding 10
autonumber

actor "ISV (app integrator)" as ISV

participant "OIN Wizard" as OINW

participant "Integration Builder" as IB

== 1. Create submission  ==
ISV -> OINW:Start submission
Note right of ISV: Applications > Your OIN Integrations
OINW -> OINW:Selects capability and protocols\n(SSO, Universal Logout, provisioning)
OINW -> OINW: Add integration details
Note right of OINW: App properties, tenant, and authentication settings

== 2. Build integration ==
OINW -> IB: Save integration details and start building
IB -> IB: Verify that integrtion details were transferred to the IB project
IB -[#blue]> IB: Configure authentication settings
IB -> IB: Configure tenant settings
IB -> IB: Add Actions and create flows
IB -[#blue]> IB: Validate flow
IB -> OINW: Return to OIN Wizard
OINW -> OINW: Connect integration capability with action flows

== 3. Review ==
OINW -> OINW: Enter testing details
OINW -> OINW: Generate instances for testing
OINW -> OINW: Test integration flows

== 4. Submit and publish ==
ISV -> OINW: Verify that app integration passed all test cases
ISV -> OINW: Submit the integration
OINW -[#blue]> OINW: OIN team reviews and validates integration
Note right of OINW: OIN team publishes the app integration in the OIN catalog
OINW -[#blue]> ISV: OIN team notifies the ISV that the integration is published

@enduml

-->

</div>

> **Note:** You can create an integration by navigating direcly to the Integration Builder in your Okta Integrator Free Plan org. However, you have to manually connect your API Integration Actions project to your OIN submissions before you can validate and submit your integration.

## Next steps

Ready to get started? Sign up for a free [Okta Integrator Free Plan org](/signup) and see [OIN Wizard: Submit an integration](/docs/guides/submit-oin-app/wfactions/main/) with the API Integrations Action capability.

Post your questions on the [Okta Developer Forum](https://devforum.okta.com/c/questions/oin-submissions/19) if you need help or have an issue.
