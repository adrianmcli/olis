import React from 'react';
// import Handsontable from 'handsontable/dist/handsontable';
// import Handsontable from 'meteor/awsp:handsontable';

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.tableValues = props.data.tableValues;
  }

  componentDidMount() {
    const {update, widgetId} = this.props;

    this.hot = new Handsontable(this.root, {
      rowHeaders: true,
      colHeaders: true,
      data: this.tableValues,
      contextMenu: true,
      afterChange: (change, source) => {
        console.log('-----afterChange------');
        console.table(this.tableValues);

        update(widgetId, {tableValues: this.tableValues});
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

Table.defaultProps = {
  data: {
    tableValues: []
  }
};
