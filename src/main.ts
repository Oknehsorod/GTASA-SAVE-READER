import * as fs from 'fs/promises';

import { parseBlocks } from './utils/parsers';
import { getSaveFileData } from './utils/formatters';
import { SaveFile } from './types/formatters';

export class GTASAUtils {
   parseSaveFileByBuffer(data: Buffer) {
      const blocks = parseBlocks(data);
      return getSaveFileData(blocks);
   }

   async parseSaveFileByPath(path: string): Promise<SaveFile> {
      const file = await fs.open(path, 'r');
      const { size } = await file.stat();
      const buffer = Buffer.alloc(size);
      await file.read(buffer, 0, size, 0);
      return this.parseSaveFileByBuffer(buffer);
   }
}
