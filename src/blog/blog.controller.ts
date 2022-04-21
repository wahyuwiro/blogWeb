import { Controller, Get, Post, Request, Res, Render, UseGuards, UseFilters, Body, HttpStatus, Param, CACHE_MANAGER, Inject } from '@nestjs/common';
import { Response } from 'express';
import { BlogService } from './blog.service';
import { BlogDTO } from './dto/blog.dto';
import { Cache } from 'cache-manager';
import { SigninController } from '../signin/signin.controller';
import { link } from 'fs';

@Controller('blog')
export class BlogController {
    constructor(
        private BlogService: BlogService,
        private readonly SigninController: SigninController,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) { }
  
    @Get()
    @Render('admin/blog')
    async getBlog(@Request() req,@Res() res: Response) {
      var gr: any = {}, ct: any = {}, result: any = {}, message: any = {}, deviceId = '';
      if(req.cookies.deviceId) deviceId=req.cookies.deviceId
      gr = await this.SigninController.getRedis('key-'+deviceId);
      if(!gr) {
        res.redirect(process.env.HOST + ':' + process.env.PORT);
      }else{
        ct = await this.SigninController.checkToken(gr);
        if(ct.responseCode == 200) {
            result = await this.BlogService.getBlog(gr);
            // console.log('getBlog =>',result);
            message.host = process.env.HOST + ':' + process.env.PORT;
            if(result.responseCode == 200) {
                message.data = result.data;
            }else{
                message.err = result;
            }
            return message;
        }else {
            return { 
                host : process.env.HOST + ':' + process.env.PORT,
                err : ct
            };
        }
      }
    }
    @Get('new')
    @Render('admin/addBlog')
    async addBlog(@Request() req,@Res() res: Response) {
        var gr: any = {}, ct: any = {}, result: any = {}, message: any = {}, deviceId = '';
        if(req.cookies.deviceId) deviceId=req.cookies.deviceId
        gr = await this.SigninController.getRedis('key-'+deviceId);
        if(!gr) {
            res.redirect(process.env.HOST + ':' + process.env.PORT);
        }else{
            ct = await this.SigninController.checkToken(gr);
            if(ct.responseCode == 200) {
                return { 
                    host : process.env.HOST + ':' + process.env.PORT,
                };
            }else {
              return { 
                  host : process.env.HOST + ':' + process.env.PORT,
                  err : ct
              };
          }
        }        
    }
  
    @Post()
    async addNewBlog(@Body() blogDTO: BlogDTO,  @Res() res: Response, @Request() req) {
        try{
            var gr: any = {}, ct: any = {}, body: any = {}, result: any = {}, deviceId = '';
            console.log('blogDTO =>',blogDTO)
            if(req.cookies.deviceId) deviceId=req.cookies.deviceId;
                gr = await this.SigninController.getRedis('key-'+deviceId);
            if(!gr) {
                res.redirect(process.env.HOST + ':' + process.env.PORT);
            }else{
                ct = await this.SigninController.checkToken(gr);
                console.log('checkToken =>',ct)
                if(ct.responseCode == 200) {
                    body = blogDTO;
                    body.token = gr.token;
                    result = await this.BlogService.blogPost(body);
                    console.log('blogPost =>',result);
                    if(result.responseCode == 200) {
                        res.redirect(process.env.HOST + ':' + process.env.PORT+'/blog');
                    }else{
                        delete body.token
                        return res.render('admin/addBlog', { 
                            host : process.env.HOST + ':' + process.env.PORT,
                            err : result.responseMessage,
                            data: body
                        });  
                    }
                }else {
                    return res.render('admin/addBlog',{ 
                        host : process.env.HOST + ':' + process.env.PORT,
                        err : ct.responseMessage
                    });
                }
            }
        } catch (error) {
            console.log('error =>',error)
            return res.render('admin/addBlog',{ 
                host : process.env.HOST + ':' + process.env.PORT,
                err : error
            });
        }
    }
    @Get(':id')
    @Render('admin/editBlog')
    async EditLink(@Param('id') id, @Request() req, @Res() res: Response){
        try {
            console.log('id =>',id)
            var gr: any = {}, ct: any = {}, result: any = {}, message: any = {}, deviceId = '';
            if(req.cookies.deviceId) deviceId=req.cookies.deviceId
            gr = await this.SigninController.getRedis('key-'+deviceId);
            if(!gr) {
              res.redirect(process.env.HOST + ':' + process.env.PORT);
            }else{
              ct = await this.SigninController.checkToken(gr);
              if(ct.responseCode == 200) {
                  result = await this.BlogService.getBlog(gr);
                  console.log('getEditBlog =>',result);
                  message.host = process.env.HOST + ':' + process.env.PORT;
                  if(result.responseCode == 200) {
                      message.data = result.data;
                  }else{
                      message.err = result;
                  }
                  return message;
              }else {
                  return { 
                      host : process.env.HOST + ':' + process.env.PORT,
                      err : ct
                  };
              }
            }            
        } catch (error) {
            console.log('error =>',error)
        }
    }

}
