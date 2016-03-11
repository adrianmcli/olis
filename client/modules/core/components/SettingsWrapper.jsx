import React from 'react';

import Paper from 'material-ui/lib/paper';
import FontIcon from 'material-ui/lib/font-icon';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

import RaisedButton from 'material-ui/lib/raised-button';
import BackIcon from 'material-ui/lib/svg-icons/navigation/arrow-back';

// import DownIcon from 'material-ui/lib/svg-icons/navigation/arrow-drop-down';

export default class SettingsWrapper extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      i: null,
      j: null,
    };
  }

  defaultContent() {
    const containerStyle = {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#9e9e9e',
    };
    return (
      <div style={containerStyle}>
        <FontIcon
          className="material-icons"
          style={{fontSize: '72px', color: '#9e9e9e'}}
        >
          settings_applications
        </FontIcon>
        <p>Please select an option on your left.</p>
      </div>
    );
  }

  renderMenuItemIcon(iconString) {
    return (
      <FontIcon
        className="material-icons"
        color="white"
        style={{left: '12px'}}
      >
        { iconString }
      </FontIcon>
    );
  }

  generateListFromData(sourceData) {

    const _renderListItems = (srcArray, i) => {
      return srcArray.map((listItem, j) => {
        const { label, icon } = listItem;
        return (
          <ListItem
            key={ j }
            primaryText={ label }
            innerDivStyle={{color: 'white'}}
            leftIcon={ this.renderMenuItemIcon.bind(this)( icon ) }
            onTouchTap={() => this.setState({i, j})}
          />
        );
      });
    };

    const result = sourceData.map( (category, i) => {
      const { label, icon, listItems } = category;
      return (
        <ListItem
          key={ i }
          primaryText={ label }
          leftIcon={ this.renderMenuItemIcon.bind(this)( icon ) }
          innerDivStyle={{color: 'white'}}
          nestedListStyle={{background: 'transparent'}}
          primaryTogglesNestedList={true}
          autoGenerateNestedIndicator={false}
          nestedItems={ _renderListItems(listItems, i) }
        />
      );
    });

    return (<List style={{backgroundColor: 'transparent'}}>{result}</List>);
  }

  renderMainComponent() {
    const { dataSrc } = this.props;
    const i = this.state.i;
    const j = this.state.j;

    if (i !== null) {
      return dataSrc[i].listItems[j].content;
    }
    return this.defaultContent();
  }

  render() {

    const { title, dataSrc } = this.props;

    const containerStyle = {
      background: "url('http://subtlepatterns2015.subtlepatterns.netdna-cdn.com/patterns/geometry.png')",
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    };

    const paperStyle = {
      width: '770px',
      height: '500px',
      display: 'flex',
    };

    const sidebarStyle = {
      width: '330px',
      height: '100%',
      backgroundColor: '#2f3f70',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      paddingLeft: '25px',
      paddingRight: '25px',
    };

    const mainSettingsStyle = {
      width: '440px',
      height: '100%',
    };

    const backButtonStyle = {
      position: 'fixed',
      top: '30px',
      left: '40px',
    };

    return (
      <div style={containerStyle}>
        <Paper style={paperStyle} zDepth={3}>
          <div style={sidebarStyle} className="settings-sidebar">
            <h1 style={{margin: '30px 24px 20px'}}>{ title }</h1>
            <hr className="fancy-line" />
            <div style={{flexGrow: '1', overflowY: 'scroll'}}>
              { this.generateListFromData.bind(this)(dataSrc) }
            </div>
          </div>
          <div style={mainSettingsStyle} className="settings-main">
            { this.renderMainComponent.bind(this)() }
          </div>
        </Paper>
        <div style={backButtonStyle}>
          <RaisedButton
            label="Back"
            secondary={true}
            icon={ <BackIcon /> }
          />
        </div>
      </div>
    );
  }
}
