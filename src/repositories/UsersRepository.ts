import {User} from '../entities/User'

export interface UsersRepository {
  createUser(user: User): Promise<void>;
  findUserByEmail(email: String): Promise<User>;
  findUserById(id: String): Promise<User>;
}