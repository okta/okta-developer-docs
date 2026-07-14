<template>
  <div v-pre>
    <h3>Install the token exchange dependencies</h3>

    <p>
      The module needs only a JWT library and an HTTP client. Add these to your project's <code>requirements.txt</code>:
    </p>

    <pre class="language-text"><code>PyJWT[crypto]&gt;=2.8.0
requests&gt;=2.31.0</code></pre>

    <h3>Create the token exchange module</h3>

    <p>
      Create a file named <code>token_exchange.py</code>. It reads the Okta values from the environment, signs the client assertion, and exposes two functions, <code>get_id_jag</code> and <code>get_access_token</code>, that your agent calls in order.
    </p>

    <pre class="language-python"><code><span class="token string">"""Okta token exchange for AI agents.

Turns a signed-in user's id_token into a scoped access_token:
  id_token -&gt; ID-JAG (org AS) -&gt; access_token (custom AS)

Exposes get_id_jag() and get_access_token(). No platform dependencies.
"""</span>

import json, os, time, uuid
import jwt
import requests
from jwt.algorithms import RSAAlgorithm

<span class="token comment"># --- Okta configuration (from environment) ---</span>
OKTA_DOMAIN = os.environ[<span class="token string">"OKTA_DOMAIN"</span>]                       <span class="token comment"># for example, example.okta.com</span>
CUSTOM_AS_ID = os.environ.get(<span class="token string">"OKTA_CUSTOM_AS_ID"</span>, <span class="token string">"default"</span>)
REQUESTED_SCOPE = os.environ.get(<span class="token string">"OKTA_SCOPE"</span>, <span class="token string">"xaa:read"</span>)
AGENT_CLIENT_ID = os.environ[<span class="token string">"AGENT_CLIENT_ID"</span>]
AGENT_KEY_ID = os.environ[<span class="token string">"AGENT_KEY_ID"</span>]
AGENT_PRIVATE_KEY_JWK = json.loads(os.environ[<span class="token string">"AGENT_PRIVATE_KEY_JWK"</span>])

ORG_TOKEN_URL = <span class="token string">f"https://{OKTA_DOMAIN}/oauth2/v1/token"</span>
CUSTOM_AS_TOKEN_URL = <span class="token string">f"https://{OKTA_DOMAIN}/oauth2/{CUSTOM_AS_ID}/v1/token"</span>
CUSTOM_AS_AUDIENCE = <span class="token string">f"https://{OKTA_DOMAIN}/oauth2/{CUSTOM_AS_ID}"</span>


def build_client_assertion(audience: str) -&gt; str:
    <span class="token string">"""Sign a short-lived client assertion JWT for the given token endpoint."""</span>
    private_key = RSAAlgorithm.from_jwk(json.dumps(AGENT_PRIVATE_KEY_JWK))
    now = int(time.time())
    return jwt.encode(
        {
            <span class="token string">"iss"</span>: AGENT_CLIENT_ID,
            <span class="token string">"sub"</span>: AGENT_CLIENT_ID,
            <span class="token string">"aud"</span>: audience,        <span class="token comment"># must match the endpoint this assertion is sent to</span>
            <span class="token string">"iat"</span>: now,
            <span class="token string">"exp"</span>: now + 300,       <span class="token comment"># valid for 5 minutes</span>
            <span class="token string">"jti"</span>: str(uuid.uuid4()),
        },
        private_key,
        algorithm=<span class="token string">"RS256"</span>,
        headers={<span class="token string">"kid"</span>: AGENT_KEY_ID},
    )


def get_id_jag(id_token: str) -&gt; str:
    <span class="token string">"""Step 1: exchange the user's id_token for an ID-JAG at the org AS."""</span>
    r = requests.post(ORG_TOKEN_URL, data={
        <span class="token string">"grant_type"</span>: <span class="token string">"urn:ietf:params:oauth:grant-type:token-exchange"</span>,
        <span class="token string">"client_assertion_type"</span>: <span class="token string">"urn:ietf:params:oauth:client-assertion-type:jwt-bearer"</span>,
        <span class="token string">"client_assertion"</span>: build_client_assertion(ORG_TOKEN_URL),
        <span class="token string">"subject_token"</span>: id_token,
        <span class="token string">"subject_token_type"</span>: <span class="token string">"urn:ietf:params:oauth:token-type:id_token"</span>,
        <span class="token string">"requested_token_type"</span>: <span class="token string">"urn:ietf:params:oauth:token-type:id-jag"</span>,
        <span class="token string">"scope"</span>: REQUESTED_SCOPE,
        <span class="token string">"audience"</span>: CUSTOM_AS_AUDIENCE,
    }, timeout=10)
    r.raise_for_status()
    return r.json()[<span class="token string">"access_token"</span>]  <span class="token comment"># the ID-JAG</span>


def get_access_token(id_jag: str) -&gt; str:
    <span class="token string">"""Step 2: exchange the ID-JAG for a scoped access token at the custom AS."""</span>
    r = requests.post(CUSTOM_AS_TOKEN_URL, data={
        <span class="token string">"grant_type"</span>: <span class="token string">"urn:ietf:params:oauth:grant-type:jwt-bearer"</span>,
        <span class="token string">"client_assertion_type"</span>: <span class="token string">"urn:ietf:params:oauth:client-assertion-type:jwt-bearer"</span>,
        <span class="token string">"client_assertion"</span>: build_client_assertion(CUSTOM_AS_TOKEN_URL),
        <span class="token string">"assertion"</span>: id_jag,
    }, timeout=10)
    r.raise_for_status()
    return r.json()[<span class="token string">"access_token"</span>]  <span class="token comment"># scoped access token for the resource</span></code></pre>

    <p>A few details that this module encodes:</p>

    <ul>
      <li>
        The client assertion function is invoked twice. <code>build_client_assertion</code> is called once per step, each time with the <code>aud</code> set to the token endpoint it targets: the org token URL for Step 1, and the custom authorization server token URL for Step 2. The <code>kid</code> header must match the public JWK registered on the agent.
      </li>
      <li>
        The <code>audience</code> parameter in Step 1 is the custom authorization server's issuer URL (<code>https://{yourOktaDomain}/oauth2/{custom-as-id}</code>), not its token endpoint.
      </li>
      <li>
        Step 1 requires the Okta imported AI Agent client. An OIDC app client can't perform this exchange.
      </li>
    </ul>

    <blockquote>
      <p>
        <strong>Note:</strong> For production workloads, cache the ID-JAG and access token in process until their <code>exp</code> claim expires. This avoids a fresh two-step exchange on every user request.
      </p>
    </blockquote>
  </div>
</template>

<script>
export default {
  name: "AiAgentTokenExchangeModule"
};
</script>
