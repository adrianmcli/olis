import React from 'react';

import SettingsWrapper from '/client/modules/core/components/SettingsWrapper.jsx';

import { Username, Password, Email, TranslateLanguage } from './MyAccountSettings.jsx';

export default class MyAccount extends React.Component {

  render() {
    const {
      goToChat,
      username, setUsername,
      uploadImage, profileImageUrl,
      changePassword,
      email, setEmail,
      setTranslationLanguage, translationLangCode
    } = this.props;

    const dataSource = [
      {
        label: 'Settings',
        icon: 'settings',
        listItems: [
          {
            label: 'Username',
            content:
              <Username
                username={username}
                setUsername={setUsername}
              />,
          },
          {
            label: 'Password',
            content:
              <Password
                changePassword={changePassword}
              />,
          },
          {
            label: 'Email',
            content:
              <Email
                email={email}
                setEmail={setEmail}
              />,
          },
          {
            label: 'Translation Language',
            content:
              <TranslateLanguage
                setTranslationLanguage={setTranslationLanguage}
                translationLangCode={translationLangCode}
              />,
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

    return (
      <SettingsWrapper
        title="My Account"
        dataSrc={dataSource}
      />
    );
  }
}
