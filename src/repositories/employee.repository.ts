import { EmployeeEntity } from '../entities';
import { Repository, getRepository } from 'typeorm';

export class EmployeeRepository {
  private repository: Repository<EmployeeEntity>;

  constructor() {
    this.repository = getRepository(EmployeeEntity);
  }

  findEmployeeByEmail(email: string): Promise<EmployeeEntity> {
    return this.repository
      .createQueryBuilder('employee')
      .where('employee.email = :email', { email })
      .getOne();
  }
}
