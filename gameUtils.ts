import { Buffer } from 'node:buffer';

import { meta, player, stats, GameValues, GameValue } from './gameConstants';
import {
   getDWordFromBuffer,
   getWordFromBuffer,
   getByteFromBuffer,
   getFloatFromBuffer,
   getIntegerFromBuffer,
} from './utils';

export const getDataFromBuffer = (buffer: Buffer, constants: GameValues) => {
   const result: Record<string, number | string> = {};
   constants.map(({ type, name, address, wordLength }) => {
      const variants: Record<GameValue['type'], Function> = {
         byte: getByteFromBuffer,
         dword: getDWordFromBuffer,
         word: getWordFromBuffer,
         float: getFloatFromBuffer,
         int: getIntegerFromBuffer,
      };
      result[name] = variants[type](buffer)(address);
   });
   return result;
};

export const getMetaData = (buffer: Buffer) => getDataFromBuffer(buffer, meta);

export const getPlayerData = (buffer: Buffer) =>
   getDataFromBuffer(buffer, player);

export const getStatsData = (buffer: Buffer) =>
   getDataFromBuffer(buffer, stats);
