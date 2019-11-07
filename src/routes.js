// Import de dependências
import { Router } from 'express';
import multer from 'multer';
import multerconfig from './config/multer';

// Import de Controllers
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
// Import de Middlewares
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

const upload = multer(multerconfig);

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

// declaração de forma gglobal.
// este middleware evita que o usuário  consiga fazer update sem  estar logado
routes.use(authMiddleware);
// upload.single('nome do campo que eu vou enviar')  =>
routes.get('/providers', ProviderController.index);

routes.get('/appointments', AppointmentController.index);
routes.get('/schedule', ScheduleController.index);
routes.get('/notifications', NotificationController.index);

routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/appointments', AppointmentController.store);

export default routes;
