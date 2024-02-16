import * as express from 'express';
import employeeController from './controllers/employee.controller';
import {
  errorInterceptor,
  responseInterceptor,
} from './middlewares/interceptor.middleware';

// create and setup express app
const app = express();
const PORT = 3000;

// Use middleware

app.use(responseInterceptor);

// Middleware para parsear JSON
app.use(express.json());

// Define routes
app.use('/api/v1/employee', employeeController);

app.use(errorInterceptor);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
