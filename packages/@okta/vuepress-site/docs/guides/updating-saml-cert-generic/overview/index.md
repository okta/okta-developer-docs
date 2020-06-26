---
title: Overview
---

This guide covers the steps for updating the certificates of existing SAML app integrations. There are four steps to follow:

  1. List your apps and get the app id, name, and label for each app to update.<br />For each app to update, perform the following steps.<br />
  2. Generate a new application key credential.
  3. Update the key credential for the app to specify the new signing key id.
  4. Upload the new certificate to the ISV. (This step cannot be automated.)

> **Important:** After you complete the first three steps, your users cannot access the application until Step 4 is completed.

### Obtaining the Certificate for an App from a URL

You can obtain the current certificate for an app from the following URL:

`https://<your org subdomain>-admin.okta.com/admin/org/security/<application id>/cert`

Where:

`<your org subdomain>` is your organization's Okta subdomain.

`<application id>` is the application ID you used in Step 1.

> **Note:** Certificates downloaded with this method contain the Begin Certificate and End Certificate lines.

<NextSectionLink/>
