## Reauthentication

Okta claims sharing doesn't currently support re-authentication, unless the identity claims sourcing policy is configured. The user isn’t prompted for re-authentication as long as the session is active.

Also, when you federate from the IdP org to the SP org’s Okta dashboard and then click **Admin**, you aren't prompted for re-authentication. The factors from the IdP are valid until the end of the session on the SP org.

<ApiLifecycle access="ea" />

You can configure Okta to redirect federated users back to the Okta IdP org when re-authentication is required. Use the [identity claims sourcing policy](/docs/concepts/policies/#identity-claims-sourcing-policies) with `refresh.redirectType` set to `FIXED`. When an [app sign-in policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-asop) or [Okta account management policy](/docs/guides/okta-account-management-policy/main/) requires re-authentication, Okta redirects the user to the Org2Org IdP that last established their Okta session.

If the identity claims sourcing policy `refresh.redirectType` is set to `NONE` (the default), Okta handles re-authentication locally.
