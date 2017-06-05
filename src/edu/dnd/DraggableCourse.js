import React, {Component} from 'react';
import { ItemTypes } from '../Constant';
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from "react-dom";
import Course from '../Course';

const getStyles = (props) => {
  const { left, top, isDragging } = props;
  const transform = `translate3d(${left}px, ${top}px, 0)`;
  
  return {
    transform,
    opacity: isDragging ? 0 : 1,
  };
}

const courseSource = {
  beginDrag(props) {
    return {
       course: props.course,
       index: props.index
    };
  }
};

const termTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    // console.log("item",  monitor.getItem());
    // console.log("dragIndex", dragIndex)
    // console.log("hover index", hoverIndex);
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
};


class DraggableCourse extends Component {
    render() {
        const { connectDragSource, connectDropTarget, course, index } = this.props;
        return (
            connectDragSource(connectDropTarget(
                <div style={getStyles(this.props)}>
                    <Course course={course} index={index}/>
                </div>
            ))
        );
    }
}

export default DropTarget(ItemTypes.COURSE, termTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))(DragSource(ItemTypes.COURSE, courseSource, (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
})(DraggableCourse));

