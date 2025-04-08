// utils/auth.js

/**
 * Checks if the user is authenticated by verifying the JWT token
 * @param {Request} req - The NextJS request object
 * @returns {boolean} - Returns true if the user is authenticated
 */
export const isAuthenticated = (req) => {
  // Get token from different possible locations
  const authHeader = req.headers.get("authorization");
  const token = authHeader ? authHeader.split(" ")[1] : null;

  // If no token was found in the header, check localStorage
  // (only works on client-side)
  let localToken = null;
  if (typeof window !== "undefined") {
    localToken = localStorage.getItem("token");
  }

  // Use the most recently available token
  const activeToken = token || localToken;

  if (!activeToken) {
    return false;
  }

  try {
    // Basic validation - check if the token is in proper JWT format
    // A proper JWT token has 3 parts separated by dots
    const tokenParts = activeToken.split(".");
    if (tokenParts.length !== 3) {
      return false;
    }

    // Check if token is expired
    // Parse the payload (middle part) of the JWT
    const payload = JSON.parse(atob(tokenParts[1]));

    // Check if token has expired
    const expirationTime = payload.exp * 1000; // Convert to milliseconds
    if (Date.now() >= expirationTime) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Token validation error:", error);
    return false;
  }
};
