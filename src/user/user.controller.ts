import { Controller, Post,Body, Delete, Param, ParseIntPipe, Put, Get } from '@nestjs/common';
import { CrateUserDto } from './dto/CreateUser.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { CreateUserProfileDto } from './dto/CreateUserProfile.dto';
import { CreateUserPost } from './dto/CreateUserPost.dto';
@Controller('user')
export class UserController {
    constructor(
        private userService:UserService
    ){

    }
    @Get()
    getUsers(){
      return this.userService.findByUsers()
    }

    @Post()
    createUser(@Body() createUserDto : CrateUserDto){
      return   this.userService.createUser(createUserDto)
    }

    @Put(":id")
    updateUser(@Param('id',ParseIntPipe) id:number, @Body() updateUserDto:UpdateUserDto){
      return this.userService.updateUser(id,updateUserDto)
    }

    @Delete(":id")
    deleteUser(@Param('id',ParseIntPipe) id:number){
      return this.userService.deleteUser(id)
    }

    @Post(":id/profile")
    createUserProfile(@Param("id",ParseIntPipe) id:number,@Body() createUserProfileDto:CreateUserProfileDto){
      return this.userService.createUserProfile(id,createUserProfileDto)
    }

    
    @Post(":id/posts")
    createUserPosts(@Param("id",ParseIntPipe) id:number,@Body() createUserPost:CreateUserPost){
      return this.userService.createUserPosts(id,createUserPost)
    }
}
