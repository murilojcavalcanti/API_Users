import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../Enums/role.enum';
import { RoleGuard } from '../guards/role.guard';
import { AuthGuard } from '../guards/auth.guard';


@UseGuards(AuthGuard,RoleGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  
  @Roles(Role.Admin)  
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  
  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  
  @Get('/findname/name')
  findForName(@Param('name') name:string){
    
  }


  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body() {email,name,password,role, birthAt }: UpdateUserDto) {
    return this.usersService.update(id, {email,name,password,role, birthAt});
  }

  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
