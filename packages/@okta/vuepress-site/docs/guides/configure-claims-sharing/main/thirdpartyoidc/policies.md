You can configure scenarios for authentication using claims sharing and policies using your Okta SP org and a third-party IdP.

### Authentication policy example

[Create an authentication policy and rule for your app](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-auth-policy) in your SP org. Select any two factors, don't select a possession constraint, and allow any authenticators.

Each individual AMR value represents a factor and possession property. During policy evaluation, Okta uses the AMR values to verify if the authentication policy can be satisfied.

For example, the `pwd` and `sms` AMR claims can satisfy an authentication policy configured with **Any two factors**.

> **Note:** The `mfa` AMR claim isn't mapped to any factor or property. It's defined to satisfy the authentication policy **Any two factors** configuration and to satisfy the global session policy MFA requirement. If there's any additional constraints from the authentication policy, the `mfa` AMR claim alone doesn't satisfy it. Configure your SP org to require more AMR claims.

#### Other authentication policy scenarios

* **Possession factor constraints:** If you enable any possession factor constraints in the authentication policy of your SP org, Okta uses the AMR values to satisfy the requirement. See [Supported AMR values](#supported-amr-values).

* **Authentication methods:**
  * **Allow any method that can be used to meet the requirement**: If you enable this setting in your SP org, you can satisfy the policy requirements by using any authenticator that meets those requirements. This includes authenticators that aren't configured locally in the SP org.
  * **Disallow specific authentication methods**: If you specify authentication methods to disallow, then Okta can't use AMR claims to evaluate the policy. The SP org redirects the user to verify any locally configured authenticator.
  * **Allow specific authentication methods**: If you specify authentication methods to allow, Okta can't use AMR claims to evaluate the policy. The SP org redirects the user to verify any locally configured authenticator.

### Global session policy

The global session policy works the same as the authentication policy. AMR values can satisfy the MFA requirement, depending on the AMR values sent.

### Okta Classic Engine

With AMR claims, you can use the `pwd` amr value if the Okta sign-on policy or an app sign-on policy doesn't have an MFA requirement.

If the Okta sign-on policy or an app sign-on policy requires MFA, you have two options:

1. Use the `pwd` AMR value plus any possession-based AMR value, for example, `sms`, `hwk`.
2. Use the `mfa` AMR value.

The `mfa` or `pwd` AMR value is always required for a Classic Engine flow. If these values aren't supplied, the user is prompted with the locally configured Okta authenticator.
