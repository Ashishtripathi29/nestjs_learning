import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
     getData():string{
        return "this is comming from user service"
    }
}
