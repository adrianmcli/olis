import {createApp} from 'mantra-core';
import {DocHead} from 'meteor/kadira:dochead';
import initContext from './configs/context';

// modules
import testModule from './modules/_myTest';
import coreModule from './modules/core';
import accountModule from './modules/account';
import teamsModule from './modules/teams';
import convosModule from './modules/convos';
import msgsModule from './modules/messages';
import usersModule from './modules/users';
import notesModule from './modules/notes';

// init context
const context = initContext();

// create app
const app = createApp(context);

// Actions are taken from module and injected thru the routes function during the init()
// Context and all actions (even from other modules) are available to modules
app.loadModule(coreModule);
app.loadModule(accountModule);
app.loadModule(teamsModule);
app.loadModule(convosModule);
app.loadModule(msgsModule);
app.loadModule(usersModule);
app.loadModule(notesModule);

app.loadModule(testModule);

app.init();

// head
DocHead.setTitle('Olis');
DocHead.addLink({
  href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
  rel: 'stylesheet'
});
DocHead.addLink({
  href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css',
  rel: 'stylesheet'
});
