import { ExecutionContext, NotFoundException, createParamDecorator } from "@nestjs/common";

export const User = createParamDecorator((filter:string,context:ExecutionContext)=>{
const request = context.switchToHttp().getRequest()
try{
    if(filter){
        request.user[filter]
    }
    return request.user
}catch(e){
    throw new NotFoundException('Usuario não encontrado no request. use o authguard para pbter o usuario')
}
})