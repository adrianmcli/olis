import test from './_myTest';
import account from './account';
import teams from './teams';
import convos from './convos';
import msgs from './msgs';
import sections from './sections';
import notifications from './notifications';

export default function () {
  test();
  account();
  teams();
  convos();
  msgs();
  sections();
  notifications();
}
