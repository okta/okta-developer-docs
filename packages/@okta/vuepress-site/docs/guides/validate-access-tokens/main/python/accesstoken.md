This code uses the [Okta JWT Verifier for Python](https://github.com/okta/okta-jwt-verifier-python).

To install Okta JWT Verifier for Python, run the following command:

```sh
pip install okta-jwt-verifier
```

For any access token to be valid, the following must be asserted:

- Signature is valid. The private key signed the token, and this private key has a corresponding public key in the JWKS response from the authorization server.
- Access token isn't expired. This requires the local system time to be in sync with Okta and checks the `exp` claim of the access token.
- The `aud` claim in the JWT matches any expected `aud` claim passed in `ClaimsToValidate` during setup.
- The `iss` claim matches the issuer that the verifier is constructed with.
- Custom claim assertions that you add are confirmed.

```py
import asyncio

from okta_jwt_verifier import JWTVerifier


async def main():
    jwt_verifier = JWTVerifier('${ISSUER}', '${CLIENT_ID}', 'api://default')
    await jwt_verifier.verify_access_token('${JWT}')
    print('Token validated successfully.')


loop = asyncio.get_event_loop()
loop.run_until_complete(main())
```

You may need to adjust your clock skew leeway. Okta defaults to a `PT2M` clock skew adjustment in our validation. You can adjust this to your needs by passing `leeway` (value in seconds) argument to the `JWTVerifier` constructor:

```py
jwt_verifier = JWTVerifier('{ISSUER}', '{CLIENT_ID}', 'api://default', leeway=60)
```
