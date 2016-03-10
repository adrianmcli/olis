import React from 'react';

import Paper from 'material-ui/lib/paper';
// import FlatButton from 'material-ui/lib/flat-button';
// import BackIcon from 'material-ui/lib/svg-icons/navigation/arrow-back';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ActionGrade from 'material-ui/lib/svg-icons/action/grade';
import ContentInbox from 'material-ui/lib/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/lib/svg-icons/content/drafts';
import ContentSend from 'material-ui/lib/svg-icons/content/send';

import DownIcon from 'material-ui/lib/svg-icons/navigation/arrow-drop-down';

export default class SettingsWrapper extends React.Component {

  render() {

    // const {
    //   title,
    //   backButton,
    //   backButtonLabel,
    //   handleBackButtonPress,
    //   showDescription,
    //   lightDescription,
    //   description,
    //   children,
    // } = this.props;

    // const backgroundColor = "url('http://subtlepatterns2015.subtlepatterns.netdna-cdn.com/patterns/geometry.png')";
    // const neutralColor = "#efefef"
    // const highlightColor = "#9e9e9e";

    // const descriptionStyle = {
    //   margin:'25px -25px',
    //   padding:'25px',
    //   color: lightDescription ? highlightColor : "white",
    //   background: lightDescription ? neutralColor : highlightColor,
    // }

    const containerStyle = {
      background: "url('http://subtlepatterns2015.subtlepatterns.netdna-cdn.com/patterns/geometry.png')",
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    };

    const paperStyle = {
      width: '720px',
      height: '500px',
      display: 'flex',
    };

    const sidebarStyle = {
      width: '280px',
      height: '100%',
      backgroundColor: '#2f3f70',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
    };

    const mainSettingsStyle = {
      width: '440px',
      height: '100%',
    };

    return (
      <div style={containerStyle}>
        <Paper style={paperStyle} zDepth={3}>
          <div style={sidebarStyle}>
            <h1 style={{margin: '24px'}}>My Account</h1>
            <div style={{flexGrow: '1', overflowY: 'scroll'}}>
              { this.props.listNode }
            </div>
          </div>
          <div style={mainSettingsStyle}>
          </div>
        </Paper>
      </div>
    );
  }
}

// PageWrapper.defaultProps = {
//   title: "My Title",
//   backButton: false,
//   backButtonLabel: "Back to Chat",
//   handleBackButtonPress: function(){console.log('handleBackButtonPress')},
//   showDescription: false,
//   lightDescription: true,
//   description: "This is where you can describe the purpose of this page.",
// };


// <div style={{height:'100%',overflow:'auto',background:backgroundColor}}>
//         <div style={{
//           width: '920px',
//           minHeight: '100%',
//           margin: 'auto',
//           padding: '36px 0',
//           display: 'table',
//           height: 'inherit',
//         }}>
//           <Paper style={{height:'100%',padding:'25px',display:'table-cell'}} zDepth={2}>
            
//           </Paper>
//         </div>
//       </div>