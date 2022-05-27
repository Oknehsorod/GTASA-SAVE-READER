import { Buffer } from 'node:buffer';

import {
   META_BLOCK,
   PLAYER_INFO_BLOCK,
   STUNT_JUMPS_BLOCK,
   PICK_UPS_BLOCK,
   STATS_BLOCK,
   TAGS_BLOCK,
   PLAYERS_AND_OBJECTS_BLOCK,
   SCRIPT_BLOCK,
   GARAGE_BLOCK,
} from '../gameConstants/blocks';
import {
   MetaBlock,
   ScriptBlock,
   PlayersAndObjectsBlock,
   GaragesBlock,
   PickUpsBlock,
   PlayerInfoBlock,
   StatsBlock,
   TagsBlock,
   StuntJumpBlock,
} from '../types/blocks';
import { getDataFromBuffer } from './parsers';

export const getMetaData = (blocks: Buffer[]) =>
   getDataFromBuffer(blocks[0], META_BLOCK) as MetaBlock;

export const getScriptData = (blocks: Buffer[]) =>
   getDataFromBuffer(blocks[1], SCRIPT_BLOCK) as ScriptBlock;

export const getPlayersData = (blocks: Buffer[]) =>
   getDataFromBuffer(
      blocks[2],
      PLAYERS_AND_OBJECTS_BLOCK
   ) as PlayersAndObjectsBlock;

export const getGaragesData = (blocks: Buffer[]) =>
   getDataFromBuffer(blocks[3], GARAGE_BLOCK) as GaragesBlock;

export const getPickUpsData = (blocks: Buffer[]) =>
   getDataFromBuffer(blocks[6], PICK_UPS_BLOCK) as PickUpsBlock;

export const getPlayerData = (blocks: Buffer[]) =>
   getDataFromBuffer(blocks[15], PLAYER_INFO_BLOCK) as PlayerInfoBlock;

export const getStatsData = (blocks: Buffer[]) =>
   getDataFromBuffer(blocks[16], STATS_BLOCK) as StatsBlock;

export const getTagsData = (blocks: Buffer[]) =>
   getDataFromBuffer(blocks[20], TAGS_BLOCK) as TagsBlock;

export const getStuntJumpsData = (blocks: Buffer[]) =>
   getDataFromBuffer(blocks[24], STUNT_JUMPS_BLOCK) as StuntJumpBlock;
