import React from 'react';
// import Handsontable from 'handsontable/dist/handsontable';
// import Handsontable from 'meteor/awsp:handsontable';

class Table extends React.Component {
  componentDidMount() {
    let hot = new Handsontable(this.root, {
      rowHeaders: true,
      colHeaders: true,
      data: [
        [ 1, 2, 3 ],
        [ 4, 5, 6 ]
      ],
      contextMenu: true,
      afterChange: (change, source) => {
        // change is array of length 4
        // index 0 = row, 1 = col, 2 = prev val, 3 = new val
        console.log(change);
        console.log(source); // emits actions, e.g load data, edit, ...
      }
    });
  }

  render() {
    return (
      <div ref={ref => this.root = ref}></div>
    );
  }
}

export default Table;
