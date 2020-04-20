import { getRepository } from 'typeorm';
import { compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../config/auth';

interface Request {
  email: string;
  password: string;
}

interface Response {
  email: string;
  id: string;
  token: string;
}

class CreateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('The email/password is wrong');
    }

    const match = compareSync(password, user.password_hash);

    if (!match) {
      throw new Error('The email/password is wrong');
    }

    const userToken = sign({ id: user.id }, authConfig.privateKey, {
      expiresIn: authConfig.expiresIn,
    });

    return {
      id: user.id,
      email: user.email,
      token: userToken,
    };
  }
}

export default CreateUserService;
