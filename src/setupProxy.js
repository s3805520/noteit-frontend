const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    ['/validateCredentials','/getCredentials', '/changePassword', '/getUserData', '/addNotes','/deleteNotes','/updateNotes'],
    createProxyMiddleware({
      target: 'http://3.90.105.161:5000',
      changeOrigin: true,
    })
  );
};