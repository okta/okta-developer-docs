For security best practices, consider enabling **Account matching with Persistent Name ID** and disabling **Account link policy**. Disable account linking after all existing users from the external IdP have signed in to your Okta org. At this point, all links have been created.

After you disable linking, and JIT provisioning is enabled, Okta adds new users that are created in the external IdP. Okta then uses the **Persistent Name ID** to link accounts going forward.
