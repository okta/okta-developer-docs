* For migrated integrations from the OIN Manager, if you need to update configured properties that aren't available in the OIN Wizard, contact <oin@okta.com>.

* The API service capability is mutually exclusive of other capabilities in a submission. If you select the API service capability, you can't select any other capability, such as SSO or provisioning. Similarly, if you select another capability, the API service option is unavailable.

* Migrated published integrations from the OIN Manager don't have some OIN Wizard restrictions. For instance:

    * Published integrations can have more than three integration variables
    * Published integrations can have variable names with uppercase letters
    * Published integrations can use `http` (instead of enforced `https`) in URLs and Expression Language-supported properties
