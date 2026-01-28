import express from 'express';
import routes from './routes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';
import errorHandler from './middlewares/errorHandler.js';
import cors from 'cors';


const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Apenas inicia o servidor se não estiver rodando testes
if (process.env.NODE_ENV !== 'test') {
  app.listen(3000, () => {
    console.log('API rodando em http://localhost:3000');
    console.log('Swagger em http://localhost:3000/api-docs');
  });
}

// Exporta o app para supertest/Jest
export default app;
