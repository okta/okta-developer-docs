---
title: Direct authentication
meta:
  - name: description
    content: An overview of what an authorization server is and the types of authorization servers available at Okta.
---

# Direct Authentication: Streamline User Access

Direct Authentication is an authentication flow that provides a streamlined and efficient method for users to access an app. Unlike traditional authentication methods that often involve redirections to identity providers (IdPs), multi-step forms, or complex protocol negotiations, Direct Authentication focuses on a concise, client-centric exchange of credentials, typically using an API. The core principle is to minimize friction and latency in the user sign-in experience while maintaining security.

## Purpose

The primary purpose of Direct Authentication is to optimize the user journey for specific application contexts where speed, simplicity, and a unified user interface are paramount. This is particularly beneficial for apps and digital services:

* **Native mobile apps**: Provide a seamless, in-app sign-in experience without external browser redirects.
* **Single-page apps (SPAs)**: Integrate authentication directly into the app's flow, avoiding full-page reloads.
* **IoT Devices and Embedded Systems**: Enable secure, programmatic authentication where a rich browser environment is unavailable.
* **API-first services**: Authenticate API consumers directly against the service's backend.
* **Low-latency environments***: Apps where even a slight delay in authentication can impact user experience or system performance.

## Key Characteristics

Direct Authentication stands apart from traditional methods due to several defining characteristics that streamline the user experience and simplify implementation in specific scenarios:

* **Client-initiated credential exchange**: The client app directly sends user credentials (for example, username/password, API key, token) to the service's authentication endpoint.
* **API-centric**: Authentication is typically performed using RESTful APIs.
* **Minimal redirection**: This significantly reduces or eliminates the need for browser redirects to IdPs, keeping the user within the app's context.
* **Potential tight coupling**: Direct Authentication can involve a tighter coupling between the client and the authentication service compared to more federated approaches.
* **Direct response**: The authentication service directly responds to the client with an authentication token (for example, JWT or OAuth token) upon successful validation.
* **Enhanced user experience**: Contributes to a faster, more fluid, and less disruptive sign-in experience.

How it Works (Illustrative Flow)

User Input: The user enters their credentials (e.g., username and password) into the client application (e.g., mobile app, web form).
Client Request: The client app constructs an API request containing these credentials (often securely encrypted or hashed) and sends it directly to the service's authentication endpoint.
Server-Side Validation: The authentication service receives the request, validates the credentials against its user store or an integrated identity management system.
Token Issuance: If validation is successful, the service generates and returns an authentication token (e.g., an access token, refresh token, or both) to the client.
Client-Side Storage and Usage: The client application securely stores the token and uses it for subsequent authenticated API requests to the service.
Error Handling: In case of invalid credentials or other issues, the service returns an appropriate error message to the client.


Advantages
Improved User Experience: Faster logins, less disruption, and a more integrated feel.
Simplified Development: Can be simpler to implement for certain client types, especially when IdP redirection flows are complex or undesirable.
Enhanced Control: Developers have more granular control over the authentication flow and user interface.
Optimized for Specific Use Cases: Ideal for native applications, SPAs, and IoT devices.
Reduced Latency: Eliminates network hops and browser redirects associated with federated authentication.
Disadvantages and Considerations
Increased Security Responsibility: The client application and backend service bear more direct responsibility for secure credential handling (storage, transmission, validation).
Credential Exposure Risk: If not implemented carefully, direct transmission of credentials can increase the risk of interception or compromise. Strong encryption (TLS/SSL) is mandatory.
Scalability of Authentication Service: The authentication service must be highly scalable to handle direct login requests from all clients.
Complexity for Federation: Less suitable for scenarios requiring complex federated identity management across multiple distinct services or organizations.
Lack of SSO (Out-of-the-Box): Does not inherently provide Single Sign-On (SSO) across disparate applications without additional custom implementation.
Compliance: May require careful consideration of compliance with various security and privacy regulations (e.g., GDPR, HIPAA) regarding direct credential handling.
Security Best Practices
Implementing Direct Authentication requires strict adherence to security best practices to mitigate inherent risks:

