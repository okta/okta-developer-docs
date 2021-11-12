To require authentication for the entire App add the following to `Imports.razor`

```html
@using Microsoft.AspNetCore.Authorization
@attribute [Authorize]
```

Add this attribute to `Authentication.razor` component:

```html
@attribute [AllowAnonymous]
```