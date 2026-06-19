* You can add Entitlement Management capabilities only if your integration also supports provisioning.

* The API service capability is mutually exclusive of other capabilities in a submission. If you selected the SSO capability, you can't select the API service capability.

* For migrated integrations from the OIN Manager, if you need to update configured properties that aren't available in the OIN Wizard, contact <oin@okta.com>.

* Migrated published integrations from the OIN Manager don't have some OIN Wizard restrictions. For instance:

    * Published integrations can have more than three integration variables
    * Published integrations can have variable names with uppercase letters
    * Published integrations can use `http` (instead of enforced `https`) in URLs and Expression Language-supported properties
