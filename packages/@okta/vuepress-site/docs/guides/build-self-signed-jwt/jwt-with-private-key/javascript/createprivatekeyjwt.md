Suggested flow for content:

Create the Header
Create the Payload
Create the Signature
Put it Together

Expected claims in the example token:

`"sub": client_id,
"aud": "https://{yourOktaDomain}/oauth2/default/v1/token",
"iss": client_id,
"exp": unix_epoch(now.addMinutes(5)),
"iat": unix_epoch(now),
"jti": guid.new()`

Signed via RS256 (using the private key of a public/private keypair)