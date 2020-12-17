The package requires you to provide a new set of data in your okta.yaml file or environment variables

```yaml
okta:
  idx:
    issuer: {authorizationServerIssuer}
    clientId: {yourClientId}
    clientSecret: {yourClientSecret}
    scopes:
      - openid
      - profile
    redirectUri: https://okta.com
```

```bash
OKTA_IDX_CLIENTID={yourClientId}
OKTA_IDX_CLIENTSECRET={yourClientSecret}
OKTA_IDX_ISSUER={authorizationServerIssuer}
OKTA_IDX_SCOPES=openid profile
OKTA_IDX_REDIRECTURI=https://okta.com
```

