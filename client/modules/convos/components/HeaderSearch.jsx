import React from 'react';

import IconButton from 'material-ui/lib/icon-button';
import ActionSearch from 'material-ui/lib/svg-icons/action/search';

import Dialog from '/client/modules/core/components/Dialog.jsx';

import TextField from 'material-ui/lib/text-field';
import CircularProgress from 'material-ui/lib/circular-progress';

export default class HeaderSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      emptyQuery: true,
    };
  }

  handleOpen() {
    this.setState({
      open: true,
      emptyQuery: true,
    });
  }

  handleClose() {
    this.setState({open: false});
  }

  _handleOnChange() {
    const input = this._searchField.getValue();
    if (input === '') {
      this.setState({emptyQuery: true});
    } else {
      this.setState({emptyQuery: false});
    }
  }

  renderResults() {
    return (
      <div>Results</div>
    );
  }

  renderResultsContainer() {
    const waiting = true;
    const renderLoading = () => {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: '36px',
        }}>
          <CircularProgress />
          <h4 style={{fontWeight: '400', lineHeight: '1.6em', color: '#00BCD4'}}>
            Searching...
          </h4>
        </div>
      );
    };
    return (
      <div>
        { waiting ? renderLoading() : this.renderResults() }
      </div>
    );
  }

  renderSearchDialog() {
    const placeholderColor = '#AAA';
    const renderEmptyPlaceholder = () => {
      return (
        <div style={{
          color: placeholderColor,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: '36px',
          textAlign: 'center',
        }}>
          <ActionSearch
            color={placeholderColor}
            style={{height: '64px', width: '64px'}}
          />
          <h4 style={{fontWeight: '400', lineHeight: '1.6em'}}>
            Search results will appear here <br /> when you start typing.
          </h4>
        </div>
      );
    };
    return (
      <Dialog
        title="Search"
        open={this.state.open}
        onRequestClose={this.handleClose.bind(this)}
        bodyStyle={{paddingTop: '0'}}
        closeActionOnly
        autoScrollBodyContent
        onShow={() => {this._searchField.focus();}}
      >
        <div style={{
          position: 'absolute',
          left: '24px',
          right: '24px',
          top: '72px',
          background: 'white',
          zIndex: '1',
        }}>
          <TextField
            hintText="Search messages, conversations, users, notes, and more..."
            floatingLabelText="Search Query"
            onChange={this._handleOnChange.bind(this)}
            fullWidth
            ref={ x => this._searchField = x }
          />
        </div>
        <div style={{marginTop: '72px', height: '200px'}}>
          { this.state.emptyQuery ? renderEmptyPlaceholder() : this.renderResultsContainer() }
        </div>
      </Dialog>
    );
  }

  render() {
    const iconColor = 'white';
    return (
      <div>

        <div className="header-icon">
          <IconButton tooltip="Search" onClick={this.handleOpen.bind(this)}>
            <ActionSearch color={iconColor} />
          </IconButton>
        </div>

        { this.renderSearchDialog() }

      </div>
    );
  }
}
