import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "../Enums/role.enum";
import { ROLES_KEY } from "../decorators/roles.decorator";

@Injectable()
export class RoleGuard implements CanActivate{
    
    constructor(
        private readonly reflector:Reflector
    ){}
    async canActivate(context:ExecutionContext){
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY,[context.getHandler(),context.getClass()
         ]);
         

         if(!requiredRoles){
            return true
         }
        
        const { user } = context.switchToHttp().getRequest()
        
        console.log({requiredRoles,user})

        const rolesFilted = requiredRoles.filter((role) => role === user.role)
        
        console.log(rolesFilted)

         return rolesFilted.length>0
    }
}