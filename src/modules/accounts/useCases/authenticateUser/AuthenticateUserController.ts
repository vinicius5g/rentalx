import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

export class AuthenticateUserController {
  static async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    try {
      const response = await authenticateUserUseCase.execute({
        email,
        rawPassword: password,
      });

      return res.json(response);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
