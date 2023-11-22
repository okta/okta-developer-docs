If presented to an Okta protected resource in conjunction with an access token, The Okta resource server verifies that:<br>
<br>

* The value of the `ath` claim equals the hash of the access token
* The public key to which the access token is bound matches the public key from the DPoP proof

The Okta resource server calculates the hash of the token value presented and verifies that it's the same as the hash value in the `ath` field. Since the `ath` field value is covered by the DPoP proof's signature, its inclusion binds the access token value to the holder of the key used to generate the signature.
