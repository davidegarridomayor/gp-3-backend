const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API Documentation",
    version: "1.0.0",
    description: "This is the API documentation for our application.",
  },
  servers: [
    {
      url: "http://localhost:3001",
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/v1/*.js"], // Adjust the path as needed
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = [swaggerUi.serve, swaggerUi.setup(swaggerSpec)];

module.exports = { swaggerDocs };
