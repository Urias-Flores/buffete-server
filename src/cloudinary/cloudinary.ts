import { v2 } from 'cloudinary';
import { CLOUDINARY } from './constants';

export const Cloudinary = {
  provide: CLOUDINARY,
  useFactory: (): any => {
    return v2.config({
      cloud_name: 'dfbekplav',
      api_key: '897113476348849',
      api_secret: '9AxXIjij5cm6kVi8CfcBS2jXlJg',
    });
  },
};
