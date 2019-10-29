import { Router } from 'express';
import multer from 'multer';
import multerconfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import FileController from './app/controllers/FileController';

const routes = new Router();
const upload = multer(multerconfig);

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

// declaração de forma gglobal.
// este middleware evita que o usuário  consiga fazer update sem  estar logado
routes.use(authMiddleware);
// upload.single('nome do campo que eu vou enviar')  =>
routes.post('/files', upload.single('file'), FileController.store);

routes.put('/users', UserController.update);
export default routes;
