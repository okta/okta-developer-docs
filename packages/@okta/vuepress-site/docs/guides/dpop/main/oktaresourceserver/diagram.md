<div class="three-quarter">

![Sequence diagram that displays communication between the client, authorization server, and Okta for Demonstrating Proof-of-Possession](/img/authorization/DPoPOktaResource.png)

</div>

<!-- https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?type=design&node-id=4459-34299&mode=design&t=QeayUk85pzPPTezF-4 -->

<!-- Source for image. Generated using http://www.plantuml.com/plantuml/uml/

@startuml
skinparam monochrome true
participant "OIDC client" as client
participant "Authorization server" as as
participant "Okta" as okta

autonumber "<b>#."
client -> client: Generates public/private key pair for use with DPoP
client -> client: Adds public key to JWT header and signs JWT with private key
client -> as: Adds JWT to `DPoP` request header and sends request to token endpoint
as -> client: Observes no `nonce` in DPoP JWT, returns error with `dpop-nonce` header
client -> as: Adds `nonce` and `jti` values to JWT payload and sends request again
as -> client: Binds public key to access token and sends response
client -> client: Hashes and then base64-encodes the `access_token` for the `ath` claim
client -> client: Creates new DPoP proof JWT with new claims, values
client -> okta: Adds original DPoP-bound access token to **Authorization** request header, new JWT to **DPoP** header
client -> okta: Sends request to access Okta protected resource
okta -> client: Validates the DPoP-bound access token and grants access to resource
@enduml

-->

> **Note:** These steps assume that you've already made a request to the `/authorize` endpoint to obtain the authorization code for the [Authorization Code with PKCE](/docs/guides/implement-grant-type/authcodepkce/main/) flow.

1. The client generates a public/private key pair for use with DPoP.
1. The client adds the public key in the header of the JWT and signs the JWT with the private key.
1. The client adds the JWT to the `DPoP` request header and sends the request to the `/token` endpoint for an access token.
1. The Okta org authorization server observes no `nonce` in the `DPoP` JWT and returns an error with `dpop-nonce`.
1. The client adds the `nonce` and `jti` values to the JWT payload, updates the request header with the new JWT value, and sends the access token request again.
1. The org authorization server binds the public key to the access token and sends the response.
1. The client hashes and then Base64-encodes the access token for use with the `ath` claim.
1. The client creates a DPoP proof JWT with the `ath` claim. The client also adds the appropriate HTTP verb for `htm` and the endpoint URL for the resource as the value for `htu`.
1. The client sends an access request to the Okta resource. The client includes the DPoP-bound access token as the Authorization request header (**Authorization:** DPoP ${token_value}) and the DPoP proof JWT as the **DPoP:** header.
1. Okta validates the `ath` claim and the DPoP proof JWT. When validation is successful, Okta grants access to the resource.
