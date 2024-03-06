import { Service } from 'typedi';
import { generateAccessToken } from "../../libreries/token";

@Service()
export class AppService {
  getAccessToken = () => generateAccessToken()
}