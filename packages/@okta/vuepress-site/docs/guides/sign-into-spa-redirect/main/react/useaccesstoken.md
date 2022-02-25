The recommended way to add your access token to HTTP calls in React is to add it to the headers in your `fetch()` call. To follow security best practices, the access token should only be added on calls to allowed origins.

For example:

```ts
async componentDidMount() {
  try {
    const response = await fetch('http://localhost:{serverPort}/api/messages', {
      headers: {
        Authorization: 'Bearer ' + this.props.authState.accessToken
      }
    });
    const data = await response.json();
    this.setState({ messages: data.messages });
  } catch (err) {
    // handle error as needed
  }
}
```
