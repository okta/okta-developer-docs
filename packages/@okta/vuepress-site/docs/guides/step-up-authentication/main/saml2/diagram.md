<div class="three-quarter">

![Flow diagram that displays the back and forth between the Okta Identity Provider, the user agent, and the Service Provider](/img/auth/step-up-authentication-acr-flowSAML.png)

</div>

At a high level, this flow has the following steps:

1. A user (not shown) attempts to access a resource within the SP through their browser.
1. The SP determines that higher authentication is needed, generates the SAML request and includes the `acr_values` predefined parameter, and then sends the SAML request to the browser for relay.
1. The browser relays the SAML request to Okta.
1. Okta performs the authentication scenarios required in accordance with the predefined `acr_values` parameter value used in the SAML authentication request.
1. Okta generates and sends the SAML assertion response to the browser. The assertion contains the `acr` value from the request passed as `AuthnContextClassRef`. The factors (Authentication Method Reference (AMR) claims) used to authenticate the user are passed as a list of `AuthnContextDecl` in the `AuthnContext`.
1. The browser relays the SAML assertion to the SP.
1. The SP sends the `securitycontext` to the browser.
1. The browser requests access to the resource from the SP.
1. The SP responds with the requested resource.

<!-- @startuml Source for image. Generated using http://www.plantuml.com/plantuml/uml/

@startuml
skinparam monochrome true
participant "Browser (User Agent)" as browser
participant "Service Provider" as sp
participant "Okta (Identity Provider)" as okta

autonumber "<b>#."
browser -> sp: Attempts to access a resource within the SP
sp -> browser: Determines higher auth needed, generates SAML request with `acr_values` parameter, sends to browser
browser -> okta: Relays SAML request to Okta
okta <-> browser: Performs required authn per `acr_values` parameter value
okta -> browser: Generates, sends SAML assertion with `acr` value and factors
browser -> sp: Relays SAML assertion to SP
sp -> browser: Sends `securitycontext`
browser -> sp: Requests access to the resource
sp -> browser: Responds with requested resource
@enduml

-->