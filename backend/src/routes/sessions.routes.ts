import { Router } from 'express';

import CreateSessionService from '../services/CreateSessionService';

const userRouter = Router();

userRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const createSessionService = new CreateSessionService();

    const userToken = await createSessionService.execute({ email, password });

    return res.send(userToken);
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

export default userRouter;
