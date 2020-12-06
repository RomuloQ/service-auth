import {BaseHttpController, controller, httpGet, httpPost, request, response} from 'inversify-express-utils'
import {inject} from 'inversify'
import {CreateUserUseCase} from '../CreateUserUseCase'
import express from 'express'
import {GetUserTokenUseCase} from '../GetUserTokenUseCase'
import {GetUserByIdUseCase} from '../GetUserByIdUseCase'
import * as jwt from 'jsonwebtoken';

@controller("/users")
export class UserController extends BaseHttpController{

    constructor(
      @inject("CreateUserUseCase") private createUserUseCase: CreateUserUseCase,
      @inject("GetUserTokenUseCase") private getUserTokenUseCase: GetUserTokenUseCase,
      @inject("GetUserByIdUseCase") private getUserByIdUseCase: GetUserByIdUseCase
    ) { super() }

    @httpPost("/auth")
    private async getTokenUser(@request() req: express.Request){
        return await this.getUserTokenUseCase.handler(req.body)
          .catch(e => this.json(e,400));
    }

    @httpPost("/")
    private async createUser(@request() req: express.Request) {
        return await this.createUserUseCase.handler(req.body)
          .then(() => this.statusCode(201))
          .catch((e) => this.json(e,400))
    }

    @httpGet('/my-profile')
    private async getMyProfile() {

        const token = this.httpContext.request.header("Authorization")
        if(!token) this.statusCode(401);;

        try {

            const code = await jwt.verify(token, 'MyKeyJWT');
            const user = await this.getUserByIdUseCase.handler(code.id);
            if(user != undefined) return { username: user.username, id: user.id, email: user.email };
            this.notFound();

        } catch (e) {
            this.statusCode(401);
        }

    }

}