import { Buffer } from 'node:buffer';
import chunk from 'lodash.chunk';
import cloneDeep from 'lodash.clonedeep';
import bsplit from 'buffer-split';

import {
    WEAPON_STRUCTURE,
    PLAYER_STRUCTURE,
    PICK_UP_STRUCTURE,
    STUNT_JUMP_STRUCTURE,
    GARAGE_CAR_STRUCTURE,
    STRUCTURE_SIZES,
} from '../gameConstants/structures';

import {
    GameValues,
    GameValue,
    Byte,
    Float,
    Int,
    Word,
    DWord,
    Char,
} from '../types/common';

export const parseBlocks = (buffer: Buffer) =>
    bsplit(buffer, Buffer.from('BLOCK')).slice(1);

export const getFloatFromBuffer = (buffer: Buffer): Float => {
    const originBuffer = cloneDeep(buffer);
    originBuffer.reverse();

    const dataView = new DataView(new ArrayBuffer(4));
    originBuffer.forEach((b: number, i: number) => dataView.setUint8(i, b));

    return dataView.getFloat32(0);
};

export const getIntegerFromBuffer = (buffer: Buffer): Int =>
    Buffer.from(buffer).readUIntLE(0, 3);

export const getByteFromBuffer = (buffer: Buffer): Byte => buffer[0];

export const getWordFromBuffer = (buffer: Buffer): Word =>
    Buffer.from(buffer).readUInt16LE(0);

export const getDWordFromBuffer = (buffer: Buffer): DWord =>
    Buffer.from(buffer).readUInt32LE(0);

export const getCharFromBuffer = (buffer: Buffer): Char =>
    String.fromCharCode(buffer[0]);

export const getDataFromBuffer = (buffer: Buffer, constants: GameValues) => {
    // Any because typescript doesn't support recursive types
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: Record<string, any> = {};
    constants.map(({ type, name, address, arrayLength }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const variants: Record<GameValue['type'], (buffer: Buffer, constants?: GameValues) => any 
        > = {
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
        const func = variants[type];
        const typeSize: number = STRUCTURE_SIZES[type];
        if (arrayLength) {
            const arrayBuffer = chunk(
                buffer.slice(address, address + arrayLength * typeSize),
                typeSize
            ) as unknown as Buffer[];
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