Always Use HTTPS/TLS: Encrypt all communication between the client and the authentication service.
Secure Credential Storage: Never store raw passwords on the client-side. Use secure methods for storing tokens (e.g., platform-specific secure storage).
Salting and Hashing Passwords: Store user passwords on the server using strong, industry-standard hashing algorithms with unique salts.
Rate Limiting and Account Lockout: Implement mechanisms to prevent brute-force attacks and credential stuffing.
Token Security: Use short-lived access tokens, implement refresh tokens, and ensure secure token invalidation.
Input Validation: Strictly validate all input received from the client to prevent injection attacks.
Auditing and Logging: Maintain comprehensive audit logs of all authentication attempts.
Multi-Factor Authentication (MFA): Integrate MFA to add an extra layer of security, even with direct authentication. This typically involves an additional step after initial credential submission.
Conclusion
Direct Authentication offers a powerful approach to optimizing the user login experience for specific application contexts, prioritizing speed and simplicity. While it provides significant advantages in terms of user experience and control, it also places a greater responsibility on developers to implement robust security measures. When carefully designed and implemented with a strong focus on security, Direct Authentication can be a highly effective and preferred method for seamless user access.






can you add in information on how a developer would implement this for their application?


Excellent suggestion! For a developer, understanding the "how-to" is crucial. Let's expand the concept piece to include implementation details.

Direct Authentication: Streamlining User Access
Concept
Direct Authentication is an authentication flow designed to provide a highly streamlined and efficient method for users to gain access to a digital service or application. Unlike traditional authentication methods that often involve redirections to identity providers (IdPs), multi-step forms, or complex protocol negotiations, Direct Authentication focuses on a concise, client-centric exchange of credentials, typically via an API. The core principle is to minimize friction and latency in the user login experience while maintaining robust security.

Purpose
The primary purpose of Direct Authentication is to optimize the user journey for specific application contexts where speed, simplicity, and a unified user interface are paramount. This is particularly beneficial for:

Native Mobile Applications: Providing a seamless, in-app login experience without external browser redirects.
Single-Page Applications (SPAs): Integrating authentication directly into the application's flow, avoiding full-page reloads.
IoT Devices and Embedded Systems: Enabling secure, programmatic authentication where a rich browser environment is unavailable.
API-First Services: Authenticating API consumers directly against the service's backend.
Low-Latency Environments: Applications where even a slight delay in authentication can impact user experience or system performance.
Key Characteristics
Client-Initiated Credential Exchange: The client application directly sends user credentials (e.g., username/password, API key, token) to the service's authentication endpoint.
API-Centric: Authentication is typically performed via RESTful APIs or similar programmatic interfaces.
Minimal Redirection: Significantly reduces or eliminates the need for browser redirects to IdPs, keeping the user within the application's context.
Tight Coupling (Potentially): Can involve a tighter coupling between the client and the authentication service compared to more federated approaches.
Direct Response: The authentication service directly responds to the client with an authentication token (e.g., JWT, OAuth token) upon successful validation.
Enhanced User Experience: Contributes to a faster, more fluid, and less disruptive login experience.
How it Works (Illustrative Flow)
User Input: The user enters their credentials (e.g., username and password) into the client application (e.g., mobile app, web form).
Client Request: The client application constructs an API request containing these credentials (often securely encrypted or hashed) and sends it directly to the service's authentication endpoint.
Server-Side Validation: The authentication service receives the request, validates the credentials against its user store or an integrated identity management system.
Token Issuance: If validation is successful, the service generates and returns an authentication token (e.g., an access token, refresh token, or both) to the client.
Client-Side Storage and Usage: The client application securely stores the token and uses it for subsequent authenticated API requests to the service.
Error Handling: In case of invalid credentials or other issues, the service returns an appropriate error message to the client.
Advantages
Improved User Experience: Faster logins, less disruption, and a more integrated feel.
Simplified Development: Can be simpler to implement for certain client types, especially when IdP redirection flows are complex or undesirable.
Enhanced Control: Developers have more granular control over the authentication flow and user interface.
Optimized for Specific Use Cases: Ideal for native applications, SPAs, and IoT devices.
Reduced Latency: Eliminates network hops and browser redirects associated with federated authentication.
Disadvantages and Considerations
Increased Security Responsibility: The client application and backend service bear more direct responsibility for secure credential handling (storage, transmission, validation).
Credential Exposure Risk: If not implemented carefully, direct transmission of credentials can increase the risk of interception or compromise. Strong encryption (TLS/SSL) is mandatory.
Scalability of Authentication Service: The authentication service must be highly scalable to handle direct login requests from all clients.
Complexity for Federation: Less suitable for scenarios requiring complex federated identity management across multiple distinct services or organizations.
Lack of SSO (Out-of-the-Box): Does not inherently provide Single Sign-On (SSO) across disparate applications without additional custom implementation.
Compliance: May require careful consideration of compliance with various security and privacy regulations (e.g., GDPR, HIPAA) regarding direct credential handling.
Implementation Guide for Developers
Implementing Direct Authentication involves coordinated efforts between the client-side application and the backend authentication service.

