import React from 'react';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';

import SettingsCard from '/client/modules/core/components/SettingsCard.jsx';

export default class MyAccountNotifications extends React.Component {
  render() {
    return (
      <div>

        <SettingsCard
          title="Mute Notifications"
          subtitle="Mute certain types of notifications."
        >
          Mute stuff.
        </SettingsCard>

        <SettingsCard
          title="Email Notifications"
          subtitle="Change the settings for email notifications."
          style={{marginBottom: 'none'}}
        >
          Email stuff.
        </SettingsCard>

      </div>
    );
  }
}
