import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('cloudinary')
export class CloudinaryController {
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log(file);
    }

    @Post('upload')
    async uploadBasic() {
        const fs = require('fs');
        const {GoogleAuth} = require('google-auth-library');
        const {google} = require('googleapis');
      
        // Get credentials and build service
        // TODO (developer) - Use appropriate auth mechanism for your app
        const auth = new GoogleAuth({
          keyFile: 'C:/Users/Dell/Downloads/pro-contact-359622-429a75b6160b.json',
          scopes: 'https://www.googleapis.com/auth/drive'
        });
        const service = google.drive({version: 'v3', auth});
        const requestBody = {
          name: 'photo.jpg',
          fields: 'id',
        };
        const media = {
          mimeType: 'image/jpeg',
          body: fs.createReadStream('C:/Users/Dell/Downloads/PlanesCloud.png'),
        };
        try {
          const file = await service.files.create({
            requestBody,
            media: media,
          });
          console.log('File Id:', file.data.id);
          return file.data.id;
        } catch (err) {
          // TODO(developer) - Handle error
          throw err;
        }
    }
}
