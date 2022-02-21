Add the following code to handle the `/profile` route in `app.js`. 

```js
app.use('/profile', (req, res) => {
  res.render('profile', { user: req.user });
});
```

Add a new file called `layout/profile.pug`, containing the following code:

```pug
extends layout

block content
  h2= "My Profile"
  br
  div
    p Hello, #{user.displayName}.
```
