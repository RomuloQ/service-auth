import {GetUserTokenUseCase} from '../GetUserTokenUseCase'
import {GetUserTokenDTO} from '../DTOs/GetUserTokenDTO'
import {inject, injectable} from 'inversify'
import {UsersRepository} from '../../../repositories/UsersRepository'
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken';

@injectable()
export class GetUserTokenUseCaseImpl implements GetUserTokenUseCase {

  constructor(@inject("UsersRepository") private usersRepository: UsersRepository) {}

  public async handler(request: GetUserTokenDTO) {

    if(!request.password || !request.email) throw "unprocessable entity"

    const user = await this.usersRepository.findUserByEmail(request.email);

    if(user != undefined) {
      const isEqual = await compare(request.password, user.password);

      if(isEqual) return sign({ id: user.id }, 'MyKeyJWT');
    }

    throw "user not found"

  }
}