---
title: Check against data store
---

In this scenario, a pre-populated static array of patient names and patient IDs (`patients`) is used to simulate a real-world data store. The user name included with the Okta request is checked against this array. If the user name in the request matches a value in the `patients` array, the associated patient ID is stored as a variable, `patientID`.

> **Note:** Modify this data store to make sure it contains one or more user names that are assigned to your application in your Okta org.

<StackSelector snippet="check-patients"/>

<NextSectionLink/>