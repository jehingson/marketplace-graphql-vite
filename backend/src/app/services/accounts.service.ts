import { Service } from "typedi";
import bcrypt from "bcrypt";
import { Accounts } from "../models/accounts.model";
import { AppDataSource } from "../../boot/data-source";
import { v4 as uuidv4 } from "uuid";
// import { Mailer } from '../../utils/mailer';
// import { mailConfig } from '../../config/mail';
// import { appConfig } from '../../config/app';
import { generateAuthToken, TokenLibrary } from "../../libreries/token";
import { Status } from "../enum/status.enum";
import { decrypt } from "../../utils/encrypto";
import { AccountsToken } from "../models/accounts-token.model";
import { OAuth2Client } from "google-auth-library";
import { GraphQLError } from "graphql";

const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

@Service()
export class AccountService {
  responseAccounts = async (account) => {
    const authToken = generateAuthToken({
      id: account.id,
      modelName: "accounts",
    });
    const tokenLibrary = new TokenLibrary();
    await tokenLibrary.saveUserToken({
      pushToken: "",
      authToken,
      version: "1.0.0",
      account: account,
    });
    delete account.password;
    return {
      ...account,
      authToken,
      success: true,
      message: "",
    };
  };

  createRegister = async (
    { username, email, password, iv, picture },
    accountRepository
  ) => {
    try {
      const account = new Accounts();
      account.id = uuidv4();
      account.email = email;
      account.username = username;
      // account.picture = picture ? picture : ""
      // account.email_verified = 0
      const dePassword = iv ? decrypt(password, iv) : password;
      const hash = await bcrypt.hash(dePassword, 10);
      account.password = hash.replace("$2a$", "$2y$");
      await accountRepository.save(account);
      // try {
      //   // msg email
      //   const mailer = new Mailer
      //   await mailer.sendMail({
      //     template: 'welcome-email',
      //     to: account.email,
      //     from: mailConfig.user,
      //     context: {
      //       account,
      //       app: appConfig,
      //     },
      //   });
      // } catch (error) {
      //   console.log('createAccount', error)
      // }

      return this.responseAccounts(account);
    } catch (error) {
      console.log("createRegister error", error);
      return { success: false, message: error.message };
    }
  };

  login = async ({ email, password, iv }) => {
    const accountRepository = AppDataSource.getRepository(Accounts);
    const account = await accountRepository.findOneBy({ email: email });

    if (!account) {
      throw new GraphQLError(
        "El correo electrónico o la contraseña son incorrectos"
      );
    }

    if (account.status !== Status.Active) {
      throw new GraphQLError("El usuario se encuentra activo.");
    }

    try {
      const hash = account.password.replace("$2y$", "$2a$");
      const dePassword = decrypt(password, iv);
      await bcrypt.compare(dePassword, hash);
      return this.responseAccounts(account);
    } catch (error) {
      throw new GraphQLError(
        "El correo electrónico o la contraseña son incorrectos"
      );
    }
  };

  register = async ({ username, email, password, iv }) => {
    const accountRepository = AppDataSource.getRepository(Accounts);
    const exitsAccount = await accountRepository.findOneBy({ email });
    if (exitsAccount)
      throw new GraphQLError("El correo electrónico se encuentra registrado.");
    return this.createRegister(
      { username, email, password, iv, picture: "" },
      accountRepository
    );
  };

  googleRegister = async ({ token }) => {
    try {
      const ticket: any = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const data = ticket?.payload ?? null;
      const { name: username, email, picture } = data;
      const accountRepository = AppDataSource.getRepository(Accounts);
      const account = await accountRepository.findOneBy({ email });
      if (account) {
        return this.responseAccounts(account);
      }
      const password = uuidv4();
      return this.createRegister(
        { username, email, password, iv: null, picture },
        accountRepository
      );
    } catch (error) {
      console.log("errror", error);
      return { message: "", success: false };
    }
  };

  getProfile = async (accountId) => {
    const accountRepository = AppDataSource.getRepository(Accounts);
    const account = await accountRepository.findOneBy({ id: accountId });
    if (!account) return { success: false, message: "" };
    delete account.password;
    return { ...account, authToken: "", success: true, message: "" };
  };

  updateAccount = async (args) => {
    try {
      const { username, status, password, iv, accountId, role, authToken } = args;
      if (!accountId) return { success: false, message: "" };
      let account: any = {};
      if (username) account["username"] = username;
      if (status) account["status"] = status;
      if (role) account["role"] = role;
      if (password && iv) {
        const dePassword = decrypt(password, iv);
        const hash = await bcrypt.hash(dePassword, 10);
        account["password"] = hash.replace("$2a$", "$2y$");
      }
      const accountRepository = AppDataSource.getRepository(Accounts);
       await accountRepository.update(
        {
          id: accountId,
        },
        account
      );
      const newAccount = await this.getProfile(accountId)
      return { success: true, message: "", ...newAccount, authToken };
    } catch (error) {
      throw new GraphQLError("Algo a salido mal, vuelve a intentar.");
    }
  };
  logout = async (accountId) => {
    try {
      const tokenRepository = AppDataSource.getRepository(AccountsToken);
      await tokenRepository.update(
        {
          account: {
            id: accountId,
          },
        },
        {
          status: Status.Deleted,
        }
      );
      return { success: true, message: "" };
    } catch (error) {
      return { success: false, message: "" };
    }
  };
}
