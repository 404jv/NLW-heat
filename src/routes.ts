import { Router } from 'express';

import { AuthenticateUserControlle } from './controllers/AuthenticateUserControlle';

const router = Router();

router.post('/authenticate', new AuthenticateUserControlle().handle);

export { router };
