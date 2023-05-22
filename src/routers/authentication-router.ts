import { Router } from 'express';
import { signInWithGitHub, singInPost } from '@/controllers';
import { validateBody } from '@/middlewares';
import { signInSchema } from '@/schemas';

const authenticationRouter = Router();

authenticationRouter.post('/sign-in', validateBody(signInSchema), singInPost);
authenticationRouter.post('/sign-in/github', signInWithGitHub);

export { authenticationRouter };
