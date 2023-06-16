import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { FileModule } from 'src/file/file.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports:[JwtModule.register({
    secret:String(process.env.JWT_SECRET)
  }),
  forwardRef(()=>UsersModule),
  TypeOrmModule.forFeature([User]),
  FileModule,
  MailerModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[AuthService]
})
export class AuthModule {}
