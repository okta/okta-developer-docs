This code uses the [Okta JWT Verifier for Python](https://github.com/okta/okta-jwt-verifier-python).

To install Okta JWT Verifier for Python run the following command:
```sh
pip install okta-jwt-verifier
```

For any access token to be valid, the following must be asserted:

- Signature is valid (the token was signed by a private key which has a corresponding public key in the JWKS response from the authorization server).
- Access token isn't expired (requires local system time to be in sync with Okta, checks the exp claim of the access token).
- The `aud` claim in the JWT matches any expected `aud` claim passed in `ClaimsToValidate` during setup.
- The `iss` claim matches the issuer the verifier is constructed with.
- Any custom claim assertions that you add are confirmed


```py
import asyncio

from okta_jwt_verifier import JWTVerifier


async def main():
    jwt_verifier = JWTVerifier('{ISSUER}', '{CLIENT_ID}', 'api://default')
    await jwt_verifier.verify_access_token('{JWT}')
    print('Token validated successfully.')


loop = asyncio.get_event_loop()
loop.run_until_complete(main())
```

You may need to adjust your clock skew leeway. We default to a `PT2M` clock skew adjustment in our validation. You can adjust this to your needs by passing `leeway` (value in seconds) argument to JWTVerifier constructor:

```py
jwt_verifier = JWTVerifier('{ISSUER}', '{CLIENT_ID}', 'api://default', leeway=60)
```
