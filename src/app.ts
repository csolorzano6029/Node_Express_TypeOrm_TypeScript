import * as express from 'express';
import { myDataSource } from './app-data-source';
import { getEmployeeByEmail } from './controllers';

// create and setup express app
const app = express();
const PORT = 3000;

// establish database connection
myDataSource
  .then((connection) => {
    console.log('Data Source has been initialized!');
  })
  .then((connection) => {
    console.log('Connected to database');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });

app.get('/api/v1/employee/email', getEmployeeByEmail);

app.use(express.json());

export default app;
