import React from 'react';

import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import FontIcon from 'material-ui/lib/font-icon';

import PageWrapper from '/client/modules/core/components/PageWrapper.jsx';
import SettingsWrapper from '/client/modules/core/components/SettingsWrapper.jsx';
import MyAccountSettings from './MyAccountSettings.jsx';
import MyAccountNotifications from './MyAccountNotifications.jsx';
import MyAccountProfile from './MyAccountProfile.jsx';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import DownIcon from 'material-ui/lib/svg-icons/navigation/arrow-drop-down';

export default class MyAccount extends React.Component {

  renderMenuList() {
    return (
      <List style={{backgroundColor: 'transparent'}}>
        <ListItem
          primaryText="Settings"
          leftIcon={
            <FontIcon
              className="material-icons"
              color="white"
              style={{left: '12px'}}
            >
              settings
            </FontIcon>
          }
          innerDivStyle={{color: 'white'}}
          nestedListStyle={{background: 'transparent'}}
          primaryTogglesNestedList={true}
          autoGenerateNestedIndicator={false}
          // rightIcon={<DownIcon color="white"/>}
          nestedItems={[
            <ListItem
              key={1}
              primaryText="Username"
              innerDivStyle={{color: 'white'}}
            />,
            <ListItem
              key={2}
              primaryText="Password"
              innerDivStyle={{color: 'white'}}
            />,
            <ListItem
              key={3}
              primaryText="Email"
              innerDivStyle={{color: 'white'}}
            />,
            <ListItem
              key={4}
              primaryText="Translation Language"
              innerDivStyle={{color: 'white'}}
            />,
          ]}
        />
        <ListItem
          primaryText="Notifications"
          leftIcon={
            <FontIcon
              className="material-icons"
              color="white"
              style={{left: '12px'}}
            >
              notifications
            </FontIcon>
          }
          innerDivStyle={{color: 'white'}}
          nestedListStyle={{background: 'transparent'}}
          primaryTogglesNestedList={true}
          autoGenerateNestedIndicator={false}
          // rightIcon={<DownIcon color="white"/>}
          nestedItems={[
            <ListItem
              key={1}
              primaryText="Email Settings"
              innerDivStyle={{color: 'white'}}
            />,
            <ListItem
              key={2}
              primaryText="Mute Alerts"
              innerDivStyle={{color: 'white'}}
            />,
          ]}
        />
        <ListItem
          primaryText="Profile"
          leftIcon={
            <FontIcon
              className="material-icons"
              color="white"
              style={{left: '12px'}}
            >
              face
            </FontIcon>
          }
          innerDivStyle={{color: 'white'}}
          nestedListStyle={{background: 'transparent'}}
          primaryTogglesNestedList={true}
          autoGenerateNestedIndicator={false}
          // rightIcon={<DownIcon color="white"/>}
          nestedItems={[
            <ListItem
              key={1}
              primaryText="Profile Picture"
              innerDivStyle={{color: 'white'}}
            />,
            <ListItem
              key={2}
              primaryText="Blurb"
              innerDivStyle={{color: 'white'}}
            />,
          ]}
        />
      </List>
    );
  }

  render() {
    // const {
    //   goToChat,
    //   username, setUsername,
    //   uploadImage, profileImageUrl,
    //   changePassword,
    //   email, setEmail,
    //   setTranslationLanguage, translationLangCode
    // } = this.props;

    const backgroundColor = '#efefef';
    const highlightColor = '#9e9e9e';
    const tabStyle = {
      color: highlightColor,
    };

    return (
      <SettingsWrapper
        listNode={this.renderMenuList()}
      />
    );
  }
}

// import React from 'react';

// import Tabs from 'material-ui/lib/tabs/tabs';
// import Tab from 'material-ui/lib/tabs/tab';
// import FontIcon from 'material-ui/lib/font-icon';

// import PageWrapper from '/client/modules/core/components/PageWrapper.jsx';
// import MyAccountSettings from './MyAccountSettings.jsx';
// import MyAccountNotifications from './MyAccountNotifications.jsx';
// import MyAccountProfile from './MyAccountProfile.jsx';

// export default class MyAccount extends React.Component {
//   render() {
//     const {
//       goToChat,
//       username, setUsername,
//       uploadImage, profileImageUrl,
//       changePassword,
//       email, setEmail,
//       setTranslationLanguage, translationLangCode
//     } = this.props;

//     const backgroundColor = '#efefef';
//     const highlightColor = '#9e9e9e';
//     const tabStyle = {
//       color: highlightColor,
//     };
//     return (
//       <PageWrapper
//         title="My Account"
//         backButton
//         handleBackButtonPress={goToChat}
//         >
//         <Tabs
//           style={{margin: '0 -25px'}}
//           tabItemContainerStyle={{background: backgroundColor}}
//           contentContainerStyle={{padding: '25px 25px 0'}}
//         >
//           <Tab
//             style={tabStyle}
//             icon={<FontIcon className="material-icons" color={highlightColor}>settings</FontIcon>}
//             label="Settings"
//           >
//             <MyAccountSettings
//               username={username}
//               setUsername={setUsername}
//               changePassword={changePassword}
//               email={email}
//               setEmail={setEmail}
//               setTranslationLanguage={setTranslationLanguage}
//               translationLangCode={translationLangCode}
//             />
//           </Tab>
//           <Tab
//             style={tabStyle}
//             icon={<FontIcon className="material-icons" color={highlightColor}>notifications</FontIcon>}
//             label="Notifications"
//           >
//             <MyAccountNotifications />
//           </Tab>
//           <Tab
//             style={tabStyle}
//             icon={<FontIcon className="material-icons" color={highlightColor}>face</FontIcon>}
//             label="Profile"
//           >
//             <MyAccountProfile
//               username={username}
//               uploadImage={uploadImage}
//               profileImageUrl={profileImageUrl}
//             />
//           </Tab>
//         </Tabs>
//       </PageWrapper>
//     );
//   }
// }
