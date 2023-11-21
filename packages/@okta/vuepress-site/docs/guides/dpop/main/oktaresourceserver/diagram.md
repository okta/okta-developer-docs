<div class="three-quarter">

![Sequence diagram that displays the back and forth between the client, authorization server, and Okta for Demonstrating Proof-of-Possession](/img/authorization/Dpopflow.png)

</div>

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
as -> client: Verifies `DPoP` header and sends error with `dpop-nonce` header in response
client -> as: Adds `nonce` and `jti` values to JWT payload and sends request again
as -> client: Binds public key to access token and sends response
client -> okta: Sends DPoP-bound access token to Okta
okta -> client: Validates the DPoP-bound access token and grants access to resource
@enduml

-->

> **Note:** These steps assume that you've already made a request to the `/authorize` endpoint to obtain the authorization code for the [Authorization Code with PKCE](/docs/guides/implement-grant-type/authcodepkce/main/) flow.

1. Client generates a public/private key pair for use with DPoP.
2. Client adds the public key in the header of the JWT and signs the JWT with the private key.
3. Client adds the JWT to the `DPoP` request header and sends the request to the `/token` endpoint for an access token.
4. The authorization server verifies the `DPoP` header and sends back an "Authorization server requires nonce in DPoP proof"  error and includes the `dpop-nonce` header in the response.
5. Client adds the `nonce` and `jti` values to the JWT payload, updates the request header with the new JWT value, and sends the access token request again.
6. The authorization server binds the public key to the access token and sends the response.
7. Client sends the request for access to the Okta resource and includes the DPoP-bound access token and the DPoP proof JWT in the header.
8. Okta validates the DPoP-bound access token by verifying that the public key of the DPoP proof JWT in the `DPoP` header matches the public key that the access token is bound to. When validation is successful, Okta grants access.
