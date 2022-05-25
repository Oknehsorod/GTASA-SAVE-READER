import { Buffer } from 'node:buffer';
import * as _ from 'lodash';

import {
   MetaBlock,
   PlayerInfoBlock,
   StuntJumpBlock,
   PickUpsBlock,
   StatsBlock,
   TagsBlock,
   PlayersAndObjectsBlock,
   ScriptBlock,
   GaragesBlock,
} from './gameConstants';
import * as types from './gameConstants/types';
import {
   getDataFromBuffer,
   getDWordFromBuffer,
   getCharFromBuffer,
   getByteFromBuffer,
   getFloatFromBuffer,
   getIntegerFromBuffer,
} from './utils';

export const getMetaData = (buffer: Buffer) =>
   getDataFromBuffer(buffer, MetaBlock) as types.MetaBlock;

export const getPlayerData = (buffer: Buffer) =>
   getDataFromBuffer(buffer, PlayerInfoBlock) as types.PlayerInfoBlock;

export const getStatsData = (buffer: Buffer) =>
   getDataFromBuffer(buffer, StatsBlock) as types.StatsBlock;

export const getPlayersData = (buffer: Buffer) =>
   getDataFromBuffer(
      buffer,
      PlayersAndObjectsBlock
   ) as types.PlayersAndObjectsBlock;

export const getTagsData = (buffer: Buffer) =>
   getDataFromBuffer(buffer, TagsBlock) as types.TagsBlock;

export const getStuntJumpsData = (buffer: Buffer) =>
   getDataFromBuffer(buffer, StuntJumpBlock) as types.StuntJumpBlock;

export const getPickUpsData = (buffer: Buffer) =>
   getDataFromBuffer(buffer, PickUpsBlock) as types.PickUpsBlock;

export const getScriptData = (buffer: Buffer) =>
   getDataFromBuffer(buffer, ScriptBlock) as types.ScriptBlock;

export const getGaragesData = (buffer: Buffer) =>
   getDataFromBuffer(buffer, GaragesBlock) as types.GaragesBlock;
