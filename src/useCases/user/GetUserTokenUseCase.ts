import {GetUserTokenDTO} from './DTOs/GetUserTokenDTO'

export interface GetUserTokenUseCase {
  handler(request: GetUserTokenDTO): Promise<String>;
}