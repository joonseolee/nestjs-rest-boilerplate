import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { registerAs } from '@nestjs/config';

const YAML_CONFIG_FILENAME = 'env/local.yml';

export default registerAs('app', () => {
  return yaml.load(
    readFileSync(join(__dirname, '../../', YAML_CONFIG_FILENAME), 'utf8'),
  ) as unknown;
});
