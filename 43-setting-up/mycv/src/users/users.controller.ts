import {
  Controller,
  Post,
  Body,
  Param,
  Patch,
  Query,
  Delete,
  Get,
  UseInterceptors,
  Session
  //   ClassSerializerInterceptor,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthService } from './auth.service';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto,@Session() session:any) {
    // return this.authService.signup(body.email, body.password);
    const user=await this.authService.signup(body.email, body.password);
    session.userId= user.id;
    return user;
    // return this.userService.createUser(body.email, body.password);
  }

  @Get('/login')
  async signin(@Body() body:CreateUserDto,@Session() session:any) {
    // return this.authService.signin(body.email,body.password);
    const user= await this.authService.signin(body.email,body.password);
    session.userId=user.id;
    return user;
  }

  //   @UseInterceptors(ClassSerializerInterceptor)
  @Get('/alluser')
  findAllUser(@Query('email') email: string) {
    // session
    return this.userService.find(email);
  }


  //   @UseInterceptors(ClassSerializerInterceptor) // this is for object to plane json
  // @UseInterceptors(SerializeInterceptor)
  // @UseInterceptors(new SerializeInterceptor(UserDto))

  // @Serialize(UserDto)
  @Get('/:id')
  findUser(@Param('id') id: string) {
    console.log(id);
    return this.userService.findOne(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(parseInt(id), body);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }
}