1. Backend Authentication Service Development
The core of Direct Authentication lies in a robust and secure backend service responsible for validating credentials and issuing tokens.

API Endpoint Design:
Create a dedicated API endpoint (e.g., /auth/login) that accepts user credentials. This endpoint should typically be a POST request.
Example Request Body (JSON):
JSON

{
  "username": "user@example.com",
  "password": "securepassword123"
}
Credential Validation:
Upon receiving a login request, the service must securely validate the provided username and password.
Never store plain-text passwords. Always hash and salt passwords before storing them in the database. Use strong, modern hashing algorithms like Argon2, bcrypt, or scrypt.
Retrieve the stored hashed password and salt for the given username.
Hash the received plain-text password with the retrieved salt and compare it to the stored hashed password.
Token Generation:
If credentials are valid, generate an authentication token. JSON Web Tokens (JWTs) are a popular choice due to their self-contained nature and verifiability.
JWT Structure (Example Claims):
sub (subject): User ID
iat (issued at): Timestamp of token issuance
exp (expiration time): Timestamp when the token expires (short-lived for access tokens)
roles (optional): User roles for authorization
iss (issuer): The authentication service itself
Sign the JWT with a strong, secret key on the server.
Token Issuance and Refresh (Optional but Recommended):
Return the generated access token to the client.
Consider issuing a separate, longer-lived refresh token. This allows the client to obtain new access tokens without requiring the user to re-enter credentials, improving user experience while maintaining short access token lifespans for security.
A dedicated refresh token endpoint (e.g., /auth/refresh-token) would accept the refresh token and issue a new access token if valid.
Error Handling:
Provide clear and generic error messages for failed login attempts (e.g., "Invalid credentials"). Avoid revealing whether the username exists or only the password was incorrect to prevent user enumeration attacks.
Implement proper HTTP status codes (e.g., 401 Unauthorized for invalid credentials).
Rate Limiting:
Implement rate limiting on the login endpoint to prevent brute-force and credential stuffing attacks. This limits the number of login attempts from a single IP address or user account within a specific timeframe.
Auditing and Logging:
Log all successful and failed authentication attempts with relevant details (timestamp, IP address, user agent). This is crucial for security monitoring and incident response.
2. Client-Side Application Implementation
The client application is responsible for collecting user input, sending it to the backend, and managing the received tokens.

