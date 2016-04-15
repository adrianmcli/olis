import React from 'react';
import _ from 'lodash';

import IconButton from 'material-ui/lib/icon-button';
import ActionSearch from 'material-ui/lib/svg-icons/action/search';
import Dialog from '/client/modules/core/components/Dialog.jsx';
import TextField from 'material-ui/lib/text-field';

import ModalEmptyPlaceholder from './ModalEmptyPlaceholder.jsx';
import ModalResultsContainer from './ModalResultsContainer.jsx';

export default class HeaderSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false, emptyQuery: true };
  }

  // Handle dialog open and close
  handleOpen() { this.setState({ open: true, emptyQuery: true}); }
  handleClose() { this.setState({ open: false }); }

  // Handle text field change
  handleOnChange() {
    const debouncedSearch = _.debounce(() => {
      const {search} = this.props;
      const input = this._searchField.getValue();
      this.setState({ emptyQuery: input === '' });
      search(input);
    }, 1000);

    debouncedSearch();
  }

  renderDialog() {
    const {teamName} = this.props;

    const style = {
      searchBar: {
        position: 'absolute',
        left: '24px',
        right: '24px',
        top: '72px',
        background: 'white',
        zIndex: '1',
      },
      content: {
        marginTop: '72px',
        height: '300px',
        position: 'relative',
      },
    };
    return (
      <Dialog
        title={`Search Team: ${teamName}`}
        open={this.state.open}
        onRequestClose={this.handleClose.bind(this)}
        bodyStyle={{paddingTop: '0'}}
        closeActionOnly
        autoScrollBodyContent
        onShow={() => {this._searchField.focus();}}
      >

        <div style={style.searchBar}>
          <TextField
            hintText="Search people, conversations, messages, and notes"
            floatingLabelText="Search Query"
            onChange={this.handleOnChange.bind(this)}
            fullWidth
            ref={ x => this._searchField = x }
          />
        </div>

        <div style={style.content}>
          { this.state.emptyQuery ?
            <ModalEmptyPlaceholder /> : <ModalResultsContainer {...this.props} closeModal={this.handleClose.bind(this)} /> }
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
        { this.renderDialog() }
      </div>
    );
  }
}
