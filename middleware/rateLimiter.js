const rateLimit = require("express-rate-limit");

const rateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minutes
  max: 10, // Max requests per window
  message: "You have exceeded your 10 requests per minute limit.",
  headers: true,
});

module.exports = rateLimiter;
