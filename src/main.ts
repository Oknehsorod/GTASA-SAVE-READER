import * as fs from 'node:fs';

import { parseBlocks } from './utils/parsers';
import { getSaveFileData } from './utils/formatters';
import { SaveFile } from './types/formatters';

export class GTASAUtils {
   parseSaveFileByBuffer(data: Buffer) {
      const blocks = parseBlocks(data);
      return getSaveFileData(blocks);
   }

   parseSaveFileByPath(path: string): Promise<SaveFile> {
      const that = this;
      return new Promise((resolve, reject) => {
         fs.open(path, 'r', function (error, fd) {
            if (error) {
               return reject();
            }
            const size = fs.statSync(path).size;
            const buffer = Buffer.alloc(size);
            fs.read(fd, buffer, 0, size, 0, function () {
               resolve(that.parseSaveFileByBuffer(buffer));
            });
         });
      });
   }
}
