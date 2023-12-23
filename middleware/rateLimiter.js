const rateLimit = require("express-rate-limit");

const rateLimiter = rateLimit({
  windowMs: 60 * 1000, // 15 minutes
  max: 5, // Max requests per window
  message: "You have exceeded your 5 requests per minute limit.",
  headers: true,
});

module.exports = rateLimiter;
