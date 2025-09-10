const crypto = require('crypto');

// Request tracking middleware for better logging and debugging
exports.requestTracker = (req, res, next) => {
  // Generate unique request ID
  req.requestId = crypto.randomBytes(16).toString('hex');

  // Add request ID to response headers for debugging
  res.setHeader('X-Request-ID', req.requestId);

  // Log request start
  const startTime = Date.now();
  console.log(`[${req.requestId}] ${req.method} ${req.path} - ${req.ip} - Started`);

  // Track response time
  const originalSend = res.send;
  res.send = function(data) {
    const duration = Date.now() - startTime;
    console.log(`[${req.requestId}] ${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`);
    return originalSend.call(this, data);
  };

  next();
};
