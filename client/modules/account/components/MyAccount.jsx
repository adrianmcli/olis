import React from 'react';

import SettingsWrapper from '/client/modules/core/components/SettingsWrapper.jsx';

import { Username, Password, Email, TranslateLanguage } from './MyAccountSettings.jsx';
import { ProfilePic } from './MyAccountProfile.jsx';

export default class MyAccount extends React.Component {

  render() {
    const {
      goToChat,
      username, setUsername,
      uploadImage, profileImageUrl,
      changePassword,
      email, setEmail,
      setTranslationLanguage, translationLangCode,
      setMuteNotificationSound, muteNotificationSound
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
                key={1}
                username={username}
                setUsername={setUsername}
              />,
          },
          {
            label: 'Password',
            icon: 'lock',
            content:
              <Password
                key={2}
                changePassword={changePassword}
              />,
          },
          {
            label: 'Email',
            icon: 'email',
            content:
              <Email
                key={3}
                email={email}
                setEmail={setEmail}
              />,
          },
          {
            label: 'Translation',
            icon: 'language',
            content:
              <TranslateLanguage
                key={4}
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
          // {
          //   label: 'Email Settings',
          //   icon: 'mail_outline',
          //   content: <div>Email Notification Settings</div>
          // },
          {
            label: 'Alerts',
            icon: 'volume_off',
            content:
              <div>
                <button onClick={setMuteNotificationSound.bind(null, !muteNotificationSound)}>
                  Toggle {muteNotificationSound.toString()}
                </button>
              </div>,
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
            content:
              <ProfilePic
                username={username}
                uploadImage={uploadImage}
                profileImageUrl={profileImageUrl}
              />,
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
