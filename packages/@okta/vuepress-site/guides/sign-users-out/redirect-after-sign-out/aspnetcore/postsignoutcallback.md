Open the controller where you handle the sign out process and add a `PostSignOut` method:

```csharp
public IActionResult PostSignOut()
{
    // Return to the home page after sign out
    return RedirectToAction("Index", "Home");
}
```