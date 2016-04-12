import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import NotesHeader from './NotesHeader.jsx';
import { Widgets } from '/client/modules/widgets';
import Widget from '/client/modules/widgets/widget/components/Widget.jsx';

class NotesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  renderWidgets() {
    const {
      userId, note, widgets,
      removeWidget, moveWidget, updateWidget
    } = this.props;

    const DraggableWidget = Widgets['draggable'];

    return widgets.map((widget, index) => {
      return (
        <DraggableWidget
          key={widget._id}
          index={index}
          noteId={note._id}
          widgetId={widget._id}
          moveWidget={moveWidget}
        >
          <Widget widget={widget} remove={removeWidget} update={updateWidget} />
        </DraggableWidget>
      );
    });
  }

  render() {
    const { note, addWidget } = this.props;
    return (
      <div id="notes-container">
        <NotesHeader noteId={note._id} addWidget={addWidget} />
        <div className="notes-data-wrapper">
          {this.renderWidgets()}
        </div>
      </div>
    );
  }
}
NotesContainer.defaultProps = {
  widgets: []
};

export default DragDropContext(HTML5Backend)(NotesContainer);
