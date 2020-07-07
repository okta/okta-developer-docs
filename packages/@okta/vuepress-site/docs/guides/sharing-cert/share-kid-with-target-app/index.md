---
title: Share the source app's key credential ID with the target app
---

Share the source app's `kid` with the target app. This clones an X.509 certificate for an application key credential from a source application to a target application. The `targetAid`is the target app's ID.

Request:

`POST /api/v1/apps/0oa8ae1t5yev2ajDs0h7/credentials/keys/w__Yr9AElCftDtLP5CmjzZFMKXndqHtx7B3QPkg8jrI/clone?targetAid=0oa8ae0dv4RGQvjyZ0h7`

Response:

```json
{
  "created": "2016-10-03T16:07:02.000Z",
  "lastUpdated": "2016-10-03T16:07:02.000Z",
  "expiresAt": "2018-09-30T22:16:14.000Z",
  "x5c": [
    "MIIDojCCAoqgAwIBAgIGAVd9K1ggMA0GCSqGSIb3DQEBBQUAMIGRMQswCQYDVQQGEwJVUzETMBEGA1
     UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEUMBIG
     A1UECwwLU1NPUHJvdmlkZXIxEjAQBgNVBAMMCW15c3RpY29ycDEcMBoGCSqGSIb3DQEJARYNaW5mb0
     Bva3RhLmNvbTAeFw0xNjA5MzAyMjE1MTVaFw0xODA5MzAyMjE2MTRaMIGRMQswCQYDVQQGEwJVUzET
     MBEGA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YT
     EUMBIGA1UECwwLU1NPUHJvdmlkZXIxEjAQBgNVBAMMCW15c3RpY29ycDEcMBoGCSqGSIb3DQEJARYN
     aW5mb0Bva3RhLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALUSyecgvygBYkjCp3
     dvz1aiYgcCxkTJi/SpuRFcqTcn4na4WeLPjUaTZwvkwQ71rb5MzNfRvNxLutSw7E+VhMtcNh5CcSZa
     J3JT20zHXxvL7fuVqCH9xA/4OPUrqgYNOF4cluBT9Kt1jdAq+XVs2hllm9yTIr0WETb8PvFyjvj+is
     qjRxOxVV638uhKsIhbb8nLghBUT5uoL3gQvBzuHy4WM0exXM+UPvBmRsIHp5CdfN+G6cxkgDN/gQha
     Fd03nStu8cz03VnJQsLy4vW8CkVnBAQdacUYlInStGqm3fB9Piq6oYRhYYANDqkFRlpxK/3HfboUlY
     Xk4+VYMEggXhkCAwEAATANBgkqhkiG9w0BAQUFAAOCAQEAEk2kiqV6T1D7ujWq6krMr7FX8j6yEag8
     j/C9X7WkPrCH655/jbi8/Q0+j2QuNJ1iCJLHnHFiKJQfeNv3hfu9PMHG2NldRY1dLElnkFh1PMBQ6R
     Ingas1HlE+V0Q/V8Rq4OI8LjfmXm/MR+5rI/sI46882j1c27XSuONTVPnn4JX+C2zuOBBH+rbn+YNm
     FxJnSPr0LgETr/ojhLo2NAWKkBtNG/qBrDHQbvRdxURKGhLjhWUX6z6pjm1V0QILGibyPjlQazjV25
     k7gMeU+jUFeB+v9eFxJDwQYLakR1xcLkElvGyGQMT16LdjrHJB/itpZw05oJCzDT04E3dmz2TK8w=="
  ],
  "e": "AQAB",
  "n": "tRLJ5yC_KAFiSMKnd2_PVqJiBwLGRMmL9Km5EVypNyfidrhZ4s-NRpNnC-TBDvWtvkzM19G83Eu6
        1LDsT5WEy1w2HkJxJlonclPbTMdfG8vt-5WoIf3ED_g49SuqBg04XhyW4FP0q3WN0Cr5dWzaGWWb
        3JMivRYRNvw-8XKO-P6KyqNHE7FVXrfy6EqwiFtvycuCEFRPm6gveBC8HO4fLhYzR7Fcz5Q-8GZG
        wgenkJ1834bpzGSAM3-BCFoV3TedK27xzPTdWclCwvLi9bwKRWcEBB1pxRiUidK0aqbd8H0-Krqh
        hGFhgA0OqQVGWnEr_cd9uhSVheTj5VgwSCBeGQ",
  "kid": "w__Yr9AElCftDtLP5CmjzZFMKXndqHtx7B3QPkg8jrI",
  "kty": "RSA",
  "use": "sig",
  "x5t#S256": "wnhwdJl6BWlS4dCqAMSoKZI1QdSfnnUqlchQKl4QTIY"
}
```

> **Note:** If you try to clone a credential that the target app instance already has, the API responds with a 400 error code.

<NextSectionLink/>
