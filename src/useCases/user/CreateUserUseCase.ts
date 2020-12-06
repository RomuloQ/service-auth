import {CreateUserDTO} from './DTOs/CreateUserDTO'

export interface CreateUserUseCase {
  handler(user: CreateUserDTO) : Promise<void>;
}