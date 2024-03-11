const express = require('express');
const rateLimit = require('express-rate-limit');
const routes = require('./src/routes');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Rate limiter setup
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 100 requests per windowMs
});

// Apply the rate limiter to all requests
app.use(limiter);

// Using routes
app.use("/api", routes);

app.use((err, req, res, next) => {
    if (err instanceof rateLimit.RateLimitError) {
      res.status(429).json({ message: "Too many requests from this IP, please try again later." });
    } else {
      next(err);
    }
  });

app.listen(3001);

module.exports = app;
