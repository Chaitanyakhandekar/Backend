# Day 2 – Backend Development Summary

## 1. CORS (Cross-Origin Resource Sharing)
- Occurs when frontend and backend are running on different origins (ports/domains).
- The backend blocks requests from unknown origins.
- **Fix**: Allow frontend origin or use a proxy in development.

## 2. Proxy
- A configuration in frontend (e.g., `vite.config.js` or `package.json`) to:
  1. Shorten API URLs.
  2. Bypass CORS errors during development.
- **Example (Vite config):**
  ```js
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }


# 3. Axios
A promise-based HTTP client for the browser and Node.js.

Used to send API requests from frontend to backend (GET, POST, etc.).

Advantages of Axios over Fetch:
Automatically handles JSON conversion.

Supports request/response interception.

Simplifies header, timeout, and config customization.

Better error handling than fetch.