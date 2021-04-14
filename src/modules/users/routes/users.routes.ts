import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import UserController from '../controller/UserController';
import isAuthenticated from '../../../shared/http/middlewares/isAthenticated';

const usersRouter = Router();
const usersController = new UserController();

usersRouter.get('/', isAuthenticated, usersController.index);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

export default usersRouter;
