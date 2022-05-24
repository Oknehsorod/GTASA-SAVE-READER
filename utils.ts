import _ from 'lodash';
//@ts-ignore
import bsplitter from 'buffer-splitter';
import { Buffer } from 'node:buffer';

//@ts-ignore
export const parseBlocks = (buffer: Buffer) =>
    bsplitter(buffer, Buffer.from('BLOCK')).slice(1);

export const getFloatFromBuffer =
    (buffer: Buffer) =>
    (offset: number, isReversed: boolean = true) => {
        const originBuffer = _.cloneDeep(buffer.slice(offset, offset + 4));
        if (isReversed) originBuffer.reverse();

        const dataView = new DataView(new ArrayBuffer(4));
        originBuffer.forEach((b: number, i: number) => dataView.setUint8(i, b));

        return dataView.getFloat32(0);
    };

export const getIntegerFromBuffer = (buffer: Buffer) => (offset: number) =>
    buffer.slice(offset, offset + 3).readUIntLE(0, 3);

export const getByteFromBuffer = (buffer: Buffer) => (offset: number) =>
    buffer[offset];

export const getDWordFromBuffer = (buffer: Buffer) => (offset: number) =>
    buffer.readUInt32LE(offset);

export const getWordFromBuffer =
    (buffer: Buffer) =>
    (offset: number, length: number = 100) =>
        String.fromCharCode(...buffer.slice(offset, offset + length));
