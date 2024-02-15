import * as express from 'express';
import { myDataSource } from './app-data-source';
import { getEmployeeByEmail } from './controllers';
import { responseInterceptor } from './middlewares/interceptor.middleware';

// create and setup express app
const app = express();
const PORT = 3000;

// Use middleware

app.use(responseInterceptor);

// Middleware para parsear JSON
app.use(express.json());

// Define routes
app.get('/api/v1/employee/email', getEmployeeByEmail);

// Establish database connection
myDataSource
  .then((connection) => {
    console.log('Data Source has been initialized!');
    console.log('Connected to database');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });

export default app;
