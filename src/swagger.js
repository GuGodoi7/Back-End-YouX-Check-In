import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de tarefas',
      version: '1.0.0',
      description: 'API simples de tarefas (To-Do)'
    }
  },
  apis: ['./src/routes.js']
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
