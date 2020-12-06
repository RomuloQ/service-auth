import {UsersRepository} from './UsersRepository'
import {User} from '../entities/User'
import {injectable} from 'inversify'

@injectable()
export class UsersRepositoryImpl implements UsersRepository {

  private users: Array<User> = [];

  async createUser(user: User): Promise<void> {
    await this.isEmailIsUsed(user.email)
    this.users.push(user);
    console.log(this.users)
  }

  async findUserByEmail(email:String): Promise<User> {
    const filterUsers = this.users.filter(value => value.email == email);
    if(filterUsers.length > 0) return filterUsers[0];
  }

  private async isEmailIsUsed(email: String): Promise<void> {
    const user = await this.findUserByEmail(email)
    if(user) throw "email used"
  }

  async findUserById(id: String): Promise<User> {
    const filterUsers = this.users.filter(value => value.id == id);
    if(filterUsers.length > 0) return filterUsers[0];
  }

}