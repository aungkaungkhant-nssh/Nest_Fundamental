import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CrateUserDto } from './dto/CreateUser.dto';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import {Profile} from 'src/typeorm/entities/Profile';
import { CreateUserProfileDto } from './dto/CreateUserProfile.dto';
import { CreateUserPost } from './dto/CreateUserPost.dto';
import { Post } from 'src/typeorm/entities/Post';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository:Repository<User>,
        @InjectRepository(Profile) private profileRepository:Repository<Profile>,
        @InjectRepository(Post) private postRepository:Repository<Post>
    ){}

    findByUsers(){
        return this.userRepository.find({relations:["profile","posts"]});
    }

    createUser(createUserDto:CrateUserDto){
        const newUser =  this.userRepository.create(createUserDto);
        return this.userRepository.save(newUser);
    }

    deleteUser(id:number){
       return  this.userRepository.delete({id})
    }

    updateUser(id:number,updateUserDto:UpdateUserDto){
        return this.userRepository.update({id},{...updateUserDto})
    }

   async createUserProfile(id:number,createUserProfile:CreateUserProfileDto){
       const user =await  this.userRepository.findOneBy({id});
      
       if(!user){
        throw new HttpException(
            'User not found. Cannot create Profile',
            HttpStatus.BAD_REQUEST,
          );
       }
       const userProfile = this.profileRepository.create(createUserProfile)
       const saveProfile =await  this.profileRepository.save(userProfile);
       user.profile = saveProfile;

       return this.userRepository.save(user)
    }

    async createUserPosts(id:number,createUserPosts:CreateUserPost){
        const user = await this.userRepository.findOneBy({id});
        if(!user){
            throw new HttpException(
                'User not found. Cannot create Post',
                HttpStatus.BAD_REQUEST,
            )
        }

        const newPost =  this.postRepository.create({...createUserPosts,user});
        return await this.postRepository.save(newPost);
      
    }
}
