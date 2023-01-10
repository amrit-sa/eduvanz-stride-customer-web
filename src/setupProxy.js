const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.REACT_APP_HEROKU_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    '/uploadpdf',
    createProxyMiddleware({
      target: 'http://s-edvnz-bank-api.sg-s1.cloudhub.io/api/bank/statement/',
      changeOrigin: true,
    })
  );
};