import {
   GarageCarStructure,
   PlayerStructure,
   PickUpStructure,
   StuntJumpStructure,
} from './structures';
import { Byte, Word, DWord, Float, Char, Int } from './common';

export type GaragesBlock = {
   garageCars: GarageCarStructure[];
};

export type ScriptBlock = {
   intSection: Byte;
   sweetSection: Byte;
   ryderSection: Byte;
   smokeSection: Byte;
   strapSection: Byte;
   crashSection: Byte;
   cesarSection: Byte;
   la1finSection: Byte;
   truSection: Byte;
   bcesarSection: Byte;
   bcrashSection: Byte;
   garageSection: Byte;
   zeroSection: Byte;
   wuziSection: Byte;
   stealSection: Byte;
   syndSection: Byte;
   scrashSection: Byte;
   desertSection: Byte;
   casinoSection: Byte;
   vcrashSection: Byte;
   docSection: Byte;
   heistSection: Byte;
   mansionSection: Byte;
   groveSection: Byte;
   riotSection: Byte;
   cat1: Byte;
   cat2: Byte;
   cat3: Byte;
   cat4: Byte;
   cat4Section: Byte;
   'drivingSchool.360': Byte;
   'drivingSchool.180': Byte;
   'drivingSchool.WhipAndTerminate': Byte;
   'drivingSchool.PopAndControl': Byte;
   'drivingSchool.BurnAndLap': Byte;
   'drivingSchool.ConeCoil': Byte;
   'drivingSchool.90': Byte;
   'drivingSchool.WheelieWeave': Byte;
   'drivingSchool.SpinAndGo': Byte;
   'drivingSchool.PITManeuver': Byte;
   'drivingSchool.AlleyOop': Byte;
   'drivingSchool.CitySlicking': Byte;
   'flyingSchool.Takeoff': Byte;
   'flyingSchool.LandPlane': Byte;
   'flyingSchool.CircleAirstrip': Byte;
   'flyingSchool.CircleAirstripAndLand': Byte;
   'flyingSchool.HelicopterTakeoff': Byte;
   'flyingSchool.LandHelicopter': Byte;
   'flyingSchool.DestroyTargets': Byte;
   'flyingSchool.LoopTheLoop': Byte;
   'flyingSchool.BarrelRoll': Byte;
   'flyingSchool.ParachuteOntoTarget': Byte;
   'boatSchool.BasicSeamanship': Int;
   'boatSchool.PlotACourse': Int;
   'boatSchool.FreshSlalom': Int;
   'boatSchool.FlyingFish': Int;
   'boatSchool.LandSeaAndAir': Int;
   'bikeSchool.360': Byte;
   'bikeSchool.180': Byte;
   'bikeSchool.TheWheelie': Byte;
   'bikeSchool.JumpAndStop': Byte;
   'bikeSchool.TheStoppie': Byte;
   'bikeSchool.JumpAndStoppie': Byte;

   tagsCollected: Byte;
};

export type StuntJumpBlock = {
   numberOfUniqueStuntJumps: DWord;
   stuntJumps: StuntJumpStructure[];
};

export type PickUpsBlock = {
   pickUps: PickUpStructure[];
};

export type PlayersAndObjectsBlock = {
   numberOfPlayers: DWord;
   players: PlayerStructure[];
};

export type MetaBlock = {
   versionID: DWord;
   saveName: Char[];
   currentMonth: Byte;
   currentDay: Byte;
   currentWeekday: Byte;
   currentHour: Byte;
   currentMinute: Byte;
   isCheater: Byte;
   isTaxisDone: Byte;
   isProstitutesDone: Byte;
};

export type PlayerInfoBlock = {
   money: DWord;
   hasInfinityRun: Byte;
   hasFastReload: Byte;
   hasFireproof: Byte;
   maxHealth: Byte;
   maxArmor: Byte;
};

export type TagsBlock = {
   totalTags: DWord;
   tags: Byte[];
};

export type StatsBlock = {
   footDistance: Float;
   carDistance: Float;
   motorbikeDistance: Float;
   boatDistance: Float;
   golfCartDistance: Float;
   helicopterDistance: Float;
   planeDistance: Float;
   swimmingDistance: Float;
   bicycleDistance: Float;
   treadmillDistance: Float;
   exerciseBikeDistance: Float;

   uniqueJumpsFound: Byte;
   uniqueJumpsDone: Byte;

   weaponBudget: Float;
   fashionBudget: Float;
   propertyBudget: Float;
   repairPaintBudget: Float;
   foodBudget: Float;
   tatooBudget: Float;
   hairdressingBudget: Float;
   prostituteBudget: Float;
   carModificationBudget: Float;

   pimpingMoney: Float;
   gamblingMoney: Float;
   burglaryMoney: Float;

   benchpressMaxWeight: Byte;
   dumbbellsMaxWeight: Byte;

   fat: Float;
   stamina: Float;
   muscle: Float;
   maxHealth: Float;

   respect: Float;
   sexAppeal: Float;
   gambling: Float;

   drivingSkill: Int;
   pistol: Float;
   silencedPistol: Float;
   desertEagel: Float;
   shotgun: Float;
   sawnOFF: Float;
   combatShotgun: Float;
   machinePistol: Float;
   SMG: Float;
   AK47: Float;
   M4: Float;
   rifle: Float;
   pimpingLevel: Int;
   flyingSkill: Float;
   lungCapacity: Float;
   bikeSkill: Int;
   cyclingSkill: Int;
   luck: Float;

   horseshoesCollected: Byte;
   oystersCollected: Byte;
   snapshotsCollected: Byte;

   headshots: Int;
   daysPassed: Int;
   missionAttempts: Int;
   missionsPassed: Int;
};
