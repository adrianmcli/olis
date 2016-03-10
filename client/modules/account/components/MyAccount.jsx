import React from 'react';

import SettingsWrapper from '/client/modules/core/components/SettingsWrapper.jsx';

export default class MyAccount extends React.Component {

  dataSource() {
    return [
      {
        label: 'Settings',
        icon: 'settings',
        listItems: [
          {
            label: 'Username',
            content: <div>Change Username</div>,
          },
          {
            label: 'Password',
            content: <div>Change Password</div>,
          },
          {
            label: 'Email',
            content: <div>Change Email</div>,
          },
          {
            label: 'Translation Language',
            content: <div>Change Translation Language</div>,
          },
        ],
      },
      {
        label: 'Notifications',
        icon: 'notifications',
        listItems: [
          {
            label: 'Email Settings',
            content: <div>Email Notification Settings</div>,
          },
          {
            label: 'Mute Alerts',
            content: <div>Mute Alerts</div>,
          },
        ],
      },
      {
        label: 'Profile',
        icon: 'face',
        listItems: [
          {
            label: 'Profile Picture',
            content: <div>Change Profile Picture</div>,
          },
          {
            label: 'Blurb',
            content: <div>Edit Blurb</div>,
          },
        ],
      },
    ];
  }

  render() {
    return (
      <SettingsWrapper
        title="My Account"
        dataSrc={this.dataSource()}
      />
    );
  }
}
