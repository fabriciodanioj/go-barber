import { Router, response } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentServices from '../services/CreateAppointmentService';
import HandleSession from '../middlewares/handleSession';

const appointmentsRouter = Router();

appointmentsRouter.use(HandleSession);

appointmentsRouter.get('/', async (req, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  const appointments = await appointmentsRepository.find();

  return res.status(200).send(appointments);
});

appointmentsRouter.post('/', async (req, res) => {
  try {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const { provider_id, date } = req.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentServices();

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
    });

    return res.send(appointment);
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

appointmentsRouter.get('/:id', async (req, res) => {
  try {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const { id } = req.params;

    const response = await appointmentsRepository.findOne({ where: { id } });

    return res.status(200).send(response);
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

export default appointmentsRouter;
