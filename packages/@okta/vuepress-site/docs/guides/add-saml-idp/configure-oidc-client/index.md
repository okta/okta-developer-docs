---
title: Configure the OpenID Connect Client Application
---

Look in your Okta org for the OpenID Connect client app you identified or created in the Prerequisites section. Users that sign in for the first time are created in Okta and associated with this application.

1. Assign the app to everyone (the default on creation) or a particular group that you'd like your new SAML users to be associated with. If you want to change the default assignment from **Everyone**, modify the app assignment from the Developer Console:

    1. Select **Applications**.
    2. Select the application you wish to modify.
    3. Select **Assign** and choose  **Assign to Groups**.
    4. Search for the appropriate group name. If this app is already assigned to the group, the name doesn't appear in the search box.

2. Select **General** and copy the **Client ID** (`client_id`) of the application for use in the next step.

<NextSectionLink/>
