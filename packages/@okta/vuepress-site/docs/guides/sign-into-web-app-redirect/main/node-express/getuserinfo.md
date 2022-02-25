1. Add the following code to handle the `/profile` route in `app.js`.

```js
app.use('/profile', (req, res) => {
  res.render('profile', { user: req.user });
});
```

2. Add a new template file called `views/profile.pug` that contains the following code:

```pug
extends layout

block content
  h2= "My Profile"
  br
  div
    p Hello, #{user.displayName}.
```
