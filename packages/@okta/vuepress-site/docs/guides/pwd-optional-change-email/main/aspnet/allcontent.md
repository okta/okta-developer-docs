Allowing a user to change their primary email is a critical task when they only use their username and email address to sign in to your app. A user must be able to change their email address, especially if it becomes compromised.

Use <StackSnippet snippet="mgmtsdklink" inline/> to update the user's profile information with a new primary email address. Set the user's `Profile.Email` property to the new email address and then call `user.UpdateAsync()` to update it on the Okta servers.

```csharp
using Okta.Sdk;

public async IUser UpdateUserEmail(IUser user, string newEmail)
{
    user.Profile.Email = newEmail;
    return await user.UpdateAsync();
}
```

> **Note**: The <StackSnippet snippet="mgmtsdklink" inline/> uses the [Users API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/User/#tag/User/operation/updateUser) to update the user's profile information.
