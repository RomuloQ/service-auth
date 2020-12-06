import "reflect-metadata";
import "./useCases/user/controllers/UserController"
import express from 'express'
import {InversifyExpressServer} from 'inversify-express-utils'
import {Container} from 'inversify'
import {CreateUserUseCaseImpl} from './useCases/user/implementations/CreateUserUseCaseImpl'
import {UsersRepositoryImpl} from './repositories/UsersRepositoryImpl'
import {GetUserTokenUseCaseImpl} from './useCases/user/implementations/GetUserTokenUseCaseImpl'
import {GetUserByIdUseCaseImpl} from './useCases/user/implementations/GetUserByIdUseCaseImpl'

// inject dependency :) //
let container = new Container();
container.bind("CreateUserUseCase").to(CreateUserUseCaseImpl)
container.bind("UsersRepository").to(UsersRepositoryImpl).inSingletonScope()
container.bind("GetUserTokenUseCase").to(GetUserTokenUseCaseImpl)
container.bind("GetUserByIdUseCase").to(GetUserByIdUseCaseImpl)

// config server //
const server = new InversifyExpressServer(container);

server.setConfig(app => {
  app.use(express.json());
  app.listen(8000);
})

server.build();