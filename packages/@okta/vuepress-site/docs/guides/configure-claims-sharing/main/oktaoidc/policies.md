You can configure many scenarios for authentication using claims sharing and policies in your Okta SP and Okta IdP orgs.

### Authentication policy example

[Create an authentication policy and rule for your app](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-auth-policy) in your SP org. Select any two factors, don't select a possession constraint, and allow any authenticators.

With trust claims enabled and your IdP org able to verify any two factors, you can satisfy the requirements in the SP org.

#### Other authentication policy scenarios

* **Possession factor constraints:** If you enable any possession factor constraints in the authentication policy of your SP org, the IdP org must satisfy the requirement with appropriate factor verification.

* **Authentication methods:**
  * **Allow any method that can be used to meet the requirement**: If you enable this setting in your SP org, you can satisfy the policy requirements by using any authenticator that meets those requirements. This includes authenticators that aren't configured locally in the SP org.
  * **Disallow specific authentication methods**: If you specify authentication methods to disallow, then the SP org disallows those methods.
  * **Allow specific authentication methods**: If you specify authentication methods to allow, then the SP org only considers those methods.

  After you define these conditions, if you still haven't met the policy requirement, then the SP org redirects you to verify any locally configured authenticator. If there's no local authenticator available, or the enrollment policy for a particular authenticator is disabled, then the SP org displays an error.

### Global session policy example

This same concept applies to the global session policy. Without trust claims enabled, if you have only the password authenticator configured in the SP org, you can't save a global session policy rule that requires MFA.

However, with trust claims enabled, you can specify MFA as required. As long as the claim comes from the IdP, the session is established because that claim can satisfy the global session policy rule.

### Okta Identity Engine and Classic Engine orgs

If you have a combination of Okta Identity Engine and Classic Engine orgs, the rules work in the following ways:

#### Example scenario one

Your SP org is an Identity Engine org. Your IdP is a Classic Engine org. MFA from the Classic Engine org can only satisfy one of the following authentication policy rules on the Identity Engine SP org:

* **Any 1 factor type/IdP**
* **Any 2 factor types**

For the global session policy, MFA from the Classic Engine org can only satisfy the **Any factor used to meet the Authentication Policy requirements** rule.

#### Example scenario two

Your IdP org is an Identity Engine org. Your SP org is a Classic Engine org. The Classic Engine org only evaluates whether MFA was completed, such as if more than one factor verification was performed on the IdP org.
