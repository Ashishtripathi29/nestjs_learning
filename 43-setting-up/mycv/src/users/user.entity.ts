import {Entity,Column,PrimaryGeneratedColumn, AfterInsert,AfterRemove,AfterUpdate} from "typeorm"
// import {Exclude} from "class-transformer"

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    email:string;

    // @Exclude()  // recomanded by nestjs to exclude the password from the response
    @Column()
    password:string;

    @AfterInsert()
    logInsert(){
        console.log("user is insert with id: ",this.id)
    }

    @AfterUpdate()
    logUpdate(){
        console.log("User is updated with id: ", this.id);
    }

    @AfterRemove()
    logRemove(){
        console.log("user is removed with id: ",this.id)
    }


}