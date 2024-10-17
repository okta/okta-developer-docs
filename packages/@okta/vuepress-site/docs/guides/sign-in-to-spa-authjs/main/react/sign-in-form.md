Build a sign-in page that captures both the username and password. As an example, from the test application, see the `index.js` file, which renders the simple sign-in for from the `formtransformer.js` file:

```JavaScript
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
```

From the `formtransformer.js` file:

```JavaScript
const inputTransformer = nextStep => form => {
  // only process UI inputs
  const inputs = nextStep.inputs?.filter(input => !!input.label);

  if (!inputs?.length) {
    return form;
  }

  return {
    ...form,
    inputs: inputs.map(({ label, name, type, secret, required }) => {
      if (secret) {
        type = 'password';
      } else if (type === 'string') {
        type = 'text';
      } else if (type === 'boolean') {
        type = 'checkbox'
      }
      return { label, name, type, required };
    })
  };
};
```

> **Note:** This guide only reviews the sign-in use case of the test app.