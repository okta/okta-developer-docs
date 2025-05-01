---
title: SSF Transmitter SET payload structures
excerpt: Example JWT payload structures when an Okta event is fired.
---

# SSF Transmitter SET payload structures

Okta uses the [Shared Signals Framework (SSF)](https://openid.net/specs/openid-sharedsignals-framework-1_0-ID3.html) to send security-related events and other data-subject signals to third-party security vendors.

To enable the transmission of signals from Okta, you must create an [SSF stream](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/SSFTransmitter/#tag/SSFTransmitter/operation/createSsfStream) using the [SSF Transmitter API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/SSFTransmitter/). Then, configure the third-party receiver to accept signals from Okta.

> **Note:** See [Configure a shared signal transmitter](https://help.okta.com/oie/en-us/content/topics/apps/apps-add-applications.htm?cshid=csh-config-ssf-transmitter) to use the Admin Console to configure an SSF transmitter.

## Supported events

The Okta SSF Transmitter currently supports two types of [Continuous Access Evaluation Protocol (CAEP)](https://openid.net/wg/sharedsignals/) events: [Session Revoked](https://openid.net/specs/openid-caep-1_0-ID2.html#name-session-revoked) and [Credential Change](https://openid.net/specs/openid-caep-1_0-ID2.html#name-credential-change). Those events are mapped to an Okta event.

The following [Okta event](https://developer.okta.com/docs/reference/api/event-types/?q=user.session.end) is mapped to the CAEP Session Revoked event: `user.session.end`

The following [Okta events](https://developer.okta.com/docs/reference/api/event-types/) are mapped to the CAEP Credential Change event:

* `user.mfa.factor.activate`

* `user.mfa.factor.deactivate`

* `user.mfa.factor.reset_all`

* `user.mfa.factor.suspend`

* `user.mfa.factor.unsuspend`

* `user.mfa.factor.update`

* `user.account.reset_password`

* `user.account.update_password`

## SET JWT schemas

SETs are a type of JSON Web Token (JWT) that must comply with the [SET RFC](https://datatracker.ietf.org/doc/html/rfc8417).

Use the following links to learn more about the SET structure that Okta supports:

* [Security Event Token JWT header schema](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/SSFTransmitter/#tag/SSFTransmitter/schema/SecurityEventTokenJwtHeader)

* [Security Event Token JWT payload schema](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/SSFTransmitter/#tag/SSFTransmitter/schema/SecurityEventTokenJwtBody)

## SET JWT payload examples

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
