import { Coordinates } from './common';
import { GarageCarStructure } from './structures';
import { PlayerInfoBlock, StatsBlock } from './blocks';

export type CollectedItem = {
   collected: number;
   items: {
      coordinates: Coordinates;
      isCollected: boolean;
   }[];
};

export type ScriptFormat = {
   missions: Record<string, boolean>;
   schools: {
      driving: {
         isDone: boolean;
         isFullDone: boolean;
         missions: Record<string, number>;
      };
      flying: {
         isDone: boolean;
         isFullDone: boolean;
         missions: Record<string, number>;
      };
      boat: {
         isDone: boolean;
         isFullDone: boolean;
         missions: Record<string, number>;
      };
      bike: {
         isDone: boolean;
         isFullDone: boolean;
         missions: Record<string, number>;
      };
   };
};

export type PlayersFormat = {
   weapons: { type: string; ammo: number }[];
};

export type PickUpFormat = {
   oysters: CollectedItem['items'];
   horseshoes: CollectedItem['items'];
   snapshots: CollectedItem['items'];
};

// Full Save Type
export type SaveFile = {
   missions: ScriptFormat['missions'];
   schools: ScriptFormat['schools'];
   stats: StatsBlock;
   player: PlayerInfoBlock & {
      weapons: { type: string; ammo: number }[];
      cars: GarageCarStructure[];
   };
   collectables: {
      oysters: CollectedItem;
      horseshoes: CollectedItem;
      snapshots: CollectedItem;
      tags: CollectedItem;
      stuntJumps: CollectedItem;
   };
};
