---
title: Next Steps
---

This was a first example of using the functionality of the Import Inline Hook.

For complete details on supported command syntax, see the [Import Inline Hook](/use_cases/inline_hooks/import_hook/import_hook/) reference page.

In addition to modifying Okta user profile attributes, the commands supported by the hook enable you to modify app user profile attributes. You can also determine whether Okta should treat the incoming user as a match for an existing user and, if so, for which one.

Although the example discussed in this guide checked for conflict, and used that as the basis for changing a profile attribute, the hook can also be used to set profile attributes for each user that comes in. The values could come from other software systems in your organization.

