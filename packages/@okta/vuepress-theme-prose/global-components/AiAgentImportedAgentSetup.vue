<template>
  <div v-pre>
    <p>
      Importing an agent from a provider platform (for example, enabling AI Agent Imports for the AWS Identity and Access Management app integration and running an import) creates an AI Agent record under <strong>Directory</strong> &gt; <strong>AI Agents</strong>. It doesn't by itself register credentials, bind a sign-on app, or configure the authorization server your token exchange code needs. Complete the following in the Admin Console before you add any integration code.
    </p>

    <h3>Register client credentials</h3>

    <ol>
      <li>Select your imported AI Agent from <strong>Directory</strong> &gt; <strong>AI Agents</strong>, and click <strong>Client registration</strong>.</li>
      <li>Click <strong>Configure</strong> in the <strong>Public/private key</strong> tile.</li>
      <li>In <strong>Step 1: Define where keys are managed</strong>, select <strong>Okta</strong>.</li>
      <li>Click <strong>Add public key</strong>, then <strong>Generate new key</strong> to have Okta generate an RSA key pair, or paste a public key you generated yourself. Click <strong>Done</strong>.</li>
      <li>Copy the private key (JSON or PEM) and store it in a secrets manager immediately. Okta shows it only once.</li>
      <li>Copy the <strong>Client ID</strong>. In <strong>Step 2: Activate for your AI agent</strong>, click <strong>Activate</strong>, then <strong>Enable</strong> in the confirmation dialog.</li>
    </ol>

    <blockquote>
      <p>
        <strong>Note:</strong> Okta doesn't retain the agent's private key after you leave this page. If you lose it, generate a new key pair.
      </p>
    </blockquote>

    <h3>Bind the OIDC app for user sign-on</h3>

    <ol>
      <li>On the agent's <strong>User access</strong> tab, select <strong>Create a new OIDC app linked to this AI agent</strong> to have Okta create and bind an OIDC web app, or <strong>Select an existing app</strong> to bind an existing SSO app.</li>
      <li>Click <strong>Save</strong>.</li>
    </ol>

    <blockquote>
      <p>
        <strong>Note:</strong> This binding is permanent. To change it, delete and recreate the AI Agent.
      </p>
    </blockquote>

    <h3>Configure machine access</h3>

    <ol>
      <li>On the agent's <strong>Machine access</strong> tab, click <strong>Configure</strong>.</li>
      <li>
        Select your custom <strong>Authorization server</strong>, and enter the <strong>Audience/resource URL</strong>. Click <strong>Save</strong>.
        <blockquote>
          <p><strong>Note:</strong> You can't edit the audience value after you save it.</p>
        </blockquote>
      </li>
      <li>Click <strong>Add caller</strong>, select the app or agent that calls this agent, choose the allowed scopes, and click <strong>Add caller</strong>. Repeat for each additional caller.</li>
    </ol>

    <h3>Activate the agent</h3>

    <p>
      From the AI agent's page, select <strong>Actions</strong> &gt; <strong>Activate</strong>, and confirm.
    </p>
  </div>
</template>

<script>
export default {
  name: "AiAgentImportedAgentSetup"
};
</script>
