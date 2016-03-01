import React from 'react';

import Paper from 'material-ui/lib/paper';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import FontIcon from 'material-ui/lib/font-icon';

import PageWrapper from '/client/modules/core/components/PageWrapper.jsx';
import MyAccountSettings from './MyAccountSettings.jsx';
import MyAccountNotifications from './MyAccountNotifications.jsx';

export default class MyAccount extends React.Component {
  render() {
    const backgroundColor = '#efefef';
    const highlightColor = '#9e9e9e';
    const tabStyle = {
      color: highlightColor,
    };
    return (
      <PageWrapper
        title="My Account"
        backButton
        >
        <Tabs
          style={{margin: '0 -25px'}}
          tabItemContainerStyle={{background: backgroundColor}}
          contentContainerStyle={{padding: '25px 25px 0'}}
        >
          <Tab
            style={tabStyle}
            icon={<FontIcon className="material-icons" color={highlightColor}>settings</FontIcon>}
            label="Settings"
          >
            <MyAccountSettings />
          </Tab>
          <Tab
            style={tabStyle}
            icon={<FontIcon className="material-icons" color={highlightColor}>notifications</FontIcon>}
            label="Notifications"
          >
            <MyAccountNotifications />
          </Tab>
          <Tab
            style={tabStyle}
            icon={<FontIcon className="material-icons" color={highlightColor}>face</FontIcon>}
            label="Profile"
          >
            User Profile Settings Here
          </Tab>
        </Tabs>
      </PageWrapper>
    );
  }
}
