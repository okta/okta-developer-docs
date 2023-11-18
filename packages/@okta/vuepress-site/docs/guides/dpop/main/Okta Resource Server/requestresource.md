Now that you have a DPoP-bound access token, create a new DPoP proof JWT to request access to Okta APIs. In the request, use the DPoP-bound access token in the `Authorization` header, and then use the new DPoP proof JWT in the `DPoP` header.

1. Base64-encode the SHA-256 hash of the DPoP-bound access token.
1. Use the [Create a JSON Web Key](#create-a-json-web-key) section above to create the JWK.
1. Use the [Create the JSON Web Token](#create-the-json-web-token) section above to create the DPoP proof JWT with a few exceptions:

    Include the following required claims in the JWT payload:

    * `htm`: HTTP method. The HTTP method of the request that the JWT is attached to. This value is always `GET`.
    * `htu`: HTTP URI. The endpoint URL for the resource that you want to access. For example: `http://${yourOktaDomain}/api/v1/${API endpoint}`.
    * `iat`: Issued at. Identifies the time at which the JWT is issued. The time appears in seconds since the Unix epoch. The Unix epoch is the number of seconds that have elapsed since January 1, 1970 at midnight UTC.
    * `ath`: The base64url-encoded SHA-256 hash of the DPoP-bound access token.



The resource server is required to calculate the hash of the token value presented and verify that it's the same as the hash value in the `ath` field. Since the `ath`` field value is covered by the DPoP proof's signature, its inclusion binds the access token value to the holder of the key used to generate the signature.

Note that the `ath` field alone does not prevent replay of the DPoP proof or provide binding to the request in which the proof is presented, and it is still important to check the time window of the proof as well as the included message parameters, such as htm and htu.


DPoP protected resource request

the validation section will need to be updated to suit validation for accessing Okta resources

The resource server verifies the JWT in the request.

ensure that the value of the `ath` claim equals the hash of that access token, and
confirm that the public key to which the access token is bound matches the public key from the DPoP proof