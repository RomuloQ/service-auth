import {CreateUserUseCase} from '../CreateUserUseCase'
import {CreateUserDTO} from '../DTOs/CreateUserDTO'
import {inject, injectable} from 'inversify'
import {UsersRepository} from '../../../repositories/UsersRepository'
import {User} from '../../../entities/User'
import { hash } from "bcryptjs";

@injectable()
export class CreateUserUseCaseImpl implements CreateUserUseCase {

  constructor(@inject("UsersRepository") private usersRepository: UsersRepository) {}

  async handler(userRequest: CreateUserDTO): Promise<void> {

    userRequest.password = await hash(userRequest.password, 8);

    const user = new User({...userRequest})
    if (!user.isValid()) throw "unprocessable entity";

    return this.usersRepository.createUser(user);

  }

}