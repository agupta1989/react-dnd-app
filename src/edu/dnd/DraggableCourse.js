import React, {Component} from 'react';
import { ItemTypes } from '../Constant';
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from "react-dom";
import Course from '../Course';

const getStyles = (props) => {
    const { left, top, isDragging, isDisabled } = props;
    const opacity = (isDisabled || isDragging) ? 0.5 : 1;

    return {
      opacity,
    };
}

const dragSource = {
    beginDrag(props) {
      return {
        course: props.course,
        index: props.index,
        termId: props.termId
      };
    },
    canDrag(props, monitor) {
      if (props.isDisabled) {
        return false;
      } else {
        return true;
      }
    }
};

const dropTarget = {
  hover(props, monitor, component) {
    const courseItem = monitor.getItem();
    const dragIndex = courseItem.index;
    const hoverIndex = props.index;
    const termId = props.termId;

    // Don't replace items with themselves
    if (termId === courseItem.course.termId && dragIndex === hoverIndex) {
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

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    props.moveCard({dragIndex, hoverIndex, termId, course: courseItem.course});

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
  drop(props, monitor, component) {
      console.log("props", props);
  }
};


class DraggableCourse extends Component {
    render() {
        const { connectDragSource, connectDropTarget, course, index, isDisabled } = this.props;
        return (
            connectDragSource(connectDropTarget(
                <div style={getStyles(this.props)}>
                    <Course isDisabled={isDisabled} course={course} index={index}/>
                </div>
            ))
        );
    }
}

export default DropTarget(ItemTypes.COURSE, dropTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))(DragSource(ItemTypes.COURSE, dragSource, (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
})(DraggableCourse));

