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
            icon: 'person',
            content:
              <Username
                username={username}
                setUsername={setUsername}
              />,
          },
          {
            label: 'Password',
            icon: 'lock',
            content:
              <Password
                changePassword={changePassword}
              />,
          },
          {
            label: 'Email',
            icon: 'email',
            content:
              <Email
                email={email}
                setEmail={setEmail}
              />,
          },
          {
            label: 'Translation',
            icon: 'language',
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
            icon: 'mail_outline',
            content: <div>Email Notification Settings</div>,
          },
          {
            label: 'Mute Alerts',
            icon: 'volume_off',
            content: <div>Mute Alerts</div>,
          },
        ],
      },
      {
        label: 'Profile',
        icon: 'account_box',
        listItems: [
          {
            label: 'Profile Picture',
            icon: 'face',
            content: <div>Change Profile Picture</div>,
          },
          {
            label: 'Blurb',
            icon: 'chat_bubble',
            content: <div>Edit Blurb</div>,
          },
        ],
      },
    ];

    return (
      <SettingsWrapper
        title="My Account"
        dataSrc={dataSource}
        handleBack={goToChat}
      />
    );
  }
}
