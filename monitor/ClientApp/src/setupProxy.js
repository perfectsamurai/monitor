const { createProxyMiddleware } = require('http-proxy-middleware');
const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:46628';

const context =  [
    "/api/DynamogramContoller", "/api/Account","/api/AddDynamogram"
];

module.exports = function(app) {
  const appProxy = createProxyMiddleware(context, {
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  });
    module.exports = function (app) {
        app.use(
            '/api/Account/Logout',
            createProxyMiddleware({
                target: 'http://localhost:44469', // «амените на соответствующий URL вашего сервера
                changeOrigin: true,
            })
        );
    };


  app.use(appProxy);
};
