const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'], // an array of origins or 'ignore'
      }
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server is running at ${server.info.uri}`);
};

init();