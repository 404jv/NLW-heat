import { Router } from 'express';

import { AuthenticateUserController } from './controllers/AuthenticateUserController';

const router = Router();

router.get('/github', (request, response) => {
  return response.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});

router.post('/authenticate', new AuthenticateUserController().handle);

router.get('/signin/callback', (request, response) => {
  const { code } = request.query;

  return response.json(code);
});

export { router };
