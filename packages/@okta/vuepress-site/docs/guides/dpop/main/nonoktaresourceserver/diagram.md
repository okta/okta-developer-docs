<div class="three-quarter">

![Sequence diagram that displays the back and forth between the client, authorization server, and resource server for Demonstrating Proof-of-Possession](/img/authorization/Dpopflow.png)

</div>
<!-- Figma link to image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for[…]ype=design&node-id=3812-38914&mode=design&t=0DH5bIOV514lXCA8-4 -->

<!-- Source for image. Generated using http://www.plantuml.com/plantuml/uml/

@startuml
skinparam monochrome true
participant "OIDC client" as client
participant "Authorization server" as as
participant "Resource server" as rs

autonumber "<b>#."
client -> client: Generates public/private key pair for use with DPoP
client -> client: Adds public key to JWT header and signs JWT with private key
client -> as: Adds JWT to `DPoP` request header and sends request to token endpoint
as -> client: Observes no `nonce` in DPoP JWT, returns error with `dpop-nonce` header
client -> as: Adds `nonce` and `jti` values to JWT payload and sends request again
as -> client: Binds public key to access token and sends response
client -> rs: Sends DPoP-bound access token to resource server
rs -> client: Validates the DPoP-bound access token and grants access to client
@enduml

-->

1. Client generates a public/private key pair for use with DPoP.
1. Client adds the public key in the header of the JWT and signs the JWT with the private key.
1. Client adds the JWT to the `DPoP` request header and sends the request to the `/token` endpoint for an access token.
1. The authorization server observes no `nonce` in the DPoP proof, returns an error with the `dpop-nonce` header.
1. Client adds the `nonce` and `jti` values to the JWT payload, updates the request header with the new JWT value, and sends the access token request again.
1. The authorization server binds the public key to the access token and sends the response.
1. Client sends the request for access to the resource and includes the DPoP-bound access token and the DPoP proof JWT in the header.
1. The resource validates the DPoP-bound access token by verifying that the public key of the DPoP proof JWT in the `DPoP` header matches the public key that the access token is bound to. When validation is successful, the resource grants access.
