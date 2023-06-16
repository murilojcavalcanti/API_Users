import { Controller, Post, Body,Headers, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthForgetDto } from './dto/auth-forget.dto';
import { AuthResetDto } from './dto/auth-reset.dto';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from '../guards/auth.guard';
import { User } from 'src/decorators/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { FileService } from 'src/file/file.service';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly fileService: FileService
    ) {}

 @Post('login')
 async login(@Body() {email,password}:AuthLoginDto){
  return this.authService.login(email,password)
 }

 @Post('register')
 register(@Body() body:AuthRegisterDto){
  return this.authService.register(body)
 }

 @Post('forget')
 forget(@Body() {email}:AuthForgetDto){
  return this.authService.forget(email)
 }

 @Post('reset')
 reset(@Body() {password,token}:AuthResetDto){
  return this.authService.reset(password,token)
 }

 @UseInterceptors(FileInterceptor('file'))//É aqui onde o nestjs recebe as imagens
 @UseGuards(AuthGuard)
 @Post('photo')
  async uplaodPhoto(@User() User,@UploadedFile() photo:Express.Multer.File){
    const path = join(__dirname,'..','..','..','storage','photos', `photo-${User.id}`)
     this.fileService.upload(photo,path)
     return 'success'
      }

//usando Guards
@UseGuards(AuthGuard)
@Post('checkUser')
 check(@User() User){
    return {
      user: User
    }
}

//Sem uso de Guards
 /*
 @Post('checkUser')
 check(@Headers('authorization') token){
    return this.authService.checkToken(token.split(' ')[1])

 }*/

}
