import { CollectedItem } from './common';

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
