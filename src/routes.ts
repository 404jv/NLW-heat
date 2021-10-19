import { Router } from 'express';

import { AuthenticateUserControlle } from './controllers/AuthenticateUserControlle';

const router = Router();

router.post('/authenticate', new AuthenticateUserControlle().handle);

router.get('/signin/callback', (request, response) => {
  const { code } = request.query;

  return response.json(code);
});

export { router };
