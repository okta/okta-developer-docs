You can grant anonymous access for specific URLs by using [AllowAnonymous] on your route:

```csharp
[AllowAnonymous]
public IActionResult PublicAccess()
{
    // For all users, even anonymous ones!
    return View();
}

```
