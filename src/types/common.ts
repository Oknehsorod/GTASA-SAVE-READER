export interface GameValue {
   type:
      | 'dword'
      | 'word'
      | 'byte'
      | 'char'
      | 'float'
      | 'int'
      | 'Player'
      | 'Weapon'
      | 'StuntJump'
      | 'GarageCar'
      | 'PickUp';
   arrayLength?: number;
   address: number;
   name: string;
}

export type GameValues = GameValue[];

// Primary Types
export type DWord = number;
export type Word = number;
export type Byte = number;
export type Char = string;
export type Float = number;
export type Int = number;
export type Coordinates = [number, number, number];

// Full Save Type
type CollectedItem = {
   collected: number;
   items: {
      coordinates: Coordinates;
      isCollected: boolean;
   }[];
};

export type SaveFile = {
   missions: ScriptFormat['missions'];
   schools: ScriptFormat['schools'];
   stats: StatsBlock;
   player: PlayerInfoBlock & {
      weapons: PlayersFormat['weapons'];
      cars: GarageCar[];
   };
   collectables: {
      oysters: CollectedItem;
      horseshoes: CollectedItem;
      snapshots: CollectedItem;
      tags: CollectedItem;
      stuntJumps: CollectedItem;
   };
};
