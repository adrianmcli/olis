import React from 'react';

import TextField from 'material-ui/lib/text-field';

export default class SearchBar extends React.Component {
  handleChange(e) {
    const value = e.target.value;
    const {search} = this.props;
    search(value);
  }

  render() {
    const containerStyle = {
      background: '#efefef',
      padding: '12px',
    };
    const inputBackgroundStyle = {
      background: 'white',
      borderRadius: '6px',
      padding: '0 12px',
    };
    return (
      <div style={ containerStyle }>
        <div style={ inputBackgroundStyle }>
          <TextField
            hintText="Search with Username, Email, etc."
            ref={ x => this._searchField = x }
            fullWidth
            onChange={this.handleChange.bind(this)}
          />
        </div>
      </div>
    );
  }
}
SearchBar.defaultProps = {
  search: value => console.log(`You searched for ${value}`)
};
