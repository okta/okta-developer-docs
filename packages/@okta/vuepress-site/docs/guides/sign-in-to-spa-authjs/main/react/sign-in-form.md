Build a sign-in page that captures both the username and password. As an example, from the test application, see the `index.js` file, which renders the simple sign-in form from the `formTransformer.js` file:

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