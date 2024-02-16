import myDataSource from '../app-data-source';
import { EmployeeEntity } from '../entities';
import { Repository } from 'typeorm';

export class EmployeeRepository {
  private repository: Repository<EmployeeEntity>;
  constructor() {
    this.repository = myDataSource.getRepository(EmployeeEntity);
  }

  findEmployeeByEmail(email: string): Promise<EmployeeEntity> {
    return this.repository
      .createQueryBuilder('employee')
      .where('employee.email = :email', { email })
      .getOne();
  }

  findAll(): Promise<EmployeeEntity[]> {
    return this.repository.find();
  }
}
