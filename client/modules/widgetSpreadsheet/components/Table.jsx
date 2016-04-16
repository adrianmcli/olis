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
      afterChange: (changes, source) => {
        // this.tableValues is mutated
        if (source === 'edit') {
          console.log('-----afterChange-----');
          console.table(this.tableValues);

          changes.forEach(change => {
            const row = change[0];
            const col = change[1];
            const newVal = change[3];
            this.tableValues[row][col] = newVal;
          });

          update(widgetId, {tableValues: this.tableValues});
        }
      },
      afterCreateRow: (index, amount) => {
        update(widgetId, {tableValues: this.tableValues});
      },
      afterCreateCol: (index, amount) => {
        update(widgetId, {tableValues: this.tableValues});
      },
      afterRemoveRow: (index, amount) => {
        update(widgetId, {tableValues: this.tableValues});
      },
      afterRemoveCol: (index, amount) => {
        update(widgetId, {tableValues: this.tableValues});
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;

    console.log('---componentWillReceiveProps----');
    console.table(data.tableValues);

    // Need both lines here for it to work
    this.tableValues = data.tableValues;
    this.hot.loadData(data.tableValues);
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

