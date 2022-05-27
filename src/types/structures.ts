import { Coordinates } from './common';

export type GarageCarStructure = {
   modelID: Word;
   color: [Byte, Byte, Byte];
   coordinates: Coordinates;
};

export type WeaponStructure = {
   type: DWord;
   ammo: DWord;
};
export type PlayerStructure = {
   weapons: Weapon[];
};
export type StuntJumpStructure = {
   startZone1: Coordinates;
   startZone2: Coordinates;
   landZone1: Coordinates;
   landZone2: Coordinates;
   cameraCoordinates: Coordinates;
   reward: DWord;
   isJumpDone: Byte;
   isJumpFound: Byte;
};
export type PickUpStructure = {
   object: Word;
   coordinates: Coordinates;
   availability: Byte;
   type: Byte;
};
