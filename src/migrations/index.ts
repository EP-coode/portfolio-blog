import * as migration_20250125_110705 from './20250125_110705';

export const migrations = [
  {
    up: migration_20250125_110705.up,
    down: migration_20250125_110705.down,
    name: '20250125_110705'
  },
];
