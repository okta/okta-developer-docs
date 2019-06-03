Suggested flow for content:

Create the Header
Create the Payload
Create the Signature
Put it Together

Expected claims in the example token:

`aud: "https://{yourOktaDomain}/oauth2/default/v1/token",
exp: unix_epoch(now.addMinutes(5)),
jti: guid.new(),
iat: unix_epoch(now),
iss: client_id,
sub: client_id,`


Signed via HS256 (shared secret is the client_secret)