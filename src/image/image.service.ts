import { Injectable } from '@nestjs/common';
import { bucket } from 'src/firebase/firebase.service';
import { Readable } from 'stream';
@Injectable()
export class ImageService {
  async addFileToBucket(
    path: string,
    contentType: string,
    media: Buffer,
    metadata: { [key: string]: string }[],
  ): Promise<string> {
    const object = metadata.reduce((obj, item) => Object.assign(obj, item), {});
    // const file = bucket.file(path);
    // const stream = file.createWriteStream();
    // stream.on('finish', async () => {
    //   return await file.setMetadata({
    //     metadata: object,
    //   });
    // });
    // stream.end(media);
    await bucket.upload(`/Users/vishnusai/Desktop/${path}`, {
      destination: `/images/${path}`,
    });
    return 'something';
  }
}