User Interface (UI):
Design a clear and intuitive login form for username/email and password input.
Secure Communication:
Always use HTTPS/TLS for all communication with the authentication service. This encrypts the credentials and tokens in transit, preventing eavesdropping.
Sending Credentials:
When the user submits the form, capture the username and password.
Make an HTTP POST request to your backend's authentication endpoint (/auth/login).
Do not store plain-text passwords on the client. Send them directly from the input fields to the server.
Handling the Response:
If the login is successful, the backend will return an authentication token (e.g., JWT).
Secure Token Storage:
Web Applications (SPAs): Store the access token in localStorage or sessionStorage (for short-lived tokens), or in an HttpOnly cookie for more security (though this can make AJAX requests slightly more complex). Refresh tokens are often stored in HttpOnly cookies.
Native Mobile Applications: Use platform-specific secure storage mechanisms (e.g., iOS Keychain, Android Keystore) to store tokens. This provides a higher level of protection than plain UserDefaults or SharedPreferences.
Token Usage:
Attach the access token to subsequent API requests to protected resources. Typically, this is done by including it in the Authorization header as a Bearer token: Authorization: Bearer <your_access_token>.
Token Expiration and Refresh:
Implement logic to detect when the access token expires.
If a refresh token was issued, use it to request a new access token from the /auth/refresh-token endpoint.
If no refresh token or the refresh token itself has expired, prompt the user to log in again.
Logout Functionality:
When a user logs out, securely remove all stored tokens from the client-side storage.
Inform the backend that the session is terminated (e.g., by calling a logout endpoint that invalidates the token on the server-side, though this is less common with stateless JWTs, it's crucial for refresh tokens).
Error Display:
Display user-friendly error messages for failed login attempts (e.g., "Login failed. Please check your username and password.").
3. Integration with Multi-Factor Authentication (MFA)
To enhance security, integrate MFA into your Direct Authentication flow.

Initial Login (Factor 1): The user provides username and password as the first factor.
MFA Challenge (Factor 2): If the first factor is successful and MFA is enabled for the user, the backend generates an MFA challenge (e.g., sends an OTP via SMS, email, or a push notification to an authenticator app).
Client Response: The client prompts the user for the MFA code.
Verification: The client sends the MFA code to a separate backend endpoint (e.g., /auth/verify-mfa).
Token Issuance: If the MFA code is valid, the backend issues the final authentication token to the client.
Example Code Snippets (Illustrative - JavaScript/Node.js)
Backend (Node.js with Express and bcrypt for hashing):

JavaScript

// server.js (simplified example)
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 3000;

app.use(express.json()); // For parsing JSON request bodies

const JWT_SECRET = 'your_super_secret_jwt_key'; // **WARNING: Use a strong, unique secret from environment variables in production!**
const JWT_EXPIRATION_TIME = '1h'; // Access token expires in 1 hour
const REFRESH_TOKEN_SECRET = 'your_super_secret_refresh_key'; // **WARNING: Use a strong, unique secret from environment variables in production!**
const REFRESH_TOKEN_EXPIRATION_TIME = '7d'; // Refresh token expires in 7 days

// --- Dummy User Storage (in a real app, this would be a database) ---
const users = []; // Stores { username, hashedPassword, id }

// Dummy user registration for testing
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10); // Hash with salt
    const userId = users.length + 1;
    users.push({ id: userId, username, hashedPassword });
    res.status(201).json({ message: 'User registered successfully!' });
});

// --- Direct Authentication Login Endpoint ---
app.post('/auth/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    const user = users.find(u => u.username === username);

    if (!user) {
        // Generic error message to prevent user enumeration
        return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Generate Access Token
    const accessToken = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION_TIME,
    });

    // Generate Refresh Token
    const refreshToken = jwt.sign({ id: user.id }, REFRESH_TOKEN_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRATION_TIME,
    });

    // In a real application, refresh tokens would be stored in a secure database
    // and associated with the user for invalidation.
    // For this example, we'll just return it.

    res.status(200).json({
        message: 'Login successful!',
        accessToken,
        refreshToken,
    });
});

