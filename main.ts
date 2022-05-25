import * as fs from 'node:fs';

import {
   getMetaData,
   getPlayerData,
   getStatsData,
   getTagsData,
   getPlayersData,
   getStuntJumpsData,
   getPickUpsData,
   getScriptData,
   getGaragesData,
} from './gameUtils';
import { parseBlocks } from './utils';

import { VehicleTypes } from './gameConstants';

const PATH_TO_SAVE = '/mnt/e/downloads/GTASAsf1.b';

const showTitle = (title: string) =>
   console.info(`${'-'.repeat(10)}${title}${'-'.repeat(10)}`);

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
         showTitle('Metadata');
         console.log(getMetaData(blocks[0]));
         showTitle('Player');
         console.log(getPlayerData(blocks[15]));
         showTitle('Stats');
         console.log(getStatsData(blocks[16]));
         showTitle('Player Weapons');
         console.log(JSON.stringify(getPlayersData(blocks[2])));
         //showTitle('Tags');
         //console.log(JSON.stringify(getTagsData(blocks[20])))
         //showTitle('Unique Stunt Jumps');
         //console.log(JSON.stringify(getStuntJumpsData(blocks[24])))
         showTitle('PickUps');
         const pickUps = getPickUpsData(blocks[6]).pickUps;
         const oysters = pickUps.filter((item) => item.object === 953);
         const snapshots = pickUps.filter((item) => item.object === 1253);
         const horseshoes = pickUps.filter((item) => item.object === 954);
         console.log(oysters.length, snapshots.length, horseshoes.length);

         showTitle('Missions');
         console.log(getScriptData(blocks[1]));
         showTitle('Garages');
         console.log(
            getGaragesData(blocks[3])
               .garageCars.filter((car) => car.modelID !== 0)
               .map((car) => ({
                  name: VehicleTypes[car.modelID]
               }))
         );
      });
   });
};

readBSave(PATH_TO_SAVE);
