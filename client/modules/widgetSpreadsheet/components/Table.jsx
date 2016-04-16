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
        console.log(change);
        console.log(source);
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
