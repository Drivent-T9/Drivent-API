import { Prisma, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { invalidCredentialsError } from './errors';
import { exclude } from '@/utils/prisma-utils';
import userRepository from '@/repositories/user-repository';
import sessionRepository from '@/repositories/session-repository';
import 'dotenv/config';
import { request } from '@/utils/request';
import qs from 'querystring';

async function signIn(params: SignInParams): Promise<SignInResult> {
  const { email, password } = params;

  const user = await getUserOrFail(email);

  await validatePasswordOrFail(password, user.password);

  const token = await createSession(user.id);

  return {
    user: exclude(user, 'password'),
    token,
  };
}

async function exchangeCodeForAccessToken(codeClient: string) {
  const { REDIRECT_URI, CLIENT_ID, CLIENT_SECRET, GITHUB_ACCESS_TOKEN_URL } = process.env;

  const params = {
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    client_secret: CLIENT_SECRET,
    code: codeClient,
    grant_type: 'authorization_code',
  };

  const { data } = await request.post(GITHUB_ACCESS_TOKEN_URL, params, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const parseData = qs.parse(data);

  return parseData.access_token;
}

export async function fetchUser(token: string | string[]) {
  const response = await request.getUser('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

async function getUserOrFail(email: string): Promise<GetUserOrFailResult> {
  const user = await userRepository.findByEmail(email, { id: true, email: true, password: true });
  if (!user) throw invalidCredentialsError();

  return user;
}

export async function createSession(userId: number) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  await sessionRepository.create({
    token,
    userId,
  });

  return token;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw invalidCredentialsError();
}

export async function findUserByEmail(email: string) {
  const user = await userRepository.findByEmail(email);
  return user;
}

export async function createGitHubUser(login: Prisma.UserUncheckedCreateInput) {
  await userRepository.create(login);
  return;
}

export type SignInParams = Pick<User, 'email' | 'password'>;

type SignInResult = {
  user: Pick<User, 'id' | 'email'>;
  token: string;
};

type GetUserOrFailResult = Pick<User, 'id' | 'email' | 'password'>;

const authenticationService = {
  signIn,
  exchangeCodeForAccessToken,
  fetchUser,
  findUserByEmail,
  createGitHubUser,
  createSession,
};

export default authenticationService;
export * from './errors';
