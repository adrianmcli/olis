import React from 'react';
import R from 'ramda';
// import Handsontable from 'handsontable/dist/handsontable';
// import Handsontable from 'meteor/awsp:handsontable';

export default class Table extends React.Component {
  constructor(props) {
    super(props);

    this.tableValues = canSetStateFromProps(props.data) ?
      props.data.tableValues : [
        [ '', '', '' ],
        [ '', '', '' ],
        [ '', '', '' ]
      ];
  }

  componentDidMount() {
    const {update, widgetId} = this.props;

    this.hot = new Handsontable(this.root, {
      rowHeaders: true,
      colHeaders: true,
      data: this.tableValues,
      contextMenu: true,
      afterChange: (change, source) => {
        // this.tableValues is mutated
        if (source === 'edit') {
          update(widgetId, {tableValues: this.tableValues});
        }
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    const { tableValues } = data;

    console.log('---componentWillReceiveProps----');
    console.table(tableValues);
  }

  componentDidUpdate() {
  }

  render() {
    return (
      <div ref={ref => this.root = ref}></div>
    );
  }
}

function canSetStateFromProps(data) {
  const expectedKeys = [ 'tableValues' ];
  const keys = R.keys(data);
  const hasExpectedKeys = R.intersection(expectedKeys, keys).length === expectedKeys.length;
  return hasExpectedKeys;
}

