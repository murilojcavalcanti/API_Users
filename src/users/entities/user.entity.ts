import { IsStrongPassword } from "class-validator";
import { timeStamp } from "console";
import { Role } from "src/Enums/role.enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column({
        nullable:false,
        length:127
    })
    name:string

    @Column({
        nullable:false,
        length:127,
        unique:true
    })
    email:string
    
    @Column({
        nullable:false,
        length:127        
    })
    password:string

    @Column({default:Role.Admin})
    role:number
    
    @Column({
        type:'date',
        nullable:true,
    })
    birthAt:Date

    @CreateDateColumn({type:'timestamp',
    default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt:Date
}