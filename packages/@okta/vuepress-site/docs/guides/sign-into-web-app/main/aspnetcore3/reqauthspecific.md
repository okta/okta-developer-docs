Use the `[Authorize]` attribute on controllers or actions to require a signed-in user:

```csharp
[Authorize]
public IActionResult Protected()
{
    // Only for signed-in users!
    return View();
}
```
