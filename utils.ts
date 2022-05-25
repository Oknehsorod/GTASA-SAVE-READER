import * as _ from 'lodash';
import { StringDecoder } from 'node:string_decoder';
//@ts-ignore
import bsplitter from 'buffer-splitter';
import {
    WeaponStructure,
    PlayerStructure,
    PickUpStructure,
    StuntJumpStructure,
    GarageCarStructure,
    WeaponNames,
    StructureSizes,
} from './gameConstants';

import { GameValues, GameValue } from './gameConstants/types';

//@ts-ignore
export const parseBlocks = (buffer: Buffer) =>
    bsplitter(buffer, Buffer.from('BLOCK')).slice(1);

export const getFloatFromBuffer = (buffer: Buffer) => {
    const originBuffer = _.cloneDeep(buffer);
    originBuffer.reverse();

    const dataView = new DataView(new ArrayBuffer(4));
    originBuffer.forEach((b: number, i: number) => dataView.setUint8(i, b));

    return dataView.getFloat32(0);
};

export const getIntegerFromBuffer = (buffer: Buffer) =>
    Buffer.from(buffer).readUIntLE(0, 3);

export const getByteFromBuffer = (buffer: Buffer) => buffer[0];

export const getWordFromBuffer = (buffer: Buffer) =>
    Buffer.from(buffer).readUInt16LE(0);

export const getDWordFromBuffer = (buffer: Buffer) =>
    Buffer.from(buffer).readUInt32LE(0);

export const getCharFromBuffer = (buffer: Buffer) =>
    String.fromCharCode(buffer[0]);

export const getDataFromBuffer = (buffer: Buffer, constants: GameValues) => {
    const result: Record<string, any> = {};
    constants.map(({ type, name, address, arrayLength }) => {
        const variants: Record<GameValue['type'], Function> = {
            byte: getByteFromBuffer,
            dword: getDWordFromBuffer,
            word: getWordFromBuffer,
            char: getCharFromBuffer,
            float: getFloatFromBuffer,
            int: getIntegerFromBuffer,
            Player: (buffer: Buffer) =>
                getDataFromBuffer(buffer, PlayerStructure),
            Weapon: (buffer: Buffer) =>
                getDataFromBuffer(buffer, WeaponStructure),
            StuntJump: (buffer: Buffer) =>
                getDataFromBuffer(buffer, StuntJumpStructure),
            PickUp: (buffer: Buffer) =>
                getDataFromBuffer(buffer, PickUpStructure),
            GarageCar: (buffer: Buffer) =>
                getDataFromBuffer(buffer, GarageCarStructure),
        };
        const func: Function = variants[type];
        const typeSize: number = StructureSizes[type];
        if (arrayLength) {
            const arrayBuffer = _.chunk(
                buffer.slice(address, address + arrayLength * typeSize),
                typeSize
            );
            result[name] = arrayBuffer.map((b) => func(b));
            if (type === 'char') {
                result[name] = result[name].join('');
            }
            return;
        }
        result[name] = func(buffer.slice(address, address + typeSize));
    });
    return result;
};
