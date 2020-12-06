import {GetUserByIdUseCase} from '../GetUserByIdUseCase'
import {User} from '../../../entities/User'
import {inject, injectable} from 'inversify'
import {UsersRepository} from '../../../repositories/UsersRepository'

@injectable()
export class GetUserByIdUseCaseImpl implements GetUserByIdUseCase {

  constructor(@inject("UsersRepository") private usersRepository: UsersRepository) {}

  public async handler(id: String): Promise<User> {
    return this.usersRepository.findUserById(id);
  }

}

