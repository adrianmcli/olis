import React from 'react';

import Paper from 'material-ui/lib/paper';
import FontIcon from 'material-ui/lib/font-icon';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

// import DownIcon from 'material-ui/lib/svg-icons/navigation/arrow-drop-down';

export default class SettingsWrapper extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mainContent: () => this.defaultContent(),
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

    const _renderListItems = (srcArray) => {
      return srcArray.map((listItem, j) => {
        return (
          <ListItem
            key={ j }
            primaryText={ listItem.label }
            innerDivStyle={{color: 'white'}}
            onClick={() => this.setState({mainContent: () => listItem.content})}
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
          nestedItems={ _renderListItems(listItems) }
        />
      );
    });

    return (<List style={{backgroundColor: 'transparent'}}>{result}</List>);
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
            <h1 style={{margin: '20px 24px'}}>{ title }</h1>
            <div style={{flexGrow: '1', overflowY: 'scroll'}}>
              { this.generateListFromData.bind(this)(dataSrc) }
            </div>
          </div>
          <div style={mainSettingsStyle}>
            { this.state.mainContent() }
          </div>
        </Paper>
      </div>
    );
  }
}
