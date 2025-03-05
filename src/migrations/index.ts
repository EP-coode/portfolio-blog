import * as migration_20250125_110705 from './20250125_110705';
import * as migration_20250222_174721_about_me_first_setup from './20250222_174721_about_me_first_setup';
import * as migration_20250305_174610 from './20250305_174610';

export const migrations = [
  {
    up: migration_20250125_110705.up,
    down: migration_20250125_110705.down,
    name: '20250125_110705',
  },
  {
    up: migration_20250222_174721_about_me_first_setup.up,
    down: migration_20250222_174721_about_me_first_setup.down,
    name: '20250222_174721_about_me_first_setup',
  },
  {
    up: migration_20250305_174610.up,
    down: migration_20250305_174610.down,
    name: '20250305_174610'
  },
];