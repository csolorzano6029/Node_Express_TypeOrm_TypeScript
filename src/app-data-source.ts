import { createConnection } from 'typeorm';
import { EmployeeEntity } from './entities';

export const myDataSource = createConnection({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'vaccination_inventory',
  entities: [EmployeeEntity], // Importa EmployeeEntity aquí
  logging: true,
  synchronize: false,
});

export default myDataSource;
