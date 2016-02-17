import {createApp} from 'mantra-core';
import initContext from './configs/context';

// modules
import testModule from './modules/test';
import coreModule from './modules/core';
import _usersModule from './modules/_users';

// init context
const context = initContext();

// create app
const app = createApp(context);

// Actions are taken from module and injected thru the routes function during the init()
// Context and all actions (even from other modules) are available to modules
app.loadModule(coreModule);
app.loadModule(_usersModule);
app.loadModule(testModule);

app.init();
