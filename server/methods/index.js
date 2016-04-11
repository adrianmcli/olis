import test from './_myTest';
import account from './account';
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

export default function () {
  test();
  account();
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
}
