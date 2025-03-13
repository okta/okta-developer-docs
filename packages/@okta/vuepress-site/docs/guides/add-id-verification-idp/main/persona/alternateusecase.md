#### Verify user identity only when they enroll an authenticator

```
accessRequest.operation == 'enroll'
```

#### Verify user identity only when they reset their password

```
accessRequest.authenticator.key == 'okta_password' && accessRequest.operation == 'recover'
```

#### Verify user identity only when they enroll phishing-resistant authenticators

```
{
  'okta_verify',
  'webauthn',
  'smart_card_idp',
  'yubikey_token'
}.contains(accessRequest.authenticator.key) &&
accessRequest.operation == 'enroll'
```