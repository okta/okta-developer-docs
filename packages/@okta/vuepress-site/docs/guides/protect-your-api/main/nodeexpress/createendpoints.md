Add the code for the endpoints to the end of `index.js`:

```js
app.get('/api/hello', (req, res) => {
    res.send('Hello world!');
});

app.get('/api/whoami', (req, res) => {
    res.json(req.jwt?.claims);
});
```
