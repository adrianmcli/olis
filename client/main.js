import {createApp} from 'mantra-core';
import initContext from './configs/context';

// modules
import testModule from './modules/_myTest';
import coreModule from './modules/core';
import accountModule from './modules/account';
import teamsModule from './modules/teams';
import convosModule from './modules/convos';
import msgsModule from './modules/messages';

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

app.loadModule(testModule);

app.init();
