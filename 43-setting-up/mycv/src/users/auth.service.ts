import {BadRequestException, Injectable} from "@nestjs/common"
import { UsersService } from "./users.service"
import { randomBytes,scrypt as _scrypt} from "crypto"
import { promisify } from "util"
import { symlink } from "fs"


const scrypt=promisify(_scrypt)

@Injectable()
export class AuthService{
    constructor(private userService:UsersService){}

    async signup(email:string,password:string){
        //1. check the user is already exit or not
        const user= await this.userService.find(email)
        // 2. if user exist then return error
        if(user.length){
            throw new BadRequestException("Email is already used")
        }

        // 3. create a hash password 
                // create the salt
                const salt=randomBytes(8).toString("hex");
                // hash the salt and password together
                const hash=await scrypt(password,salt,32) as Buffer;
                // joined the hash and password together
                const result=salt+"."+hash.toString("hex");
        // 4. save the user with hash password
        return await this.userService.createUser(email,result)

    }

    async signin(email:string,pasword:string){
        // check the user is exist or not
        const [user]= await this.userService.find(email)
        if(!user){
            throw new BadRequestException("User is not exist")
        }
        const [salt,storeHash]=user.password.split(".")
        const hash=await scrypt(pasword,salt,32) as Buffer;
        if(storeHash!==hash.toString("hex")) throw new BadRequestException("wrong password")
        return user;
    }

}