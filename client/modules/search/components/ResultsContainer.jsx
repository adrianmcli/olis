import React from 'react';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';

import Avatar from 'material-ui/lib/avatar';
import NotesIcon from 'material-ui/lib/svg-icons/action/chrome-reader-mode';
import ConvoIcon from 'material-ui/lib/svg-icons/action/question-answer';
import MsgIcon from 'material-ui/lib/svg-icons/communication/chat';

import styles from 'material-ui/lib/styles';

const colors = styles.Colors;

export default class ResultsContainer extends React.Component {

  render() {
    const convo = {
      color: colors.white,
      bgColor: colors.blue300,
    };
    const notes = {
      color: colors.white,
      bgColor: colors.indigo300,
    };
    const msgs = {
      color: colors.white,
      bgColor: colors.purple900,
    };

    return (
      <div>
        <List>
          <ListItem
            leftAvatar={<Avatar src="http://www.fillmurray.com/200/200" />}
            primaryText="Bob Saget"
          />
          <ListItem
            leftAvatar={<Avatar src="http://www.fillmurray.com/201/200" />}
            primaryText="Fill Murray"
          />
          <ListItem
            leftAvatar={
              <Avatar
                icon={<ConvoIcon />}
                color={convo.color}
                backgroundColor={convo.bgColor}
              />
            }
            primaryText="Hiring 2016"
          />
          <ListItem
            leftAvatar={
              <Avatar
                icon={<ConvoIcon />}
                color={convo.color}
                backgroundColor={convo.bgColor}
              />
            }
            primaryText="Q4 Sales Report 2016"
          />
          <ListItem
            leftAvatar={
              <Avatar
                icon={<NotesIcon />}
                color={notes.color}
                backgroundColor={notes.bgColor}
              />
            }
            primaryText="Q4 Sales Report"
          />
          <ListItem
            leftAvatar={
              <Avatar
                icon={<NotesIcon />}
                color={notes.color}
                backgroundColor={notes.bgColor}
              />
            }
            primaryText="Hiring 2016"
          />
          <ListItem
            leftAvatar={
              <Avatar
                icon={<MsgIcon />}
                color={msgs.color}
                backgroundColor={msgs.bgColor}
              />
            }
            primaryText="Q4 Sales Report"
            secondaryText="Hey how are you doing..."
          />
          <ListItem
            leftAvatar={
              <Avatar
                icon={<MsgIcon />}
                color={msgs.color}
                backgroundColor={msgs.bgColor}
              />
            }
            primaryText="Hiring 2016"
            secondaryText="These interviews are so boring..."
          />
        </List>
      </div>
    );
  }
}
