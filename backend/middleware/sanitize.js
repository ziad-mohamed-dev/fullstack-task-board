// Simple input sanitization middleware
exports.sanitizeInput = (req, res, next) => {
  // Remove potential NoSQL injection characters
  const sanitize = (obj) => {
    if (obj && typeof obj === 'object') {
      Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'string') {
          // Remove potential MongoDB operators and script tags
          obj[key] = obj[key]
            .replace(/^\$/, '') // Remove leading $ signs
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
            .trim();
        } else if (typeof obj[key] === 'object') {
          sanitize(obj[key]);
        }
      });
    }
  };

  // Sanitize request body, query, and params
  if (req.body) sanitize(req.body);
  if (req.query) sanitize(req.query);
  if (req.params) sanitize(req.params);

  next();
};
