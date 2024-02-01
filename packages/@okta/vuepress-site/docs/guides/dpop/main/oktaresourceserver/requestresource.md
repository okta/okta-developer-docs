## Make a request to an Okta resource

Access to an Okta resource requires more steps.

1. Hash and base64url-encode the DPoP-bound access token for use as the `ath` value.
1. Use the [Create the JSON Web Token](#create-the-json-web-token) section to create a DPoP proof JWT with the following claims:

    Include the following required claims in the JWT payload:

    * `ath`: Base64-encoded SHA-256 hash [SHS] of the DPoP-bound access token
    * `htm`: HTTP method. The HTTP method of the request that the JWT is attached to. This value is the appropriate HTTP verb for the request. For example: `GET`.
    * `htu`: HTTP URI. The endpoint URL for the resource that you want to access. For example: `http://${yourOktaDomain}/api/v1/${api_endpoint}`.
    * `iat`: <StackSnippet snippet="iat" inline />
    * `jti`: JWT ID. A unique [JWT identifier](https://www.rfc-editor.org/rfc/rfc7519#section-4.1.7) for the request.

    Example payload:

    ```json
    {
        "htm": "GET",
        "htu": "https://${yourOktaDomain}/api/v1/${api_endpoint}",
        "iat": 1516239022,
        "ath": "fUHyO2r2Z3DZ53EsNrWBb0xWXoaNy59IiKCAqksmQEo",
        "jti": "123456788"
    }
    ```

    > **Note:** The `nonce` parameter isn't currently required in this DPoP JWT.

1. Build the request to the resource that you want to access. Include the following values:

    * **Authorization:** The value of the original DPoP-bound access token
    * **DPoP:** The value of the new DPoP proof JWT

    Request example (some values are truncated for brevity):

    ```bash
    curl --request GET
    --url 'https://${yourOktaDomain}/api/v1/${api_endpoint}' \
    --header 'Accept: application/json' \
    --header 'Authorization: DPoP Kz~8mXK1EalY.....H-LC-1fBAo4Ljp~zsPE_NeOgxU' \
    --header 'DPoP: eyJ0eXAiOiJkcG9w.....H8-u9gaK2-oIj8ipg' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --data 'redirect_uri=https://${yourOktaDomain}/app/' \
    ```
