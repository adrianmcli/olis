import test from './_myTest';
import teams from './teams';
import convos from './convos';
import msgs from './msgs';
import users from './users';
import notes from './notes';
import sections from './sections';
import notifications from './notifications';
import invites from './invites';
import translations from './translations';
import search from './search';

export default function () {
  test();
  teams();
  convos();
  msgs();
  users();
  notes();
  sections();
  notifications();
  invites();
  translations();
  search();
}
