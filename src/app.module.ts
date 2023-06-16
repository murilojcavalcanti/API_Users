import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter'

@Module({
  imports: [ MailerModule.forRoot({
    transport: {
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'bertram30@ethereal.email',
          pass: 'A2WxdCY5Q2MduPmsUn'
      }
    },
    defaults: {
      from: '"projeto02" <bertram30@ethereal.email>',
    },
    template: {
      dir: __dirname + '/templates',
      adapter: new PugAdapter(),
      options: {
        strict: true,
      },
    },
  }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
    type: 'mysql',
    database: 'apitypeorm',
    port: 3306,
    username: 'root',
    password: String(process.env.DB_PASSWORD),
    entities: [User],
    synchronize: true,
  }),
  ThrottlerModule.forRoot({
    ttl:60,
    limit:10
  }),
  forwardRef(() => UsersModule),
  forwardRef(() => AuthModule)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
