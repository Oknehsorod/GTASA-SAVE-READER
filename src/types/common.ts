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
