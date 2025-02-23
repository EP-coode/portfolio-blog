import * as migration_20250223_120726 from './20250223_120726';

export const migrations = [
  {
    up: migration_20250223_120726.up,
    down: migration_20250223_120726.down,
    name: '20250223_120726'
  },
];
