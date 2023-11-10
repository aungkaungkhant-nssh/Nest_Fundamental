import { PrimaryGeneratedColumn,Column, ManyToOne, Entity } from "typeorm";
import { User } from "./User";

@Entity({ name: 'posts' })

export class Post{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;
  
    @Column()
    description: string;


    @ManyToOne(()=>User,(user)=>user.posts)
    user:User

}

