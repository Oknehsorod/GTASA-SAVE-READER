import { Buffer } from 'node:buffer';

import * as _ from 'lodash';

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
import * as types from '../types/blocks';
import {
   getDataFromBuffer,
   getDWordFromBuffer,
   getCharFromBuffer,
   getByteFromBuffer,
   getFloatFromBuffer,
   getIntegerFromBuffer,
} from './parsers';

export const getMetaData = (blocks: Buffer[]) =>
   getDataFromBuffer(blocks[0], META_BLOCK) as types.MetaBlock;

export const getScriptData = (blocks: Buffer[]) =>
   getDataFromBuffer(blocks[1], SCRIPT_BLOCK) as types.ScriptBlock;

export const getPlayersData = (blocks: Buffer[]) =>
   getDataFromBuffer(
      blocks[2],
      PLAYERS_AND_OBJECTS_BLOCK
   ) as types.PlayersAndObjectsBlock;

export const getGaragesData = (blocks: Buffer[]) =>
   getDataFromBuffer(blocks[3], GARAGE_BLOCK) as types.GaragesBlock;

export const getPickUpsData = (blocks: Buffer[]) =>
   getDataFromBuffer(blocks[6], PICK_UPS_BLOCK) as types.PickUpsBlock;

export const getPlayerData = (blocks: Buffer[]) =>
   getDataFromBuffer(blocks[15], PLAYER_INFO_BLOCK) as types.PlayerInfoBlock;

export const getStatsData = (blocks: Buffer[]) =>
   getDataFromBuffer(blocks[16], STATS_BLOCK) as types.StatsBlock;

export const getTagsData = (blocks: Buffer[]) =>
   getDataFromBuffer(blocks[20], TAGS_BLOCK) as types.TagsBlock;

export const getStuntJumpsData = (blocks: Buffer[]) =>
   getDataFromBuffer(blocks[24], STUNT_JUMPS_BLOCK) as types.StuntJumpBlock;
