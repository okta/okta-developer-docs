The user information that Okta returns in an ID token after a user has signed in is saved automatically in `req.user`. For example, you can see all of the user's claims in `user.claims`. In this section, you'll create a simple profile page that lists all the claims returned.

1. Create a template file called **views** > **profile.pug**.
1. Replace the contents of the new file with the following code:

   ```pug
   extends layout

   block content
   h2= "My Profile"
   br
   div
      p Hello, #{user.displayName}.
   br
   table
      thead
         t
         th Claim
         th Value
      tbody
      for values, claims in user
         tr
         td #{claims}
         td #{values}
   ```

1. Open **app.js**.
1. Add the route handler for the profile page:

   ```js
   app.use('/profile', (req, res) => {
     res.render('profile', { user: req.user });
   });
   ```
