import {User} from '../../entities/User'

export interface GetUserByIdUseCase {
  handler(id: String): Promise<User>
}