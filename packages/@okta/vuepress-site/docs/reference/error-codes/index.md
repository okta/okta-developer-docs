---
title: Okta API Error Codes
meta:
  - name: description
    content: Here you can find further information about the errors that the Okta API returns, sorted by error code and HTTP return code.
showToc: false
---

# Okta Error Codes and Descriptions

This document contains a complete list of all errors that the Okta API returns, as well as some general information about what causes these errors and how to resolve them.

All errors contain the follow fields:

| Property       | Description                                                                                                                             |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `errorCode`    | An Okta code for this type of error.                                                                                                    |
| `errorSummary` | A short description of what caused this error. Sometimes this will contain dynamically-generated information about your specific error. |
| `errorLink`    | A link to the section of this page that describes this error.                                                                           |
| `errorId`      | A unique identifier for this error. This can be used by Okta Support to help with troubleshooting.                                      |
| `errorCauses`  | (Optional) Further information about what caused this error.                                                                            |

<ErrorCodes />
