import * as fs from 'node:fs';

import { getMetaData, getPlayerData, getStatsData } from './gameUtils';
import { parseBlocks } from './utils';

const PATH_TO_SAVE = '/mnt/e/downloads/GTASAsf1.b';

const showTitle = (title: string) => console.info(`${'-'.repeat(10)}${title}${'-'.repeat(10)}`);

const readBSave = (path: string) => {
   fs.open(path, 'r', function (error, fd) {
      if (error) {
         console.log(error.message);
         return;
      }
      const size = fs.statSync(path).size;
      const buffer = Buffer.alloc(size);
      fs.read(fd, buffer, 0, size, 0, function () {
         const blocks = parseBlocks(buffer);
         showTitle('Metadata')
         console.log(getMetaData(blocks[0]));
         showTitle('Player')
         console.log(getPlayerData(blocks[15]));
         showTitle('Stats')
         console.log(getStatsData(blocks[16]));
      });
   });
};

readBSave(PATH_TO_SAVE);
