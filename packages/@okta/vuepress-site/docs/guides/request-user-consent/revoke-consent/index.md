---
title: Revoke consent for a user
---
To revoke consent for a user, you can revoke one consent that is granted or all consents that are granted. Before you begin, you need the following:

- `userId` for the user that you want to revoke a grant for. Do a [List Users](/docs/reference/api/users/#list-users) to locate the user and the `userId` that you need.
- `grantId` for the grant that you want to revoke. Do a [List Grants](/docs/reference/api/users/#list-grants) with the `userId` to locate the `grantID` that you need.

## Revoke one Grant

To revoke one grant for a user, use the `grantId` that you want to revoke for a user in a DELETE request:

**Example request**

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/{userId}/grants/{grantId}"
```

> **Note:** See [Revoke a Grant for a User](/docs/reference/api/users/#revoke-a-grant-for-a-user) for more information.

## Revoke all Grants

To revoke all grants for a user, just use the `userId` for the user in a DELETE request:

**Example request**

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/{userId}/grants"
```

> **Note:** See [Revoke all Grants for a User](/docs/reference/api/users/#revoke-all-grants-for-a-user) for more information.

<NextSectionLink/>
