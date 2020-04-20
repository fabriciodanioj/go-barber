import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateUserServices from '../services/CreateUserService';
import User from '../models/User';

const userRouter = Router();

userRouter.get('/', async (req, res) => {
  const userRepository = getRepository(User);

  const users = await userRepository.find();

  users.map(user => delete user.password_hash);

  return res.status(200).send(users);
});

userRouter.post('/', async (req, res) => {
  try {
    const userRepository = getRepository(User);

    const { email, password, name } = req.body;

    const createUser = new CreateUserServices();

    const user = await createUser.execute({
      email,
      password,
      name,
    });

    delete user.password_hash;

    return res.send(user);
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

userRouter.get('/:id', async (req, res) => {
  try {
    const userRepository = getRepository(User);

    const { id } = req.params;

    const response = await userRepository.findOne({ where: { id } });

    delete response?.password_hash;

    return res.status(200).send(response);
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

export default userRouter;
