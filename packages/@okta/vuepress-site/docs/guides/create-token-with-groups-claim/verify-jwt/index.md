---
title: Decode the JWT to Verify
---

### If you have an Okta Authorization Server:

Decode the JWT in the response to see that the groups are in the token. For example, this JWK contains the `groups` claim in an ID token:

```json
eyJraWQiOiJiS0U0czM3d01tQWZ5ZzQtVFJQcVg1YW50blE1ajBuNFJKcE9nSl9zT0JVIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIwMHU1dDYwaWxvT0hOOXBCaTBoNyIsInZlciI6MSwiaXNzIjoiaHR0cHM6Ly9teXN0aWNvcnAub2t0YXByZXZpZXcuY29tIiwiYXVkIjoiMG9hYnNrdmM2NDQybmt2UU8waDciLCJpYXQiOjE1MTQ0OTc3ODEsImV4cCI6MTUxNDUwMTM4MSwianRpIjoiSUQua0FlMWFzU08wM00walp0Y2ZHZGtpWGwwUW9LRHE5aHl3OE1VUU1UNGwtWSIsImFtciI6WyJwd2QiXSwiaWRwIjoiMDBvNXQ2MGlsM1V6eUllNXYwaDciLCJub25jZSI6IjQ1YzExMDJiLTM0MmUtNGZjMC04ZDllLWM0NTY0MmFlOWFkOCIsImF1dGhfdGltZSI6MTUxNDQ5NjM1MCwiZ3JvdXBzIjpbIldlc3RDb2FzdERpdmlzaW9uIl19.ACKbJZ-lbGtgBAQDhamq7K9WJzHS0WySN0R2LXSkBahWWVMU1W-oTh2xDuHmyQv6HZpk-V4epnk-OItRBQb214NsRG8AJGn5n3QGYp5xPWVXXQ_hFZSro4br6Rdn_U8iZebqs6EXpGhxG7tN9VEgB-SkAynHdy2MbQpikGWcxORSA8vQLQhDRt2VZDobienTA8zLeThzOyAmhPjELxHRHFVT1OOrEoCqUV6wlk8LfhATRlxZGm6lrlZQbqxV_PDM8u7zN0l9XV01Rh0WHO7zZ_Oq0PEeQkf-TC9x7Gl_pOuRyRfGEsrqq-ZEL6AZszxotRKQJO1nNahAhfbNESO2mg
```

Example Payload Data for the ID Token:

```JSON
{
  "sub": "00u5t60iloOHN9pBi0h7",
  "ver": 1,
  "iss": "https://${yourOktaDomain}",
  "aud": "0oabskvc6442nkvQO0h7",
  "iat": 1514497781,
  "exp": 1514501381,
  "jti": "ID.kAe1asSO03M0jZtcfGdkiXl0QoKDq9hyw8MUQMT4l-Y",
  "amr": [
    "pwd"
  ],
  "idp": "00o5t60il3UzyIe5v0h7",
  "nonce": "${yourNonceValue}",
  "auth_time": 1514496350,
  "groups": [
    "WestCoastDivision"
  ]
}
```

The ID token contains the group `WestCoastDivision` so the audience (`aud`) has access to the group information about the user.

For flows other than implicit, post to the token endpoint `https://${yourOktaDomain}/oauth2/v1/token` with the user or client that you want. Make sure the user is assigned to the app and to one of the groups from your whitelist.

If the results aren't as expected, start your troubleshooting by inspecting the System Log to see what went wrong. Also, try requesting only an ID token instead of both an ID token and an access token.


### If you have a custom Authorization Server:

Decode the JWT in the response to see that the groups are in the token. For example, this JWK contains the group claim:

```JSON
eyJraWQiOiJ2U2N0OVJ0R2g5ang5QVFfT05aNEFhM19lZ3YwVlktelJKWTZvbmE5R3o4IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIwMHU1dDYwaWxvT0hOOXBCaTBoNyIsInZlciI6MSwiaXNzIjoiaHR0cHM6Ly9teXN0aWNvcnAub2t0YXByZXZpZXcuY29tL29hdXRoMi9hdXNhaW42ejl6SWVkREN4QjBoNyIsImF1ZCI6IjBvYWJza3ZjNjQ0Mm5rdlFPMGg3IiwiaWF0IjoxNTE0NDk3MzQ2LCJleHAiOjE1MTQ1MDA5NDYsImp0aSI6IklELlo1RkhPY1BhUUI3Q3ExeXhkRElIRzhieDd0Y3gxVGxYcFdvZTY4cHpGSDgiLCJhbXIiOlsicHdkIl0sImlkcCI6IjAwbzV0NjBpbDNVenlJZTV2MGg3Iiwibm9uY2UiOiIzODBiNTgwMS05MTYzLTRjNGEtOWMyMS1kNjBhMmEzMzJhNzciLCJhdXRoX3RpbWUiOjE1MTQ0OTYzNTAsIm15Z3JvdXBXaGl0ZWxpc3QiOlsiV2VzdENvYXN0RGl2aXNpb24iXX0.X4_rs_bgmWW5cX6p-fur_EN4-Uf2hz3jZZVUgdBRUX0x64O7wbmuPXGicjfLIMH6HRx7bETPjALNoSjvUrFI1IEHBMVROZQGvAYtB5f5ge6ZvZVNk0B8Coz6h3Y9vLmZGwxOFHR0_bbQQC2j01wKKeFPjznfMxtEuBLkD2DXuF7WkHZSmMG5dp7L9LUpvwfCQ2fv1SYRQ_pRVGIxZK5jh9O2yip4LMANbayDkF0Ud8lbq9CAv3Zz4tG77Cwou87yphnHlPgHDrCRRiEbCoe6Q1l8UIfMC3kfaT2HoyJb6jvA91h89jgRbIvUEfasrLoSwUJQv-sYz302QiQdF8WZAQ
```

##### Example Payload Data for an ID Token:

```JSON
{
  "sub": "00u5t60iloOHN9pBi0h7",
  "ver": 1,
  "iss": "https://${yourOktaDomain}/oauth2/ausain6z9zIedDCxB0h7",
  "aud": "0oabskvc6442nkvQO0h7",
  "iat": 1514497346,
  "exp": 1514500946,
  "jti": "ID.Z5FHOcPaQB7Cq1yxdDIHG8bx7tcx1TlXpWoe68pzFH8",
  "amr": [
    "pwd"
  ],
  "idp": "00o5t60il3UzyIe5v0h7",
  "nonce": "${myNonceValue}",
  "auth_time": 1514496350,
  "groups": [
    "WestCoastDivision"
  ]
}
```

##### Example Payload Data for an Access Token:

```JSON
{
  "aud": "https://${yourOktaDomain}",
  "sub": "annie.jackson@acme.com",
  "iat": 1511983934,
  "exp": 1511987534,
  "cid": "0oabskvc6442nkvQO0h7",
  "uid": "00u5t60iloOHN9pBi0h7",
  "scp": [
    "openid"
  ],
  "groups": [
    "WestCoastDivision"
  ]
}
```

The ID token or access token contains the group `WestCoastDivision` so the audience (`aud`) has access to the group information about the user.

For flows other than implicit, post to the token endpoint `https://${yourOktaDomain}/oauth2/${authServerId}/v1/token` with the user or client you want. Make sure the user is assigned to the app and to one of the groups from your whitelist.

If the results aren't as expected, start your troubleshooting by inspecting the System Log to see what went wrong. Also, try requesting only an ID token instead of both an ID token and an access token.
