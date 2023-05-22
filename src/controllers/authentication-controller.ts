import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Prisma } from '@prisma/client';
import authenticationService, {
  SignInParams,
  findUserByEmail,
  createGitHubUser,
  createSession,
} from '@/services/authentication-service';

export async function singInPost(req: Request, res: Response) {
  const { email, password } = req.body as SignInParams;

  try {
    const result = await authenticationService.signIn({ email, password });

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}

export async function signInWithGitHub(req: Request, res: Response) {
  try {
    const token = await authenticationService.exchangeCodeForAccessToken(req.body.code);
    const user = await authenticationService.fetchUser(token);
    const loginInfo = {
      email: `${user.login}@github`,
      password: '',
    } as Prisma.UserUncheckedCreateInput;
    const email = `${user.login}@github`;

    let checkIfEmailExists = await findUserByEmail(email);
    if (!checkIfEmailExists) {
      await createGitHubUser(loginInfo);
      checkIfEmailExists = await findUserByEmail(email);
    }

    const tokenDrivent = await createSession(checkIfEmailExists.id);
    const body = {
      id: checkIfEmailExists.id,
      email: checkIfEmailExists.email,
      token: tokenDrivent,
    };
    return res.status(httpStatus.OK).send(body);
  } catch (err) {
    res.status(400).send(err.message);
  }
}
