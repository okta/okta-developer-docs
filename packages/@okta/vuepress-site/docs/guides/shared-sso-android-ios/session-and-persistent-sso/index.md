---
title: Session and persistent Single Sign-On
---
Single Sign-On (SSO) allows users to authenticate once and access multiple resources without being prompted for additional credentials. Okta supports both session and persistent SSO. 

**Session SSO**: Session SSO cookies are written for the authenticated user, which eliminates further prompts when the user switches applications during a particular session. However, if a particular session ends, the user is prompted for their credentials again.

**Persistent SSO**: Persistent SSO cookies are written for the authenticated user, which eliminates further prompts when the user switches applications for as long as the persistent SSO cookie is valid.

The difference between persistent SSO and session SSO is that persistent SSO can be maintained across different sessions. Persistent SSO is disabled by default in Okta. To share a sign-in session with native mobile apps, you need to enable persistent SSO. 

<StackSelector snippet="enablesso" />

<NextSectionLink/>
