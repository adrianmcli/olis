import test from './_myTest';
import account from './account';
import accountSet from './account-set';
import teams from './teams';
import convos from './convos';
import msgs from './msgs';
import notes from './notes';
import sections from './sections';
import notifications from './notifications';
import images from './images';
import invites from './invites';
import translation from './translation';
import widgets from './widgets';
import locks from './locks';
import register from './register';

export default function () {
  test();
  account();
  accountSet();
  teams();
  convos();
  msgs();
  notes();
  sections();
  notifications();
  images();
  invites();
  translation();
  widgets();
  locks();
  register();
}
