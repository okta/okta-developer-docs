Use the `Authorize` attribute on controllers or actions to require a logged-in user:

```csharp
[Authorize]
public ActionResult Protected()
{
    // Only for logged-in users!
    return View();
}
```