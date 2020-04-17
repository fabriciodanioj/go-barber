import { Router } from 'express';

const appointmentsRouter = Router();

appointmentsRouter.get('/', (req, res) => {
  return res.send({ msg: 'Hello World' });
});

export default appointmentsRouter;
