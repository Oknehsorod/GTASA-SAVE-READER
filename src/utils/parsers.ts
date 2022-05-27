import { StringDecoder } from 'node:string_decoder';

import * as _ from 'lodash';
import bsplit from 'buffer-split';

import { WEAPON_NAMES } from '../gameConstants/common';
import {
    WEAPON_STRUCTURE,
    PLAYER_STRUCTURE,
    PICK_UP_STRUCTURE,
    STUNT_JUMP_STRUCTURE,
    GARAGE_CAR_STRUCTURE,
    STRUCTURE_SIZES,
} from '../gameConstants/structures';

import { GameValues, GameValue } from '../types/common';

export const parseBlocks = (buffer: Buffer) =>
    bsplit(buffer, Buffer.from('BLOCK')).slice(1);

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
                getDataFromBuffer(buffer, PLAYER_STRUCTURE),
            Weapon: (buffer: Buffer) =>
                getDataFromBuffer(buffer, WEAPON_STRUCTURE),
            StuntJump: (buffer: Buffer) =>
                getDataFromBuffer(buffer, STUNT_JUMP_STRUCTURE),
            PickUp: (buffer: Buffer) =>
                getDataFromBuffer(buffer, PICK_UP_STRUCTURE),
            GarageCar: (buffer: Buffer) =>
                getDataFromBuffer(buffer, GARAGE_CAR_STRUCTURE),
        };
        const func: Function = variants[type];
        const typeSize: number = STRUCTURE_SIZES[type];
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
