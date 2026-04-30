---
title: API Integration Actions
meta:
  - name: description
    content: Provides instruction on how to create and integration with API Integration Actions in the Workflows Integration Builder.
---

API Integration Actions enable you to build Okta integrations with capabilities, such as provisioning, entitlement management, and Universal Logout, using third-party APIs. API Integration Actions are available through the low-code Workflows Integration Builder. These integrations are called by Okta for API actions, such as retrieving and updating entitlements or triggering risk-based logout.

## Integration Builder

Integration Builder is an environment for Independent Software Vendors (ISVs) to build, test, and deploy integrations privately or to the Okta Integration Network (OIN). The Integration Builder is exclusively available in [Okta Integrator Free Plan orgs](/signup) and integrates seamlessly with the OIN Wizard submission flow.

> **Note**: Integration Builder is an evolution of the Workflows Connector Builder. See the [Connector Builder](https://help.okta.com/wf/en-us/content/topics/workflows/connector-builder/connector-builder.htm) product documentation.

As an ISV, start building your integration in the OIN Wizard by defining your integration name and capabilities. The OIN Wizard directs you to the corresponding integration project within the Integration Builder. Build your API integration actions and validate the flows in the Integration Builder before returning to the OIN Wizard. Test your integration in the OIN Wizard and submit it for OIN distribution.

> **Note**: See [OIN submission requirements](/docs/guides/submit-app-prereq/main/) before using the OIN Wizard to submit your integration.

### Process overview

1. Start your submission in the [OIN Wizard: Submit an integration](/docs/guides/submit-oin-app/wfactions/main/).
2. Build your API integration actions in the Integration Builder by following [Build an integration with API Integration Actions](/docs/guides/build-api-actions/main/) guide. Define the authentication and action flows to your API server.
3. Return to the OIN Wizard to complete the integration configuration and testing. The actions you define in the Integration Builder become available in the OIN Wizard for real-time testing.
4. Submit for validation through the OIN Wizard once you're satisfied with your integration's functionality.

<div>

![ISV API Integration Actions submission process flow](/img/oin/3pSubmission.svg)

<!-- Generated using http://www.plantuml.com/plantuml/uml/

@startuml
skinparam ParticipantPadding 10
skinparam BoxPadding 10
autonumber

actor "ISV (app integrator)" as ISV

box "Otka Integrator Free Plan org" #f0f8ff
participant "OIN Wizard" as OINW
participant "Integration Builder" as IB
end box

== 1. Create submission  ==
ISV -> OINW: Start submission
Note right of ISV: Applications > Your OIN Integrations
OINW -> OINW: Select capabilities and\n add integration details
Note right of OINW: SSO, Universal Logout, provisioning, \n app properties, tenant, and authentication settings
OINW -> IB: Save integration details and start building

== 2. Build integration ==
IB -> IB: Configure authentication settings, \n add actions, and validate flows
IB -> OINW: Return to OIN Wizard

== 3. Review and test ==
OINW -> OINW: Connect integration capabilities \n with action flows
OINW -> OINW: Enter testing details, \n generate instances and test flows

== 4. Submit and publish ==
ISV -> OINW: Verify that your integration \n passed all required tests
ISV -> OINW: Submit your integration
OINW -[#blue]> OINW: OIN team reviews and validates integration
Note right of OINW: OIN team publishes the app integration \n in the OIN catalog
OINW -[#blue]> ISV: OIN team notifies you that \n your integration is published in the OIN

@enduml

-->

</div>

> **Note:** You can create an integration by navigating direcly to the Integration Builder in your Okta Integrator Free Plan org. However, you have to manually connect your Integration Builder project to your OIN submission before you can validate and submit your integration. Okta recommends that you access the Integration Builder through the OIN Wizard, which shares the details of your integration so that you don't have to enter the same information twice.

## Next steps

Ready to get started? Sign up for a free [Okta Integrator Free Plan org](/signup) and see [OIN Wizard: Submit an integration](/docs/guides/submit-oin-app/wfactions/main/) with the API Integration Actions capability.

Post your questions on the [Okta Developer Forum](https://devforum.okta.com/c/questions/oin-submissions/19) if you need help or have an issue.
