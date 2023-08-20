import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  failOnErrors: true,
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Takehome Test Express API with Swagger',
      version: '0.1.0',
      description:
        'This is a simple API application made with Express and documented with Swagger for the the Takehome Test.',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Wanna Wannasin',
        url: 'https://github.com/DIALQGUE',
        email: 'fang.wanna.wannasin@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: ['./config/openAPI.yaml'],
};

export const swaggerSpecs = swaggerJsdoc(options);
