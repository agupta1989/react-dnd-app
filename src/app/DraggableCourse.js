import React, {Component} from 'react';
import { ItemTypes } from './Constant';
import { DragSource } from 'react-dnd';
import Course from './Course';

function getStyles(props) {
  const { left, top, isDragging } = props;
//   const transform = `translate3d(${left}px, ${top}px, 0)`;

  return {
    // transform,
    // WebkitTransform: transform,
    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
    opacity: isDragging ? 0 : 1,
    // height: isDragging ? 0 : '',
  };
}

const courseSource = {
  beginDrag(props) {
    return {
       item: props.item
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class DraggableCourse extends Component {
    render() {
        const { connectDragSource, item } = this.props;
        return (
            connectDragSource(
                <div style={getStyles(this.props)}>
                    <Course item={item} className={"list-group-item"} />
                </div>
            )
        );
    }
}

export default DragSource(ItemTypes.COURSE, courseSource, collect)(DraggableCourse);
