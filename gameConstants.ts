export interface GameValue {
   type: 'dword' | 'byte' | 'word' | 'float' | 'int';
   wordLength?: number;
   address: number;
   name: string;
}

export type GameValues = GameValue[];

export const meta: GameValues = [
   {
      type: 'dword',
      address: 0x0000,
      name: 'versionID',
   },
   {
      type: 'word',
      wordLength: 100,
      address: 0x0004,
      name: 'saveName',
   },
   {
      type: 'byte',
      address: 0x0084,
      name: 'currentMonth',
   },
   {
      type: 'byte',
      address: 0x0085,
      name: 'currentDay',
   },
   {
      type: 'byte',
      address: 0x0088,
      name: 'currentWeekday',
   },
   {
      type: 'byte',
      address: 0x0086,
      name: 'currentHour',
   },
   {
      type: 'byte',
      address: 0x0087,
      name: 'currentMinute',
   },
   {
      type: 'byte',
      address: 0x0090,
      name: 'isCheater',
   },
   {
      type: 'byte',
      address: 0x0135,
      name: 'isTaxisDone',
   },
   {
      type: 'byte',
      address: 0x0136,
      name: 'isProstitutesDone',
   },
];

export const player: GameValues = [
   {
      type: 'dword',
      address: 0x04,
      name: 'money',
   },
   {
      type: 'byte',
      address: 0x20,
      name: 'hasInfinityRun',
   },
   {
      type: 'byte',
      address: 0x21,
      name: 'hasFastReload',
   },
   {
      type: 'byte',
      address: 0x22,
      name: 'hasFireproof',
   },
   {
      type: 'byte',
      address: 0x23,
      name: 'maxHealth',
   },
   {
      type: 'byte',
      address: 0x24,
      name: 'maxArmor',
   },
];

export const stats: GameValues = [
   {
      type: 'float',
      address: 0x000c,
      name: 'footDistance',
   },
   {
      type: 'float',
      address: 0x0010,
      name: 'carDistance',
   },
   {
      type: 'float',
      address: 0x0014,
      name: 'motorbikeDistance',
   },
   {
      type: 'float',
      address: 0x0018,
      name: 'boatDistance',
   },
   {
      type: 'float',
      address: 0x001c,
      name: 'golfCartDistance',
   },
   {
      type: 'float',
      address: 0x0020,
      name: 'helicopterDistance',
   },
   {
      type: 'float',
      address: 0x0024,
      name: 'planeDistance',
   },
   {
      type: 'float',
      address: 0x0068,
      name: 'swimmingDistance',
   },
   {
      type: 'float',
      address: 0x006c,
      name: 'bicycleDistance',
   },
   {
      type: 'float',
      address: 0x0070,
      name: 'treadmillDistance',
   },
   {
      type: 'float',
      address: 0x0074,
      name: 'exerciseBikeDistance',
   },
   {
      type: 'byte',
      address: 0x01a8,
      name: 'uniqueJumpsFound',
   },
   {
      type: 'byte',
      address: 0x01ac,
      name: 'uniqueJumpsDone',
   },
   {
      type: 'float',
      address: 0x0034,
      name: 'weaponBudget',
   },
   {
      type: 'float',
      address: 0x0038,
      name: 'fashionBudget',
   },
   {
      type: 'float',
      address: 0x003c,
      name: 'propertyBudget',
   },
   {
      type: 'float',
      address: 0x0040,
      name: 'repairPaintBudget',
   },
   {
      type: 'float',
      address: 0x0050,
      name: 'foodBudget',
   },
   {
      type: 'float',
      address: 0x0078,
      name: 'tatooBudget',
   },
   {
      type: 'float',
      address: 0x007c,
      name: 'hairdressingBudget',
   },
   {
      type: 'float',
      address: 0x0084,
      name: 'prostituteBudget',
   },
   {
      type: 'float',
      address: 0x00dc,
      name: 'carModificationBudget',
   },
   {
      type: 'float',
      address: 0x0090,
      name: 'pimpingMoney',
   },
   {
      type: 'float',
      address: 0x0098,
      name: 'gamblingMoney',
   },
   {
      type: 'float',
      address: 0x00a4,
      name: 'burglaryMoney',
   },
   {
      type: 'byte',
      address: 0x00b8,
      name: 'benchpressMaxWeight',
   },
   {
      type: 'byte',
      address: 0x00bc,
      name: 'dumbbellsMaxWeight',
   },
   {
      type: 'float',
      address: 0x0054,
      name: 'fat',
   },
   {
      type: 'float',
      address: 0x0058,
      name: 'stamina',
   },
   {
      type: 'float',
      address: 0x005c,
      name: 'muscle',
   },
   {
      type: 'float',
      address: 0x0060,
      name: 'maxHealth',
   },
   {
      type: 'float',
      address: 0x0100,
      name: 'respect',
   },
   {
      type: 'float',
      address: 0x0140,
      name: 'sexAppeal',
   },
   {
      type: 'float',
      address: 0x0144,
      name: 'gambling',
   },
   {
      type: 'int',
      address: 0x01e8,
      name: 'drivingSkill',
   },
   {
      type: 'float',
      address: 0x0114,
      name: 'pistol',
   },
   {
      type: 'float',
      address: 0x0118,
      name: 'silencedPistol',
   },
   {
      type: 'float',
      address: 0x011c,
      name: 'desertEagel',
   },
   {
      type: 'float',
      address: 0x0120,
      name: 'shotgun',
   },
   {
      type: 'float',
      address: 0x0124,
      name: 'sawnOFF',
   },
   {
      type: 'float',
      address: 0x0128,
      name: 'combatShotgun',
   },
   {
      type: 'float',
      address: 0x012c,
      name: 'machinePistol',
   },
   {
      type: 'float',
      address: 0x0130,
      name: 'SMG',
   },
   {
      type: 'float',
      address: 0x0134,
      name: 'AK47',
   },
   {
      type: 'float',
      address: 0x0138,
      name: 'M4',
   },
   {
      type: 'float',
      address: 0x013c,
      name: 'rifle',
   },
   {
      type: 'int',
      address: 0x02b0,
      name: 'pimpingLevel',
   },
   {
      type: 'float',
      address: 0x02e4,
      name: 'flyingSkill',
   },
   {
      type: 'float',
      address: 0x02ec,
      name: 'lungCapacity',
   },
   {
      type: 'int',
      address: 0x02fc,
      name: 'bikeSkill',
   },
   {
      type: 'int',
      address: 0x0300,
      name: 'cyclingSkill',
   },
   {
      type: 'float',
      address: 0x030c,
      name: 'luck',
   },
   {
      type: 'byte',
      address: 0x032c,
      name: 'horseshoesCollected',
   },
   {
      type: 'byte',
      address: 0x0334,
      name: 'oystersCollected',
   },
   {
      type: 'int',
      address: 0x0170,
      name: 'headshots',
   },
   {
      type: 'int',
      address: 0x0180,
      name: 'daysPassed',
   },
   {
      type: 'int',
      address: 0x01b0,
      name: 'missionAttempts',
   },
   {
      type: 'int',
      address: 0x01b4,
      name: 'missionsPassed',
   },
];
