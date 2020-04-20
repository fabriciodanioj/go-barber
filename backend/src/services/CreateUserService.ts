import { getRepository } from 'typeorm';

import User from '../models/User';
import { hashSync } from 'bcryptjs';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const verifyIfUserExists = await userRepository.findOne({
      where: { email },
    });

    if (verifyIfUserExists) {
      throw new Error('This user already exists');
    }

    const password_hash = hashSync(password, 10);

    const user = userRepository.create({ email, name, password_hash });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
