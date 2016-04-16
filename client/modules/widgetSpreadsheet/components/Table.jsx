import React from 'react';
// import Handsontable from 'handsontable/dist/handsontable';
// import Handsontable from 'meteor/awsp:handsontable';

class Table extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {update, widgetId} = this.props;
    let tableValues = [
      [ 1, 2, 3 ],
      [ 4, 5, 6 ]
    ];

    this.hot = new Handsontable(this.root, {
      rowHeaders: true,
      colHeaders: true,
      data: tableValues,
      contextMenu: true,
      afterChange: (change, source) => {
        console.log('-----afterChange------');
        console.table(tableValues);

        update(widgetId, {tableValues});
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    const { tableValues: newValues } = data;

    console.log('------componentWillReceiveProps-----');
    console.table(newValues);
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  render() {
    return (
      <div ref={ref => this.root = ref}></div>
    );
  }
}

export default Table;
