You can configure many scenarios for authentication using claims sharing and policies in your Okta SP and Okta IdP orgs.

### App sign-in policy example

[Create an app sign-in policy and rule for your app](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-auth-policy) in your SP org. Select **Any 2 factor types**, don't select a possession constraint, and select **Allow any method that can be used to meet the requirement**.

With trust claims enabled and your IdP org able to verify any two factors, you can satisfy the requirements in the SP org.

#### Other app sign-in policy scenarios

* **Possession factor constraints:** The IdP org must satisfy any possession factor requirements configured in the app sign-in policy of your SP org.

* **Authentication methods:**
  * **Allow any method that can be used to meet the requirement**: If you enable this setting in your SP org, you can satisfy the policy requirements by using any authenticator that meets those requirements. This includes authenticators that aren't configured locally in the SP org.
  * **Disallow specific authentication methods**: If you specify authentication methods to disallow, then the SP org disallows those methods.
  * **Allow specific authentication methods**: If you specify authentication methods to allow, then the SP org only considers those methods.

  After you define these conditions, you may still not meet the policy requirements. If you still haven't met the policy requirement, then the SP org redirects you to verify any locally configured authenticator. If there's no local authenticator available, or the enrollment policy for a particular authenticator is disabled, then the SP org displays an error.

### Global session policy example

This same concept applies to the global session policy. If trust claims aren’t enabled and only the password authenticator is configured, you can’t set a global session policy that requires MFA.

However, with trust claims enabled, you can specify MFA as required. As long as the claim is coming from the IdP, the session is established because that claim can satisfy the global session policy rule.

### Okta Identity Engine and Classic Engine orgs

If you have a combination of Okta Identity Engine and Classic Engine orgs, the rules work in the following ways:

#### Example scenario one

Your SP org is an Identity Engine org. Your IdP is a Classic Engine org. MFA from the Classic Engine org can only satisfy one of the following app sign-in policy rules on the Identity Engine SP org:

* **Any 1 factor type/IdP**
* **Any 2 factor types**

For the global session policy, MFA from the Classic Engine org can only satisfy the **Any factor used to meet the App sign-in policy requirements** rule.

#### Example scenario two

Your IdP org is an Identity Engine org. Your SP org is a Classic Engine org. The Classic Engine org only evaluates whether MFA was completed, such as if more than one factor verification was performed on the IdP org.
