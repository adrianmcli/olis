import R from 'ramda';

import accountBase from './account';
import accountSet from './account-set';
import accountRegister from './account-register';

export default {
  account: R.mergeAll([
    accountBase, accountSet, accountRegister,
  ]),
};
