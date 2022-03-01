Add the following two routes near the bottom of `server.js`:

```js
app.get('/api/hello', (req, res) => {
    res.send('Hello world!');
});

app.get('/api/whoami', (req, res) => {
    res.json(req.jwt?.claims);
});
```
