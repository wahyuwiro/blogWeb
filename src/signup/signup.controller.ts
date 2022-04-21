import { Controller, Get, Post, Request, Res, Render, UseGuards, UseFilters, Body, HttpStatus, CACHE_MANAGER, Inject } from '@nestjs/common';
import { Response } from 'express';
import { SignupService } from './signup.service';
import { signupDTO } from './dto/signup.dto';
import { Cache } from 'cache-manager';
import { SigninController } from '../signin/signin.controller';

@Controller('signup')
export class SignupController {
    constructor(
        private SignupService: SignupService,
        private readonly SigninController: SigninController,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) { }
    @Get()
    @Render('sign/signup')
    async getSignin(@Request() req,@Res() res: Response) {
      return { 
        host : process.env.HOST + ':' + process.env.PORT,
      };
    }

    @Post()
    async postSignup(@Body() signupDTO: signupDTO, @Request() req,@Res() res: Response) {
      var result: any = {}, body: any = {}, key: any = {}, deviceId = '';
      body = signupDTO;
      if(req.cookies.deviceId) { 
        deviceId = req.cookies.deviceId;
      }else{
        deviceId = await this.SigninController.randomString(16, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
        res.cookie('deviceId',deviceId); // set cookie
      }
      console.log('signupPost body =>',body)
      result = await this.SignupService.signupPost(body);
      console.log('signupPost result =>',result)
      if(result.responseCode == 200) {
        key.token = result.data.token
        await this.SigninController.addRedis('key-'+deviceId, key);
        res.redirect(process.env.HOST + ':' + process.env.PORT + '/blog');
      }else{
        return res.render('sign/signup',
          { 
            host : process.env.HOST + ':' + process.env.PORT,
            data : body,
            err : result
          },
        );          
      }
    }    
    
}
