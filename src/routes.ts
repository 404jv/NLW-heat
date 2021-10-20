import { Router } from 'express';

import { AuthenticateUserController } from './controllers/AuthenticateUserController';

const router = Router();

router.post('/authenticate', new AuthenticateUserController().handle);

router.get('/signin/callback', (request, response) => {
  const { code } = request.query;

  return response.json(code);
});

export { router };
