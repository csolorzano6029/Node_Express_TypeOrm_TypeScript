import { EmployeeService } from '../services';
import { NextFunction, Request, Response, Router } from 'express';

const employeeService = new EmployeeService();
const employeeController = Router();

employeeController.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    const employees = await employeeService.findAll();

    if (employees.length === 0) {
      return res.status(404).json({ message: 'Empleados no encontrados' });
    }

    res.json(employees);
  },
);

employeeController.get(
  '/email',
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.query as { email: string };

    const employee = await employeeService.getEmployeeByEmail(email);

    if (!employee) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }

    res.json(employee);
  },
);

export default employeeController;
