import { BadRequestException, Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthRegisterDto } from './dto/auth-register.dto';
import * as bcrycpt from 'bcrypt'
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mailer: MailerService,


  ) { }
  private readonly issuer = 'login'

  async createToken(user: User) {
    return {
      accessToken: this.jwtService.sign({
        id: user.id,
        email: user.email,
        name: user.name
      }, {
        expiresIn: "7days",
        subject: String(user.id),
        issuer: this.issuer,
        audience: 'users'
      })
    }
  }

   checkToken(token: string) {
   try{ 
    const data = this.jwtService.verify(token, {
      issuer: this.issuer,
      audience: 'users'
    })
    return data

  }catch(e){
    throw new BadRequestException(e)
  }
  }
  async login(email: string, password: string) {
    const user = await this.userRepository.findOneBy({
      email
    })
    if ((!(user)) ||(!await bcrycpt.compare(password, user.password) ) ) {
      throw new UnauthorizedException('email e/ou senha incorretos.')
    }
   

    return this.createToken(user)
  }

  async forget(email: string) {
    const user = await this.userRepository.findOneBy({
      email
    })
    if (!user) {
      throw new UnauthorizedException('Email incorreto')
    };

    const token = this.jwtService.sign({
      id:user.id
    },{
      expiresIn:'30 minutes',
      subject:String(user.id),
      issuer:'forget',
      audience:'users'
    }) 
      await this.mailer.sendMail({
      subject:'Recuperação de Senha',
      to: email,
      template:'forget',
      context:{
        name:user.name,
        token,       
        //link: 'link para envio'
      },
    })
    return true
  }

  async reset(password: string, token: string) {
    try{ 
      const data = this.jwtService.verify(token, {
        issuer:'forget',
        audience: 'users'
      })
  
    }catch(e){
      throw new BadRequestException(e)
    }
    const data: any = this.jwtService.verify(token, {
      issuer: 'forget',
      audience: 'user'
    })
    await this.userRepository.update(Number(data.id), {
      password
    })
    const user = await this.userService.findOne(Number(data.id))

    return this.createToken(user);

  }

  async register(data: AuthRegisterDto) {
    const user = await this.userService.create(data)

    return this.createToken(user)
  }
  async invite(id:number, email:string ){
    const user = await this.userRepository.findOneByOrFail({email})
    

    const token = this.createToken(user)
    await this.mailer.sendMail({
      subject:'Recuperação de Senha',
      to: email,
      template:'forget',
      context:{
        name:user.name,
        link:'localhost:3000/projects/id/users'
      }
    }) 
  }




}
