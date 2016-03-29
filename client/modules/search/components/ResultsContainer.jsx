import React from 'react';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

import Avatar from 'material-ui/lib/avatar';
import NotesIcon from 'material-ui/lib/svg-icons/action/chrome-reader-mode';
import ConvoIcon from 'material-ui/lib/svg-icons/action/question-answer';
import MsgIcon from 'material-ui/lib/svg-icons/communication/chat';

import styles from 'material-ui/lib/styles';

const colors = styles.Colors;

export default class ResultsContainer extends React.Component {

  render() {
    const iconColor = {
      convo: colors.blue300,
      notes: colors.indigo300,
      msgs: colors.purple900,
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
                backgroundColor={iconColor.convo}
              />
            }
            primaryText={<div><strong>Chat Title:</strong> Hiring 2016</div>}
          />
          <ListItem
            leftAvatar={
              <Avatar
                icon={<ConvoIcon />}
                backgroundColor={iconColor.convo}
              />
            }
            primaryText={<div><strong>Chat Title:</strong> Q4 Sales Report 2016</div>}
          />
          <ListItem
            leftAvatar={
              <Avatar
                icon={<NotesIcon />}
                backgroundColor={iconColor.notes}
              />
            }
            primaryText={<div><strong>Notes:</strong> Q4 Sales Report 2016</div>}
          />
          <ListItem
            leftAvatar={
              <Avatar
                icon={<NotesIcon />}
                backgroundColor={iconColor.notes}
              />
            }
            primaryText={<div><strong>Notes:</strong> Hiring 2016</div>}
          />
          <ListItem
            leftAvatar={
              <Avatar
                icon={<MsgIcon />}
                backgroundColor={iconColor.msgs}
              />
            }
            primaryText={<div><strong>In chat:</strong> Q4 Sales Report</div>}
            secondaryText="Hey how are you doing..."
          />
          <ListItem
            leftAvatar={
              <Avatar
                icon={<MsgIcon />}
                backgroundColor={iconColor.msgs}
              />
            }
            primaryText={<div><strong>In chat:</strong> Hiring 2016</div>}
            secondaryText="These interviews are so boring..."
          />
        </List>
      </div>
    );
  }
}
