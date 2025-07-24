// Import the 'jsonwebtoken' package, which allows us to create and verify JSON Web Tokens (JWTs)
const jwt = require("jsonwebtoken");

// Define a function called 'generateToken' that takes a 'payload' as a parameter
// The payload usually contains user information like ID, username, or email
const generateToken = (payload) => {
  // Use jwt.sign() to generate a signed JWT (token)
  // Syntax: jwt.sign(payload, secretOrPrivateKey, [options])
  return jwt.sign(
    { payload },                // The payload (data to encode in the token). We're wrapping it in an object.
    process.env.JWT_SECRET,     // The secret key used to sign the token (from environment variables)
    {
      expiresIn: "1d",          // Optional settings: Token will expire in 1 day (you can use '1h', '7d', etc.)
    }
  );
};

// Export the generateToken function so it can be used in other files using require()
module.exports = generateToken;
