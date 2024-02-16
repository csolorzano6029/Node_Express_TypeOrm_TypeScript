import { EmployeeRepository } from '../repositories';
import { EmployeeEntity } from '../entities';

export class EmployeeService {
  private employeeRepository: EmployeeRepository;

  constructor() {
    this.employeeRepository = new EmployeeRepository();
  }

  async getEmployeeByEmail(email: string): Promise<EmployeeEntity> {
    return await this.employeeRepository.findEmployeeByEmail(email);
  }

  async findAll(): Promise<EmployeeEntity[]> {
    return await this.employeeRepository.findAll();
  }
}
