import { EmployeeService } from '../services';
import { Request, Response } from 'express';

const employeeService = new EmployeeService();

export async function getEmployeeByEmail(req: Request, res: Response) {
  const { email } = req.query as { email: string };

  try {
    const employees = await employeeService.getEmployeeByEmail(email);
    if (!employees) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }

    res.json(employees);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al obtener empleado por correo electrónico' });
  }
}
