import { DataSource } from 'typeorm';
import { EmployeeEntity } from './entities/employee.entity';

const myDataSource = new DataSource({
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

myDataSource.initialize();

export default myDataSource;
