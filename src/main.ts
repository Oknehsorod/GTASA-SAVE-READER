import * as fs from 'node:fs';

import { parseBlocks } from './utils/parsers';
import { getSaveFileData } from './utils/formatters';

const parseGTASASaveFileToJSON = (data: buffer) => {
   const blocks = parseBlocks(data);
   return getSaveFileData(blocks);
};

export default parseGTASASaveFileToJSON;
