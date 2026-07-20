Build a sign-in page that renders whichever fields the current step needs. This password-only flow asks for `username` first and `password` second. See the test application's `main.jsx` file, which renders the sign-in form using `formTransformer.js`:

```JavaScript
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
```

From the `formTransformer.js` file:

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