Use the `[Authorize]` attribute on controllers or actions to require a logged-in user:

```csharp
[Authorize]
public IActionResult Protected()
{
    // Only for logged-in users!
    return View();
}
```