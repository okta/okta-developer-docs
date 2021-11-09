Use the following Razor component (add it to `Pages/Profile.razor`) as an example of how to access user profile claims.

```html
@page "/profile"
<AuthorizeView>
    <Authorized>
        <h3>Profile</h3>

        <table class="table">
            <thead>
                <tr>
                    <th>Key</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                @foreach (var claim in context.User.Claims)
                {
                    <tr>
                        <td>@claim.Type</td>
                        <td>@claim.Value</td>
                    </tr>
                }
            </tbody>
        </table>
    </Authorized>
    <NotAuthorized>
        You are not signed in!
    </NotAuthorized>
</AuthorizeView>
```