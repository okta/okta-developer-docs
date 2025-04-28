---
title: SSF Transmitter SET payload structures
excerpt: Example JWT payload structures when an Okta event is fired.
---

# SSF Transmitter SET payload structures

Okta uses the [Shared Signals Framework (SSF)](https://sharedsignals.guide/) to send security-related events and other data-subject signals to third-party security vendors. In this scenario, commonly used terms for third-party vendors that receive signals are "receivers", Okta is the "transmitter", and the connection between the two entities is referred to as a "stream." Okta sends signals in the form of Security Event Tokens (SETs) to third-party SSF receivers.

To enable the transmission of signals from Okta, you must create an SSF Stream using the [SSF Transmitter API](https://preview.redoc.ly/oktadev/jk-OKTA-912817/openapi/okta-management/management/tag/SSFTransmitter/) and configure the third-party receiver to accept signals from Okta.

## Supported event types

The Okta SSF Transmitter currently supports two types of [Continuous Access Evaluation Protocol (CAEP)](https://openid.net/wg/sharedsignals/) events types: [Session Revoked](https://openid.net/specs/openid-caep-1_0-ID2.html#name-session-revoked) and [Credential Change](https://openid.net/specs/openid-caep-1_0-ID2.html#name-credential-change) events.

The following Okta event is mapped to the CAEP Session Revoked event type:

[`user.session.end`](#)

The following Okta events are mapped to the CAEP Credential Change event type:

* [`user.mfa.factor.activate`](#caep-credential-change---usermfafactoractivate)

* [`user.mfa.factor.deactivate`](#caep-credential-change---usermfafactordeactivate)

* [`user.mfa.factor.suspend`](#caep-credential-change---usermfafactorsuspend)

* [`user.mfa.factor.unsuspend`](#caep-credential-change---usermfafactorunsuspend)

* [`user.mfa.factor.update`](#caep-credential-change---usermfafactorupdate)

* [`user.mfa.factor.reset_all`](#caep-credential-change---usermfafactorreset_all)

* [`user.account.reset_password`](#caep-credential-change---useraccountreset_password)

* [`user.account.update_password`](#caep-credential-change---useraccountupdate_password)

## Security Event Token JWT schemas

Security Event Tokens are a type of JSON Web Token (JWT) that must comply with the [SET standard](https://datatracker.ietf.org/doc/html/rfc8417).

Use the following links to learn more about the SET structure that Okta delivers.

* [Security Event Token JWT header schema](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/SSFTransmitter/#tag/SSFTransmitter/schema/SecurityEventTokenJwtHeader)

* [Security Event Token JWT payload schema](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/SSFTransmitter/#tag/SSFTransmitter/schema/SecurityEventTokenJwtBody)

## Security Event Token JWT payload examples

The following are examples of the JWT payload when an Okta event is fired.

### CAEP Session Revoked - user.session.end

```json
{
   "iss":"https://org.okta.com",
   "jti":"24c63fb56e5a2d77a6b512616ca9fa24",
   "iat":1615305159,
   "aud":"https://sp.example.com/caep",
   "events":{
      "https://schemas.openid.net/secevent/caep/event-type/session-revoked":{
         "subject":{
            "user":{
               "format":"iss_sub",
               "iss":"https://org.okta.com",
               "sub":"okta-user-id1"
            }
         },
         "reason_admin":{
            "en":"Policy Violation: C076E822"
         },
         "reason_user":{
            "en":"This device is no longer compliant."
         },
         "event_timestamp":1615304991643
      }
   }
}
```

### CAEP Credential Change - user.mfa.factor.activate

```json
{
  "iss": "https://transmitter.okta.com",
  "jti": "set-07efd930f0977e4fcc1149a733ce7f78",
  "iat": 1615305159,
  "aud": "https://receiverexample.com",
  "events": {
    "https://schemas.openid.net/secevent/caep/event-type/credential-change": {
      "subject": {
        "format": "iss_sub",
        "iss": "https://transmitter.okta.com",
        "sub": "okta-user-id1"
      },
      "credential_type": "fido2-roaming",
      "change_type": "create",
      "fido2_aaguid": "accced6a-63f5-490a-9eea-e59bc1896cfc",
      "friendly_name": "FIDO_WEBAUTHN",
      "initiating_entity": "user",
      "reason_admin": {
        "en": "Activate factor for user"
      },
      "event_timestamp": 1615304991643
    }
  }
}
```

### CAEP Credential Change - user.mfa.factor.deactivate

```JSON
{
  "iss": "https://transmitter.okta.com",
  "jti": "set-07efd930f0977e4fcc1149a733ce7f78",
  "iat": 1615305159,
  "aud": "https://receiverexample.com",
  "events": {
    "https://schemas.openid.net/secevent/caep/event-type/credential-change": {
      "subject": {
        "format": "iss_sub",
        "iss": "https://transmitter.okta.com",
        "sub": "okta-user-id1"
      },
      "credential_type": "x509",
      "change_type": "delete",
      "friendly_name": "SMART_CARD",
      "initiating_entity": "user",
      "reason_admin": {
        "en": "Reset factor for user"
      },
      "event_timestamp": 1615304991643
    }
  }
}
```

### CAEP Credential Change - user.mfa.factor.suspend

```JSON
{
  "iss": "https://transmitter.okta.com",
  "jti": "set-07efd930f0977e4fcc1149a733ce7f78",
  "iat": 1615305159,
  "aud": "https://receiverexample.com",
  "events": {
    "https://schemas.openid.net/secevent/caep/event-type/credential-change": {
      "subject": {
        "format": "iss_sub",
        "iss": "https://transmitter.okta.com",
        "sub": "okta-user-id1"
      },
      "credential_type": "OKTA_VERIFY_PUSH",
      "change_type": "update",
      "friendly_name": "OKTA_VERIFY_PUSH",
      "initiating_entity": "user",
      "reason_admin": {
        "en": "Suspend factor for user"
      },
      "event_timestamp": 1615304991643
    }
  }
}
```

### CAEP Credential Change - user.mfa.factor.unsuspend

```JSON
{
  "iss": "https://transmitter.okta.com",
  "jti": "set-07efd930f0977e4fcc1149a733ce7f78",
  "iat": 1615305159,
  "aud": "https://receiverexample.com",
  "events": {
    "https://schemas.openid.net/secevent/caep/event-type/credential-change": {
      "subject": {
        "format": "iss_sub",
        "iss": "https://transmitter.okta.com",
        "sub": "okta-user-id1"
      },
      "credential_type": "phone-sms",
      "change_type": "update",
      "friendly_name": "SMS_FACTOR",
      "initiating_entity": "user",
      "reason_admin": {
        "en": "Unsuspend factor for user"
      },
      "event_timestamp": 1615304991643
    }
  }
}
```

### CAEP Credential Change - user.mfa.factor.update

```JSON
{
  "iss": "https://transmitter.okta.com",
  "jti": "set-07efd930f0977e4fcc1149a733ce7f78",
  "iat": 1615305159,
  "aud": "https://receiverexample.com",
  "events": {
    "https://schemas.openid.net/secevent/caep/event-type/credential-change": {
      "subject": {
        "format": "iss_sub",
        "iss": "https://transmitter.okta.com",
        "sub": "okta-user-id1"
      },
      "credential_type": "DUO_SECURITY",
      "change_type": "update",
      "friendly_name": "DUO_SECURITY",
      "initiating_entity": "user",
      "reason_admin": {
        "en": "Update factor for user"
      },
      "event_timestamp": 1615304991643
    }
  }
}
```

### CAEP Credential Change - user.mfa.factor.reset_all

```JSON
{
  "iss": "https://transmitter.okta.com",
  "jti": "set-07efd930f0977e4fcc1149a733ce7f78",
  "iat": 1615305159,
  "aud": "https://receiverexample.com",
  "events": {
    "https://schemas.openid.net/secevent/caep/event-type/credential-change": {
      "subject": {
        "format": "iss_sub",
        "iss": "https://transmitter.okta.com",
        "sub": "okta-user-id1"
      },
      "credential_type": "ALL_FACTORS",
      "change_type": "revoke",
      "friendly_name": "ALL_FACTORS",
      "initiating_entity": "user",
      "event_timestamp": 1615304991643
    }
  }
}
```

### CAEP Credential Change - user.account.reset_password

```JSON
{
  "iss": "https://transmitter.okta.com",
  "jti": "set-07efd930f0977e4fcc1149a733ce7f78",
  "iat": 1615305159,
  "aud": "https://receiverexample.com",
  "events": {
    "https://schemas.openid.net/secevent/caep/event-type/credential-change": {
      "subject": {
        "format": "iss_sub",
        "iss": "https://transmitter.okta.com",
        "sub": "okta-user-id1"
      },
      "credential_type": "password",
      "change_type": "revoke",
      "friendly_name": "PASSWORD_AS_FACTOR",
      "initiating_entity": "user",
      "reason_admin": {
        "en": "Fired when the user's Okta password is reset"
      },
      "event_timestamp": 1615304991643
    }
  }
}
```

### CAEP Credential Change - user.account.update_password

```JSON
{
  "iss": "https://transmitter.okta.com",
  "jti": "set-07efd930f0977e4fcc1149a733ce7f78",
  "iat": 1615305159,
  "aud": "https://receiverexample.com",
  "events": {
    "https://schemas.openid.net/secevent/caep/event-type/credential-change": {
      "subject": {
        "format": "iss_sub",
        "iss": "https://transmitter.okta.com",
        "sub": "okta-user-id1"
      },
      "credential_type": "password",
      "change_type": "revoke",
      "friendly_name": "PASSWORD_AS_FACTOR",
      "initiating_entity": "user",
      "reason_admin": {
        "en": "User update password for Okta"
      },
      "event_timestamp": 1615304991643
    }
  }
}
```
