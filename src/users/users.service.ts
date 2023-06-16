import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrycpt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>
  ){}
  async create(data: CreateUserDto) {
    

    //dessa forma a senha tem sua força em 10
    //data.password = await bcrycpt.hash(data.password,10)

    //usamos essa forma para a senha ter uma força sugerida para não derrubar o servidor.
    const salt = await bcrycpt.genSalt()
    data.password =await bcrycpt.hash(data.password,salt)
    console.log({salt})
    
    await this.repo.create(data);
    
    return this.repo.save(data);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({id: id});
  }
  findForName(name:string){
    return this.repo.findBy({name})
  }

  update(
    id: number,
     {email,name,password,role, birthAt }: UpdateUserDto
     ) {
    const data:any = {}
    
    if(birthAt){
      data.birthAt = new Date(birthAt)
    }
    
    if(email){
      data.email = email
    }
    
    if(name){
      data.password = password
    } 
    
    if(role){
      data.role =role
    }
    
    return this.repo.update(id, data);
  }

  remove(id: number) {
    return this.repo.delete(id);
   
  }
}
