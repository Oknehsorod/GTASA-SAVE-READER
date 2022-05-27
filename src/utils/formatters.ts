import {
   MetaBlock,
   ScriptBlock,
   PlayersAndObjectsBlock,
   PickUpsBlock,
   TagsBlock,
} from '../types/blocks';
import { PickUpStructure, PlayerStructure } from '../types/structures';
import {
   ScriptFormat,
   PlayersFormat,
   PickUpFormat,
   SaveFile,
} from '../types/formatters';
import { Coordinates } from '../types/common';

import {
   getStuntJumpsData,
   getGaragesData,
   getPlayerData,
   getPlayersData,
   getStatsData,
   getScriptData,
   getPickUpsData,
   getTagsData,
} from './blockReaders';
import {
   VERSIONS,
   MISSIONS,
   WEAPON_NAMES,
   PICK_UPS_TYPES,
   TAGS_COORDINATES,
   SCHOOL_MISSIONS,
} from '../gameConstants/common';

export const formatMetaBlock = (block: MetaBlock) => {
   const versionID = VERSIONS[block.versionID.toString(16)];

   return {
      ...block,
      versionID,
   };
};

export const formatScriptBlock = (block: ScriptBlock) => {
   const result: ScriptFormat = {
      missions: {},
      schools: {
         driving: {
            isDone: false,
            isFullDone: false,
            missions: {},
         },
         flying: {
            isDone: false,
            isFullDone: false,
            missions: {},
         },
         boat: {
            isDone: false,
            isFullDone: false,
            missions: {},
         },
         bike: {
            isDone: false,
            isFullDone: false,
            missions: {},
         },
      },
   };

   const getMissionCompletion =
      (section: keyof ScriptBlock) => (mission: string, idx: number) =>
         (result.missions[mission] = block[section] >= idx + 1);
   const iterateMissions = (missions: string[], section: keyof ScriptBlock) =>
      missions.forEach(getMissionCompletion(section));

   Object.keys(MISSIONS).forEach((section) =>
      iterateMissions(
         MISSIONS[section as keyof ScriptBlock],
         section as keyof ScriptBlock
      )
   );

   result.missions['Farewell, my love...'] = block.bcesarSection >= 6;

   (
      Object.keys(SCHOOL_MISSIONS) as Array<keyof typeof SCHOOL_MISSIONS>
   ).forEach((key) => {
      const missionName = SCHOOL_MISSIONS[key];
      if (!missionName) return;
      if (key.startsWith('drivingSchool'))
         result.schools.driving.missions[missionName] = block[key];
      if (key.startsWith('flyingSchool'))
         result.schools.flying.missions[missionName] = block[key];
      if (key.startsWith('boatSchool'))
         result.schools.boat.missions[missionName] = block[key];
      if (key.startsWith('bikeSchool'))
         result.schools.bike.missions[missionName] = block[key];
   });

   result.schools.driving.isDone = Object.values(
      result.schools.driving.missions
   ).every((mission) => mission > 69);
   result.schools.driving.isFullDone = Object.values(
      result.schools.driving.missions
   ).every((mission) => mission === 100);

   result.schools.flying.isDone = Object.values(
      result.schools.flying.missions
   ).every((mission) => mission > 69);
   result.schools.flying.isFullDone = Object.values(
      result.schools.flying.missions
   ).every((mission) => mission === 100);

   result.schools.boat.isDone = [
      result.schools.boat.missions['Basic Seamanship'] < 12000,
      result.schools.boat.missions['Plot a Course'] < 40000,
      result.schools.boat.missions['Fresh Slalom'] < 120000,
      result.schools.boat.missions['Flying Fish'] > 55,
      result.schools.boat.missions['Land, Sea and Air'] < 180000,
   ].every((exp) => exp);

   // TODO: Find minimal values for gold medals
   result.schools.boat.isFullDone = [
      result.schools.boat.missions['Basic Seamanship'] <= 9680,
      result.schools.boat.missions['Plot a Course'] <= 31123,
      result.schools.boat.missions['Fresh Slalom'] <= 76289,
      result.schools.boat.missions['Flying Fish'] >= 67,
      result.schools.boat.missions['Land, Sea and Air'] <= 125982,
   ].every((exp) => exp);

   result.schools.bike.isDone = Object.values(
      result.schools.bike.missions
   ).every((mission) => mission > 69);
   result.schools.bike.isFullDone = Object.values(
      result.schools.bike.missions
   ).every((mission) => mission === 100);

   return result;
};

export const formatPlayersBlock = (
   block: PlayersAndObjectsBlock
): PlayersFormat => {
   const { weapons } = block.players[0] as PlayerStructure;

   return {
      weapons: weapons.map((weapon) => ({
         type: WEAPON_NAMES[weapon.type],
         ammo: weapon.ammo,
      })),
   };
};

export const formatPickUpsBlock = (block: PickUpsBlock): PickUpFormat => {
   const oysters = block.pickUps.filter(
      ({ object }) => object === PICK_UPS_TYPES.oyster
   );
   const snapshots = block.pickUps.filter(
      ({ object }) => object === PICK_UPS_TYPES.snapshot
   );
   const horseshoes = block.pickUps.filter(
      ({ object }) => object === PICK_UPS_TYPES.horseshoe
   );

   const formatPickup = (pickUps: PickUpStructure[]) =>
      pickUps.map(({ type, coordinates, availability }) => ({
         coordinates: coordinates.map(
            (coordinate) => coordinate / 8
         ) as Coordinates,
         isCollected: availability === 9 || type === 0,
      }));

   return {
      oysters: formatPickup(oysters),
      snapshots: formatPickup(snapshots),
      horseshoes: formatPickup(horseshoes),
   };
};

export const formatTagsBlock = (block: TagsBlock) => {
   return block.tags.map((tag, idx) => ({
      coordinates: TAGS_COORDINATES[idx],
      isCollected: tag > 0,
   }));
};

export const getSaveFileData = (blocks: Buffer[]): SaveFile => {
   const rawScript = getScriptData(blocks);
   const { missions, schools } = formatScriptBlock(rawScript);
   const stats = getStatsData(blocks);
   const playerInfo = getPlayerData(blocks);
   const { weapons } = getPlayersData(blocks).players[0];
   const { garageCars } = getGaragesData(blocks);
   const tags = formatTagsBlock(getTagsData(blocks));
   const pickUps = formatPickUpsBlock(getPickUpsData(blocks));
   const { stuntJumps } = getStuntJumpsData(blocks);
   return {
      missions,
      schools,
      stats,
      player: {
         ...playerInfo,
         weapons: weapons.map((weapon) => ({
            type: WEAPON_NAMES[weapon.type],
            ammo: weapon.ammo,
         })),
         cars: garageCars.filter(({ modelID }) => modelID !== 0),
      },
      collectables: {
         tags: {
            collected: rawScript.tagsCollected,
            items: tags,
         },
         stuntJumps: {
            collected: stats.uniqueJumpsDone,
            items: stuntJumps.map(({ startZone1, isJumpDone }) => ({
               isCollected: isJumpDone > 0,
               coordinates: startZone1,
            })),
         },
         snapshots: {
            collected: stats.snapshotsCollected,
            items: pickUps.snapshots,
         },
         oysters: {
            collected: stats.oystersCollected,
            items: pickUps.oysters,
         },
         horseshoes: {
            collected: stats.horseshoesCollected,
            items: pickUps.horseshoes,
         },
      },
   };
};
