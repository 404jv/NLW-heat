import axios from 'axios';
import { sign } from 'jsonwebtoken';

import { prismaClient } from '../prisma';

interface IAccessTokenResponse {
  access_token: string;
}

interface IUserResponse {
  id: number | string;
  name: string;
  avatar_url: string;
  login: string;
}

interface IResponse {
  token: string;
  user: IUserResponse;
}

class AuthenticateUserService {
  async execute(code: string): Promise<IResponse> {
    const url = 'https://github.com/login/oauth/access_token';

    const { data: accessTokenResponse } =
      await axios.post<IAccessTokenResponse>(url, null, {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: 'application/json',
        },
      });

    const response = await axios.get<IUserResponse>(
      'https://api.github.com/user',
      {
        headers: {
          authorization: `Bearer ${accessTokenResponse.access_token}`,
        },
      }
    );

    const { login, id, name, avatar_url } = response.data;

    let user = await prismaClient.user.findFirst({
      where: { github_id: id as number },
    });

    if (!user) {
      user = await prismaClient.user.create({
        data: {
          github_id: id as number,
          avatar_url,
          login,
          name,
        },
      });
    }

    const token = sign(
      {
        user: {
          id: user.id,
          name: user.name,
          avatar_url: user.avatar_url,
        },
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '1d',
      }
    );

    return { token, user };
  }
}

export { AuthenticateUserService };
