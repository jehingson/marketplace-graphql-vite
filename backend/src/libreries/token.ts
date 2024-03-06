import { sign } from 'jsonwebtoken';
import { Status } from '../app/enum/status.enum';
import { Jwt } from '../interfaces/jwt.interface';
import { Service } from 'typedi';
import { AccountsToken } from '../app/models/accounts-token.model';
import { AppDataSource } from '../boot/data-source';
import { Accounts } from '../app/models/accounts.model';



interface BaseOnboardingBody {
  pushToken: string;
  authToken: string;
  version: string;
  account: Accounts
}

export const generateAccessToken = () => sign({}, process.env.JWT_SECRET);

export const generateAuthToken = (jwtContent: Jwt) => {
  const token = sign(jwtContent, process.env.JWT_SECRET);
  return token;
};

@Service()
export class TokenLibrary {
  saveUserToken = async (options: BaseOnboardingBody) => {
    const tokenRepository = AppDataSource.getRepository(AccountsToken)

      const token = await tokenRepository.findOne({
        where: {
          account: {
            id: options.account.id,
          },
          status: Status.Active
        },
      })

      if (token) {
        await tokenRepository.update(
          {
            id: token.id,
          },
          {
            authToken: options.authToken,
            lastUsed: new Date(),
          }
        );
      } else {
        await tokenRepository.save({
          authToken: options.authToken,
          pushToken: '',
          lastUsed: new Date(),
          account: options.account,
          version: options.version,
        } as any);
      }
  };
}


