---
title: Gather Claims Information
---
When you create a JWT assertion claim for client authentication (`client_secret_jwt` or `private_key_jwt`), gather claims information for the payload section of the JWT. Claims are statements about the entity, which is typically a user and any additional data. 

| Claim    | Description                                                  | Type        |
|----------|--------------------------------------------------------------|-------------|
| aud      | Required. The full URL of the resource that you're trying to access using the JWT to authenticate. For example: `https://{yourOktaDomain}/oauth2/default/v1/token` | String  |
| exp      | Required. The token expiration time in seconds since January 1, 1970 UTC (UNIX timestamp), for example, `1555594819`. This claim fails the request if the expiration time is more than one hour in the future or if the token is already expired.            | Integer     |
| iss      | Required. The issuer of the token. This value must be the same as the `client_id` of the application that you are accessing.  | String      |
| sub      | Required. The subject of the token. This value must be the same as the `client_id` of the application that you are accessing. | String       |
| jti      | Optional. The unique token identifier. If you specify this parameter, the token can only be used once and, as a result, subsequent token requests won't succeed. | String    |
| iat      | Optional. When the token was issued in seconds since January 1, 1970 UTC (UNIX timestamp), for example, `1555591219`. If specified, it must be a time before the request is received. | Integer     |


<NextSectionLink/>