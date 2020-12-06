import {uuid} from 'uuidv4'

export class User {

  public readonly id: string;
  public readonly email: string;
  public readonly username: string;
  public readonly password: string;

  constructor(props: Omit<User, 'id'|'isValid'>) {
    Object.assign(this, props);
    this.id = uuid();
  }

  public isValid(): boolean {
    return !!(this.id && this.email && this.username && this.password && this.password.length > 6) ;
  }

}