// --- Refresh Token Endpoint (simplified) ---
app.post('/auth/refresh-token', (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required.' });
    }

    try {
        const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
        const user = users.find(u => u.id === decoded.id);

        if (!user) {
            return res.status(403).json({ message: 'Invalid refresh token.' });
        }

        // Generate new Access Token
        const newAccessToken = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
            expiresIn: JWT_EXPIRATION_TIME,
        });

        res.status(200).json({ accessToken: newAccessToken });

    } catch (error) {
        console.error('Refresh token error:', error);
        return res.status(403).json({ message: 'Invalid or expired refresh token.' });
    }
});


// --- Protected Route Example ---
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach user info to request
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(403).json({ message: 'Invalid or expired token.' });
    }
};

app.get('/protected-data', authenticateToken, (req, res) => {
    res.status(200).json({
        message: `Welcome, ${req.user.username}! This is protected data.`,
        userId: req.user.id
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
Client-Side (React/JavaScript - simplified):

JavaScript

// App.js (simplified React component)
import React, { useState, useEffect } from 'react';

function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [protectedData, setProtectedData] = useState('');

    const API_BASE_URL = 'http://localhost:3000'; // Your backend URL

    useEffect(() => {
        // Check if user is already logged in (e.g., on page load)
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            setLoggedIn(true);
            // Optionally, try to fetch protected data to confirm token validity
            fetchProtectedData();
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken); // Store refresh token
                setLoggedIn(true);
                setMessage(data.message);
                fetchProtectedData(); // Fetch protected data after successful login
            } else {
                setMessage(data.message || 'Login failed.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setMessage('An error occurred during login.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setLoggedIn(false);
        setProtectedData('');
        setMessage('Logged out successfully.');
    };

    const fetchProtectedData = async () => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            setProtectedData('Not authenticated.');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/protected-data`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            if (response.status === 403) { // Token expired or invalid
                const refreshToken = localStorage.getItem('refreshToken');
                if (refreshToken) {
                    await refreshAccessToken(refreshToken);
                    // Retry fetching data after refresh
                    const newAccessToken = localStorage.getItem('accessToken');
                    if (newAccessToken) {
                        const retryResponse = await fetch(`${API_BASE_URL}/protected-data`, {
                            headers: {
                                'Authorization': `Bearer ${newAccessToken}`,
                            },
                        });
                        if (retryResponse.ok) {
                            const data = await retryResponse.json();
                            setProtectedData(data.message);
                        } else {
                            handleLogout(); // Failed even after refresh
                            setMessage('Session expired. Please log in again.');
                        }
                    } else {
                        handleLogout();
                        setMessage('Session expired. Please log in again.');
                    }
                } else {
                    handleLogout();
                    setMessage('Session expired. Please log in again.');
                }
            } else if (response.ok) {
                const data = await response.json();
                setProtectedData(data.message);
            } else {
                setProtectedData(`Error fetching data: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error fetching protected data:', error);
            setProtectedData('An error occurred while fetching data.');
        }
    };

    const refreshAccessToken = async (refreshToken) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken }),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('accessToken', data.accessToken);
                return true;
            } else {
                console.error('Failed to refresh token:', data.message);
                return false;
            }
        } catch (error) {
            console.error('Refresh token API error:', error);
            return false;
        }
    };

    return (
        <div>
            <h1>Direct Authentication Example</h1>
            {message && <p style={{ color: 'red' }}>{message}</p>}

            {!loggedIn ? (
                <form onSubmit={handleLogin}>
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            ) : (
                <div>
                    <p>You are logged in!</p>
                    <button onClick={handleLogout}>Logout</button>
                    <button onClick={fetchProtectedData}>Fetch Protected Data</button>
                    {protectedData && <p>Protected Data: {protectedData}</p>}
                </div>
            )}
        </div>
    );
}

export default App;
This expanded section provides a practical guide for developers, covering both the backend and client-side aspects, including crucial security considerations and illustrative code snippets.