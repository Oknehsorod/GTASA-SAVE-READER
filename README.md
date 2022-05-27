# GTA San Andreas Savefile Parser
This is a simple parser for .b files of GTA SA.

### Parser Returned Value
```ts
export type SaveFile = {
   missions: ScriptFormat['missions']; // All missions in the game [nameOfTheMission]: boolean
   schools: ScriptFormat['schools']; // All schools in the game (driving,flying,boat,bike)
   stats: StatsBlock; // Statistic of your savefile (your skills, records, etc.)
   player: PlayerInfoBlock & {
      weapons: { type: string; ammo: number }[]; // What weapons CJ has in the game 
      cars: GarageCarStructure[]; // What cars CJ has in the garages
   };
   collectables: {
      oysters: CollectedItem; // Data for oyster collectable, it has full array of data
      horseshoes: CollectedItem; // Data for horseshoe collectable, if you collected all of them then this array will be empty
      snapshots: CollectedItem; // Data for snapshot collectable, if you collected all of them then this array wil be various length but with isCollected: true in every item of array;
      tags: CollectedItem;  // Data for tags collectable, it has full array of data
      stuntJumps: CollectedItem; // Data for stunt jump collectable, it has full array of data
   };
};
```
