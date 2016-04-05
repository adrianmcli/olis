import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Login from '../client/modules/account/components/Login';

storiesOf('Login', module)
  .add('basic login page', () => (
    <Login />
  ))