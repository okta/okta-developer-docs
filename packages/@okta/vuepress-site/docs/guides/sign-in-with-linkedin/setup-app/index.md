---
title: Set Up a LinkedIn App
---

> **Important:** LinkedIn is deprecating their Social Login V1 API on March 1, 2019. Functionality to add new LinkedIn identity providers has been disabled while we upgrade to LinkedIn's Social Login V2 API.

1.1. Go to <https://developer.linkedin.com/> and register for a developer account if you haven't already done so.

1.2. Create a LinkedIn app here: <https://www.linkedin.com/developer/apps>.

1.3. Save the OAuth client ID and secret values so you can add them to the Okta configuration in the next section.

1.4. Under "Default Application Permissions", make sure that `r_basicprofile` and `r_emailaddress` are selected. You can leave the "Authorized redirect URLs" section blank for now, you will return to it later.

<NextSectionLink/>
