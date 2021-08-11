---
title: Okta Identity Engine API Products Release Notes 2021
---
<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" /><br>

## August

### Weekly Release 2021.08.1

| Change                                                                     | Expected in Preview Orgs |
|----------------------------------------------------------------------------|--------------------------|
| [Bug fixed in 2021.08.1](#bug-fixed-in-2021-08-1)                          | August 11, 2021          |

#### Bug fixed in 2021.08.1

When Single Sign-On (SSO) was used with an IdP that included a `fromURI` parameter, an HTTP 500 error was returned. (OKTA-407425)
